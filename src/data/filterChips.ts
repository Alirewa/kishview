export interface FilterChip {
  id: string;
  fa: string;
  en: string;
  emoji: string;
  types: string[] | null; // null = show all
}

export const FILTER_CHIPS: FilterChip[] = [
  { id: 'all',      fa: 'همه',       en: 'All',       emoji: '🗺',  types: null },
  { id: 'water',    fa: 'ورزش آبی',  en: 'Water',     emoji: '🌊', types: ['water-sports'] },
  { id: 'hotel',    fa: 'هتل',       en: 'Hotels',    emoji: '🏨', types: ['hotel'] },
  { id: 'shopping', fa: 'خرید',      en: 'Shopping',  emoji: '🛍', types: ['shopping'] },
  { id: 'food',     fa: 'کافه‌ها',   en: 'Dining',    emoji: '☕', types: ['cafe', 'restaurant'] },
  { id: 'culture',  fa: 'تاریخی',    en: 'Culture',   emoji: '🏛', types: ['amenity'] },
  { id: 'fun',      fa: 'تفریح',     en: 'Fun',       emoji: '🎡', types: ['land-sports'] },
];
