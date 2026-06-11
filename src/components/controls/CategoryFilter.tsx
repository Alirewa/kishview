// Developed by @Alirewa — github.com/Alirewa
'use client';
import { useRef, useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAppStore } from '@/store/useAppStore';
import { FILTER_CHIPS } from '@/data/filterChips';

export function CategoryFilter() {
  const { dir } = useLanguage();
  const language         = useAppStore((s) => s.language);
  const selectedCategory = useAppStore((s) => s.selectedCategory);
  const setCategory      = useAppStore((s) => s.setCategory);
  const isSearchOpen     = useAppStore((s) => s.isSearchOpen);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [showShadow, setShowShadow] = useState(true);

  // Show scroll shadow only while there's more content in the trailing direction
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    function check() {
      if (!el) return;
      if (dir === 'rtl') {
        // In RTL, scrollLeft is 0 at the right end (trailing) and negative going left
        setShowShadow(el.scrollLeft < -4);
      } else {
        const remaining = el.scrollWidth - el.clientWidth - el.scrollLeft;
        setShowShadow(remaining > 4);
      }
    }

    check();
    el.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      el.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, [dir, selectedCategory]);

  if (isSearchOpen) return null;

  const isExpanded  = selectedCategory === 'all';
  const activeChip  = FILTER_CHIPS.find((c) => c.id === selectedCategory) ?? FILTER_CHIPS[0];

  function handleChipClick(chipId: string) {
    setCategory(chipId === selectedCategory && chipId !== 'all' ? 'all' : chipId);
  }

  return (
    <div
      dir={dir}
      className="absolute top-[4.5rem] left-0 right-0 z-20 px-3 py-1.5 pointer-events-none"
    >
      {isExpanded ? (
        /* ── Full chip bar with trailing scroll shadow ── */
        <div className="relative pointer-events-auto">
          <div
            ref={scrollRef}
            className="flex items-center gap-2 overflow-x-auto hide-scrollbar"
          >
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
                    'shadow-md shadow-black/10',
                    active
                      ? 'bg-sky-500 text-white border border-sky-400 scale-105'
                      : 'bg-white/95 backdrop-blur-md text-zinc-700 border border-white/60 hover:bg-white',
                  ].join(' ')}
                >
                  <span>{chip.emoji}</span>
                  <span>{language === 'fa' ? chip.fa : chip.en}</span>
                </button>
              );
            })}
          </div>

          {/* Trailing-edge fade shadow — RTL: left side, LTR: right side */}
          {showShadow && (
            <div
              className={[
                'absolute top-0 bottom-0 w-12 pointer-events-none',
                dir === 'rtl'
                  ? 'left-0 bg-gradient-to-r from-white/70 via-white/40 to-transparent'
                  : 'right-0 bg-gradient-to-l from-white/70 via-white/40 to-transparent',
              ].join(' ')}
            />
          )}
        </div>
      ) : (
        /* ── Collapsed: single active chip + chevron to re-expand ── */
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            data-filter-collapsed
            onClick={() => setCategory('all')}
            className="flex items-center gap-1.5 px-3 h-9 rounded-full text-xs font-semibold
                       bg-sky-500 text-white border border-sky-400 shadow-md shadow-black/10
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
