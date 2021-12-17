import { Card, CardMedia, Typography } from "@mui/material";
import styled from "styled-components";
import GreenLightRedLightAnimation from "../components/GreenLightRedLightAnimation";

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
    },
    { name: "Dalgona", animation: undefined, nameEvent: null },
    { name: "Tug of war", animation: undefined, nameEvent: null },
    { name: "Even or Odd ?", animation: undefined, nameEvent: null },
    { name: "Who is nearest ?", animation: undefined, nameEvent: null },
    { name: "Aim for the hole !", animation: undefined, nameEvent: null },
  ];

  const onGameClick = (gameName) => {
    if (!!gameName) onSelectGame(gameName);
    else return;
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
          </Card>
        ))}
      </article>
    </StyledSelectGamesPage>
  );
}
