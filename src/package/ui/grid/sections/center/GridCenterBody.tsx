import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useGrid } from '@/package/hooks/useGrid';
import React from 'react';
import GridCell from '../../shared/GridCell';
import GridCenterEmpty from './feedback/GridCenterEmpty';
import GridCenterError from './feedback/GridCenterError';
import GridCenterSkeleton from './feedback/GridCenterSkeleton';
import { GridCenterRowPin } from './GridCenterRowPin';

const GridCenterBody = () => {
  'use no memo';
  const { table, isSplit, isLoading, isError, renderSubComponent } = useGrid();

  return isLoading ? (
    <GridCenterSkeleton />
  ) : isError ? (
    <GridCenterError />
  ) : table.getRowModel().rows.length === 0 ? (
    <GridCenterEmpty />
  ) : (
    <Table
      style={{
        width: table.getCenterTotalSize(),
      }}
    >
      {table.getTopRows().map((row) => (
        <GridCenterRowPin key={row.id} row={row} />
      ))}
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <React.Fragment key={row.id}>
            <TableRow data-state={row.getIsSelected()}>
              {(isSplit
                ? row.getCenterVisibleCells()
                : row.getVisibleCells()
              ).map((cell) => (
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
      </TableBody>
      {table.getBottomRows().map((row) => (
        <GridCenterRowPin key={row.id} row={row} />
      ))}
    </Table>
  );
};

export default GridCenterBody;
