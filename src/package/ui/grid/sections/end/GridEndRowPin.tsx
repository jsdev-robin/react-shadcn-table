import { TableRow } from '@/components/ui/table';
import { useGrid } from '@/package/hooks/useGrid';
import GridCell from '../../shared/GridCell';

export function GridEndRowPin({ row }: { row: any }) {
  'use no memo';
  const { table } = useGrid();

  return (
    <TableRow
      style={{
        backgroundColor: 'blue',
        position: 'sticky',
        zIndex: 10,
        top:
          row.getIsPinned() === 'top'
            ? `calc(${row.getPinnedIndex()} * var(--cell-h))`
            : undefined,
        bottom:
          row.getIsPinned() === 'bottom'
            ? `calc(${
                table.getBottomRows().length - 1 - row.getPinnedIndex()
              } * var(--cell-h))`
            : undefined,
      }}
    >
      {row.getEndVisibleCells().map((cell: any) => (
        <GridCell key={cell.id} cell={cell} />
      ))}
    </TableRow>
  );
}
