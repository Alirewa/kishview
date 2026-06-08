'use client';
import { X, Globe, Moon, Sun, MapPin, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { useLanguage } from '@/context/LanguageContext';

export function MenuDrawer() {
  const { t, dir } = useLanguage();
  const { isMenuOpen, closeMenu, theme, toggleTheme, language, toggleLanguage, openAddPlaceModal } =
    useAppStore((s) => ({
      isMenuOpen: s.isMenuOpen,
      closeMenu: s.closeMenu,
      theme: s.theme,
      toggleTheme: s.toggleTheme,
      language: s.language,
      toggleLanguage: s.toggleLanguage,
      openAddPlaceModal: s.openAddPlaceModal,
    }));

  const isDark = theme === 'dark';

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={closeMenu}
          />

          {/* Panel — slides in from the right (consistent regardless of RTL) */}
          <motion.div
            key="panel"
            dir={dir}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 340, damping: 36 }}
            className="fixed top-0 right-0 bottom-0 z-50
                       w-72 flex flex-col
                       bg-white dark:bg-zinc-900
                       shadow-2xl shadow-black/30"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 h-16 border-b border-zinc-100 dark:border-zinc-800">
              <div>
                <p className="font-bold text-zinc-900 dark:text-white text-base">{t.appName}</p>
                <p className="text-[11px] text-zinc-400">kishview.com</p>
              </div>
              <button
                onClick={closeMenu}
                aria-label={t.close}
                className="flex items-center justify-center min-h-[44px] min-w-[44px]
                           rounded-xl text-zinc-500 dark:text-zinc-400
                           hover:bg-zinc-100 dark:hover:bg-zinc-800
                           transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Menu items */}
            <div className="flex-1 overflow-y-auto py-3 px-3 flex flex-col gap-1">

              {/* Language row */}
              <MenuRow
                icon={<Globe size={18} />}
                label={language === 'fa' ? 'Switch to English' : 'تغییر به فارسی'}
                onClick={() => { toggleLanguage(); closeMenu(); }}
                rightLabel={language === 'fa' ? 'EN' : 'FA'}
              />

              {/* Theme row */}
              <MenuRow
                icon={isDark ? <Moon size={18} /> : <Sun size={18} />}
                label={isDark ? t.lightMode : t.darkMode}
                onClick={() => { toggleTheme(); closeMenu(); }}
                rightLabel={isDark ? '☀' : '🌙'}
              />

              <div className="my-2 border-t border-zinc-100 dark:border-zinc-800" />

              {/* Add place */}
              <MenuRow
                icon={<MapPin size={18} />}
                label={t.addPlace}
                onClick={() => { openAddPlaceModal(); closeMenu(); }}
              />

              {/* Website link */}
              <a
                href="https://kishview.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-xl
                           text-zinc-700 dark:text-zinc-300
                           hover:bg-zinc-100 dark:hover:bg-zinc-800
                           transition-colors duration-150"
                onClick={closeMenu}
              >
                <span className="text-zinc-500 dark:text-zinc-400 flex-shrink-0">
                  <ExternalLink size={18} />
                </span>
                <span className="text-sm font-medium flex-1">kishview.com</span>
              </a>
            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-zinc-100 dark:border-zinc-800">
              <p className="text-[11px] text-zinc-400 dark:text-zinc-600 text-center">
                © 2025 KishView
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function MenuRow({
  icon,
  label,
  onClick,
  rightLabel,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  rightLabel?: string;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-start
                 text-zinc-700 dark:text-zinc-300
                 hover:bg-zinc-100 dark:hover:bg-zinc-800
                 transition-colors duration-150 cursor-pointer"
    >
      <span className="text-zinc-500 dark:text-zinc-400 flex-shrink-0">{icon}</span>
      <span className="text-sm font-medium flex-1">{label}</span>
      {rightLabel && (
        <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500">{rightLabel}</span>
      )}
    </button>
  );
}
