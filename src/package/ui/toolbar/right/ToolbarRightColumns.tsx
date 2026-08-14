import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useGrid } from '@/package/hooks/useGrid';
import { RotateCcw } from 'lucide-react';
import React, { useMemo, useState } from 'react';

const ToolbarRightColumns = () => {
  const { table } = useGrid();
  const [searchTerm, setSearchTerm] = useState('');
  const visibleColumns = useMemo(() => {
    return table
      .getAllLeafColumns()
      .filter((column) => !['rowNumber'].includes(column.id))
      .filter((column) =>
        column.id.toLowerCase().includes(searchTerm.toLowerCase()),
      );
  }, [searchTerm, table]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
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
          paddingInline: '8px',
          paddingBottom: '8px',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <h1
          style={{
            fontSize: '16px',
          }}
        >
          Columns ({table.getAllLeafColumns().length})
        </h1>
        <Button
          title="Restore"
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
          {/* <Label
            style={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              display: 'flex',
              gap: '8px',
            }}
          >
            <Checkbox
              checked={table.getIsAllColumnsVisible()}
              onCheckedChange={(checked) =>
                table.toggleAllColumnsVisible(checked === true)
              }
            />
            Toggle All
          </Label> */}
          {visibleColumns.length > 0 ? (
            <React.Fragment>
              {visibleColumns.map((column) => (
                <Label
                  key={column.id}
                  style={{
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    display: 'flex',
                    gap: '8px',
                  }}
                >
                  <Checkbox
                    checked={column.getIsVisible()}
                    onCheckedChange={(checked) =>
                      column.toggleVisibility(checked === true)
                    }
                  />
                  {column.id
                    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
                    .replace(/^./, (str) => str.toUpperCase())}
                </Label>
              ))}
            </React.Fragment>
          ) : (
            <div className="text-center">No columns found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolbarRightColumns;
