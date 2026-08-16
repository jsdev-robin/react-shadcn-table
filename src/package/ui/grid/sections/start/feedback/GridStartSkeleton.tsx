'use client';

import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useGrid } from '@/package/hooks/useGrid';
import { getPinStyles } from '@/package/utils/getPinStyles';
import GridRowSkeleton from '../../../shared/feedback/GridRowSkeleton';

const GridStartSkeleton = () => {
  const { table, isSplit } = useGrid();

  const visibleColumns = table
    .getStartHeaderGroups()
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
                  borderRight: '1px solid',
                  borderColor: 'var(--border)',
                  transition: 'padding 0.2s',
                  padding:
                    table.state.density === 'sm'
                      ? '4px'
                      : table.state.density === 'md'
                        ? '8px'
                        : '16px',
                  ...getPinStyles(column, isSplit),
                }}
              >
                <GridRowSkeleton column={column} i={i} j={j} />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default GridStartSkeleton;
