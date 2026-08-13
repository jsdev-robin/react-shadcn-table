import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useGridContext } from '@/packages/contexts/grid/useGridContext';

const THeader = () => {
  const { table } = useGridContext();

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
              <TableHead
                key={header.id}
                style={{
                  width: header.getSize(),
                  minWidth: header.getSize(),
                  maxWidth: header.getSize(),
                  borderRight: '1px solid',
                  borderColor: 'var(--border)',
                }}
              >
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
