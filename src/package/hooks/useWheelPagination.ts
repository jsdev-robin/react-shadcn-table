import type { GridFeatures } from '@/package/features';
import type { RowData, Table } from '@tanstack/react-table';
import { useEffect, useRef, type RefObject, type WheelEvent } from 'react';

interface UseWheelPaginationOptions<TData extends RowData> {
  table: Table<GridFeatures, TData>;
  scrollRef: RefObject<HTMLDivElement | null>;
  disabled?: boolean;
  cooldown?: number;
}

export function useWheelPagination<TData extends RowData>({
  table,
  scrollRef,
  disabled = false,
  cooldown = 600,
}: UseWheelPaginationOptions<TData>) {
  const lastPageChange = useRef(0);
  const direction = useRef<'next' | 'prev'>('next');
  const pageIndex = table.atoms.pagination.get().pageIndex;

  const onWheel = (e: WheelEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;

    const now = Date.now();
    if (now - lastPageChange.current < cooldown) return;

    const el = e.currentTarget;
    const atTop = el.scrollTop <= 0;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;

    if (e.deltaY > 0 && atBottom && table.getCanNextPage()) {
      direction.current = 'next';
      lastPageChange.current = now;
      table.nextPage();
    } else if (e.deltaY < 0 && atTop && table.getCanPreviousPage()) {
      direction.current = 'prev';
      lastPageChange.current = now;
      table.previousPage();
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = direction.current === 'next' ? 0 : el.scrollHeight;
  }, [pageIndex, scrollRef]);

  return { onWheel };
}
