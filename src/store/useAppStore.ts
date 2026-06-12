// Developed by @Alirewa — github.com/Alirewa
'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Place, Theme, Language } from '@/types';

export type MapCommand = 'zoomIn' | 'zoomOut' | 'north' | 'togglePitch';
export type MapStyle  = 'light' | 'dark' | 'satellite';

export type RouteFeature = {
  type: 'Feature';
  geometry: { type: 'LineString'; coordinates: number[][] };
  properties: { index: number };
};
export type RouteGeometry = { type: 'FeatureCollection'; features: RouteFeature[] };
export type RouteInfo = { distance: number; duration: number; alternatives: number };

interface AppState {
  // ── Persisted preferences ──────────────────────────────
  theme: Theme;
  language: Language;
  mapStyle: MapStyle;
  // ── Transient UI state ─────────────────────────────────
  selectedPlace: Place | null;
  isOverlayOpen: boolean;
  isInfoOpen: boolean;
  isAddPlaceModalOpen: boolean;
  isMenuOpen: boolean;
  isMapControlsOpen: boolean;
  isSearchOpen: boolean;
  // ── Filters ─────────────────────────────────────────────
  selectedCategory: string;
  searchQuery: string;
  // ── Map commands ─────────────────────────────────────────
  pendingMapCommand: MapCommand | null;
  mapIsPitched: boolean;
  // ── Route ────────────────────────────────────────────────
  routeGeometry: RouteGeometry | null;
  routeInfo: RouteInfo | null;
  // ── Actions ───────────────────────────────────────────────
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  setMapStyle: (style: MapStyle) => void;
  selectPlace: (place: Place) => void;
  clearSelection: () => void;
  openInfo: () => void;
  closeInfo: () => void;
  openAddPlaceModal: () => void;
  closeAddPlaceModal: () => void;
  openMenu: () => void;
  closeMenu: () => void;
  openMapControls: () => void;
  closeMapControls: () => void;
  toggleMapControls: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  setCategory: (cat: string) => void;
  setSearchQuery: (q: string) => void;
  queueMapCommand: (cmd: MapCommand) => void;
  clearMapCommand: () => void;
  setMapIsPitched: (v: boolean) => void;
  setRoute: (geometry: RouteGeometry, info: RouteInfo) => void;
  clearRoute: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'light',
      language: 'fa',
      mapStyle: 'light',
      selectedPlace: null,
      isOverlayOpen: false,
      isInfoOpen: false,
      isAddPlaceModalOpen: false,
      isMenuOpen: false,
      isMapControlsOpen: false,
      isSearchOpen: false,
      selectedCategory: 'all',
      searchQuery: '',
      pendingMapCommand: null,
      mapIsPitched: true,
      routeGeometry: null,
      routeInfo: null,

      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),
      setLanguage: (language) => set({ language }),
      toggleLanguage: () => set((s) => ({ language: s.language === 'fa' ? 'en' : 'fa' })),
      setMapStyle: (mapStyle) => set({ mapStyle }),
      selectPlace: (place) => set({ selectedPlace: place, isOverlayOpen: true, isInfoOpen: false }),
      clearSelection: () => set({ selectedPlace: null, isOverlayOpen: false, isInfoOpen: false }),
      openInfo: () => set({ isInfoOpen: true }),
      closeInfo: () => set({ isInfoOpen: false }),
      openAddPlaceModal: () => set({ isAddPlaceModalOpen: true }),
      closeAddPlaceModal: () => set({ isAddPlaceModalOpen: false }),
      openMenu: () => set({ isMenuOpen: true, isMapControlsOpen: false }),
      closeMenu: () => set({ isMenuOpen: false }),
      openMapControls: () => set({ isMapControlsOpen: true, isMenuOpen: false }),
      closeMapControls: () => set({ isMapControlsOpen: false }),
      toggleMapControls: () => set((s) => ({ isMapControlsOpen: !s.isMapControlsOpen, isMenuOpen: false })),
      openSearch: () => set({ isSearchOpen: true }),
      closeSearch: () => set({ isSearchOpen: false, searchQuery: '' }),
      setCategory: (selectedCategory) => set({ selectedCategory }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      queueMapCommand: (cmd) => set({ pendingMapCommand: cmd }),
      clearMapCommand: () => set({ pendingMapCommand: null }),
      setMapIsPitched: (mapIsPitched) => set({ mapIsPitched }),
      setRoute: (routeGeometry, routeInfo) => set({ routeGeometry, routeInfo }),
      clearRoute: () => set({ routeGeometry: null, routeInfo: null }),
    }),
    {
      name: 'kishview-prefs',
      partialize: (s) => ({ theme: s.theme, language: s.language, mapStyle: s.mapStyle }),
    }
  )
);
