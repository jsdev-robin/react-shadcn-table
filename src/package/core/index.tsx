'use client';

import type { RowData } from '@tanstack/react-table';
import { GridContextProvider } from '../contexts/grid/GridContext';
import GridCenter from '../ui/grid/center/GridCenter';
import type { GridProps } from './types';

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
          borderRadius: '6px',
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
          <GridCenter />
        </div>
      </div>
    </div>
  );
};

export { Grid };
