'use client';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

const places = [
  { fa: 'پارک دلفین', en: 'Dolphin Park' },
  { fa: 'آکواریوم',   en: 'Aquarium' },
  { fa: 'باغ پرندگان', en: 'Bird Garden' },
  { fa: 'بولینگ',     en: 'Bowling' },
  { fa: 'ساحل مرجانی', en: 'Coral Beach' },
  { fa: 'فرودگاه',    en: 'Airport' },
];

export default function LandingMap() {
  const language = useAppStore((s) => s.language);
  const isFA = language === 'fa';

  return (
    <section dir={isFA ? 'rtl' : 'ltr'} className="py-20 bg-white dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-gradient-to-br from-sky-900 to-teal-800 rounded-3xl overflow-hidden flex flex-col md:flex-row items-center">
          <div className="flex-1 p-10 md:p-14">
            <h2 className="text-3xl font-extrabold text-white mb-4">
              {isFA ? 'نقشه تعاملی کیش' : 'Interactive Kish Map'}
            </h2>
            <p className="text-sky-200 leading-relaxed mb-6">
              {isFA
                ? 'جاذبه‌های گردشگری، رستوران‌ها، مراکز خرید، پمپ‌بنزین‌ها و سرویس‌های بهداشتی روی نقشه سه‌بعدی کیش. موقعیت فعلی شما هم نمایش داده می‌شود.'
                : 'Tourist attractions, restaurants, malls, gas stations, and restrooms on a 3D map of Kish. Your live location is also shown.'}
            </p>
            <ul className="text-sky-300 text-sm space-y-1.5 mb-8">
              {[
                isFA ? '🏖 ساحل مرجانی و کشتی یونانی' : '🏖 Coral Beach & Greek Ship',
                isFA ? '🐬 پارک دلفین و آکواریوم' : '🐬 Dolphin Park & Aquarium',
                isFA ? '🛒 مال‌ها و مراکز خرید' : '🛒 Malls & Shopping Centers',
                isFA ? '⛽ پمپ‌بنزین و خدمات' : '⛽ Gas Stations & Services',
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link
              href="/map"
              className="inline-flex items-center gap-2 bg-white text-sky-800 font-bold px-6 py-3 rounded-xl hover:bg-sky-50 transition-colors"
            >
              <MapPin className="w-4 h-4" />
              {isFA ? 'باز کردن نقشه' : 'Open Map'}
            </Link>
          </div>

          <div className="flex-1 h-56 md:h-80 bg-sky-800/50 flex items-center justify-center w-full relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('/map-preview.png')] bg-cover bg-center" />
            <div className="relative z-10 grid grid-cols-3 gap-3 px-8">
              {places.map((p) => (
                <div
                  key={p.fa}
                  className="bg-white/10 backdrop-blur-sm text-white text-xs text-center py-2 px-1 rounded-lg border border-white/20"
                >
                  {isFA ? p.fa : p.en}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
