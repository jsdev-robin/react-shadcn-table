import type { ColumnDef, RowData } from '@tanstack/react-table';
import type { AppFeatures } from '../contexts/GridContext';

export interface GridProps<T extends RowData> {
  payload?: {
    data: T[];
    total: number;
  };
  columns: ColumnDef<AppFeatures, T>[];
  key: string;
}
