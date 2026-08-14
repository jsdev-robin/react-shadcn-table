import { Table, TableHeader, TableRow } from '@/components/ui/table';
import { useGrid } from '@/package/hooks/useGrid';
import GridCenterHead from './GridCenterHead';

const GridCenterHeader = () => {
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
              <GridCenterHead header={header} key={header.id} />
            ))}
          </TableRow>
        ))}
      </TableHeader>
    </Table>
  );
};

export default GridCenterHeader;
