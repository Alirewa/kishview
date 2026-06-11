'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShoppingCart, Trash2, Tag, ArrowLeft } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

function formatPrice(p: number) {
  return new Intl.NumberFormat('fa-IR').format(p) + ' تومان';
}

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQty, applyDiscount, clearDiscount, discountCode, discountAmount, total, grandTotal } = useCartStore();
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');

  const VALID_CODES: Record<string, number> = {
    KISH10: 50000,
    KISH20: 100000,
  };

  function handleApplyCode() {
    if (VALID_CODES[code.toUpperCase()]) {
      applyDiscount(code.toUpperCase(), VALID_CODES[code.toUpperCase()]);
      setCodeError('');
    } else {
      setCodeError('کد تخفیف نامعتبر است');
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center" dir="rtl">
        <ShoppingCart className="w-16 h-16 text-zinc-300 mx-auto mb-4" />
        <h1 className="text-xl font-bold text-zinc-700 dark:text-zinc-300 mb-2">سبد خرید خالی است</h1>
        <p className="text-zinc-400 mb-6">هنوز بلیتی به سبد اضافه نکرده‌اید</p>
        <Link href="/tickets" className="inline-flex items-center gap-2 bg-sky-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-sky-700 transition-colors">
          مشاهده بلیت‌ها
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12" dir="rtl">
      <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-white mb-8">سبد خرید</h1>

      <div className="space-y-3 mb-8">
        {items.map(item => (
          <div
            key={`${item.ticketId}-${item.sessionId}-${item.date}`}
            className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-zinc-100 dark:border-zinc-800 flex items-center gap-4"
          >
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-zinc-900 dark:text-white truncate">{item.ticketName}</div>
              <div className="text-sm text-zinc-500">
                {item.sessionName} • {item.date}
              </div>
              <div className="text-sky-600 dark:text-sky-400 font-semibold text-sm mt-1">
                {formatPrice(item.unitPrice)} × {item.qty}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQty(item.ticketId, item.sessionId, item.date, item.qty - 1)}
                className="w-8 h-8 rounded-lg border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-lg font-bold text-zinc-600 dark:text-zinc-400"
              >−</button>
              <span className="w-6 text-center font-bold text-zinc-900 dark:text-white">{item.qty}</span>
              <button
                onClick={() => updateQty(item.ticketId, item.sessionId, item.date, item.qty + 1)}
                className="w-8 h-8 rounded-lg border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-lg font-bold text-zinc-600 dark:text-zinc-400"
              >+</button>
              <button
                onClick={() => removeItem(item.ticketId, item.sessionId, item.date)}
                className="w-8 h-8 rounded-lg text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center justify-center"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Discount code */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-zinc-100 dark:border-zinc-800 mb-6">
        <div className="flex gap-2">
          <input
            value={code}
            onChange={e => setCode(e.target.value)}
            placeholder="کد تخفیف"
            className="flex-1 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-2.5 bg-white dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <button
            onClick={handleApplyCode}
            className="px-4 py-2.5 bg-sky-600 text-white rounded-xl text-sm font-semibold hover:bg-sky-700 transition-colors flex items-center gap-1"
          >
            <Tag className="w-4 h-4" />
            اعمال
          </button>
        </div>
        {codeError && <p className="text-red-500 text-sm mt-2">{codeError}</p>}
        {discountCode && (
          <div className="flex items-center justify-between mt-2">
            <span className="text-green-600 dark:text-green-400 text-sm">کد {discountCode} اعمال شد ✓</span>
            <button onClick={clearDiscount} className="text-xs text-zinc-400 hover:text-red-500">حذف</button>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl p-5 border border-zinc-100 dark:border-zinc-800 mb-6">
        <div className="flex justify-between mb-2 text-sm text-zinc-600 dark:text-zinc-400">
          <span>جمع کل</span>
          <span>{formatPrice(total())}</span>
        </div>
        {discountAmount > 0 && (
          <div className="flex justify-between mb-2 text-sm text-green-600 dark:text-green-400">
            <span>تخفیف</span>
            <span>− {formatPrice(discountAmount)}</span>
          </div>
        )}
        <div className="flex justify-between font-extrabold text-zinc-900 dark:text-white text-lg border-t border-zinc-100 dark:border-zinc-800 pt-3 mt-3">
          <span>مبلغ قابل پرداخت</span>
          <span className="text-sky-600 dark:text-sky-400">{formatPrice(grandTotal())}</span>
        </div>
      </div>

      <button
        onClick={() => router.push('/checkout')}
        className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-4 rounded-2xl text-base transition-colors flex items-center justify-center gap-2"
      >
        ادامه و پرداخت
        <ArrowLeft className="w-5 h-5" />
      </button>
    </div>
  );
}
