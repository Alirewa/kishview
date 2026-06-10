import Link from 'next/link';
import { MapPin } from 'lucide-react';

export default function LandingMap() {
  return (
    <section className="py-20 bg-white dark:bg-zinc-950" dir="rtl">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-gradient-to-br from-sky-900 to-teal-800 rounded-3xl overflow-hidden flex flex-col md:flex-row items-center gap-0">
          <div className="flex-1 p-10 md:p-14">
            <h2 className="text-3xl font-extrabold text-white mb-4">
              نقشه تعاملی کیش
            </h2>
            <p className="text-sky-200 leading-relaxed mb-8">
              جاذبه‌های گردشگری، رستوران‌ها، مراکز خرید، پمپ‌بنزین‌ها و سرویس‌های بهداشتی روی نقشه سه‌بعدی کیش
            </p>
            <Link
              href="/map"
              className="inline-flex items-center gap-2 bg-white text-sky-800 font-bold px-6 py-3 rounded-xl hover:bg-sky-50 transition-colors"
            >
              <MapPin className="w-4 h-4" />
              باز کردن نقشه
            </Link>
          </div>

          <div className="flex-1 h-56 md:h-72 bg-sky-800/50 flex items-center justify-center w-full relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('/map-preview.png')] bg-cover bg-center" />
            <div className="relative z-10 grid grid-cols-3 gap-3 px-8">
              {['پارک دلفین', 'آکواریوم', 'باغ پرندگان', 'بولینگ', 'ساحل', 'فرودگاه'].map(n => (
                <div key={n} className="bg-white/10 backdrop-blur-sm text-white text-xs text-center py-2 px-1 rounded-lg border border-white/20">
                  {n}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
