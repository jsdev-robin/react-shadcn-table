import type { ColumnVisibilityState } from '@tanstack/react-table';
import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';

const COLUMN_VISIBILITY_STORAGE_KEY = 'grid-column-visibility';

export function getStoredColumnVisibility(
  gridId: string,
  fallback: ColumnVisibilityState = {},
): ColumnVisibilityState {
  if (typeof window === 'undefined') {
    return fallback;
  }
  try {
    const stored = window.localStorage.getItem(
      `${gridId}:${COLUMN_VISIBILITY_STORAGE_KEY}`,
    );
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

export function setStoredColumnVisibility(
  gridId: string,
  visibility: ColumnVisibilityState,
) {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    window.localStorage.setItem(
      `${gridId}:${COLUMN_VISIBILITY_STORAGE_KEY}`,
      JSON.stringify(visibility),
    );
  } catch {}
}

export function useColumnVisibilityState(
  gridId: string,
  initial: ColumnVisibilityState = {},
) {
  const initialRef = useRef(initial);
  initialRef.current = initial;

  const [columnVisibility, setColumnVisibilityState] =
    useState<ColumnVisibilityState>(() =>
      getStoredColumnVisibility(gridId, initial),
    );

  useEffect(() => {
    setColumnVisibilityState(
      getStoredColumnVisibility(gridId, initialRef.current),
    );
  }, [gridId]);

  const onColumnVisibilityChange: Dispatch<
    SetStateAction<ColumnVisibilityState>
  > = (updater) => {
    setColumnVisibilityState((old) => {
      const next = typeof updater === 'function' ? updater(old) : updater;
      setStoredColumnVisibility(gridId, next);
      return next;
    });
  };

  return [columnVisibility, onColumnVisibilityChange] as const;
}