'use client';

import { Button } from '@/components/ui/button';
import {
  Item,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';
import { useGrid } from '@/package/hooks/useGrid';
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, RotateCcw } from 'lucide-react';
import type { CSSProperties } from 'react';

const DraggableColumnItem = ({
  columnId,
  label,
}: {
  columnId: string;
  label: string;
}) => {
  'use no memo';
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: columnId });

  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <Item
      ref={setNodeRef}
      style={style}
      variant="outline"
      size="sm"
      title={label
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        .replace(/^./, (str) => str.toUpperCase())}
    >
      <ItemMedia
        variant="icon"
        {...attributes}
        {...listeners}
        style={{
          cursor: 'grab',
          color: 'var(--muted-foreground)',
        }}
      >
        <GripVertical />
      </ItemMedia>
      <ItemContent style={{ minWidth: 0 }}>
        <ItemTitle style={{ width: '100%', minWidth: 0 }}>
          <span
            style={{
              display: 'block',
              width: '100%',
              minWidth: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {label
              .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
              .replace(/^./, (str) => str.toUpperCase())}
          </span>
        </ItemTitle>
      </ItemContent>
    </Item>
  );
};

const ToolbarDnd = () => {
  'use no memo';
  const { table } = useGrid();
  const columnOrder = table.state.columnOrder.length
    ? table.state.columnOrder
    : table.getAllLeafColumns().map((column) => column.id);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      const oldIndex = columnOrder.indexOf(active.id as string);
      const newIndex = columnOrder.indexOf(over.id as string);
      table.setColumnOrder(arrayMove(columnOrder, oldIndex, newIndex));
    }
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
  );

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <h1
            style={{
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            Columns DND ({table.getAllLeafColumns().length})
          </h1>
          <Button
            variant="ghost"
            size="icon-xs"
            title="Reset"
            onClick={() => table.resetColumnOrder()}
          >
            <RotateCcw />
          </Button>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            overflowY: 'auto',
            padding: '8px',
          }}
        >
          <SortableContext
            items={columnOrder}
            strategy={verticalListSortingStrategy}
          >
            <ItemGroup>
              {columnOrder.map((columnId) => {
                const column = table.getColumn(columnId);
                if (!column) return null;
                return (
                  <DraggableColumnItem
                    key={columnId}
                    columnId={columnId}
                    label={
                      typeof column.columnDef.header === 'string'
                        ? column.columnDef.header
                        : columnId
                    }
                  />
                );
              })}
            </ItemGroup>
          </SortableContext>
        </div>
      </div>
    </DndContext>
  );
};

export default ToolbarDnd;
