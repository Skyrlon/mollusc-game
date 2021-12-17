import { render, screen } from "@testing-library/react";
import GreenLightRedLight from "./GreenLightRedLight";

test("renders player", () => {
  render(<GreenLightRedLight />);
  const player = screen.getByTestId("player");
  expect(player).toBeInTheDocument();
});

test("renders run button", () => {
  render(<GreenLightRedLight />);
  const runButton = screen.getByRole("button");
  expect(runButton).toBeInTheDocument();
});
