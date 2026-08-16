import { TableHead } from '@/components/ui/table';
import type { GridFeatures } from '@/package/features';
import { useGrid } from '@/package/hooks/useGrid';
import { getPinStyles } from '@/package/utils/getPinStyles';
import type { Header, RowData } from '@tanstack/react-table';
import type { CSSProperties } from 'react';
import HeaderFilter from '../../header/HeaderFilter';
import HeaderMenu from '../../header/HeaderMenu';
import HeaderResizing from '../../header/HeaderResizing';
import HeaderSort from '../../header/HeaderSort';

const GridHead = ({
  header,
}: {
  header: Header<GridFeatures, RowData, unknown>;
}) => {
  'use no memo';
  const { isSplit } = useGrid();

  const style: CSSProperties = {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: header.getSize(),
    minWidth: header.getSize(),
    maxWidth: header.getSize(),
    borderRight: '1px solid',
    borderColor: 'var(--border)',
    padding: 0,
    ...getPinStyles(header.column, isSplit),
  };

  return (
    <TableHead colSpan={header.colSpan} style={style}>
      {header.isPlaceholder ? null : (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '4px',
            }}
          >
            <HeaderSort header={header} />
            <HeaderMenu header={header} />
          </div>
          <HeaderFilter column={header.column} />
        </div>
      )}
      <HeaderResizing header={header} />
    </TableHead>
  );
};

export default GridHead;
