import Link from 'next/link';
import { Clock, Users } from 'lucide-react';
import type { Ticket as TicketType } from '@/types/shop';
import { TicketImage } from '@/components/TicketImage';

async function getTickets(): Promise<TicketType[]> {
  const { ticketsDb } = await import('@/lib/data');
  return ticketsDb.active();
}

function formatPrice(p: number) {
  return new Intl.NumberFormat('fa-IR').format(p) + ' تومان';
}

export const metadata = { title: 'خرید بلیت' };

export default async function TicketsPage() {
  const tickets = await getTickets();

  return (
    <div className="max-w-5xl mx-auto px-4 py-12" dir="rtl">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-2">خرید بلیت</h1>
        <p className="text-zinc-500 dark:text-zinc-400">بلیت جاذبه‌های گردشگری کیش را آنلاین بخرید</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map(t => {
          const minPrice = Math.min(...t.sessions.map(s => s.price));
          return (
            <Link
              key={t.id}
              href={`/tickets/${t.id}`}
              className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group border border-zinc-100 dark:border-zinc-800"
            >
              <div className="h-48 bg-gradient-to-br from-sky-100 to-teal-100 dark:from-sky-900/40 dark:to-teal-900/40 flex items-center justify-center">
                <TicketImage src={t.imageUrl} alt={t.name} className="h-full w-full object-cover" />
              </div>
              <div className="p-5">
                <h2 className="font-bold text-zinc-900 dark:text-white text-lg mb-1 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                  {t.name}
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3 line-clamp-2">{t.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sky-600 dark:text-sky-400 font-semibold text-sm">
                    از {formatPrice(minPrice)}
                  </span>
                  <div className="flex gap-2 text-xs text-zinc-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {t.sessions.length} نوبت
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
