'use client';
import { Compass, Mountain, ZoomIn, ZoomOut, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { useLanguage } from '@/context/LanguageContext';

export function MapControlsPanel() {
  const { dir } = useLanguage();
  const { isMapControlsOpen, closeMapControls, queueMapCommand, mapIsPitched } = useAppStore((s) => ({
    isMapControlsOpen: s.isMapControlsOpen,
    closeMapControls:  s.closeMapControls,
    queueMapCommand:   s.queueMapCommand,
    mapIsPitched:      s.mapIsPitched,
  }));

  return (
    <AnimatePresence>
      {isMapControlsOpen && (
        <>
          <div className="fixed inset-0 z-30" onClick={closeMapControls} />
          <motion.div
            dir={dir}
            initial={{ opacity: 0, scale: 0.92, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
            className="fixed top-[3.75rem] left-3 z-40 w-60
                       bg-white/95 dark:bg-zinc-900/95
                       backdrop-blur-xl rounded-2xl
                       shadow-2xl shadow-black/25
                       border border-white/60 dark:border-white/10
                       overflow-hidden p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
                {dir === 'rtl' ? 'کنترل نقشه' : 'Map Controls'}
              </span>
              <button
                onClick={closeMapControls}
                className="w-6 h-6 rounded-lg flex items-center justify-center
                           text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100
                           dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <X size={13} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <ControlBtn
                onClick={() => { queueMapCommand('north'); closeMapControls(); }}
                icon={<Compass size={22} />}
                label={dir === 'rtl' ? 'شمال' : 'North'}
              />
              <ControlBtn
                onClick={() => { queueMapCommand('togglePitch'); closeMapControls(); }}
                icon={<Mountain size={22} />}
                label={mapIsPitched ? (dir === 'rtl' ? '۲D' : '2D') : (dir === 'rtl' ? '۳D' : '3D')}
              />
              <ControlBtn
                onClick={() => queueMapCommand('zoomIn')}
                icon={<ZoomIn size={22} />}
                label={dir === 'rtl' ? 'بزرگ‌نمایی' : 'Zoom In'}
              />
              <ControlBtn
                onClick={() => queueMapCommand('zoomOut')}
                icon={<ZoomOut size={22} />}
                label={dir === 'rtl' ? 'کوچک‌نمایی' : 'Zoom Out'}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function ControlBtn({ onClick, icon, label }: { onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 px-3 py-4 rounded-xl
                 bg-zinc-50 dark:bg-zinc-800
                 text-zinc-700 dark:text-zinc-300
                 hover:bg-zinc-100 dark:hover:bg-zinc-700
                 border border-zinc-100 dark:border-zinc-700
                 ring-1 ring-zinc-100 dark:ring-zinc-700
                 transition-colors cursor-pointer group"
    >
      <span className="text-sky-500 dark:text-sky-400 group-hover:scale-110 transition-transform">
        {icon}
      </span>
      <span className="text-[11px] font-semibold">{label}</span>
    </button>
  );
}
