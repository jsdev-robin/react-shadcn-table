import type { ColumnFiltersState } from '@tanstack/react-table';

export const buildQueryParams = (filters: ColumnFiltersState): string =>
  new URLSearchParams(
    filters.flatMap(({ id, value }) => {
      const dotNotation = id.replace(/_/g, '.');
      if (Array.isArray(value) && value.length === 2) {
        return [
          ...(value[0] != null && value[0] !== ''
            ? [[`${dotNotation}[gte]`, String(value[0])]]
            : []),
          ...(value[1] != null && value[1] !== ''
            ? [[`${dotNotation}[lte]`, String(value[1])]]
            : []),
        ];
      } else if (typeof value === 'object' && value !== null) {
        return Object.entries(value).flatMap(([op, val]) =>
          [
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
          ].includes(op) &&
          val != null &&
          val !== ''
            ? [[`${dotNotation}[${op}]`, String(val)]]
            : [],
        );
      } else if (value != null && value !== '') {
        return [[dotNotation, String(value)]];
      } else {
        return [];
      }
    }),
  ).toString();
