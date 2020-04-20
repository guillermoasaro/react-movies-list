import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../components/Login";

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
  useLocation: () => ({ state: { from: { pathname: "/dashboard" } } }),
  Link: ({ to }) => <a href={to}></a>,
}));

const SessionHelper = require("../common/SessionHelper.js");
SessionHelper.isAuthenticated = jest.fn(() => false);

const mockSignIn = jest.fn((user, _callback) => console.log(user));

test("It should display the form", () => {
  render(<Login signIn={mockSignIn} />);

  const messageElement = screen.getByText("Please sign in");
  expect(messageElement).toBeInTheDocument();
});
