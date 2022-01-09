import styled from "styled-components";
import { ReactComponent as CircleIcon } from "../assets/circle.svg";
import { ReactComponent as StarIcon } from "../assets/star.svg";
import { ReactComponent as TriangleIcon } from "../assets/triangle.svg";
import { ReactComponent as UmbrellaIcon } from "../assets/umbrella.svg";

import DalgonaCard from "./DalgonaCard";

const StyledDalgona = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export default function Dalgona() {
  const cards = () => {
    const icons = [
      { component: <CircleIcon />, position: null },
      { component: <StarIcon />, position: null },
      { component: <TriangleIcon />, position: null },
      { component: <UmbrellaIcon />, position: null },
    ];
    let newIcons = icons;
    const cardPositionArray = [1, 2, 3, 4];
    let newCardPosArray = cardPositionArray;
    for (let i = 0; i < cardPositionArray.length; i++) {
      const cardPosIndexToRemove = Math.floor(
        Math.random() * newCardPosArray.length
      );
      const newPos = newCardPosArray[cardPosIndexToRemove];
      newIcons = newIcons.map((icon, index) => {
        if (index === i)
          return {
            ...icon,
            position: newPos,
          };
        return icon;
      });
      newCardPosArray = newCardPosArray.filter((x) => x !== newPos);
    }
    return newIcons.sort((a, b) => a.position - b.position);
  };

  return (
    <StyledDalgona>
      {cards().map((card) => (
        <DalgonaCard key={card.position} card={card} />
      ))}
    </StyledDalgona>
  );
}
