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

export interface GridProps<TData extends RowData> {
  payload?: {
    data: TData[];
    total: number;
  };
  columns: ColumnDef<GridFeatures, TData>[];
  name?: string;
  height?: string;

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
  renderSubComponent?: (props: {
    row: Row<GridFeatures, TData>;
  }) => React.ReactElement;
  getRowCanExpand?: (row: Row<GridFeatures, TData>) => boolean;
  enableCellSelection?: boolean;
  enableCellSpanning?: boolean;
  enableRowSelection?: boolean;
}
