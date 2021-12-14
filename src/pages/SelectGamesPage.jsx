import { Card, CardMedia, Typography } from "@mui/material";
import styled from "styled-components";
import GreenLightRedLightAnimation from "./GreenLightRedLightAnimation";

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

export default function SelectGamesPage() {
  const games = [
    {
      name: "Red Light, Green Light",
      animation: <GreenLightRedLightAnimation />,
    },
    { name: "Dalgona", animation: undefined },
    { name: "Tug of war", animation: undefined },
    { name: "Even or Odd ?", animation: undefined },
    { name: "Who is nearest ?", animation: undefined },
    { name: "Aim for the hole !", animation: undefined },
  ];

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
              justifyContent: "space-around",
            }}
          >
            <CardMedia component="div">{game.animation}</CardMedia>
            <Typography>{game.name}</Typography>
          </Card>
        ))}
      </article>
    </StyledSelectGamesPage>
  );
}
