import styled from "styled-components";
import GreenLightRedLight from "../components/GreenLightRedLight";

const StyledGamePage = styled.div`
  width: 100vw;
  height: 100vh;
`;

export default function GamePage({ game }) {
  return (
    <StyledGamePage>
      {game === "green-light-red-light" && <GreenLightRedLight />}
    </StyledGamePage>
  );
}
