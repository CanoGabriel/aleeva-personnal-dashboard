import React from "react";
import {
  BrowserRouter as Router, Route, Switch,
} from "react-router-dom";
import { ErrorNotFound, HomePage } from "./core";
import { LoginPage } from "./domains/user";
import "./app.scss";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/" component={HomePage} />
      <Route path="*" component={ErrorNotFound} />
    </Switch>
  </Router>
);

export default App;
