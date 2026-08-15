'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { GridFeatures } from '@/package/features';
import { useGrid } from '@/package/hooks/useGrid';
import { type Header, type RowData } from '@tanstack/react-table';
import {
  ArrowDown,
  ArrowUp,
  EllipsisVertical,
  EyeOff,
  PinIcon,
  PinOff,
} from 'lucide-react';

const HeaderMenu = ({
  header,
}: {
  header: Header<GridFeatures, RowData, unknown>;
}) => {
  const { isLoading, isError } = useGrid();

  return header.column.getCanFilter() ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon-xs" variant="ghost" disabled={isLoading || isError}>
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              header.column.toggleSorting(false);
            }}
            disabled={!header.column.getCanSort()}
          >
            Sort ASC
            <DropdownMenuShortcut>
              <ArrowUp />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              header.column.toggleSorting(true);
            }}
            disabled={!header.column.getCanSort()}
          >
            Sort DESC
            <DropdownMenuShortcut>
              <ArrowDown />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {!header.isPlaceholder && header.column.getCanPin() && (
          <DropdownMenuGroup>
            {header.column.getIsPinned() !== 'start' && (
              <DropdownMenuItem
                onClick={() => {
                  header.column.pin('start');
                }}
              >
                Pin to left
                <DropdownMenuShortcut>
                  <PinIcon className="mun:rotate-45" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            )}
            {header.column.getIsPinned() && (
              <DropdownMenuItem
                onClick={() => {
                  header.column.pin(false);
                }}
              >
                Unpin
                <DropdownMenuShortcut>
                  <PinOff />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            )}
            {header.column.getIsPinned() !== 'end' && (
              <DropdownMenuItem
                onClick={() => {
                  header.column.pin('end');
                }}
              >
                Pin to right
                <DropdownMenuShortcut>
                  <PinIcon className="mun:-rotate-45" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              header.column.toggleVisibility(false);
            }}
            disabled={!header.column.getCanHide()}
          >
            Hide column
            <DropdownMenuShortcut>
              <EyeOff />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : null;
};

export default HeaderMenu;
