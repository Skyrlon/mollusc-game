import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { ReactComponent as CircleIcon } from "../assets/circle.svg";
import { ReactComponent as StarIcon } from "../assets/star.svg";
import { ReactComponent as TriangleIcon } from "../assets/triangle.svg";
import { ReactComponent as UmbrellaIcon } from "../assets/umbrella.svg";

const StyledDalgonaAnimation = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%;

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }

  & :nth-child(2) {
    & > * {
      stroke: red;
      stroke-dasharray: ${(props) => props.shapeLength};
      stroke-dashoffset: ${(props) => props.shapeLength};
      animation: draw-circle 5s linear infinite;
    }
  }

  @keyframes draw-circle {
    0% {
      stroke-dashoffset: ${(props) => props.shapeLength};
    }
    50% {
      stroke-dashoffset: 0;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }
`;

export default function DalgonaAnimation() {
  const svgIcons = [
    <CircleIcon />,
    <StarIcon />,
    <TriangleIcon />,
    <UmbrellaIcon />,
  ];

  const [iconToShow, setIconToShow] = useState(null);

  const [shapeLength, setShapeLength] = useState(null);

  const containerRef = useRef(null);

  const chooseRandomIcon = () => {
    const randomIndex = Math.floor(Math.random() * svgIcons.length);
    setIconToShow(svgIcons.find((icon, index) => index === randomIndex));
  };

  useEffect(
    () => {
      if (!iconToShow) {
        chooseRandomIcon();
      } else {
        setShapeLength(
          containerRef.current.children[0].children[0].getTotalLength()
        );
      }
    }, // eslint-disable-next-line
    [iconToShow]
  );

  return (
    <StyledDalgonaAnimation ref={containerRef} shapeLength={shapeLength}>
      {iconToShow}
      {iconToShow}
    </StyledDalgonaAnimation>
  );
}
