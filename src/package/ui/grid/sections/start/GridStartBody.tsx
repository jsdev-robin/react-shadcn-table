import { Table, TableBody, TableRow } from '@/components/ui/table';
import { useGrid } from '@/package/hooks/useGrid';
import React from 'react';
import GridCell from '../../shared/GridCell';
import GridStartEmpty from './feedback/GridStartEmpty';
import GridStartSkeleton from './feedback/GridStartSkeleton';
import { GridStartRowPin } from './GridStartRowPin';

const GridStartBody = () => {
  'use no memo';
  const { table, isLoading, isError } = useGrid();

  return isLoading ? (
    <GridStartSkeleton />
  ) : isError ? (
    <div>Error</div>
  ) : table.getRowModel().rows.length === 0 ? (
    <GridStartEmpty />
  ) : (
    <Table>
      <TableBody>
        {table.getTopRows().map((row) => (
          <GridStartRowPin key={row.id} row={row} />
        ))}
        {table.getRowModel().rows.map((row) => (
          <React.Fragment key={row.id}>
            <TableRow data-state={row.getIsSelected()}>
              {row.getStartVisibleCells().map((cell) => (
                <GridCell key={cell.id} cell={cell} />
              ))}
            </TableRow>
          </React.Fragment>
        ))}
        {table.getBottomRows().map((row) => (
          <GridStartRowPin key={row.id} row={row} />
        ))}
      </TableBody>
    </Table>
  );
};

export default GridStartBody;
