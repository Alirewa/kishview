'use client';
import { useRef, useCallback, useEffect, useState } from 'react';
import Map, { GeolocateControl, type MapRef } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { StyleSpecification } from 'maplibre-gl';
import { KISH_CENTER, KISH_BOUNDS, MAP_CONFIG, LIBERTY_URL } from './mapConfig';
import { loadDarkStyle, loadSatellite3DStyle } from './darkStyle';
import { MarkerLayer } from './MarkerLayer';
import { useAppStore } from '@/store/useAppStore';
import { places } from '@/data/places';
import type { Place } from '@/types';

export function KishMap() {
  const mapRef      = useRef<MapRef>(null);
  const geoRef      = useRef<{ trigger: () => boolean } | null>(null);

  const {
    theme, useSatellite,
    selectedPlace, selectPlace,
    pendingMapCommand, clearMapCommand, setMapIsPitched,
  } = useAppStore((s) => ({
    theme:             s.theme,
    useSatellite:      s.useSatellite,
    selectedPlace:     s.selectedPlace,
    selectPlace:       s.selectPlace,
    pendingMapCommand: s.pendingMapCommand,
    clearMapCommand:   s.clearMapCommand,
    setMapIsPitched:   s.setMapIsPitched,
  }));

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

  const activeStyle = useSatellite
    ? satellite3DStyle
    : theme === 'dark'
      ? darkStyle
      : LIBERTY_URL;

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
        ref={geoRef as React.Ref<{ trigger: () => boolean }>}
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation
        showUserHeading
        showAccuracyCircle={false}
        style={{ display: 'none' }}
        onAdd={() => {
          // Trigger after a short delay to ensure map is ready
          setTimeout(() => geoRef.current?.trigger(), 800);
        }}
      />

      <MarkerLayer places={places} onMarkerClick={handleMarkerClick} />
    </Map>
  );
}
