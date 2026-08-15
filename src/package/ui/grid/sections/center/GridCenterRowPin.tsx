import { TableRow } from '@/components/ui/table';
import { useGrid } from '@/package/hooks/useGrid';
import GridCell from '../../shared/GridCell';

export function GridCenterRowPin({ row }: { row: any }) {
  'use no memo';
  const { table, isSplit } = useGrid();

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
      {(isSplit ? row.getCenterVisibleCells() : row.getVisibleCells()).map(
        (cell: any) => (
          <GridCell key={cell.id} cell={cell} />
        ),
      )}
    </TableRow>
  );
}
