import type {
  ColumnFiltersState,
  PaginationState,
  RowSelectionState,
  SortingState,
} from '@tanstack/react-table';
import React from 'react';

/**
 * A React hook that manages all controlled state required to drive a
 * TanStack Table instance (column filters, pagination, sorting, row
 * selection, and global filter), and returns them pre-packaged in the
 * shape expected by both the table's `state`/`onXChange` props and by
 * consumers who need direct access to the current `rowSelection`.
 *
 * Internally, each piece of state is backed by its own `useState`, so
 * updating one (e.g. `sorting`) does not cause unrelated state (e.g.
 * `rowSelection`) to reset.
 *
 * @returns An object containing:
 * - `state` - The combined table state object
 *   (`columnFilters`, `globalFilter`, `pagination`, `sorting`,
 *   `rowSelection`), meant to be spread into the table's `state` prop.
 * - `handlers` - The corresponding change handlers
 *   (`onColumnFiltersChange`, `onPaginationChange`, `onSortingChange`,
 *   `setGlobalFilter`, `onRowSelectionChange`), meant to be spread as
 *   props onto the table component.
 * - `rowSelection` - The current `RowSelectionState` on its own, exposed
 *   separately for convenience (e.g. to pass into utilities like
 *   `pluckSelected` without destructuring it out of `state` again).
 *
 * @example
 * ```tsx
 * const { state, handlers, rowSelection } = useGridState();
 *
 * <Grid
 *   columns={columns}
 *   data={data}
 *   state={state}
 *   {...handlers}
 * />
 *
 * // Use rowSelection directly elsewhere, e.g.:
 * const selectedIds = pluckSelected(data, rowSelection, 'id');
 * ```
 */
export const useGridState = () => {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = React.useState('');

  const state = {
    columnFilters,
    globalFilter,
    pagination,
    sorting,
    rowSelection,
  };

  const handlers = {
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    setGlobalFilter: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
  };

  return { state, handlers, rowSelection };
};
