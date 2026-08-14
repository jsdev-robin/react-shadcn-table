import { DebouncedInput } from '@/components/ui/debounced-input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { GridFeatures } from '@/package/features';
import type { Column, RowData } from '@tanstack/react-table';

const HeaderFilter = ({
  column,
}: {
  column: Column<GridFeatures, RowData, unknown>;
}) => {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};

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
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              {[
                { label: 'Apple', value: 'apple' },
                { label: 'Banana', value: 'banana' },
                { label: 'Blueberry', value: 'blueberry' },
                { label: 'Grapes', value: 'grapes' },
                { label: 'Pineapple', value: 'pineapple' },
              ].map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
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
          onChange={(value) => column.setFilterValue(value)}
          placeholder="Search..."
          type={filterVariant}
          value={(columnFilterValue ?? '') as string}
        />
      ) : (
        <div style={{ height: 28, opacity: 0, visibility: 'hidden' }} />
      )}
    </div>
  ) : null;
};

export default HeaderFilter;
