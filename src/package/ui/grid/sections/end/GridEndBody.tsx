import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useGrid } from '@/package/hooks/useGrid';
import React from 'react';
import GridCell from '../../shared/GridCell';
import GridEndEmpty from './feedback/GridEndEmpty';
import GridEndSkeleton from './feedback/GridEndSkeleton';
import { GridEndRowPin } from './GridEndRowPin';

const GridEndBody = () => {
  'use no memo';
  const { table, isLoading, isError, renderSubComponent } = useGrid();

  return isLoading ? (
    <GridEndSkeleton />
  ) : isError ? (
    <div>Error</div>
  ) : table.getRowModel().rows.length === 0 ? (
    <GridEndEmpty />
  ) : (
    <Table>
      <TableBody>
        {table.getTopRows().map((row) => (
          <GridEndRowPin key={row.id} row={row} />
        ))}
        {table.getRowModel().rows.map((row) => (
          <React.Fragment key={row.id}>
            <TableRow data-state={row.getIsSelected()}>
              {row.getEndVisibleCells().map((cell) => (
                <GridCell key={cell.id} cell={cell} />
              ))}
            </TableRow>
            {renderSubComponent && row.getIsExpanded() && (
              <TableRow>
                <TableCell colSpan={row.getVisibleCells().length}>
                  {renderSubComponent({ row })}
                </TableCell>
              </TableRow>
            )}
          </React.Fragment>
        ))}
        {table.getTopRows().map((row) => (
          <GridEndRowPin key={row.id} row={row} />
        ))}
      </TableBody>
    </Table>
  );
};

export default GridEndBody;
