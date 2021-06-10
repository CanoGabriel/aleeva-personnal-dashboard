import React, { useContext } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { ReactComponent as DiscordLogo } from "../../assets/discord-logo.svg";
import { DiscordAuthContext } from "../discord-auth-context/discord-auth-context";
import "./discord-login-button.scss";

const DiscordLoginButton = (props) => {
  const { className } = props;

  const { discordLogin } = useContext(DiscordAuthContext);

  return (
    <button className={classnames("discord-login-button", className)} type="button" onClick={discordLogin}>
      <DiscordLogo className="discord-logo" />
    </button>
  );
};

DiscordLoginButton.propTypes = {
  className: PropTypes.string,
};

export default DiscordLoginButton;
