import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center font-sans" dir="rtl">
      <div className="text-center px-6">
        <p className="text-8xl font-black text-zinc-100 select-none mb-2">404</p>
        <h1 className="text-xl font-bold text-zinc-800 mb-1">صفحه پیدا نشد</h1>
        <p className="text-sm text-zinc-400 mb-8">Page not found</p>
        <Link
          href="/"
          className="inline-block bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          بازگشت به خانه
        </Link>
      </div>
    </div>
  );
}
