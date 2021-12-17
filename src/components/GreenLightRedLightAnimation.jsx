import { useState, useEffect } from "react";
import styled from "styled-components";

const StyledGreenLightRedLightAnimation = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 0;
  padding-top: 100%;

  & span {
    color: ${(props) => (props.run ? "green" : "red")};
    font-weight: bold;
    position: absolute;
    right: 10%;
    top: 20%;
  }

  & .guy {
    position: absolute;
    top: 30%;
    left: 15%;
    width: 60%;
    height: 60%;
    --head-size: 20;
    --body-width: var(--head-size) / 3;
    --body-height: var(--head-size) * 2;
    --arm-width: var(--body-width);
    --arm-height: 20;
    --leg-width: 20;
    --leg-height: var(--head-size) / 2;
    --animation-speed: 0.5s;
  }

  & .head {
    width: calc(var(--head-size) * 1%);
    height: calc(var(--head-size) * 1%);
    background-color: black;
    border-radius: 100%;
    position: absolute;
    top: 5%;
    left: 55%;
  }
  & .body {
    width: calc(var(--body-width) * 1%);
    height: calc(var(--body-height) * 1%);
    position: absolute;
    top: calc(var(--head-size) * 1.1 * 1%);
    left: calc((50 - var(--body-width) / 2) * 1.12 * 1%);
    background: black;
    border-radius: calc(var(--body-height) * 1%) / 10%;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    transform: rotate(20deg);
    &::after {
      content: "";
      position: absolute;
      bottom: 100%;
      left: 0%;
      width: 100%;
      height: 10%;
      background: black;
    }
  }

  & .arm {
    position: absolute;
    height: calc(var(--arm-height) * 1%);
    width: calc(var(--arm-width) * 1%);
    transform-origin: 50% 10%;
    border-radius: calc(var(--body-height) * 1%) / 15%;
    transform: rotate(-45deg);
    animation: ${(props) =>
      props.run ? "var(--animation-speed) move-arm infinite" : ""};

    &::after {
      content: "";
      position: absolute;
      top: 80%;
      left: 0%;
      height: 100%;
      width: 100%;
      transform-origin: 50% 10%;
      transform: rotate(-67.5deg);
      border-radius: calc(var(--body-height) * 1%) / 15%;
      animation: ${(props) =>
        props.run ? "var(--animation-speed) move-inferior-arm infinite" : ""};
    }
  }

  & .arm-left {
    background: black;
    top: 30%;
    left: 57%;
    transform: rotate(90deg);
    animation: ${(props) =>
      props.run ? "var(--animation-speed) move-arm-left infinite" : ""};
    &::after {
      background: black;
    }
  }

  & .arm-right {
    top: 30%;
    background: black;
    left: 57%;
    &::after {
      background: black;
    }
  }

  & .leg {
    position: absolute;
    height: calc(var(--body-height) / 2 * 1.2 * 1%);
    width: calc(var(--body-width) * 1%);
    top: calc((var(--head-size) + var(--body-height) * 0.9) * 1%);
    left: calc((50 - var(--body-width) / 2) * 1%);
    transform-origin: 50% 10%;
    background-color: black;
    border-radius: calc(var(--body-height) * 1%) / 15%;
    &::after {
      content: "";
      position: absolute;
      top: 80%;
      left: 0%;
      height: 100%;
      width: 100%;
      border-radius: calc(var(--body-height) * 1%) / 15%;
      transform-origin: 50% 10%;
      background-color: black;
    }
  }

  & .leg-left {
    transform: rotate(-90deg);
    animation: ${(props) =>
      props.run ? "var(--animation-speed) move-leg-left infinite" : ""};
    &::after {
      transform: rotate(112.5deg);
      animation: ${(props) =>
        props.run
          ? "var(--animation-speed) move-inferior-leg-left infinite"
          : ""};
    }
  }

  & .leg-right {
    transform: rotate(45deg);
    animation: ${(props) =>
      props.run ? "var(--animation-speed) move-leg-right infinite" : ""};
    &::after {
      transform: rotate(55deg);
      animation: ${(props) =>
        props.run
          ? "var(--animation-speed) move-inferior-leg-right infinite"
          : ""};
    }
  }

  @keyframes move-arm {
    0% {
      transform: rotate(-45deg);
    }
    50% {
      transform: rotate(45deg);
    }
    100% {
      transform: rotate(-45deg);
    }
  }

  @keyframes move-arm-left {
    0% {
      transform: rotate(90deg);
    }
    50% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(90deg);
    }
  }

  @keyframes move-inferior-arm {
    0% {
      transform: rotate(-67.5deg);
    }
    50% {
      transform: rotate(-90deg);
    }
    100% {
      transform: rotate(-67.5deg);
    }
  }

  @keyframes move-leg-left {
    0% {
      transform: rotate(-90deg);
    }
    50% {
      transform: rotate(45deg);
    }
    100% {
      transform: rotate(-90deg);
    }
  }

  @keyframes move-inferior-leg-left {
    0% {
      transform: rotate(112.5deg);
    }
    25% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(55deg);
    }
    100% {
      transform: rotate(112.5deg);
    }
  }

  @keyframes move-leg-right {
    0% {
      transform: rotate(45deg);
    }
    50% {
      transform: rotate(-90deg);
    }
    100% {
      transform: rotate(45deg);
    }
  }

  @keyframes move-inferior-leg-right {
    0% {
      transform: rotate(55deg);
    }
    100% {
      transform: rotate(55deg);
    }
  }
`;

export default function GreenLightRedLightAnimation() {
  const [isRunning, setIsRunning] = useState(true);

  const [toggle, setToggle] = useState();

  useEffect(
    () => {
      setToggle(
        setInterval(function () {
          setIsRunning((v) => !v);
        }, 2000)
      );
      return () => clearInterval(toggle);
    }, // eslint-disable-next-line
    []
  );

  return (
    <StyledGreenLightRedLightAnimation run={isRunning}>
      <span>{isRunning ? "GREEN LIGHT" : "RED LIGHT"}</span>
      <div className="guy">
        <div className="head"></div>
        <div className="body"></div>
        <div className="arm arm-left"></div>
        <div className="arm arm-right"></div>
        <div className="leg leg-left"></div>
        <div className="leg leg-right"></div>
      </div>
    </StyledGreenLightRedLightAnimation>
  );
}
