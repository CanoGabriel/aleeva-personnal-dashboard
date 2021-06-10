import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";
import { DiscordAuthContext } from "../discord-auth-context/discord-auth-context";

const AuthenticateRoute = (props) => {
  const { component: Component, path, ...rest } = props;
  const { isSignedIn, authLoading } = useContext(DiscordAuthContext);

  if (authLoading) return false;

  const render = (renderProps) => (isSignedIn ? <Component {...renderProps} /> : <Redirect to="/login" />);

  return (
    <Route {...rest} path={path} render={render} />
  );
};

AuthenticateRoute.propTypes = {
  component: PropTypes.element.isRequired,
  path: PropTypes.string.isRequired,
};

export default AuthenticateRoute;
