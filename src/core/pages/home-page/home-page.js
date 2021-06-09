import React, { useContext } from "react";
import { AuthContext } from "../../components/auth-context/auth-context";

const HomePage = () => {
  const { discordAuthInfo, discordLogout } = useContext(AuthContext);
  return (
    <div>
      <pre>{JSON.stringify(discordAuthInfo, null, 2)}</pre>
      <button type="button" onClick={discordLogout}>Logout</button>
    </div>
  );
};

export default HomePage;
