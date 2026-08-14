import type { GridFeatures } from '@/package/features';
import type {
  ColumnDef,
  ColumnFiltersState,
  OnChangeFn,
  PaginationState,
  RowData,
  RowSelectionState,
  SortingState,
  TableState,
} from '@tanstack/react-table';

export interface GridProps<TData extends RowData> {
  payload?: {
    data: TData[];
    total: number;
  };
  columns: ColumnDef<GridFeatures, TData>[];
  name?: string;

  state?: Partial<TableState<GridFeatures>>;
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;
  onPaginationChange?: OnChangeFn<PaginationState>;
  onSortingChange?: OnChangeFn<SortingState>;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  setGlobalFilter?: React.Dispatch<React.SetStateAction<string>>;
  manualPagination?: boolean;
  manualFiltering?: boolean;
  manualSorting?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  isFetching?: boolean;
  refetch?: () => void;
}
