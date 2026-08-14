import type { GridFeatures } from '@/package/features';
import type {
  ColumnDef,
  ReactTable,
  RowData,
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
}

export interface GridContextProviderProps<TData extends RowData> {
  children: React.ReactNode;
  payload?: {
    data: TData[];
    total: number;
  };
  columns: ColumnDef<GridFeatures, TData>[];
  name?: string;
}
