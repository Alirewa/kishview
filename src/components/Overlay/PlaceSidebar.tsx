'use client';
import { X, MapPin, Ticket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { useLanguage } from '@/context/LanguageContext';
import { CATEGORY_ICONS } from '@/components/Map/mapConfig';

const CATEGORY_LABELS: Record<string, { fa: string; en: string }> = {
  'water-sports': { fa: 'ورزش آبی', en: 'Water Sports' },
  'land-sports':  { fa: 'ورزش زمینی', en: 'Land Sports' },
  restaurant:     { fa: 'رستوران', en: 'Restaurant' },
  cafe:           { fa: 'کافه', en: 'Café' },
  amenity:        { fa: 'جاذبه گردشگری', en: 'Attraction' },
  hotel:          { fa: 'هتل', en: 'Hotel' },
  shopping:       { fa: 'خرید', en: 'Shopping' },
};

export function PlaceSidebar() {
  const { selectedPlace, isOverlayOpen, clearSelection, language } = useAppStore((s) => ({
    selectedPlace: s.selectedPlace,
    isOverlayOpen: s.isOverlayOpen,
    clearSelection: s.clearSelection,
    language: s.language,
  }));
  const { t } = useLanguage();

  const catLabel = selectedPlace
    ? (CATEGORY_LABELS[selectedPlace.category]?.[language] ?? selectedPlace.category)
    : '';

  return (
    <AnimatePresence>
      {isOverlayOpen && selectedPlace && (
        <motion.div
          key={selectedPlace.id}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 360, damping: 38 }}
          className="fixed bottom-3 z-30
                     left-1/2 -translate-x-1/2
                     w-[calc(100%-2rem)] max-w-lg
                     rounded-3xl
                     bg-white dark:bg-zinc-900
                     shadow-2xl shadow-black/40
                     overflow-hidden"
        >
          {/* Drag handle pill */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-zinc-200 dark:bg-zinc-700" />
          </div>

          <div className="flex gap-4 px-4 pb-4">
            {/* Thumbnail */}
            <div className="relative w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
              {selectedPlace.images[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={selectedPlace.images[0].src}
                  alt={selectedPlace.images[0].alt}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={CATEGORY_ICONS[selectedPlace.category] ?? '/markers/amenity.svg'}
                    alt=""
                    className="w-8 h-8 opacity-30"
                  />
                </div>
              )}
            </div>

            {/* Text block */}
            <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  {/* Category badge */}
                  <span className="inline-block mb-1.5 text-[10px] font-semibold uppercase tracking-wider
                                   px-2 py-0.5 rounded-full
                                   bg-sky-100 dark:bg-sky-500/20 text-sky-700 dark:text-sky-300">
                    {catLabel}
                  </span>
                  {/* Name */}
                  <h2 className="text-base font-bold leading-tight text-zinc-900 dark:text-white truncate">
                    {selectedPlace.name[language]}
                  </h2>
                </div>

                {/* Close */}
                <button
                  onClick={clearSelection}
                  aria-label={t.close}
                  className="flex-shrink-0 flex items-center justify-center
                             min-h-[36px] min-w-[36px] -mt-0.5 -mr-1
                             rounded-full bg-zinc-100 dark:bg-zinc-800
                             text-zinc-500 dark:text-zinc-400
                             hover:bg-zinc-200 dark:hover:bg-zinc-700
                             transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Address */}
              {selectedPlace.address && (
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 flex items-center gap-1 mt-1 truncate">
                  <MapPin size={10} className="flex-shrink-0" />
                  {selectedPlace.address[language]}
                </p>
              )}

              {/* Description snippet */}
              <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 mt-1.5
                            line-clamp-2">
                {selectedPlace.description[language]}
              </p>
            </div>
          </div>

          {/* Action row */}
          <div className="px-4 pb-5 flex gap-2">
            {selectedPlace.ticketUrl && (
              <a
                href={selectedPlace.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2
                           flex-1 min-h-[46px]
                           rounded-2xl
                           bg-sky-500 hover:bg-sky-600
                           text-white text-sm font-semibold
                           transition-colors duration-200"
              >
                <Ticket size={16} />
                {t.buyTicket}
              </a>
            )}

            <button
              onClick={clearSelection}
              className="flex items-center justify-center
                         min-h-[46px] px-5
                         rounded-2xl
                         bg-zinc-100 dark:bg-zinc-800
                         text-zinc-700 dark:text-zinc-300
                         text-sm font-medium
                         hover:bg-zinc-200 dark:hover:bg-zinc-700
                         transition-colors duration-200 cursor-pointer"
            >
              {t.close}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
