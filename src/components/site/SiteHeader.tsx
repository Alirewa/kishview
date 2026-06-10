'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, MapPin } from 'lucide-react';

const navLinks = [
  { href: '/map', label: 'نقشه کیش' },
  { href: '/tickets', label: 'خرید بلیت' },
  { href: '/articles', label: 'مقالات' },
  { href: '/about', label: 'درباره ما' },
  { href: '/contact', label: 'تماس با ما' },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-zinc-900/90 backdrop-blur border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-sky-600 dark:text-sky-400">
          <MapPin className="w-5 h-5" />
          <span>کیش ویو</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6" dir="rtl">
          {navLinks.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors hover:text-sky-600 dark:hover:text-sky-400 ${
                pathname === l.href
                  ? 'text-sky-600 dark:text-sky-400'
                  : 'text-zinc-600 dark:text-zinc-400'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/cart"
          className="hidden md:inline-flex items-center gap-1 bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
        >
          سبد خرید
        </Link>

        <button
          onClick={() => setOpen(v => !v)}
          className="md:hidden p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          aria-label="منو"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <nav
          className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 pb-4"
          dir="rtl"
        >
          {navLinks.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm font-medium text-zinc-700 dark:text-zinc-300 border-b border-zinc-100 dark:border-zinc-800 last:border-0"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/cart"
            onClick={() => setOpen(false)}
            className="mt-3 block text-center bg-sky-600 text-white text-sm font-medium px-4 py-3 rounded-xl"
          >
            سبد خرید
          </Link>
        </nav>
      )}
    </header>
  );
}
