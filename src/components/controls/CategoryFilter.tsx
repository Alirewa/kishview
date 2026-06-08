'use client';
import { useLanguage } from '@/context/LanguageContext';
import { useAppStore } from '@/store/useAppStore';
import { FILTER_CHIPS } from '@/data/filterChips';

export function CategoryFilter() {
  const { dir } = useLanguage();
  const language = useAppStore((s) => s.language);
  const { selectedCategory, setCategory, isSearchOpen } = useAppStore((s) => ({
    selectedCategory: s.selectedCategory,
    setCategory:      s.setCategory,
    isSearchOpen:     s.isSearchOpen,
  }));

  if (isSearchOpen) return null;

  return (
    <div
      dir={dir}
      className="absolute top-[4.5rem] left-0 right-0 z-20
                 flex items-center
                 px-3 py-1.5
                 overflow-x-auto hide-scrollbar
                 pointer-events-none"
    >
      <div className="flex items-center gap-2 pointer-events-auto">
        {FILTER_CHIPS.map((chip) => {
          const active = selectedCategory === chip.id;
          return (
            <button
              key={chip.id}
              onClick={() => setCategory(chip.id)}
              className={[
                'flex items-center gap-1.5 whitespace-nowrap',
                'px-3 h-8 rounded-full text-xs font-semibold',
                'transition-all duration-200 cursor-pointer',
                'shadow-md shadow-black/15',
                active
                  ? 'bg-sky-500 text-white border border-sky-400'
                  : 'bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md text-zinc-700 dark:text-zinc-300 border border-white/40 dark:border-white/10 hover:bg-white dark:hover:bg-zinc-800',
              ].join(' ')}
            >
              <span>{chip.emoji}</span>
              <span>{language === 'fa' ? chip.fa : chip.en}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
