'use client';

import type { RowData } from '@tanstack/react-table';
import { GridContextProvider } from '../contexts/GridContext';
import { useGridContext } from '../contexts/useGridContext';
import type { GridProps } from '../types';

const GridTable = () => {
  const { table } = useGridContext();

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder ? null : (
                  <table.FlexRender header={header} />
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getAllCells().map((cell) => (
              <td key={cell.id}>
                <table.FlexRender cell={cell} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Grid = <T extends RowData>({ payload, columns, key }: GridProps<T>) => {
  'use no memo';
  return (
    <GridContextProvider payload={payload} columns={columns} key={key}>
      <GridTable />
    </GridContextProvider>
  );
};

export { Grid };
