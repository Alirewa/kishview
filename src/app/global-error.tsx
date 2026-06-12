'use client';
import Link from 'next/link';

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="min-h-screen bg-white flex items-center justify-center font-sans">
        <div className="text-center px-6">
          <p className="text-8xl font-black text-zinc-100 select-none mb-2">500</p>
          <h1 className="text-xl font-bold text-zinc-800 mb-1">خطای کلی رخ داد</h1>
          <p className="text-sm text-zinc-400 mb-8">A critical error occurred</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={reset}
              className="bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-sm font-semibold px-5 py-3 rounded-xl transition-colors"
            >
              تلاش مجدد
            </button>
            <Link
              href="/"
              className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold px-5 py-3 rounded-xl transition-colors"
            >
              بازگشت به خانه
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
