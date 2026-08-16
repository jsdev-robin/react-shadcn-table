'use client';

import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { DebouncedInput } from '@/components/ui/debounced-input';
import type { GridFeatures } from '@/package/features';
import { useGrid } from '@/package/hooks/useGrid';
import type { Column, RowData } from '@tanstack/react-table';
import { ChevronRight, RotateCcw } from 'lucide-react';
import React, { useMemo, useState } from 'react';

const ToolbarFilter = ({
  column,
}: {
  column: Column<GridFeatures, RowData, unknown>;
}) => {
  'use no memo';

  const sortedUniqueValues = useMemo(() => {
    return column.getCanFilter()
      ? {
          id: column.id
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/^./, (char) => char.toUpperCase()),
          uniqueValues: Array.from(column.getFacetedUniqueValues().keys()),
        }
      : null;
  }, [column]);

  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
        }}
      >
        <div
          style={{
            width: '28px',
            height: '28px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '4px',
            transition: 'all 0.2s',
            transform: open ? 'rotate(90deg)' : 'none',
          }}
        >
          <ChevronRight size={16} />
        </div>
        <span style={{ fontSize: '0.875rem', whiteSpace: 'nowrap' }}>
          {sortedUniqueValues?.id && sortedUniqueValues.id.length > 15
            ? `${sortedUniqueValues.id.slice(0, 15)}...`
            : sortedUniqueValues?.id}
        </span>
      </div>
      <Collapsible open={open}>
        <CollapsibleContent>
          <div style={{ padding: '12px', paddingRight: 0 }}>
            <datalist id={column.id + 'list'}>
              {sortedUniqueValues?.uniqueValues.map(
                (val: string, i: number) => (
                  <option value={val} key={i} />
                ),
              )}
            </datalist>
            {filterVariant === 'range' ? (
              <div style={{ display: 'flex', gap: '8px' }}>
                <DebouncedInput
                  style={{ height: '28px' }}
                  type="number"
                  value={(columnFilterValue as [number, number])?.[0] ?? ''}
                  onChange={(value) =>
                    column.setFilterValue((old: [number, number]) => [
                      value,
                      old?.[1],
                    ])
                  }
                  placeholder="Min"
                />
                <DebouncedInput
                  style={{ height: '28px' }}
                  type="number"
                  value={(columnFilterValue as [number, number])?.[1] ?? ''}
                  onChange={(value) =>
                    column.setFilterValue((old: [number, number]) => [
                      old?.[0],
                      value,
                    ])
                  }
                  placeholder="Max"
                />
              </div>
            ) : (
              <DebouncedInput
                style={{ width: '100%', height: '28px' }}
                type="text"
                value={(columnFilterValue ?? '') as string}
                onChange={(value) => column.setFilterValue(value)}
                placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
                list={column.id + 'list'}
                disabled={filterVariant === undefined}
              />
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

const ToolbarFilters = () => {
  'use no memo';
  const { table, globalFilter, setGlobalFilter } = useGrid();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        height: '100%',
        paddingTop: '8px',
        paddingBottom: '8px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: '8px',
          paddingRight: '8px',
          paddingBottom: '8px',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <span style={{ fontSize: '0.9375rem', fontWeight: 500 }}>Filters</span>
      </div>

      <div style={{ paddingLeft: '8px', paddingRight: '8px' }}>
        <DebouncedInput
          style={{ width: '100%' }}
          type="search"
          value={String(globalFilter)}
          onChange={(value) => {
            setGlobalFilter?.(String(value));
          }}
          placeholder="Search all columns..."
        />
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          flex: 1,
          paddingLeft: '12px',
          paddingRight: '12px',
          overflowY: 'auto',
        }}
      >
        {table.getHeaderGroups().map((headerGroup) => (
          <React.Fragment key={headerGroup.id}>
            {headerGroup.headers
              .filter(
                (header) =>
                  !['rowNumber', 'select', 'pin', 'actions'].includes(
                    header.column.id,
                  ),
              )
              .map((header) => (
                <ToolbarFilter key={header.id} column={header.column} />
              ))}
          </React.Fragment>
        ))}
      </div>

      <div style={{ paddingLeft: '8px', paddingRight: '8px' }}>
        <Button
          variant="outline"
          size="sm"
          style={{ width: '100%' }}
          onClick={() => table.setColumnFilters([])}
        >
          <RotateCcw size={16} />
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default ToolbarFilters;
