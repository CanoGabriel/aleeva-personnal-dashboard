import { discordHttp } from "../config";

const getCurrentDiscordUser = async () => discordHttp.get("/users/@me");

// eslint-disable-next-line import/prefer-default-export
export { getCurrentDiscordUser };
