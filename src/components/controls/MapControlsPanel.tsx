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
            className="fixed top-[3.75rem] left-3 z-40 w-48
                       bg-white/95 dark:bg-zinc-900/95
                       backdrop-blur-xl rounded-2xl
                       shadow-xl shadow-black/25
                       border border-white/50 dark:border-white/10
                       overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 pt-3 pb-2">
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                {dir === 'rtl' ? 'کنترل نقشه' : 'Map Controls'}
              </span>
              <button onClick={closeMapControls} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer">
                <X size={14} />
              </button>
            </div>

            <div className="px-3 pb-3 grid grid-cols-2 gap-1.5">
              <ControlBtn onClick={() => { queueMapCommand('north'); closeMapControls(); }} icon={<Compass size={16} />} label={dir === 'rtl' ? 'شمال' : 'North'} />
              <ControlBtn onClick={() => { queueMapCommand('togglePitch'); closeMapControls(); }} icon={<Mountain size={16} />} label={mapIsPitched ? (dir === 'rtl' ? '۲D' : '2D') : (dir === 'rtl' ? '۳D' : '3D')} />
              <ControlBtn onClick={() => { queueMapCommand('zoomIn'); }} icon={<ZoomIn size={16} />} label={dir === 'rtl' ? 'بزرگ‌نمایی' : 'Zoom In'} />
              <ControlBtn onClick={() => { queueMapCommand('zoomOut'); }} icon={<ZoomOut size={16} />} label={dir === 'rtl' ? 'کوچک‌نمایی' : 'Zoom Out'} />
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
      className="flex items-center gap-2 px-3 py-2.5 rounded-xl
                 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300
                 text-xs font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700
                 transition-colors cursor-pointer"
    >
      <span className="text-sky-500 dark:text-sky-400">{icon}</span>
      {label}
    </button>
  );
}
