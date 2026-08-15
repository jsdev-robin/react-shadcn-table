import { TableCell } from '@/components/ui/table';
import type { GridFeatures } from '@/package/features';
import { useGrid } from '@/package/hooks/useGrid';
import { getPinStyles } from '@/package/utils/getPinStyles';
import type { Cell, RowData } from '@tanstack/react-table';
import { useLayoutEffect, useRef } from 'react';

const GridCell = ({ cell }: { cell: Cell<GridFeatures, RowData, unknown> }) => {
  'use no memo';
  const { table, isSplit } = useGrid();
  const cellRef = useRef<HTMLTableCellElement>(null);

  const style = {
    width: cell.column.getSize(),
    minWidth: cell.column.getSize(),
    maxWidth: cell.column.getSize(),
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    borderRight: '1px solid',
    borderColor: 'var(--border)',
    ...getPinStyles(cell.column, isSplit),
  };

  useLayoutEffect(() => {
    const node = cellRef.current;
    if (!node) return;

    const setCellHeightVar = () => {
      const { height } = node.getBoundingClientRect();
      document.documentElement.style.setProperty('--cell-h', `${height}px`);
    };

    setCellHeightVar();

    const resizeObserver = new ResizeObserver(setCellHeightVar);
    resizeObserver.observe(node);

    return () => resizeObserver.disconnect();
  }, [isSplit]);

  return (
    <TableCell
      ref={cellRef}
      style={style}
      title={cell.getValue() != null ? String(cell.getValue()) : undefined}
    >
      <table.FlexRender cell={cell} />
    </TableCell>
  );
};

export default GridCell;
