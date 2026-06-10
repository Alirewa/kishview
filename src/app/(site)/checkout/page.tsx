'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';
import { CreditCard, User, Phone, Mail, Hash, Copy, Check } from 'lucide-react';

function formatPrice(p: number) {
  return new Intl.NumberFormat('fa-IR').format(p);
}

const BANK_CARD = process.env.NEXT_PUBLIC_CARD_NUMBER ?? '6037-9975-XXXX-XXXX';
const CARD_OWNER = process.env.NEXT_PUBLIC_CARD_OWNER ?? 'کیش ویو';
const BANK_NAME = process.env.NEXT_PUBLIC_BANK_NAME ?? 'ملی';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, grandTotal, discountCode, discountAmount, clearCart, total } = useCartStore();
  const [step, setStep] = useState<'info' | 'payment'>('info');
  const [orderId, setOrderId] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    nationalId: '',
    email: '',
  });

  const gt = grandTotal();
  const verifyCode = orderId ? parseInt(orderId.slice(-3).replace(/\D/g, '0')) : 0;
  const uniqueAmount = gt + verifyCode;

  async function createOrder() {
    setLoading(true);
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        customer: form,
        items,
        discountCode,
        discountAmount,
        total: total(),
      }),
    });
    const order = await res.json();
    setOrderId(order.id);
    setStep('payment');
    setLoading(false);
  }

  async function confirmPayment() {
    await fetch(`/api/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ status: 'paid' }),
    });
    clearCart();
    router.push(`/payment/${orderId}`);
  }

  function copyCard() {
    navigator.clipboard.writeText(BANK_CARD.replace(/-/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (items.length === 0 && step === 'info') {
    router.replace('/cart');
    return null;
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-12" dir="rtl">
      {step === 'info' && (
        <>
          <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-white mb-8">اطلاعات خریدار</h1>
          <div className="space-y-4">
            {[
              { field: 'name', label: 'نام و نام خانوادگی', icon: User, type: 'text', placeholder: 'علی احمدی' },
              { field: 'phone', label: 'شماره موبایل', icon: Phone, type: 'tel', placeholder: '09123456789' },
              { field: 'nationalId', label: 'کد ملی', icon: Hash, type: 'text', placeholder: '0012345678' },
              { field: 'email', label: 'ایمیل (اختیاری)', icon: Mail, type: 'email', placeholder: 'email@example.com' },
            ].map(({ field, label, icon: Icon, type, placeholder }) => (
              <div key={field}>
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1">{label}</label>
                <div className="relative">
                  <Icon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type={type}
                    value={(form as Record<string, string>)[field]}
                    onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                    placeholder={placeholder}
                    className="w-full border border-zinc-200 dark:border-zinc-700 rounded-xl pr-10 pl-4 py-3 bg-white dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-sky-50 dark:bg-sky-900/20 rounded-xl p-4 border border-sky-100 dark:border-sky-800">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-zinc-600 dark:text-zinc-400">مبلغ قابل پرداخت</span>
              <span className="font-bold text-zinc-900 dark:text-white">{formatPrice(gt)} تومان</span>
            </div>
          </div>

          <button
            onClick={createOrder}
            disabled={!form.name || !form.phone || !form.nationalId || loading}
            className="mt-6 w-full bg-sky-600 hover:bg-sky-700 disabled:bg-zinc-300 dark:disabled:bg-zinc-700 text-white font-bold py-4 rounded-2xl transition-colors"
          >
            {loading ? 'در حال ثبت...' : 'ثبت سفارش و پرداخت'}
          </button>
        </>
      )}

      {step === 'payment' && (
        <>
          <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-white mb-2">پرداخت کارت به کارت</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mb-8 text-sm leading-relaxed">
            مبلغ زیر را دقیقاً به شماره کارت منتقل کنید. عدد منحصربه‌فرد به عنوان کد تأیید خودکار استفاده می‌شود.
          </p>

          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-100 dark:border-zinc-800 mb-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-500">شماره کارت</span>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-zinc-900 dark:text-white tracking-wider">{BANK_CARD}</span>
                <button onClick={copyCard} className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-zinc-400" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-500">صاحب حساب</span>
              <span className="font-semibold text-zinc-900 dark:text-white">{CARD_OWNER}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-500">بانک</span>
              <span className="font-semibold text-zinc-900 dark:text-white">{BANK_NAME}</span>
            </div>
            <div className="border-t border-zinc-100 dark:border-zinc-800 pt-4 flex items-center justify-between">
              <span className="text-sm text-zinc-500">مبلغ دقیق پرداخت</span>
              <div className="text-left">
                <span className="text-2xl font-extrabold text-sky-600 dark:text-sky-400">
                  {formatPrice(uniqueAmount)}
                </span>
                <span className="text-sm text-zinc-500 mr-1">تومان</span>
                <div className="text-xs text-zinc-400 mt-0.5">کد تأیید: +{verifyCode}</div>
              </div>
            </div>
          </div>

          <button
            onClick={confirmPayment}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-2xl transition-colors mb-3"
          >
            پرداخت انجام دادم
          </button>

          <button
            onClick={() => router.push(`/payment/${orderId}?fallback=1`)}
            className="w-full text-zinc-500 dark:text-zinc-400 text-sm py-2 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
          >
            پرداخت انجام دادم، تأیید نشد →
          </button>
        </>
      )}
    </div>
  );
}
