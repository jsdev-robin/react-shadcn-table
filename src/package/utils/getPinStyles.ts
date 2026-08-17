import type { Column, RowData } from '@tanstack/react-table';
import type { CSSProperties } from 'react';
import type { GridFeatures } from '../features';

export const getPinStyles = (
  column: Column<GridFeatures, RowData>,
  isSplit: boolean,
): CSSProperties => {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === 'start' && column.getIsLastColumn('start');
  const isFirstRightPinnedColumn =
    isPinned === 'end' && column.getIsFirstColumn('end');

  return {
    boxShadow: isLastLeftPinnedColumn
      ? '-1px 0 1px -1px gray inset'
      : isFirstRightPinnedColumn
        ? '1px 0 1px -1px gray inset'
        : undefined,
    // borderRight: isLastLeftPinnedColumn ? `1px solid var(--border)` : undefined,
    // borderLeft: isFirstRightPinnedColumn
    //   ? `1px solid var(--border)`
    //   : undefined,
    // insetInlineStart:
    //   isPinned === 'start' ? `${column.getStart('start')}px` : undefined,
    // insetInlineEnd:
    //   isPinned === 'end' ? `${column.getAfter('end')}px` : undefined,
    left:
      isPinned === 'start' && !isSplit
        ? `${column.getStart('start')}px`
        : undefined,
    right:
      isPinned === 'end' && !isSplit
        ? `${column.getAfter('end')}px`
        : undefined,
    opacity: isPinned ? 0.95 : 1,
    position: isPinned ? (isSplit ? 'relative' : 'sticky') : 'relative',
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
    backgroundColor: isPinned && !isSplit ? 'var(--background)' : undefined,
  };
};
