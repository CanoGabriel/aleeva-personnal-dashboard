const localeLocalstorage = "locale";

/**
 * Store in localstorage provided locale info
 * @param {"fr" | "en"} lngInfo
 */
const setStoredLocale = (lngInfo) => {
  localStorage.setItem(localeLocalstorage, lngInfo);
};

/**
 * Get locale info from locastorage
 * @returns {"fr" | "en"}
 */
const getStoredLocale = () => localStorage.getItem(localeLocalstorage);

/**
 * Remove locale storage info
 */
const removeStoredLocale = () => localStorage.removeItem(localeLocalstorage);

export { setStoredLocale, getStoredLocale, removeStoredLocale };
