'use client';

import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { enUS, fr, vi, zhCN, arSA, Locale } from 'date-fns/locale';
import { useTranslate } from './use-locales';

// Define supported locales
const locales = {
  en: enUS,
  vi: vi,
  fr: fr,
  'zh-cn': zhCN,
  'ar-sa': arSA,
};

type LocaleContextType = {
  locale: Locale;
  currentLang: string;
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export function LocalizationProvider({ children }: Props) {
  const { currentLang } = useTranslate();
  const [locale, setLocale] = useState(locales.en);

  useEffect(() => {
    // Map the currentLang.adapterLocale to the appropriate date-fns locale
    const localeKey = currentLang.adapterLocale as keyof typeof locales;
    setLocale(locales[localeKey] || locales.en);
  }, [currentLang]);

  return (
    <LocaleContext.Provider value={{ locale, currentLang: currentLang.adapterLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

// Hook to use the locale in components
export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocalizationProvider');
  }
  return context;
}