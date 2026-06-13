'use client';
import { useState, useEffect } from 'react';
import { X, Navigation, MapPin, Loader2, Route, Clock, XCircle, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import type { RouteGeometry, RouteInfo } from '@/store/useAppStore';
import { haversineKm, fmtDistance, estDriveMin } from '@/lib/distance';

type NavState = 'idle' | 'loading' | 'routed' | 'error';

interface OsrmStep {
  distance: number;
  duration: number;
  name: string;
  maneuver: { type: string; modifier?: string };
}

function maneuverFa(type: string, modifier?: string): string {
  if (type === 'depart')   return 'حرکت کنید';
  if (type === 'arrive')   return 'رسیدید!';
  if (type === 'roundabout' || type === 'rotary') return 'وارد میدان شوید';
  if (modifier === 'left' || modifier === 'sharp left') return 'به چپ بپیچید';
  if (modifier === 'right' || modifier === 'sharp right') return 'به راست بپیچید';
  if (modifier === 'slight left') return 'کمی به چپ برانید';
  if (modifier === 'slight right') return 'کمی به راست برانید';
  if (modifier === 'uturn') return 'دور بزنید';
  return 'مستقیم ادامه دهید';
}

async function fetchRoute(
  fromLng: number, fromLat: number,
  toLng: number, toLat: number,
): Promise<{ geometry: RouteGeometry; info: RouteInfo; steps: OsrmStep[] } | null> {
  const url = `https://router.project-osrm.org/route/v1/driving/${fromLng},${fromLat};${toLng},${toLat}?overview=full&geometries=geojson&alternatives=true&steps=true`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    if (data.code !== 'Ok' || !data.routes?.length) return null;

    const primary = data.routes[0];
    const steps: OsrmStep[] = primary.legs?.[0]?.steps ?? [];

    // Compute bounds from primary route coords
    const coords: number[][] = primary.geometry.coordinates;
    const lngs = coords.map((c) => c[0]);
    const lats  = coords.map((c) => c[1]);
    const bounds: [[number, number], [number, number]] = [
      [Math.min(...lngs), Math.min(...lats)],
      [Math.max(...lngs), Math.max(...lats)],
    ];
    window.dispatchEvent(new CustomEvent('kishview:fitRoute', { detail: { bounds } }));

    return {
      geometry: {
        type: 'FeatureCollection',
        features: data.routes.map((r: { geometry: { type: 'LineString'; coordinates: number[][] }; distance: number; duration: number }, i: number) => ({
          type: 'Feature' as const,
          geometry: r.geometry,
          properties: { index: i },
        })),
      },
      info: {
        distance: primary.distance,
        duration: primary.duration,
        alternatives: data.routes.length - 1,
      },
      steps,
    };
  } catch { return null; }
}

function fmtDuration(s: number, fa: boolean) {
  const m = Math.round(s / 60);
  if (m < 60) return fa ? `${m} دقیقه` : `${m} min`;
  const h = Math.floor(m / 60), rm = m % 60;
  return fa ? `${h} ساعت${rm ? ` و ${rm} دقیقه` : ''}` : `${h}h ${rm}m`;
}

