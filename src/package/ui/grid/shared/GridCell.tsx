import { TableCell } from '@/components/ui/table';
import type { GridFeatures } from '@/package/features';
import { useGrid } from '@/package/hooks/useGrid';
import { getPinStyles } from '@/package/utils/getPinStyles';
import type { Cell, RowData } from '@tanstack/react-table';
import { useLayoutEffect, useRef } from 'react';

const getSelectionStyles = (cell: Cell<GridFeatures, RowData, unknown>) => {
  if (!cell.getIsSelected()) {
    return cell.getIsFocused()
      ? { outline: '1px solid var(--ring)', outlineOffset: '-1px' }
      : {};
  }

  // const edges = cell.getSelectionEdges();

  return {
    backgroundColor: 'rgba(59, 130, 246, 0.30)',
    // borderTop: edges.top ? '1px solid rgba(59, 130, 246, 1)' : undefined,
    // borderRight: edges.right ? '1px solid rgba(59, 130, 246, 1)' : undefined,
    // borderBottom: edges.bottom ? '1px solid rgba(59, 130, 246, 1)' : undefined,
    // borderLeft: edges.left ? '1px solid rgba(59, 130, 246, 1)' : undefined,
    // outline: cell.getIsFocused() ? '1px solid var(--ring)' : undefined,
    // outlineOffset: cell.getIsFocused() ? '1px' : undefined,
  };
};

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
    border: '1px solid',
    borderColor: 'var(--border)',
    userSelect: 'none' as const,
    cursor: cell.getCanSelect() ? 'cell' : undefined,
    ...getPinStyles(cell.column, isSplit),
    ...getSelectionStyles(cell),
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
      tabIndex={cell.getCanSelect() ? cell.getTabIndex() : undefined}
      onMouseDown={
        cell.getCanSelect() ? cell.getSelectionStartHandler() : undefined
      }
      onMouseEnter={
        cell.getCanSelect() ? cell.getSelectionExtendHandler() : undefined
      }
      title={cell.getValue() != null ? String(cell.getValue()) : undefined}
    >
      <table.FlexRender cell={cell} />
    </TableCell>
  );
};

export default GridCell;
