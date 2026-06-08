import dynamic from 'next/dynamic';

/**
 * Mapbox GL JS + react-map-gl must be excluded from SSR.
 * The entire MapPage subtree is dynamically imported client-side only.
 */
const MapPage = dynamic(() => import('@/components/MapPage'), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-screen flex items-center justify-center bg-zinc-950">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-sky-500 border-t-transparent animate-spin" />
        <span className="text-xs text-zinc-500 tracking-widest uppercase">Loading map…</span>
      </div>
    </div>
  ),
});

export default function Home() {
  return <MapPage />;
}
