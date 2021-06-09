import randombytes from "randombytes";
import qs from "qs";
import { discordHttp } from "../../../config";

const {
  REACT_APP_DISCORD_API_URL: discordApiUrl,
  REACT_APP_DISCORD_LOGIN_REDIRECT: discordLoginRedirect,
  REACT_APP_DISCORD_CLIENT_ID: discordClienId,
  REACT_APP_DISCORD_CLIENT_SECRET: discordClienSecret,
  REACT_APP_DISCORD_AUTH_SCOPE: discordAuthScope,
} = process.env;

const authCsrfCookieName = "auth-csrf";

const getAccessCode = () => {
  const content = randombytes(16).toString("base64");
  // TODO cookie flag secure check
  document.cookie = `${authCsrfCookieName}:${content}; Secure`;
  const data = {
    client_id: discordClienId,
    redirect_uri: discordLoginRedirect,
    response_type: "code",
    scope: discordAuthScope,
  };

  document.location.href = `${discordApiUrl}/oauth2/authorize${qs.stringify(data, { addQueryPrefix: true })}`;
};

const validateAccessCodeCsrf = (state) => {
  // TODO cookies extract utils
  const cookies = Object.fromEntries(document.cookie.split("; ").map((strCookie) => strCookie.split("=")));
  const authCsrfCookie = cookies[authCsrfCookieName];
  return authCsrfCookie === state;
};

const getTokenFromAccessCode = async (accessCode) => discordHttp.get("/oauth2/token", {
  client_id: discordClienId,
  client_secret: discordClienSecret,
  grant_type: "authorization_code",
  code: accessCode,
});

const refreshToken = async (refreshToken) => discordHttp.get("/oauth2/token", {
  client_id: discordClienId,
  client_secret: discordClienSecret,
  grant_type: "refresh_token",
  code: refreshToken,
});

export {
  getAccessCode, validateAccessCodeCsrf, getTokenFromAccessCode, refreshToken,
};
