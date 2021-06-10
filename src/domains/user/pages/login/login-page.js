import React from "react";
import { DiscordLoginButton } from "../../../discord";
import { AleevaLoginButton } from "../../../aleeva";
import "./login-page.scss";

const LoginPage = () => (
  <div className="login-page">
    <div className="login-page__signin">
      <span className="signin__text">Connexion :</span>
      <DiscordLoginButton className="signin__button" />
      <AleevaLoginButton />
    </div>
  </div>
);

export default LoginPage;
