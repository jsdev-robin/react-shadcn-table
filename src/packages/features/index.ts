'use client';

import {
  columnFilteringFeature,
  columnSizingFeature,
  createFilteredRowModel,
  createPaginatedRowModel,
  filterFn_equalsString,
  filterFn_inDateRange,
  filterFn_inNumberRange,
  filterFn_includesString,
  metaHelper,
  rowPaginationFeature,
  tableFeatures,
} from '@tanstack/react-table';

interface MyColumnMeta {
  filterVariant?: 'text' | 'range' | 'select' | 'dateRange';
}

export const features = tableFeatures({
  columnSizingFeature,
  columnFilteringFeature,
  rowPaginationFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  filterFns: {
    includesString: filterFn_includesString,
    inNumberRange: filterFn_inNumberRange,
    inDateRange: filterFn_inDateRange,
    equalsString: filterFn_equalsString,
  },
  columnMeta: metaHelper<MyColumnMeta>(),
});
export type AppFeatures = typeof features;
