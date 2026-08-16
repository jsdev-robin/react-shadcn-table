import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Label } from '@/components/ui/label';
import { useGrid } from '@/package/hooks/useGrid';
import { toTsv } from '@/package/utils/toTsv';
import {
  Copy,
  FileSpreadsheet,
  MousePointerClick,
  Rows2,
  Rows3,
  Rows4,
  X,
} from 'lucide-react';
import { useState } from 'react';
import * as XLSX from 'xlsx';

const ToolbarRightRows = () => {
  const { table } = useGrid();
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2000);
  };

  const handleExportSelectionToXlsx = () => {
    const ranges = table.getSelectedCellRangesData();
    if (ranges.length === 0) return;

    const selectedColumnIds = table.getCellSelectionColumnIds();
    const headers = selectedColumnIds.map((columnId) =>
      columnId
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        .replace(/^./, (str) => str.toUpperCase()),
    );

    const workbook = XLSX.utils.book_new();

    ranges.forEach((grid, index) => {
      const gridWithHeaders = [headers, ...grid];
      const worksheet = XLSX.utils.aoa_to_sheet(gridWithHeaders);

      const colWidths = gridWithHeaders[0]?.map((_, colIndex) => {
        const maxLen = gridWithHeaders.reduce((max, row) => {
          const cellValue = row[colIndex];
          const len = cellValue == null ? 0 : String(cellValue).length;
          return Math.max(max, len);
        }, 0);
        return { wch: maxLen + 2 };
      });

      worksheet['!cols'] = colWidths;

      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        ranges.length > 1 ? `Selection ${index + 1}` : 'Selection',
      );
    });

    XLSX.writeFile(workbook, `selection-${Date.now()}.xlsx`);
    showToast('Selection exported to Excel');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        paddingBlock: '8px',
        gap: '8px',
        position: 'relative',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          paddingInline: '8px',
          paddingBottom: '8px',
          height: '36px',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <h1 style={{ fontSize: '14px', fontWeight: '500' }}>Rows</h1>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          paddingInline: '8px',
        }}
      >
        <Label>Density</Label>
        <ButtonGroup>
          <Button
            size="icon"
            variant={table.state.density === 'sm' ? 'default' : 'outline'}
            onClick={() => table.setDensity('sm')}
            title="Small"
          >
            <Rows4 />
          </Button>
          <Button
            size="icon"
            variant={table.state.density === 'md' ? 'default' : 'outline'}
            onClick={() => table.setDensity('md')}
            title="Default"
          >
            <Rows3 />
          </Button>
          <Button
            size="icon"
            variant={table.state.density === 'lg' ? 'default' : 'outline'}
            onClick={() => table.setDensity('lg')}
            title="Large"
          >
            <Rows2 />
          </Button>
        </ButtonGroup>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          paddingInline: '8px',
        }}
      >
        <Label>Selection</Label>
        <ButtonGroup>
          <table.Subscribe source={table.atoms.cellSelection}>
            {() => (
              <Button
                size="icon"
                variant="outline"
                disabled={table.getSelectedCellCount() === 0}
                title="Copy Selection"
                onClick={async () => {
                  await navigator.clipboard.writeText(
                    toTsv(table.getSelectedCellRangesData()),
                  );
                  showToast('Selection copied to clipboard');
                }}
              >
                <Copy />
              </Button>
            )}
          </table.Subscribe>
          <table.Subscribe source={table.atoms.cellSelection}>
            {() => (
              <Button
                size="icon"
                variant="outline"
                disabled={table.getSelectedCellCount() === 0}
                title="Export to Excel"
                onClick={handleExportSelectionToXlsx}
              >
                <FileSpreadsheet />
              </Button>
            )}
          </table.Subscribe>
          <Button
            size="icon"
            variant="outline"
            disabled={table.getRowModel().rows.length === 0}
            title="Select All Cells"
            onClick={() => table.selectAllCells()}
          >
            <MousePointerClick />
          </Button>

          <table.Subscribe source={table.atoms.cellSelection}>
            {() => (
              <Button
                size="icon"
                variant="outline"
                disabled={table.getSelectedCellCount() === 0}
                title="Clear Selection"
                onClick={() => {
                  table.resetCellSelection(true);
                  showToast('Selection cleared');
                }}
              >
                <X />
              </Button>
            )}
          </table.Subscribe>
        </ButtonGroup>
      </div>

      {toastMsg && (
        <div
          style={{
            position: 'fixed',
            bottom: '16px',
            right: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            minWidth: '200px',
            background: 'var(--popover, #fff)',
            color: 'var(--popover-foreground, #111)',
            border: '1px solid var(--border, #e5e5e5)',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: 500,
            boxShadow:
              '0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.06)',
            zIndex: 9999,
            animation: 'toast-in 0.2s ease-out',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#22c55e',
              flexShrink: 0,
            }}
          />
          {toastMsg}
        </div>
      )}

      <style>{`
        @keyframes toast-in {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ToolbarRightRows;
