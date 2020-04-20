import React from "react";
import PropTypes from 'prop-types';
import { useHistory, Link } from "react-router-dom";
import { getCookieSession } from "../common/SessionHelper";
import { Button, Image, Navbar } from "react-bootstrap";
import logo from "../logo.svg";
import "./Navigation.css";

// Navbar component used in the dashboard of authenticated users
export default function Navigation(props) {
  let history = useHistory();

  return (
    <Navbar variant="dark" className="App-nav">
      <Link to="/">
        <Navbar.Brand>
          <Image src={logo} className="App-logo" /> React Movies List
        </Navbar.Brand>
      </Link>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Signed in as: <b>{getCookieSession().name}</b>
        </Navbar.Text>
        <div className="divider-vertical" />
        <Navbar.Text>
          <Button
            variant="outline-primary"
            onClick={() => {
              props.signOut(() => history.push("/"));
            }}
          >
            Sign out
          </Button>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}

Navigation.propTypes = {
  signOut: PropTypes.func.isRequired
};
