'use client';

import useSyncScroll from '@/package/hooks/useSyncScroll';
import { useColumnOrderState } from '@/package/state/useColumnOrderState';
import { useColumnPinningState } from '@/package/state/useColumnPinningState';
import { useColumnSizingState } from '@/package/state/useColumnSizingState';
import { useColumnVisibilityState } from '@/package/state/useColumnVisibilityState';
import { useDensityState } from '@/package/state/useDensityState';
import { useSplitViewState } from '@/package/state/useSplitViewState';
import { toTsv } from '@/package/utils/toTsv';
import { useHotkeys } from '@tanstack/react-hotkeys';
import { useCreateAtom } from '@tanstack/react-store';
import {
  useTable,
  type CellSelectionState,
  type RowData,
} from '@tanstack/react-table';
import { createContext, useEffect, useMemo, useRef } from 'react';
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
  getRowCanExpand,
  renderSubComponent,
  onRowSelectionChange,
}: GridContextProviderProps<TableData>) => {
  'use no memo';
  const paneRef1 = useRef<HTMLDivElement>(null);
  const paneRef2 = useRef<HTMLDivElement>(null);
  const paneRef3 = useRef<HTMLDivElement>(null);
  const paneRef4 = useRef<HTMLDivElement>(null);
  const paneRef5 = useRef<HTMLDivElement>(null);
  const paneRef6 = useRef<HTMLDivElement>(null);
  const gridWrapperRef = useRef<HTMLDivElement>(null);
  const cellSelectionAtom = useCreateAtom<CellSelectionState>([]);
  const [density, setDensity] = useDensityState(name);
  const [columnVisibility, onColumnVisibilityChange] =
    useColumnVisibilityState(name);
  const [columnOrder, onColumnOrderChange] = useColumnOrderState(
    name,
    useMemo(() => columns.map((c) => c.id!), [columns]),
  );
  const [columnPinning, onColumnPinningChange] = useColumnPinningState(name);
  const [columnSizing, onColumnSizingChange] = useColumnSizingState(name);
  const [isSplit, setIsSplit] = useSplitViewState(name);

  const table = useTable(
    {
      features: features,
      data: payload?.data ?? [],
      rowCount: payload?.total,
      key: name,
      columns: columns,
      getRowCanExpand,
      defaultColumn: {
        minSize: 60,
        maxSize: 800,
      },
      state: {
        ...state,
        density,
        columnVisibility,
        columnOrder,
        columnPinning,
        columnSizing,
      },
      atoms: {
        cellSelection: cellSelectionAtom,
      },
      columnResizeMode: 'onChange',
      enableCellSelection: true,
      enableCellSpanning: true,
      enableRowSelection: true,
      onColumnVisibilityChange: onColumnVisibilityChange,
      onColumnOrderChange: onColumnOrderChange,
      onColumnPinningChange: onColumnPinningChange,
      onColumnSizingChange: onColumnSizingChange,
      onSortingChange: onSortingChange,
      onColumnFiltersChange: onColumnFiltersChange,
      onGlobalFilterChange: setGlobalFilter,
      onPaginationChange: onPaginationChange,
      onRowSelectionChange: onRowSelectionChange,
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
      renderSubComponent,
      name,
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
      renderSubComponent,
      name,
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
