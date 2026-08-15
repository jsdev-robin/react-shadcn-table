export function escapeTsvValue(value: unknown) {
  const text = value == null ? '' : String(value);
  const safeText =
    typeof value === 'string' && /^[\t\r ]*[=+@-]/.test(value)
      ? `'${text}`
      : text;

  return /["\t\n\r]/.test(safeText)
    ? `"${safeText.replace(/"/g, '""')}"`
    : safeText;
}

export function toTsv(ranges: Array<Array<Array<unknown>>>) {
  return ranges
    .map((grid) =>
      grid.map((row) => row.map(escapeTsvValue).join('\t')).join('\n'),
    )
    .join('\n\n');
}
