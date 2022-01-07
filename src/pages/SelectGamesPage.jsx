import styled from "styled-components";
import GreenLightRedLightAnimation from "../components/GreenLightRedLightAnimation";
import GameCard from "../components/GameCard";
import DalgonaAnimation from "../components/DalgonaAnimation";

const StyledSelectGamesPage = styled.section`
  text-align: center;
  article {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    height: 90vh;
    & .game-card {
      position: relative;
      flex: 1 1 10px;
      max-width: ${(props) => props.cardGameLength}%;
      height: auto;
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
      animation: <DalgonaAnimation />,
      nameEvent: "dalgona",
      description: "Cut around the shape without break it",
    },
    {
      name: "Tug of war",
      animation: undefined,
      nameEvent: null,
      description:
        "Click as fast as you can to pull the rope, or atleast faster than your opponents",
    },
    {
      name: "Even or Odd ?",
      animation: undefined,
      nameEvent: null,
      description: "Guess if your opponent has even or odd number of marble",
    },
    {
      name: "Who is nearest ?",
      animation: undefined,
      nameEvent: null,
      description: "Throw the marble so that it is closest to the wall",
    },
    {
      name: "Aim for the hole !",
      animation: undefined,
      nameEvent: null,
      description:
        "Throw marbles until one fits in the hole, whoever made it wins all the marbles thrown",
    },
    {
      name: "Stepping stones",
      animation: undefined,
      nameEvent: null,
      description:
        "Some stones are unstable others are solid, guess or try your luck to move forward",
    },
  ];

  const handleSelectGame = (gameName) => {
    if (!!gameName) onSelectGame(gameName);
    else return;
  };

  return (
    <StyledSelectGamesPage
      data-testid="select-games-page"
      cardGameLength={100 / games.length - 1}
    >
      <h2>Choose your game !</h2>
      <article>
        {games.map((game) => (
          <div className="game-card" key={game.name}>
            <GameCard game={game} onSelectGame={handleSelectGame} />
          </div>
        ))}
      </article>
    </StyledSelectGamesPage>
  );
}
