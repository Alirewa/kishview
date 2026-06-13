'use client';
import { useRef, useCallback, useEffect, useState } from 'react';
import Map, { GeolocateControl, Source, Layer, Marker, type MapRef } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { StyleSpecification, GeolocateControl as GeolocateControlType } from 'maplibre-gl';
import type { LayerProps, MapMouseEvent } from 'react-map-gl/maplibre';
import { KISH_CENTER, KISH_BOUNDS, MAP_CONFIG, LIBERTY_URL, SATELLITE_STYLE } from './mapConfig';
import { loadDarkStyle } from './darkStyle';
import { MarkerLayer } from './MarkerLayer';
import { useAppStore } from '@/store/useAppStore';
import { places } from '@/data/places';
import type { Place } from '@/types';

const KISH_LAT = [26.44, 26.67] as const;
const KISH_LNG = [53.82, 54.10] as const;
function inKish(lng: number, lat: number) {
  return lat >= KISH_LAT[0] && lat <= KISH_LAT[1] && lng >= KISH_LNG[0] && lng <= KISH_LNG[1];
}

const routeGlowLayer: LayerProps = {
  id: 'route-glow',
  type: 'line',
  paint: { 'line-color': '#1d4ed8', 'line-width': 24, 'line-opacity': 0.30, 'line-blur': 12 },
  layout: { 'line-cap': 'round', 'line-join': 'round' },
};
const routeLineLayer: LayerProps = {
  id: 'route-line',
  type: 'line',
  paint: {
    'line-color': ['case', ['==', ['get', 'index'], 0], '#2563eb', '#93c5fd'],
    'line-width': ['case', ['==', ['get', 'index'], 0], 11, 4],
    'line-opacity': ['case', ['==', ['get', 'index'], 0], 1, 0.55],
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

  const [darkStyle, setDarkStyle] = useState<StyleSpecification | string>(LIBERTY_URL);

  // ── refs for long-press gesture ──────────────────────────────
  const holdTimerRef  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const holdDataRef   = useRef<{ x: number; y: number; lngLat: [number, number] } | null>(null);
  const longPressDidFire = useRef(false);

  // keep latest store values accessible inside event closures
  const selectedPlaceRef = useRef(selectedPlace);
  useEffect(() => { selectedPlaceRef.current = selectedPlace; }, [selectedPlace]);
  const clearSelectionRef = useRef(clearSelection);
  useEffect(() => { clearSelectionRef.current = clearSelection; }, [clearSelection]);
  const setClickedPointRef = useRef(setClickedPoint);
  useEffect(() => { setClickedPointRef.current = setClickedPoint; }, [setClickedPoint]);
  const clearRouteRef = useRef(clearRoute);
  useEffect(() => { clearRouteRef.current = clearRoute; }, [clearRoute]);

  useEffect(() => {
    loadDarkStyle().then(setDarkStyle).catch(() => setDarkStyle(LIBERTY_URL));
  }, []);

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
      mapRef.current?.flyTo({ center: [lng, lat], zoom: 17, duration: 1800, essential: true });
    };
    window.addEventListener('kishview:flyToUser', handler);
    return () => window.removeEventListener('kishview:flyToUser', handler);
  }, []);

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

  // ── desktop: single click ─────────────────────────────────────
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

  // ── long-press helpers ────────────────────────────────────────
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

  // ── touch handlers on the wrapper div ─────────────────────────
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
    mapStyle === 'dark'      ? darkStyle :
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

        {/* Route overlay */}
        {routeGeometry && (
          <Source id="route" type="geojson" data={routeGeometry}>
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
    </div>
  );
}
