import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "./locales/en/translation.json";
import npTranslation from "./locales/np/translation.json";

const resources = {
    en: {
        translation: enTranslation,
    },
    np: {
        translation: npTranslation,
    },
};

if (!i18n.isInitialized) {
    i18n
        .use(initReactI18next)
        .init({
            resources,

            lng: "en", // Default language

            fallbackLng: "en",

            interpolation: {
                escapeValue: false,
            },
        });
}

export default i18n;
