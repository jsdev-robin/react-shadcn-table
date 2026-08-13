import type { RowData } from '@tanstack/react-table';
import { useContext } from 'react';
import { GridContext } from './GridContext';
import type { GridContextProps } from './types';

export function useGridContext<TData extends RowData = RowData>() {
  const ctx = useContext(GridContext);
  if (!ctx) {
    throw new Error('useGridContext must be used within a GridContextProvider');
  }
  return ctx as GridContextProps<TData>;
}
