import React from "react";
import { render, screen } from "@testing-library/react";
import MoviesList from "../components/MoviesList";

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
  useRouteMatch: () => ({ url: "/dashboard" }),
  Link: ({ to }) => <a href={to}></a>,
}));

let data = [
  {
    id: 1,
    title: "The Gift",
    year: "2000",
    description:
      "A woman with extrasensory perception is asked to help find a young woman who has disappeared.",
    image_url:
      "https://m.media-amazon.com/images/M/MV5BNTUzMDY3ZDAtY2RiNC00ZGM4LWJjNmMtNWU0MGVjOWVkNjcwXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
  },
  {
    id: 2,
    title: "The Merchant of Venice",
    year: "2004",
    description:
      "In 16th century Venice, when a merchant must default on a large loan from an abused Jewish moneylender for a friend with romantic ambitions, the bitterly vengeful creditor demands a gruesome payment instead.",
    image_url:
      "https://m.media-amazon.com/images/M/MV5BMGJiNGUxZGYtM2U2YS00ZjJlLThlNjQtYTVkNWUxZGRmYTk4XkEyXkFqcGdeQXVyMTMxMTY0OTQ@._V1_.jpg",
  },
];

test("It should display a Card component for each movie", () => {
  render(<MoviesList movies={data} />);

  const cardsElements = document.querySelectorAll(".card");
  expect(cardsElements.length).toBe(data.length);
});
