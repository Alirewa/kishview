import { MapPin, Ticket, Compass, Smartphone } from 'lucide-react';

const features = [
  {
    icon: MapPin,
    title: 'نقشه تعاملی ۳بعدی',
    desc: 'نقشه کامل جزیره کیش با نمایش ساختمان‌های سه‌بعدی، دسته‌بندی اماکن و موقعیت زنده کاربر',
  },
  {
    icon: Ticket,
    title: 'خرید آنلاین بلیت',
    desc: 'خرید بلیت پارک دلفین، آکواریوم، باغ پرندگان، بولینگ و بسیاری از جاذبه‌های دیگر',
  },
  {
    icon: Compass,
    title: 'راهنمای مسیریابی',
    desc: 'دریافت مسیر از موقعیت فعلی شما تا هر جاذبه‌ای در کیش با یک کلیک',
  },
  {
    icon: Smartphone,
    title: 'نصب روی موبایل',
    desc: 'کیش ویو را مثل یک اپلیکیشن روی گوشی اندروید یا آیفون خود نصب کنید',
  },
];

export default function LandingFeatures() {
  return (
    <section className="py-20 bg-white dark:bg-zinc-950" dir="rtl">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-3">
            چرا کیش ویو؟
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
            همه چیزی که برای سفر به کیش نیاز دارید در یک پلتفرم
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(f => (
            <div
              key={f.title}
              className="bg-sky-50 dark:bg-zinc-900 rounded-2xl p-6 flex flex-col gap-4 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-sky-100 dark:bg-sky-900/50 rounded-xl flex items-center justify-center">
                <f.icon className="w-6 h-6 text-sky-600 dark:text-sky-400" />
              </div>
              <div>
                <h3 className="font-bold text-zinc-900 dark:text-white mb-1">{f.title}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
