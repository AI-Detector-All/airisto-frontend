/* eslint-disable @typescript-eslint/no-explicit-any */
import { cache } from 'react';
import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { cookies } from 'next/headers';
import { initReactI18next } from 'react-i18next/initReactI18next';

import { defaultNS, i18nOptions, fallbackLng } from './config-locales';

import type { LanguageValue } from './config-locales';

// ----------------------------------------------------------------------

/**
 * [1] with url:
 * https://nextjs.org/docs/pages/building-your-application/routing/internationalization
 *
 * Use i18next with app folder and without locale in url:
 * https://github.com/i18next/next-app-dir-i18next-example/issues/12#issuecomment-1500917570


export async function detectLanguage() {
  const cookies = getCookies();

  const language = cookies.get(cookieName)?.value ?? fallbackLng;

  return language as LanguageValue;
}

 */
const LANGUAGE_COOKIE_NAME = 'i18nextLng';

export async function detectLanguage(): Promise<LanguageValue | null> {
  const cookieStore = cookies();
  const lang = (await cookieStore).get(LANGUAGE_COOKIE_NAME)?.value;
  return lang as LanguageValue | null;
}

// ----------------------------------------------------------------------

export const getServerTranslations = cache(async (ns = defaultNS, options = {}) => {
  const language = await detectLanguage() || fallbackLng;

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
