'use client';

import type { RowData } from '@tanstack/react-table';
import TMain from '../components/table/TMain';
import { GridContextProvider } from '../contexts/grid/GridContext';
import type { GridProps } from '../types';

const Grid = <T extends RowData>({ payload, columns, name }: GridProps<T>) => {
  return (
    <GridContextProvider payload={payload} columns={columns} name={name}>
      <GridInner />
    </GridContextProvider>
  );
};

const GridInner = () => {
  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          borderRadius: '12px',
          overflow: 'hidden',
          border: 1,
          borderColor: 'divider',
          width: '100%',
          background: 'color-mix(in srgb, var(--muted) 50%, transparent)',
        }}
      >
        <div
          style={{
            overflow: 'hidden',
            flex: 1,
          }}
        >
          <TMain />
        </div>
      </div>
    </div>
  );
};

export { Grid };
