import { Table, TableHeader, TableRow } from '@/components/ui/table';
import { useGrid } from '@/package/hooks/useGrid';
import GridHead from '../../shared/GridHead';

const GridCenterHeader = () => {
  'use no memo';
  const { table, isSplit } = useGrid();

  return (
    <Table
      style={{
        width: table.getCenterTotalSize(),
      }}
    >
      <TableHeader>
        {(isSplit
          ? table.getCenterHeaderGroups()
          : table.getHeaderGroups()
        ).map((headerGroup) => (
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

export default GridCenterHeader;
