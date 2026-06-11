// Developed by @Alirewa — github.com/Alirewa
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';
import {
  User, Phone, Mail, Hash, Copy, Check,
  Lock, CreditCard, ShieldCheck, ChevronLeft,
} from 'lucide-react';

function fmt(p: number) {
  return new Intl.NumberFormat('fa-IR').format(p);
}

const BANK_CARD  = process.env.NEXT_PUBLIC_CARD_NUMBER  ?? '6037-9975-XXXX-XXXX';
const CARD_OWNER = process.env.NEXT_PUBLIC_CARD_OWNER   ?? 'کیش ویو';
const BANK_NAME  = process.env.NEXT_PUBLIC_BANK_NAME    ?? 'ملی';

const FIELDS = [
  { field: 'name',       label: 'نام و نام خانوادگی', icon: User,   type: 'text',  placeholder: 'علی احمدی',    required: true  },
  { field: 'phone',      label: 'شماره موبایل',        icon: Phone,  type: 'tel',   placeholder: '09123456789',   required: true  },
  { field: 'nationalId', label: 'کد ملی',              icon: Hash,   type: 'text',  placeholder: '0012345678',    required: true  },
  { field: 'email',      label: 'ایمیل (اختیاری)',     icon: Mail,   type: 'email', placeholder: 'email@example.com', required: false },
] as const;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, grandTotal, discountCode, discountAmount, clearCart, total } = useCartStore();
  const [mounted, setMounted]  = useState(false);
  const [step, setStep]       = useState<'info' | 'payment'>('info');
  const [orderId, setOrderId] = useState('');
  const [copied, setCopied]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm]       = useState({ name: '', phone: '', nationalId: '', email: '' });

  useEffect(() => { setMounted(true); }, []);

  const gt           = grandTotal();
  const verifyCode   = orderId ? parseInt(orderId.slice(-3).replace(/\D/g, '0')) : 0;
  const uniqueAmount = gt + verifyCode;

  const canSubmit = form.name.trim() && form.phone.trim() && form.nationalId.trim() && !loading;

  async function createOrder() {
    setLoading(true);
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ customer: form, items, discountCode, discountAmount, total: total() }),
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

  useEffect(() => {
    if (mounted && items.length === 0 && step === 'info') {
      router.replace('/cart');
    }
  }, [mounted, items.length, step, router]);

  if (!mounted || (items.length === 0 && step === 'info')) return null;

  return (
    <div className="min-h-screen bg-zinc-50" dir="rtl">
      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* ── Step indicator ── */}
        <div className="flex items-center justify-center gap-4 mb-10">
          {(['info', 'payment'] as const).map((s, i) => {
            const labels = ['اطلاعات خریدار', 'پرداخت'];
            const active = step === s;
            const done   = step === 'payment' && s === 'info';
            return (
              <div key={s} className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className={[
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all',
                    active ? 'border-sky-500 bg-sky-500 text-white'
                           : done  ? 'border-sky-500 bg-sky-50 text-sky-600'
                                   : 'border-zinc-300 text-zinc-400',
                  ].join(' ')}>
                    {done ? '✓' : i + 1}
                  </div>
                  <span className={`text-sm font-semibold ${active ? 'text-zinc-900' : 'text-zinc-400'}`}>
                    {labels[i]}
                  </span>
                </div>
                {i === 0 && (
                  <ChevronLeft className="w-4 h-4 text-zinc-300" />
                )}
              </div>
            );
          })}
        </div>

        {/* ── Step 1: Customer info ── */}
        {step === 'info' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Form column (wider) */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 p-7">
                <h2 className="text-lg font-extrabold text-zinc-900 mb-6 flex items-center gap-2">
                  <User className="w-5 h-5 text-sky-500" />
                  اطلاعات خریدار
                </h2>
                <div className="space-y-4">
                  {FIELDS.map(({ field, label, icon: Icon, type, placeholder }) => (
                    <div key={field}>
                      <label className="block text-sm font-semibold text-zinc-600 mb-1.5">{label}</label>
                      <div className="relative">
                        <Icon className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                        <input
                          type={type}
                          value={(form as Record<string, string>)[field]}
                          onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                          placeholder={placeholder}
                          className="w-full h-12 border border-zinc-200 rounded-2xl pr-11 pl-4
                                     bg-zinc-50 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500
                                     focus:border-sky-500 focus:bg-white transition-all text-zinc-900"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={createOrder}
                  disabled={!canSubmit}
                  className={[
                    'mt-8 w-full h-13 py-3.5 rounded-2xl font-bold text-base transition-all',
                    canSubmit
                      ? 'bg-gradient-to-l from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 text-white shadow-lg shadow-sky-200'
                      : 'bg-zinc-200 text-zinc-400 cursor-not-allowed',
                  ].join(' ')}
                >
                  {loading ? 'در حال ثبت سفارش…' : 'ثبت سفارش و ادامه پرداخت'}
                </button>
              </div>
            </div>

            {/* Order summary column (sticky) */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 overflow-hidden sticky top-6">
                {/* Gradient header */}
                <div className="bg-gradient-to-l from-sky-500 to-teal-500 px-6 py-5">
                  <p className="text-sky-100 text-xs mb-1">مبلغ قابل پرداخت</p>
                  <p className="text-white text-2xl font-extrabold">{fmt(gt)} <span className="text-sm font-normal opacity-80">تومان</span></p>
                </div>

                <div className="p-5 space-y-3">
                  {items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-zinc-600 truncate max-w-[55%]">
                        {item.ticketName} × {item.qty}
                      </span>
                      <span className="font-semibold text-zinc-900">{fmt(item.unitPrice * item.qty)}</span>
                    </div>
                  ))}

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>تخفیف ({discountCode})</span>
                      <span>− {fmt(discountAmount)}</span>
                    </div>
                  )}

                  <div className="border-t border-zinc-100 pt-3 flex justify-between font-extrabold text-zinc-900">
                    <span>جمع کل</span>
                    <span className="text-sky-600">{fmt(gt)}</span>
                  </div>
                </div>

                <div className="px-5 pb-5">
                  <div className="flex items-center gap-2 text-xs text-zinc-400 justify-center">
                    <Lock className="w-3.5 h-3.5 text-green-500" />
                    پرداخت ایمن و رمزگذاری‌شده
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Step 2: Payment ── */}
        {step === 'payment' && (
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-l from-sky-600 to-teal-600 px-7 py-5">
                <div className="flex items-center gap-2 text-white mb-1">
                  <CreditCard className="w-5 h-5 opacity-80" />
                  <span className="text-sm font-medium opacity-80">پرداخت کارت به کارت</span>
                </div>
                <p className="text-white/80 text-xs leading-relaxed">
                  مبلغ دقیق زیر را به شماره کارت واریز کنید. عدد منحصربه‌فرد به‌عنوان کد تأیید خودکار استفاده می‌شود.
                </p>
              </div>

              <div className="p-6 space-y-4">
                {/* Bank card visual */}
                <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl p-5 shadow-xl">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-10 h-7 rounded bg-amber-400/80" />
                    <span className="text-zinc-400 text-xs">{BANK_NAME}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-white text-base tracking-widest">{BANK_CARD}</span>
                    <button
                      onClick={copyCard}
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      {copied
                        ? <Check className="w-4 h-4 text-green-400" />
                        : <Copy className="w-4 h-4 text-zinc-300" />}
                    </button>
                  </div>
                  <p className="text-zinc-400 text-xs mt-2">{CARD_OWNER}</p>
                </div>

                {/* Exact amount */}
                <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-100">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-zinc-500">مبلغ دقیق پرداخت</p>
                    <div className="text-left">
                      <p className="text-2xl font-extrabold text-green-600">{fmt(uniqueAmount)}</p>
                      <p className="text-xs text-zinc-400 text-left">تومان</p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-zinc-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                    کد تأیید خودکار: +{verifyCode} به مبلغ اصلی اضافه شده
                  </div>
                </div>

                <button
                  onClick={confirmPayment}
                  className="w-full py-4 rounded-2xl bg-gradient-to-l from-green-500 to-emerald-500
                             hover:from-green-600 hover:to-emerald-600
                             text-white font-bold text-base shadow-lg shadow-green-200 transition-all"
                >
                  پرداخت انجام دادم ✓
                </button>

                <button
                  onClick={() => router.push(`/payment/${orderId}?fallback=1`)}
                  className="w-full text-zinc-400 text-sm py-2 hover:text-zinc-600 transition-colors"
                >
                  پرداخت انجام دادم، تأیید نشد →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
