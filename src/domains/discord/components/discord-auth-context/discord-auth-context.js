import React, {
  useEffect, useState, useMemo, createContext,
} from "react";
import PropTypes from "prop-types";
import qs from "qs";
import { useLocation, useHistory } from "react-router-dom";
import {
  validateAccessCodeCsrf, discordAuthenticate, discordStartLogin, cleanDiscordAuthCsrf, revokeToken,
} from "../../utils/auth-utils";
import {
  getLocalstorageDiscordAuthInfo, setLocalstorageDiscordAuthInfo, clearLocalstorageDiscordAuthInfo,
} from "../../utils/auth-localstorage-utils";

const DiscordAuthContext = createContext({});

const DiscordAuthProvider = ({ children }) => {
  const [discordAuthInfo, setDiscordAuthInfo] = useState({});
  const [authLoading, setAuthLoading] = useState(true);

  const isSignedIn = useMemo(() => Boolean(discordAuthInfo?.accessToken), [discordAuthInfo?.accessToken]);

  const location = useLocation();
  const browserHistory = useHistory();

  const queryParam = qs.parse(location.search, { ignoreQueryPrefix: true });

  const discordLogin = () => {
    if (!discordAuthInfo.accessToken) {
      discordStartLogin();
    }
  };

  const discordLogout = async () => {
    const { refreshToken, accessToken } = discordAuthInfo;
    if (refreshToken) {
      await revokeToken(refreshToken);
    }
    if (accessToken) {
      await revokeToken(accessToken);
    }
    // Clear stored discord auth info
    clearLocalstorageDiscordAuthInfo();

    // Clear context auth info
    setDiscordAuthInfo({});
  };

  const setupAuthentication = async () => {
    const { code, state } = queryParam;
    const storedDiscordAuthInfo = getLocalstorageDiscordAuthInfo();

    if (storedDiscordAuthInfo && !discordAuthInfo.accessToken) {
      setDiscordAuthInfo(storedDiscordAuthInfo);
      setAuthLoading(false);
    } else if (!discordAuthInfo?.accessToken && code && state && validateAccessCodeCsrf(state)) {
      const response = await discordAuthenticate(code);
      const { access_token: accessToken, refresh_token: refreshToken, scope } = response.data;
      cleanDiscordAuthCsrf();
      setDiscordAuthInfo({ accessToken, refreshToken, scope });
      setLocalstorageDiscordAuthInfo({ accessToken, refreshToken, scope });
      browserHistory.replace(location.pathname);
    }

    setAuthLoading(false);
  };

  useEffect(() => {
    setupAuthentication();
  }, [queryParam]);

  return (
    <DiscordAuthContext.Provider value={{
      discordAuthInfo, discordLogin, discordLogout, isSignedIn, authLoading,
    }}
    >
      <pre>
        Discord
        {JSON.stringify(discordAuthInfo, null, 2)}
      </pre>
      {children}
    </DiscordAuthContext.Provider>
  );
};

DiscordAuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { DiscordAuthContext, DiscordAuthProvider };
