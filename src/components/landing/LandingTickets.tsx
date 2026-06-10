import Link from 'next/link';
import { ArrowLeft, Ticket } from 'lucide-react';

const featured = [
  { id: 'dolphin-park', name: 'پارک دلفین کیش', price: 450000, image: null },
  { id: 'kish-aquarium', name: 'آکواریوم کیش', price: 200000, image: null },
  { id: 'bird-garden', name: 'باغ پرندگان کیش', price: 100000, image: null },
];

function formatPrice(p: number) {
  return new Intl.NumberFormat('fa-IR').format(p) + ' تومان';
}

export default function LandingTickets() {
  return (
    <section className="py-20 bg-zinc-50 dark:bg-zinc-900" dir="rtl">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-2">بلیت‌های آنلاین</h2>
            <p className="text-zinc-500 dark:text-zinc-400">خرید مستقیم و بدون واسطه</p>
          </div>
          <Link href="/tickets" className="flex items-center gap-1 text-sky-600 dark:text-sky-400 text-sm font-medium hover:gap-2 transition-all">
            همه بلیت‌ها <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map(t => (
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
                  {t.name}
                </h3>
                <p className="text-sky-600 dark:text-sky-400 font-semibold text-sm">
                  از {formatPrice(t.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
