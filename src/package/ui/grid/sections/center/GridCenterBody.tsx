import { Table, TableBody, TableRow } from '@/components/ui/table';
import { useGrid } from '@/package/hooks/useGrid';
import React from 'react';
import GridCell from '../../shared/GridCell';

const GridCenterBody = () => {
  const { table, isSplit } = useGrid();

  return (
    <Table
      style={{
        width: table.getCenterTotalSize(),
      }}
    >
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
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  );
};

export default GridCenterBody;
