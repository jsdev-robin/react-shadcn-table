import { Table, TableBody, TableRow } from '@/components/ui/table';
import { useGrid } from '@/package/hooks/useGrid';
import React from 'react';
import GridCell from '../../shared/GridCell';

const GridEndBody = () => {
  'use no memo';
  const { table } = useGrid();

  return (
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
