// Developed by @Alirewa — github.com/Alirewa
import dynamic from 'next/dynamic';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'نقشه کیش | کیش ویو',
  description: 'نقشه تعاملی سه‌بعدی جزیره کیش با موقعیت مراکز خرید، هتل‌ها، تفریحات و خدمات',
};

const MapPage = dynamic(() => import('@/components/MapPage'), {
  ssr: false,
  loading: () => (
    // Force light background during load — map page is always light
    <div className="h-screen w-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-sky-500 border-t-transparent animate-spin" />
        <span className="text-xs text-zinc-400 tracking-widest uppercase">در حال بارگذاری نقشه…</span>
      </div>
    </div>
  ),
});

export default function MapRoute() {
  // Wrap in a div that resets Tailwind dark-mode — map page is always light
  return (
    <div className="light" style={{ colorScheme: 'light' }}>
      <MapPage />
    </div>
  );
}
