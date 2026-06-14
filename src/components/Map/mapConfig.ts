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
  initialPitch: 60,
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

/** CartoDB dark tiles + OpenFreeMap vector buildings for 3-D extrusion */
export const DARK_STYLE: StyleSpecification = {
  version: 8,
  glyphs: 'https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf',
  sources: {
    carto: {
      type: 'raster',
      tiles: [
        'https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
        'https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
        'https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
      ],
      tileSize: 256,
      attribution: '© CartoDB',
      maxzoom: 19,
    },
    ofm: {
      type: 'vector',
      url: 'https://tiles.openfreemap.org/planet',
    },
  },
  layers: [
    { id: 'carto-dark', type: 'raster', source: 'carto' } as import('maplibre-gl').LayerSpecification,
    {
      id: 'building-3d',
      type: 'fill-extrusion',
      source: 'ofm',
      'source-layer': 'building',
      minzoom: 13,
      paint: {
        'fill-extrusion-color': [
          'interpolate', ['linear'], ['zoom'],
          13, '#1a1f33',
          15, '#232840',
          17, '#2e3555',
        ],
        'fill-extrusion-height': [
          'interpolate', ['linear'], ['zoom'],
          13, 0,
          14, ['coalesce', ['get', 'render_height'], ['get', 'height'], 8],
        ],
        'fill-extrusion-base': ['coalesce', ['get', 'render_min_height'], ['get', 'min_height'], 0],
        'fill-extrusion-opacity': [
          'interpolate', ['linear'], ['zoom'],
          13, 0.0,
          13.5, 0.7,
          15, 0.9,
          18, 0.95,
        ],
      },
    } as import('maplibre-gl').LayerSpecification,
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
