import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useGridContext } from '@/packages/contexts/grid/useGridContext';

const TBody = () => {
  const { table } = useGridContext();

  return (
    <Table>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getAllCells().map((cell) => (
              <TableCell key={cell.id}>
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
