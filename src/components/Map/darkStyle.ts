import type { StyleSpecification, LayerSpecification } from 'maplibre-gl';

const LIBERTY_URL = 'https://tiles.openfreemap.org/styles/liberty';

function transformLayer(layer: LayerSpecification): LayerSpecification {
  const id = layer.id;

  switch (layer.type) {
    case 'background':
      return { ...layer, paint: { 'background-color': '#07070f' } };

    case 'fill': {
      let color = '#111120';
      if (/water|ocean|sea|lake|bay/.test(id))           color = '#0b1926';
      else if (/park|grass|wood|forest|scrub|meadow|green|nature/.test(id)) color = '#0b180c';
      else if (/sand|beach|desert/.test(id))             color = '#18180f';
      else if (/building/.test(id))                      color = '#15152a';
      else if (/landuse|residential|commercial|industrial/.test(id)) color = '#0e0e1c';
      return {
        ...layer,
        paint: { ...((layer.paint as object) ?? {}), 'fill-color': color },
      };
    }

    case 'line': {
      let color = '#252538';
      if (/motorway|highway|trunk/.test(id))             color = '#e87c12';
      else if (/primary/.test(id))                       color = '#c06510';
      else if (/secondary/.test(id))                     color = '#8a490c';
      else if (/tertiary|minor|street|service/.test(id)) color = '#22223a';
      else if (/water|river|stream|canal/.test(id))      color = '#0b1926';
      else if (/railway|transit/.test(id))               color = '#38385a';
      else if (/boundary|border/.test(id))               color = '#33334a';
      return {
        ...layer,
        paint: { ...((layer.paint as object) ?? {}), 'line-color': color },
      };
    }

    case 'fill-extrusion':
      return {
        ...layer,
        paint: {
          ...((layer.paint as object) ?? {}),
          'fill-extrusion-color': [
            'interpolate', ['linear'],
            ['coalesce', ['get', 'render_height'], 0],
            0,  '#1a1a30',
            20, '#1e1e3a',
            60, '#222250',
          ],
          'fill-extrusion-opacity': 0.97,
        },
      };

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
  if (!res.ok) throw new Error('Failed to fetch liberty style');
  const style: StyleSpecification = await res.json();
  return { ...style, layers: style.layers.map(transformLayer) };
}
