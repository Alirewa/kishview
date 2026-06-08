'use client';
import { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { LanguageProvider } from '@/context/LanguageContext';
import { KishMap } from './Map/KishMap';
import { TopBar } from './controls/TopBar';
import { MenuDrawer } from './controls/MenuDrawer';
import { PlaceSidebar } from './Overlay/PlaceSidebar';
import { AddPlaceModal } from './Modals/AddPlaceModal';

export default function MapPage() {
  const theme = useAppStore((s) => s.theme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <LanguageProvider>
      <div className="relative h-screen w-screen overflow-hidden">
        {/* Full-screen map — always behind everything */}
        <KishMap />

        {/* Glassmorphism top bar */}
        <TopBar />

        {/* Side menu drawer */}
        <MenuDrawer />

        {/* Bottom card — slides up when a place is selected */}
        <PlaceSidebar />

        {/* Add-place dialog */}
        <AddPlaceModal />
      </div>
    </LanguageProvider>
  );
}
