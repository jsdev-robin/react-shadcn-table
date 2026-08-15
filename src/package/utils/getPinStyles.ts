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
      ? '-4px 0 4px -4px gray inset'
      : isFirstRightPinnedColumn
        ? '4px 0 4px -4px gray inset'
        : undefined,
    insetInlineStart:
      isPinned === 'start' ? `${column.getStart('start')}px` : undefined,
    insetInlineEnd:
      isPinned === 'end' ? `${column.getAfter('end')}px` : undefined,
    opacity: isPinned ? 0.95 : 1,
    position: isPinned ? 'sticky' : 'relative',
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  };
};
