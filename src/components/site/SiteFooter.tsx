import Link from 'next/link';
import { MapPin, Github } from 'lucide-react';

export default function SiteFooter() {
  return (
    <footer className="bg-zinc-900 text-zinc-400 mt-16" dir="rtl">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 text-white font-bold text-lg mb-3">
            <MapPin className="w-5 h-5 text-sky-400" />
            کیش ویو
          </div>
          <p className="text-sm leading-relaxed">
            راهنمای جامع جزیره کیش؛ نقشه، بلیت و اطلاعات گردشگری
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">دسترسی سریع</h3>
          <ul className="space-y-2 text-sm">
            {[
              { href: '/map', label: 'نقشه کیش' },
              { href: '/tickets', label: 'خرید بلیت' },
              { href: '/articles', label: 'مقالات' },
              { href: '/about', label: 'درباره ما' },
              { href: '/contact', label: 'تماس با ما' },
            ].map(l => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-sky-400 transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">ارتباط با ما</h3>
          <ul className="space-y-2 text-sm">
            <li>ایمیل: info@kishview.com</li>
            <li>جزیره آزاد کیش، ایران</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-zinc-800 py-4">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-600">
          <span>© ۱۴۰۵ کیش ویو — تمامی حقوق محفوظ است</span>
          <a
            href="https://github.com/Alirewa"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-zinc-500 hover:text-white transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            Alireza Pourgholam
          </a>
        </div>
      </div>
    </footer>
  );
}
