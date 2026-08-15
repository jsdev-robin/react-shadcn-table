'use client';

import { Input } from '@/components/ui/input';
import { useGrid } from '@/package/hooks/useGrid';

const TopToolbar = () => {
  const { table } = useGrid();

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
      <Input
        style={{
          width: '260px',
        }}
        placeholder="Search by query"
      />

      <table.Subscribe source={table.atoms.cellSelection}>
        {() =>
          table.getSelectedCellCount() > 0 ? (
            <span
              style={{
                fontSize: '12px',
                color: 'var(--muted-foreground)',
              }}
            >
              {table.getSelectedCellCount().toLocaleString()} cells selected
              across {table.getCellSelectionRowIds().length.toLocaleString()}{' '}
              rows and {table.getCellSelectionColumnIds().length} columns
            </span>
          ) : null
        }
      </table.Subscribe>
    </div>
  );
};

export default TopToolbar;
