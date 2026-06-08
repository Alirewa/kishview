import type { LngLatBoundsLike } from 'maplibre-gl';
import type { StyleSpecification } from 'maplibre-gl';

export const KISH_CENTER: [number, number] = [53.9614, 26.5565];

// Wider bounds so the full island + sea border is visible at min zoom
export const KISH_BOUNDS: LngLatBoundsLike = [
  [53.82, 26.44], // SW corner — enough sea to show coastline
  [54.10, 26.67], // NE corner
];

export const MAP_CONFIG = {
  initialZoom: 13,
  minZoom: 11,           // was 12 — allows seeing full island + sea
  maxZoom: 19,
  initialPitch: 45,      // tilted for 3-D building effect
  initialBearing: -10,
  flyToPitch: 65,
  flyToZoom: 17,
  flyToBearing: 20,
  flyToDuration: 2000,
  resetDuration: 1500,
} as const;

/**
 * Dark / 3-D vector style — OpenFreeMap "liberty"
 * Free, no API key, no usage limits. Includes fill-extrusion building layers.
 */
export const DARK_STYLE = 'https://tiles.openfreemap.org/styles/liberty';

/**
 * Satellite style — ESRI World Imagery (free, no API key)
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
        'Tiles © Esri — Source: Esri, DigitalGlobe, GeoEye, USDA FSA, USGS, AEX, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
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
  hotel:          '/markers/amenity.svg',
  shopping:       '/markers/restaurant.svg',
};
