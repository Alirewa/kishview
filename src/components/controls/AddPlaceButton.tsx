'use client';
import { useAppStore } from '@/store/useAppStore';
import { useLanguage } from '@/context/LanguageContext';

export function AddPlaceButton() {
  const openAddPlaceModal = useAppStore((s) => s.openAddPlaceModal);
  const { t } = useLanguage();

  return (
    <button
      onClick={openAddPlaceModal}
      className="absolute bottom-6 left-4 z-10
                 min-h-[44px] px-3 py-1.5
                 text-xs font-medium
                 text-zinc-500 dark:text-zinc-400
                 hover:text-zinc-800 dark:hover:text-white
                 bg-white/80 dark:bg-black/40
                 backdrop-blur-sm
                 border border-zinc-200/60 dark:border-white/10
                 rounded-xl
                 transition-all duration-200 cursor-pointer
                 hover:border-zinc-300 dark:hover:border-white/20"
    >
      {t.addPlace}
    </button>
  );
}
