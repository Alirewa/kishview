export type Category = 'water-sports' | 'land-sports' | 'restaurant' | 'cafe' | 'amenity' | 'hotel' | 'shopping';
export type Language = 'fa' | 'en';
export type Theme = 'dark' | 'light';

export interface PlaceImage {
  src: string;
  alt: string;
}

export interface Place {
  id: string;
  category: Category;
  coordinates: [number, number]; // [lng, lat]
  name: { fa: string; en: string };
  address?: { fa: string; en: string };
  description: { fa: string; en: string };
  guide: { fa: string; en: string };
  images: PlaceImage[];
  ticketUrl?: string;
}
