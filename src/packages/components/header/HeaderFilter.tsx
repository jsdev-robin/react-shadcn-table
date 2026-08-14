import { DebouncedInput } from '@/components/ui/debounced-Input';
import type { AppFeatures } from '@/packages/features';
import type { Column, RowData } from '@tanstack/react-table';

const HeaderFilter = ({
  column,
}: {
  column: Column<AppFeatures, RowData, unknown>;
}) => {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};

  return filterVariant === 'dateRange' ? (
    <div>
      <div className="filter-row">
        <DebouncedInput
          type="date"
          aria-label={`${column.id} min`}
          value={(columnFilterValue as [string, string] | undefined)?.[0] ?? ''}
          onChange={(value) =>
            column.setFilterValue((old: [string, string] | undefined) => [
              value,
              old?.[1],
            ])
          }
          className="filter-input"
        />
        <DebouncedInput
          type="date"
          aria-label={`${column.id} max`}
          value={(columnFilterValue as [string, string] | undefined)?.[1] ?? ''}
          onChange={(value) =>
            column.setFilterValue((old: [string, string] | undefined) => [
              old?.[0],
              value,
            ])
          }
          className="filter-input"
        />
      </div>
      <div className="spacer-xs" />
    </div>
  ) : filterVariant === 'range' ? (
    <div>
      <div className="filter-row">
        {/* See faceted column filters example for min max values functionality */}
        <DebouncedInput
          type="number"
          value={(columnFilterValue as [number, number] | undefined)?.[0] ?? ''}
          onChange={(value) =>
            column.setFilterValue((old: [number, number] | undefined) => [
              value,
              old?.[1],
            ])
          }
          placeholder={`Min`}
          className="filter-input"
        />
        <DebouncedInput
          type="number"
          value={(columnFilterValue as [number, number] | undefined)?.[1] ?? ''}
          onChange={(value) =>
            column.setFilterValue((old: [number, number] | undefined) => [
              old?.[0],
              value,
            ])
          }
          placeholder={`Max`}
          className="filter-input"
        />
      </div>
      <div className="spacer-xs" />
    </div>
  ) : filterVariant === 'select' ? (
    <select
      onChange={(e) => column.setFilterValue(e.target.value)}
      value={columnFilterValue?.toString()}
    >
      {/* See faceted column filters example for dynamic select options */}
      <option value="">All</option>
      <option value="complicated">complicated</option>
      <option value="relationship">relationship</option>
      <option value="single">single</option>
    </select>
  ) : (
    <DebouncedInput
      className="filter-select"
      onChange={(value) => column.setFilterValue(value)}
      placeholder={`Search...`}
      type="text"
      value={(columnFilterValue ?? '') as string}
    />
    // See faceted column filters example for datalist search suggestions
  );
};

export default HeaderFilter;
