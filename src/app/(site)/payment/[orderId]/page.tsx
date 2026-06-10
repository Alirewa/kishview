'use client';
import { useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Upload, FileImage } from 'lucide-react';

export default function PaymentResultPage({ params }: { params: { orderId: string } }) {
  const searchParams = useSearchParams();
  const isFallback = searchParams.get('fallback') === '1';
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function uploadReceipt() {
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('receipt', file);
    await fetch(`/api/orders/${params.orderId}/receipt`, { method: 'POST', body: fd });
    setUploaded(true);
    setUploading(false);
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center" dir="rtl">
      {!isFallback ? (
        <>
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-white mb-3">سفارش شما ثبت شد!</h1>
          <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed mb-2">
            پس از تأیید پرداخت، پیامک/ایمیل تأیید دریافت خواهید کرد.
          </p>
          <p className="text-xs text-zinc-400 mb-8">شناسه سفارش: <span className="font-mono">{params.orderId}</span></p>
          <Link href="/tickets" className="inline-flex items-center gap-2 bg-sky-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-sky-700 transition-colors">
            خرید بلیت دیگری
          </Link>
        </>
      ) : (
        <>
          <div className="w-20 h-20 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-6">
            <Upload className="w-10 h-10 text-amber-500" />
          </div>
          <h1 className="text-xl font-extrabold text-zinc-900 dark:text-white mb-3">ارسال رسید پرداخت</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-8">
            تصویر رسید پرداخت خود را آپلود کنید تا سفارش شما به صورت دستی تأیید شود.
          </p>

          {!uploaded ? (
            <>
              <div
                onClick={() => inputRef.current?.click()}
                className="border-2 border-dashed border-zinc-200 dark:border-zinc-700 rounded-2xl p-8 mb-4 cursor-pointer hover:border-sky-400 transition-colors"
              >
                <FileImage className="w-10 h-10 text-zinc-300 mx-auto mb-2" />
                <p className="text-sm text-zinc-500">{file ? file.name : 'کلیک کنید یا فایل را بکشید'}</p>
              </div>
              <input
                ref={inputRef}
                type="file"
                accept="image/*,application/pdf"
                className="hidden"
                onChange={e => setFile(e.target.files?.[0] ?? null)}
              />
              <button
                onClick={uploadReceipt}
                disabled={!file || uploading}
                className="w-full bg-sky-600 hover:bg-sky-700 disabled:bg-zinc-300 dark:disabled:bg-zinc-700 text-white font-bold py-4 rounded-2xl transition-colors"
              >
                {uploading ? 'در حال ارسال...' : 'ارسال رسید'}
              </button>
            </>
          ) : (
            <>
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <p className="text-green-600 dark:text-green-400 font-semibold mb-6">رسید با موفقیت ارسال شد</p>
              <Link href="/tickets" className="inline-flex items-center gap-2 bg-sky-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-sky-700 transition-colors">
                بازگشت به بلیت‌ها
              </Link>
            </>
          )}
        </>
      )}
    </div>
  );
}
