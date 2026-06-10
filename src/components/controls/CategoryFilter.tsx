'use client';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAppStore } from '@/store/useAppStore';
import { FILTER_CHIPS } from '@/data/filterChips';

export function CategoryFilter() {
  const { dir } = useLanguage();
  const language = useAppStore((s) => s.language);
  const selectedCategory = useAppStore((s) => s.selectedCategory);
  const setCategory = useAppStore((s) => s.setCategory);
  const isSearchOpen = useAppStore((s) => s.isSearchOpen);

  if (isSearchOpen) return null;

  const isExpanded = selectedCategory === 'all';
  const activeChip = FILTER_CHIPS.find((c) => c.id === selectedCategory) ?? FILTER_CHIPS[0];

  function handleChipClick(chipId: string) {
    setCategory(chipId === selectedCategory && chipId !== 'all' ? 'all' : chipId);
  }

  return (
    <div
      dir={dir}
      className="absolute top-[4.5rem] left-0 right-0 z-20 px-3 py-1.5 pointer-events-none"
    >
      {isExpanded ? (
        /* ── Full chip bar ── */
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pointer-events-auto">
          {FILTER_CHIPS.map((chip) => {
            const active = selectedCategory === chip.id;
            return (
              <button
                key={chip.id}
                data-category={chip.id}
                onClick={() => handleChipClick(chip.id)}
                className={[
                  'flex items-center gap-1.5 whitespace-nowrap flex-shrink-0',
                  'px-3 h-9 rounded-full text-xs font-semibold',
                  'transition-all duration-200 cursor-pointer',
                  'shadow-md shadow-black/15',
                  active
                    ? 'bg-sky-500 text-white border border-sky-400 scale-105'
                    : 'bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md text-zinc-700 dark:text-zinc-300 border border-white/40 dark:border-white/10 hover:bg-white dark:hover:bg-zinc-800',
                ].join(' ')}
              >
                <span>{chip.emoji}</span>
                <span>{language === 'fa' ? chip.fa : chip.en}</span>
              </button>
            );
          })}
        </div>
      ) : (
        /* ── Collapsed: single active chip + chevron to re-expand ── */
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            data-filter-collapsed
            onClick={() => setCategory('all')}
            className="flex items-center gap-1.5 px-3 h-9 rounded-full text-xs font-semibold
                       bg-sky-500 text-white border border-sky-400 shadow-md shadow-black/15
                       cursor-pointer transition-all hover:bg-sky-600"
          >
            <span>{activeChip.emoji}</span>
            <span>{language === 'fa' ? activeChip.fa : activeChip.en}</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-70" />
          </button>
        </div>
      )}
    </div>
  );
}
