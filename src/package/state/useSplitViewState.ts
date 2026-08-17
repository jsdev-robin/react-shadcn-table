import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';

const SPLIT_VIEW_STORAGE_KEY = 'grid-is-split';

export function getStoredIsSplit(gridId: string): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  try {
    const stored = window.localStorage.getItem(
      `${gridId}:${SPLIT_VIEW_STORAGE_KEY}`,
    );
    return stored ? JSON.parse(stored) : false;
  } catch {
    return false;
  }
}

export function setStoredIsSplit(gridId: string, isSplit: boolean) {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    window.localStorage.setItem(
      `${gridId}:${SPLIT_VIEW_STORAGE_KEY}`,
      JSON.stringify(isSplit),
    );
  } catch {}
}

export function useSplitViewState(gridId: string) {
  const [isSplit, setIsSplitState] = useState<boolean>(false);

  useEffect(() => {
    setIsSplitState(getStoredIsSplit(gridId));
  }, [gridId]);

  const setIsSplit: Dispatch<SetStateAction<boolean>> = (updater) => {
    setIsSplitState((old) => {
      const next = typeof updater === 'function' ? updater(old) : updater;
      setStoredIsSplit(gridId, next);
      return next;
    });
  };

  return [isSplit, setIsSplit] as const;
}
