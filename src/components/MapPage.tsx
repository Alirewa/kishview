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
import { ClickedPointPanel } from './Overlay/ClickedPointPanel';

export default function MapPage() {
  useEffect(() => {
    // Map page is always light — ensure no dark class on root
    document.documentElement.classList.remove('dark');
  }, []);

  return (
    <LanguageProvider>
      <div className="relative h-screen w-screen overflow-hidden bg-white">
        <KishMap />
        <TopBar />
        <CategoryFilter />
        <MapControlsPanel />
        <MenuDrawer />
        <PlaceSidebar />
        <ClickedPointPanel />
        <PlaceInfoSheet />
        <AddPlaceModal />
      </div>
    </LanguageProvider>
  );
}
