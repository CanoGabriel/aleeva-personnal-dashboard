import discordAxiosSetup from "./discord-axios-setup";
import aleevaAxiosSetup from "./aleeva-axios-setup";

const discordHttp = discordAxiosSetup();
const aleevaHttp = aleevaAxiosSetup();

// eslint-disable-next-line import/prefer-default-export
export { discordHttp, aleevaHttp };
