import { useState } from "react";
import GamePage from "./pages/GamePage";
import SelectGamesPage from "./pages/SelectGamesPage";

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  const [currentGame, setCurrentGame] = useState(null);

  return (
    <div className="App">
      {!isPlaying && (
        <SelectGamesPage
          onSelectGame={(gameName) => {
            setIsPlaying(true);
            setCurrentGame(gameName);
          }}
        />
      )}
      {isPlaying && currentGame && <GamePage game={currentGame} />}
    </div>
  );
}
