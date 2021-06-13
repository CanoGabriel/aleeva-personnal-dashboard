import React, { useState, useEffect, createContext } from "react";
import PropTypes from "prop-types";
import i18n from "../../locale";
import { getStoredLocale, setStoredLocale } from "../../utils/locale-localstorage-utils";

const LocaleContext = createContext({});

const LocaleContextProvider = ({ children }) => {
  const [lng, setLng] = useState("fr");

  const updateLng = (newLng) => {
    i18n.setLng(newLng);
    setLng(newLng);
    setStoredLocale(newLng);
  };

  const reloadLocale = () => {
    const storedLocale = getStoredLocale();
    setLng(storedLocale || "fr");
  };

  useEffect(reloadLocale, []);

  return (
    <LocaleContext.Provider value={{ lng, updateLng }}>{children}</LocaleContext.Provider>
  );
};

LocaleContextProvider.propTypes = { children: PropTypes.node.isRequired };

export { LocaleContextProvider, LocaleContext };
