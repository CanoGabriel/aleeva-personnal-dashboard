import React, {
  useState, useEffect, useMemo, createContext,
} from "react";
import PropTypes from "prop-types";
import { getAleevaToken, revokeAleevaToken } from "../../aleeva.services";
import {
  getLocalstorageAleevaAuthInfo, setLocalstorageAleevaAuthInfo, clearLocalstorageAleevaAuthInfo,
} from "../../utils/auth-localstorage-utils";

const AleevaAuthContext = createContext({});

const AleevaAuthProvider = ({ children }) => {
  const [aleevaAuthInfo, setAleevaAuthInfo] = useState({});

  const isAleevaSignIn = useMemo(() => Boolean(aleevaAuthInfo?.accessToken), [aleevaAuthInfo?.accessToken]);

  const aleevaLogin = async (accessCode) => {
    const response = await getAleevaToken({ grantType: "access_code", token: accessCode });

    const { accessToken, refreshToken } = response.data;
    const authInfo = { accessToken, refreshToken };
    setAleevaAuthInfo(authInfo);
    setLocalstorageAleevaAuthInfo(authInfo);
  };

  const aleevaLogout = () => {
    revokeAleevaToken().then(() => {
      clearLocalstorageAleevaAuthInfo();
      setAleevaAuthInfo({});
    });
  };

  const setupAleevaAuth = () => {
    const storedAuthInfo = getLocalstorageAleevaAuthInfo();
    if (storedAuthInfo && !aleevaAuthInfo?.accessToken) {
      setAleevaAuthInfo(storedAuthInfo);
    }
  };

  useEffect(setupAleevaAuth, []);

  return (
    <AleevaAuthContext.Provider value={{
      aleevaAuthInfo, aleevaLogin, aleevaLogout, isAleevaSignIn,
    }}
    >
      <pre>
        Aleeva
        {JSON.stringify(aleevaAuthInfo, null, 2)}
      </pre>
      {children}
    </AleevaAuthContext.Provider>
  );
};

AleevaAuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export { AleevaAuthContext, AleevaAuthProvider };
