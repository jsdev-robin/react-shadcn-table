'use client';

import { TableHead } from '@/components/ui/table';
import { useGrid } from '@/packages/contexts/grid/useGrid';
import {
  type Header,
  type RowData,
  type TableFeature,
} from '@tanstack/react-table';
import HeaderFilter from '../header/HeaderFilter';

interface THeadProps {
  header: Header<
    {
      columnSizingFeature: TableFeature;
    },
    RowData,
    unknown
  >;
}

const THead = ({ header }: THeadProps) => {
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
            <div>
              {header.isPlaceholder ? null : (
                <table.FlexRender header={header} />
              )}
            </div>
          </div>
          <HeaderFilter column={header.column} />
        </div>
      )}
    </TableHead>
  );
};

export default THead;