export function ClickedPointPanel() {
  const { clickedPoint, setClickedPoint, userPosition, setRoute, clearRoute, routeInfo, language } =
    useAppStore((s) => ({
      clickedPoint:  s.clickedPoint,
      setClickedPoint: s.setClickedPoint,
      userPosition:  s.userPosition,
      setRoute:      s.setRoute,
      clearRoute:    s.clearRoute,
      routeInfo:     s.routeInfo,
      language:      s.language,
    }));

  const [navState, setNavState] = useState<NavState>('idle');
  const [navMsg, setNavMsg]     = useState('');
  const [navSteps, setNavSteps] = useState<OsrmStep[]>([]);
  const isFA = language === 'fa';

  useEffect(() => { setNavState('idle'); setNavMsg(''); setNavSteps([]); }, [clickedPoint]);

  if (!clickedPoint) return null;

  const [lng, lat] = clickedPoint;
  const straightKm = userPosition ? haversineKm(userPosition, clickedPoint) : null;
  const estMin     = straightKm != null ? estDriveMin(straightKm) : null;

  async function handleNavigate() {
    if (navState === 'routed') { clearRoute(); setNavState('idle'); setNavSteps([]); return; }
    if (!userPosition) {
      setNavState('error');
      setNavMsg(isFA ? 'موقعیت شما مشخص نیست. ابتدا موقعیت‌یابی را فعال کنید.' : 'Your location is not available.');
      return;
    }
    setNavState('loading');
    const result = await fetchRoute(userPosition[0], userPosition[1], lng, lat);
    if (!result) {
      setNavState('error');
      setNavMsg(isFA ? 'خطا در دریافت مسیر. دوباره تلاش کنید.' : 'Failed to fetch route.');
      return;
    }
    setRoute(result.geometry, result.info);
    setNavSteps(result.steps);
    setNavState('routed');
  }

  return (
    <AnimatePresence>
      <motion.div
        key={`${lng}-${lat}`}
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', stiffness: 360, damping: 38 }}
        className="fixed z-30
                   bottom-0 left-0 right-0
                   sm:bottom-4 sm:left-1/2 sm:-translate-x-1/2
                   sm:w-[420px]
                   rounded-t-3xl sm:rounded-3xl
                   bg-white dark:bg-zinc-900
                   shadow-2xl shadow-black/40
                   overflow-hidden pb-safe"
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-zinc-200 dark:bg-zinc-700" />
        </div>

        <div className="flex items-start justify-between gap-3 px-5 pt-4 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-500/20 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-sky-500" />
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900 dark:text-white">
                {isFA ? 'نقطه روی نقشه' : 'Map Point'}
              </p>
              <p className="text-[11px] text-zinc-400 font-mono">
                {lat.toFixed(5)}, {lng.toFixed(5)}
              </p>
            </div>
          </div>
          <button
            onClick={() => { setClickedPoint(null); clearRoute(); }}
            className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full
                       bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:bg-zinc-200
                       dark:hover:bg-zinc-700 transition-colors cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>

        {/* Distance info */}
        {straightKm != null && navState !== 'routed' && (
          <div className="mx-5 mb-3 flex items-center gap-3 px-3 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700">
            <Navigation size={14} className="text-sky-400 flex-shrink-0" />
            <span className="text-xs text-zinc-600 dark:text-zinc-300">
              {isFA
                ? `خط مستقیم: ${fmtDistance(straightKm, true)} · تقریباً ${estMin} دقیقه با ماشین`
                : `Straight: ${fmtDistance(straightKm, false)} · ~${estMin} min drive`}
            </span>
          </div>
        )}

        {/* Route info banner + steps */}
        {navState === 'routed' && routeInfo && (
          <div className="mx-5 mb-3 flex flex-col gap-2">
            {/* Summary */}
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30">
              <Route size={14} className="text-blue-600 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="text-xs font-bold text-blue-700 dark:text-blue-400">
                  {fmtDistance(routeInfo.distance / 1000, isFA)}
                </span>
                <span className="text-zinc-400 mx-1.5">·</span>
                <span className="text-xs text-blue-600 dark:text-blue-400 inline-flex items-center gap-0.5">
                  <Clock size={11} />
                  {' '}{fmtDuration(routeInfo.duration, isFA)}
                </span>
              </div>
              <button onClick={() => { clearRoute(); setNavState('idle'); setNavSteps([]); }} className="text-zinc-400 hover:text-zinc-600 flex-shrink-0">
                <XCircle size={14} />
              </button>
            </div>
            {/* Navigation hint */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-sky-500 text-white text-xs font-semibold">
              <Navigation size={13} className="flex-shrink-0" />
              <span>{isFA ? 'خط آبی روی نقشه را دنبال کنید' : 'Follow the blue line on the map'}</span>
            </div>
            {/* Steps list */}
            {navSteps.length > 0 && (
              <div className="rounded-xl border border-zinc-100 dark:border-zinc-700 overflow-hidden max-h-36 overflow-y-auto">
                {navSteps.filter(s => s.maneuver.type !== 'depart' || navSteps.indexOf(s) === 0).slice(0, 8).map((step, i) => (
                  <div key={i} className="flex items-center gap-2.5 px-3 py-2 border-b border-zinc-50 dark:border-zinc-800 last:border-b-0 bg-white dark:bg-zinc-900">
                    <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-[9px] font-bold text-blue-600">{i + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold text-zinc-800 dark:text-zinc-100 leading-tight">
                        {isFA ? maneuverFa(step.maneuver.type, step.maneuver.modifier) : `${step.maneuver.type}${step.maneuver.modifier ? ' ' + step.maneuver.modifier : ''}`}
                      </p>
                      {step.name && (
                        <p className="text-[10px] text-zinc-400 truncate">{step.name}</p>
                      )}
                    </div>
                    <span className="text-[10px] text-zinc-400 flex-shrink-0">
                      {step.distance > 1000 ? `${(step.distance / 1000).toFixed(1)} km` : `${Math.round(step.distance)} m`}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Error banner */}
        {navState === 'error' && (
          <div className="mx-5 mb-3 flex items-start gap-2 px-3 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30">
            <AlertTriangle size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700 dark:text-amber-400 leading-snug">{navMsg}</p>
            <button onClick={() => setNavState('idle')} className="ms-auto text-amber-400 hover:text-amber-600">
              <X size={12} />
            </button>
          </div>
        )}

        {/* Navigate button */}
        <div className="px-5 pb-5">
          <button
            onClick={handleNavigate}
            disabled={navState === 'loading'}
            className={[
              'flex items-center justify-center gap-2 w-full min-h-[46px] rounded-2xl',
              'text-white text-sm font-semibold transition-all cursor-pointer disabled:opacity-60',
              navState === 'routed'
                ? 'bg-zinc-400 hover:bg-zinc-500'
                : 'bg-blue-500 hover:bg-blue-600 active:scale-[0.98]',
            ].join(' ')}
          >
            {navState === 'loading' ? <Loader2 size={16} className="animate-spin" /> :
             navState === 'routed'  ? <XCircle size={16} /> :
             <Navigation size={16} />}
            {navState === 'loading' ? (isFA ? 'در حال یافتن مسیر...' : 'Finding route...') :
             navState === 'routed'  ? (isFA ? 'حذف مسیر' : 'Clear Route') :
             (isFA ? 'مسیریابی' : 'Navigate')}
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
