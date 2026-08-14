import type { GridFeatures } from '@/package/features';
import { useGrid } from '@/package/hooks/useGrid';
import type { Header, RowData } from '@tanstack/react-table';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

const HeaderSort = ({
  header,
}: {
  header: Header<GridFeatures, RowData, unknown>;
}) => {
  const { table } = useGrid();

  return (
    <div
      onClick={header.column.getToggleSortingHandler()}
      title={
        header.column.getCanSort()
          ? header.column.getNextSortingOrder() === 'asc'
            ? 'Sort ascending'
            : header.column.getNextSortingOrder() === 'desc'
              ? 'Sort descending'
              : 'Clear sort'
          : undefined
      }
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        cursor: 'pointer',
      }}
    >
      <table.FlexRender header={header} />
      {{
        asc: <ChevronUpIcon fontSize="small" />,
        desc: <ChevronDownIcon fontSize="small" />,
      }[header.column.getIsSorted() as string] ?? null}
    </div>
  );
};

export default HeaderSort;
