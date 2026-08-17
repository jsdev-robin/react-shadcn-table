'use client';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Spinner } from '@/components/ui/spinner';
import { useGrid } from '@/package/hooks/useGrid';
import { useDebouncedCallback } from '@tanstack/react-pacer/debouncer';
import { useEffect, useState } from 'react';

const TopToolbar = () => {
  const { setGlobalFilter, globalFilter, topRightSlot, isFetching } = useGrid();

  const [value, setValue] = useState(String(globalFilter ?? ''));

  useEffect(() => {
    setValue(String(globalFilter ?? ''));
  }, [globalFilter]);

  const debouncedSetGlobalFilter = useDebouncedCallback(
    (next: string) => setGlobalFilter?.(next),
    { wait: 300 },
  );

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
          gap: '16px',
        }}
      >
        <InputGroup>
          <InputGroupInput
            style={{ width: '240px' }}
            type="search"
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const next = e.target.value;
              setValue(next);
              debouncedSetGlobalFilter(next);
            }}
            placeholder="Search by query"
          />
          {isFetching && (
            <InputGroupAddon align="inline-end">
              <Spinner />
            </InputGroupAddon>
          )}
        </InputGroup>
      </div>
      <div>{topRightSlot}</div>
    </div>
  );
};

export default TopToolbar;
