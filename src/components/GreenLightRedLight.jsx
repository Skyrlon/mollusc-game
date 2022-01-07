import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";

const StyledGreenLightRedLight = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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

export default function GreenLightRedLight({ gameOver, startPlay, stillPlay }) {
  const fieldSize = 100;

  const [shouldMove, setShouldMove] = useState(false);

  const toggleGamePhases = useRef(null);

  const [distance, setDistance] = useState(0);

  const increment = useRef(null);

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

  //Stop the game when time is over or player win
  useEffect(
    () => {
      if (fieldSize - distance <= 0) {
        gameOver({ win: true });
      }
    }, // eslint-disable-next-line
    [distance]
  );

  //Each time player moves, check if they are authorized to move
  useEffect(
    () => {
      if (!shouldMove && startPlay) {
        gameOver({ win: false });
      }
    }, // eslint-disable-next-line
    [distance]
  );

  //Player can move when countdown before the start ends, and reset distance when player restart the game
  useEffect(() => {
    if (startPlay) {
      setShouldMove(true);
      setDistance(0);
    }
  }, [startPlay]);

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
      return () => clearTimeout(toggleGamePhases.current);
    }, // eslint-disable-next-line
    [shouldMove]
  );

  return (
    <StyledGreenLightRedLight
      distance={(distance / fieldSize) * 100}
      shouldMove={shouldMove}
    >
      <div className="field">
        {startPlay && stillPlay && (
          <div className="game-phase">
            {shouldMove ? "Green Light" : "Red Light"}
          </div>
        )}
        <span className="remaining-distance">
          Still {fieldSize - distance}m
        </span>
        {startPlay && <div className="player" data-testid="player"></div>}
      </div>

      <Button
        variant="contained"
        disabled={!stillPlay}
        onMouseDown={incrementDistance}
        onMouseUp={stopIncrementDistance}
        onMouseLeave={stopIncrementDistance}
      >
        Run
      </Button>
    </StyledGreenLightRedLight>
  );
}
