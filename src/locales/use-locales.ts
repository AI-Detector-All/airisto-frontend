'use client';

import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

import { allLangs } from './all-langs';
import { fallbackLng } from './config-locales';

// Tarayıcının dilini algıla
function detectBrowserLanguage(): string {
  if (typeof window === 'undefined') return fallbackLng;
  
  // Desteklenen dillerin listesi
  const supportedLanguages = allLangs.map(lang => lang.value);
  
  // 1. navigator.language (tam dil kodu)
  const browserLang = navigator.language?.split('-')[0];
  if (browserLang && supportedLanguages.includes(browserLang)) {
    return browserLang;
  }
  
  // 2. navigator.languages (dil tercihleri sırası)
  if (navigator.languages) {
    for (const lang of navigator.languages) {
      const langCode = lang.split('-')[0];
      if (supportedLanguages.includes(langCode)) {
        return langCode;
      }
    }
  }
  
  return fallbackLng;
}

export function useTranslate(ns?: string) {
  const { t, i18n } = useTranslation(ns);
  const [currentLangCode, setCurrentLangCode] = useState(i18n.language || fallbackLng);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const setLanguage = (lang: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('i18nextLng', lang);
      document.cookie = `i18nextLng=${lang}; path=/; max-age=${60 * 60 * 24 * 365}`; // 1 yıl
      i18next.changeLanguage(lang);
    }
  };

  // İlk yüklemede otomatik dil algılama
  useEffect(() => {
    if (typeof window === 'undefined' || isInitialized) return;
    
    const initializeLanguage = async () => {
      // 1. LocalStorage'dan kontrol et
      const storedLang = localStorage.getItem('i18nextLng');
      const supportedLanguages = allLangs.map(lang => lang.value);
      
      if (storedLang && supportedLanguages.includes(storedLang)) {
        if (i18n.language !== storedLang) {
          await i18next.changeLanguage(storedLang);
          setCurrentLangCode(storedLang);
        }
        setIsInitialized(true);
        return;
      }
      
      // 2. Tarayıcı dilini algıla
      const browserLang = detectBrowserLanguage();
      
      if (browserLang !== i18n.language) {
        setLanguage(browserLang);
        setCurrentLangCode(browserLang);
      }
      
      setIsInitialized(true);
    };
    
    initializeLanguage();
  }, [i18n, isInitialized]);

  // i18n.language değişikliklerini takip et
  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      setCurrentLangCode(lng);
    };
    
    i18n.on('languageChanged', handleLanguageChange);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);
  
  const fallback = allLangs.find((lang) => lang.value === fallbackLng) || allLangs[0];
  const currentLang = allLangs.find((lang) => lang.value === currentLangCode) || fallback;

  const onChangeLang = useCallback(
    async (newLangValue: string) => {
      try {
        setLanguage(newLangValue);
        
        // Dil değişikliğini bekle
        await i18next.changeLanguage(newLangValue);
        setCurrentLangCode(newLangValue);
        
        // Sayfa yenileme yerine sadece state güncellemesi yeterli
        // window.location.reload(); // Bu satırı kaldırın
        
      } catch (error) {
        console.error('Error changing language:', error);
      }
    },
    []
  );

  return {
    t,
    i18n,
    onChangeLang,
    currentLang,
    isInitialized, // Dil başlatma durumunu takip etmek için
  };
}