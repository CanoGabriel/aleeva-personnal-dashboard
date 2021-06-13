import React, { useContext, useState } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { AleevaAuthContext } from "../aleeva-auth-context/aleeva-auth-context";
import "./aleeva-login-button.scss";

const DiscordLoginButton = (props) => {
  const { className } = props;

  const { aleevaLogin } = useContext(AleevaAuthContext);
  const [accessCode, setAccessCode] = useState();

  const handleClick = () => {
    if (accessCode) {
      aleevaLogin(accessCode);
    }
  };

  return (
    <>
      <input type="text" value={accessCode} onChange={(e) => setAccessCode(e.target.value)} />
      <button className={classnames("aleeva-login-button", className)} type="button" onClick={handleClick}>
        Aleeva login !
      </button>
    </>
  );
};

DiscordLoginButton.propTypes = {
  className: PropTypes.string,
};

export default DiscordLoginButton;
