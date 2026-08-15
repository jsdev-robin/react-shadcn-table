'use client';

import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useGrid } from '@/package/hooks/useGrid';
import { useMemo } from 'react';
import GridCenterEmptyMessage from './GridCenterEmptyMessage';

const GridCenterEmpty = () => {
  const { table, isSplit } = useGrid();

  const visibleColumns = useMemo(
    () =>
      isSplit
        ? table.getCenterVisibleLeafColumns()
        : table.getVisibleLeafColumns(),
    [table, isSplit],
  );

  return (
    <>
      <Table>
        <TableBody>
          <TableRow>
            {visibleColumns.map((column, i) => (
              <TableCell
                key={i}
                style={{
                  width: column.getSize(),
                  minWidth: column.getSize(),
                  maxWidth: column.getSize(),
                }}
              />
            ))}
          </TableRow>
        </TableBody>
      </Table>
      <GridCenterEmptyMessage />
    </>
  );
};

export default GridCenterEmpty;
