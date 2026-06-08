'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Place, Theme, Language } from '@/types';

interface AppState {
  // Preferences (persisted to localStorage)
  theme: Theme;
  language: Language;
  // Transient map / overlay state (NOT persisted)
  selectedPlace: Place | null;
  isOverlayOpen: boolean;
  isAddPlaceModalOpen: boolean;
  // Actions
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  selectPlace: (place: Place) => void;
  clearSelection: () => void;
  openAddPlaceModal: () => void;
  closeAddPlaceModal: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'dark',
      language: 'fa',
      selectedPlace: null,
      isOverlayOpen: false,
      isAddPlaceModalOpen: false,

      setTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),
      setLanguage: (language) => set({ language }),
      toggleLanguage: () =>
        set((s) => ({ language: s.language === 'fa' ? 'en' : 'fa' })),
      selectPlace: (place) => set({ selectedPlace: place, isOverlayOpen: true }),
      clearSelection: () => set({ selectedPlace: null, isOverlayOpen: false }),
      openAddPlaceModal: () => set({ isAddPlaceModalOpen: true }),
      closeAddPlaceModal: () => set({ isAddPlaceModalOpen: false }),
    }),
    {
      name: 'kish-map-prefs',
      // Only persist user preferences — map state resets on reload
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
      }),
    }
  )
);
