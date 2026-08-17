# react-shadcn-table

A feature-rich, headless-powered data grid for React — built on [TanStack Table v9](https://tanstack.com/table) and [shadcn/ui](https://ui.shadcn.com/). Sorting, filtering, pagination, row selection, column/row pinning, resizing, drag-and-drop column ordering, expandable rows, and split (frozen) columns — all out of the box.

**Live Demo:** [https://react-shadcn-table.jsdevs.xyz/](https://react-shadcn-table.jsdevs.xyz/)

## Features

- Global search + per-column filtering (text, range)
- Multi-column sorting
- Client-side & manual (server-side) pagination
- Row selection with checkboxes
- Column pinning (left / right) and row pinning (top / bottom)
- Resizable & drag-to-reorder columns (`@dnd-kit`)
- Split view for frozen left/right columns
- Expandable rows with custom sub-components
- Cell selection and cell spanning support
- Persists per-grid layout (column order, sizing, visibility, pinning) via a storage key
- Built-in loading, error, and empty states
- Fully styled with Tailwind CSS + shadcn/ui — themeable out of the box
- Export to Excel and PDF (`xlsx`, `jspdf`)
- Bring your own toolbar actions via `topRightSlot`

## Installation

```bash
npm install react-shadcn-table
```

### Peer Dependencies

Make sure the following are installed in your project:

```bash
npm install react react-dom
```

Tailwind CSS must also be configured in your project, since the grid ships unstyled utility classes rather than a separate CSS bundle.

## Quick Start

```tsx
import { useMemo } from 'react';
import {
  Grid,
  useGridState,
  type GridFeatures,
  type ColumnDef,
} from 'react-shadcn-table';

interface User {
  id: string;
  name: string;
  email: string;
}

const columns = useMemo<ColumnDef<GridFeatures, User, unknown>[]>(
  () => [
    { id: 'id', accessorKey: 'id', header: () => 'ID' },
    { id: 'name', accessorKey: 'name', header: () => 'Name' },
    { id: 'email', accessorKey: 'email', header: () => 'Email' },
  ],
  [],
);

const App = () => {
  const { state, handlers } = useGridState();

  return (
    <Grid
      payload={{ data: users, total: users.length }}
      columns={columns}
      state={state}
      {...handlers}
    />
  );
};
```

## Server-Side (Manual) Pagination, Sorting & Filtering

```tsx
const { state, handlers, rowSelection } = useGridState();

const { data, isLoading, isError, refetch, isFetching } = useUsersQuery({
  queryString: URLSearch(state),
});

<Grid
  payload={{ data: data?.rows ?? [], total: data?.total ?? 0 }}
  columns={columns}
  manualPagination
  manualFiltering
  manualSorting
  isLoading={isLoading}
  isError={isError}
  isFetching={isFetching}
  refetch={refetch}
  state={state}
  {...handlers}
  height="55vh"
/>;
```

## Toolbar Actions

Add custom action buttons to the toolbar via `topRightSlot`:

```tsx
import { Plus, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

<Grid
  columns={columns}
  payload={{ data, total }}
  state={state}
  {...handlers}
  topRightSlot={
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" onClick={refetch}>
        <RefreshCw className="size-4" />
      </Button>
      <Button variant="default" size="icon" onClick={handleAdd}>
        <Plus className="size-4" />
      </Button>
    </div>
  }
/>;
```

## Working with Row Selection

Use the `pluckSelected` utility to extract a field from all selected rows:

```tsx
import { pluckSelected } from 'react-shadcn-table';

const { rowSelection } = useGridState();

const selectedIds = pluckSelected(data, rowSelection, 'id');
// => ["V001", "V003", "V004"]
```

## API Reference

### `<Grid />` Props

| Prop                    | Type                                                         | Default   | Description                                                      |
| ----------------------- | ------------------------------------------------------------ | --------- | ---------------------------------------------------------------- |
| `payload`               | `{ data: TData[]; total: number }`                           | —         | Row data and total row count                                     |
| `columns`               | `ColumnDef<GridFeatures, TData, unknown>[]`                  | —         | Column definitions (required)                                    |
| `state`                 | `Partial<TableState<GridFeatures>>`                          | —         | Controlled table state (from `useGridState`)                     |
| `onColumnFiltersChange` | `OnChangeFn<ColumnFiltersState>`                             | —         | Column filter change handler                                     |
| `onPaginationChange`    | `OnChangeFn<PaginationState>`                                | —         | Pagination change handler                                        |
| `onSortingChange`       | `OnChangeFn<SortingState>`                                   | —         | Sorting change handler                                           |
| `onRowSelectionChange`  | `OnChangeFn<RowSelectionState>`                              | —         | Row selection change handler                                     |
| `setGlobalFilter`       | `Dispatch<SetStateAction<string>>`                           | —         | Global search setter                                             |
| `manualPagination`      | `boolean`                                                    | `false`   | Enables server-side pagination                                   |
| `manualFiltering`       | `boolean`                                                    | `false`   | Enables server-side column filtering                             |
| `manualSorting`         | `boolean`                                                    | `false`   | Enables server-side sorting                                      |
| `isLoading`             | `boolean`                                                    | —         | Shows skeleton loading rows                                      |
| `isError`               | `boolean`                                                    | —         | Shows the error state                                            |
| `isFetching`            | `boolean`                                                    | —         | Shows a background refetch indicator                             |
| `refetch`               | `() => void`                                                 | —         | Retry/refresh callback                                           |
| `renderSubComponent`    | `(props: { row: Row<GridFeatures, TData> }) => ReactElement` | —         | Custom content for expanded rows                                 |
| `getRowCanExpand`       | `(row: Row<GridFeatures, TData>) => boolean`                 | —         | Controls whether a row can expand                                |
| `enableCellSelection`   | `boolean`                                                    | `false`   | Enables Excel-like cell range selection                          |
| `enableCellSpanning`    | `boolean`                                                    | `false`   | Enables merged/spanning cells                                    |
| `enableRowSelection`    | `boolean`                                                    | `true`    | Enables/disables row selection                                   |
| `height`                | `string`                                                     | `'65vh'`  | Fixed height of the scrollable table body                        |
| `name`                  | `string`                                                     | `'munza'` | Storage key for persisting per-grid layout                       |
| `topRightSlot`          | `React.ReactNode`                                            | —         | Custom content on the right of the toolbar (e.g. action buttons) |

### `useGridState()`

Manages all controlled state required by `<Grid />`.

```tsx
const { state, handlers, rowSelection } = useGridState();
```

Returns:

- `state` — `{ columnFilters, globalFilter, pagination, sorting, rowSelection }`
- `handlers` — `{ onColumnFiltersChange, onPaginationChange, onSortingChange, setGlobalFilter, onRowSelectionChange }`
- `rowSelection` — the current selection map, exposed directly for convenience

### `pluckSelected(data, rowSelection, field)`

Extracts a field's value from every currently selected row.

```tsx
pluckSelected(data, rowSelection, 'id'); // => string[]
```

### `URLSearch(queryArgs)`

Serializes TanStack Table state into a MongoDB/Express-style query string.

```tsx
URLSearch({
  pagination: { pageIndex: 0, pageSize: 20 },
  columnFilters: [{ id: 'status', value: 'active' }],
  sorting: [{ id: 'year', desc: true }],
  globalFilter: 'toyota',
});
// => "?page=1&limit=20&status=active&sort=-year&q=toyota"
```

## Peer Dependency Versions

| Package               | Version      |
| --------------------- | ------------ |
| `react` / `react-dom` | `^18 \| ^19` |
| `tailwindcss`         | `^4.x`       |

## License

MIT
