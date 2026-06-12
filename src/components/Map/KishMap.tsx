'use client';
import { useRef, useCallback, useEffect, useState } from 'react';
import Map, { GeolocateControl, Source, Layer, Marker, type MapRef } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { StyleSpecification, GeolocateControl as GeolocateControlType } from 'maplibre-gl';
import type { LayerProps, MapMouseEvent } from 'react-map-gl/maplibre';
import { KISH_CENTER, KISH_BOUNDS, MAP_CONFIG, LIBERTY_URL } from './mapConfig';
import { loadDarkStyle, loadSatellite3DStyle } from './darkStyle';
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
  paint: { 'line-color': '#2563eb', 'line-width': 16, 'line-opacity': 0.18, 'line-blur': 8 },
  layout: { 'line-cap': 'round', 'line-join': 'round' },
};
const routeLineLayer: LayerProps = {
  id: 'route-line',
  type: 'line',
  paint: {
    'line-color': ['case', ['==', ['get', 'index'], 0], '#3b82f6', '#93c5fd'],
    'line-width': ['case', ['==', ['get', 'index'], 0], 7, 3.5],
    'line-opacity': ['case', ['==', ['get', 'index'], 0], 1, 0.6],
    'line-dasharray': ['case', ['==', ['get', 'index'], 0], ['literal', [1]], ['literal', [4, 3]]],
  },
  layout: { 'line-cap': 'round', 'line-join': 'round' },
};

export function KishMap() {
  const mapRef = useRef<MapRef>(null);
  const geoRef = useRef<GeolocateControlType | null>(null);

  const mapStyle       = useAppStore((s) => s.mapStyle);
  const selectedPlace  = useAppStore((s) => s.selectedPlace);
  const selectPlace    = useAppStore((s) => s.selectPlace);
  const clearSelection = useAppStore((s) => s.clearSelection);
  const pendingMapCommand = useAppStore((s) => s.pendingMapCommand);
  const clearMapCommand   = useAppStore((s) => s.clearMapCommand);
  const setMapIsPitched   = useAppStore((s) => s.setMapIsPitched);
  const routeGeometry  = useAppStore((s) => s.routeGeometry);
  const userPosition   = useAppStore((s) => s.userPosition);
  const setUserPosition = useAppStore((s) => s.setUserPosition);
  const setClickedPoint = useAppStore((s) => s.setClickedPoint);

  const [darkStyle,        setDarkStyle]        = useState<StyleSpecification | string>(LIBERTY_URL);
  const [satellite3DStyle, setSatellite3DStyle] = useState<StyleSpecification | string>(LIBERTY_URL);

  useEffect(() => {
    loadDarkStyle().then(setDarkStyle).catch(() => setDarkStyle(LIBERTY_URL));
    loadSatellite3DStyle().then(setSatellite3DStyle).catch(() => setSatellite3DStyle(LIBERTY_URL));
  }, []);

  useEffect(() => {
    const handler = () => geoRef.current?.trigger();
    window.addEventListener('kishview:geolocate', handler);
    return () => window.removeEventListener('kishview:geolocate', handler);
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

  const handleMapClick = useCallback(
    (e: MapMouseEvent) => {
      const { lng, lat } = e.lngLat;
      if (!inKish(lng, lat)) return;
      if (selectedPlace) clearSelection();
      setClickedPoint([lng, lat]);
    },
    [selectedPlace, clearSelection, setClickedPoint],
  );

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
    mapStyle === 'satellite' ? satellite3DStyle :
    mapStyle === 'dark'      ? darkStyle :
    LIBERTY_URL;

  return (
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

      {/* "شما" label under user location dot */}
      {userPosition && (
        <Marker longitude={userPosition[0]} latitude={userPosition[1]} anchor="top" offset={[0, 6]}>
          <div className="bg-blue-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-md pointer-events-none select-none">
            شما
          </div>
        </Marker>
      )}

      <MarkerLayer places={places} onMarkerClick={handleMarkerClick} />
    </Map>
  );
}
