'use client';
import { MapPin } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import { useLanguage } from '@/context/LanguageContext';

export function TopBar() {
  const { t } = useLanguage();

  return (
    <header
      className="absolute top-3 left-3 right-3 z-10
                 flex items-center justify-between
                 px-4 h-14
                 rounded-2xl
                 bg-white/80 dark:bg-black/40
                 backdrop-blur-md
                 border border-white/30 dark:border-white/10
                 shadow-lg shadow-black/10"
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div
          className="flex items-center justify-center w-8 h-8 rounded-xl
                     bg-sky-500/15 dark:bg-sky-400/15"
        >
          <MapPin className="w-4 h-4 text-sky-600 dark:text-sky-400" />
        </div>
        <span className="text-base font-bold text-zinc-900 dark:text-white tracking-tight">
          {t.appName}
        </span>
      </div>

      {/* Controls — 8px gap enforced between touch targets */}
      <div className="flex items-center gap-2">
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </header>
  );
}
