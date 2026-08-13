'use client';

import { useTable, type RowData } from '@tanstack/react-table';
import { createContext } from 'react';
import { features } from '../../features';
import type { GridContextProps, GridContextProviderProps } from './types';

export const GridContext = createContext<GridContextProps<any> | undefined>(
  undefined,
);

export const GridContextProvider = <TableData extends RowData>({
  children,
  columns,
  payload,
  name,
}: GridContextProviderProps<TableData>) => {
  const table = useTable(
    {
      data: payload?.data ?? [],
      key: name,
      features: features,
      columns: columns,
    },
    (state) => state,
  );

  return (
    <GridContext.Provider value={{ table } as unknown as GridContextProps<any>}>
      {children}
    </GridContext.Provider>
  );
};
