'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { GridFeatures } from '@/package/features';
import { type Header, type RowData } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, EllipsisVertical } from 'lucide-react';

const HeaderMenu = ({
  header,
}: {
  header: Header<GridFeatures, RowData, unknown>;
}) => {
  'use no memo';

  return header.column.getCanFilter() ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon-xs" variant="ghost">
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
              header.column.toggleSorting(false);
            }}
            disabled={!header.column.getCanSort()}
          >
            Sort DESC
            <DropdownMenuShortcut>
              <ArrowDown />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : null;
};

export default HeaderMenu;
