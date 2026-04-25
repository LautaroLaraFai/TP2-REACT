import { i18n } from i18n;
import { initReactI18next } from "react-i18next";

import es from "../src/locales/es";
import en from "../src/locales/en";

//localStorage get item

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