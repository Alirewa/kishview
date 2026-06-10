import Link from 'next/link';
import { MapPin, Ticket } from 'lucide-react';

export default function LandingHero() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-sky-950 via-sky-800 to-teal-700">
      {/* Decorative blobs */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-400 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-400 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto" dir="rtl">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-sky-200 text-sm px-4 py-2 rounded-full mb-6 border border-white/20">
          <MapPin className="w-4 h-4" />
          جزیره آزاد کیش — خلیج فارس
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
          کیش ویو
          <br />
          <span className="text-sky-300">راهنمای هوشمند</span>
          <br />
          جزیره کیش
        </h1>

        <p className="text-sky-100 text-lg md:text-xl leading-relaxed mb-8 max-w-xl mx-auto">
          نقشه تعاملی، خرید آنلاین بلیت جاذبه‌های گردشگری، راهنمای سفر و همه چیز درباره زیباترین جزیره ایران
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/map"
            className="inline-flex items-center justify-center gap-2 bg-white text-sky-800 font-bold px-8 py-4 rounded-2xl shadow-xl hover:bg-sky-50 transition-colors text-base"
          >
            <MapPin className="w-5 h-5" />
            مشاهده نقشه کیش
          </Link>
          <Link
            href="/tickets"
            className="inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-white font-bold px-8 py-4 rounded-2xl shadow-xl transition-colors text-base border border-sky-400/30"
          >
            <Ticket className="w-5 h-5" />
            خرید بلیت
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 animate-bounce">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
