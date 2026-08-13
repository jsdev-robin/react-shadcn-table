'use client';

import {
  tableFeatures,
  useTable,
  type ColumnDef,
  type ReactTable,
  type RowData,
  type TableState,
} from '@tanstack/react-table';
import React, { createContext } from 'react';

const features = tableFeatures({});
type AppFeatures = typeof features;

export interface GridContextProps<TableData extends RowData = RowData> {
  table: ReactTable<AppFeatures, TableData, TableState<AppFeatures>>;
}

export const GridContext = createContext<GridContextProps<any> | undefined>(
  undefined,
);

interface GridContextProviderProps<TableData extends RowData> {
  children: React.ReactNode;
  payload?: {
    data: TableData[];
    total: number;
  };
  columns: ColumnDef<AppFeatures, TableData>[];
  key: string;
}

export const GridContextProvider = <TableData extends RowData>({
  children,
  columns,
  payload,
  key,
}: GridContextProviderProps<TableData>) => {
  const table = useTable({
    data: payload?.data ?? [],
    key: key,
    features: features,
    columns: columns,
  });

  return (
    <GridContext.Provider value={{ table } as unknown as GridContextProps<any>}>
      {children}
    </GridContext.Provider>
  );
};
