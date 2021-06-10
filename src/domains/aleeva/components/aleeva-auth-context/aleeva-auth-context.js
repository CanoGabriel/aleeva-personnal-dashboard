import React, { useState, useEffect, useMemo, createContext } from "react";
import PropTypes from "prop-types";
import { getAleevaToken } from "../../aleeva.services";
import { getLocalstorageAleevaAuthInfo, setLocalstorageAleevaAuthInfo, clearLocalstorageAleevaAuthInfo } from "../../utils/auth-localstorage-utils.js";
const AleevaAuthContext = createContext({});

const AleevaAuthProvider = ({ children }) => {
  const [aleevaAuthInfo, setAleevaAuthInfo ] = useState({});

  const isAleevaSignIn = useMemo(() => Boolean(discordAuthInfo?.accessToken), [discordAuthInfo?.accessToken]);

  const aleevaLogin = async (accessCode) => {
    const response = await getAleevaToken({ grantType: "access_code", token: accessCode })
    
    const { accessToken, refreshToken } = response.data;
    const authInfo = { accessToken, refreshToken }
    setAleevaAuthInfo(authInfo);
    setLocalstorageAleevaAuthInfo(authInfo);
  };

  const aleevaLogout = () => {
    // TODO revoke token
    clearLocalstorageAleevaAuthInfo();
    setAleevaAuthInfo({});
  };

  const setupAleevaAuth = () => {
    const storedAuthInfo = getLocalstorageAleevaAuthInfo();
    if(storedAuthInfo && !aleevaAuthInfo?.accessToken){
      setAleevaAuthInfo(storedAuthInfo);
    }
  }

  useEffect(setupAleevaAuth, [])

  return (
    <AleevaAuthContext.Provider value={{ aleevaAuthInfo, aleevaLogin, aleevaLogout, isAleevaSignIn }}>
      {children}
    </AleevaAuthContext.Provider>
  );
}; 

AleevaAuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export { AleevaAuthContext, AleevaAuthProvider };
