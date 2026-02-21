'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { type Locale, type T, translations } from './i18n';

const LanguageContext = createContext<{
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: T;
} | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('ru');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('portfolio-locale') as Locale | null;
    if (stored === 'ru' || stored === 'en') setLocaleState(stored);
  }, []);

  useEffect(() => {
    if (!mounted || typeof document === 'undefined') return;
    document.documentElement.lang = locale;
    localStorage.setItem('portfolio-locale', locale);
  }, [locale, mounted]);

  const setLocale = (l: Locale) => setLocaleState(l);
  const t = translations[locale];

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
