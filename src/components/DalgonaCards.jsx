import DalgonaCard from "./DalgonaCard";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { ReactComponent as CircleIcon } from "../assets/circle.svg";
import { ReactComponent as StarIcon } from "../assets/star.svg";
import { ReactComponent as TriangleIcon } from "../assets/triangle.svg";
import { ReactComponent as UmbrellaIcon } from "../assets/umbrella.svg";

const StyledDalgonaCards = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
`;

export default function DalgonaCards({ cardChosen }) {
  const [cards, setCards] = useState([
    { component: <CircleIcon />, position: null, name: "circle" },
    { component: <StarIcon />, position: null, name: "star" },
    { component: <TriangleIcon />, position: null, name: "triangle" },
    { component: <UmbrellaIcon />, position: null, name: "umbrella" },
  ]);

  const [isCardsShuffled, setIsCardsShuffled] = useState(false);

  const [chosenCardPosition, setChosenCardPosition] = useState(null);

  const [showCardsRecto, setShowCardsRecto] = useState(null);

  const animationsTimes = {
    cardFlipDuration: 750,
    get allCardsFlipDelay() {
      return this.cardFlipDuration + 250;
    },
    get cardsNotChosenLeaveDelay() {
      return this.allCardsFlipDelay + 250;
    },
    cardsNotChosenLeaveDuration: 500,
    get cardChosenZoomInCenterDelay() {
      return (
        this.cardsNotChosenLeaveDelay + this.cardsNotChosenLeaveDuration + 750
      );
    },
    cardChosenZoomInCenterDuration: 500,
    get endOfAllAnimations() {
      return (
        animationsTimes.cardChosenZoomInCenterDelay +
        animationsTimes.cardChosenZoomInCenterDuration +
        2000
      );
    },
  };

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
    setShowCardsRecto(
      newCards.map((card) => {
        return { position: card.position, showRecto: false };
      })
    );
  };

  const handleCardClick = (
    cardClickedPosition,
    cardName,
    svgDimensions,
    shape
  ) => {
    //Shows the card's recto clicked on
    if (!chosenCardPosition) {
      setShowCardsRecto(
        showCardsRecto.map((x) => {
          if (x.position === cardClickedPosition)
            return { ...x, showRecto: true };
          else return x;
        })
      );
      setChosenCardPosition(cardClickedPosition);
      //Then shows the others cards' recto after delay
      setTimeout(() => {
        setShowCardsRecto(
          showCardsRecto.map((x) => {
            return { ...x, showRecto: true };
          })
        );
      }, animationsTimes.allCardsFlipDelay);
      //Trigger the start of the game when all animations are over
      setTimeout(
        () => cardChosen(cardName, svgDimensions, shape),
        animationsTimes.endOfAllAnimations
      );
    }
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
    <StyledDalgonaCards>
      {isCardsShuffled &&
        cards.map((card) => (
          <DalgonaCard
            key={card.position}
            card={card}
            isChosenCard={chosenCardPosition === card.position}
            showRecto={
              showCardsRecto.find((x) => x.position === card.position).showRecto
            }
            animationsTimes={animationsTimes}
            onCardClick={handleCardClick}
          />
        ))}
    </StyledDalgonaCards>
  );
}

DalgonaCards.propTypes = {
  cardChosen: PropTypes.func.isRequired,
};
