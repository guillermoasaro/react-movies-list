import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory, useLocation, Redirect } from "react-router-dom";
import { Button, Form, Image, Alert } from "react-bootstrap";
import { isAuthenticated } from "../common/SessionHelper";
import logo from "../logo.svg";
import "./Login.css";

export default function Login(props) {
  const [errors, setErrors] = useState([]);

  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/dashboard" } };
  let login = (e) => {
    e.preventDefault();

    let email = e.target.email.value;
    let pass = e.target.password.value;

    fetch(`http://localhost:3001/login?user=${email}&password=${pass}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data && data.success) {
          props.signIn(data.user, () => {
            history.replace(from);
          });
        } else {
          setErrors([
            ...errors,
            { variant: "danger", message: data.message || "Unknow error" },
          ]);
        }
      })
      .catch((e) => {
        setErrors([...errors, { variant: "danger", message: "Unknow error" }]);
      });
  };

  let removeError = (idx) => {
    setErrors(errors.filter((_e, index) => index !== idx));
  };

  return isAuthenticated() ? (
    <Redirect to="/dashboard" />
  ) : (
    <div className="text-center">
      <Form className="form-signin" onSubmit={login}>
        <Image src={logo} fluid />
        <h1 className="h3 mb-3 font-weight-normal text-white">
          Please sign in
        </h1>
        <Form.Control
          type="email"
          name="email"
          placeholder="name@example.com"
          required
          autoFocus
        />
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        {errors.map((error, idx) => (
          <Alert
            key={idx}
            variant={error.variant}
            dismissible
            onClose={() => removeError(idx)}
          >
            {error.message}
          </Alert>
        ))}
        <Button variant="primary" size="lg" block type="submit">
          Sign in
        </Button>
      </Form>
    </div>
  );
}

Login.propTypes = {
  signIn: PropTypes.func.isRequired,
};
