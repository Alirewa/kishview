import { MapPin, Users, Star } from 'lucide-react';

export const metadata = { title: 'درباره ما' };

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12" dir="rtl">
      <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-4">درباره کیش ویو</h1>
      <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed mb-10">
        کیش ویو یک پلتفرم گردشگری دیجیتال برای جزیره آزاد کیش است. هدف ما ساده کردن تجربه سفر به کیش از طریق نقشه تعاملی، خرید آنلاین بلیت و اطلاعات به‌روز جاذبه‌های گردشگری است.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: MapPin, title: 'نقشه تعاملی', desc: 'بیش از ۲۴ مکان گردشگری روی نقشه سه‌بعدی' },
          { icon: Star, title: 'بلیت آنلاین', desc: 'خرید سریع و مطمئن بلیت جاذبه‌های کیش' },
          { icon: Users, title: 'راهنمای سفر', desc: 'اطلاعات جامع برای گردشگران ایرانی و خارجی' },
        ].map(item => (
          <div key={item.title} className="bg-sky-50 dark:bg-zinc-900 rounded-2xl p-6 text-center">
            <item.icon className="w-8 h-8 text-sky-500 mx-auto mb-3" />
            <h3 className="font-bold text-zinc-900 dark:text-white mb-1">{item.title}</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
