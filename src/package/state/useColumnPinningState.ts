import type { ColumnPinningState } from '@tanstack/react-table';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';

const COLUMN_PINNING_STORAGE_KEY = 'grid-column-pinning';

const EMPTY_PINNING: ColumnPinningState = { start: [], end: [] };

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((id) => typeof id === 'string');

const isValidPinningState = (value: unknown): value is ColumnPinningState => {
  if (typeof value !== 'object' || value === null) return false;
  const { start, end } = value as ColumnPinningState;
  return isStringArray(start) && isStringArray(end);
};

export function getStoredColumnPinning(
  gridId: string,
  columnIds?: string[],
): ColumnPinningState {
  if (typeof window === 'undefined') {
    return EMPTY_PINNING;
  }
  try {
    const stored = window.localStorage.getItem(
      `${gridId}:${COLUMN_PINNING_STORAGE_KEY}`,
    );
    if (!stored) return EMPTY_PINNING;
    const parsed = JSON.parse(stored);
    if (!isValidPinningState(parsed)) return EMPTY_PINNING;
    if (!columnIds) return parsed;

    const columnIdSet = new Set(columnIds);
    const filterKnown = (ids: string[]) =>
      ids.filter((id) => columnIdSet.has(id));

    return {
      start: filterKnown(parsed.start),
      end: filterKnown(parsed.end),
    };
  } catch {
    return EMPTY_PINNING;
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

export function useColumnPinningState(gridId: string, columnIds?: string[]) {
  const [columnPinning, setColumnPinningState] =
    useState<ColumnPinningState>(EMPTY_PINNING);

  useEffect(() => {
    setColumnPinningState(getStoredColumnPinning(gridId, columnIds));
  }, [gridId, columnIds?.join('|')]);

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
