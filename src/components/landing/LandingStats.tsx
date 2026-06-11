'use client';
import { useAppStore } from '@/store/useAppStore';

const stats = [
  { fa: { value: '۲ میلیون', label: 'گردشگر سالانه' },        en: { value: '2M+',       label: 'Annual Tourists' } },
  { fa: { value: '۹۱.۵',    label: 'کیلومتر مربع مساحت' },   en: { value: '91.5 km²',  label: 'Island Area' } },
  { fa: { value: '۲۴+',     label: 'جاذبه ثبت‌شده' },         en: { value: '24+',       label: 'Registered Attractions' } },
  { fa: { value: 'بدون ویزا', label: 'برای خارجی‌ها تا ۱۴ روز' }, en: { value: 'Visa-Free', label: 'Up to 14 days for foreigners' } },
];

export default function LandingStats() {
  const language = useAppStore((s) => s.language);
  const isFA = language === 'fa';

  return (
    <section dir={isFA ? 'rtl' : 'ltr'} className="bg-sky-50 dark:bg-sky-950/30 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => {
            const d = isFA ? s.fa : s.en;
            return (
              <div key={d.label} className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
                <div className="text-2xl md:text-3xl font-extrabold text-sky-600 dark:text-sky-400 mb-1">
                  {d.value}
                </div>
                <div className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400">{d.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
