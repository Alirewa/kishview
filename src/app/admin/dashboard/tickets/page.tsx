import { ticketsDb } from '@/lib/data';
import Link from 'next/link';
import { Plus, Pencil, ToggleLeft, ToggleRight } from 'lucide-react';
import TicketToggle from './TicketToggle';

export const metadata = { title: 'مدیریت بلیت‌ها' };

export default function AdminTicketsPage() {
  const tickets = ticketsDb.all();

  return (
    <div dir="rtl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-extrabold text-white">بلیت‌ها</h1>
        <Link
          href="/admin/dashboard/tickets/new"
          className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" />
          بلیت جدید
        </Link>
      </div>

      <div className="space-y-3">
        {tickets.map(t => (
          <div key={t.id} className="bg-zinc-900 rounded-xl border border-zinc-800 p-4 flex items-center justify-between">
            <div>
              <div className="text-white font-semibold">{t.name}</div>
              <div className="text-zinc-500 text-sm mt-0.5">{t.sessions.length} نوبت</div>
            </div>
            <div className="flex items-center gap-3">
              <TicketToggle ticketId={t.id} active={t.active} />
              <Link
                href={`/admin/dashboard/tickets/${t.id}`}
                className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <Pencil className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
