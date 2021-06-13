const aleevaAuthInfoLocastorageKey = "aleeva-auth-info";

/**
 * Get aleeva auth information from localstorage
 * @returns { { accessToken: string, refreshToken: string, scope: string } | null };
 */
const getLocalstorageAleevaAuthInfo = () => {
  const strAuthInfo = localStorage.getItem(aleevaAuthInfoLocastorageKey) || "null";
  return JSON.parse(strAuthInfo);
};

/**
 * Save aleeva auth info into localstorage
 * @param authInfo
 * @param {string} authInfo.accessToken The aleeva access token
 * @param {string} authInfo.refreshToken The aleeva refresh token
 * @param {string} authInfo.scope The aleeva refresh token
 * @returns
 */
const setLocalstorageAleevaAuthInfo = (authInfo = {}) => {
  const { accessToken, refreshToken, scope } = authInfo;
  const strAuthInfo = JSON.stringify({ accessToken, refreshToken, scope });
  return localStorage.setItem(aleevaAuthInfoLocastorageKey, strAuthInfo);
};

/**
 * Clear all aleeva auth info stored in localStorage
 */
const clearLocalstorageAleevaAuthInfo = () => localStorage.removeItem(aleevaAuthInfoLocastorageKey);

export { getLocalstorageAleevaAuthInfo, setLocalstorageAleevaAuthInfo, clearLocalstorageAleevaAuthInfo };
