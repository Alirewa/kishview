'use client';
import { useRef, useCallback, useEffect } from 'react';
import Map, { type MapRef } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { KISH_CENTER, KISH_BOUNDS, MAP_CONFIG } from './mapConfig';
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

  // Reset map view when overlay is closed
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
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      mapStyle={theme === 'dark' ? MAP_CONFIG.style.dark : MAP_CONFIG.style.light}
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
      terrain={{ source: 'mapbox-dem', exaggeration: 1.5 }}
      onLoad={(e) => {
        const map = e.target;
        // 3D terrain DEM source
        map.addSource('mapbox-dem', {
          type: 'raster-dem',
          url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
          tileSize: 512,
          maxzoom: 14,
        });
        // Atmosphere sky layer
        map.addLayer({
          id: 'sky',
          type: 'sky',
          paint: {
            'sky-type': 'atmosphere',
            'sky-atmosphere-sun': [0.0, 90.0],
            'sky-atmosphere-sun-intensity': 15,
          },
        });
      }}
    >
      <MarkerLayer places={places} onMarkerClick={handleMarkerClick} />
    </Map>
  );
}
