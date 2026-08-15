'use client';

import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useGrid } from '@/package/hooks/useGrid';

const GridEndEmpty = () => {
  const { table } = useGrid();

  return (
    <Table>
      <TableBody>
        <TableRow>
          {table.getEndVisibleLeafColumns().map((column, i) => (
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

export default GridEndEmpty;
