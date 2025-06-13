'use client';

import i18next from 'i18next';
import { useEffect } from 'react';
import resourcesToBackend from 'i18next-resources-to-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next, I18nextProvider as Provider } from 'react-i18next';


import { i18nOptions, fallbackLng } from './config-locales';

import type { LanguageValue } from './config-locales';

// ----------------------------------------------------------------------

let lng;

/**
 * [1] localStorage
 * Auto detection:
 * const lng = localStorageGetItem('i18nextLng')
 */
if (typeof window !== 'undefined') {
  lng = localStorage.getItem('i18nextLng');
}

if (!lng) {
  lng = fallbackLng;
  if (typeof window !== 'undefined') {
    localStorage.setItem('i18nextLng', fallbackLng);
  }
}

const getStoredLanguage = () => {
  if (typeof window !== 'undefined') {
    const cookieStore = document.cookie.replace(/(?:(?:^|.*;\s*)i18nextLng\s*=\s*([^;]*).*$)|^.*$/, "$1");
    return cookieStore || fallbackLng;
  }
  return fallbackLng;
};


i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(resourcesToBackend((lang: string, ns: string) => import(`./langs/${lang}/${ns}.json`)))
  .init({
    ...i18nOptions(lng),
    lng: getStoredLanguage(), // Explicitly set the language
    fallbackLng,
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },
    // debug: true, // Enable debug to see what's happening
  });

// ----------------------------------------------------------------------

type Props = {
  lang?: LanguageValue | undefined;
  children: React.ReactNode;
};

export function I18nProvider({ lang, children }: Props) {
  useEffect(() => {
    const storedLng = getStoredLanguage();
    const language = lang || storedLng;

    if (language && i18next.language !== language) {
      i18next.changeLanguage(language);
    }
  }, [lang]);


  return <Provider i18n={i18next}>{children}</Provider>;
}
