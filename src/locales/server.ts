/* eslint-disable @typescript-eslint/no-explicit-any */
import { cache } from 'react';
import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { cookies, headers } from 'next/headers';
import { initReactI18next } from 'react-i18next/initReactI18next';

import { defaultNS, i18nOptions, fallbackLng } from './config-locales';
import { allLangs } from './all-langs';

import type { LanguageValue } from './config-locales';

const LANGUAGE_COOKIE_NAME = 'i18nextLng';

// Tarayıcının Accept-Language header'ından dil tercihlerini parse eder
function parseAcceptLanguage(acceptLanguage: string): string[] {
  return acceptLanguage
    .split(',')
    .map(lang => {
      const [code, q = '1'] = lang.trim().split(';q=');
      return { code: code.split('-')[0], quality: parseFloat(q) };
    })
    .sort((a, b) => b.quality - a.quality)
    .map(({ code }) => code);
}

// Desteklenen diller arasından en uygun olanı seçer
function findBestMatch(userLanguages: string[], supportedLanguages: string[]): string | null {
  for (const userLang of userLanguages) {
    if (supportedLanguages.includes(userLang)) {
      return userLang;
    }
  }
  return null;
}

export async function detectLanguage(): Promise<LanguageValue> {
  const cookieStore = cookies();
  const headersList = headers();
  
  // 1. Önce cookie'den kontrol et
  const cookieLang = (await cookieStore).get(LANGUAGE_COOKIE_NAME)?.value;
  
  const supportedLanguages = allLangs?.map(lang => lang.value);
  
  if (cookieLang && supportedLanguages.includes(cookieLang)) {
    return cookieLang as LanguageValue;
  }
  
  // 2. Cookie yoksa veya geçersizse, tarayıcının Accept-Language header'ından algıla
  const acceptLanguage = (await headersList).get('accept-language');
  
  if (acceptLanguage) {
    const userLanguages = parseAcceptLanguage(acceptLanguage);
    const bestMatch = findBestMatch(userLanguages, supportedLanguages);
    
    if (bestMatch) {
      return bestMatch as LanguageValue;
    }
  }
  
  // 3. Hiçbiri yoksa fallback dili kullan
  return fallbackLng as LanguageValue;
}

// ----------------------------------------------------------------------

export const getServerTranslations = cache(async (ns = defaultNS, options = {}) => {
  const language = await detectLanguage();

  const i18nextInstance = await initServerI18next(language, ns);

  return {
    t: i18nextInstance.getFixedT(
      language,
      Array.isArray(ns) ? ns[0] : ns,
      (options as Record<string, any>).keyPrefix
    ),
    i18n: i18nextInstance,
  };
});

// ----------------------------------------------------------------------

const initServerI18next = async (language: string, namespace: string) => {
  const i18nInstance = createInstance();

  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend((lang: string, ns: string) => import(`./langs/${lang}/${ns}.json`)))
    .init(i18nOptions(language, namespace));

  return i18nInstance;
};