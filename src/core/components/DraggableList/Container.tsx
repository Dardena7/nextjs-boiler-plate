import type { FC } from "react";
import { useState } from "react";

import { Card } from "./Card";
import clsx from "clsx";

export interface Item {
  id: number;
  text: string;
}

export interface ContainerState {
  cards: Item[];
}

type Props = {
  className?: string;
  items: Item[];
};

export const Container: FC<Props> = (props) => {
  const { items, className } = props;

  const [cards, setCards] = useState(items);

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const newList = cards.slice();
    newList.splice(dragIndex, 1);
    newList.splice(hoverIndex, 0, cards[dragIndex]);

    setCards(newList);
  };

  return (
    <div className={clsx(className)}>
      {cards.map((card, index) => {
        return (
          <Card key={card.id} index={index} id={card.id} moveCard={moveCard}>
            <p>{card.text}</p>
          </Card>
        );
      })}
    </div>
  );
};
