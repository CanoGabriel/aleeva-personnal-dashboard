import React, { useContext, useState, useEffect } from "react";
import { DiscordAuthContext } from "../../../domains/discord";
import { getCurrentDiscordUser } from "../../../domains/discord/discord.services";

const HomePage = () => {
  const { discordLogout } = useContext(DiscordAuthContext);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    getCurrentDiscordUser().then((response) => {
      setCurrentUser(response.data);
    });
  }, []);
  return (
    <div>
      <pre>{JSON.stringify(currentUser, null, 2)}</pre>
      <button type="button" onClick={discordLogout}>Logout</button>
    </div>
  );
};

export default HomePage;
