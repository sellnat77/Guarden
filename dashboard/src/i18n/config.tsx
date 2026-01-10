import HttpApi from "i18next-http-backend";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const DEFAULT_LOCALE = "en-US";
export const DEFAULT_LANGUAGE = "en";

i18n
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    lng: DEFAULT_LANGUAGE,
    fallbackLng: DEFAULT_LANGUAGE,
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
