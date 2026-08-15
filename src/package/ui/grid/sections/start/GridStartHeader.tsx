import { Table, TableHeader, TableRow } from '@/components/ui/table';
import { useGrid } from '@/package/hooks/useGrid';
import GridHead from '../../shared/GridHead';

const GridStartHeader = () => {
  'use no memo';
  const { table } = useGrid();

  return (
    <Table>
      <TableHeader>
        {table.getStartHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <GridHead header={header} key={header.id} />
            ))}
          </TableRow>
        ))}
      </TableHeader>
    </Table>
  );
};

export default GridStartHeader;
