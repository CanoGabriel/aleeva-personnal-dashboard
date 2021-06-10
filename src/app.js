import React from "react";
import {
  BrowserRouter as Router, Route, Switch,
} from "react-router-dom";
import { ErrorNotFound, HomePage } from "./core";
import { LoginPage } from "./domains/user";
import { DiscordAuthProvider, DiscordAuthenticateRoute } from "./domains/discord";
import { AleevaAuthProvider } from "./domains/aleeva";
import "./app.scss";

const App = () => (
  <Router>
    <DiscordAuthProvider>
      <AleevaAuthProvider>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <DiscordAuthenticateRoute exact path="/" component={HomePage} />
          <Route path="*" component={ErrorNotFound} />
        </Switch>
      </AleevaAuthProvider>
    </DiscordAuthProvider>
  </Router>
);

export default App;
