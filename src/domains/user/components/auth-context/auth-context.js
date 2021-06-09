import React, { useEffect, useState, createContext } from "react";
import PropTypes from "prop-types";
import qs from "qs";
import { useLocation, useHistory } from "react-router-dom";
import {
  validateAccessCodeCsrf, discordAuthenticate, discordStartLogin, cleanDiscordAuthCsrf, revokeToken,
} from "../../utils/auth-utils";
import {
  getLocalstorageDiscordAuthInfo, setLocalstorageDiscordAuthInfo, clearLocalstorageDiscordAuthInfo,
} from "../../utils/auth-localstorage-utils";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [discordAuthInfo, setDiscordAuthInfo] = useState({});

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

  const setupAuthentication = () => {
    const { code, state } = queryParam;
    if (!discordAuthInfo?.accessToken && code && state && validateAccessCodeCsrf(state)) {
      cleanDiscordAuthCsrf();

      discordAuthenticate(code).then((response) => {
        const { access_token: accessToken, refresh_token: refreshToken, scope } = response.data;
        setDiscordAuthInfo({ accessToken, refreshToken, scope });
        setLocalstorageDiscordAuthInfo({ accessToken, refreshToken, scope });
        browserHistory.replace(location.pathname);
      });
    }
  };

  const initAuthentication = () => {
    const storedDiscordAuthInfo = getLocalstorageDiscordAuthInfo();
    if (storedDiscordAuthInfo && !discordAuthInfo.accessToken) {
      setDiscordAuthInfo(storedDiscordAuthInfo);
    }
  };

  useEffect(initAuthentication, []);
  useEffect(setupAuthentication, [queryParam]);

  return (
    <AuthContext.Provider value={{ discordAuthInfo, discordLogin, discordLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };
