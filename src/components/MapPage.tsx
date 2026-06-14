'use client';
import { useEffect } from 'react';
import { LocateFixed } from 'lucide-react';
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
  const islandTour = useAppStore((s) => s.islandTour);

  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  return (
    <LanguageProvider>
      <div className="relative h-screen w-screen overflow-hidden bg-white">
        <KishMap />

        {/* All UI controls fade out during island tour */}
        <div
          style={{
            opacity: islandTour ? 0 : 1,
            pointerEvents: islandTour ? 'none' : 'auto',
            transition: 'opacity 0.6s ease',
          }}
        >
          <TopBar />
          <CategoryFilter />
          <MapControlsPanel />
          <GeolocateButton />
        </div>

        {/* Always visible overlays */}
        <MenuDrawer />
        <PlaceSidebar />
        <ClickedPointPanel />
        <PlaceInfoSheet />
        <AddPlaceModal />
      </div>
    </LanguageProvider>
  );
}

function GeolocateButton() {
  const userPosition = useAppStore((s) => s.userPosition);

  function handleClick() {
    window.dispatchEvent(new Event('kishview:geolocate'));
  }

  return (
    <button
      onClick={handleClick}
      title="موقعیت من"
      className="absolute bottom-6 right-4 z-20
                 w-12 h-12 rounded-2xl
                 bg-white/90 backdrop-blur-md
                 shadow-md shadow-black/15
                 border border-white/40
                 flex items-center justify-center
                 cursor-pointer hover:bg-white hover:shadow-lg transition-all"
    >
      <LocateFixed
        size={20}
        className={userPosition ? 'text-sky-500 drop-shadow-[0_0_4px_rgba(14,165,233,0.7)]' : 'text-zinc-500'}
      />
    </button>
  );
}
