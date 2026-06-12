'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, MapPin, Ticket, Navigation, Info, Loader2, AlertTriangle, Clock, Route, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import type { RouteGeometry, RouteInfo } from '@/store/useAppStore';
import { useLanguage } from '@/context/LanguageContext';
import { CATEGORY_ICONS } from '@/components/Map/mapConfig';
import { assetUrl } from '@/lib/assetUrl';
import { haversineKm, fmtDistance, estDriveMin } from '@/lib/distance';

const KISH_LAT = [26.44, 26.67] as const;
const KISH_LNG = [53.82, 54.10] as const;

function isInKish(lat: number, lng: number) {
  return lat >= KISH_LAT[0] && lat <= KISH_LAT[1]
      && lng >= KISH_LNG[0] && lng <= KISH_LNG[1];
}

function fmtDist(m: number, fa: boolean) {
  if (m < 1000) return fa ? `${Math.round(m)} متر` : `${Math.round(m)} m`;
  return fa ? `${(m / 1000).toFixed(1)} کیلومتر` : `${(m / 1000).toFixed(1)} km`;
}
function fmtTime(s: number, fa: boolean) {
  const m = Math.round(s / 60);
  if (m < 60) return fa ? `${m} دقیقه` : `${m} min`;
  const h = Math.floor(m / 60), rm = m % 60;
  return fa ? `${h} ساعت${rm ? ` و ${rm} دقیقه` : ''}` : `${h}h ${rm}m`;
}

const CATEGORY_LABELS: Record<string, { fa: string; en: string }> = {
  'water-sports': { fa: 'ورزش آبی',      en: 'Water Sports' },
  'land-sports':  { fa: 'ورزش زمینی',    en: 'Land Sports'  },
  restaurant:     { fa: 'رستوران',        en: 'Restaurant'   },
  cafe:           { fa: 'کافه',           en: 'Café'         },
  amenity:        { fa: 'جاذبه گردشگری', en: 'Attraction'   },
  hotel:          { fa: 'هتل',            en: 'Hotel'        },
  shopping:       { fa: 'خرید',           en: 'Shopping'     },
};

type NavState = 'idle' | 'loading' | 'routed' | 'error';

async function fetchRoute(
  fromLng: number, fromLat: number,
  toLng: number, toLat: number,
): Promise<{ geometry: RouteGeometry; info: RouteInfo } | null> {
  const url = `https://router.project-osrm.org/route/v1/driving/${fromLng},${fromLat};${toLng},${toLat}?overview=full&geometries=geojson&alternatives=true`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  if (data.code !== 'Ok' || !data.routes?.length) return null;

  const features = data.routes.map((r: { geometry: { type: 'LineString'; coordinates: number[][] }; distance: number; duration: number }, i: number) => ({
    type: 'Feature' as const,
    geometry: r.geometry,
    properties: { index: i },
  }));

  return {
    geometry: { type: 'FeatureCollection', features },
    info: {
      distance: data.routes[0].distance,
      duration: data.routes[0].duration,
      alternatives: data.routes.length - 1,
    },
  };
}

