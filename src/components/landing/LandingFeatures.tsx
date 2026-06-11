'use client';
import { MapPin, Ticket, Compass, Smartphone } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

const features = [
  {
    icon: MapPin,
    fa: { title: 'نقشه تعاملی ۳بعدی', desc: 'نقشه کامل جزیره کیش با نمایش ساختمان‌های سه‌بعدی، دسته‌بندی اماکن و موقعیت زنده کاربر' },
    en: { title: 'Interactive 3D Map',   desc: 'Full map of Kish Island with 3D buildings, place categories, and live user location' },
  },
  {
    icon: Ticket,
    fa: { title: 'خرید آنلاین بلیت',   desc: 'بلیت پارک دلفین، آکواریوم، باغ پرندگان، پارک برفی، تونل باد و بیشتر' },
    en: { title: 'Online Ticket Shop',   desc: 'Dolphin Park, Aquarium, Bird Garden, Snow Park, Wind Tunnel, and more' },
  },
  {
    icon: Compass,
    fa: { title: 'مسیریابی هوشمند',    desc: 'دریافت مسیر از موقعیت فعلی شما تا هر جاذبه‌ای در کیش — فقط اگر در کیش باشید' },
    en: { title: 'Smart Navigation',     desc: 'Get directions from your current location to any attraction on the island' },
  },
  {
    icon: Smartphone,
    fa: { title: 'نصب روی موبایل',     desc: 'کیش ویو را مثل یک اپ روی آیفون یا اندروید نصب کنید — بدون نیاز به اپ‌استور' },
    en: { title: 'Install as App',       desc: 'Install KishView like an app on iPhone or Android — no App Store needed' },
  },
];

export default function LandingFeatures() {
  const language = useAppStore((s) => s.language);
  const isFA = language === 'fa';

  return (
    <section dir={isFA ? 'rtl' : 'ltr'} className="py-12 sm:py-20 bg-white dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mb-2 sm:mb-3">
            {isFA ? 'چرا کیش ویو؟' : 'Why KishView?'}
          </h2>
          <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto px-4 sm:px-0">
            {isFA
              ? 'همه چیزی که برای سفر به کیش نیاز دارید در یک پلتفرم'
              : 'Everything you need for your Kish Island trip, in one platform'}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((f) => {
            const d = isFA ? f.fa : f.en;
            return (
              <div
                key={f.fa.title}
                className="bg-sky-50 dark:bg-zinc-900 rounded-2xl p-5 sm:p-6 flex flex-col gap-3 sm:gap-4 hover:shadow-md transition-shadow"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 bg-sky-100 dark:bg-sky-900/50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <f.icon className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600 dark:text-sky-400" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-white mb-1 text-sm sm:text-base">{d.title}</h3>
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{d.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
