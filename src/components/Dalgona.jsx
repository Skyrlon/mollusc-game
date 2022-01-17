import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ReactComponent as CircleIcon } from "../assets/circle.svg";
import { ReactComponent as StarIcon } from "../assets/star.svg";
import { ReactComponent as TriangleIcon } from "../assets/triangle.svg";
import { ReactComponent as UmbrellaIcon } from "../assets/umbrella.svg";

import DalgonaCards from "./DalgonaCards";

const StyledDalgona = styled.div`
  width: 100%;
  height: 100%;
`;

export default function Dalgona({ startTheGame }) {
  const [cards, setCards] = useState([
    { component: <CircleIcon />, position: null, name: "circle" },
    { component: <StarIcon />, position: null, name: "star" },
    { component: <TriangleIcon />, position: null, name: "triangle" },
    { component: <UmbrellaIcon />, position: null, name: "umbrella" },
  ]);

  const [isCardsShuffled, setIsCardsShuffled] = useState(false);

  const shuffleCards = () => {
    let newCards = cards;
    const cardPositionArray = [0, 1, 2, 3];
    let newCardPosArray = cardPositionArray;
    for (let i = 0; i < cardPositionArray.length; i++) {
      const cardPosIndexToRemove = Math.floor(
        Math.random() * newCardPosArray.length
      );
      const newPos = newCardPosArray[cardPosIndexToRemove];
      newCards = newCards.map((icon, index) => {
        if (index === i)
          return {
            ...icon,
            position: newPos,
          };
        return icon;
      });
      newCardPosArray = newCardPosArray.filter((x) => x !== newPos);
    }
    setCards(newCards.sort((a, b) => a.position - b.position));
    setIsCardsShuffled(true);
  };

  useEffect(
    () => {
      //Prevent cards shuffling on every render
      if (cards.every((card) => !card.position)) {
        shuffleCards();
      }
    },
    // eslint-disable-next-line
    []
  );

  return (
    <StyledDalgona>
      {isCardsShuffled && (
        <DalgonaCards cards={cards} cardChosen={startTheGame} />
      )}
    </StyledDalgona>
  );
}

Dalgona.propTypes = {
  startTheGame: PropTypes.func.isRequired,
};
