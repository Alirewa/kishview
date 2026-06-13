// Developed by @Alirewa — github.com/Alirewa
'use client';
import { useRef } from 'react';
import Link from 'next/link';
import { Menu, Map as MapIcon, Search, X, Waves, Building2, ShoppingBag, Coffee, Landmark, Gamepad2, type LucideIcon } from 'lucide-react';

const CHIP_ICONS: Record<string, LucideIcon> = { Map: MapIcon, Waves, Building2, ShoppingBag, Coffee, Landmark, Gamepad2 };
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useAppStore } from '@/store/useAppStore';
import { FILTER_CHIPS } from '@/data/filterChips';

export function TopBar() {
  const { t, dir } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    openMenu, toggleMapControls,
    isSearchOpen, openSearch, closeSearch,
    searchQuery, setSearchQuery,
    selectedCategory, setCategory, language,
  } = useAppStore((s) => ({
    openMenu:          s.openMenu,
    toggleMapControls: s.toggleMapControls,
    isSearchOpen:      s.isSearchOpen,
    openSearch:        s.openSearch,
    closeSearch:       s.closeSearch,
    searchQuery:       s.searchQuery,
    setSearchQuery:    s.setSearchQuery,
    selectedCategory:  s.selectedCategory,
    setCategory:       s.setCategory,
    language:          s.language,
  }));

  const handleOpenSearch = () => {
    openSearch();
    setTimeout(() => inputRef.current?.focus(), 80);
  };

  return (
    <header
      dir={dir}
      className="absolute top-3 left-3 right-3 z-20
                 flex items-center justify-between gap-2
                 pointer-events-none"
    >
      {/* ── Brand + desktop filter chips ── */}
      <AnimatePresence mode="wait">
        {!isSearchOpen ? (
          <motion.div
            key="brand"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.18 }}
            className="pointer-events-auto flex items-center gap-2"
          >
            {/* Logo pill */}
            <div className="rounded-2xl
                            bg-white/90 dark:bg-zinc-900/90
                            backdrop-blur-md
                            shadow-md shadow-black/15
                            border border-white/40 dark:border-white/10">
              <Link
                href="/"
                className="px-4 h-11 flex items-center cursor-pointer"
              >
                <span className="text-sm font-bold text-zinc-900 dark:text-white tracking-tight">
                  {t.appName}
                </span>
              </Link>
            </div>

            {/* Desktop-only chip bar — hidden on mobile */}
            <div className="hidden sm:flex items-center gap-1.5">
              {FILTER_CHIPS.map((chip) => {
                const active = selectedCategory === chip.id;
                return (
                  <button
                    key={chip.id}
                    onClick={() => setCategory(chip.id)}
                    className={[
                      'flex items-center gap-1 px-3 h-9 rounded-full text-xs font-semibold',
                      'transition-all duration-200 cursor-pointer shadow-sm shadow-black/10',
                      active
                        ? 'bg-sky-500 text-white border border-sky-400 scale-105'
                        : 'bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md text-zinc-700 dark:text-zinc-200 border border-white/40 dark:border-white/10 hover:bg-white dark:hover:bg-zinc-800',
                    ].join(' ')}
                  >
                    {(() => { const Icon = CHIP_ICONS[chip.iconName]; return Icon ? <Icon className="w-3.5 h-3.5 flex-shrink-0" /> : null; })()}
                    <span>{language === 'fa' ? chip.fa : chip.en}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="search"
            initial={{ opacity: 0, scaleX: 0.9 }}
            animate={{ opacity: 1, scaleX: 1 }}
            exit={{ opacity: 0, scaleX: 0.9 }}
            transition={{ duration: 0.18 }}
            className="pointer-events-auto flex-1
                       flex items-center gap-2 px-3 h-11
                       rounded-2xl
                       bg-white/95 dark:bg-zinc-900/95
                       backdrop-blur-md
                       shadow-md shadow-black/15
                       border border-white/40 dark:border-white/10"
          >
            <Search size={15} className="text-zinc-400 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={dir === 'rtl' ? 'جستجوی مکان...' : 'Search places...'}
              className="flex-1 bg-transparent text-sm text-zinc-900 dark:text-white
                         placeholder:text-zinc-400 focus:outline-none"
              dir={dir}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Action buttons ── */}
      <div className="pointer-events-auto flex items-center gap-2">
        {/* Search toggle */}
        <IconBtn
          onClick={isSearchOpen ? closeSearch : handleOpenSearch}
          label={isSearchOpen ? t.close : 'جستجو'}
        >
          {isSearchOpen ? <X size={18} /> : <Search size={18} />}
        </IconBtn>

        {/* Map controls */}
        <IconBtn onClick={toggleMapControls} label="تنظیمات نقشه">
          <MapIcon size={18} />
        </IconBtn>

        {/* Hamburger */}
        <IconBtn onClick={openMenu} label={t.menu}>
          <Menu size={18} />
        </IconBtn>
      </div>
    </header>
  );
}

function IconBtn({
  onClick, label, children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="flex items-center justify-center
                 min-h-[44px] min-w-[44px] rounded-2xl
                 bg-white/90 dark:bg-zinc-900/90
                 backdrop-blur-md
                 text-zinc-700 dark:text-zinc-200
                 shadow-md shadow-black/15
                 border border-white/40 dark:border-white/10
                 hover:bg-white dark:hover:bg-zinc-800
                 transition-colors duration-150 cursor-pointer"
    >
      {children}
    </button>
  );
}
