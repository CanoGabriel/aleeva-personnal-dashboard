const discordAuthInfoLocastorageKey = "discord-auth-info";

/**
 * Get discord auth information from localstorage
 * @returns { { accessToken: string, refreshToken: string, scope: string } | null };
 */
const getLocalstorageDiscordAuthInfo = () => {
  const strAuthInfo = localStorage.getItem(discordAuthInfoLocastorageKey) || "null";
  return JSON.parse(strAuthInfo);
};

/**
 * Save discord auth info into localstorage
 * @param authInfo
 * @param {string} authInfo.accessToken The discord access token
 * @param {string} authInfo.refreshToken The discord refresh token
 * @param {string} authInfo.scope The discord refresh token
 * @returns
 */
const setLocalstorageDiscordAuthInfo = (authInfo = {}) => {
  const { accessToken, refreshToken, scope } = authInfo;
  const strAuthInfo = JSON.stringify({ accessToken, refreshToken, scope });
  return localStorage.setItem(discordAuthInfoLocastorageKey, strAuthInfo);
};

/**
 * Clear all discord auth info stored in localStorage
 */
const clearLocalstorageDiscordAuthInfo = () => localStorage.removeItem(discordAuthInfoLocastorageKey);

export { getLocalstorageDiscordAuthInfo, setLocalstorageDiscordAuthInfo, clearLocalstorageDiscordAuthInfo };
