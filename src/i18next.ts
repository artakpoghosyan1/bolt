import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import translationAM from './locales/am/translation.json';
import translationRU from './locales/ru/translation.json';
import translationEN from './locales/en/translation.json';

const resources = {
    am: {
        translation: translationAM
    },
    ru: {
        translation: translationRU
    },
    en: {
        translation: translationEN
    }
};


i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
        fallbackLng: 'am',
        debug: true,
        resources,

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        }
    });


export default i18n;
