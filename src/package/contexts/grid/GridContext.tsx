'use client';

import useSyncScroll from '@/package/hooks/useSyncScroll';
import type { DensityState } from '@/package/state/rowDensity';
import { toTsv } from '@/package/utils/toTsv';
import { useHotkeys } from '@tanstack/react-hotkeys';
import { useCreateAtom } from '@tanstack/react-store';
import {
  useTable,
  type CellSelectionState,
  type RowData,
} from '@tanstack/react-table';
import React, {
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { features } from '../../features';
import type { GridContextProps, GridContextProviderProps } from './types';

export const GridContext = createContext<GridContextProps<any> | undefined>(
  undefined,
);

export const GridContextProvider = <TableData extends RowData>({
  children,
  columns,
  payload,
  name = 'munza',
  state = {},
  onColumnFiltersChange,
  onPaginationChange,
  onSortingChange,
  setGlobalFilter,
  isError,
  isLoading,
  isFetching,
  refetch,
  manualFiltering = false,
  manualSorting = false,
  manualPagination = false,
  height = '65vh',
}: GridContextProviderProps<TableData>) => {
  'use no memo';
  const [isSplit, setIsSplit] = useState(false);
  const paneRef1 = useRef<HTMLDivElement>(null);
  const paneRef2 = useRef<HTMLDivElement>(null);
  const paneRef3 = useRef<HTMLDivElement>(null);
  const paneRef4 = useRef<HTMLDivElement>(null);
  const paneRef5 = useRef<HTMLDivElement>(null);
  const paneRef6 = useRef<HTMLDivElement>(null);
  const gridWrapperRef = useRef<HTMLDivElement>(null);
  const cellSelectionAtom = useCreateAtom<CellSelectionState>([]);
  const [density, setDensity] = React.useState<DensityState>('md');

  const table = useTable(
    {
      features: features,
      data: payload?.data ?? [],
      rowCount: payload?.total,
      key: name,
      columns: columns,
      defaultColumn: {
        minSize: 60,
        maxSize: 800,
      },
      state: { ...state, density },
      atoms: {
        cellSelection: cellSelectionAtom,
      },
      enableCellSelection: true,
      enableCellSpanning: true,
      onSortingChange: onSortingChange,
      onColumnFiltersChange: onColumnFiltersChange,
      onGlobalFilterChange: setGlobalFilter,
      onPaginationChange: onPaginationChange,
      onDensityChange: setDensity,
      manualFiltering: manualFiltering,
      manualSorting: manualSorting,
      manualPagination: manualPagination,
    },
    (state) => state,
  );

  useSyncScroll({
    refs: [paneRef1, paneRef2],
    axis: 'x',
  });

  useSyncScroll({
    refs: [paneRef3, paneRef4],
    axis: 'x',
  });

  useSyncScroll({
    refs: [paneRef5, paneRef6],
    axis: 'x',
  });

  useSyncScroll({
    refs: [paneRef2, paneRef3, paneRef4, paneRef5, paneRef6],
    axis: 'y',
  });

  const isFirstColumnLayout = useRef(true);
  useEffect(() => {
    if (isFirstColumnLayout.current) {
      isFirstColumnLayout.current = false;
      return;
    }
    table.resetCellSelection(true);
  }, [
    table.state.columnOrder,
    table.state.columnPinning,
    table.state.columnVisibility,
    table.state.sorting,
  ]);

  useHotkeys(
    [
      { hotkey: 'ArrowUp', callback: () => table.moveCellSelection('up') },
      { hotkey: 'ArrowDown', callback: () => table.moveCellSelection('down') },
      { hotkey: 'ArrowLeft', callback: () => table.moveCellSelection('left') },
      {
        hotkey: 'ArrowRight',
        callback: () => table.moveCellSelection('right'),
      },
      {
        hotkey: 'Shift+ArrowUp',
        callback: () => table.extendCellSelection('up'),
      },
      {
        hotkey: 'Shift+ArrowDown',
        callback: () => table.extendCellSelection('down'),
      },
      {
        hotkey: 'Shift+ArrowLeft',
        callback: () => table.extendCellSelection('left'),
      },
      {
        hotkey: 'Shift+ArrowRight',
        callback: () => table.extendCellSelection('right'),
      },
      { hotkey: 'Mod+A', callback: () => table.selectAllCells() },
      { hotkey: 'Escape', callback: () => table.resetCellSelection(true) },
      {
        hotkey: 'Mod+C',
        callback: () => {
          void navigator.clipboard.writeText(
            toTsv(table.getSelectedCellRangesData()),
          );
        },
      },
    ],
    { target: gridWrapperRef },
  );

  const value = useMemo(
    () => ({
      paneRef1,
      paneRef2,
      paneRef3,
      paneRef4,
      paneRef5,
      paneRef6,
      gridWrapperRef,
      isSplit,
      setIsSplit,
      isFetching,
      isLoading,
      isError,
      refetch,
      height,
      globalFilter: state.globalFilter,
      setGlobalFilter,
    }),
    [
      paneRef1,
      paneRef2,
      paneRef3,
      paneRef4,
      paneRef5,
      paneRef6,
      gridWrapperRef,
      isSplit,
      setIsSplit,
      isFetching,
      isLoading,
      isError,
      refetch,
      height,
      state.globalFilter,
      setGlobalFilter,
    ],
  );

  return (
    <GridContext.Provider
      value={{ ...value, table } as unknown as GridContextProps<any>}
    >
      {children}
    </GridContext.Provider>
  );
};
