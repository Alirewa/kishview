// Developed by @Alirewa — github.com/Alirewa
'use client';
import { useRef, useCallback, useEffect, useState } from 'react';
import Map, { GeolocateControl, Source, Layer, type MapRef } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { StyleSpecification, GeolocateControl as GeolocateControlType } from 'maplibre-gl';
import type { LayerProps } from 'react-map-gl/maplibre';
import { KISH_CENTER, KISH_BOUNDS, MAP_CONFIG, LIBERTY_URL } from './mapConfig';
import { loadDarkStyle, loadSatellite3DStyle } from './darkStyle';
import { MarkerLayer } from './MarkerLayer';
import { useAppStore } from '@/store/useAppStore';
import { places } from '@/data/places';
import type { Place } from '@/types';

const routeGlowLayer: LayerProps = {
  id: 'route-glow',
  type: 'line',
  paint: {
    'line-color': '#10b981',
    'line-width': 10,
    'line-opacity': 0.25,
    'line-blur': 4,
  },
  layout: { 'line-cap': 'round', 'line-join': 'round' },
};

const routeLineLayer: LayerProps = {
  id: 'route-line',
  type: 'line',
  paint: {
    'line-color': [
      'case',
      ['==', ['get', 'index'], 0], '#10b981',
      '#6ee7b7',
    ],
    'line-width': ['case', ['==', ['get', 'index'], 0], 4, 2.5],
    'line-opacity': ['case', ['==', ['get', 'index'], 0], 1, 0.55],
    'line-dasharray': ['case', ['==', ['get', 'index'], 0], ['literal', [1]], ['literal', [4, 3]]],
  },
  layout: { 'line-cap': 'round', 'line-join': 'round' },
};

export function KishMap() {
  const mapRef  = useRef<MapRef>(null);
  const geoRef  = useRef<GeolocateControlType | null>(null);

  const mapStyle        = useAppStore((s) => s.mapStyle);
  const selectedPlace   = useAppStore((s) => s.selectedPlace);
  const selectPlace     = useAppStore((s) => s.selectPlace);
  const pendingMapCommand = useAppStore((s) => s.pendingMapCommand);
  const clearMapCommand = useAppStore((s) => s.clearMapCommand);
  const setMapIsPitched = useAppStore((s) => s.setMapIsPitched);
  const routeGeometry   = useAppStore((s) => s.routeGeometry);

  const [darkStyle,        setDarkStyle]        = useState<StyleSpecification | string>(LIBERTY_URL);
  const [satellite3DStyle, setSatellite3DStyle] = useState<StyleSpecification | string>(LIBERTY_URL);

  useEffect(() => {
    loadDarkStyle().then(setDarkStyle).catch(() => setDarkStyle(LIBERTY_URL));
    loadSatellite3DStyle().then(setSatellite3DStyle).catch(() => setSatellite3DStyle(LIBERTY_URL));
  }, []);

  // Listen for "kishview:geolocate" custom event (fired by MenuDrawer)
  useEffect(() => {
    const handler = () => geoRef.current?.trigger();
    window.addEventListener('kishview:geolocate', handler);
    return () => window.removeEventListener('kishview:geolocate', handler);
  }, []);

  // Execute queued map commands
  useEffect(() => {
    if (!pendingMapCommand) return;
    const map = mapRef.current?.getMap();
    if (!map) return;
    switch (pendingMapCommand) {
      case 'zoomIn':  map.zoomIn({ duration: 300 }); break;
      case 'zoomOut': map.zoomOut({ duration: 300 }); break;
      case 'north':
        map.easeTo({ bearing: 0, pitch: MAP_CONFIG.initialPitch, duration: 600 });
        break;
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
      selectPlace(place);
      mapRef.current?.flyTo({
        center:    place.coordinates,
        zoom:      MAP_CONFIG.flyToZoom,
        pitch:     MAP_CONFIG.flyToPitch,
        bearing:   MAP_CONFIG.flyToBearing,
        duration:  MAP_CONFIG.flyToDuration,
        essential: true,
      });
    },
    [selectPlace],
  );

  useEffect(() => {
    if (!selectedPlace) {
      mapRef.current?.flyTo({
        center:    KISH_CENTER,
        zoom:      MAP_CONFIG.initialZoom,
        pitch:     MAP_CONFIG.initialPitch,
        bearing:   MAP_CONFIG.initialBearing,
        duration:  MAP_CONFIG.resetDuration,
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
      {/* Hidden GeolocateControl — auto-triggered on load */}
      <GeolocateControl
        ref={geoRef as React.Ref<GeolocateControlType>}
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation
        showAccuracyCircle={false}
        style={{ display: 'none' }}
        onAdd={() => {
          setTimeout(() => geoRef.current?.trigger(), 800);
        }}
      />

      {/* Route overlay */}
      {routeGeometry && (
        <Source id="route" type="geojson" data={routeGeometry}>
          <Layer {...routeGlowLayer} />
          <Layer {...routeLineLayer} />
        </Source>
      )}

      <MarkerLayer places={places} onMarkerClick={handleMarkerClick} />
    </Map>
  );
}
