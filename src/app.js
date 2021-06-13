import React from "react";
import {
  BrowserRouter as Router, Route, Switch,
} from "react-router-dom";
import { ErrorNotFound, LocaleContextProvider, HomePage } from "./core";
import { LoginPage } from "./domains/user";
import { DiscordAuthProvider, DiscordAuthenticateRoute } from "./domains/discord";
import { AleevaAuthProvider } from "./domains/aleeva";
import "./core/locale";

import "./app.scss";

const App = () => (
  <Router>
    <LocaleContextProvider>
      <DiscordAuthProvider>
        <AleevaAuthProvider>
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <DiscordAuthenticateRoute exact path="/" component={HomePage} />
            <Route path="*" component={ErrorNotFound} />
          </Switch>
        </AleevaAuthProvider>
      </DiscordAuthProvider>
    </LocaleContextProvider>
  </Router>
);

export default App;
