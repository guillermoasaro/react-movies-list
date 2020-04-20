import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Container, Card } from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";

export default function MoviesList(props) {
  let { url } = useRouteMatch();
  return (
    <Container className="mt-4">
      <Row>
        {props.movies.map((movie) => (
          <Col key={movie.id} md="4" className="mb-4">
            <Card className="bg-dark text-white">
              <Card.Img
                className="CardImage"
                src={movie.image_url}
                alt={movie.title}
              />
              <Card.ImgOverlay>
                <Card.Title className="CardTitle">{movie.title}</Card.Title>
                <Link
                  to={`${url}/movie/${movie.id}`}
                  className="stretched-link"
                ></Link>
              </Card.ImgOverlay>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      year: PropTypes.string,
      description: PropTypes.string,
      image_url: PropTypes.string,
    })
  ),
};
