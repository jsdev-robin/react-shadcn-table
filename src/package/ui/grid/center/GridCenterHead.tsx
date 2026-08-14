import { TableHead } from '@/components/ui/table';
import type { GridFeatures } from '@/package/features';
import { useGrid } from '@/package/hooks/useGrid';
import type { Header, RowData } from '@tanstack/react-table';

const GridCenterHead = ({
  header,
}: {
  header: Header<GridFeatures, RowData, unknown>;
}) => {
  const { table } = useGrid();
  return (
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
      {header.isPlaceholder ? null : <table.FlexRender header={header} />}
    </TableHead>
  );
};

export default GridCenterHead;
