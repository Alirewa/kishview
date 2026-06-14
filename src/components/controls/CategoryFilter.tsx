// Developed by @Alirewa — github.com/Alirewa
'use client';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAppStore } from '@/store/useAppStore';
import { FILTER_CHIPS } from '@/data/filterChips';

export function CategoryFilter() {
  const { dir } = useLanguage();
  const language         = useAppStore((s) => s.language);
  const selectedCategory = useAppStore((s) => s.selectedCategory);
  const setCategory      = useAppStore((s) => s.setCategory);
  const isSearchOpen     = useAppStore((s) => s.isSearchOpen);
  const [open, setOpen]  = useState(false);

  if (isSearchOpen) return null;

  const activeChip = FILTER_CHIPS.find((c) => c.id === selectedCategory) ?? FILTER_CHIPS[0];
  const ActiveIcon = activeChip.icon;

  return (
    <div dir={dir} className="absolute top-[4.5rem] left-0 right-0 z-20 px-3 py-1.5 pointer-events-none sm:hidden">
      {open ? (
        <div className="pointer-events-auto flex items-center gap-2 flex-wrap">
          {FILTER_CHIPS.map((chip) => {
            const active = selectedCategory === chip.id;
            const Icon = chip.icon;
            return (
              <button
                key={chip.id}
                onClick={() => { setCategory(chip.id); setOpen(false); }}
                className={[
                  'flex items-center gap-1.5 whitespace-nowrap px-3 h-9 rounded-full text-xs font-semibold',
                  'transition-all duration-200 cursor-pointer shadow-md shadow-black/10',
                  active
                    ? 'bg-sky-500 text-white border border-sky-400 scale-105'
                    : 'bg-white/95 backdrop-blur-md text-zinc-700 border border-white/60 hover:bg-white',
                ].join(' ')}
              >
                <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{language === 'fa' ? chip.fa : chip.en}</span>
              </button>
            );
          })}
          <button
            onClick={() => setOpen(false)}
            className="flex items-center gap-1 px-3 h-9 rounded-full text-xs font-semibold bg-zinc-200/90 text-zinc-600 cursor-pointer shadow-md shadow-black/10"
          >
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-1.5 px-3 h-9 rounded-full text-xs font-semibold
                       bg-sky-500 text-white border border-sky-400 shadow-md shadow-black/10
                       cursor-pointer hover:bg-sky-600 transition-all"
          >
            <ActiveIcon className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{language === 'fa' ? activeChip.fa : activeChip.en}</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-70" />
          </button>
        </div>
      )}
    </div>
  );
}
