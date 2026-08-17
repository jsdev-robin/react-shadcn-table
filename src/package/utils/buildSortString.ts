export function buildSortString(
  sortOptions: { id: string; desc: boolean }[] | null | undefined,
): string {
  if (!sortOptions || sortOptions.length === 0) {
    return '';
  }

  const validSorts = sortOptions
    .filter((opt) => opt.id != null && opt.id.trim() !== '')
    .map((opt) => (opt.desc ? opt.id : `-${opt.id}`));

  if (validSorts.length === 0) {
    return '';
  }

  return `sort=${validSorts.join(',')}`;
}
