'use client';

import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useGrid } from '@/package/hooks/useGrid';
import { getPinStyles } from '@/package/utils/getPinStyles';
import GridCenterRowSkeleton from './GridCenterRowSkeleton';

const GridCenterSkeleton = () => {
  const { table, isSplit } = useGrid();

  const visibleColumns = (
    isSplit ? table.getCenterHeaderGroups() : table.getHeaderGroups()
  )
    .map((group) =>
      group.headers
        .filter((header) => !header.isPlaceholder && !header.subHeaders?.length)
        .map((header) => header.column),
    )
    .flat();

  return (
    <Table>
      <TableBody>
        {[...Array(20)].map((_, i) => (
          <TableRow key={i}>
            {visibleColumns.map((column, j) => (
              <TableCell
                key={j}
                style={{
                  width: column.getSize(),
                  minWidth: column.getSize(),
                  maxWidth: column.getSize(),

                  transition: 'padding 0.2s',
                  ...getPinStyles(column, isSplit),
                }}
              >
                <GridCenterRowSkeleton column={column} i={i} j={j} />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default GridCenterSkeleton;
