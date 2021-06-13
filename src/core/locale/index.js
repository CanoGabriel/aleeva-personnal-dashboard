import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import coreTranslationFr from "./core-translation.fr.json";

const defaultLng = "fr";

i18n.use(initReactI18next)
  .init({
    fallbackLng: defaultLng,
    defaultNS: "core",
    interpolation: {
      escapeValue: false,
    },
  });

i18n.addResourceBundle("fr", "core", coreTranslationFr);

export { defaultLng, i18n };
