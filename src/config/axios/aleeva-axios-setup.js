import axios from "axios";
import { getLocalstorageAleevaAuthInfo } from "../../domains/aleeva/utils/auth-localstorage-utils";
const { REACT_APP_ALEEVA_API_URL } = process.env;

const aleevaAxiosInstanceOptions = {
  baseURL: REACT_APP_ALEEVA_API_URL,
  timeout: 30000,
  validateStatus: (status) => status < 400,
};

/**
 * Default axios instance
 * @returns {import("axios").AxiosInstance}
 */
const aleevaAxiosSetup = () => {
  const axiosInstance = axios.create(aleevaAxiosInstanceOptions);

  // Setup Auth2 Bearer access token from localstorage when autorisation header not already defined
  axiosInstance.interceptors.request.use((reqConfig) => {
    const authInfo = getLocalstorageAleevaAuthInfo();

    if (authInfo?.accessToken && !reqConfig.headers.Authorization) {
      // eslint-disable-next-line no-param-reassign
      reqConfig.headers.Authorization = `Bearer ${authInfo.accessToken}`;
    }
    return reqConfig;
  });


  // TODO Handle automatique accessToken refresh on 401
  // TODO Handle rate limit security

  return axiosInstance;
};

// eslint-disable-next-line import/prefer-default-export
export default aleevaAxiosSetup;
