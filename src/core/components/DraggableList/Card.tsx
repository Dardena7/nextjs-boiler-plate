import type { Identifier, XYCoord } from 'dnd-core';
import type { FC, ReactNode } from 'react';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { DragIndicator } from '@mui/icons-material';
import { DragItem } from '@/core/types/generic';

export interface CardProps {
  id: any;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  setDroppedItem: (item: DragItem) => void;
  children: ReactNode;
}

export const Card: FC<CardProps> = (props) => {
  const { id, index, moveCard, setDroppedItem, children } = props;

  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: 'CARD',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
    drop(item: DragItem, monitor) {
      setDroppedItem(item);
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: 'CARD',
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  return (
    <div
      ref={(node) => preview(drop(node))}
      className=" mb-4 p-8 layout-row layout-align-start-center border rounded-sm border-secondary-300 bg-neutral-100"
      style={{ opacity }}
      data-handler-id={handlerId}
    >
      <div ref={ref} style={{ cursor: 'move' }} className="mr-16">
        <DragIndicator />
      </div>
      <div className="width-100">{children}</div>
    </div>
  );
};
