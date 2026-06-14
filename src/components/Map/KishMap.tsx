'use client';
import { useRef, useCallback, useEffect } from 'react';
import Map, { GeolocateControl, Source, Layer, Marker, type MapRef } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { GeolocateControl as GeolocateControlType } from 'maplibre-gl';
import type { LayerProps, MapMouseEvent } from 'react-map-gl/maplibre';
import { KISH_CENTER, KISH_BOUNDS, MAP_CONFIG, LIBERTY_URL, SATELLITE_STYLE, DARK_STYLE } from './mapConfig';
import { MarkerLayer } from './MarkerLayer';
import { useAppStore } from '@/store/useAppStore';
import { places } from '@/data/places';
import type { Place } from '@/types';

const KISH_LAT = [26.44, 26.67] as const;
const KISH_LNG = [53.82, 54.10] as const;
function inKish(lng: number, lat: number) {
  return lat >= KISH_LAT[0] && lat <= KISH_LAT[1] && lng >= KISH_LNG[0] && lng <= KISH_LNG[1];
}

// Route: white border below, bright blue line on top
const routeBorderLayer: LayerProps = {
  id: 'route-border',
  type: 'line',
  filter: ['==', ['get', 'index'], 0],
  paint: { 'line-color': '#ffffff', 'line-width': 22, 'line-opacity': 1.0 },
  layout: { 'line-cap': 'round', 'line-join': 'round' },
};
const routeGlowLayer: LayerProps = {
  id: 'route-glow',
  type: 'line',
  filter: ['==', ['get', 'index'], 0],
  paint: { 'line-color': '#1d4ed8', 'line-width': 18, 'line-opacity': 0.35, 'line-blur': 14 },
  layout: { 'line-cap': 'round', 'line-join': 'round' },
};
const routeLineLayer: LayerProps = {
  id: 'route-line',
  type: 'line',
  paint: {
    'line-color': ['case', ['==', ['get', 'index'], 0], '#2563eb', '#93c5fd'],
    'line-width': ['case', ['==', ['get', 'index'], 0], 14, 4],
    'line-opacity': ['case', ['==', ['get', 'index'], 0], 1, 0.45],
    'line-dasharray': ['case', ['==', ['get', 'index'], 0], ['literal', [1]], ['literal', [5, 4]]],
  },
  layout: { 'line-cap': 'round', 'line-join': 'round' },
};

