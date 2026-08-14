import type { GridFeatures } from '@/package/features';
import { useGrid } from '@/package/hooks/useGrid';
import type { Header, RowData } from '@tanstack/react-table';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

const HeaderSort = ({
  header,
}: {
  header: Header<GridFeatures, RowData, unknown>;
}) => {
  'use no memo';
  const { table } = useGrid();
  const canSort = header.column.getCanSort();

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
        cursor: canSort ? 'pointer' : 'default',
        userSelect: canSort ? 'none' : 'auto',
      }}
    >
      <table.FlexRender header={header} />
      {{
        asc: (
          <ChevronUpIcon
            style={{
              width: 16,
              height: 16,
            }}
          />
        ),
        desc: (
          <ChevronDownIcon
            style={{
              width: 16,
              height: 16,
            }}
          />
        ),
      }[header.column.getIsSorted() as string] ?? null}
    </div>
  );
};

export default HeaderSort;
