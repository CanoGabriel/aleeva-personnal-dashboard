import React, { useState, useEffect, createContext } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { getStoredLocale, setStoredLocale } from "../../utils/locale-localstorage-utils";
import { defaultLng } from "../../locale";

const LocaleContext = createContext({});

const LocaleContextProvider = ({ children }) => {
  const [lng, setLng] = useState(defaultLng);
  const { i18n, ready } = useTranslation("core", { useSuspense: false });

  const updateLng = (newLng) => {
    setLng(newLng);
    i18n.changeLanguage(newLng);
    setStoredLocale(newLng);
  };

  const reloadLocale = () => {
    const storedLocale = getStoredLocale();
    setLng(storedLocale || defaultLng);
  };

  useEffect(reloadLocale, []);

  if (!ready) {
    return <di>loading...</di>;
  }

  return (
    <LocaleContext.Provider value={{ lng, updateLng }}>{children}</LocaleContext.Provider>
  );
};

LocaleContextProvider.propTypes = { children: PropTypes.node.isRequired };

export { LocaleContextProvider, LocaleContext };
