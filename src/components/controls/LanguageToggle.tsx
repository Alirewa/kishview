'use client';
import { useAppStore } from '@/store/useAppStore';

export function LanguageToggle() {
  const { language, toggleLanguage } = useAppStore((s) => ({
    language: s.language,
    toggleLanguage: s.toggleLanguage,
  }));

  return (
    <button
      onClick={toggleLanguage}
      aria-label={language === 'fa' ? 'Switch to English' : 'تغییر به فارسی'}
      className="min-h-[44px] min-w-[44px] flex items-center justify-center
                 rounded-full px-3
                 bg-zinc-100 dark:bg-zinc-800
                 text-xs font-bold tracking-wider
                 text-zinc-700 dark:text-zinc-200
                 hover:bg-zinc-200 dark:hover:bg-zinc-700
                 transition-colors duration-200 cursor-pointer
                 border border-transparent
                 hover:border-zinc-300 dark:hover:border-zinc-600"
    >
      {language === 'fa' ? 'EN' : 'FA'}
    </button>
  );
}
