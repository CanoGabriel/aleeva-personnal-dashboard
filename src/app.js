import React from "react";
import {
  BrowserRouter as Router, Route, Switch,
} from "react-router-dom";
import { ErrorNotFound, HomePage } from "./core";
import { LoginPage } from "./domains/user";
import { AuthProvider, AuthenticateRoute } from "./domains/discord";
import "./app.scss";

const App = () => (
  <Router>
    <AuthProvider>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <AuthenticateRoute exact path="/" component={HomePage} />
        <Route path="*" component={ErrorNotFound} />
      </Switch>
    </AuthProvider>
  </Router>
);

export default App;
