interface ColumnFilter {
  id: string;
  value: unknown;
}

interface SortingItem {
  id: string;
  desc: boolean;
}

interface Pagination {
  pageIndex: number;
  pageSize: number;
}

interface QueryArgs {
  columnFilters: ColumnFilter[];
  globalFilter?: string;
  pagination: Pagination;
  sorting: SortingItem[];
  rowSelection?: Record<string, boolean>;
}

/**
 * List of supported MongoDB query operators that can be used as filter
 * operators when a column filter's `value` is an object (e.g. `{ gte: 10 }`).
 * Any operator not in this list will be silently ignored in
 * {@link appendColumnFilter}.
 */
const MONGO_OPERATORS = [
  'eq',
  'ne',
  'gt',
  'gte',
  'lt',
  'lte',
  'in',
  'nin',
  'regex',
  'exists',
  'all',
  'size',
  'elemMatch',
  'type',
  'mod',
  'not',
  'and',
  'or',
  'nor',
  'text',
  'where',
  'geoWithin',
  'geoIntersects',
  'near',
  'nearSphere',
  'expr',
  'jsonSchema',
  'bitsAllClear',
  'bitsAllSet',
  'bitsAnyClear',
  'bitsAnySet',
  'rand',
];

/**
 * Converts a single TanStack Table `ColumnFilter` into one or more
 * MongoDB-style query string parameters, and appends them to the given
 * `URLSearchParams` instance in place.
 *
 * Handles three shapes of `filter.value`:
 * 1. **Range tuple** — a 2-element array `[min, max]` (e.g. from a range
 *    slider/filter). Produces `field[gte]` and/or `field[lte]` params,
 *    skipping either bound if it is `null`, `undefined`, or an empty string.
 * 2. **Operator object** — a plain object whose keys are MongoDB operators
 *    (e.g. `{ eq: 'active' }` or `{ in: ['a', 'b'] }`). Only keys present in
 *    {@link MONGO_OPERATORS} are appended, as `field[op]=value`.
 * 3. **Plain value** — a primitive (string/number/boolean). Appended
 *    directly as `field=value`.
 *
 * The filter's `id` is converted from underscore notation to dot notation
 * (e.g. `address_city` → `address.city`) to support nested MongoDB fields.
 *
 * @param params - The `URLSearchParams` instance to mutate/append to.
 * @param filter - The column filter to convert.
 *
 * @example
 * ```ts
 * const params = new URLSearchParams();
 *
 * // Plain value
 * appendColumnFilter(params, { id: 'status', value: 'active' });
 * // params: "status=active"
 *
 * // Range tuple
 * appendColumnFilter(params, { id: 'year', value: [2020, 2023] });
 * // params: "year[gte]=2020&year[lte]=2023"
 *
 * // Operator object
 * appendColumnFilter(params, { id: 'driver_name', value: { regex: 'John' } });
 * // params: "driver.name[regex]=John"
 * ```
 */
function appendColumnFilter(
  params: URLSearchParams,
  filter: ColumnFilter,
): void {
  const { id, value } = filter;
  const dotNotation = id.replace(/_/g, '.');

  if (Array.isArray(value) && value.length === 2) {
    if (value[0] != null && value[0] !== '') {
      params.set(`${dotNotation}[gte]`, String(value[0]));
    }
    if (value[1] != null && value[1] !== '') {
      params.set(`${dotNotation}[lte]`, String(value[1]));
    }
    return;
  }

  if (typeof value === 'object' && value !== null) {
    Object.entries(value).forEach(([op, val]) => {
      if (MONGO_OPERATORS.includes(op) && val != null && val !== '') {
        params.set(`${dotNotation}[${op}]`, String(val));
      }
    });
    return;
  }

  if (value != null && value !== '') {
    params.set(dotNotation, String(value));
  }
}

/**
 * Builds a MongoDB/Express-style URL query string from a TanStack Table
 * state object (`QueryArgs`), suitable for sending to a REST API backend
 * that expects `page`, `limit`, `sort`, `q`, and per-field filter params.
 *
 * Behavior:
 * - `pagination.pageIndex` is converted from 0-based (TanStack) to 1-based
 *   (`page`) and `pagination.pageSize` is sent as `limit`.
 * - Each entry in `columnFilters` is expanded via {@link appendColumnFilter}
 *   (supports plain values, range tuples, and Mongo operator objects).
 * - `sorting` is joined into a single comma-separated `sort` param, prefixing
 *   descending fields with `-` (e.g. `sorting: [{ id: 'year', desc: true }]`
 *   → `sort=-year`). Omitted entirely if `sorting` is empty.
 * - `globalFilter`, if provided and non-empty, is sent as `q`.
 * - `rowSelection` is accepted in the input type but is **not** included in
 *   the resulting query string.
 *
 * @param queryArgs - The current TanStack Table state to serialize.
 * @returns A URL query string (including the leading `?`), e.g.
 *   `"?page=1&limit=20&status=active&sort=-year"`.
 *
 * @example
 * ```ts
 * const query = URLSearch({
 *   pagination: { pageIndex: 0, pageSize: 20 },
 *   columnFilters: [
 *     { id: 'status', value: 'active' },
 *     { id: 'year', value: [2020, 2023] },
 *   ],
 *   sorting: [{ id: 'year', desc: true }],
 *   globalFilter: 'toyota',
 * });
 *
 * // query === "?page=1&limit=20&status=active&year[gte]=2020&year[lte]=2023&sort=-year&q=toyota"
 * ```
 */
export function URLSearch(queryArgs: QueryArgs): string {
  const params = new URLSearchParams();

  params.set('page', String(queryArgs.pagination.pageIndex + 1));
  params.set('limit', String(queryArgs.pagination.pageSize));

  queryArgs.columnFilters.forEach((filter) => {
    appendColumnFilter(params, filter);
  });

  if (queryArgs.sorting.length > 0) {
    const sortValue = queryArgs.sorting
      .map((s) => (s.desc ? `-${s.id}` : s.id))
      .join(',');
    params.set('sort', sortValue);
  }

  if (queryArgs.globalFilter) {
    params.set('q', queryArgs.globalFilter);
  }

  return `?${params.toString()}`;
}
