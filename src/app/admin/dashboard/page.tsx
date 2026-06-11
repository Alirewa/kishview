import { ticketsDb, ordersDb, placesDb } from '@/lib/data';
import { Ticket, ShoppingBag, MapPin, TrendingUp } from 'lucide-react';

export const metadata = { title: 'داشبورد' };

export default function DashboardPage() {
  const tickets = ticketsDb.all();
  const orders = ordersDb.all();
  const places = placesDb.all();
  const revenue = orders
    .filter(o => o.status === 'paid' || o.status === 'confirmed')
    .reduce((s, o) => s + o.grandTotal, 0);

  const stats = [
    { label: 'بلیت‌های فعال', value: tickets.filter(t => t.active).length, icon: Ticket, color: 'sky' },
    { label: 'سفارشات', value: orders.length, icon: ShoppingBag, color: 'violet' },
    { label: 'مکان‌های پیشنهادی', value: places.filter(p => p.status === 'pending').length, icon: MapPin, color: 'amber' },
    { label: 'درآمد (تومان)', value: new Intl.NumberFormat('fa-IR').format(revenue), icon: TrendingUp, color: 'green' },
  ];

  return (
    <div dir="rtl">
      <h1 className="text-2xl font-extrabold text-white mb-8">داشبورد</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(s => (
          <div key={s.label} className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800">
            <div className="flex items-center justify-between mb-4">
              <span className="text-zinc-400 text-sm">{s.label}</span>
              <s.icon className="w-5 h-5 text-zinc-500" />
            </div>
            <div className="text-2xl font-extrabold text-white">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-5">
        <h2 className="text-lg font-bold text-white mb-4">آخرین سفارشات</h2>
        {orders.length === 0 ? (
          <p className="text-zinc-500 text-sm">سفارشی ثبت نشده است</p>
        ) : (
          <div className="space-y-2">
            {orders.slice(-5).reverse().map(o => (
              <div key={o.id} className="flex items-center justify-between py-2 border-b border-zinc-800 last:border-0">
                <div>
                  <div className="text-white text-sm font-medium">{o.customer.name}</div>
                  <div className="text-zinc-500 text-xs">{o.customer.phone}</div>
                </div>
                <div className="text-left">
                  <div className="text-sky-400 font-bold text-sm">{new Intl.NumberFormat('fa-IR').format(o.grandTotal)} تومان</div>
                  <div className={`text-xs mt-0.5 ${
                    o.status === 'paid' || o.status === 'confirmed' ? 'text-green-400' :
                    o.status === 'pending' ? 'text-amber-400' : 'text-zinc-500'
                  }`}>{o.status}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
