import type { FC, ReactNode } from "react";
import { useEffect, useState } from "react";

import { Card } from "./Card";
import clsx from "clsx";
import { DragItem } from "@/core/repos/types/generic";

export interface Item {
  id: number;
  content: ReactNode;
}

export interface ContainerState {
  cards: Item[];
}

type Props = {
  className?: string;
  items: Item[];
  setDroppedItem: (item: DragItem) => void;
};

export const DraggableList: FC<Props> = (props) => {
  const { items, className, setDroppedItem } = props;

  const [cards, setCards] = useState(items);

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const newList = cards.slice();
    newList.splice(dragIndex, 1);
    newList.splice(hoverIndex, 0, cards[dragIndex]);

    setCards(newList);
  };

  useEffect(() => {
    setCards(items);
  }, [items]);

  return (
    <div className={clsx(className)}>
      {cards.map((card, index) => {
        return (
          <Card
            key={card.id}
            index={index}
            id={card.id}
            moveCard={moveCard}
            setDroppedItem={setDroppedItem}
          >
            {card.content}
          </Card>
        );
      })}
    </div>
  );
};
