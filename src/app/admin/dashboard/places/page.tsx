import { placesDb } from '@/lib/data';
import PlaceActions from './PlaceActions';

export const metadata = { title: 'مکان‌های پیشنهادی' };

export default function AdminPlacesPage() {
  const places = placesDb.all();

  return (
    <div dir="rtl">
      <h1 className="text-2xl font-extrabold text-white mb-8">مکان‌های پیشنهادی کاربران</h1>
      <div className="space-y-3">
        {places.length === 0 && (
          <div className="text-center py-12 text-zinc-500">مکانی پیشنهاد نشده است</div>
        )}
        {places.map(p => (
          <div key={p.id} className="bg-zinc-900 rounded-xl border border-zinc-800 p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="text-white font-semibold">{p.title}</div>
                <div className="text-zinc-500 text-sm mt-1 line-clamp-2">{p.description}</div>
                {p.coordinates && (
                  <div className="text-zinc-600 text-xs mt-1 font-mono">
                    {p.coordinates.lat.toFixed(5)}, {p.coordinates.lng.toFixed(5)}
                  </div>
                )}
              </div>
              <div className="mr-4">
                <span className={`text-xs px-2 py-1 rounded-lg ${
                  p.status === 'pending' ? 'bg-amber-900/30 text-amber-400' :
                  p.status === 'approved' ? 'bg-green-900/30 text-green-400' :
                  'bg-red-900/30 text-red-400'
                }`}>
                  {p.status === 'pending' ? 'در انتظار' : p.status === 'approved' ? 'تأیید شده' : 'رد شده'}
                </span>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <PlaceActions placeId={p.id} status={p.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
