'use client';
import { Compass, Mountain, ZoomIn, ZoomOut, X, Sun, Moon, Satellite } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { useLanguage } from '@/context/LanguageContext';

export function MapControlsPanel() {
  const { dir } = useLanguage();
  const {
    isMapControlsOpen, closeMapControls,
    queueMapCommand,
    mapStyle, setMapStyle,
    mapIsPitched,
  } = useAppStore((s) => ({
    isMapControlsOpen: s.isMapControlsOpen,
    closeMapControls:  s.closeMapControls,
    queueMapCommand:   s.queueMapCommand,
    mapStyle:          s.mapStyle,
    setMapStyle:       s.setMapStyle,
    mapIsPitched:      s.mapIsPitched,
  }));

  return (
    <AnimatePresence>
      {isMapControlsOpen && (
        <>
          {/* Invisible backdrop */}
          <div
            className="fixed inset-0 z-30"
            onClick={closeMapControls}
          />

          <motion.div
            dir={dir}
            initial={{ opacity: 0, scale: 0.92, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
            className="fixed top-[3.75rem] z-40
                       left-3
                       w-56
                       bg-white/95 dark:bg-zinc-900/95
                       backdrop-blur-xl
                       rounded-2xl
                       shadow-xl shadow-black/25
                       border border-white/50 dark:border-white/10
                       overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 pt-3 pb-2">
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                {dir === 'rtl' ? 'تنظیمات نقشه' : 'Map Controls'}
              </span>
              <button
                onClick={closeMapControls}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>

            {/* Style row */}
            <div className="px-3 pb-2">
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-1.5 px-1">
                {dir === 'rtl' ? 'استایل' : 'Style'}
              </p>
              <div className="flex gap-1.5">
                <StyleBtn
                  active={mapStyle === 'dark'}
                  onClick={() => { setMapStyle('dark'); closeMapControls(); }}
                  icon={<Moon size={13} />}
                  label={dir === 'rtl' ? 'تاریک' : 'Dark'}
                />
                <StyleBtn
                  active={mapStyle === 'light'}
                  onClick={() => { setMapStyle('light'); closeMapControls(); }}
                  icon={<Sun size={13} />}
                  label={dir === 'rtl' ? 'روشن' : 'Light'}
                />
                <StyleBtn
                  active={mapStyle === 'satellite'}
                  onClick={() => { setMapStyle('satellite'); closeMapControls(); }}
                  icon={<Satellite size={13} />}
                  label={dir === 'rtl' ? 'ماهواره' : 'Satellite'}
                />
              </div>
            </div>

            <div className="mx-3 border-t border-zinc-100 dark:border-zinc-800 my-1" />

            {/* Controls grid */}
            <div className="px-3 pb-3 grid grid-cols-2 gap-1.5">
              <ControlBtn
                onClick={() => { queueMapCommand('north'); closeMapControls(); }}
                icon={<Compass size={16} />}
                label={dir === 'rtl' ? 'جهت شمال' : 'North'}
              />
              <ControlBtn
                onClick={() => { queueMapCommand('togglePitch'); closeMapControls(); }}
                icon={<Mountain size={16} />}
                label={mapIsPitched ? (dir === 'rtl' ? '۲D تخت' : 'Flat 2D') : (dir === 'rtl' ? '۳D' : '3D')}
              />
              <ControlBtn
                onClick={() => { queueMapCommand('zoomIn'); }}
                icon={<ZoomIn size={16} />}
                label={dir === 'rtl' ? 'بزرگ‌نمایی' : 'Zoom In'}
              />
              <ControlBtn
                onClick={() => { queueMapCommand('zoomOut'); }}
                icon={<ZoomOut size={16} />}
                label={dir === 'rtl' ? 'کوچک‌نمایی' : 'Zoom Out'}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function StyleBtn({ active, onClick, icon, label }: {
  active: boolean; onClick: () => void; icon: React.ReactNode; label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        'flex-1 flex flex-col items-center gap-1 py-2 rounded-xl text-[10px] font-medium cursor-pointer transition-colors',
        active
          ? 'bg-sky-500 text-white'
          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700',
      ].join(' ')}
    >
      {icon}
      {label}
    </button>
  );
}

function ControlBtn({ onClick, icon, label }: {
  onClick: () => void; icon: React.ReactNode; label: string;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-2.5 rounded-xl
                 bg-zinc-100 dark:bg-zinc-800
                 text-zinc-700 dark:text-zinc-300
                 text-xs font-medium
                 hover:bg-zinc-200 dark:hover:bg-zinc-700
                 transition-colors cursor-pointer"
    >
      <span className="text-sky-500 dark:text-sky-400">{icon}</span>
      {label}
    </button>
  );
}
