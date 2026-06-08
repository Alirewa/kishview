'use client';
import { createContext, useContext, type ReactNode } from 'react';
import { useAppStore } from '@/store/useAppStore';
import fa from '@/locales/fa';
import en from '@/locales/en';
import type { Translations } from '@/locales/fa';

interface LanguageContextValue {
  t: Translations;
  dir: 'rtl' | 'ltr';
}

const LanguageContext = createContext<LanguageContextValue>({
  t: fa,
  dir: 'rtl',
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useAppStore((s) => s.language);
  const t = language === 'fa' ? fa : en;
  const dir = language === 'fa' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ t, dir }}>
      <div dir={dir} className="h-full w-full">
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
