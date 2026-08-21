'use client';

import { DebouncedInput } from '@/components/ui/debounced-input';
import { useGrid } from '@/package/hooks/useGrid';

const TopToolbar = () => {
  const { setGlobalFilter, globalFilter, topRightSlot } = useGrid();

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
      <div
        style={{
          display: 'flex',
          justifyItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <DebouncedInput
          style={{ width: '100%' }}
          type="search"
          value={String(globalFilter)}
          onChange={(value) => {
            setGlobalFilter?.(String(value));
          }}
          placeholder="Search by query"
        />
      </div>
      <div>{topRightSlot}</div>
    </div>
  );
};

export default TopToolbar;
