import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { getCookieSession, setCookieSession } from "./common/SessionHelper";
import PrivateRoute from "./common/PrivateRoute";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import "./App.css";

export default function App() {
  const [session, setSession] = useState(
    getCookieSession() || { user_id: null, name: "" }
  );

  useEffect(() => {
    setCookieSession(session);
  }, [session]);

  const signIn = (user, cb) => {
    setSession({ user_id: user.id, name: user.name });
    cb();
  };

  const signOut = (cb) => {
    setSession({ user_id: null, name: "" });
    cb();
  };

  return (
    <Router>
      <div className="App">
        <Switch>
          <PrivateRoute path="/dashboard">
            <Dashboard signOut={signOut} />
          </PrivateRoute>
          <Route path="/">
            <Login signIn={signIn} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
