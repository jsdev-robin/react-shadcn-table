import type { GridFeatures } from '@/package/features';
import type {
  ColumnDef,
  ColumnFiltersState,
  OnChangeFn,
  PaginationState,
  Row,
  RowData,
  RowSelectionState,
  SortingState,
  TableState,
} from '@tanstack/react-table';

/**
 * Props for the `Grid` component.
 *
 * `Grid` is a reusable, feature-rich data-table component built on top of
 * `@tanstack/react-table`. It supports sorting, filtering, pagination,
 * column/row pinning, column resizing, row selection, cell selection,
 * cell spanning, and row expansion out of the box.
 *
 * @typeParam TData - The shape of a single row of data. Must satisfy
 * TanStack Table's `RowData` constraint.
 *
 * @example
 * Basic usage with local state via `useGridState`:
 * ```tsx
 * import { Grid, useGridState, type ColumnDef, type GridFeatures } from 'react-shadcn-table';
 *
 * interface User {
 *   id: string;
 *   name: string;
 * }
 *
 * const columns: ColumnDef<GridFeatures, User, unknown>[] = [
 *   { id: 'id', accessorKey: 'id', header: () => 'ID' },
 *   { id: 'name', accessorKey: 'name', header: () => 'Name' },
 * ];
 *
 * const App = () => {
 *   const { state, handlers } = useGridState();
 *
 *   return (
 *     <Grid
 *       payload={{ data: users, total: users.length }}
 *       columns={columns}
 *       state={state}
 *       {...handlers}
 *     />
 *   );
 * };
 * ```
 *
 * @example
 * Server-side (manual) pagination, sorting, and filtering:
 * ```tsx
 * const { state, handlers } = useGridState();
 * const { data, isLoading, isError, refetch, isFetching } = useUsersQuery({
 *   queryString: URLSearch(state),
 * });
 *
 * <Grid
 *   payload={{ data: data?.rows ?? [], total: data?.total ?? 0 }}
 *   columns={columns}
 *   manualPagination
 *   manualFiltering
 *   manualSorting
 *   isLoading={isLoading}
 *   isError={isError}
 *   isFetching={isFetching}
 *   refetch={refetch}
 *   state={state}
 *   {...handlers}
 * />
 * ```
 */
export interface GridProps<TData extends RowData> {
  /**
   * The row data to render, plus the total row count (used for
   * server-side/manual pagination to compute total pages).
   *
   * @example
   * ```tsx
   * payload={{ data: users, total: 128 }}
   * ```
   */
  payload?: {
    data: TData[];
    total: number;
  };

  /**
   * Column definitions for the table. Required. Typed against the grid's
   * internal `GridFeatures` so column APIs (pinning, spanning, etc.) are
   * available inside `header`/`cell` renderers.
   *
   * @example
   * ```tsx
   * const columns: ColumnDef<GridFeatures, User, unknown>[] = [
   *   {
   *     id: 'email',
   *     accessorKey: 'email',
   *     header: () => <div>Email</div>,
   *     meta: { filterVariant: 'text' },
   *   },
   * ];
   * ```
   */
  columns: ColumnDef<GridFeatures, TData>[];

  /**
   * A unique name for this grid instance, used as a storage key to persist
   * per-grid layout (column visibility, pinning, order, sizing, split view)
   * across sessions. Use a distinct name per grid instance in your app.
   *
   * @defaultValue `'munza'`
   *
   * @example
   * ```tsx
   * <Grid name="users-grid" ... />
   * ```
   */
  name?: string;

  /**
   * Fixed height for the table's scrollable body, as a CSS value.
   *
   * @defaultValue `'65vh'`
   *
   * @example
   * ```tsx
   * <Grid height="480px" ... />
   * ```
   */
  height?: string;

  /**
   * The current table state (filters, pagination, sorting, selection,
   * global filter, etc.), typically supplied by `useGridState`. Partial,
   * since any field you omit falls back to the grid's own internal state.
   *
   * @example
   * ```tsx
   * const { state } = useGridState();
   * <Grid state={state} ... />
   * ```
   */
  state?: Partial<TableState<GridFeatures>>;

  /**
   * Callback fired when column filters change.
   *
   * @example
   * ```tsx
   * onColumnFiltersChange={(updater) => setColumnFilters(updater)}
   * ```
   */
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;

  /**
   * Callback fired when pagination (page index or page size) changes.
   *
   * @example
   * ```tsx
   * onPaginationChange={(updater) => setPagination(updater)}
   * ```
   */
  onPaginationChange?: OnChangeFn<PaginationState>;

  /**
   * Callback fired when column sorting changes.
   *
   * @example
   * ```tsx
   * onSortingChange={(updater) => setSorting(updater)}
   * ```
   */
  onSortingChange?: OnChangeFn<SortingState>;

  /**
   * Callback fired when row selection changes.
   *
   * @example
   * ```tsx
   * onRowSelectionChange={(updater) => setRowSelection(updater)}
   * ```
   */
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;

