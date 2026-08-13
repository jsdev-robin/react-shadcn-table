import type { ColumnDef, RowData } from '@tanstack/react-table';
import type { AppFeatures } from '../features';

export interface GridProps<T extends RowData> {
  payload?: {
    data: T[];
    total: number;
  };
  columns: ColumnDef<AppFeatures, T>[];
  name?: string;
}
