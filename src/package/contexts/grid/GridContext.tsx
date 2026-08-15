'use client';

import useSyncScroll from '@/package/hooks/useSyncScroll';
import { useTable, type RowData } from '@tanstack/react-table';
import { createContext, useMemo, useRef, useState } from 'react';
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
  const [isSplit, setIsSplit] = useState(false);
  const paneRef1 = useRef<HTMLDivElement>(null);
  const paneRef2 = useRef<HTMLDivElement>(null);
  const paneRef3 = useRef<HTMLDivElement>(null);
  const paneRef4 = useRef<HTMLDivElement>(null);
  const paneRef5 = useRef<HTMLDivElement>(null);
  const paneRef6 = useRef<HTMLDivElement>(null);
  const gridWrapperRef = useRef<HTMLDivElement>(null);

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
      state: { ...state },
      onSortingChange: onSortingChange,
      onColumnFiltersChange: onColumnFiltersChange,
      onGlobalFilterChange: setGlobalFilter,
      onPaginationChange: onPaginationChange,
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
