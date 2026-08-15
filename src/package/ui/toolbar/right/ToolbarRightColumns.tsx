import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useGrid } from '@/package/hooks/useGrid';
import { RotateCcw } from 'lucide-react';
import React, { useMemo, useState } from 'react';

const ToolbarRightColumns = () => {
  const { table, isSplit, setIsSplit } = useGrid();
  const [searchTerm, setSearchTerm] = useState('');
  const visibleColumns = useMemo(() => {
    return table
      .getAllLeafColumns()
      .filter((column) => !['rowNumber'].includes(column.id))
      .filter((column) =>
        column.id.toLowerCase().includes(searchTerm.toLowerCase()),
      );
  }, [searchTerm, table]);

  const randomizeColumns = () => {
    const ids = table.getAllLeafColumns().map((d) => d.id);
    for (let i = ids.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ids[i], ids[j]] = [ids[j], ids[i]];
    }
    table.setColumnOrder(ids);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <h1
          style={{
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          Columns ({table.getAllLeafColumns().length})
        </h1>
        <Button
          title="Restore"
          variant="ghost"
          size="icon-xs"
          onClick={() => {
            table.resetColumnVisibility();
          }}
        >
          <RotateCcw />
        </Button>
      </div>
      <div
        style={{
          padding: '8px',
        }}
      >
        <Input
          type="search"
          placeholder="Search columns..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          overflowY: 'auto',
          padding: '8px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          {visibleColumns.length > 0 ? (
            <React.Fragment>
              {visibleColumns.map((column) => (
                <Label
                  key={column.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    minWidth: 0,
                  }}
                  title={column.id
                    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
                    .replace(/^./, (str) => str.toUpperCase())}
                >
                  <Checkbox
                    checked={column.getIsVisible()}
                    onCheckedChange={(checked) =>
                      column.toggleVisibility(checked === true)
                    }
                  />
                  <span
                    style={{
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      minWidth: 0,
                      flex: 1,
                    }}
                  >
                    {column.id
                      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
                      .replace(/^./, (str) => str.toUpperCase())}
                  </span>
                </Label>
              ))}
            </React.Fragment>
          ) : (
            <div className="text-center">No columns found</div>
          )}
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: '8px',
          padding: '8px',
        }}
      >
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => randomizeColumns()}
        >
          Shuffle
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => table.resetColumnOrder()}
        >
          Reset Order
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() =>
            table.setColumnOrder(
              [
                ...table.getAllLeafColumns().map((column) => column.id),
              ].reverse(),
            )
          }
        >
          Reverse Order
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => {
            table.resetColumnPinning();
            setIsSplit(false);
          }}
        >
          Reset Pinning
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => table.resetColumnSizing()}
        >
          Reset Sizing
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          disabled={!table.getIsSomeColumnsPinned()}
          onClick={() => setIsSplit(!isSplit)}
        >
          {isSplit ? 'Exit Split' : 'Split View'}
        </Button>
      </div>
    </div>
  );
};

export default ToolbarRightColumns;
