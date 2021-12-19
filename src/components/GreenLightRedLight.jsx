import { Button } from "@mui/material";
import { useRef } from "react";
import { useState } from "react";
import styled from "styled-components";

const StyledGreenLightRedLight = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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

export default function GreenLightRedLight() {
  const fieldSize = 100;

  const [distance, setDistance] = useState(0);

  const increment = useRef(null);

  const incrementDistance = () => {
    increment.current = setInterval(() => {
      setDistance((v) => v + 1);
    }, 100);
  };

  const stopIncrementDistance = () => {
    clearInterval(increment.current);
  };

  return (
    <StyledGreenLightRedLight distance={distance}>
      <span>Still {fieldSize - distance}m</span>
      <div className="field">
        <div className="player" data-testid="player"></div>
      </div>
      <Button
        onMouseDown={incrementDistance}
        onMouseUp={stopIncrementDistance}
        onMouseLeave={stopIncrementDistance}
      >
        Run
      </Button>
    </StyledGreenLightRedLight>
  );
}
