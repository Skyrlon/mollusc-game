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
    font-size: 5rem;
  }

  & .game-state {
    position: absolute;
    top: 0%;
    left: 45%;
    font-size: 2rem;
  }

  & .game-phase {
    position: absolute;
    top: 0%;
    left: 0%;
    color: ${(props) => (props.shouldMove ? "green" : "red")};
  }

  & .remaining-distance {
    position: absolute;
    top: 0%;
    right: 0%;
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
  const fieldSize = 100;

  const [isModalOpen, setIsModalOpen] = useState(true);

  const [showTimeBeforeStart, setShowTimeBeforeStart] = useState(false);

  const [timeBeforeStart, setTimeBeforeStart] = useState(3);

  const [startPlaying, setStartPlaying] = useState(false);

  const [stillPlaying, setStillPlaying] = useState(false);

  const [shouldMove, setShouldMove] = useState(false);

  const toggleGamePhases = useRef(null);

  const [won, setWon] = useState(null);

  const [timeLeft, setTimeLeft] = useState(61);

  const [distance, setDistance] = useState(0);

  const countdown = useRef(null);

  const increment = useRef(null);

  const countdownBeforeStart = useRef(null);

  //Move the player
  const incrementDistance = () => {
    setDistance((v) => v + 1);
    increment.current = setInterval(() => {
      setDistance((v) => v + 1);
    }, 100);
  };

  //Stop the player
  const stopIncrementDistance = () => {
    clearInterval(increment.current);
  };

  //Close modal, start countdown before the game start
  const onclickStart = () => {
    setIsModalOpen(false);
    setShowTimeBeforeStart(true);
    countdownBeforeStart.current = setInterval(
      () => setTimeBeforeStart((v) => v - 1),
      1000
    );
    setTimeout(startPlay, 3000);
  };

  //Start game countdown, authorize player to click on "Run" button
  const startPlay = () => {
    countdown.current = setInterval(() => {
      setTimeLeft((v) => v - 1);
    }, 1000);
    setStillPlaying(true);
    setStartPlaying(true);
    setShouldMove(true);
  };

  //Stop the game when time is over or player win
  useEffect(
    () => {
      if (timeLeft <= 0 && fieldSize - distance > 0) {
        setStillPlaying(false);
        setWon(false);
        clearInterval(countdown.current);
      }
      if (timeLeft > 0 && fieldSize - distance <= 0) {
        setStillPlaying(false);
        setWon(true);
        clearInterval(countdown.current);
      }
    }, // eslint-disable-next-line
    [timeLeft, distance]
  );

  //Each time player moves, check if they are authorized to move
  useEffect(
    () => {
      if (!shouldMove) {
        setStillPlaying(false);
        setWon(false);
        clearInterval(countdown.current);
      }
    }, // eslint-disable-next-line
    [distance]
  );

  //When the countdown before the game start reach 0, hide and clear it
  useEffect(
    () => {
      if (timeBeforeStart <= 0) {
        setShowTimeBeforeStart(false);
        clearInterval(countdownBeforeStart.current);
      }
    }, // eslint-disable-next-line
    [timeBeforeStart]
  );

  //Each time game phase changes, clear the time out and set another one with same delay for red light and random one for green light
  useEffect(
    () => {
      clearTimeout(toggleGamePhases.current);
      if (shouldMove) {
        const randomDuration = Math.random() * (10000 - 5000) + 5000;
        toggleGamePhases.current = setTimeout(
          () => setShouldMove((v) => !v),
          randomDuration
        );
      } else {
        toggleGamePhases.current = setTimeout(
          () => setShouldMove((v) => !v),
          5000
        );
      }
    }, // eslint-disable-next-line
    [shouldMove]
  );

  return (
    <StyledGreenLightRedLight
      distance={(distance / fieldSize) * 100}
      shouldMove={shouldMove}
    >
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

      <div className="field">
        <div className="game-phase">
          {shouldMove ? "Green Light" : "Red Light"}
        </div>
        <span className="remaining-distance">
          Still {fieldSize - distance}m
        </span>
        <div className="player" data-testid="player"></div>
      </div>

      <Button
        variant="contained"
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
