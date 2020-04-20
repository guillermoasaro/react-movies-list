import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Container, Card, Button } from "react-bootstrap";
import { useParams, Redirect, useHistory } from "react-router-dom";
import "./MovieDetail.css";

export default function MovieDetail(props) {
  let { movieId } = useParams();
  let movie =
    props.movies && props.movies.find((mov) => mov.id.toString() === movieId);
  let history = useHistory();

  return movie ? (
    <Container>
      <Row>
        <Col md="4" className="mt-4">
          <Card className="bg-dark text-white">
            <Card.Img
              className="CardImage"
              src={movie.image_url}
              alt={movie.title}
            />
          </Card>
        </Col>
        <Col md="8" className="mt-4">
          <Card bg="gray MovieDetail" text="white">
            <Card.Header>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Subtitle className="text-muted">{movie.year}</Card.Subtitle>
            </Card.Header>
            <Card.Body>
              <Card.Text>{movie.description}</Card.Text>
            </Card.Body>
            <footer className="DetailFooter">
              <Button variant="secondary" onClick={history.goBack}>
                Go Back
              </Button>
            </footer>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : (
    <Redirect to="/dashboard" />
  );
}

MovieDetail.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      year: PropTypes.string,
      description: PropTypes.string,
      image_url: PropTypes.string,
    })
  ).isRequired,
};
