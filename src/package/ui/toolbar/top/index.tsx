'use client';

import { DebouncedInput } from '@/components/ui/debounced-input';
import { useGrid } from '@/package/hooks/useGrid';

const TopToolbar = () => {
  const { setGlobalFilter, globalFilter } = useGrid();

  return (
    <div
      style={{
        paddingInline: '16px',
        height: '64px',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <DebouncedInput
        style={{ width: '240px' }}
        type="search"
        value={String(globalFilter)}
        onChange={(value) => {
          setGlobalFilter?.(String(value));
        }}
        placeholder="Search by query"
      />
    </div>
  );
};

export default TopToolbar;
