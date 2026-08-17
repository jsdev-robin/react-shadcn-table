import type { GridFeatures } from '@/package/features';
import type {
  ColumnDef,
  ColumnFiltersState,
  OnChangeFn,
  PaginationState,
  ReactTable,
  Row,
  RowData,
  RowSelectionState,
  SortingState,
  TableState,
} from '@tanstack/react-table';
import type React from 'react';

export interface GridContextProps<TableData extends RowData = RowData> {
  table: ReactTable<GridFeatures, TableData, TableState<GridFeatures>>;
  paneRef1: React.RefObject<HTMLDivElement | null>;
  paneRef2: React.RefObject<HTMLDivElement | null>;
  paneRef3: React.RefObject<HTMLDivElement | null>;
  paneRef4: React.RefObject<HTMLDivElement | null>;
  paneRef5: React.RefObject<HTMLDivElement | null>;
  paneRef6: React.RefObject<HTMLDivElement | null>;
  gridWrapperRef: React.RefObject<HTMLDivElement | null>;
  isSplit: boolean;
  setIsSplit: React.Dispatch<React.SetStateAction<boolean>>;
  isFetching?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  refetch?: () => void;
  height?: string;
  globalFilter: string;
  setGlobalFilter?: React.Dispatch<React.SetStateAction<string>>;
  renderSubComponent?: (props: {
    row: Row<GridFeatures, TableData>;
  }) => React.ReactElement;
  name?: string;
}

export interface GridContextProviderProps<TData extends RowData> {
  children: React.ReactNode;
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
