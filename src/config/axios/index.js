import axios from "axios";
import { getLocalstorageDiscordAuthInfo } from "../../core/utils/auth-localstorage-utils";

const { REACT_APP_DISCORD_API_URL } = process.env;

const discordAxiosInstanceOptions = {
  baseURL: REACT_APP_DISCORD_API_URL,
  timeout: 30000,
  validateStatus: (status) => status < 400,
};

/**
 * Default axios instance
 * @type {import("axios").AxiosInstance}
 */
const discordHttp = axios.create(discordAxiosInstanceOptions);

discordHttp.interceptors.request.use((reqConfig) => {
  const authInfo = getLocalstorageDiscordAuthInfo();

  if (authInfo?.accessToken && !reqConfig.headers.Authorization) {
    // eslint-disable-next-line no-param-reassign
    reqConfig.headers.Authorization = `Bearer ${authInfo.accessToken}`;
  }
  return reqConfig;
});

// eslint-disable-next-line import/prefer-default-export
export { discordHttp };