export function KishMap() {
  const mapRef = useRef<MapRef>(null);
  const geoRef = useRef<GeolocateControlType | null>(null);

  const mapStyle        = useAppStore((s) => s.mapStyle);
  const selectedPlace   = useAppStore((s) => s.selectedPlace);
  const selectPlace     = useAppStore((s) => s.selectPlace);
  const clearSelection  = useAppStore((s) => s.clearSelection);
  const pendingMapCommand = useAppStore((s) => s.pendingMapCommand);
  const clearMapCommand   = useAppStore((s) => s.clearMapCommand);
  const setMapIsPitched   = useAppStore((s) => s.setMapIsPitched);
  const routeGeometry   = useAppStore((s) => s.routeGeometry);
  const userPosition    = useAppStore((s) => s.userPosition);
  const setUserPosition = useAppStore((s) => s.setUserPosition);
  const clickedPoint    = useAppStore((s) => s.clickedPoint);
  const setClickedPoint = useAppStore((s) => s.setClickedPoint);
  const clearRoute      = useAppStore((s) => s.clearRoute);
  const islandTour      = useAppStore((s) => s.islandTour);
  const setIslandTour   = useAppStore((s) => s.setIslandTour);

  // ── refs for long-press gesture ──────────────────────────────
  const holdTimerRef     = useRef<ReturnType<typeof setTimeout> | null>(null);
  const holdDataRef      = useRef<{ x: number; y: number; lngLat: [number, number] } | null>(null);
  const longPressDidFire = useRef(false);
  const tourAnimRef      = useRef<number | null>(null);
  const tourActiveRef    = useRef(false);
  const audioCtxRef      = useRef<AudioContext | null>(null);
  const masterGainRef    = useRef<GainNode | null>(null);

  // keep latest store values accessible inside event closures
  const selectedPlaceRef = useRef(selectedPlace);
  useEffect(() => { selectedPlaceRef.current = selectedPlace; }, [selectedPlace]);
  const clearSelectionRef = useRef(clearSelection);
  useEffect(() => { clearSelectionRef.current = clearSelection; }, [clearSelection]);
  const setClickedPointRef = useRef(setClickedPoint);
  useEffect(() => { setClickedPointRef.current = setClickedPoint; }, [setClickedPoint]);
  const clearRouteRef = useRef(clearRoute);
  useEffect(() => { clearRouteRef.current = clearRoute; }, [clearRoute]);

  // ── Background watchPosition for continuous tracking ─────────
  useEffect(() => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) return;
    const wid = navigator.geolocation.watchPosition(
      (pos) => setUserPosition([pos.coords.longitude, pos.coords.latitude]),
      undefined,
      { enableHighAccuracy: true, maximumAge: 3000 },
    );
    return () => navigator.geolocation.clearWatch(wid);
  }, [setUserPosition]);

  // ── Event listeners ──────────────────────────────────────────
  useEffect(() => {
    const handler = () => geoRef.current?.trigger();
    window.addEventListener('kishview:geolocate', handler);
    return () => window.removeEventListener('kishview:geolocate', handler);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const { bounds } = (e as CustomEvent).detail as { bounds: [[number, number], [number, number]] };
      mapRef.current?.fitBounds(bounds, { padding: 80, duration: 1500, essential: true });
    };
    window.addEventListener('kishview:fitRoute', handler);
    return () => window.removeEventListener('kishview:fitRoute', handler);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const { lng, lat } = (e as CustomEvent).detail as { lng: number; lat: number };
      mapRef.current?.flyTo({ center: [lng, lat], zoom: 17, pitch: 65, duration: 1800, essential: true });
    };
    window.addEventListener('kishview:flyToUser', handler);
    return () => window.removeEventListener('kishview:flyToUser', handler);
  }, []);

  // ── Map commands ─────────────────────────────────────────────
  useEffect(() => {
    if (!pendingMapCommand) return;
    const map = mapRef.current?.getMap();
    if (!map) return;
    switch (pendingMapCommand) {
      case 'zoomIn':  map.zoomIn({ duration: 300 }); break;
      case 'zoomOut': map.zoomOut({ duration: 300 }); break;
      case 'north':   map.easeTo({ bearing: 0, pitch: MAP_CONFIG.initialPitch, duration: 600 }); break;
      case 'togglePitch': {
        const next = map.getPitch() > 10 ? 0 : MAP_CONFIG.initialPitch;
        map.easeTo({ pitch: next, duration: 600 });
        setMapIsPitched(next > 10);
        break;
      }
    }
    clearMapCommand();
  }, [pendingMapCommand, clearMapCommand, setMapIsPitched]);

  // ── Island tour ──────────────────────────────────────────────
  useEffect(() => {
    if (islandTour) {
      tourActiveRef.current = true;
      const map = mapRef.current?.getMap();
      if (!map) return;

      // Fly to island overview
      map.flyTo({
        center: KISH_CENTER,
        zoom: 12.5,
        pitch: 65,
        bearing: 0,
        duration: 3000,
        essential: true,
      });

      // Start rotation after fly completes
      const startTimeout = setTimeout(() => {
        let bearing = 0;
        const startTime = performance.now();

        function rotateTour(now: number) {
          if (!tourActiveRef.current || !map) return;
          const elapsed = now - startTime;
          // Full 360° in 90 seconds
          bearing = (elapsed / 90000) * 360;
          // Gentle zoom breathe: 12 ↔ 13
          const zoom = 12.5 + Math.sin((elapsed / 30000) * Math.PI * 2) * 0.4;
          map.setBearing(bearing % 360);
          map.setZoom(zoom);
          tourAnimRef.current = requestAnimationFrame(rotateTour);
        }
        tourAnimRef.current = requestAnimationFrame(rotateTour);
      }, 3200);

      // Ambient sound
      startAmbientSound();

      return () => {
        clearTimeout(startTimeout);
      };
    } else {
      // Stop tour
      tourActiveRef.current = false;
      if (tourAnimRef.current) {
        cancelAnimationFrame(tourAnimRef.current);
        tourAnimRef.current = null;
      }
      stopAmbientSound();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [islandTour]);

  function startAmbientSound() {
    try {
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;
      const master = ctx.createGain();
      master.gain.setValueAtTime(0, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 4);
      master.connect(ctx.destination);
      masterGainRef.current = master;

      // Soft reverb
      const conv = ctx.createConvolver();
      const len  = ctx.sampleRate * 3;
      const buf  = ctx.createBuffer(2, len, ctx.sampleRate);
      for (let ch = 0; ch < 2; ch++) {
        const data = buf.getChannelData(ch);
        for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.5);
      }
      conv.buffer = buf;
      conv.connect(master);

      // Harmonic pads — A minor pentatonic
      const baseFreq = 110; // A2
      [1, 1.5, 2, 2.666, 3, 4].forEach((ratio, i) => {
        const osc  = ctx.createOscillator();
        const gain = ctx.createGain();
        const lfo  = ctx.createOscillator();
        const lfog = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = baseFreq * ratio;
        gain.gain.value = 0.06 / (i + 1);
        lfo.type = 'sine';
        lfo.frequency.value = 0.03 + i * 0.007;
        lfog.gain.value = baseFreq * ratio * 0.015;
        lfo.connect(lfog);
        lfog.connect(osc.frequency);
        osc.connect(gain);
        gain.connect(conv);
        lfo.start();
        osc.start(ctx.currentTime + i * 0.3);
      });
    } catch { /* audio not supported */ }
  }

  function stopAmbientSound() {
    if (masterGainRef.current && audioCtxRef.current) {
      const g = masterGainRef.current;
      const t = audioCtxRef.current.currentTime;
      g.gain.setValueAtTime(g.gain.value, t);
      g.gain.linearRampToValueAtTime(0, t + 2);
      setTimeout(() => { audioCtxRef.current?.close(); audioCtxRef.current = null; }, 2500);
    }
  }

  // ── Marker click ─────────────────────────────────────────────
  const handleMarkerClick = useCallback(
    (place: Place) => {
      cancelHold();
      setClickedPoint(null);
      selectPlace(place);
      mapRef.current?.flyTo({
        center: place.coordinates,
        zoom: MAP_CONFIG.flyToZoom,
        pitch: MAP_CONFIG.flyToPitch,
        bearing: MAP_CONFIG.flyToBearing,
        duration: MAP_CONFIG.flyToDuration,
        essential: true,
      });
    },
    [selectPlace, setClickedPoint],
  );

  // ── Desktop click ─────────────────────────────────────────────
  const handleMapClick = useCallback(
    (e: MapMouseEvent) => {
      if (longPressDidFire.current) { longPressDidFire.current = false; return; }
      const { lng, lat } = e.lngLat;
      if (!inKish(lng, lat)) return;
      if (selectedPlace) clearSelection();
      clearRoute();
      setClickedPoint([lng, lat]);
      mapRef.current?.flyTo({
        center: [lng, lat],
        zoom: Math.max(mapRef.current?.getZoom() ?? 14, 15),
        duration: 700,
        essential: true,
      });
    },
    [selectedPlace, clearSelection, setClickedPoint, clearRoute],
  );

  // ── Long-press helpers ────────────────────────────────────────
  const cancelHold = useCallback(() => {
    if (holdTimerRef.current) { clearTimeout(holdTimerRef.current); holdTimerRef.current = null; }
    holdDataRef.current = null;
  }, []);

  const fireHold = useCallback(() => {
    const data = holdDataRef.current;
    if (!data) return;
    const [lng, lat] = data.lngLat;
    if (!inKish(lng, lat)) return;
    longPressDidFire.current = true;
    if (selectedPlaceRef.current) clearSelectionRef.current();
    clearRouteRef.current();
    setClickedPointRef.current([lng, lat]);
    mapRef.current?.flyTo({
      center: [lng, lat],
      zoom: Math.max(mapRef.current?.getZoom() ?? 14, 15),
      duration: 700,
      essential: true,
    });
    holdDataRef.current = null;
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 1) { cancelHold(); return; }
    const touch = e.touches[0];
    const map = mapRef.current?.getMap();
    if (!map) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const point = map.unproject([touch.clientX - rect.left, touch.clientY - rect.top]);
    holdDataRef.current = { x: touch.clientX, y: touch.clientY, lngLat: [point.lng, point.lat] };
    holdTimerRef.current = setTimeout(fireHold, 2000);
  }, [cancelHold, fireHold]);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!holdDataRef.current || e.touches.length !== 1) { cancelHold(); return; }
    const touch = e.touches[0];
    const dx = Math.abs(touch.clientX - holdDataRef.current.x);
    const dy = Math.abs(touch.clientY - holdDataRef.current.y);
    if (dx > 12 || dy > 12) cancelHold();
  }, [cancelHold]);

  const handleTouchEnd = useCallback(() => { cancelHold(); }, [cancelHold]);

  useEffect(() => {
    if (!selectedPlace) {
      mapRef.current?.flyTo({
        center: KISH_CENTER,
        zoom: MAP_CONFIG.initialZoom,
        pitch: MAP_CONFIG.initialPitch,
        bearing: MAP_CONFIG.initialBearing,
        duration: MAP_CONFIG.resetDuration,
        essential: true,
      });
    }
  }, [selectedPlace]);

  const activeStyle =
    mapStyle === 'satellite' ? SATELLITE_STYLE :
    mapStyle === 'dark'      ? DARK_STYLE :
    LIBERTY_URL;

  return (
    <div
      className="w-full h-full"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <Map
        ref={mapRef}
        mapStyle={activeStyle}
        onLoad={() => { setTimeout(() => geoRef.current?.trigger(), 800); }}
        onClick={handleMapClick}
        initialViewState={{
          longitude: KISH_CENTER[0],
          latitude:  KISH_CENTER[1],
          zoom:      MAP_CONFIG.initialZoom,
          pitch:     MAP_CONFIG.initialPitch,
          bearing:   MAP_CONFIG.initialBearing,
        }}
        minZoom={MAP_CONFIG.minZoom}
        maxZoom={MAP_CONFIG.maxZoom}
        maxBounds={KISH_BOUNDS}
        style={{ width: '100%', height: '100%' }}
        attributionControl={false}
      >
        <GeolocateControl
          ref={geoRef as React.Ref<GeolocateControlType>}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation
          showAccuracyCircle={false}
          style={{ display: 'none' }}
          onGeolocate={(e) => {
            setUserPosition([e.coords.longitude, e.coords.latitude]);
          }}
        />

        {/* Route overlay: border → glow → line */}
        {routeGeometry && (
          <Source id="route" type="geojson" data={routeGeometry}>
            <Layer {...routeBorderLayer} />
            <Layer {...routeGlowLayer} />
            <Layer {...routeLineLayer} />
          </Source>
        )}

        {/* Pin marker at clicked point */}
        {clickedPoint && (
          <Marker longitude={clickedPoint[0]} latitude={clickedPoint[1]} anchor="bottom">
            <div className="flex flex-col items-center pointer-events-none">
              <div className="w-4 h-4 rounded-full bg-blue-500 border-[3px] border-white shadow-lg shadow-blue-500/50" />
              <div className="w-0.5 h-3 bg-blue-500 opacity-70" />
            </div>
          </Marker>
        )}

        {/* "شما" label under user location dot */}
        {userPosition && (
          <Marker longitude={userPosition[0]} latitude={userPosition[1]} anchor="top" offset={[0, 8]}>
            <span
              className="text-blue-500 text-[12px] font-bold pointer-events-none select-none"
              style={{ fontFamily: 'Vazirmatn, sans-serif', textShadow: '0 0 3px #fff,0 0 3px #fff,0 0 3px #fff' }}
            >
              شما
            </span>
          </Marker>
        )}

        <MarkerLayer places={places} onMarkerClick={handleMarkerClick} />
      </Map>

      {/* Island tour stop button — shown while tour is active */}
      {islandTour && (
        <button
          onClick={() => setIslandTour(false)}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30
                     flex items-center gap-2 px-5 py-3 rounded-2xl
                     bg-black/70 backdrop-blur-md text-white text-sm font-bold
                     border border-white/20 shadow-xl cursor-pointer
                     hover:bg-black/80 transition-colors"
        >
          <span className="w-3 h-3 rounded-sm bg-white inline-block" />
          توقف جزیره‌گردی
        </button>
      )}
    </div>
  );
}
