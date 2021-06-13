import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import coreTranslationFr from "./core-translation.fr.json";

i18n.use(initReactI18next)
  .init({
    fallbackLng: "fr",
    defaultNS: "core",
    interpolation: {
      escapeValue: false,
    },
  });

i18n.addResourceBundle("fr", "core", coreTranslationFr);

export default i18n;
