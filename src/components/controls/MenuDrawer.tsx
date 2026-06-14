'use client';
import Link from 'next/link';
import {
  X, Globe, Ticket, Phone,
  Map as MapIcon, ListChecks, PlusCircle, Navigation,
  Sun, Layers, Satellite,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { useLanguage } from '@/context/LanguageContext';
import type { MapStyle } from '@/store/useAppStore';

export function MenuDrawer() {
  const { t, dir } = useLanguage();
  const isMenuOpen       = useAppStore((s) => s.isMenuOpen);
  const closeMenu        = useAppStore((s) => s.closeMenu);
  const language         = useAppStore((s) => s.language);
  const toggleLanguage   = useAppStore((s) => s.toggleLanguage);
  const openAddPlaceModal = useAppStore((s) => s.openAddPlaceModal);
  const mapStyle         = useAppStore((s) => s.mapStyle);
  const setMapStyle      = useAppStore((s) => s.setMapStyle);

  const islandTour    = useAppStore((s) => s.islandTour);
  const setIslandTour = useAppStore((s) => s.setIslandTour);
  const isFA = language === 'fa';

  const styleOptions: { id: MapStyle; fa: string; en: string; icon: React.ReactNode }[] = [
    { id: 'light',     fa: 'معمولی',     en: 'Light',     icon: <Sun size={14} /> },
    { id: 'dark',      fa: 'دارک',       en: 'Dark',      icon: <Layers size={14} /> },
    { id: 'satellite', fa: 'ماهواره',    en: 'Satellite', icon: <Satellite size={14} /> },
  ];

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
            initial={{ x: dir === 'rtl' ? '100%' : '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: dir === 'rtl' ? '100%' : '-100%' }}
            transition={{ type: 'spring', stiffness: 340, damping: 36 }}
            className="fixed top-0 bottom-0 z-50 w-72 flex flex-col bg-white shadow-2xl shadow-black/20"
            style={{ right: dir === 'rtl' ? 0 : 'auto', left: dir === 'ltr' ? 0 : 'auto' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 h-16 border-b border-zinc-100">
              <div>
                <p className="font-bold text-zinc-900 text-base">
                  {isFA ? 'کیش ویو' : 'KishView'}
                </p>
                <p className="text-[11px] text-zinc-400">kishview.com</p>
              </div>
              <button
                onClick={closeMenu}
                aria-label={t.close}
                className="flex items-center justify-center min-h-[44px] min-w-[44px] rounded-xl
                           text-zinc-500 hover:bg-zinc-100 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable items */}
            <div className="flex-1 overflow-y-auto py-3 px-3 flex flex-col gap-1">

              {/* ── Map & Navigation ── */}
              <SectionLabel label={isFA ? 'نقشه و ناوبری' : 'Map & Navigation'} />

              <LinkRow icon={<MapIcon size={18} />} label={isFA ? 'نقشه کیش' : 'Kish Map'} href="/map" onClick={closeMenu} />

              <MenuRow icon={<Navigation size={18} />} label={isFA ? 'موقعیت من' : 'My Location'} onClick={triggerGeolocate} />

              {/* Island tour — full width CTA */}
              <div className="px-2 py-1">
                <button
                  onClick={() => { setIslandTour(!islandTour); closeMenu(); }}
                  className={[
                    'w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl',
                    'text-sm font-bold transition-all cursor-pointer',
                    islandTour
                      ? 'bg-zinc-200 text-zinc-600 hover:bg-zinc-300'
                      : 'bg-gradient-to-l from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 text-white shadow-md shadow-sky-200',
                  ].join(' ')}
                >
                  <Globe size={16} />
                  {isFA
                    ? (islandTour ? 'توقف جزیره‌گردی' : 'جزیره‌گردی سینمایی')
                    : (islandTour ? 'Stop Island Tour' : 'Cinematic Island Tour')}
                </button>
              </div>

              {/* Map style 3-selector */}
              <div className="px-4 py-2">
                <p className="text-xs text-zinc-500 mb-2 font-medium">{isFA ? 'نوع نقشه' : 'Map Style'}</p>
                <div className="flex gap-1.5">
                  {styleOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => { setMapStyle(opt.id); closeMenu(); }}
                      className={[
                        'flex-1 flex flex-col items-center gap-1 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer',
                        mapStyle === opt.id
                          ? 'border-sky-500 bg-sky-50 text-sky-700'
                          : 'border-zinc-200 text-zinc-500 hover:border-zinc-300 hover:bg-zinc-50',
                      ].join(' ')}
                    >
                      <span className={mapStyle === opt.id ? 'text-sky-500' : 'text-zinc-400'}>{opt.icon}</span>
                      {isFA ? opt.fa : opt.en}
                    </button>
                  ))}
                </div>
              </div>

              <div className="my-1.5 border-t border-zinc-100" />

              {/* ── Services ── */}
              <SectionLabel label={isFA ? 'خدمات' : 'Services'} />

              <LinkRow icon={<Ticket size={18} />} label={isFA ? 'خرید بلیت' : 'Buy Tickets'} href="/tickets" onClick={closeMenu} />

              <MenuRow
                icon={<PlusCircle size={18} />}
                label={isFA ? 'افزودن مکان' : 'Add Place'}
                onClick={() => { openAddPlaceModal(); closeMenu(); }}
              />

              <LinkRow icon={<ListChecks size={18} />} label={isFA ? 'مکان‌های در انتظار' : 'Pending Places'} href="/pending-places" onClick={closeMenu} />

              <LinkRow icon={<Phone size={18} />} label={isFA ? 'تماس با پشتیبانی' : 'Contact Support'} href="/contact" onClick={closeMenu} />

              <div className="my-1.5 border-t border-zinc-100" />

              {/* ── Settings ── */}
              <SectionLabel label={isFA ? 'تنظیمات' : 'Settings'} />

              <MenuRow
                icon={<Globe size={18} />}
                label={isFA ? 'Switch to English' : 'تغییر به فارسی'}
                onClick={() => { toggleLanguage(); closeMenu(); }}
                rightLabel={isFA ? 'EN' : 'FA'}
              />
            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-zinc-100">
              <p className="text-[11px] text-zinc-400 text-center">
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
    <p className="px-4 pt-1 pb-0.5 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
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
          ? 'bg-sky-50 text-sky-700'
          : 'text-zinc-700 hover:bg-zinc-100',
      ].join(' ')}
    >
      <span className={active ? 'text-sky-500' : 'text-zinc-500'}>{icon}</span>
      <span className="text-sm font-medium flex-1">{label}</span>
      {rightLabel && <span className="text-xs font-bold text-zinc-400">{rightLabel}</span>}
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
                 text-zinc-700 hover:bg-zinc-100 transition-colors duration-150"
    >
      <span className="text-zinc-500 flex-shrink-0">{icon}</span>
      <span className="text-sm font-medium flex-1">{label}</span>
    </Link>
  );
}
