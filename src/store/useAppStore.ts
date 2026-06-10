'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Place, Theme, Language } from '@/types';

export type MapCommand = 'zoomIn' | 'zoomOut' | 'north' | 'togglePitch';

interface AppState {
  // ── Persisted preferences ──────────────────────────────
  theme: Theme;
  language: Language;
  useSatellite: boolean;
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
  // ── Actions ───────────────────────────────────────────────
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  toggleSatellite: () => void;
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
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'dark',
      language: 'fa',
      useSatellite: false,
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

      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),
      setLanguage: (language) => set({ language }),
      toggleLanguage: () => set((s) => ({ language: s.language === 'fa' ? 'en' : 'fa' })),
      toggleSatellite: () => set((s) => ({ useSatellite: !s.useSatellite })),
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
    }),
    {
      name: 'kishview-prefs',
      partialize: (s) => ({ theme: s.theme, language: s.language }),
    }
  )
);
