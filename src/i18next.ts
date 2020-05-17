


import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationAM from './assets/locales/am/translation.json';
import translationRU from './assets/locales/ru/translation.json';
import translationEN from './assets/locales/en/translation.json';

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

// const Languages = ['am', 'ru', 'en']

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
