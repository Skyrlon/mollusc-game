import { useRef } from "react";
import styled, { keyframes, css } from "styled-components";
import PropTypes from "prop-types";

const showCards = keyframes`
  from {
    top:110%;
    transform: rotateY(180deg) translateY(0%);
  }
  to {
    top: 50%;
    transform: rotateY(180deg) translateY(-50%);
  }
`;

const flip = keyframes`
  from {
  transform: rotateY(180deg) translateY(-50%);
}
  to {
  transform: rotateY(0deg) translateY(-50%);
}`;

const hideCards = keyframes`
  from {
    top: 50%;
    transform: translateY(-50%);
} 
  to {
    top:110%;
    transform: translateY(0%);
}`;

const zoomInAndCenter = keyframes`
  from {
    transform: translateY(-50%);
  }
  to {
    left:50%;
    transform: translateY(-50%) translateX(-50%) scale(1.3);
  }
`;

const StyledDalgonaCard = styled.div`
  position: absolute;
  top: 50%;
  left: ${(props) => props.position * 20 + (props.position + 1) * 5}%;
  width: 15%;
  height: 40rem;
  transform-style: preserve-3d;
  perspective: 1000px;
  transform: rotateY(180deg) translateY(-50%);
  animation: ${(props) =>
      css`
        ${showCards} ${props.animationsTimes
          .cardsNotChosenLeaveDuration}ms forwards
      `}${(props) => props.showRecto && ","}${(props) =>
      props.showRecto &&
      css`
        ${flip} ${props.animationsTimes.cardFlipDuration}ms forwards
      `}${(props) =>
      ((props.showRecto && props.chosenCard) ||
        (props.showRecto && !props.chosenCard)) &&
      ","} ${(props) =>
      (props.showRecto &&
        props.chosenCard &&
        css`
          ${zoomInAndCenter} ${props.animationsTimes
            .cardChosenZoomInCenterDuration}ms ${props.animationsTimes
            .cardChosenZoomInCenterDelay}ms linear forwards
        `) ||
      (props.showRecto &&
        !props.chosenCard &&
        css`
          ${hideCards} ${props.animationsTimes
            .cardsNotChosenLeaveDuration}ms ${props.animationsTimes
            .cardsNotChosenLeaveDelay}ms linear forwards
        `)};

  & .face {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 5%;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &.recto {
      background: white;
      box-shadow: ${(props) => (props.chosenCard ? "0px 0px 50px red" : "")};
    }

    &.verso {
      background: radial-gradient(
        circle at center,
        black 0%,
        black 20%,
        maroon 20%
      );
      transform: rotateY(180deg) translateZ(0.1px);
    }
  }

  & .icon {
    width: 80%;
  }
`;

export default function DalgonaCard({
  card,
  showRecto,
  onCardClick,
  isChosenCard,
  animationsTimes,
}) {
  const iconRef = useRef(null);

  const findAttribute = (element, attribute) => {
    if (element.hasAttribute(attribute)) {
      return element.getAttribute(attribute);
    } else {
      return findAttribute(element.children[0], attribute);
    }
  };

  const handleOnClick = () => {
    const svgViewbox = {
      width: Number(findAttribute(iconRef.current, "viewBox").split(" ")[2]),
      height: Number(findAttribute(iconRef.current, "viewBox").split(" ")[3]),
    };
    let shape;
    if (card.name === "circle") {
      shape = {
        cx: Number(findAttribute(iconRef.current, "cx")),
        cy: Number(findAttribute(iconRef.current, "cy")),
        r: Number(findAttribute(iconRef.current, "r")),
      };
    } else {
      shape = findAttribute(iconRef.current, "d");
    }
    onCardClick(card.position, card.name, svgViewbox, shape);
  };

  return (
    <StyledDalgonaCard
      chosenCard={isChosenCard}
      showRecto={showRecto}
      position={card.position}
      animationsTimes={animationsTimes}
      onClick={handleOnClick}
    >
      <div className="face recto">
        <div className="icon" ref={iconRef}>
          {card.component}
        </div>
      </div>
      <div className="face verso"></div>
    </StyledDalgonaCard>
  );
}

DalgonaCard.propTypes = {
  card: PropTypes.object.isRequired,
  showRecto: PropTypes.bool.isRequired,
  onCardClick: PropTypes.func.isRequired,
  isChosenCard: PropTypes.bool.isRequired,
  animationsTimes: PropTypes.object.isRequired,
};
