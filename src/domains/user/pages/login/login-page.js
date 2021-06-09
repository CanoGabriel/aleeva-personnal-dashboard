import React, { useContext } from "react";
import { AuthContext } from "../../../../core";
import { ReactComponent as DiscordLogo } from "../../assets/discord-logo.svg";
import "./login-page.scss";

const LoginPage = () => {
  const { discordLogin } = useContext(AuthContext);

  return (
    <div className="login-page">
      <div className="login-page__signin">
        <span className="signin__text">Connexion :</span>
        <button className="signin__button" type="button" onClick={discordLogin}>
          <DiscordLogo className="discord-logo" />
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
