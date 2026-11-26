import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import esCommon from './locales/es/common.json';
import enCommon from './locales/en/common.json';
import esLanding from './locales/es/landing.json';
import enLanding from './locales/en/landing.json';

const resources = {
  es: {
    common: esCommon,
    landing: esLanding,
  },
  en: {
    common: enCommon,
    landing: enLanding,
  },
};

const savedLang = typeof window !== 'undefined' ? localStorage.getItem('hombros_lang') : 'es';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLang || 'es',
    fallbackLng: 'es',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
