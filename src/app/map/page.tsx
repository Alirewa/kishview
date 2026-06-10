import dynamic from 'next/dynamic';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'نقشه کیش',
  description: 'نقشه تعاملی سه‌بعدی جزیره کیش با موقعیت مراکز خرید، هتل‌ها، تفریحات و خدمات',
};

const MapPage = dynamic(() => import('@/components/MapPage'), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-screen flex items-center justify-center bg-zinc-950">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-sky-500 border-t-transparent animate-spin" />
        <span className="text-xs text-zinc-500 tracking-widest uppercase">در حال بارگذاری نقشه…</span>
      </div>
    </div>
  ),
});

export default function MapRoute() {
  return <MapPage />;
}
