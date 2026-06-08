import type { LngLatBoundsLike } from 'mapbox-gl';

export const KISH_CENTER: [number, number] = [53.9614, 26.5565];

export const KISH_BOUNDS: LngLatBoundsLike = [
  [53.90, 26.52], // SW corner
  [54.02, 26.59], // NE corner
];

export const MAP_CONFIG = {
  initialZoom: 13,
  minZoom: 12,
  maxZoom: 19,
  initialPitch: 0,
  initialBearing: 0,
  flyToPitch: 60,
  flyToZoom: 17,
  flyToBearing: 20,
  flyToDuration: 2000,
  resetDuration: 1500,
  style: {
    dark: 'mapbox://styles/mapbox/dark-v11',
    light: 'mapbox://styles/mapbox/satellite-streets-v12',
  },
} as const;

export const CATEGORY_ICONS: Record<string, string> = {
  'water-sports': '/markers/water-sports.svg',
  'land-sports':  '/markers/land-sports.svg',
  restaurant:     '/markers/restaurant.svg',
  cafe:           '/markers/cafe.svg',
  amenity:        '/markers/amenity.svg',
};
