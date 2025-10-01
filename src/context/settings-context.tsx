'use client';

import React, { createContext, useState, useEffect, useMemo, ReactNode } from 'react';

export type Language = 'en' | 'es';
export type Currency = 'usd' | 'eur';

interface SettingsContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [currency, setCurrencyState] = useState<Currency>('usd');

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') as Language | null;
    if (storedLanguage && ['en', 'es'].includes(storedLanguage)) {
      setLanguageState(storedLanguage);
    }
    const storedCurrency = localStorage.getItem('currency') as Currency | null;
    if (storedCurrency && ['usd', 'eur'].includes(storedCurrency)) {
      setCurrencyState(storedCurrency);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    localStorage.setItem('language', lang);
    setLanguageState(lang);
    // document.documentElement.lang = lang; // This causes a render error in Next.js 14
  };

  const setCurrency = (curr: Currency) => {
    localStorage.setItem('currency', curr);
    setCurrencyState(curr);
  };

  const value = useMemo(() => ({
    language,
    setLanguage,
    currency,
    setCurrency,
  }), [language, currency]);

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
