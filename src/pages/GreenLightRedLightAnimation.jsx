import styled from "styled-components";

const StyledGreenLightRedLightAnimation = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 0;
  padding-top: 100%;
  & .guy {
    position: absolute;
    top: 30%;
    left: 20%;
    width: 60%;
    height: 60%;
    --head-size: 20;
    --body-width: var(--head-size) / 3;
    --body-height: var(--head-size) * 2;
    --arm-width: var(--body-width);
    --arm-height: 20;
    --leg-width: 20;
    --leg-height: var(--head-size) / 2;
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
      width: 100%;
      height: 10%;
      background: black;
    }
  }

  & .arm {
    position: absolute;
    height: calc(var(--arm-height) * 1%);
    width: calc(var(--arm-width) * 1%);
    transform-origin: 50% 0%;
    animation: 1s move-arm infinite;
    border-radius: calc(var(--body-height) * 1%) / 15%;

    &::after {
      content: "";
      position: absolute;
      top: 80%;
      height: 100%;
      width: 100%;
      border-radius: calc(var(--body-height) * 1%) / 15%;
      transform-origin: 50% 10%;
      animation: 1s move-inferior-arm infinite;
    }
  }

  & .arm-left {
    background: black;
    top: 30%;
    left: 57%;
    animation: 1s move-arm-left infinite;
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
      height: 100%;
      width: 100%;
      border-radius: calc(var(--body-height) * 1%) / 15%;
      transform-origin: 50% 0%;
      background-color: black;
    }
  }

  & .leg-left {
    animation: 1s move-leg-left infinite;
    &::after {
      animation: 1s move-inferior-leg-left infinite;
    }
  }

  & .leg-right {
    animation: 1s move-leg-right infinite;
    &::after {
      animation: 1s move-inferior-leg-right infinite;
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
  return (
    <StyledGreenLightRedLightAnimation>
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
