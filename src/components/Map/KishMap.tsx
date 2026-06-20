'use client';
import { useRef, useCallback, useEffect, useMemo } from 'react';
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

// Approximate Kish Island land polygon — used to block sea clicks
const KISH_LAND_POLY: [number, number][] = [
  [53.878, 26.603], [53.920, 26.612], [53.962, 26.608],
  [54.005, 26.598], [54.038, 26.575], [54.055, 26.548],
  [54.040, 26.508], [54.000, 26.480], [53.960, 26.473],
  [53.918, 26.477], [53.882, 26.496], [53.858, 26.528],
  [53.854, 26.560], [53.867, 26.589], [53.878, 26.603],
];
function onIsland(lng: number, lat: number): boolean {
  let inside = false;
  for (let i = 0, j = KISH_LAND_POLY.length - 1; i < KISH_LAND_POLY.length; j = i++) {
    const [xi, yi] = KISH_LAND_POLY[i];
    const [xj, yj] = KISH_LAND_POLY[j];
    if (((yi > lat) !== (yj > lat)) && (lng < (xj - xi) * (lat - yi) / (yj - yi) + xi))
      inside = !inside;
  }
  return inside;
}

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
  const audioElRef       = useRef<HTMLAudioElement | null>(null);
  const fadeTimerRef     = useRef<ReturnType<typeof setInterval> | null>(null);

  // keep latest store values accessible inside event closures
  const selectedPlaceRef = useRef(selectedPlace);
  useEffect(() => { selectedPlaceRef.current = selectedPlace; }, [selectedPlace]);
  const clearSelectionRef = useRef(clearSelection);
  useEffect(() => { clearSelectionRef.current = clearSelection; }, [clearSelection]);
  const setClickedPointRef = useRef(setClickedPoint);
  useEffect(() => { setClickedPointRef.current = setClickedPoint; }, [setClickedPoint]);
  const clearRouteRef = useRef(clearRoute);
  useEffect(() => { clearRouteRef.current = clearRoute; }, [clearRoute]);

  // Stop any playing tour audio if the map unmounts mid-tour
  useEffect(() => () => {
    if (fadeTimerRef.current) clearInterval(fadeTimerRef.current);
    audioElRef.current?.pause();
  }, []);

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

  useEffect(() => {
    const handler = (e: Event) => {
      const { lng, lat } = (e as CustomEvent).detail as { lng: number; lat: number };
      mapRef.current?.flyTo({ center: [lng, lat], zoom: 16, pitch: 55, duration: 1400, essential: true });
    };
    window.addEventListener('kishview:flyToResult', handler);
    return () => window.removeEventListener('kishview:flyToResult', handler);
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

      let startTimeout: ReturnType<typeof setTimeout> | null = null;

      const beginFlyAndRotate = () => {
        if (!tourActiveRef.current || !map) return;

        map.flyTo({
          center: KISH_CENTER,
          zoom: 12.5,
          pitch: 65,
          bearing: 0,
          duration: 3000,
          essential: true,
        });

        startTimeout = setTimeout(() => {
          if (!tourActiveRef.current || !map) return;
          const startTime = performance.now();

          const rotateTour = (now: number) => {
            if (!tourActiveRef.current || !map) return;
            const elapsed = now - startTime;
            const bearing = (elapsed / 90000) * 360;
            const zoom = 12.5 + Math.sin((elapsed / 30000) * Math.PI * 2) * 0.4;
            map.setBearing(bearing % 360);
            map.setZoom(zoom);
            tourAnimRef.current = requestAnimationFrame(rotateTour);
          };
          tourAnimRef.current = requestAnimationFrame(rotateTour);
        }, 3200);
      };

      // Wait for satellite style to finish loading before starting animation
      if (map.isStyleLoaded()) {
        beginFlyAndRotate();
      } else {
        map.once('styledata', beginFlyAndRotate);
      }

      startAmbientSound();

      return () => {
        if (startTimeout) clearTimeout(startTimeout);
        map.off('styledata', beginFlyAndRotate);
      };
    } else {
      tourActiveRef.current = false;
      if (tourAnimRef.current) {
        cancelAnimationFrame(tourAnimRef.current);
        tourAnimRef.current = null;
      }
      stopAmbientSound();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [islandTour]);

  // Ambient ocean-waves loop for the cinematic tour (CC-BY-SA 4.0, Wikimedia Commons)
  const TOUR_AUDIO_URL = 'https://upload.wikimedia.org/wikipedia/commons/8/84/Sea_waves.wav';
  const TOUR_AUDIO_VOLUME = 0.4;

  function startAmbientSound() {
    try {
      if (!audioElRef.current) {
        const audio = new Audio(TOUR_AUDIO_URL);
        audio.loop = true;
        audio.preload = 'auto';
        audioElRef.current = audio;
      }
      const audio = audioElRef.current;
      audio.volume = 0;
      audio.currentTime = 0;
      void audio.play().catch(() => { /* autoplay blocked — silently ignore */ });

      if (fadeTimerRef.current) clearInterval(fadeTimerRef.current);
      fadeTimerRef.current = setInterval(() => {
        const next = Math.min(TOUR_AUDIO_VOLUME, audio.volume + 0.025);
        audio.volume = next;
        if (next >= TOUR_AUDIO_VOLUME && fadeTimerRef.current) {
          clearInterval(fadeTimerRef.current);
          fadeTimerRef.current = null;
        }
      }, 100);
    } catch { /* audio not supported */ }
  }

  function stopAmbientSound() {
    const audio = audioElRef.current;
    if (!audio) return;
    if (fadeTimerRef.current) { clearInterval(fadeTimerRef.current); fadeTimerRef.current = null; }
    fadeTimerRef.current = setInterval(() => {
      const next = audio.volume - 0.04;
      if (next <= 0) {
        audio.volume = 0;
        audio.pause();
        if (fadeTimerRef.current) { clearInterval(fadeTimerRef.current); fadeTimerRef.current = null; }
      } else {
        audio.volume = next;
      }
    }, 100);
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
      if (islandTour) return;
      if (longPressDidFire.current) { longPressDidFire.current = false; return; }
      const { lng, lat } = e.lngLat;
      if (!inKish(lng, lat) || !onIsland(lng, lat)) return;
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
    [islandTour, selectedPlace, clearSelection, setClickedPoint, clearRoute],
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
    if (!inKish(lng, lat) || !onIsland(lng, lat)) return;
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
    if (islandTour) return;
    if (e.touches.length !== 1) { cancelHold(); return; }
    const touch = e.touches[0];
    const map = mapRef.current?.getMap();
    if (!map) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const point = map.unproject([touch.clientX - rect.left, touch.clientY - rect.top]);
    holdDataRef.current = { x: touch.clientX, y: touch.clientY, lngLat: [point.lng, point.lat] };
    holdTimerRef.current = setTimeout(fireHold, 2000);
  }, [islandTour, cancelHold, fireHold]);

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

  // Route uses one vivid, high-contrast palette (hot magenta) that pops
  // against every basemap — light, dark and satellite — instead of
  // theme-matched colors that blended into the map and were unreadable.
  const rc = useMemo(() => ({
    border: '#ffffff', borderW: 24,
    main: '#ff1f8f', alt: '#ffb3d9',
    glowC: '#ff2d92', glowO: 0.55,
  }), []);

  const routeBorderLayer: LayerProps = useMemo(() => ({
    id: 'route-border', type: 'line',
    filter: ['==', ['get', 'index'], 0],
    paint: { 'line-color': rc.border, 'line-width': rc.borderW, 'line-opacity': 1.0 },
    layout: { 'line-cap': 'round', 'line-join': 'round' },
  }), [rc]);

  const routeGlowLayer: LayerProps = useMemo(() => ({
    id: 'route-glow', type: 'line',
    filter: ['==', ['get', 'index'], 0],
    paint: { 'line-color': rc.glowC, 'line-width': 18, 'line-opacity': rc.glowO, 'line-blur': 14 },
    layout: { 'line-cap': 'round', 'line-join': 'round' },
  }), [rc]);

  const routeLineLayer: LayerProps = useMemo(() => ({
    id: 'route-line', type: 'line',
    paint: {
      'line-color': ['case', ['==', ['get', 'index'], 0], rc.main, rc.alt],
      'line-width': ['case', ['==', ['get', 'index'], 0], 14, 4],
      'line-opacity': ['case', ['==', ['get', 'index'], 0], 1, 0.45],
      'line-dasharray': ['case', ['==', ['get', 'index'], 0], ['literal', [1]], ['literal', [5, 4]]],
    },
    layout: { 'line-cap': 'round', 'line-join': 'round' },
  }), [rc]);

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
        fadeDuration={0}
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

        {!islandTour && <MarkerLayer places={places} onMarkerClick={handleMarkerClick} />}
      </Map>

      {/* Island tour stop button — corner button while tour is active */}
      {islandTour && (
        <button
          onClick={() => setIslandTour(false)}
          className="absolute top-4 left-4 z-30
                     flex items-center gap-2 px-4 py-2.5 rounded-xl
                     bg-black/65 backdrop-blur-md text-white text-xs font-bold
                     border border-white/20 shadow-xl cursor-pointer
                     hover:bg-black/80 transition-colors"
        >
          <span className="w-2.5 h-2.5 rounded-sm bg-white inline-block flex-shrink-0" />
          توقف
        </button>
      )}
    </div>
  );
}
