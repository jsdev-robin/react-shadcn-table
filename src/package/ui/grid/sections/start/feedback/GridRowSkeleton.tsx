'use client';

import { Skeleton } from '@/components/ui/skeleton';
import type { GridFeatures } from '@/package/features';
import type { Column, RowData } from '@tanstack/react-table';
import { Loader } from 'lucide-react';

const PREDEFINED_WIDTHS = [60, 100, 80, 50, 70, 40, 90];

const GridRowSkeleton = ({
  column,
  i,
  j,
}: {
  column: Column<GridFeatures, RowData, unknown>;
  i: number;
  j: number;
}) => {
  return (
    <>
      {['select'].includes(column.id) ? (
        <>
          <style>{`
            @keyframes grid-skeleton-spin {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
          `}</style>
          <Loader
            size={16}
            style={{ animation: 'grid-skeleton-spin 1s linear infinite' }}
          />
        </>
      ) : ['actions', 'pin', 'drag-handle', 'rowNumber'].includes(column.id) ? (
        <Skeleton
          style={{
            width: '100%',
            height: '16px',
          }}
        />
      ) : (
        <Skeleton
          style={{
            width: `${PREDEFINED_WIDTHS[(i + j) % PREDEFINED_WIDTHS.length]}px`,
            height: '16px',
          }}
        />
      )}
    </>
  );
};

export default GridRowSkeleton;
