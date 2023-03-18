import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import { App } from "../App";

beforeAll(() => {
  window.myAPI = {
    updateTitle: jest.fn(),
  };
});

test("render App component", async () => {
  render(<App />);

  const button = screen.getByRole("button");
  const spy = jest.spyOn(window.myAPI, "updateTitle");
  await userEvent.click(button);

  expect(spy).toHaveBeenCalled();
  expect(button).toHaveTextContent("count is 1");
});
