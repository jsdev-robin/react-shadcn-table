import { TableHead } from '@/components/ui/table';
import type { GridFeatures } from '@/package/features';
import type { Header, RowData } from '@tanstack/react-table';
import type { CSSProperties } from 'react';
import HeaderFilter from '../../header/HeaderFilter';
import HeaderMenu from '../../header/HeaderMenu';
import HeaderSort from '../../header/HeaderSort';

const GridCenterHead = ({
  header,
}: {
  header: Header<GridFeatures, RowData, unknown>;
}) => {
  'use no memo';
  const style: CSSProperties = {
    width: header.getSize(),
    minWidth: header.getSize(),
    maxWidth: header.getSize(),
    borderRight: '1px solid',
    borderColor: 'var(--border)',
    padding: 0,
  };

  return (
    <TableHead colSpan={header.colSpan} style={style}>
      {header.isPlaceholder ? null : (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 1,
            }}
          >
            <HeaderSort header={header} />
            <HeaderMenu header={header} />
          </div>
          <HeaderFilter column={header.column} />
        </div>
      )}
    </TableHead>
  );
};

export default GridCenterHead;
