'use client';
import { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { LanguageProvider } from '@/context/LanguageContext';
import { KishMap } from './Map/KishMap';
import { TopBar } from './controls/TopBar';
import { AddPlaceButton } from './controls/AddPlaceButton';
import { PlaceSidebar } from './Overlay/PlaceSidebar';
import { AddPlaceModal } from './Modals/AddPlaceModal';

export default function MapPage() {
  const theme = useAppStore((s) => s.theme);

  // Sync theme class to <html> element for Tailwind dark: variants
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

        {/* Floating glassmorphism top bar */}
        <TopBar />

        {/* Minimal corner CTA */}
        <AddPlaceButton />

        {/* vaul right-side drawer (place details) */}
        <PlaceSidebar />

        {/* Radix Dialog (add-place info) */}
        <AddPlaceModal />
      </div>
    </LanguageProvider>
  );
}
