import { ordersDb } from '@/lib/data';
import OrderActions from './OrderActions';

export const metadata = { title: 'سفارشات' };

const STATUS_LABELS: Record<string, string> = {
  pending: 'در انتظار',
  paid: 'پرداخت شده',
  confirmed: 'تأیید شده',
  rejected: 'رد شده',
  receipt_uploaded: 'رسید آپلود شد',
};

const STATUS_COLORS: Record<string, string> = {
  pending: 'text-amber-400',
  paid: 'text-green-400',
  confirmed: 'text-sky-400',
  rejected: 'text-red-400',
  receipt_uploaded: 'text-violet-400',
};

export default function OrdersPage() {
  const orders = ordersDb.all().reverse();

  return (
    <div dir="rtl">
      <h1 className="text-2xl font-extrabold text-white mb-8">سفارشات</h1>
      <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800 text-zinc-400">
              <th className="text-right p-4 font-medium">مشتری</th>
              <th className="text-right p-4 font-medium">موبایل</th>
              <th className="text-right p-4 font-medium">مبلغ</th>
              <th className="text-right p-4 font-medium">وضعیت</th>
              <th className="text-right p-4 font-medium">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} className="border-b border-zinc-800/50 last:border-0">
                <td className="p-4 text-white">{o.customer.name}</td>
                <td className="p-4 text-zinc-400 font-mono">{o.customer.phone}</td>
                <td className="p-4 text-sky-400 font-bold">{new Intl.NumberFormat('fa-IR').format(o.grandTotal)} ت</td>
                <td className={`p-4 font-medium ${STATUS_COLORS[o.status] ?? 'text-zinc-400'}`}>
                  {STATUS_LABELS[o.status] ?? o.status}
                </td>
                <td className="p-4">
                  <OrderActions orderId={o.id} currentStatus={o.status} receiptUrl={o.receiptUrl} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <div className="text-center py-12 text-zinc-500">سفارشی ثبت نشده است</div>
        )}
      </div>
    </div>
  );
}
