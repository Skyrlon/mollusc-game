import styled from "styled-components";

const StyledDalgonaAnimation = styled.div`
  .circle {
    transform-origin: center;
    transform: rotate(-90deg);
  }

  .circle-front {
    stroke-dasharray: 251.362548828125;
    stroke-dashoffset: 251.362548828125;
    animation: draw-circle 5s linear infinite;
  }

  @keyframes draw-circle {
    0% {
      stroke-dashoffset: 251.362548828125;
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
  return (
    <StyledDalgonaAnimation>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle
          class="circle"
          cx="50"
          cy="50"
          r="30"
          stroke="black"
          fill="transparent"
        />
        <circle
          class="circle circle-front"
          cx="50"
          cy="50"
          r="30"
          stroke="red"
          fill="transparent"
        />
      </svg>
    </StyledDalgonaAnimation>
  );
}
