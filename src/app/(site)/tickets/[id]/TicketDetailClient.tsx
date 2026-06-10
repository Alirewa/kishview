'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Ticket, Clock, Users, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import type { Ticket as TicketType, TicketSession } from '@/types/shop';

function formatPrice(p: number) {
  return new Intl.NumberFormat('fa-IR').format(p) + ' تومان';
}

export default function TicketDetailClient({ ticket }: { ticket: TicketType }) {
  const router = useRouter();
  const addItem = useCartStore(s => s.addItem);
  const [selectedSession, setSelectedSession] = useState<TicketSession>(ticket.sessions[0]);
  const [date, setDate] = useState('');
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    if (!date) return;
    addItem({
      ticketId: ticket.id,
      ticketName: ticket.name,
      sessionId: selectedSession.id,
      sessionName: selectedSession.name,
      date,
      qty,
      unitPrice: selectedSession.price,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12" dir="rtl">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm border border-zinc-100 dark:border-zinc-800">
        <div className="h-56 bg-gradient-to-br from-sky-100 to-teal-100 dark:from-sky-900/40 dark:to-teal-900/40 flex items-center justify-center">
          {ticket.imageUrl ? (
            <img src={ticket.imageUrl} alt={ticket.name} className="h-full w-full object-cover" />
          ) : (
            <Ticket className="w-16 h-16 text-sky-400" />
          )}
        </div>

        <div className="p-6">
          <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-white mb-2">{ticket.name}</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">{ticket.description}</p>

          {/* Session picker */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">نوع بلیت / نوبت</label>
            <div className="grid grid-cols-2 gap-2">
              {ticket.sessions.map(s => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSession(s)}
                  className={`p-3 rounded-xl border text-right transition-all ${
                    selectedSession.id === s.id
                      ? 'border-sky-500 bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300'
                      : 'border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-sky-300'
                  }`}
                >
                  <div className="font-semibold text-sm">{s.name}</div>
                  {s.time && <div className="text-xs text-zinc-500 mt-0.5 flex items-center gap-1"><Clock className="w-3 h-3"/>{s.time}</div>}
                  <div className="text-sky-600 dark:text-sky-400 font-bold text-sm mt-1">{formatPrice(s.price)}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Date picker */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">تاریخ بازدید</label>
            <input
              type="date"
              value={date}
              min={new Date().toISOString().split('T')[0]}
              onChange={e => setDate(e.target.value)}
              className="w-full border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Qty picker */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">تعداد</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQty(q => Math.max(1, q - 1))}
                className="w-10 h-10 rounded-xl border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-xl font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
              >−</button>
              <span className="text-lg font-bold text-zinc-900 dark:text-white w-8 text-center">{qty}</span>
              <button
                onClick={() => setQty(q => q + 1)}
                className="w-10 h-10 rounded-xl border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-xl font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
              >+</button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm text-zinc-500">جمع کل</div>
              <div className="text-xl font-extrabold text-sky-600 dark:text-sky-400">
                {formatPrice(selectedSession.price * qty)}
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={!date}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all ${
                !date
                  ? 'bg-zinc-300 dark:bg-zinc-700 cursor-not-allowed'
                  : added
                  ? 'bg-green-500'
                  : 'bg-sky-600 hover:bg-sky-700'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              {added ? 'اضافه شد ✓' : 'افزودن به سبد'}
            </button>
          </div>

          {added && (
            <button
              onClick={() => router.push('/cart')}
              className="mt-3 w-full py-3 rounded-xl border border-sky-500 text-sky-600 dark:text-sky-400 font-semibold hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-colors"
            >
              مشاهده سبد خرید →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
