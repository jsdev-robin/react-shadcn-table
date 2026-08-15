'use client';

import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useGrid } from '@/package/hooks/useGrid';

const GridCenterEmpty = () => {
  const { table } = useGrid();

  return (
    <Table>
      <TableBody>
        <TableRow>
          {table.getStartVisibleLeafColumns().map((column, i) => (
            <TableCell
              key={i}
              style={{
                width: column.getSize(),
                minWidth: column.getSize(),
                maxWidth: column.getSize(),
                borderRight: '1px solid',
                borderColor: 'var(--border)',
              }}
            />
          ))}
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default GridCenterEmpty;
