import { DebouncedInput } from '@/components/ui/debounced-input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { GridFeatures } from '@/package/features';
import { useGrid } from '@/package/hooks/useGrid';
import type { Column, RowData } from '@tanstack/react-table';

const HeaderFilter = ({
  column,
}: {
  column: Column<GridFeatures, RowData, unknown>;
}) => {
  'use no memo';
  const columnFilterValue = column.getFilterValue();
  const { filterVariant, options } = column.columnDef.meta ?? {};
  const { isFetching } = useGrid();

  const selectOptions =
    options && options.length > 0
      ? options
      : !isFetching && filterVariant === 'select'
        ? Array.from(column.getFacetedUniqueValues().keys())
            .sort()
            .slice(0, 5000)
            .map((value) => ({ label: String(value), value: String(value) }))
        : [];

  return column.getCanFilter() ? (
    <div
      style={{
        padding: '4px',
        width: '100%',
        borderTop: '1px solid var(--border)',
      }}
    >
      {filterVariant === 'range' ? (
        <div style={{ display: 'flex', gap: '4px' }}>
          <DebouncedInput
            style={{ height: '28px' }}
            type="number"
            value={(columnFilterValue as [number, number])?.[0] ?? ''}
            onChange={(value) =>
              column.setFilterValue((old: [number, number]) => [
                value,
                old?.[1],
              ])
            }
            placeholder={`Min`}
          />
          <DebouncedInput
            style={{ height: '28px' }}
            type="number"
            value={(columnFilterValue as [number, number])?.[1] ?? ''}
            onChange={(value) =>
              column.setFilterValue((old: [number, number]) => [
                old?.[0],
                value,
              ])
            }
            placeholder={`Max`}
          />
        </div>
      ) : filterVariant === 'select' ? (
        <Select
          value={(columnFilterValue?.toString() ?? 'all') as string}
          onValueChange={(value) =>
            column.setFilterValue(value === 'all' ? undefined : value)
          }
        >
          <SelectTrigger style={{ width: '100%' }} size="sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All</SelectItem>
              {selectOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      ) : filterVariant &&
        [
          'text',
          'time',
          'date',
          'datetime-local',
          'month',
          'week',
          'number',
          'tel',
          'url',
          'color',
          'search',
        ].includes(filterVariant) ? (
        <DebouncedInput
          style={{ height: '28px' }}
          onChange={(value) => column.setFilterValue(value)}
          placeholder="Search..."
          type={filterVariant}
          value={(columnFilterValue ?? '') as string}
        />
      ) : (
        <div style={{ height: '28px', opacity: 0, visibility: 'hidden' }} />
      )}
    </div>
  ) : null;
};

export default HeaderFilter;
