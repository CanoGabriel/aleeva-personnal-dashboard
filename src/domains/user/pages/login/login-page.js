import React, { useContext } from "react";
import { AuthContext } from "../../../../core";

const LoginPage = () => {
  const { discordLogin } = useContext(AuthContext);

  return (
    <div>
      <h1>login page</h1>
      <button type="button" onClick={discordLogin}>Discord Login</button>
    </div>
  );
};

export default LoginPage;
