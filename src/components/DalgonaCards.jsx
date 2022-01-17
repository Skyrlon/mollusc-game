import DalgonaCard from "./DalgonaCard";
import styled from "styled-components";
import { useState } from "react";
import PropTypes from "prop-types";

const StyledDalgonaCards = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
`;

export default function DalgonaCards({ cards, cardChosen }) {
  const [chosenCardPosition, setChosenCardPosition] = useState(null);

  const [showCardsRecto, setShowCardsRecto] = useState(
    cards.map((card) => {
      return { position: card.position, showRecto: false };
    })
  );

  const [showNotChosenCards, setShowNotChosenCards] = useState(true);

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
        this.cardsNotChosenLeaveDelay + this.cardsNotChosenLeaveDuration + 250
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

  const handleCardClick = (cardClickedPosition) => {
    //Shows the card's recto clicked on
    setShowCardsRecto(
      showCardsRecto.map((x) => {
        if (x.position === cardClickedPosition)
          return { ...x, showRecto: true };
        else return x;
      })
    );
    //Then shows the others cards' recto after delay
    setTimeout(() => {
      setShowCardsRecto(
        showCardsRecto.map((x) => {
          return { ...x, showRecto: true };
        })
      );
      setChosenCardPosition(cardClickedPosition);
    }, animationsTimes.allCardsFlipDelay);
    //Trigger beginning of the game
    setTimeout(() => {
      cardChosen();
      setShowNotChosenCards(false);
    }, animationsTimes.endOfAllAnimations);
  };

  return (
    <StyledDalgonaCards>
      {cards.map(
        (card) =>
          (chosenCardPosition === card.position ||
            (chosenCardPosition !== card.position && showNotChosenCards)) && (
            <DalgonaCard
              key={card.position}
              card={card}
              isChosenCard={chosenCardPosition === card.position}
              showRecto={
                showCardsRecto.find((x) => x.position === card.position)
                  .showRecto
              }
              animationsTimes={animationsTimes}
              onCardClick={handleCardClick}
            />
          )
      )}
    </StyledDalgonaCards>
  );
}

DalgonaCards.propTypes = {
  cardClickedPosition: PropTypes.number,
};
