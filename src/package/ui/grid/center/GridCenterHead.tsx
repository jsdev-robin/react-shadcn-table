import { TableHead } from '@/components/ui/table';
import type { GridFeatures } from '@/package/features';
import type { Header, RowData } from '@tanstack/react-table';
import type { CSSProperties } from 'react';
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
  };

  return (
    <TableHead colSpan={header.colSpan} style={style}>
      {header.isPlaceholder ? null : (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              padding: 0.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 1,
            }}
          >
            <HeaderSort header={header} />
            <HeaderMenu header={header} />
          </div>
        </div>
      )}
    </TableHead>
  );
};

export default GridCenterHead;
