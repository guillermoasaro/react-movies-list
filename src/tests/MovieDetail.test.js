import React from "react";
import { render, screen } from "@testing-library/react";
import MovieDetail from "../components/MovieDetail";

jest.mock("react-router-dom", () => ({
  useParams: () => ({
    movieId: "1",
  }),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

test("It should render the selected movie data", () => {
  let data = [
    {
      id: 1,
      title: "The Gift",
      year: "2000",
      description:
        "A woman with extrasensory perception is asked to help find a young woman who has disappeared.",
    },
  ];
  render(<MovieDetail movies={data} />);

  const titleElement = screen.getByText(data[0].title);
  expect(titleElement).toBeInTheDocument();

  const yearElement = screen.getByText(data[0].year);
  expect(yearElement).toBeInTheDocument();

  const descriptionElement = screen.getByText(data[0].description);
  expect(descriptionElement).toBeInTheDocument();
});
