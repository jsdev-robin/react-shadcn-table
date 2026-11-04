import type { RowPinningState } from '@tanstack/react-table';
import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';

const ROW_PINNING_STORAGE_KEY = 'grid-row-pinning';

const DEFAULT_ROW_PINNING: RowPinningState = { top: [], bottom: [] };

const normalizeRowPinning = (value: RowPinningState): RowPinningState => ({
  top: value.top ?? [],
  bottom: value.bottom ?? [],
});

export function getStoredRowPinning(
  gridId: string,
  fallback: RowPinningState = DEFAULT_ROW_PINNING,
): RowPinningState {
  const base = normalizeRowPinning(fallback);
  if (typeof window === 'undefined') {
    return base;
  }
  try {
    const stored = window.localStorage.getItem(
      `${gridId}:${ROW_PINNING_STORAGE_KEY}`,
    );
    if (!stored) return base;
    const parsed = JSON.parse(stored);
    const top: string[] = Array.isArray(parsed?.top) ? parsed.top : [];
    const bottom: string[] = Array.isArray(parsed?.bottom) ? parsed.bottom : [];
    const savedIds = new Set([...top, ...bottom]);
    return {
      top: [...base.top!.filter((id) => !savedIds.has(id)), ...top],
      bottom: [...base.bottom!.filter((id) => !savedIds.has(id)), ...bottom],
    };
  } catch {
    return base;
  }
}

export function setStoredRowPinning(gridId: string, pinning: RowPinningState) {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    window.localStorage.setItem(
      `${gridId}:${ROW_PINNING_STORAGE_KEY}`,
      JSON.stringify(pinning),
    );
  } catch {}
}

export function useRowPinningState(
  gridId: string,
  initial: RowPinningState = DEFAULT_ROW_PINNING,
) {
  const initialRef = useRef(initial);
  initialRef.current = initial;

  const [rowPinning, setRowPinningState] = useState<RowPinningState>(() =>
    normalizeRowPinning(initial),
  );

  useEffect(() => {
    setRowPinningState(getStoredRowPinning(gridId, initialRef.current));
  }, [gridId]);

  const onRowPinningChange: Dispatch<SetStateAction<RowPinningState>> = (
    updater,
  ) => {
    setRowPinningState((old) => {
      const next = typeof updater === 'function' ? updater(old) : updater;
      setStoredRowPinning(gridId, next);
      return next;
    });
  };

  return [rowPinning, onRowPinningChange] as const;
}