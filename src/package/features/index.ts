import {
  columnFacetingFeature,
  columnFilteringFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  createFacetedMinMaxValues,
  createFacetedRowModel,
  createFacetedUniqueValues,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_equalsString,
  filterFn_includesString,
  filterFn_inDateRange,
  filterFn_inNumberRange,
  globalFilteringFeature,
  metaHelper,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_text,
  tableFeatures,
} from '@tanstack/react-table';

interface MyColumnMeta {
  filterVariant?:
    | 'text'
    | 'number'
    | 'tel'
    | 'url'
    | 'color'
    | 'range'
    | 'select'
    | 'dateRange'
    | 'date'
    | 'datetime-local'
    | 'month'
    | 'time'
    | 'week'
    | 'search';
}

// New in v9: declare the features this table uses — anything you don't
// register is tree-shaken out of the bundle.
export const features = tableFeatures({
  columnFacetingFeature,
  columnFilteringFeature,
  columnVisibilityFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortedRowModel: createSortedRowModel(),
  facetedRowModel: createFacetedRowModel(),
  facetedUniqueValues: createFacetedUniqueValues(),
  facetedMinMaxValues: createFacetedMinMaxValues(),
  filterFns: {
    includesString: filterFn_includesString,
    inNumberRange: filterFn_inNumberRange,
    inDateRange: filterFn_inDateRange,
    equalsString: filterFn_equalsString,
  },
  sortFns: { alphanumeric: sortFn_alphanumeric, text: sortFn_text },
  columnSizingFeature,
  globalFilteringFeature,
  columnMeta: metaHelper<MyColumnMeta>(),
});

// Pass this as the first generic argument to `ColumnDef`, `Column`, `Table`,
// and `Row` so each type knows which feature APIs are available.
export type GridFeatures = typeof features;
