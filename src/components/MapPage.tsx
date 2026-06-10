'use client';
import { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { LanguageProvider } from '@/context/LanguageContext';
import { KishMap } from './Map/KishMap';
import { TopBar } from './controls/TopBar';
import { CategoryFilter } from './controls/CategoryFilter';
import { MapControlsPanel } from './controls/MapControlsPanel';
import { MenuDrawer } from './controls/MenuDrawer';
import { PlaceSidebar } from './Overlay/PlaceSidebar';
import { PlaceInfoSheet } from './Overlay/PlaceInfoSheet';
import { AddPlaceModal } from './Modals/AddPlaceModal';

export default function MapPage() {
  const theme = useAppStore((s) => s.theme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <LanguageProvider>
      <div className="relative h-screen w-screen overflow-hidden">
        <KishMap />
        <TopBar />
        <CategoryFilter />
        <MapControlsPanel />
        <MenuDrawer />
        <PlaceSidebar />
        <PlaceInfoSheet />
        <AddPlaceModal />
      </div>
    </LanguageProvider>
  );
}
