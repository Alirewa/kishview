'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export function ThemeToggle() {
  const { theme, toggleTheme } = useAppStore((s) => ({
    theme: s.theme,
    toggleTheme: s.toggleTheme,
  }));
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative flex items-center min-h-[44px] min-w-[44px]
                 cursor-pointer rounded-full p-0.5
                 bg-zinc-200/80 dark:bg-zinc-700/80
                 transition-colors duration-300"
      style={{ width: 48, justifyContent: isDark ? 'flex-end' : 'flex-start' }}
    >
      <motion.div
        layout
        transition={{ type: 'spring', duration: 0.5, bounce: 0.25 }}
        className="flex items-center justify-center w-6 h-6 rounded-full
                   bg-white dark:bg-zinc-900 shadow-sm"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={isDark ? 'moon' : 'sun'}
            initial={{ opacity: 0, rotate: isDark ? -60 : 60, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: isDark ? 60 : -60, scale: 0.6 }}
            transition={{ duration: 0.25 }}
          >
            {isDark ? (
              <Moon className="w-3.5 h-3.5 text-sky-400" />
            ) : (
              <Sun className="w-3.5 h-3.5 text-orange-500" />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </button>
  );
}
