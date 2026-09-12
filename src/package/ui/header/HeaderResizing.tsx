'use client';

import type { GridFeatures } from '@/package/features';
import { type Header, type RowData } from '@tanstack/react-table';

const HeaderResizing = ({
  header,
}: {
  header: Header<GridFeatures, RowData, unknown>;
}) => {
  'use no memo';
  const isResizing = header.column.getIsResizing();
  return (
    <div
      className="header-resizer"
      onDoubleClick={() => header.column.resetSize()}
      onMouseDown={header.getResizeHandler()}
      onTouchStart={header.getResizeHandler()}
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        height: '100%',
        width: '5px',
        backgroundColor: isResizing ? 'var(--primary)' : 'rgba(0, 0, 0, 0.5)',
        cursor: 'col-resize',
        userSelect: 'none',
        touchAction: 'none',
        opacity: isResizing ? 1 : 0,
      }}
    />
  );
};

export default HeaderResizing;
