import { Button } from "@mui/material";
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
    bottom: 0%;
    width: 1vw;
    height: 1vw;
    background-color: green;
    border-radius: 100%;
  }
`;

export default function GreenLightRedLight() {
  return (
    <StyledGreenLightRedLight>
      <div className="field">
        <div className="player" data-testid="player"></div>
      </div>
      <Button>Run</Button>
    </StyledGreenLightRedLight>
  );
}
