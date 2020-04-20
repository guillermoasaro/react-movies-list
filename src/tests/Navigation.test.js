import React from "react";
import { render, screen } from "@testing-library/react";
import Navigation from "../components/Navigation";

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
  Link: ({ to }) => <a href={to}></a>,
}));

let name = "TestUser";

const SessionHelper = require("../common/SessionHelper.js");
SessionHelper.getCookieSession = jest.fn(() => ({ name: name }));

test("It should display the user name", () => {
  let text = `Signed in as: <b>${name}</b>`;

  render(<Navigation signOut={jest.fn()} />);

  const userNameElement = screen.getByText("Signed in as:");
  expect(userNameElement.innerHTML).toBe(text);
});
