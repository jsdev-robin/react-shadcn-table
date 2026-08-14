import { Table, TableHeader, TableRow } from '@/components/ui/table';
import { useGrid } from '@/packages/contexts/grid/useGrid';
import THead from './THead';

const THeader = () => {
  const { table } = useGrid();

  return (
    <Table
      style={{
        width: table.getCenterTotalSize(),
      }}
    >
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <THead header={header} key={header.id} />
            ))}
          </TableRow>
        ))}
      </TableHeader>
    </Table>
  );
};

export default THeader;
