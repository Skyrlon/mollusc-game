import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import GreenLightRedLight from "../components/GreenLightRedLight";
import GameCountdown from "../components/GameCountdown";
import { Button, Modal } from "@mui/material";
import { Box } from "@mui/system";

const StyledGamePage = styled.div`
  width: 100vw;
  height: 100vh;

  & .game-state {
    position: absolute;
    top: 0%;
    left: 45%;
    font-size: 2rem;
  }

  & .countdown-before-start {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 5rem;
  }
`;

export default function GamePage({ game }) {
  const gamesTime = [{ name: "green-light-red-light", time: 61 }];

  const [isModalOpen, setIsModalOpen] = useState(true);

  const [won, setWon] = useState(null);

  const [startPlaying, setStartPlaying] = useState(false);

  const [stillPlaying, setStillPlaying] = useState(false);

  const [timeBeforeStart, setTimeBeforeStart] = useState(3);

  const [showTimeBeforeStart, setShowTimeBeforeStart] = useState(false);

  const [isTimeUp, setIsTimeUp] = useState(false);

  const countdownBeforeStart = useRef(null);

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
    setStartPlaying(true);
    setStillPlaying(true);
  };

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

  return (
    <StyledGamePage>
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
        {startPlaying && stillPlaying && (
          <GameCountdown
            time={gamesTime.find((x) => x.name === game).time}
            timesUp={() => setIsTimeUp(true)}
          />
        )}
        {won && !stillPlaying && startPlaying && "You have survived"}
        {!won && !stillPlaying && startPlaying && "You lost"}
      </span>

      {game === "green-light-red-light" && (
        <GreenLightRedLight
          timesUp={isTimeUp}
          gameOver={(payload) => {
            setWon(payload.win);
            setStillPlaying(false);
          }}
          startPlay={startPlaying}
          stillPlay={stillPlaying}
        />
      )}
    </StyledGamePage>
  );
}
