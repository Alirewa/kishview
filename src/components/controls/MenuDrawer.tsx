'use client';
import Link from 'next/link';
import {
  X, Globe, Moon, Sun, MapPin, Ticket, Phone,
  Satellite, Map as MapIcon, ListChecks, PlusCircle, Navigation,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { useLanguage } from '@/context/LanguageContext';

export function MenuDrawer() {
  const { t, dir } = useLanguage();
  const {
    isMenuOpen, closeMenu,
    theme, toggleTheme,
    language, toggleLanguage,
    openAddPlaceModal,
    useSatellite, toggleSatellite,
  } = useAppStore((s) => ({
    isMenuOpen:        s.isMenuOpen,
    closeMenu:         s.closeMenu,
    theme:             s.theme,
    toggleTheme:       s.toggleTheme,
    language:          s.language,
    toggleLanguage:    s.toggleLanguage,
    openAddPlaceModal: s.openAddPlaceModal,
    useSatellite:      s.useSatellite,
    toggleSatellite:   s.toggleSatellite,
  }));

  const isDark = theme === 'dark';
  const isFA = language === 'fa';

  function triggerGeolocate() {
    window.dispatchEvent(new Event('kishview:geolocate'));
    closeMenu();
  }

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

          {/* Panel */}
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
                <p className="font-bold text-zinc-900 dark:text-white text-base">
                  {isFA ? 'کیش ویو' : 'KishView'}
                </p>
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

            {/* Scrollable items */}
            <div className="flex-1 overflow-y-auto py-3 px-3 flex flex-col gap-1">

              {/* ── Section: Map & Navigation ── */}
              <SectionLabel label={isFA ? 'نقشه و ناوبری' : 'Map & Navigation'} />

              <LinkRow
                icon={<MapIcon size={18} />}
                label={isFA ? 'نقشه کیش' : 'Kish Map'}
                href="/map"
                onClick={closeMenu}
              />

              <MenuRow
                icon={<Navigation size={18} />}
                label={isFA ? 'موقعیت من' : 'My Location'}
                onClick={triggerGeolocate}
              />

              <MenuRow
                icon={<Satellite size={18} />}
                label={isFA ? 'نوع نقشه' : 'Map Type'}
                onClick={() => { toggleSatellite(); closeMenu(); }}
                rightLabel={useSatellite ? (isFA ? 'ماهواره‌ای' : 'Satellite') : (isFA ? 'معمولی' : 'Normal')}
                active={useSatellite}
              />

              <div className="my-1.5 border-t border-zinc-100 dark:border-zinc-800" />

              {/* ── Section: Services ── */}
              <SectionLabel label={isFA ? 'خدمات' : 'Services'} />

              <LinkRow
                icon={<Ticket size={18} />}
                label={isFA ? 'خرید بلیت' : 'Buy Tickets'}
                href="/tickets"
                onClick={closeMenu}
              />

              <MenuRow
                icon={<PlusCircle size={18} />}
                label={isFA ? 'افزودن مکان' : 'Add Place'}
                onClick={() => { openAddPlaceModal(); closeMenu(); }}
              />

              <LinkRow
                icon={<ListChecks size={18} />}
                label={isFA ? 'مکان‌های در انتظار' : 'Pending Places'}
                href="/pending-places"
                onClick={closeMenu}
              />

              <LinkRow
                icon={<Phone size={18} />}
                label={isFA ? 'تماس با پشتیبانی' : 'Contact Support'}
                href="/contact"
                onClick={closeMenu}
              />

              <div className="my-1.5 border-t border-zinc-100 dark:border-zinc-800" />

              {/* ── Section: Settings ── */}
              <SectionLabel label={isFA ? 'تنظیمات' : 'Settings'} />

              <MenuRow
                icon={<Globe size={18} />}
                label={isFA ? 'Switch to English' : 'تغییر به فارسی'}
                onClick={() => { toggleLanguage(); closeMenu(); }}
                rightLabel={isFA ? 'EN' : 'FA'}
              />

              <MenuRow
                icon={isDark ? <Moon size={18} /> : <Sun size={18} />}
                label={isDark ? (isFA ? 'تم روشن' : 'Light Mode') : (isFA ? 'تم تاریک' : 'Dark Mode')}
                onClick={() => { toggleTheme(); closeMenu(); }}
                rightLabel={isDark ? '☀' : '🌙'}
              />
            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-zinc-100 dark:border-zinc-800">
              <p className="text-[11px] text-zinc-400 dark:text-zinc-600 text-center">
                © ۱۴۰۵ کیش ویو — KishView
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <p className="px-4 pt-1 pb-0.5 text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
      {label}
    </p>
  );
}

function MenuRow({
  icon, label, onClick, rightLabel, active,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  rightLabel?: string;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        'flex items-center gap-3 w-full px-4 py-3 rounded-xl text-start',
        'transition-colors duration-150 cursor-pointer',
        active
          ? 'bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300'
          : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800',
      ].join(' ')}
    >
      <span className={active ? 'text-sky-500' : 'text-zinc-500 dark:text-zinc-400'}>
        {icon}
      </span>
      <span className="text-sm font-medium flex-1">{label}</span>
      {rightLabel && (
        <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500">{rightLabel}</span>
      )}
    </button>
  );
}

function LinkRow({
  icon, label, href, onClick,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-3 rounded-xl
                 text-zinc-700 dark:text-zinc-300
                 hover:bg-zinc-100 dark:hover:bg-zinc-800
                 transition-colors duration-150"
    >
      <span className="text-zinc-500 dark:text-zinc-400 flex-shrink-0">{icon}</span>
      <span className="text-sm font-medium flex-1">{label}</span>
    </Link>
  );
}
