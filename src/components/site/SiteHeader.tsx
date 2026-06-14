'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, MapPin, Globe, ShoppingCart } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

const navLinks = [
  { href: '/map',      fa: 'نقشه کیش',    en: 'Map' },
  { href: '/tickets',  fa: 'خرید بلیت',   en: 'Tickets' },
  { href: '/articles', fa: 'مقالات',       en: 'Articles' },
  { href: '/about',    fa: 'درباره ما',    en: 'About' },
  { href: '/contact',  fa: 'تماس با ما',   en: 'Contact' },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { language, toggleLanguage } = useAppStore((s) => ({
    language: s.language,
    toggleLanguage: s.toggleLanguage,
  }));

  const isFA = language === 'fa';
  const dir = isFA ? 'rtl' : 'ltr';

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-zinc-900/90 backdrop-blur border-b border-zinc-200 dark:border-zinc-800">
      <div
        className="max-w-6xl mx-auto px-4 h-16 flex items-center gap-4"
        dir={dir}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg text-sky-600 dark:text-sky-400 flex-shrink-0"
        >
          <MapPin className="w-5 h-5" />
          <span>{isFA ? 'کیش ویو' : 'KishView'}</span>
        </Link>

        {/* Desktop nav — centered */}
        <nav className="hidden md:flex items-center gap-6 flex-1 justify-center">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors hover:text-sky-600 dark:hover:text-sky-400 ${
                pathname === l.href
                  ? 'text-sky-600 dark:text-sky-400'
                  : 'text-zinc-600 dark:text-zinc-400'
              }`}
            >
              {isFA ? l.fa : l.en}
            </Link>
          ))}
        </nav>

        {/* Actions: cart + language toggle */}
        <div className="hidden md:flex items-center gap-2 flex-shrink-0">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="تغییر زبان"
          >
            <Globe className="w-4 h-4" />
            <span>{isFA ? 'EN' : 'FA'}</span>
          </button>
          <Link
            href="/cart"
            className="flex items-center gap-1.5 bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            {isFA ? 'سبد خرید' : 'Cart'}
          </Link>
        </div>

        {/* Mobile hamburger — pushed to opposite end of logo */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 ms-auto"
          aria-label="منو"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile nav panel */}
      {mobileOpen && (
        <nav
          className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 pb-4"
          dir={dir}
        >
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-sm font-medium text-zinc-700 dark:text-zinc-300 border-b border-zinc-100 dark:border-zinc-800 last:border-0"
            >
              {isFA ? l.fa : l.en}
            </Link>
          ))}
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => { toggleLanguage(); setMobileOpen(false); }}
              className="flex-1 flex items-center justify-center gap-1 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              <Globe className="w-4 h-4" />
              {isFA ? 'English' : 'فارسی'}
            </button>
            <Link
              href="/cart"
              onClick={() => setMobileOpen(false)}
              className="flex-1 flex items-center justify-center gap-1 py-3 rounded-xl bg-sky-600 text-white text-sm font-medium"
            >
              <ShoppingCart className="w-4 h-4" />
              {isFA ? 'سبد خرید' : 'Cart'}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
