import randombytes from "randombytes";
import qs from "qs";
import { discordHttp } from "../../config";

const {
  REACT_APP_DISCORD_API_URL: discordApiUrl,
  REACT_APP_DISCORD_LOGIN_REDIRECT: discordLoginRedirect,
  REACT_APP_DISCORD_CLIENT_ID: discordClienId,
  REACT_APP_DISCORD_CLIENT_SECRET: discordClienSecret,
  REACT_APP_DISCORD_AUTH_SCOPE: discordAuthScope,
} = process.env;

const discordAuthCsrf = "discord-auth-csrf";

const discordStartLogin = () => {
  const csrfContent = randombytes(16).toString("hex");
  localStorage.setItem(discordAuthCsrf, csrfContent);

  const data = {
    client_id: discordClienId,
    response_type: "code",
    scope: discordAuthScope,
    redirect_uri: discordLoginRedirect,
    state: csrfContent,
  };

  document.location.href = `${discordApiUrl}/oauth2/authorize${qs.stringify(data, { addQueryPrefix: true })}`;
};

const validateAccessCodeCsrf = (csrfToken) => {
  const storedDiscordAuthCsrf = localStorage.getItem(discordAuthCsrf);
  return csrfToken === storedDiscordAuthCsrf;
};

const cleanDiscordAuthCsrf = () => localStorage.removeItem(discordAuthCsrf);

const discordAuthenticate = async (accessCode) => {
  const params = new URLSearchParams();
  params.append("client_id", discordClienId);
  params.append("client_secret", discordClienSecret);
  params.append("grant_type", "authorization_code");
  params.append("redirect_uri", discordLoginRedirect);
  params.append("code", accessCode);

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  return discordHttp.post("/oauth2/token", params, config);
};

const revokeToken = async (tokenToRevoke) => {
  const params = new URLSearchParams();
  params.append("token", tokenToRevoke);

  const clientCredentials = btoa(`${discordClienId}:${discordClienSecret}`);
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${clientCredentials}`,
    },
  };

  return discordHttp.post("/oauth2/token/revoke", params, config);
};
const refreshToken = async (token) => discordHttp.post("/oauth2/token", {
  client_id: discordClienId,
  client_secret: discordClienSecret,
  grant_type: "refresh_token",
  refresh_token: token,
});

export {
  discordStartLogin, revokeToken, validateAccessCodeCsrf, discordAuthenticate, refreshToken, cleanDiscordAuthCsrf,
};
