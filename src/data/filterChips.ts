import type { LucideIcon } from 'lucide-react';
import { EyeOff, LayoutGrid, Waves, Building2, ShoppingBag, Coffee, Landmark, Zap } from 'lucide-react';

export interface FilterChip {
  id: string;
  fa: string;
  en: string;
  icon: LucideIcon;
  types: string[] | null; // null = show all, [] = show none
}

export const FILTER_CHIPS: FilterChip[] = [
  { id: 'none',     fa: 'هیچکدام',  en: 'None',     icon: EyeOff,      types: [] },
  { id: 'all',      fa: 'همه',      en: 'All',       icon: LayoutGrid,  types: null },
  { id: 'water',    fa: 'ورزش آبی', en: 'Water',     icon: Waves,       types: ['water-sports'] },
  { id: 'hotel',    fa: 'هتل',      en: 'Hotels',    icon: Building2,   types: ['hotel'] },
  { id: 'shopping', fa: 'خرید',     en: 'Shopping',  icon: ShoppingBag, types: ['shopping'] },
  { id: 'food',     fa: 'کافه‌ها',  en: 'Dining',    icon: Coffee,      types: ['cafe', 'restaurant'] },
  { id: 'culture',  fa: 'تاریخی',   en: 'Culture',   icon: Landmark,    types: ['amenity'] },
  { id: 'fun',      fa: 'تفریح',    en: 'Fun',       icon: Zap,         types: ['land-sports'] },
];
