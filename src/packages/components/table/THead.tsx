'use client';

import { TableHead } from '@/components/ui/table';
import { useGrid } from '@/packages/contexts/grid/useGrid';
import {
  type Header,
  type RowData,
  type TableFeature,
} from '@tanstack/react-table';

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
      {header.isPlaceholder ? null : <table.FlexRender header={header} />}
    </TableHead>
  );
};

export default THead;
