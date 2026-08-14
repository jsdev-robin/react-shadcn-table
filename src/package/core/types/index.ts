import type { GridFeatures } from '@/package/features';
import type { ColumnDef, RowData } from '@tanstack/react-table';

export interface GridProps<TData extends RowData> {
  payload?: {
    data: TData[];
    total: number;
  };
  columns: ColumnDef<GridFeatures, TData>[];
  name?: string;
}
