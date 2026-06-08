'use client';
import { useRef, useCallback, useEffect } from 'react';
import Map, { type MapRef } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import {
  KISH_CENTER,
  KISH_BOUNDS,
  MAP_CONFIG,
  DARK_STYLE,
  SATELLITE_STYLE,
} from './mapConfig';
import { MarkerLayer } from './MarkerLayer';
import { useAppStore } from '@/store/useAppStore';
import { places } from '@/data/places';
import type { Place } from '@/types';

export function KishMap() {
  const mapRef = useRef<MapRef>(null);
  const theme = useAppStore((s) => s.theme);
  const selectedPlace = useAppStore((s) => s.selectedPlace);
  const selectPlace = useAppStore((s) => s.selectPlace);

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

  return (
    <Map
      ref={mapRef}
      mapStyle={theme === 'dark' ? DARK_STYLE : SATELLITE_STYLE}
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
