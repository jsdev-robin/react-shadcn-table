import type { ColumnPinningState } from '@tanstack/react-table';
import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';

const COLUMN_PINNING_STORAGE_KEY = 'grid-column-pinning';

const EMPTY_PINNING: ColumnPinningState = { start: [], end: [] };

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((id) => typeof id === 'string');

const isValidPinningState = (value: unknown): value is ColumnPinningState => {
  if (typeof value !== 'object' || value === null) return false;
  const { start, end } = value as ColumnPinningState;
  return isStringArray(start) && isStringArray(end);
};

const normalizePinning = (value: ColumnPinningState): ColumnPinningState => ({
  start: value.start ?? [],
  end: value.end ?? [],
});

export function getStoredColumnPinning(
  gridId: string,
  columnIds?: string[],
  fallback: ColumnPinningState = EMPTY_PINNING,
): ColumnPinningState {
  const base = normalizePinning(fallback);
  if (typeof window === 'undefined') {
    return base;
  }
  try {
    const stored = window.localStorage.getItem(
      `${gridId}:${COLUMN_PINNING_STORAGE_KEY}`,
    );
    if (!stored) return base;
    const parsed = JSON.parse(stored);
    if (!isValidPinningState(parsed)) return base;
    if (!columnIds) return parsed;

    const columnIdSet = new Set(columnIds);
    const filterKnown = (ids: string[]) =>
      ids.filter((id) => columnIdSet.has(id));

    return {
      start: filterKnown(parsed.start),
      end: filterKnown(parsed.end),
    };
  } catch {
    return base;
  }
}

export function setStoredColumnPinning(
  gridId: string,
  pinning: ColumnPinningState,
) {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    window.localStorage.setItem(
      `${gridId}:${COLUMN_PINNING_STORAGE_KEY}`,
      JSON.stringify(pinning),
    );
  } catch {}
}

export function useColumnPinningState(
  gridId: string,
  initial: ColumnPinningState = EMPTY_PINNING,
  columnIds?: string[],
) {
  const initialRef = useRef(initial);
  initialRef.current = initial;

  const columnIdsRef = useRef(columnIds);
  columnIdsRef.current = columnIds;

  const [columnPinning, setColumnPinningState] = useState<ColumnPinningState>(
    () => normalizePinning(initial),
  );

  const columnIdsKey = columnIds?.join('|');

  useEffect(() => {
    setColumnPinningState(
      getStoredColumnPinning(gridId, columnIdsRef.current, initialRef.current),
    );
  }, [gridId, columnIdsKey]);

  const onColumnPinningChange: Dispatch<SetStateAction<ColumnPinningState>> = (
    updater,
  ) => {
    setColumnPinningState((old) => {
      const next = typeof updater === 'function' ? updater(old) : updater;
      setStoredColumnPinning(gridId, next);
      return next;
    });
  };

  return [columnPinning, onColumnPinningChange] as const;
}