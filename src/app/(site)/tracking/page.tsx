'use client';
import { useState } from 'react';
import { Search, CheckCircle, Clock, XCircle, Package, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

const STATUS_FA: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  pending:          { label: 'در انتظار بررسی',   color: 'amber',  icon: <Clock className="w-5 h-5" /> },
  paid:             { label: 'پرداخت انجام شد',   color: 'blue',   icon: <CheckCircle className="w-5 h-5" /> },
  receipt_uploaded: { label: 'رسید آپلود شد',     color: 'violet', icon: <Package className="w-5 h-5" /> },
  confirmed:        { label: 'تأیید شده ✓',       color: 'green',  icon: <CheckCircle className="w-5 h-5" /> },
  rejected:         { label: 'رد شده',            color: 'red',    icon: <XCircle className="w-5 h-5" /> },
};

const STATUS_EN: Record<string, { label: string }> = {
  pending:          { label: 'Pending Review' },
  paid:             { label: 'Payment Received' },
  receipt_uploaded: { label: 'Receipt Uploaded' },
  confirmed:        { label: 'Confirmed ✓' },
  rejected:         { label: 'Rejected' },
};

const COLOR_CLASSES: Record<string, string> = {
  amber:  'bg-amber-50 text-amber-700 border-amber-200',
  blue:   'bg-blue-50 text-blue-700 border-blue-200',
  violet: 'bg-violet-50 text-violet-700 border-violet-200',
  green:  'bg-green-50 text-green-700 border-green-200',
  red:    'bg-red-50 text-red-700 border-red-200',
};

function fmt(n: number) { return new Intl.NumberFormat('fa-IR').format(n); }

interface OrderResult {
  id: string;
  status: string;
  createdAt: string;
  customer: { name: string; phone: string };
  items: Array<{ ticketName: string; sessionName: string; date: string; qty: number; unitPrice: number }>;
  grandTotal: number;
  discountAmount: number;
}

export default function TrackingPage() {
  const language = useAppStore((s) => s.language);
  const isFA = language === 'fa';
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<OrderResult | null>(null);
  const [error, setError] = useState('');
  const [showItems, setShowItems] = useState(false);

  async function lookup() {
    const id = code.trim();
    if (!id) return;
    setLoading(true);
    setError('');
    setOrder(null);
    try {
      const res = await fetch(`/api/orders/${id}`);
      if (!res.ok) throw new Error('not found');
      const data = await res.json();
      setOrder(data);
    } catch {
      setError(isFA ? 'سفارشی با این کد یافت نشد. کد را بررسی کنید.' : 'No order found with this code. Please check the code.');
    } finally {
      setLoading(false);
    }
  }

  const statusMeta = order ? (STATUS_FA[order.status] ?? { label: order.status, color: 'amber', icon: <AlertCircle className="w-5 h-5" /> }) : null;

  return (
    <div className="max-w-xl mx-auto px-4 py-12" dir={isFA ? 'rtl' : 'ltr'}>
      <div className="text-center mb-10">
        <div className="w-14 h-14 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Search className="w-7 h-7 text-sky-600" />
        </div>
        <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-white mb-2">
          {isFA ? 'استعلام / پیگیری سفارش' : 'Track Your Order'}
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
          {isFA
            ? 'کد پیگیری سفارش خود را وارد کنید (شناسه سفارش از صفحه تأیید)'
            : 'Enter your order tracking code from the confirmation page'}
        </p>
      </div>

      {/* Search form */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && lookup()}
          placeholder={isFA ? 'کد پیگیری سفارش...' : 'Order tracking code...'}
          className="flex-1 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-4 py-3
                     bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-sm
                     focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono"
          dir="ltr"
        />
        <button
          onClick={lookup}
          disabled={loading || !code.trim()}
          className="px-5 py-3 bg-sky-600 hover:bg-sky-700 disabled:bg-zinc-300 dark:disabled:bg-zinc-700
                     text-white font-bold rounded-2xl transition-colors flex items-center gap-2 cursor-pointer"
        >
          {loading
            ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            : <Search className="w-4 h-4" />}
          {isFA ? 'جستجو' : 'Search'}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl mb-6">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Result */}
      {order && statusMeta && (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-sm border border-zinc-100 dark:border-zinc-800 overflow-hidden">
          {/* Status header */}
          <div className={`flex items-center gap-3 px-5 py-4 border-b ${COLOR_CLASSES[statusMeta.color]} dark:bg-transparent dark:text-current dark:border-zinc-800`}>
            {statusMeta.icon}
            <div>
              <p className="font-bold text-base">{isFA ? statusMeta.label : (STATUS_EN[order.status]?.label ?? order.status)}</p>
              <p className="text-xs opacity-70">
                {isFA ? 'وضعیت سفارش' : 'Order Status'}
              </p>
            </div>
          </div>

          {/* Order details */}
          <div className="p-5 space-y-3">
            <Row label={isFA ? 'نام' : 'Name'} value={order.customer.name} />
            <Row label={isFA ? 'موبایل' : 'Phone'} value={order.customer.phone} mono />
            <Row label={isFA ? 'تاریخ ثبت' : 'Order Date'} value={new Date(order.createdAt).toLocaleDateString(isFA ? 'fa-IR' : 'en-GB')} />
            <Row label={isFA ? 'مبلغ کل' : 'Total'} value={`${fmt(order.grandTotal)} ${isFA ? 'تومان' : 'T'}`} />
            {order.discountAmount > 0 && (
              <Row label={isFA ? 'تخفیف' : 'Discount'} value={`−${fmt(order.discountAmount)} ${isFA ? 'تومان' : 'T'}`} />
            )}
            <Row label={isFA ? 'کد پیگیری' : 'Tracking ID'} value={order.id} mono small />
          </div>

          {/* Items accordion */}
          <button
            onClick={() => setShowItems((v) => !v)}
            className="flex items-center justify-between w-full px-5 py-3 border-t border-zinc-100 dark:border-zinc-800 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <span>{isFA ? `اقلام سفارش (${order.items.length})` : `Order Items (${order.items.length})`}</span>
            {showItems ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {showItems && (
            <div className="px-5 pb-5 space-y-2 border-t border-zinc-100 dark:border-zinc-800 pt-3">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-start justify-between gap-3 text-sm">
                  <div>
                    <p className="font-medium text-zinc-900 dark:text-white">{item.ticketName}</p>
                    <p className="text-xs text-zinc-500">{item.sessionName} · {item.date} · ×{item.qty}</p>
                  </div>
                  <p className="text-sky-600 dark:text-sky-400 font-semibold flex-shrink-0">
                    {fmt(item.unitPrice * item.qty)} {isFA ? 'ت' : 'T'}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Row({ label, value, mono, small }: { label: string; value: string; mono?: boolean; small?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-zinc-500 flex-shrink-0">{label}</span>
      <span className={`text-sm font-medium text-zinc-900 dark:text-white text-end break-all ${mono ? 'font-mono' : ''} ${small ? 'text-xs text-zinc-400' : ''}`}>
        {value}
      </span>
    </div>
  );
}
