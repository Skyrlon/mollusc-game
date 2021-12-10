import { Card, Typography } from "@mui/material";
import styled from "styled-components";

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
      height: 30%;
    }
  }
`;

export default function SelectGamesPage() {
  const games = [
    { name: "Red Light, Green Light" },
    { name: "Dalgona" },
    { name: "Tug of war" },
    { name: "Even or Odd ?" },
    { name: "Who is nearest ?" },
    { name: "Aim for the hole !" },
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
              justifyContent: "center",
            }}
          >
            <Typography>{game.name}</Typography>
          </Card>
        ))}
      </article>
    </StyledSelectGamesPage>
  );
}
