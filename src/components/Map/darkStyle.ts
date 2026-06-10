import type { StyleSpecification, LayerSpecification } from 'maplibre-gl';
import { LIBERTY_URL } from './mapConfig';

/**
 * Kish Coastal Dark — Persian Gulf island at night.
 * Deep navy sea, warm sand, tropical green, coral-accented roads.
 */
function darkLayer(layer: LayerSpecification): LayerSpecification {
  const id = layer.id;
  switch (layer.type) {
    case 'background':
      return { ...layer, paint: { 'background-color': '#05080d' } };

    case 'fill': {
      let color = '#0e0e1a';
      if (/water|ocean|sea|lake|bay|wetland/.test(id))               color = '#061c2c';
      else if (/park|grass|wood|forest|scrub|meadow|green|nature/.test(id)) color = '#0a1a0e';
      else if (/sand|beach|desert/.test(id))                         color = '#1a1710';
      else if (/building/.test(id))                                  color = '#12121e';
      else if (/landuse|residential|commercial|industrial/.test(id)) color = '#0c0c18';
      return { ...layer, paint: { ...((layer.paint as object) ?? {}), 'fill-color': color } };
    }

    case 'line': {
      let color = '#1d1d30';
      if (/motorway|highway|trunk/.test(id))             color = '#e07a10';
      else if (/primary/.test(id))                       color = '#a05a0c';
      else if (/secondary/.test(id))                     color = '#6b4510';
      else if (/tertiary|minor|street|service/.test(id)) color = '#1d1d30';
      else if (/water|river|stream|canal/.test(id))      color = '#0a2a3e';
      else if (/railway|transit/.test(id))               color = '#2a2a40';
      else if (/boundary|border/.test(id))               color = '#252538';
      return { ...layer, paint: { ...((layer.paint as object) ?? {}), 'line-color': color } };
    }

    case 'fill-extrusion':
      return {
        ...layer,
        paint: {
          ...((layer.paint as object) ?? {}),
          'fill-extrusion-color': [
            'interpolate', ['linear'], ['coalesce', ['get', 'render_height'], 0],
            0,  '#151520',
            8,  '#1c1c2e',
            20, '#232338',
            45, '#2a2a45',
            80, '#323258',
          ],
          'fill-extrusion-opacity': 0.97,
          'fill-extrusion-ambient-occlusion-intensity': 0.50,
          'fill-extrusion-ambient-occlusion-radius': 3.5,
        },
      } as unknown as LayerSpecification;

    case 'symbol':
      return {
        ...layer,
        paint: {
          ...((layer.paint as object) ?? {}),
          'text-color': '#a0b8c0',
          'text-halo-color': '#020810',
          'text-halo-width': 1.3,
          'icon-opacity': 0.65,
        },
      };

    default:
      return layer;
  }
}

export async function loadDarkStyle(): Promise<StyleSpecification> {
  const res = await fetch(LIBERTY_URL);
  if (!res.ok) throw new Error('liberty fetch failed');
  const style: StyleSpecification = await res.json();
  return { ...style, layers: style.layers.map(darkLayer) };
}

/**
 * Satellite + 3D: ESRI aerial imagery + OSM vector buildings.
 * Kish buildings are predominantly white/cream concrete.
 */
export async function loadSatellite3DStyle(): Promise<StyleSpecification> {
  const res = await fetch(LIBERTY_URL);
  if (!res.ok) throw new Error('liberty fetch failed');
  const liberty: StyleSpecification = await res.json();

  const vectorSource = Object.values(liberty.sources ?? {}).find(
    (s) => (s as { type: string }).type === 'vector',
  );
  const vectorKey =
    Object.keys(liberty.sources ?? {}).find(
      (k) => (liberty.sources as Record<string, { type: string }>)[k]?.type === 'vector',
    ) ?? 'openmaptiles';

  return {
    version: 8 as const,
    name: 'Satellite 3D',
    glyphs: liberty.glyphs ?? 'https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf',
    sprite: liberty.sprite,
    sources: {
      satellite: {
        type: 'raster',
        tiles: [
          'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        ],
        tileSize: 256,
        maxzoom: 19,
        attribution: '',
      },
      ...(vectorSource ? { [vectorKey]: vectorSource } : {}),
    },
    layers: [
      {
        id: 'satellite-base',
        type: 'raster',
        source: 'satellite',
        paint: { 'raster-saturation': 0.12, 'raster-contrast': 0.06 },
      } as LayerSpecification,

      ...(vectorSource
        ? [
            {
              id: 'road-major',
              type: 'line',
              source: vectorKey,
              'source-layer': 'transportation',
              filter: [
                'in',
                ['get', 'class'],
                ['literal', ['motorway', 'trunk', 'primary', 'secondary']],
              ],
              minzoom: 10,
              paint: {
                'line-color': 'rgba(255, 190, 60, 0.55)',
                'line-width': ['interpolate', ['linear'], ['zoom'], 10, 1, 16, 4],
              },
            } as LayerSpecification,

            {
              id: 'building-3d',
              type: 'fill-extrusion',
              source: vectorKey,
              'source-layer': 'building',
              minzoom: 13,
              paint: {
                'fill-extrusion-color': [
                  'interpolate',
                  ['linear'],
                  ['coalesce', ['get', 'render_height'], 4],
                  0,  '#f2ede0',
                  8,  '#ede8d8',
                  20, '#e8e2ce',
                  50, '#e2dcc4',
                  80, '#dcd6bc',
                ],
                'fill-extrusion-height': ['coalesce', ['get', 'render_height'], 6],
                'fill-extrusion-base': ['coalesce', ['get', 'render_min_height'], 0],
                'fill-extrusion-opacity': 0.92,
                'fill-extrusion-ambient-occlusion-intensity': 0.55,
                'fill-extrusion-ambient-occlusion-radius': 4,
              } as unknown,
            } as LayerSpecification,

            {
              id: 'place-labels',
              type: 'symbol',
              source: vectorKey,
              'source-layer': 'place',
              filter: [
                'in',
                ['get', 'class'],
                ['literal', ['city', 'town', 'village', 'suburb', 'neighbourhood']],
              ],
              minzoom: 12,
              layout: {
                'text-field': ['coalesce', ['get', 'name:en'], ['get', 'name']],
                'text-size': ['interpolate', ['linear'], ['zoom'], 12, 10, 16, 13],
                'text-font': ['Noto Sans Bold'],
                'text-anchor': 'center',
              },
              paint: {
                'text-color': '#ffffff',
                'text-halo-color': 'rgba(0,0,0,0.75)',
                'text-halo-width': 1.5,
              },
            } as LayerSpecification,
          ]
        : []),
    ],
  };
}
