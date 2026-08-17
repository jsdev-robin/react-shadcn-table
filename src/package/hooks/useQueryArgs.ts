'use client';

import type {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from '@tanstack/react-table';
import { useMemo } from 'react';
import { buildQueryParams } from '../utils/buildQueryString';
import { buildSortString } from '../utils/buildSortString';

export const useQueryArgs = (state: {
  columnFilters: ColumnFiltersState;
  globalFilter: string;
  pagination: PaginationState;
  sorting: SortingState;
}) =>
  useMemo(
    () => ({
      pagination: state.pagination,
      queryParams: buildQueryParams(state.columnFilters),
      sort: buildSortString(state.sorting),
      globalFilter: state.globalFilter,
    }),
    [state],
  );
