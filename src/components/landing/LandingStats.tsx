const stats = [
  { value: '۲۴', label: 'جاذبه گردشگری' },
  { value: '۱۸۰', label: 'کیلومتر مربع مساحت' },
  { value: '۷', label: 'بلیت آنلاین' },
  { value: '۳۶۵', label: 'روز آب‌وهوای خوب' },
];

export default function LandingStats() {
  return (
    <section className="bg-sky-50 dark:bg-sky-950/30 py-16" dir="rtl">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map(s => (
            <div key={s.label} className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm">
              <div className="text-3xl font-extrabold text-sky-600 dark:text-sky-400 mb-1">{s.value}</div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
