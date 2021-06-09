import React, { createContext } from "react";
import PropTypes from "prop-types";
import qs from "qs";
import { useLocation } from "react-router-dom";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const location = useLocation();
  const queryParam = qs.parse(location.search, { ignoreQueryPrefix: true });
  console.log(location);

  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };
