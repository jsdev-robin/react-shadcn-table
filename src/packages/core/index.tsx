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
          borderRadius: '8px',
          overflow: 'hidden',
          width: '100%',
          background: 'color-mix(in srgb, var(--muted) 40%, transparent)',
          border: '1px solid var(--border)',
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