  /**
   * Setter for the global (cross-column) search/filter text.
   *
   * @example
   * ```tsx
   * const [globalFilter, setGlobalFilter] = useState('');
   * <Grid setGlobalFilter={setGlobalFilter} ... />
   * ```
   */
  setGlobalFilter?: React.Dispatch<React.SetStateAction<string>>;

  /**
   * Enables server-side (manual) pagination. When `true`, the table will
   * not paginate `payload.data` itself and instead relies on `payload.total`
   * and your `onPaginationChange` handler to fetch the correct page.
   *
   * @defaultValue `false`
   *
   * @example
   * ```tsx
   * <Grid manualPagination payload={{ data: pageOfUsers, total: 500 }} ... />
   * ```
   */
  manualPagination?: boolean;

  /**
   * Enables server-side (manual) column filtering. When `true`, the table
   * assumes `payload.data` is already filtered and skips its own
   * client-side filtering row model for column filters.
   *
   * @defaultValue `false`
   *
   * @example
   * ```tsx
   * <Grid manualFiltering onColumnFiltersChange={setColumnFilters} ... />
   * ```
   */
  manualFiltering?: boolean;

  /**
   * Enables server-side (manual) sorting. When `true`, the table assumes
   * `payload.data` already arrives sorted and skips its own client-side
   * sorting row model.
   *
   * @defaultValue `false`
   *
   * @example
   * ```tsx
   * <Grid manualSorting onSortingChange={setSorting} ... />
   * ```
   */
  manualSorting?: boolean;

  /**
   * Shows a loading state (e.g. skeleton rows) while data is being fetched.
   *
   * @example
   * ```tsx
   * <Grid isLoading={isPending} ... />
   * ```
   */
  isLoading?: boolean;

  /**
   * Shows an error state, typically when a data-fetch request has failed.
   *
   * @example
   * ```tsx
   * <Grid isError={isError} ... />
   * ```
   */
  isError?: boolean;

  /**
   * Indicates a background refetch is in progress (distinct from the
   * initial `isLoading` state), useful for showing a subtle refresh
   * indicator without blocking the existing rows.
   *
   * @example
   * ```tsx
   * <Grid isFetching={isFetching} ... />
   * ```
   */
  isFetching?: boolean;

  /**
   * Function to manually re-trigger a data fetch, e.g. from a "Retry"
   * button on the error state or a refresh action in the toolbar.
   *
   * @example
   * ```tsx
   * <Grid refetch={() => queryClient.refetchQueries(['users'])} ... />
   * ```
   */
  refetch?: () => void;

  /**
   * Renders custom content inside an expanded row (used together with
   * `getRowCanExpand`).
   *
   * @example
   * ```tsx
   * renderSubComponent={({ row }) => (
   *   <pre>{JSON.stringify(row.original, null, 2)}</pre>
   * )}
   * ```
   */
  renderSubComponent?: (props: {
    row: Row<GridFeatures, TData>;
  }) => React.ReactElement;

  /**
   * Determines whether a given row can be expanded to show
   * `renderSubComponent`. If omitted, no rows are expandable and the
   * expand column is not rendered.
   *
   * @example
   * ```tsx
   * getRowCanExpand={(row) => row.original.subRows?.length > 0}
   * ```
   */
  getRowCanExpand?: (row: Row<GridFeatures, TData>) => boolean;

  /**
   * Enables Excel-like click-and-drag cell range selection, independent
   * of row selection.
   *
   * @defaultValue `false`
   *
   * @example
   * ```tsx
   * <Grid enableCellSelection ... />
   * ```
   */
  enableCellSelection?: boolean;

  /**
   * Enables merged/spanning cells for columns whose `ColumnDef` opts into
   * spanning.
   *
   * @defaultValue `false`
   *
   * @example
   * ```tsx
   * <Grid enableCellSpanning ... />
   * ```
   */
  enableCellSpanning?: boolean;

  /**
   * Enables or disables row selection (checkbox column and related
   * selection APIs). When `false`, the selection column is not rendered.
   *
   * @defaultValue `true`
   *
   * @example
   * ```tsx
   * <Grid enableRowSelection={false} ... />
   * ```
   */
  enableRowSelection?: boolean;

  /**
   * Additional content rendered on the right side of the built-in toolbar,
   * next to the global search field (e.g. custom action buttons like
   * Add, Filter, Refresh, or Export).
   *
   * @example
   * ```tsx
   * <Grid
   *   topRightSlot={
   *     <div className="flex items-center gap-2">
   *       <Button variant="ghost" size="icon" onClick={refetch}>
   *         <RefreshCw className="size-4" />
   *       </Button>
   *       <Button size="icon" onClick={handleAdd}>
   *         <Plus className="size-4" />
   *       </Button>
   *     </div>
   *   }
   *   ...
   * />
   * ```
   */
  topRightSlot?: React.ReactNode;
}
