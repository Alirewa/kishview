'use client';
import { Marker } from 'react-map-gl/maplibre';
import { CATEGORY_ICONS } from './mapConfig';
import { assetUrl } from '@/lib/assetUrl';
import { useAppStore } from '@/store/useAppStore';
import { FILTER_CHIPS } from '@/data/filterChips';
import type { Place } from '@/types';

interface Props {
  places: Place[];
  onMarkerClick: (place: Place) => void;
}

export function MarkerLayer({ places, onMarkerClick }: Props) {
  const selectedCategory = useAppStore((s) => s.selectedCategory);

  const chip = FILTER_CHIPS.find((c) => c.id === selectedCategory);
  const allowedTypes = chip?.types ?? null;

  const visible = places.filter((p) => {
    if (allowedTypes && !allowedTypes.includes(p.category)) return false;
    return true;
  });

  return (
    <>
      {visible.map((place) => (
        <Marker
          key={place.id}
          longitude={place.coordinates[0]}
          latitude={place.coordinates[1]}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            onMarkerClick(place);
          }}
        >
          <button
            aria-label={place.name.en}
            className="cursor-pointer transition-transform duration-200
                       hover:scale-125 focus:outline-none focus:scale-125
                       min-h-[44px] min-w-[44px]
                       flex items-end justify-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={assetUrl(CATEGORY_ICONS[place.category] ?? CATEGORY_ICONS.amenity)}
              alt={place.category}
              width={36}
              height={36}
              className="drop-shadow-lg"
            />
          </button>
        </Marker>
      ))}
    </>
  );
}
