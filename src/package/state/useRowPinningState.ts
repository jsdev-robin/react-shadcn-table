import type { RowPinningState } from '@tanstack/react-table';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';

const ROW_PINNING_STORAGE_KEY = 'grid-row-pinning';

const DEFAULT_ROW_PINNING: RowPinningState = { top: [], bottom: [] };

export function getStoredRowPinning(gridId: string): RowPinningState {
  if (typeof window === 'undefined') {
    return DEFAULT_ROW_PINNING;
  }
  try {
    const stored = window.localStorage.getItem(
      `${gridId}:${ROW_PINNING_STORAGE_KEY}`,
    );
    if (!stored) return DEFAULT_ROW_PINNING;
    const parsed = JSON.parse(stored);
    return {
      top: Array.isArray(parsed?.top) ? parsed.top : [],
      bottom: Array.isArray(parsed?.bottom) ? parsed.bottom : [],
    };
  } catch {
    return DEFAULT_ROW_PINNING;
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

export function useRowPinningState(gridId: string) {
  const [rowPinning, setRowPinningState] =
    useState<RowPinningState>(DEFAULT_ROW_PINNING);

  useEffect(() => {
    setRowPinningState(getStoredRowPinning(gridId));
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
