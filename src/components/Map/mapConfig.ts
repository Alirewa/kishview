import type { LngLatBoundsLike, StyleSpecification } from 'maplibre-gl';

export const KISH_CENTER: [number, number] = [53.9614, 26.555];

export const KISH_BOUNDS: LngLatBoundsLike = [
  [53.82, 26.44],
  [54.10, 26.67],
];

export const MAP_CONFIG = {
  initialZoom: 13,
  minZoom: 11,
  maxZoom: 19,
  initialPitch: 55,
  initialBearing: -10,
  flyToPitch: 68,
  flyToZoom: 17,
  flyToBearing: 20,
  flyToDuration: 2000,
  resetDuration: 1500,
} as const;

/** Vector base — free, no key, includes 3-D fill-extrusion layers */
export const LIBERTY_URL = 'https://tiles.openfreemap.org/styles/liberty';

/** Satellite — ESRI, free, no key */
export const SATELLITE_STYLE: StyleSpecification = {
  version: 8,
  sources: {
    esri: {
      type: 'raster',
      tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
      tileSize: 256,
      attribution: 'Tiles © Esri',
      maxzoom: 19,
    },
  },
  layers: [{ id: 'esri-satellite', type: 'raster', source: 'esri' }],
};

export const CATEGORY_ICONS: Record<string, string> = {
  'water-sports': '/markers/water-sports.svg',
  'land-sports':  '/markers/land-sports.svg',
  restaurant:     '/markers/restaurant.svg',
  cafe:           '/markers/cafe.svg',
  amenity:        '/markers/amenity.svg',
  hotel:          '/markers/amenity.svg',
  shopping:       '/markers/restaurant.svg',
};
