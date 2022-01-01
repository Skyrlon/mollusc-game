import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "styled-components";
import GreenLightRedLightAnimation from "../components/GreenLightRedLightAnimation";
import { useState } from "react";

const StyledSelectGamesPage = styled.section`
  text-align: center;
  article {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100vh;
    justify-content: space-around;

    & > * {
      margin-top: 5%;
      width: 15%;
      height: 40%;
    }
  }
`;

export default function SelectGamesPage({ onSelectGame }) {
  const games = [
    {
      name: "Red Light, Green Light",
      animation: <GreenLightRedLightAnimation />,
      nameEvent: "green-light-red-light",
      description:
        "Don't move when it's red light, move when it's green light, keep on until you arrived to then end of the field",
    },
    {
      name: "Dalgona",
      animation: undefined,
      nameEvent: null,
      description: "",
    },
    {
      name: "Tug of war",
      animation: undefined,
      nameEvent: null,
      description: "",
    },
    {
      name: "Even or Odd ?",
      animation: undefined,
      nameEvent: null,
      description: "",
    },
    {
      name: "Who is nearest ?",
      animation: undefined,
      nameEvent: null,
      description: "",
    },
    {
      name: "Aim for the hole !",
      animation: undefined,
      nameEvent: null,
      description: "",
    },
  ];

  const [showDescription, setShowDescription] = useState(false);

  const onGameClick = (gameName) => {
    if (!!gameName) onSelectGame(gameName);
    else return;
  };

  const handleExpandClick = (e) => {
    e.stopPropagation();
    setShowDescription((v) => !v);
  };

  return (
    <StyledSelectGamesPage data-testid="select-games-page">
      <h2>Choose your game !</h2>
      <article>
        {games.map((game) => (
          <Card
            key={game.name}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              height: "100%",
            }}
            onClick={() => onGameClick(game.nameEvent)}
          >
            <CardMedia component="div">{game.animation}</CardMedia>
            <Typography>{game.name}</Typography>
            <CardActions>
              <ExpandMoreIcon onClick={handleExpandClick} />
            </CardActions>
            <Collapse in={showDescription}>
              <CardContent>
                <Typography>{game.description}</Typography>
              </CardContent>
            </Collapse>
          </Card>
        ))}
      </article>
    </StyledSelectGamesPage>
  );
}
