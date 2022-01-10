import DalgonaCard from "./DalgonaCard";
import styled from "styled-components";
import { useState } from "react";

const StyledDalgonaCards = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export default function DalgonaCards({ cards }) {
  const [showCardsRecto, setShowCardsRecto] = useState(
    cards.map((card) => {
      return { position: card.position, showRecto: false };
    })
  );

  const handleCardClick = (cardClickedPosition) => {
    //Shows the card's recto clicked on
    setShowCardsRecto(
      showCardsRecto.map((x) => {
        if (x.position === cardClickedPosition)
          return { ...x, showRecto: true };
        else return x;
      })
    );

    //Then shows the others cards' recto after 1s
    setTimeout(
      () =>
        setShowCardsRecto(
          showCardsRecto.map((x) => {
            return { ...x, showRecto: true };
          })
        ),
      1000
    );
  };

  return (
    <StyledDalgonaCards>
      {cards.map((card) => (
        <DalgonaCard
          key={card.position}
          card={card}
          showRecto={
            showCardsRecto.find((x) => x.position === card.position).showRecto
          }
          onCardClick={handleCardClick}
        />
      ))}
    </StyledDalgonaCards>
  );
}
