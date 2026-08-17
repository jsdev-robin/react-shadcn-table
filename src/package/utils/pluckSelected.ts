import type { RowSelectionState } from '@tanstack/react-table';

/**
 * Extracts the value of a specific field from all currently selected rows
 * in a TanStack Table instance.
 *
 * Assumes `rowSelection` keys correspond directly to the index of the row
 * in the `data` array (i.e. no custom `getRowId` is used). If a custom
 * `getRowId` is configured on the table, this function will not work as
 * expected since the keys will be custom IDs instead of indices.
 *
 * @template T - The type of a single row's data.
 * @template K - The key of the field to extract from each selected row.
 *
 * @param data - The full array of row data (same array passed to the table).
 * @param rowSelection - The current `rowSelection` state from TanStack Table,
 *   where keys are row indices (as strings) and values are `true`/`false`.
 * @param field - The field name (key of `T`) whose value should be extracted
 *   from each selected row.
 *
 * @returns An array containing the value of `field` for every selected row.
 *   Rows that no longer exist in `data` (e.g. stale selection) are skipped.
 *
 * @example
 * ```ts
 * const rowSelection = { "0": true, "2": true, "3": true };
 * const data = [
 *   { id: "V001", driver: "John" },
 *   { id: "V002", driver: "Sam" },
 *   { id: "V003", driver: "Alex" },
 *   { id: "V004", driver: "Mia" },
 * ];
 *
 * pluckSelected(data, rowSelection, 'id');
 * // => ["V001", "V003", "V004"]
 *
 * pluckSelected(data, rowSelection, 'driver');
 * // => ["John", "Alex", "Mia"]
 * ```
 */
export function pluckSelected<T, K extends keyof T>(
  data: T[],
  rowSelection: RowSelectionState,
  field: K,
): T[K][] {
  return Object.entries(rowSelection)
    .filter(([, isSelected]) => isSelected)
    .map(([index]) => data[Number(index)])
    .filter((row): row is T => row !== undefined)
    .map((row) => row[field]);
}
