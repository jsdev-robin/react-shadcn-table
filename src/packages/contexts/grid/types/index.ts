import type { AppFeatures } from '@/packages/features';
import type {
  ColumnDef,
  ReactTable,
  RowData,
  TableState,
} from '@tanstack/react-table';
import type React from 'react';

export interface GridContextProps<TableData extends RowData = RowData> {
  table: ReactTable<AppFeatures, TableData, TableState<AppFeatures>>;
}

export interface GridContextProviderProps<TableData extends RowData> {
  children: React.ReactNode;
  payload?: {
    data: TableData[];
    total: number;
  };
  columns: ColumnDef<AppFeatures, TableData>[];
  name: string;
}
