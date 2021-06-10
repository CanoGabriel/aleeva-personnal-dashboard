import { aleevaHttp } from "../../config";

const {
  REACT_APP_ALEEVA_CLIENT_ID: aleevaClientId,
  REACT_APP_ALEEVA_CLIENT_SECRET: aleevaClientSecret,
  REACT_APP_ALEEVA_AUTH_SCOPE: aleevaAuthScope,
} = process.env;

const getAleevaToken = async (params) => {
  const { grantType, token } = params;

  const body = new URLSearchParams();
  body.append("grant_type", grantType);
  body.append("client_id", aleevaClientId);
  body.append("client_secret", aleevaClientSecret);
  body.append("scopes", aleevaAuthScope);

  if (grantType === "access_code") {
    body.append("access_code", token);
  }

  if (grantType === "refresh_token") {
    body.append("access_code", token);
  }

  const config = { headers: { "Content-Type": "application/x-www-form-urlencoded" } };

  return aleevaHttp.post("/auth/token", body, config);
};

// eslint-disable-next-line import/prefer-default-export
export { getAleevaToken };
