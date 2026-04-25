import { i18n } from i18n;
import { initReactI18next } from "react-i18next";

import es from "../src/locales/es";
import en from "../src/locales/en";
import LANGUAGES from "../src/const/languages";

//localStorage.getItem("language", || LANGUAGES.es)

i18n.use(initReactI18next).init({
    resources: {
        es: {
            translation: es,
        },
        en: {
            translation: en
        }
    }, 
    // lng: savedLanguage
    fallbacklng: "es",
    interpolation: {
        escapeValue: false
    }
})

export default i18n;