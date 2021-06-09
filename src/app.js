import React from "react";
import {
  BrowserRouter as Router, Route, Switch,
} from "react-router-dom";
import { ErrorNotFound, HomePage } from "./core";
import { LoginPage, AuthProvider } from "./domains/user";
import "./app.scss";

const App = () => (
  <Router>
    <AuthProvider>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/" component={HomePage} />
        <Route path="*" component={ErrorNotFound} />
      </Switch>
    </AuthProvider>
  </Router>
);

export default App;
