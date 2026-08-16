import {
  cellSelectionFeature,
  cellSpanningFeature,
  columnFacetingFeature,
  columnFilteringFeature,
  columnOrderingFeature,
  columnPinningFeature,
  columnResizingFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  createExpandedRowModel,
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
  rowExpandingFeature,
  rowPaginationFeature,
  rowPinningFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_text,
  tableFeatures,
} from '@tanstack/react-table';
import { densityPlugin } from '../state/rowDensity';

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
  rowExpandingFeature,
  cellSpanningFeature,
  cellSelectionFeature,
  rowPinningFeature,
  columnOrderingFeature,
  columnPinningFeature,
  columnResizingFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  columnFacetingFeature,
  columnFilteringFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortedRowModel: createSortedRowModel(),
  facetedRowModel: createFacetedRowModel(),
  facetedUniqueValues: createFacetedUniqueValues(),
  facetedMinMaxValues: createFacetedMinMaxValues(),
  expandedRowModel: createExpandedRowModel(),
  filterFns: {
    includesString: filterFn_includesString,
    inNumberRange: filterFn_inNumberRange,
    inDateRange: filterFn_inDateRange,
    equalsString: filterFn_equalsString,
  },
  sortFns: { alphanumeric: sortFn_alphanumeric, text: sortFn_text },
  globalFilteringFeature,
  columnMeta: metaHelper<MyColumnMeta>(),

  // Custom
  densityPlugin,
});

// Pass this as the first generic argument to `ColumnDef`, `Column`, `Table`,
// and `Row` so each type knows which feature APIs are available.
export type GridFeatures = typeof features;
