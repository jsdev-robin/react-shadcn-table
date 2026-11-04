import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import type { DensityState } from './rowDensity';

const DENSITY_STORAGE_KEY = 'grid-density';
const DEFAULT_DENSITY: DensityState = 'md';

const isDensityState = (value: unknown): value is DensityState =>
  value === 'sm' || value === 'md' || value === 'lg';

export function getStoredDensity(
  gridId: string,
  fallback: DensityState = DEFAULT_DENSITY,
): DensityState {
  if (typeof window === 'undefined') {
    return fallback;
  }
  try {
    const stored = window.localStorage.getItem(
      `${gridId}:${DENSITY_STORAGE_KEY}`,
    );
    if (!stored) return fallback;
    const parsed = JSON.parse(stored);
    return isDensityState(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export function setStoredDensity(gridId: string, density: DensityState) {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    window.localStorage.setItem(
      `${gridId}:${DENSITY_STORAGE_KEY}`,
      JSON.stringify(density),
    );
  } catch {}
}

export function useDensityState(
  gridId: string,
  initial: DensityState = DEFAULT_DENSITY,
) {
  const [density, setDensityState] = useState<DensityState>(initial);

  useEffect(() => {
    setDensityState(getStoredDensity(gridId, initial));
  }, [gridId, initial]);

  const onDensityChange: Dispatch<SetStateAction<DensityState>> = (updater) => {
    setDensityState((old) => {
      const next = typeof updater === 'function' ? updater(old) : updater;
      setStoredDensity(gridId, next);
      return next;
    });
  };

  return [density, onDensityChange] as const;
}