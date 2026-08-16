import { Button } from '@/components/ui/button';
import { useGrid } from '@/package/hooks/useGrid';
import { toTsv } from '@/package/utils/toTsv';
import { useState } from 'react';

const ToolbarRightRows = () => {
  const { table } = useGrid();
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2000);
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
          gap: '8px',
          paddingInline: '8px',
        }}
      >
        <table.Subscribe source={table.atoms.cellSelection}>
          {() => (
            <Button
              variant="outline"
              className="w-full"
              disabled={table.getSelectedCellCount() === 0}
              onClick={async () => {
                await navigator.clipboard.writeText(
                  toTsv(table.getSelectedCellRangesData()),
                );
                showToast('Selection copied to clipboard');
              }}
            >
              Copy Selection
            </Button>
          )}
        </table.Subscribe>
        <Button
          variant="outline"
          className="w-full"
          disabled={table.getRowModel().rows.length === 0}
          onClick={() => table.selectAllCells()}
        >
          Select All Cells
        </Button>

        <table.Subscribe source={table.atoms.cellSelection}>
          {() => (
            <Button
              variant="outline"
              className="w-full"
              disabled={table.getSelectedCellCount() === 0}
              onClick={() => {
                table.resetCellSelection(true);
                showToast('Selection cleared');
              }}
            >
              Clear Selection
            </Button>
          )}
        </table.Subscribe>
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
