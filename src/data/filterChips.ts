export interface FilterChip {
  id: string;
  fa: string;
  en: string;
  iconName: string;
  types: string[] | null; // null = show all
}

export const FILTER_CHIPS: FilterChip[] = [
  { id: 'all',      fa: 'همه',       en: 'All',       iconName: 'Map',         types: null },
  { id: 'water',    fa: 'ورزش آبی',  en: 'Water',     iconName: 'Waves',       types: ['water-sports'] },
  { id: 'hotel',    fa: 'هتل',       en: 'Hotels',    iconName: 'Building2',   types: ['hotel'] },
  { id: 'shopping', fa: 'خرید',      en: 'Shopping',  iconName: 'ShoppingBag', types: ['shopping'] },
  { id: 'food',     fa: 'کافه‌ها',   en: 'Dining',    iconName: 'Coffee',      types: ['cafe', 'restaurant'] },
  { id: 'culture',  fa: 'تاریخی',    en: 'Culture',   iconName: 'Landmark',    types: ['amenity'] },
  { id: 'fun',      fa: 'تفریح',     en: 'Fun',       iconName: 'Gamepad2',    types: ['land-sports'] },
];
