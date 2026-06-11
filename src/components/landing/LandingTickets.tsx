'use client';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Ticket } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

const featured = [
  {
    id: 'dolphin-park',
    fa: { name: 'پارک دلفین کیش', desc: 'تماشای دلفین‌های آموزش‌دیده، شنا با دلفین، نمایش‌های آبی' },
    en: { name: 'Kish Dolphin Park', desc: 'Watch trained dolphins, swim with dolphins, water shows' },
    price: 450000,
  },
  {
    id: 'kish-aquarium',
    fa: { name: 'آکواریوم کیش', desc: 'بزرگ‌ترین آکواریوم ایران با صدها گونه آبزی خلیج فارس' },
    en: { name: 'Kish Aquarium', desc: "Iran's largest aquarium with hundreds of Persian Gulf marine species" },
    price: 200000,
  },
  {
    id: 'bird-garden',
    fa: { name: 'باغ پرندگان کیش', desc: 'بیش از ۲۰۰ گونه پرنده از سراسر جهان در محیطی طبیعی' },
    en: { name: 'Kish Bird Garden', desc: 'Over 200 bird species from around the world in a natural setting' },
    price: 100000,
  },
];

function formatPrice(p: number, fa: boolean) {
  const n = new Intl.NumberFormat('fa-IR').format(p);
  return fa ? `از ${n} تومان` : `From ₺${new Intl.NumberFormat('en').format(p)}`;
}

export default function LandingTickets() {
  const language = useAppStore((s) => s.language);
  const isFA = language === 'fa';

  return (
    <section dir={isFA ? 'rtl' : 'ltr'} className="py-20 bg-zinc-50 dark:bg-zinc-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-2">
              {isFA ? 'بلیت‌های آنلاین' : 'Online Tickets'}
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              {isFA ? 'خرید مستقیم، بدون واسطه' : 'Direct purchase, no middleman'}
            </p>
          </div>
          <Link
            href="/tickets"
            className="flex items-center gap-1 text-sky-600 dark:text-sky-400 text-sm font-medium hover:gap-2 transition-all"
          >
            {isFA ? 'همه بلیت‌ها' : 'All Tickets'}
            {isFA ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((t) => {
            const d = isFA ? t.fa : t.en;
            return (
              <Link
                key={t.id}
                href={`/tickets/${t.id}`}
                className="bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="h-44 bg-gradient-to-br from-sky-100 to-teal-100 dark:from-sky-900 dark:to-teal-900 flex items-center justify-center">
                  <Ticket className="w-12 h-12 text-sky-400" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-zinc-900 dark:text-white mb-1 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                    {d.name}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2 line-clamp-2">{d.desc}</p>
                  <p className="text-sky-600 dark:text-sky-400 font-semibold text-sm">
                    {formatPrice(t.price, isFA)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
