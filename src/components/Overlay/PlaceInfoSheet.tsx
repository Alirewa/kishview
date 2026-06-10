'use client';
import { Clock, Phone, Globe, Instagram, MapPin, ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { useLanguage } from '@/context/LanguageContext';

export function PlaceInfoSheet() {
  const { selectedPlace, isInfoOpen, closeInfo, language } = useAppStore((s) => ({
    selectedPlace: s.selectedPlace,
    isInfoOpen:    s.isInfoOpen,
    closeInfo:     s.closeInfo,
    language:      s.language,
  }));
  const { t, dir } = useLanguage();

  const BackIcon = dir === 'rtl' ? ChevronRight : ChevronLeft;

  const contact = selectedPlace?.contact;

  return (
    <AnimatePresence>
      {isInfoOpen && selectedPlace && (
        <>
          {/* Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={closeInfo}
          />

          {/* Sheet */}
          <motion.div
            key="info-sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 340, damping: 38 }}
            dir={dir}
            className="fixed z-50
                       bottom-0 left-0 right-0
                       sm:bottom-4 sm:left-1/2 sm:-translate-x-1/2
                       sm:w-[480px]
                       max-h-[85dvh]
                       flex flex-col
                       rounded-t-3xl sm:rounded-3xl
                       bg-white dark:bg-zinc-900
                       shadow-2xl shadow-black/50
                       overflow-hidden
                       pb-safe"
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1 sm:hidden flex-shrink-0">
              <div className="w-10 h-1 rounded-full bg-zinc-200 dark:bg-zinc-700" />
            </div>

            {/* Header */}
            <div className="flex items-center gap-3 px-4 pt-2 pb-3 flex-shrink-0
                            border-b border-zinc-100 dark:border-zinc-800">
              <button
                onClick={closeInfo}
                className="flex items-center justify-center w-9 h-9 rounded-full
                           bg-zinc-100 dark:bg-zinc-800
                           text-zinc-600 dark:text-zinc-300
                           hover:bg-zinc-200 dark:hover:bg-zinc-700
                           active:scale-95 transition-all cursor-pointer flex-shrink-0"
              >
                <BackIcon size={18} />
              </button>
              <div className="min-w-0">
                <p className="text-[10px] text-zinc-400 uppercase tracking-wider">{t.placeInfo}</p>
                <h2 className="text-base font-bold text-zinc-900 dark:text-white truncate">
                  {selectedPlace.name[language]}
                </h2>
              </div>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              {/* Hero image */}
              {selectedPlace.images[0] && (
                <div className="w-full h-44 sm:h-52 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedPlace.images[0].src}
                    alt={selectedPlace.images[0].alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="px-4 py-4 space-y-1">

                {/* Hours */}
                {contact?.hours && (
                  <InfoRow
                    icon={<Clock size={17} className="text-sky-500" />}
                    label={t.hours}
                    value={contact.hours[language]}
                  />
                )}

                {/* Phone */}
                {contact?.phone && (
                  <InfoRow
                    icon={<Phone size={17} className="text-emerald-500" />}
                    label={t.phone}
                    value={
                      <a
                        href={`tel:${contact.phone}`}
                        className="text-sky-600 dark:text-sky-400 hover:underline font-medium"
                        dir="ltr"
                      >
                        {contact.phone}
                      </a>
                    }
                  />
                )}

                {/* Website */}
                {contact?.website && (
                  <InfoRow
                    icon={<Globe size={17} className="text-violet-500" />}
                    label={t.website}
                    value={
                      <a
                        href={`https://${contact.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-600 dark:text-sky-400 hover:underline font-medium"
                        dir="ltr"
                      >
                        {contact.website}
                      </a>
                    }
                  />
                )}

                {/* Instagram */}
                {contact?.instagram && (
                  <InfoRow
                    icon={<Instagram size={17} className="text-pink-500" />}
                    label={t.instagram}
                    value={
                      <a
                        href={`https://instagram.com/${contact.instagram.replace('@','')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-600 dark:text-sky-400 hover:underline font-medium"
                        dir="ltr"
                      >
                        {contact.instagram}
                      </a>
                    }
                  />
                )}

                {/* Address */}
                {selectedPlace.address && (
                  <InfoRow
                    icon={<MapPin size={17} className="text-rose-500" />}
                    label={t.address}
                    value={selectedPlace.address[language]}
                  />
                )}

                {/* Divider */}
                <div className="pt-2">
                  <div className="h-px bg-zinc-100 dark:bg-zinc-800" />
                </div>

                {/* Full description */}
                <div className="pt-2">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText size={15} className="text-zinc-400" />
                    <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                      {t.guide}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {selectedPlace.description[language]}
                  </p>
                  <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-500 mt-2">
                    {selectedPlace.guide[language]}
                  </p>
                </div>

                {/* Ticket link */}
                {selectedPlace.ticketUrl && (
                  <div className="pt-3 pb-1">
                    <a
                      href={selectedPlace.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2
                                 w-full min-h-[48px] rounded-2xl
                                 bg-sky-500 hover:bg-sky-600 active:scale-[0.98]
                                 text-white text-sm font-semibold
                                 transition-all duration-150"
                    >
                      {t.buyTicket}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 py-2.5
                    border-b border-zinc-50 dark:border-zinc-800/60 last:border-0">
      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center
                      rounded-xl bg-zinc-50 dark:bg-zinc-800">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] text-zinc-400 uppercase tracking-wider mb-0.5">{label}</p>
        <div className="text-sm text-zinc-800 dark:text-zinc-200 leading-snug">{value}</div>
      </div>
    </div>
  );
}
