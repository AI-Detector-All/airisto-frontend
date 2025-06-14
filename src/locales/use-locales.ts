'use client';

import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next'; // Import the i18next instance directly

import { allLangs } from './all-langs';
import { fallbackLng } from './config-locales';

export function useTranslate(ns?: string) {
  const { t, i18n } = useTranslation(ns);
  
  // Use a state to track the current language
  const [currentLangCode, setCurrentLangCode] = useState(i18n.language || fallbackLng);
  
  const setLanguage = (lang: string) => {
    localStorage.setItem('i18nextLng', lang);
    document.cookie = `i18nextLng=${lang}; path=/`; // önemli: path=/ vermezsen bazı sayfalarda görünmez
    i18next.changeLanguage(lang);
  };

  // Update the state when i18n.language changes
  useEffect(() => {
    setCurrentLangCode(i18n.language || fallbackLng);
  }, [i18n.language]);
  
  const fallback = allLangs.find((lang) => lang.value === fallbackLng) || allLangs[0];
  const currentLang = allLangs.find((lang) => lang.value === currentLangCode) || fallback;

  const onChangeLang = useCallback(
    (newLangValue: string) => {
      // console.log('Changing language to:', newLangValue);
      
      // Set localStorage first
      if (typeof window !== 'undefined') {
        setLanguage(newLangValue);
      }
      
      // Change the language synchronously
      i18next.changeLanguage(newLangValue, (err) => {
        if (err) {
          console.error('Error changing language:', err);
          return;
        }
        
        // console.log('Language successfully changed to:', i18next.language);
        setCurrentLangCode(newLangValue);
        
        // Force reload the page to ensure server and client are in sync
        window.location.reload();
      });
    },
    []
  );

  return {
    t,
    i18n,
    onChangeLang,
    currentLang,
  };
}