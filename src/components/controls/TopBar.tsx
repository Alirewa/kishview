// Developed by @Alirewa — github.com/Alirewa
'use client';
import { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Menu, Map as MapIcon, Search, X, MapPin, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useAppStore } from '@/store/useAppStore';

interface GeoResult {
  place_id: number;
  display_name: string;
  name?: string;
  lat: string;
  lon: string;
  type: string;
}

// Kish Island bounding box: west,south,east,north
const KISH_VIEWBOX = '53.85,26.46,54.10,26.59';

export function TopBar() {
  const { t, dir } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [geoResults, setGeoResults] = useState<GeoResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const {
    openMenu, toggleMapControls,
    isSearchOpen, openSearch, closeSearch,
    searchQuery, setSearchQuery,
    language,
  } = useAppStore((s) => ({
    openMenu:          s.openMenu,
    toggleMapControls: s.toggleMapControls,
    isSearchOpen:      s.isSearchOpen,
    openSearch:        s.openSearch,
    closeSearch:       s.closeSearch,
    searchQuery:       s.searchQuery,
    setSearchQuery:    s.setSearchQuery,
    language:          s.language,
  }));

  // Nominatim geocoding — debounced 500ms
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!searchQuery || searchQuery.trim().length < 2) {
      setGeoResults([]);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      setIsSearching(true);
      try {
        const lang = language === 'fa' ? 'fa,en' : 'en,fa';
        const url =
          `https://nominatim.openstreetmap.org/search` +
          `?q=${encodeURIComponent(searchQuery)}` +
          `&format=json&limit=8&bounded=1&viewbox=${KISH_VIEWBOX}` +
          `&accept-language=${lang}`;
        const res = await fetch(url, { headers: { 'User-Agent': 'KishView/1.0 (kishview.com)' } });
        if (!res.ok) throw new Error('geocode failed');
        const data: GeoResult[] = await res.json();
        setGeoResults(data);
      } catch {
        setGeoResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 500);

    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [searchQuery, language]);

  const handleCloseSearch = useCallback(() => {
    closeSearch();
    setGeoResults([]);
  }, [closeSearch]);

  const handleOpenSearch = () => {
    openSearch();
    setTimeout(() => inputRef.current?.focus(), 80);
  };

  const selectResult = useCallback((result: GeoResult) => {
    const lng = parseFloat(result.lon);
    const lat = parseFloat(result.lat);
    window.dispatchEvent(new CustomEvent('kishview:flyToResult', { detail: { lng, lat } }));
    handleCloseSearch();
  }, [handleCloseSearch]);

  const shortName = (result: GeoResult) =>
    result.name || result.display_name.split(',')[0];

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
          </motion.div>
        ) : (
          <motion.div
            key="search"
            initial={{ opacity: 0, scaleX: 0.9 }}
            animate={{ opacity: 1, scaleX: 1 }}
            exit={{ opacity: 0, scaleX: 0.9 }}
            transition={{ duration: 0.18 }}
            className="pointer-events-auto flex-1 relative"
          >
            {/* Search input bar */}
            <div className="flex items-center gap-2 px-3 h-11
                            rounded-2xl
                            bg-white/95 dark:bg-zinc-900/95
                            backdrop-blur-md
                            shadow-md shadow-black/15
                            border border-white/40 dark:border-white/10">
              {isSearching
                ? <Loader2 size={15} className="text-zinc-400 flex-shrink-0 animate-spin" />
                : <Search size={15} className="text-zinc-400 flex-shrink-0" />}
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={dir === 'rtl' ? 'جستجو روی نقشه...' : 'Search on map...'}
                className="flex-1 bg-transparent text-sm text-zinc-900 dark:text-white
                           placeholder:text-zinc-400 focus:outline-none"
                dir={dir}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-zinc-400 hover:text-zinc-600 flex-shrink-0"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Geocoding results dropdown */}
            {geoResults.length > 0 && (
              <div dir={dir} className="absolute top-full left-0 right-0 mt-2
                              bg-white/98 dark:bg-zinc-900/98
                              backdrop-blur-md rounded-2xl
                              shadow-xl shadow-black/20
                              border border-zinc-100 dark:border-zinc-800
                              overflow-hidden z-50">
                {geoResults.map((result) => (
                  <button
                    key={result.place_id}
                    onClick={() => selectResult(result)}
                    className="w-full flex items-center gap-3 px-4 py-3
                               hover:bg-zinc-50 dark:hover:bg-zinc-800
                               border-b border-zinc-100 dark:border-zinc-800 last:border-0
                               transition-colors cursor-pointer text-start"
                  >
                    <MapPin size={14} className="flex-shrink-0 text-sky-500" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-zinc-900 dark:text-white truncate">
                        {shortName(result)}
                      </p>
                      <p className="text-xs text-zinc-400 truncate mt-0.5">
                        {result.display_name.split(',').slice(0, 3).join('،')}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Action buttons ── */}
      <div className="pointer-events-auto flex items-center gap-2">
        <IconBtn
          onClick={isSearchOpen ? handleCloseSearch : handleOpenSearch}
          label={isSearchOpen ? t.close : 'جستجو'}
        >
          {isSearchOpen ? <X size={18} /> : <Search size={18} />}
        </IconBtn>

        <IconBtn onClick={toggleMapControls} label="تنظیمات نقشه">
          <MapIcon size={18} />
        </IconBtn>

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
