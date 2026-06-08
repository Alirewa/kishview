'use client';
import { useRef, useCallback, useEffect, useState } from 'react';
import Map, { type MapRef } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { StyleSpecification } from 'maplibre-gl';
import { KISH_CENTER, KISH_BOUNDS, MAP_CONFIG, LIBERTY_URL, SATELLITE_STYLE } from './mapConfig';
import { loadDarkStyle } from './darkStyle';
import { MarkerLayer } from './MarkerLayer';
import { useAppStore } from '@/store/useAppStore';
import { places } from '@/data/places';
import type { Place } from '@/types';

export function KishMap() {
  const mapRef = useRef<MapRef>(null);
  const {
    theme, useSatellite,
    selectedPlace, selectPlace,
    pendingMapCommand, clearMapCommand, setMapIsPitched,
  } = useAppStore((s) => ({
    theme: s.theme,
    useSatellite: s.useSatellite,
    selectedPlace: s.selectedPlace,
    selectPlace: s.selectPlace,
    pendingMapCommand: s.pendingMapCommand,
    clearMapCommand: s.clearMapCommand,
    setMapIsPitched: s.setMapIsPitched,
  }));

  const [darkStyle, setDarkStyle] = useState<StyleSpecification | string>(LIBERTY_URL);

  useEffect(() => {
    loadDarkStyle().then(setDarkStyle).catch(() => setDarkStyle(LIBERTY_URL));
  }, []);

  // Execute queued map commands (zoom, compass, pitch)
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
        center: place.coordinates,
        zoom: MAP_CONFIG.flyToZoom,
        pitch: MAP_CONFIG.flyToPitch,
        bearing: MAP_CONFIG.flyToBearing,
        duration: MAP_CONFIG.flyToDuration,
        essential: true,
      });
    },
    [selectPlace]
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

  const activeStyle = useSatellite
    ? SATELLITE_STYLE
    : theme === 'dark'
      ? darkStyle
      : LIBERTY_URL;

  return (
    <Map
      ref={mapRef}
      mapStyle={activeStyle}
      initialViewState={{
        longitude: KISH_CENTER[0],
        latitude: KISH_CENTER[1],
        zoom: MAP_CONFIG.initialZoom,
        pitch: MAP_CONFIG.initialPitch,
        bearing: MAP_CONFIG.initialBearing,
      }}
      minZoom={MAP_CONFIG.minZoom}
      maxZoom={MAP_CONFIG.maxZoom}
      maxBounds={KISH_BOUNDS}
      style={{ width: '100%', height: '100%' }}
      attributionControl={false}
    >
      <MarkerLayer places={places} onMarkerClick={handleMarkerClick} />
    </Map>
  );
}
