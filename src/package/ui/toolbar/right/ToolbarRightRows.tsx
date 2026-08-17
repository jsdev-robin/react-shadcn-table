import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Label } from '@/components/ui/label';
import { useGrid } from '@/package/hooks/useGrid';
import { printTable } from '@/package/utils/printTable';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  Copy,
  FileJson,
  FileSpreadsheet,
  FileText,
  MousePointerClick,
  Printer,
  Redo2,
  Rows2,
  Rows3,
  Rows4,
  Undo2,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import * as XLSX from 'xlsx';

type GridSnapshot = {
  columnOrder: unknown;
  columnPinning: unknown;
  columnVisibility: unknown;
  columnSizing: unknown;
  sorting: unknown;
  columnFilters: unknown;
};

const formatHeader = (columnId: string) =>
  columnId
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/^./, (str) => str.toUpperCase());

const ToolbarRightRows = () => {
  const { table, name } = useGrid();

  const getSelectionGrid = () => {
    const rowIds = table.getCellSelectionRowIds();
    const columnIds = table.getCellSelectionColumnIds();
    if (rowIds.length === 0 || columnIds.length === 0) return null;

    const rowIdSet = new Set(rowIds);
    const columnIdSet = new Set(columnIds);

    const rows = table.getRowModel().rows.filter((row) => rowIdSet.has(row.id));
    const columns = table
      .getVisibleLeafColumns()
      .filter((column) => columnIdSet.has(column.id));

    const header = columns.map((column) => {
      const columnDefHeader = column.columnDef.header;
      return typeof columnDefHeader === 'string'
        ? columnDefHeader
        : formatHeader(column.id);
    });

    const body = rows.map((row) => {
      const cellsByColumnId = new Map(
        row.getAllCells().map((cell) => [cell.column.id, cell]),
      );
      return columns.map((column) => {
        const cell = cellsByColumnId.get(column.id);
        return cell?.getIsSelected() ? cell.getValue() : '';
      });
    });

    return { header, body };
  };

  const handleExportSelectionToXlsx = () => {
    const selection = getSelectionGrid();
    if (!selection) return;
    const { header, body } = selection;

    const gridWithHeaders = [header, ...body];
    const worksheet = XLSX.utils.aoa_to_sheet(gridWithHeaders);

    worksheet['!cols'] = header.map((_, colIndex) => {
      const maxLen = gridWithHeaders.reduce((max, row) => {
        const cellValue = row[colIndex];
        const len = cellValue == null ? 0 : String(cellValue).length;
        return Math.max(max, len);
      }, 0);
      return { wch: maxLen + 2 };
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Selection');
    XLSX.writeFile(workbook, `${name ?? 'export'}-${Date.now()}.xlsx`);
  };

  const handleExportSelectionToPdf = () => {
    const selection = getSelectionGrid();
    if (!selection) return;
    const { header, body } = selection;

    const docTitle = name ?? 'Grid';
    const doc = new jsPDF({ orientation: 'landscape' });

    doc.setFontSize(12);
    doc.text(docTitle, 14, 14);

    autoTable(doc, {
      head: [header],
      body: body.map((row) =>
        row.map((cell) => (cell == null ? '' : String(cell))),
      ),
      startY: 20,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [51, 51, 51] },
    });

    doc.save(`${docTitle}-${Date.now()}.pdf`);
  };

  const handleExportSelectionToJson = () => {
    const selection = getSelectionGrid();
    if (!selection) return;
    const { header, body } = selection;
    const fileName = name ?? 'Grid';

    const payload = body.map((row) =>
      Object.fromEntries(header.map((h, i) => [h, row[i]])),
    );

    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrintSelection = () => {
    const selection = getSelectionGrid();
    if (!selection) return;
    printTable(name ?? 'Grid', selection.header, selection.body);
  };

  const handleCopySelection = async () => {
    const selection = getSelectionGrid();
    if (!selection) return;
    const tsv = selection.body
      .map((row) =>
        row.map((cell) => (cell == null ? '' : String(cell))).join('\t'),
      )
      .join('\n');
    await navigator.clipboard.writeText(tsv);
  };

  const takeSnapshot = (): GridSnapshot => ({
    columnOrder: table.state.columnOrder,
    columnPinning: table.state.columnPinning,
    columnVisibility: table.state.columnVisibility,
    columnSizing: table.state.columnSizing,
    sorting: table.state.sorting,
    columnFilters: table.state.columnFilters,
  });

  const undoStack = useRef<GridSnapshot[]>([]);
  const redoStack = useRef<GridSnapshot[]>([]);
  const isApplyingHistory = useRef(false);
  const lastSnapshotKey = useRef<string>('');
  const [, setHistoryVersion] = useState(0);

  const applySnapshot = (snapshot: GridSnapshot) => {
    isApplyingHistory.current = true;
    table.setColumnOrder(snapshot.columnOrder as never);
    table.setColumnPinning(snapshot.columnPinning as never);
    table.setColumnVisibility(snapshot.columnVisibility as never);
    table.setColumnSizing(snapshot.columnSizing as never);
    table.setSorting(snapshot.sorting as never);
    table.setColumnFilters(snapshot.columnFilters as never);
    lastSnapshotKey.current = JSON.stringify(snapshot);
    setTimeout(() => {
      isApplyingHistory.current = false;
    }, 0);
  };

  useEffect(() => {
    const snapshot = takeSnapshot();
    const key = JSON.stringify(snapshot);

    if (lastSnapshotKey.current === '') {
      lastSnapshotKey.current = key;
      return;
    }

    if (key === lastSnapshotKey.current) return;

    if (isApplyingHistory.current) {
      lastSnapshotKey.current = key;
      return;
    }

    const previousSnapshot: GridSnapshot = JSON.parse(lastSnapshotKey.current);
    undoStack.current.push(previousSnapshot);
    redoStack.current = [];
    lastSnapshotKey.current = key;
    setHistoryVersion((v) => v + 1);
  }, [
    table.state.columnOrder,
    table.state.columnPinning,
    table.state.columnVisibility,
    table.state.columnSizing,
    table.state.sorting,
    table.state.columnFilters,
  ]);

  const handleUndo = () => {
    const previous = undoStack.current.pop();
    if (!previous) return;
    redoStack.current.push(takeSnapshot());
    applySnapshot(previous);
    setHistoryVersion((v) => v + 1);
  };

  const handleRedo = () => {
    const next = redoStack.current.pop();
    if (!next) return;
    undoStack.current.push(takeSnapshot());
    applySnapshot(next);
    setHistoryVersion((v) => v + 1);
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
        <Label>History</Label>
        <ButtonGroup>
          <Button
            size="icon"
            variant="outline"
            title="Undo"
            disabled={undoStack.current.length === 0}
            onClick={handleUndo}
          >
            <Undo2 />
          </Button>
          <Button
            size="icon"
            variant="outline"
            title="Redo"
            disabled={redoStack.current.length === 0}
            onClick={handleRedo}
          >
            <Redo2 />
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <ButtonGroup>
            <table.Subscribe source={table.atoms.cellSelection}>
              {() => (
                <Button
                  size="icon"
                  variant="outline"
                  disabled={table.getSelectedCellCount() === 0}
                  title="Copy Selection"
                  onClick={handleCopySelection}
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
            <table.Subscribe source={table.atoms.cellSelection}>
              {() => (
                <Button
                  size="icon"
                  variant="outline"
                  disabled={table.getSelectedCellCount() === 0}
                  title="Export to PDF"
                  onClick={handleExportSelectionToPdf}
                >
                  <FileText />
                </Button>
              )}
            </table.Subscribe>
            <table.Subscribe source={table.atoms.cellSelection}>
              {() => (
                <Button
                  size="icon"
                  variant="outline"
                  disabled={table.getSelectedCellCount() === 0}
                  title="Export to JSON"
                  onClick={handleExportSelectionToJson}
                >
                  <FileJson />
                </Button>
              )}
            </table.Subscribe>
            <table.Subscribe source={table.atoms.cellSelection}>
              {() => (
                <Button
                  size="icon"
                  variant="outline"
                  disabled={table.getSelectedCellCount() === 0}
                  title="Print Selection"
                  onClick={handlePrintSelection}
                >
                  <Printer />
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
          </ButtonGroup>
          <ButtonGroup>
            <table.Subscribe source={table.atoms.cellSelection}>
              {() => (
                <Button
                  size="icon"
                  variant="outline"
                  disabled={table.getSelectedCellCount() === 0}
                  title="Clear Selection"
                  onClick={() => table.resetCellSelection(true)}
                >
                  <X />
                </Button>
              )}
            </table.Subscribe>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
};

export default ToolbarRightRows;
