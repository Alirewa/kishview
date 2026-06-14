import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ordersDb } from '@/lib/data';
import { ArrowRight, User, Phone, Hash, Mail, Clock, Package } from 'lucide-react';
import OrderActions from '../OrderActions';

export const metadata = { title: 'جزئیات سفارش' };

function fmt(n: number) { return new Intl.NumberFormat('fa-IR').format(n); }

const STATUS_LABELS: Record<string, string> = {
  pending: 'در انتظار', paid: 'پرداخت شده', confirmed: 'تأیید شده',
  rejected: 'رد شده', receipt_uploaded: 'رسید آپلود شد',
};
const STATUS_COLORS: Record<string, string> = {
  pending: 'text-amber-400', paid: 'text-green-400', confirmed: 'text-sky-400',
  rejected: 'text-red-400', receipt_uploaded: 'text-violet-400',
};

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const order = ordersDb.find(params.id);
  if (!order) notFound();

  return (
    <div dir="rtl">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/dashboard/orders" className="text-zinc-400 hover:text-white transition-colors">
          <ArrowRight className="w-5 h-5 rotate-180" />
        </Link>
        <h1 className="text-2xl font-extrabold text-white">جزئیات سفارش</h1>
        <span className={`text-sm font-bold px-3 py-1 rounded-full bg-zinc-800 ${STATUS_COLORS[order.status] ?? 'text-zinc-400'}`}>
          {STATUS_LABELS[order.status] ?? order.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer info */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-5">
            <h2 className="text-white font-bold mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-zinc-500" /> اطلاعات مشتری
            </h2>
            <div className="space-y-3">
              <InfoRow icon={<User size={14} />}  label="نام"      value={order.customer.name} />
              <InfoRow icon={<Phone size={14} />} label="موبایل"   value={order.customer.phone} mono />
              <InfoRow icon={<Hash size={14} />}  label="کد ملی"   value={order.customer.nationalId} mono />
              {order.customer.email && (
                <InfoRow icon={<Mail size={14} />} label="ایمیل" value={order.customer.email} />
              )}
            </div>
          </div>

          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-5">
            <h2 className="text-white font-bold mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-zinc-500" /> اطلاعات سفارش
            </h2>
            <div className="space-y-3">
              <InfoRow label="شناسه" value={order.id.slice(0, 8) + '...'} mono />
              <InfoRow label="تاریخ ثبت" value={new Date(order.createdAt).toLocaleDateString('fa-IR')} />
              <InfoRow label="مبلغ کل" value={`${fmt(order.grandTotal)} تومان`} highlight />
              {order.discountAmount > 0 && (
                <InfoRow label="تخفیف" value={`−${fmt(order.discountAmount)} تومان`} />
              )}
              {order.discountCode && (
                <InfoRow label="کد تخفیف" value={order.discountCode} mono />
              )}
            </div>
          </div>
        </div>

        {/* Items + actions */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
            <div className="px-5 py-4 border-b border-zinc-800 flex items-center gap-2">
              <Package className="w-4 h-4 text-zinc-500" />
              <h2 className="text-white font-bold">اقلام سفارش ({order.items.length})</h2>
            </div>
            <div className="divide-y divide-zinc-800/50">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-start justify-between gap-4 px-5 py-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm">{item.ticketName}</p>
                    <p className="text-zinc-400 text-xs mt-0.5">{item.sessionName} · {item.date}</p>
                    <p className="text-zinc-500 text-xs">تعداد: {item.qty}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-sky-400 font-bold">{fmt(item.unitPrice * item.qty)} ت</p>
                    <p className="text-zinc-500 text-xs">{fmt(item.unitPrice)} × {item.qty}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-5 py-4 border-t border-zinc-800 flex justify-between items-center">
              <span className="text-zinc-400 font-medium">مجموع</span>
              <span className="text-white font-extrabold text-lg">{fmt(order.grandTotal)} تومان</span>
            </div>
          </div>

          {/* Receipt */}
          {order.receiptUrl && (
            <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-5">
              <h2 className="text-white font-bold mb-3">رسید پرداخت</h2>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={order.receiptUrl} alt="رسید" className="rounded-xl max-h-64 w-full object-contain bg-zinc-800" />
            </div>
          )}

          {/* Actions */}
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-5">
            <h2 className="text-white font-bold mb-4">تغییر وضعیت</h2>
            <div className="flex items-center gap-3">
              <span className="text-zinc-400 text-sm">وضعیت فعلی: <span className={STATUS_COLORS[order.status]}>{STATUS_LABELS[order.status]}</span></span>
              <div className="ms-auto">
                <OrderActions orderId={order.id} currentStatus={order.status} receiptUrl={order.receiptUrl} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value, mono, highlight }: {
  icon?: React.ReactNode; label: string; value: string; mono?: boolean; highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-1.5 text-zinc-500 text-xs flex-shrink-0">
        {icon}
        {label}
      </div>
      <span className={`text-sm text-end break-all ${mono ? 'font-mono' : 'font-medium'} ${highlight ? 'text-sky-400 font-bold' : 'text-zinc-300'}`}>
        {value}
      </span>
    </div>
  );
}
