'use client';
import { X } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
} from '@/components/primitives/drawer';
import { BuyTicketButton } from './BuyTicketButton';
import { useAppStore } from '@/store/useAppStore';
import { useLanguage } from '@/context/LanguageContext';

export function PlaceSidebar() {
  const { selectedPlace, isOverlayOpen, clearSelection, language } = useAppStore(
    (s) => ({
      selectedPlace: s.selectedPlace,
      isOverlayOpen: s.isOverlayOpen,
      clearSelection: s.clearSelection,
      language: s.language,
    })
  );
  const { t, dir } = useLanguage();

  return (
    <Drawer
      open={isOverlayOpen}
      onOpenChange={(open) => !open && clearSelection()}
      direction="right"
      // vaul: disable scale-down on background for map apps
      shouldScaleBackground={false}
    >
      <DrawerOverlay />
      <DrawerContent
        dir={dir}
        className="fixed top-0 right-0 bottom-0 z-30
                   w-full max-w-sm
                   bg-white dark:bg-zinc-900
                   shadow-2xl shadow-black/30
                   flex flex-col
                   overflow-y-auto overscroll-contain
                   rounded-l-3xl"
      >
        {/* ── Hero image ── */}
        <div className="relative h-56 flex-shrink-0 bg-zinc-200 dark:bg-zinc-800 rounded-tl-3xl overflow-hidden">
          {selectedPlace?.images[0] && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={selectedPlace.images[0].src}
              alt={selectedPlace.images[0].alt}
              className="w-full h-full object-cover"
            />
          )}
          {/* Gradient for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          {/* Close button — 44×44 touch target */}
          <button
            onClick={clearSelection}
            aria-label={t.close}
            className="absolute top-3 left-3
                       min-h-[44px] min-w-[44px]
                       flex items-center justify-center
                       rounded-full bg-black/60
                       text-white hover:bg-black/80
                       transition-colors duration-200 cursor-pointer"
          >
            <X size={18} />
          </button>

          {/* Category badge */}
          {selectedPlace && (
            <span className="absolute bottom-3 left-3
                             text-[10px] font-semibold uppercase tracking-widest
                             px-2.5 py-1 rounded-full
                             bg-white/20 backdrop-blur-sm text-white border border-white/30">
              {selectedPlace.category.replace('-', ' ')}
            </span>
          )}
        </div>

        {/* ── Body ── */}
        <div className="flex flex-col gap-4 p-5 flex-1">
          {/* Title */}
          <h2 className="text-xl font-bold leading-tight text-zinc-900 dark:text-white">
            {selectedPlace?.name[language]}
          </h2>

          {/* Description */}
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {selectedPlace?.description[language]}
          </p>

          {/* Horizontal image gallery */}
          {(selectedPlace?.images.length ?? 0) > 1 && (
            <div className="flex gap-2 overflow-x-auto py-1 overscroll-contain -mx-1 px-1">
              {selectedPlace?.images.slice(1).map((img, i) => (
                <div
                  key={i}
                  className="relative w-24 h-16 flex-shrink-0 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Guide section */}
          <div className="border-t border-zinc-100 dark:border-zinc-800 pt-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-widest
                           text-zinc-400 dark:text-zinc-500 mb-2">
              {t.guide}
            </h3>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {selectedPlace?.guide[language]}
            </p>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* CTA */}
          {selectedPlace?.ticketUrl && (
            <BuyTicketButton url={selectedPlace.ticketUrl} label={t.buyTicket} />
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
