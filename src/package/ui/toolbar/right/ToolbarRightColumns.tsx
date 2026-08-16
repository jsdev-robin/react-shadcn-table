import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useGrid } from '@/package/hooks/useGrid';
import {
  ArrowLeftRight,
  PinOff,
  RotateCcw,
  Ruler,
  Shuffle,
  SquareSplitHorizontal,
} from 'lucide-react';
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
        paddingBlock: '8px',
        gap: '8px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingInline: '8px',
          paddingBottom: '8px',
          height: '36px',
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
          size="icon-sm"
          onClick={() => {
            table.resetColumnVisibility();
          }}
        >
          <RotateCcw />
        </Button>
      </div>
      <div
        style={{
          paddingInline: '8px',
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
          paddingInline: '8px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
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
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          paddingInline: '8px',
        }}
      >
        <ButtonGroup style={{ width: '100%' }}>
          <Button
            variant="outline"
            size="icon"
            title="Shuffle"
            style={{ flex: 1 }}
            onClick={() => randomizeColumns()}
          >
            <Shuffle />
          </Button>
          <Button
            variant="outline"
            size="icon"
            title="Reset Order"
            style={{ flex: 1 }}
            onClick={() => table.resetColumnOrder()}
            disabled={table.state.columnOrder.length === 0}
          >
            <RotateCcw />
          </Button>
          <Button
            variant="outline"
            size="icon"
            title="Reverse Order"
            style={{ flex: 1 }}
            onClick={() =>
              table.setColumnOrder(
                [
                  ...table.getAllLeafColumns().map((column) => column.id),
                ].reverse(),
              )
            }
          >
            <ArrowLeftRight />
          </Button>
        </ButtonGroup>
        <ButtonGroup style={{ width: '100%' }}>
          <Button
            variant="outline"
            size="icon"
            title="Reset Pinning"
            style={{ flex: 1 }}
            onClick={() => {
              table.resetColumnPinning();
              setIsSplit(false);
            }}
            disabled={!table.getIsSomeColumnsPinned()}
          >
            <PinOff />
          </Button>
          <Button
            variant="outline"
            size="icon"
            title="Reset Sizing"
            style={{ flex: 1 }}
            onClick={() => table.resetColumnSizing()}
            disabled={Object.keys(table.state.columnSizing).length === 0}
          >
            <Ruler />
          </Button>
          <Button
            variant="outline"
            size="icon"
            title={isSplit ? 'Exit Split' : 'Split View'}
            style={{ flex: 1 }}
            disabled={!table.getIsSomeColumnsPinned()}
            onClick={() => setIsSplit(!isSplit)}
          >
            <SquareSplitHorizontal />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default ToolbarRightColumns;
