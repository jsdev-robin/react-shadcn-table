import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useGridContext } from '@/packages/contexts/grid/useGridContext';

const TBody = () => {
  const { table } = useGridContext();

  return (
    <Table
      style={{
        width: table.getCenterTotalSize(),
      }}
    >
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getAllCells().map((cell) => (
              <TableCell
                key={cell.id}
                style={{
                  width: cell.column.getSize(),
                  minWidth: cell.column.getSize(),
                  maxWidth: cell.column.getSize(),
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
              >
                <table.FlexRender cell={cell} />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TBody;
