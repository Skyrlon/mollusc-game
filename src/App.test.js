import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders SelectGamesPage component", () => {
  render(<App />);
  const selectGamesPageComponent = screen.getByTestId("select-games-page");
  expect(selectGamesPageComponent).toBeInTheDocument();
});
