import type { StyleSpecification, LayerSpecification } from 'maplibre-gl';
import { LIBERTY_URL } from './mapConfig';

function darkLayer(layer: LayerSpecification): LayerSpecification {
  const id = layer.id;
  switch (layer.type) {
    case 'background':
      return { ...layer, paint: { 'background-color': '#07070f' } };

    case 'fill': {
      let color = '#111120';
      if (/water|ocean|sea|lake|bay/.test(id))                              color = '#0b1926';
      else if (/park|grass|wood|forest|scrub|meadow|green|nature/.test(id)) color = '#0b180c';
      else if (/sand|beach|desert/.test(id))                                color = '#18180f';
      else if (/building/.test(id))                                          color = '#15152a';
      else if (/landuse|residential|commercial|industrial/.test(id))        color = '#0e0e1c';
      return { ...layer, paint: { ...((layer.paint as object) ?? {}), 'fill-color': color } };
    }

    case 'line': {
      let color = '#252538';
      if (/motorway|highway|trunk/.test(id))              color = '#e87c12';
      else if (/primary/.test(id))                        color = '#c06510';
      else if (/secondary/.test(id))                      color = '#8a490c';
      else if (/tertiary|minor|street|service/.test(id))  color = '#22223a';
      else if (/water|river|stream|canal/.test(id))       color = '#0b1926';
      else if (/railway|transit/.test(id))                color = '#38385a';
      else if (/boundary|border/.test(id))                color = '#33334a';
      return { ...layer, paint: { ...((layer.paint as object) ?? {}), 'line-color': color } };
    }

    case 'fill-extrusion':
      return {
        ...layer,
        paint: {
          ...((layer.paint as object) ?? {}),
          'fill-extrusion-color': [
            'interpolate', ['linear'], ['coalesce', ['get', 'render_height'], 0],
            0,  '#1a1a2e',
            8,  '#1e1e38',
            20, '#252548',
            45, '#2d2d58',
            80, '#35356a',
          ],
          'fill-extrusion-opacity': 0.96,
          'fill-extrusion-ambient-occlusion-intensity': 0.45,
          'fill-extrusion-ambient-occlusion-radius': 3,
        },
      } as unknown as LayerSpecification;

    case 'symbol':
      return {
        ...layer,
        paint: {
          ...((layer.paint as object) ?? {}),
          'text-color': '#9090b8',
          'text-halo-color': '#000000',
          'text-halo-width': 1.2,
          'icon-opacity': 0.6,
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
 * Satellite + 3D buildings: ESRI aerial imagery base with OSM building
 * extrusions on top — the most realistic "bird's-eye" look achievable for free.
 * Kish buildings are mostly white/cream concrete, so we use sandy-beige tones.
 */
export async function loadSatellite3DStyle(): Promise<StyleSpecification> {
  const res = await fetch(LIBERTY_URL);
  if (!res.ok) throw new Error('liberty fetch failed');
  const liberty: StyleSpecification = await res.json();

  // Pull the vector-tile source from the liberty style
  const vectorSource = Object.values(liberty.sources ?? {}).find(
    (s) => (s as { type: string }).type === 'vector',
  );
  const vectorKey = Object.keys(liberty.sources ?? {}).find(
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
        tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
        tileSize: 256,
        maxzoom: 19,
        attribution: '',
      },
      ...(vectorSource ? { [vectorKey]: vectorSource } : {}),
    },
    layers: [
      // ── Satellite base ──────────────────────────────────────
      {
        id: 'satellite-base',
        type: 'raster',
        source: 'satellite',
        paint: { 'raster-saturation': 0.1, 'raster-contrast': 0.05 },
      } as LayerSpecification,

      // ── Major road overlay (helps orientation) ───────────────
      ...(vectorSource ? [
        {
          id: 'road-major',
          type: 'line',
          source: vectorKey,
          'source-layer': 'transportation',
          filter: ['in', ['get', 'class'], ['literal', ['motorway', 'trunk', 'primary', 'secondary']]],
          minzoom: 10,
          paint: {
            'line-color': 'rgba(255, 190, 60, 0.55)',
            'line-width': ['interpolate', ['linear'], ['zoom'], 10, 1, 16, 4],
          },
        } as LayerSpecification,

        // ── 3D Buildings ──────────────────────────────────────
        {
          id: 'building-3d',
          type: 'fill-extrusion',
          source: vectorKey,
          'source-layer': 'building',
          minzoom: 13,
          paint: {
            // Kish buildings are predominantly white/cream painted concrete
            'fill-extrusion-color': [
              'interpolate', ['linear'], ['coalesce', ['get', 'render_height'], 4],
              0,  '#f2ede0',
              8,  '#ede8d8',
              20, '#e8e2ce',
              50, '#e2dcc4',
              80, '#dcd6bc',
            ],
            'fill-extrusion-height': ['coalesce', ['get', 'render_height'], 6],
            'fill-extrusion-base':   ['coalesce', ['get', 'render_min_height'], 0],
            'fill-extrusion-opacity': 0.90,
            'fill-extrusion-ambient-occlusion-intensity': 0.55,
            'fill-extrusion-ambient-occlusion-radius': 4,
          } as unknown,
        } as LayerSpecification,

        // ── Place labels ──────────────────────────────────────
        {
          id: 'place-labels',
          type: 'symbol',
          source: vectorKey,
          'source-layer': 'place',
          filter: ['in', ['get', 'class'], ['literal', ['city', 'town', 'village', 'suburb', 'neighbourhood']]],
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
      ] : []),
    ],
  };
}
