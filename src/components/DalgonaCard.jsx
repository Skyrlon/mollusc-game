import styled from "styled-components";

const StyledDalgonaCard = styled.div`
  position: relative;
  width: 15%;
  height: 30rem;
  transform-style: preserve-3d;
  perspective: 1000px;
  transform: rotateY(${(props) => (props.showRecto ? 0 : 180)}deg);
  transition: 1s;

  & .face {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 5%;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &.recto {
      background: white;
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
    & svg {
      transform: scale(0.8);
    }
  }
`;

export default function DalgonaCard({ card, showRecto, onCardClick }) {
  return (
    <StyledDalgonaCard
      showRecto={showRecto}
      key={card.position}
      onClick={() => onCardClick(card.position)}
    >
      <div className="face recto">
        <div className="icon">{card.component}</div>
      </div>
      <div className="face verso"></div>
    </StyledDalgonaCard>
  );
}
