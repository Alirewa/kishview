'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Place, Theme, Language } from '@/types';

interface AppState {
  // Persisted preferences
  theme: Theme;
  language: Language;
  // Transient state
  selectedPlace: Place | null;
  isOverlayOpen: boolean;
  isAddPlaceModalOpen: boolean;
  isMenuOpen: boolean;
  // Actions
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  selectPlace: (place: Place) => void;
  clearSelection: () => void;
  openAddPlaceModal: () => void;
  closeAddPlaceModal: () => void;
  openMenu: () => void;
  closeMenu: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'dark',
      language: 'fa',
      selectedPlace: null,
      isOverlayOpen: false,
      isAddPlaceModalOpen: false,
      isMenuOpen: false,

      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),
      setLanguage: (language) => set({ language }),
      toggleLanguage: () => set((s) => ({ language: s.language === 'fa' ? 'en' : 'fa' })),
      selectPlace: (place) => set({ selectedPlace: place, isOverlayOpen: true }),
      clearSelection: () => set({ selectedPlace: null, isOverlayOpen: false }),
      openAddPlaceModal: () => set({ isAddPlaceModalOpen: true }),
      closeAddPlaceModal: () => set({ isAddPlaceModalOpen: false }),
      openMenu: () => set({ isMenuOpen: true }),
      closeMenu: () => set({ isMenuOpen: false }),
    }),
    {
      name: 'kishview-prefs',
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
      }),
    }
  )
);
