'use client';

import type { RowData } from '@tanstack/react-table';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { GridContextProvider } from '../contexts/grid/GridContext';
import { useGrid } from '../hooks/useGrid';
import GridCenter from '../ui/grid/sections/center/GridCenter';
import GridEnd from '../ui/grid/sections/end/GridEnd';
import GridStart from '../ui/grid/sections/start/GridStart';
import Pagination from '../ui/pagination';
import ToolbarRight from '../ui/toolbar/right';
import type { GridProps } from './types';

const Grid = <T extends RowData>({
  payload,
  columns,
  name,
  state,
  onColumnFiltersChange,
  onPaginationChange,
  onSortingChange,
  onRowSelectionChange,
  setGlobalFilter,
  manualPagination,
  manualFiltering,
  manualSorting,
  isLoading,
  isError,
  isFetching,
  refetch,
  height,
  getRowCanExpand,
  renderSubComponent,
  enableCellSelection,
  enableCellSpanning,
  enableRowSelection,
}: GridProps<T>) => {
  'use no memo';
  return (
    <GridContextProvider
      payload={payload}
      columns={columns}
      name={name}
      state={state}
      onColumnFiltersChange={onColumnFiltersChange}
      onPaginationChange={onPaginationChange}
      onSortingChange={onSortingChange}
      onRowSelectionChange={onRowSelectionChange}
      setGlobalFilter={setGlobalFilter}
      manualPagination={manualPagination}
      manualFiltering={manualFiltering}
      manualSorting={manualSorting}
      isLoading={isLoading}
      isError={isError}
      isFetching={isFetching}
      refetch={refetch}
      height={height}
      getRowCanExpand={getRowCanExpand}
      renderSubComponent={renderSubComponent}
      enableCellSelection={enableCellSelection}
      enableCellSpanning={enableCellSpanning}
      enableRowSelection={enableRowSelection}
    >
      <GridInner />
    </GridContextProvider>
  );
};

const GridInner = () => {
  'use no memo';
  const { gridWrapperRef } = useGrid();
  const tableWrapperRef = useRef<HTMLDivElement>(null);
  const [tableHeight, setTableHeight] = useState<number>(0);

  useLayoutEffect(() => {
    if (tableWrapperRef.current) {
      setTableHeight(tableWrapperRef.current.getBoundingClientRect().height);
    }
  }, []);

  useEffect(() => {
    const el = tableWrapperRef.current;
    if (!el) return;
    const updateHeight = () => {
      setTableHeight(el.getBoundingClientRect().height);
    };
    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(el);

    document.addEventListener('fullscreenchange', updateHeight);
    window.addEventListener('resize', updateHeight);

    return () => {
      resizeObserver.disconnect();
      document.removeEventListener('fullscreenchange', updateHeight);
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        background: 'color-mix(in srgb, var(--muted) 50%, transparent)',
        border: '1px solid var(--border)',
        borderRadius: '6px',
      }}
      ref={gridWrapperRef}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',

          overflow: 'hidden',
          width: '100%',
        }}
      >
        <GridStart />
        <div
          style={{
            overflow: 'hidden',
            flex: 1,
          }}
          ref={tableWrapperRef}
        >
          <GridCenter />
        </div>
        <GridEnd />
        <ToolbarRight height={tableHeight} />
      </div>
      <Pagination />
    </div>
  );
};

export { Grid };
