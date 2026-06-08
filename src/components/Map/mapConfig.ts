import type { LngLatBoundsLike } from 'maplibre-gl';
import type { StyleSpecification } from 'maplibre-gl';

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
} as const;

/**
 * Dark style — OpenFreeMap "liberty" (free, no API key, no usage limits)
 * https://openfreemap.org
 */
export const DARK_STYLE = 'https://tiles.openfreemap.org/styles/liberty';

/**
 * Satellite style — ESRI World Imagery (free, no API key, unlimited)
 * ArcGIS REST tileserver, publicly accessible
 */
export const SATELLITE_STYLE: StyleSpecification = {
  version: 8,
  sources: {
    esri: {
      type: 'raster',
      tiles: [
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      ],
      tileSize: 256,
      attribution:
        'Tiles &copy; Esri &mdash; Source: Esri, DigitalGlobe, GeoEye, i-cubed, USDA FSA, USGS, AEX, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
      maxzoom: 19,
    },
  },
  layers: [
    {
      id: 'esri-satellite',
      type: 'raster',
      source: 'esri',
      minzoom: 0,
      maxzoom: 22,
    },
  ],
};

export const CATEGORY_ICONS: Record<string, string> = {
  'water-sports': '/markers/water-sports.svg',
  'land-sports':  '/markers/land-sports.svg',
  restaurant:     '/markers/restaurant.svg',
  cafe:           '/markers/cafe.svg',
  amenity:        '/markers/amenity.svg',
};
