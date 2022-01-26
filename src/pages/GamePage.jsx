import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import GreenLightRedLight from "../components/GreenLightRedLight";
import GameCountdown from "../components/GameCountdown";
import { Button, Modal, Typography, ButtonGroup } from "@mui/material";
import { Box } from "@mui/system";
import Dalgona from "../components/Dalgona";
import PropTypes from "prop-types";

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

export default function GamePage({ game, stopPlaying }) {
  const gamesData = [
    { name: "green-light-red-light", time: 61, gotIntro: false },
    { name: "dalgona", time: 610, gotIntro: true },
  ];

  const [isModalOpen, setIsModalOpen] = useState(true);

  const [won, setWon] = useState(null);

  const [startPlaying, setStartPlaying] = useState(false);

  const [stillPlaying, setStillPlaying] = useState(false);

  const [timeBeforeStart, setTimeBeforeStart] = useState(3);

  const [showTimeBeforeStart, setShowTimeBeforeStart] = useState(false);

  const countdownBeforeStart = useRef(null);

  //Close modal, start countdown before the game start
  const onClickStart = () => {
    setIsModalOpen(false);
    if (!gamesData.find((data) => data.name === game).gotIntro) {
      setShowTimeBeforeStart(true);
      countdownBeforeStart.current = setInterval(
        () => setTimeBeforeStart((v) => v - 1),
        1000
      );
      setTimeout(startPlay, 3000);
    } else {
      startPlay();
    }
  };

  const onClickRestart = () => {
    setIsModalOpen(false);
    setShowTimeBeforeStart(true);
    setTimeBeforeStart(3);
    setWon(null);
    countdownBeforeStart.current = setInterval(
      () => setTimeBeforeStart((v) => v - 1),
      1000
    );
    setTimeout(startPlay, 3000);
  };

  const handleGameOver = (payload) => {
    setWon(payload.win);
    setStartPlaying(false);
    setStillPlaying(false);
    setIsModalOpen(true);
  };

  //Start game
  const startPlay = () => {
    setStartPlaying(true);
    if (!gamesData.find((data) => data.name === game).gotIntro) {
      setStillPlaying(true);
    }
  };

  const handleTimesUp = () => {
    setWon(false);
    setStartPlaying(false);
    setStillPlaying(false);
    setIsModalOpen(true);
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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {won && !stillPlaying && <Typography>You have survived</Typography>}
          {!won && won !== null && !stillPlaying && (
            <Typography>You lost</Typography>
          )}
          <ButtonGroup>
            {won === null && (
              <Button variant="outlined" onClick={onClickStart}>
                Start
              </Button>
            )}
            {won !== null && (
              <Button variant="outlined" onClick={onClickRestart}>
                Restart
              </Button>
            )}
            {won !== null && (
              <Button variant="outlined" onClick={stopPlaying}>
                Go back to select others games
              </Button>
            )}
          </ButtonGroup>
        </Box>
      </Modal>

      {showTimeBeforeStart && (
        <span className="countdown-before-start">{timeBeforeStart}</span>
      )}

      <span className="game-state">
        {startPlaying && stillPlaying && (
          <GameCountdown
            time={gamesData.find((x) => x.name === game).time}
            timesUp={handleTimesUp}
          />
        )}
      </span>

      {game === "green-light-red-light" && (
        <GreenLightRedLight
          gameOver={handleGameOver}
          startPlay={startPlaying}
          stillPlay={stillPlaying}
        />
      )}
      {game === "dalgona" && startPlaying && (
        <Dalgona
          startTheGame={() => setStillPlaying(true)}
          gameOver={handleGameOver}
        />
      )}
    </StyledGamePage>
  );
}

GamePage.propTypes = {
  game: PropTypes.string.isRequired,
  stopPlaying: PropTypes.func.isRequired,
};
