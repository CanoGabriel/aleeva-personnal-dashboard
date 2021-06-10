// import randombytes from "randombytes";
// import qs from "qs";
// import { aleevaHttp } from "../../../config";

// const {
//   REACT_APP_ALEEVA_API_URL: aleevaApiUrl,
//   REACT_APP_ALEEVA_LOGIN_REDIRECT: aleevaLoginRedirect,
//   REACT_APP_ALEEVA_CLIENT_ID: aleevaClienId,
//   REACT_APP_ALEEVA_CLIENT_SECRET: aleevaClienSecret,
//   REACT_APP_ALEEVA_AUTH_SCOPE: aleevaAuthScope,
// } = process.env;

const aleevaAuthenticate = () => {
  // const csrfContent = randombytes(16).toString("hex");
  // localStorage.setItem(aleevaAuthCsrf, csrfContent);

  // const data = {
  //   client_id: aleevaClienId,
  //   response_type: "code",
  //   scope: aleevaAuthScope,
  //   redirect_uri: aleevaLoginRedirect,
  //   state: csrfContent,
  // };

  // document.location.href = `${aleevaApiUrl}/oauth2/authorize${qs.stringify(data, { addQueryPrefix: true })}`;
};

// const aleevaRevokeToken = async (tokenToRevoke) => {
//   const params = new URLSearchParams();
//   params.append("token", tokenToRevoke);

//   const clientCredentials = btoa(`${aleevaClienId}:${aleevaClienSecret}`);
//   const config = {
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//       Authorization: `Basic ${clientCredentials}`,
//     },
//   };

//   return discordHttp.post("/oauth2/token/revoke", params, config);
// };

// const aleevaRefreshToken = async (token) => discordHttp.post("/oauth2/token", {
//   client_id: aleevaClienId,
//   client_secret: aleevaClienSecret,
//   grant_type: "refresh_token",
//   refresh_token: token,
// });

// eslint-disable-next-line import/prefer-default-export
export { aleevaAuthenticate };
