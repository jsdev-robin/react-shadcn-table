import { Button } from '@/components/ui/button';
import { useGrid } from '@/package/hooks/useGrid';
import { toTsv } from '@/package/utils/toTsv';

const ToolbarRightRows = () => {
  const { table } = useGrid();

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
          Rows
        </h1>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          padding: '8px',
        }}
      >
        <table.Subscribe source={table.atoms.cellSelection}>
          {() => (
            <Button
              variant="outline"
              className="w-full"
              disabled={table.getSelectedCellCount() === 0}
              onClick={() =>
                void navigator.clipboard.writeText(
                  toTsv(table.getSelectedCellRangesData()),
                )
              }
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
              onClick={() => table.resetCellSelection(true)}
            >
              Clear Selection
            </Button>
          )}
        </table.Subscribe>
      </div>
    </div>
  );
};

export default ToolbarRightRows;
