import React, { useContext } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { AleevaAuthContext } from "../aleeva-auth-context/aleeva-auth-context";
import "./aleeva-login-button.scss";

const DiscordLoginButton = (props) => {
  const { className } = props;

  const { aleevaLogin } = useContext(AleevaAuthContext);

  return (
    <button
      className={classnames("aleeva-login-button", className)}
      type="button"
      onClick={() => aleevaLogin("T1OG5Jjqh20zaWQqNitmvFBakjR6ukmLcjkBWP4CFvBktdpkJtJTkFKc6oI0OGb5cxOAZCxZJ5aRrfij")}
    >
      Aleeva login !
    </button>
  );
};

DiscordLoginButton.propTypes = {
  className: PropTypes.string,
};

export default DiscordLoginButton;
