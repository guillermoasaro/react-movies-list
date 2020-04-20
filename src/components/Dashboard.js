import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { Alert, Container } from "react-bootstrap";
import { getCookieSession } from "../common/SessionHelper";
import MovieDetail from "./MovieDetail";
import Navigation from "./Navigation";
import MoviesList from "./MoviesList";
import "./Dashboard.css";

export default function Dashboard(props) {
  let { path } = useRouteMatch();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    let session = getCookieSession();
    let url = `http://localhost:3001/movies_server?user_id=${session.user_id}`;
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        if (Array.isArray(data)) setMovies(data);
      });
  }, []);

  return (
    <div className="Dashboard">
      <Navigation signOut={props.signOut} />
      {(Array.isArray(movies) && movies.length) ? (
        <Switch>
          <Route exact path={path}>
            <MoviesList movies={movies} />
          </Route>
          <Route path={`${path}/movie/:movieId`}>
            <MovieDetail movies={movies} />
          </Route>
        </Switch>
      ) : (
        <Container className="mt-4">
          <Alert variant="warning">
            Something went wrong while fetching movies.
          </Alert>
        </Container>
      )}
    </div>
  );
}

Dashboard.propTypes = {
  signOut: PropTypes.func.isRequired,
};
