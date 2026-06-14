'use client';
import { useEffect } from 'react';
import { LocateFixed, Globe } from 'lucide-react';
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
        <GeolocateButton />
        <IslandTourButton />
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
      className="absolute bottom-28 right-3 z-20
                 w-12 h-12 rounded-2xl
                 bg-white/90 backdrop-blur-md
                 shadow-md shadow-black/15
                 border border-white/40
                 flex items-center justify-center
                 text-sky-500 cursor-pointer
                 hover:bg-white hover:shadow-lg transition-all"
    >
      <LocateFixed
        size={20}
        className={userPosition ? 'text-sky-500 drop-shadow-[0_0_4px_rgba(14,165,233,0.7)]' : 'text-zinc-500'}
      />
    </button>
  );
}

function IslandTourButton() {
  const islandTour    = useAppStore((s) => s.islandTour);
  const setIslandTour = useAppStore((s) => s.setIslandTour);

  if (islandTour) return null;

  return (
    <button
      onClick={() => setIslandTour(true)}
      className="absolute bottom-3 left-3 right-3 z-20
                 h-13 py-3.5 rounded-2xl
                 bg-gradient-to-l from-sky-500 to-teal-500
                 hover:from-sky-600 hover:to-teal-600
                 text-white font-bold text-sm
                 shadow-lg shadow-sky-500/30
                 flex items-center justify-center gap-2
                 cursor-pointer transition-all active:scale-[0.98]"
    >
      <Globe size={17} />
      جزیره‌گردی سینمایی
    </button>
  );
}
