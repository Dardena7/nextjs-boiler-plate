import type { FC, ReactNode } from "react";
import { useState } from "react";

import { Card } from "./Card";
import clsx from "clsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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
  setNewPositions: (items: number[]) => void;
};

export const DraggableList: FC<Props> = (props) => {
  const { items, className, setNewPositions } = props;

  const [cards, setCards] = useState(items);

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const newList = cards.slice();
    newList.splice(dragIndex, 1);
    newList.splice(hoverIndex, 0, cards[dragIndex]);

    setCards(newList);
    setNewPositions(newList.map((item) => item.id));
  };

  return (
    <div className={clsx(className)}>
      {cards.map((card, index) => {
        return (
          <Card key={card.id} index={index} id={card.id} moveCard={moveCard}>
            {card.content}
          </Card>
        );
      })}
    </div>
  );
};
