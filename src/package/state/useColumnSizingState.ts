import type { ColumnSizingState } from '@tanstack/react-table';
import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';

const COLUMN_SIZING_STORAGE_KEY = 'grid-column-sizing';

export function getStoredColumnSizing(gridId: string): ColumnSizingState {
  if (typeof window === 'undefined') {
    return {};
  }
  try {
    const stored = window.localStorage.getItem(
      `${gridId}:${COLUMN_SIZING_STORAGE_KEY}`,
    );
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export function setStoredColumnSizing(
  gridId: string,
  sizing: ColumnSizingState,
) {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    window.localStorage.setItem(
      `${gridId}:${COLUMN_SIZING_STORAGE_KEY}`,
      JSON.stringify(sizing),
    );
  } catch {}
}

export function useColumnSizingState(gridId: string) {
  const [columnSizing, setColumnSizingState] = useState<ColumnSizingState>({});
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setColumnSizingState(getStoredColumnSizing(gridId));
  }, [gridId]);

  const onColumnSizingChange: Dispatch<SetStateAction<ColumnSizingState>> = (
    updater,
  ) => {
    setColumnSizingState((old) => {
      const next = typeof updater === 'function' ? updater(old) : updater;
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        setStoredColumnSizing(gridId, next);
      }, 300);
      return next;
    });
  };

  return [columnSizing, onColumnSizingChange] as const;
}
