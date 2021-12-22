import { Button, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const StyledGreenLightRedLight = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & .countdown-before-start {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2rem;
  }

  & .game-state {
    position: absolute;
    top: 0%;
    left: 45%;
    font-size: 2rem;
  }

  & .remaining-distance {
    position: absolute;
    top: 5%;
    right: 25%;
  }

  & .field {
    position: relative;
    width: 50%;
    height: 80%;
    border: 1px solid grey;
  }

  & .player {
    position: absolute;
    left: 49%;
    bottom: ${(props) => props.distance}%;
    width: 1%;
    padding-top: 1%;
    height: 0;
    background-color: green;
    border-radius: 100%;
  }
`;

function convertOneDigitNumberToTwo(number) {
  return parseInt(number) < 10 ? `0${number}` : number;
}

export default function GreenLightRedLight() {
  const fieldSize = 50;

  const [isModalOpen, setIsModalOpen] = useState(true);

  const [showTimeBeforeStart, setShowTimeBeforeStart] = useState(false);

  const [timeBeforeStart, setTimeBeforeStart] = useState(3);

  const [startPlaying, setStartPlaying] = useState(false);

  const [stillPlaying, setStillPlaying] = useState(false);

  const [won, setWon] = useState(null);

  const [timeLeft, setTimeLeft] = useState(10);

  const [distance, setDistance] = useState(0);

  const countdown = useRef(null);

  const increment = useRef(null);

  const countdownBeforeStart = useRef(null);

  const incrementDistance = () => {
    setDistance((v) => v + 1);
    increment.current = setInterval(() => {
      setDistance((v) => v + 1);
    }, 100);
  };

  const stopIncrementDistance = () => {
    clearInterval(increment.current);
  };

  const onclickStart = () => {
    setIsModalOpen(false);
    setShowTimeBeforeStart(true);
    countdownBeforeStart.current = setInterval(
      () => setTimeBeforeStart((v) => v - 1),
      1000
    );
    setTimeout(startPlay, 3000);
  };

  const startPlay = () => {
    countdown.current = setInterval(() => {
      setTimeLeft((v) => v - 1);
    }, 1000);
    setStillPlaying(true);
    setStartPlaying(true);
  };

  //Stop the game when time is over or player win
  useEffect(
    () => {
      if (timeLeft <= 0 && fieldSize - distance > 0) {
        setStillPlaying(false);
        setWon(false);
        clearInterval(countdown.current);
      } else if (timeLeft > 0 && fieldSize - distance <= 0) {
        setStillPlaying(false);
        setWon(true);
        clearInterval(countdown.current);
      }
    }, // eslint-disable-next-line
    [timeLeft, distance]
  );

  useEffect(
    () => {
      if (timeBeforeStart <= 0) {
        setShowTimeBeforeStart(false);
        clearInterval(countdownBeforeStart.current);
      }
    }, // eslint-disable-next-line
    [timeBeforeStart]
  );

  return (
    <StyledGreenLightRedLight distance={(distance / fieldSize) * 100}>
      <Modal open={isModalOpen}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Button variant="outlined" onClick={onclickStart}>
            Start
          </Button>
        </Box>
      </Modal>

      {showTimeBeforeStart && (
        <span className="countdown-before-start">{timeBeforeStart}</span>
      )}

      <span className="game-state">
        {stillPlaying &&
          startPlaying &&
          `${convertOneDigitNumberToTwo(
            Math.floor(timeLeft / 60)
          )}:${convertOneDigitNumberToTwo(timeLeft % 60)}`}
        {won && !stillPlaying && startPlaying && "You have survived"}
        {!won && !stillPlaying && startPlaying && "You lost"}
      </span>

      <span className="remaining-distance">Still {fieldSize - distance}m</span>

      <div className="field">
        <div className="player" data-testid="player"></div>
      </div>

      <Button
        disabled={!stillPlaying}
        onMouseDown={incrementDistance}
        onMouseUp={stopIncrementDistance}
        onMouseLeave={stopIncrementDistance}
      >
        Run
      </Button>
    </StyledGreenLightRedLight>
  );
}
