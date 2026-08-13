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
  paneRef1: React.RefObject<HTMLDivElement | null>;
  paneRef2: React.RefObject<HTMLDivElement | null>;
  paneRef3: React.RefObject<HTMLDivElement | null>;
  paneRef4: React.RefObject<HTMLDivElement | null>;
  paneRef5: React.RefObject<HTMLDivElement | null>;
  paneRef6: React.RefObject<HTMLDivElement | null>;
}

export interface GridContextProviderProps<TableData extends RowData> {
  children: React.ReactNode;
  payload?: {
    data: TableData[];
    total: number;
  };
  columns: ColumnDef<AppFeatures, TableData>[];
  name?: string;
}
