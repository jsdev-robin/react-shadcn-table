'use client';

import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useGrid } from '@/package/hooks/useGrid';

const GridStartEmpty = () => {
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
              }}
            />
          ))}
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default GridStartEmpty;
