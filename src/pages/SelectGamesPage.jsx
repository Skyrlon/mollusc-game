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
    justify-content: space-around;
    width: 100%;

    & > * {
      flex: 1 1 10px;
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
            sx={{ maxWidth: "14%", marginTop: "5%" }}
            onClick={() => onGameClick(game.nameEvent)}
          >
            <CardMedia
              sx={{ paddingTop: "1rem", paddingBottom: "1rem" }}
              component="div"
            >
              {game.animation}
            </CardMedia>
            <Typography sx={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
              {game.name}
            </Typography>
            <CardActions>
              <ExpandMoreIcon
                sx={{ marginLeft: "auto" }}
                onClick={handleExpandClick}
              />
            </CardActions>
            <Collapse in={showDescription} timeout="auto">
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
