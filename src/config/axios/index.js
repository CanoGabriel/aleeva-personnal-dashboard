import axios from "axios";

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

// eslint-disable-next-line import/prefer-default-export
export { discordHttp };
