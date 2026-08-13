import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useGridContext } from '@/packages/contexts/grid/useGridContext';

const THeader = () => {
  const { table } = useGridContext();

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {header.isPlaceholder ? null : (
                  <table.FlexRender header={header} />
                )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
    </Table>
  );
};

export default THeader;
