import { Table, TableBody, TableRow } from '@/components/ui/table';
import { useGrid } from '@/package/hooks/useGrid';
import React from 'react';
import GridCell from '../../shared/GridCell';
import GridEndEmpty from './feedback/GridEndEmpty';
import GridEndSkeleton from './feedback/GridEndSkeleton';

const GridEndBody = () => {
  'use no memo';
  const { table, isLoading, isError } = useGrid();

  return isLoading ? (
    <GridEndSkeleton />
  ) : isError ? (
    <div>Error</div>
  ) : table.getRowModel().rows.length === 0 ? (
    <GridEndEmpty />
  ) : (
    <Table>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <React.Fragment key={row.id}>
            <TableRow data-state={row.getIsSelected()}>
              {row.getEndVisibleCells().map((cell) => (
                <GridCell key={cell.id} cell={cell} />
              ))}
            </TableRow>
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  );
};

export default GridEndBody;
