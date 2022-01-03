import styled from "styled-components";
import GreenLightRedLightAnimation from "../components/GreenLightRedLightAnimation";
import GameCard from "../components/GameCard";

const StyledSelectGamesPage = styled.section`
  text-align: center;
  article {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;

    & .game-card {
      position: relative;
      flex: 1 1 10px;
      max-width: 14%;
      margin-top: 5%;
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

  const handleSelectGame = (gameName) => {
    if (!!gameName) onSelectGame(gameName);
    else return;
  };

  return (
    <StyledSelectGamesPage data-testid="select-games-page">
      <h2>Choose your game !</h2>
      <article>
        {games.map((game) => (
          <div className="game-card">
            <GameCard
              key={game.name}
              game={game}
              onSelectGame={handleSelectGame}
            />
          </div>
        ))}
      </article>
    </StyledSelectGamesPage>
  );
}
