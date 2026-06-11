import { BookOpen } from 'lucide-react';

export const metadata = { title: 'مقالات' };

const articles = [
  { title: 'راهنمای کامل سفر به کیش', date: '۱۴۰۵/۳/۱', excerpt: 'همه چیز درباره سفر به جزیره کیش؛ از بهترین زمان سفر تا جاذبه‌های دیدنی' },
  { title: 'بهترین رستوران‌های کیش', date: '۱۴۰۵/۲/۲۰', excerpt: 'معرفی بهترین رستوران‌ها و کافه‌های جزیره کیش برای هر سلیقه و بودجه' },
  { title: 'جاذبه‌های طبیعی کیش', date: '۱۴۰۵/۲/۵', excerpt: 'صخره‌های مرجانی، ساحل‌های زیبا و دیدنی‌های طبیعی کیش' },
];

export default function ArticlesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12" dir="rtl">
      <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-2">مقالات</h1>
      <p className="text-zinc-500 dark:text-zinc-400 mb-10">راهنماها و اطلاعات سفر به کیش</p>
      <div className="space-y-4">
        {articles.map(a => (
          <div key={a.title} className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-100 dark:border-zinc-800 flex gap-4">
            <div className="w-12 h-12 bg-sky-50 dark:bg-sky-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6 text-sky-500" />
            </div>
            <div>
              <h2 className="font-bold text-zinc-900 dark:text-white mb-1">{a.title}</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">{a.excerpt}</p>
              <span className="text-xs text-zinc-400">{a.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