export function PlaceSidebar() {
  const { selectedPlace, isOverlayOpen, clearSelection, openInfo, language, setRoute, clearRoute, routeInfo, userPosition } = useAppStore((s) => ({
    selectedPlace:  s.selectedPlace,
    isOverlayOpen:  s.isOverlayOpen,
    clearSelection: s.clearSelection,
    openInfo:       s.openInfo,
    language:       s.language,
    setRoute:       s.setRoute,
    clearRoute:     s.clearRoute,
    routeInfo:      s.routeInfo,
    userPosition:   s.userPosition,
  }));
  const { t } = useLanguage();
  const isFA = language === 'fa';

  const [navState, setNavState] = useState<NavState>('idle');
  const [navMsg,   setNavMsg]   = useState('');

  useEffect(() => { setNavState('idle'); setNavMsg(''); }, [selectedPlace]);

  const catLabel = selectedPlace
    ? (CATEGORY_LABELS[selectedPlace.category]?.[language] ?? selectedPlace.category)
    : '';

  const handleNavigate = () => {
    if (!selectedPlace) return;
    if (navState === 'routed') {
      clearRoute();
      setNavState('idle');
      return;
    }
    setNavState('loading');
    setNavMsg('');

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const { latitude, longitude } = coords;
        if (!isInKish(latitude, longitude)) {
          setNavState('error');
          setNavMsg(isFA ? 'شما در محدوده جزیره کیش نیستید. مسیریابی فقط داخل جزیره کار می‌کند.' : 'You are not on Kish Island. Routing only works within the island.');
          return;
        }
        const [dLng, dLat] = selectedPlace.coordinates;
        try {
          const result = await fetchRoute(longitude, latitude, dLng, dLat);
          if (!result) throw new Error('no route');
          setRoute(result.geometry, result.info);
          setNavState('routed');
        } catch {
          setNavState('error');
          setNavMsg(isFA ? 'خطا در دریافت مسیر. لطفاً دوباره تلاش کنید.' : 'Failed to fetch route. Please try again.');
        }
      },
      () => {
        setNavState('error');
        setNavMsg(isFA ? 'دسترسی به موقعیت مکانی رد شد.' : 'Location access denied.');
      },
      { timeout: 10000, maximumAge: 30000 },
    );
  };

  return (
    <AnimatePresence>
      {isOverlayOpen && selectedPlace && (
        <motion.div
          key={selectedPlace.id}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 360, damping: 38 }}
          className="fixed z-30
                     bottom-0 left-0 right-0
                     sm:bottom-4 sm:left-1/2 sm:-translate-x-1/2
                     sm:w-[480px]
                     rounded-t-3xl sm:rounded-3xl
                     bg-white dark:bg-zinc-900
                     shadow-2xl shadow-black/40
                     overflow-hidden
                     pb-safe"
        >
          {/* Drag handle */}
          <div className="flex justify-center pt-3 pb-1 sm:hidden">
            <div className="w-10 h-1 rounded-full bg-zinc-200 dark:bg-zinc-700" />
          </div>

          {/* Main content row */}
          <div className="flex gap-3 px-4 pt-3 pb-3">
            {/* Thumbnail */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
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
                  <img src={assetUrl(CATEGORY_ICONS[selectedPlace.category] ?? '/markers/amenity.svg')} alt="" className="w-8 h-8 opacity-30" />
                </div>
              )}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <span className="inline-block mb-1 text-[10px] font-semibold uppercase tracking-wider
                                   px-2 py-0.5 rounded-full
                                   bg-sky-100 dark:bg-sky-500/20 text-sky-700 dark:text-sky-300">
                    {catLabel}
                  </span>
                  <h2 className="text-sm sm:text-base font-bold leading-tight text-zinc-900 dark:text-white line-clamp-1">
                    {selectedPlace.name[language]}
                  </h2>
                </div>
                <button
                  onClick={clearSelection}
                  aria-label={t.close}
                  className="flex-shrink-0 flex items-center justify-center
                             w-8 h-8 -mt-0.5 -mr-0.5
                             rounded-full bg-zinc-100 dark:bg-zinc-800
                             text-zinc-500 dark:text-zinc-400
                             hover:bg-zinc-200 dark:hover:bg-zinc-700
                             active:scale-95 transition-all cursor-pointer"
                >
                  <X size={15} />
                </button>
              </div>

              {selectedPlace.address && (
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 flex items-start gap-1 mt-1">
                  <MapPin size={10} className="flex-shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{selectedPlace.address[language]}</span>
                </p>
              )}

              <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 mt-1 line-clamp-2">
                {selectedPlace.description[language]}
              </p>

              {/* Distance from user */}
              {userPosition && (() => {
                const km = haversineKm(userPosition, selectedPlace.coordinates as [number, number]);
                const min = estDriveMin(km);
                return (
                  <p className="text-[11px] text-sky-600 dark:text-sky-400 flex items-center gap-1 mt-1 font-medium">
                    <Navigation size={10} className="flex-shrink-0" />
                    {isFA
                      ? `${fmtDistance(km, true)} · تقریباً ${min} دقیقه`
                      : `${fmtDistance(km, false)} · ~${min} min`}
                  </p>
                );
              })()}
            </div>
          </div>

          {/* Route info banner — shown when route is active */}
          {navState === 'routed' && routeInfo && (
            <div className="mx-4 mb-2">
              <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30">
                <Route size={14} className="text-emerald-600 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                    {fmtDist(routeInfo.distance, isFA)}
                  </span>
                  <span className="text-zinc-400 mx-1.5">·</span>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 inline-flex">
                    <Clock size={11} className="flex-shrink-0" />
                    {' '}{fmtTime(routeInfo.duration, isFA)}
                  </span>
                  {routeInfo.alternatives > 0 && (
                    <span className="ms-2 text-[10px] text-zinc-400">
                      {isFA ? `+${routeInfo.alternatives} مسیر جایگزین` : `+${routeInfo.alternatives} alt`}
                    </span>
                  )}
                </div>
                <button onClick={() => { clearRoute(); setNavState('idle'); }} className="text-zinc-400 hover:text-zinc-600 flex-shrink-0">
                  <XCircle size={14} />
                </button>
              </div>
            </div>
          )}

          {/* Navigation error banner */}
          {navState === 'error' && (
            <div className="mx-4 mb-2">
              <div className="flex items-start gap-2 px-3 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30">
                <AlertTriangle size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-700 dark:text-amber-400 leading-snug flex-1">{navMsg}</p>
                <button onClick={() => setNavState('idle')} className="ms-auto text-amber-400 hover:text-amber-600 flex-shrink-0">
                  <X size={12} />
                </button>
              </div>
            </div>
          )}

          {/* Action row */}
          <div className="px-4 pb-4 pt-0 flex gap-2">
            {/* Navigate / Clear route */}
            <button
              onClick={handleNavigate}
              disabled={navState === 'loading'}
              className={[
                'flex items-center justify-center gap-1.5 flex-1 min-h-[46px] rounded-2xl',
                'text-white text-sm font-semibold transition-all duration-150 cursor-pointer',
                'disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.97]',
                navState === 'routed'
                  ? 'bg-zinc-400 hover:bg-zinc-500'
                  : 'bg-emerald-500 hover:bg-emerald-600',
              ].join(' ')}
            >
              {navState === 'loading' ? <Loader2 size={16} className="animate-spin" /> :
               navState === 'routed'  ? <XCircle size={16} /> :
               <Navigation size={16} />}
              {navState === 'loading' ? (isFA ? 'در حال یافتن مسیر...' : 'Finding route...') :
               navState === 'routed'  ? (isFA ? 'حذف مسیر' : 'Clear route') :
               (isFA ? 'مسیریابی' : 'Navigate')}
            </button>

            {/* Ticket */}
            {selectedPlace.ticketUrl && (
              selectedPlace.ticketUrl.startsWith('/') ? (
                <Link
                  href={selectedPlace.ticketUrl}
                  className="flex items-center justify-center gap-1.5
                             flex-1 min-h-[46px]
                             rounded-2xl
                             bg-sky-500 hover:bg-sky-600 active:scale-[0.97]
                             text-white text-sm font-semibold
                             transition-all duration-150"
                >
                  <Ticket size={16} />
                  {t.buyTicket}
                </Link>
              ) : (
                <a
                  href={selectedPlace.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5
                             flex-1 min-h-[46px]
                             rounded-2xl
                             bg-sky-500 hover:bg-sky-600 active:scale-[0.97]
                             text-white text-sm font-semibold
                             transition-all duration-150"
                >
                  <Ticket size={16} />
                  {t.buyTicket}
                </a>
              )
            )}

            {/* Info */}
            <button
              onClick={openInfo}
              aria-label={t.info}
              className="flex items-center justify-center gap-1.5
                         min-h-[46px] px-4
                         rounded-2xl
                         bg-zinc-100 dark:bg-zinc-800
                         text-zinc-700 dark:text-zinc-300
                         text-sm font-medium
                         hover:bg-zinc-200 dark:hover:bg-zinc-700
                         active:scale-[0.97] transition-all cursor-pointer"
            >
              <Info size={16} />
              <span className="hidden sm:inline">{t.info}</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
