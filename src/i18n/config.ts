import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslations from './locales/en.json';
import bgTranslations from './locales/bg.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'bg', // Set Bulgarian as the default language
    fallbackLng: 'en',
    debug: false,
    
    resources: {
      en: {
        translation: enTranslations,
      },
      bg: {
        translation: bgTranslations,
      },
    },
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'querystring', 'cookie', 'sessionStorage'],
      caches: ['localStorage'],
    },
  });

export default i18n;