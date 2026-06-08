'use client';
import { Menu } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAppStore } from '@/store/useAppStore';

export function TopBar() {
  const { t } = useLanguage();
  const openMenu = useAppStore((s) => s.openMenu);

  return (
    <header
      className="absolute top-3 left-3 right-3 z-10
                 flex items-center justify-between
                 px-4 h-14
                 rounded-2xl
                 bg-white/80 dark:bg-black/50
                 backdrop-blur-md
                 border border-white/30 dark:border-white/10
                 shadow-lg shadow-black/10"
    >
      {/* Brand */}
      <span className="text-base font-bold text-zinc-900 dark:text-white tracking-tight">
        {t.appName}
      </span>

      {/* Hamburger menu */}
      <button
        onClick={openMenu}
        aria-label={t.menu}
        className="flex items-center justify-center
                   min-h-[44px] min-w-[44px] rounded-xl
                   bg-zinc-100 dark:bg-zinc-800
                   text-zinc-700 dark:text-zinc-200
                   hover:bg-zinc-200 dark:hover:bg-zinc-700
                   transition-colors duration-200 cursor-pointer"
      >
        <Menu className="w-5 h-5" />
      </button>
    </header>
  );
}
