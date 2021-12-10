import { render, screen } from "@testing-library/react";
import SelectGamesPage from "./SelectGamesPage";

test("renders SelectGamesPage component", () => {
  render(<SelectGamesPage />);
  const heading = screen.getByText("Choose your game !");
  expect(heading).toBeInTheDocument();
});
