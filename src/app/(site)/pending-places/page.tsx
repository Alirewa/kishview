'use client';
import { useEffect, useState } from 'react';
import { MapPin, Clock, CheckCircle, XCircle } from 'lucide-react';
import type { PendingPlace } from '@/types/shop';

const statusIcon = {
  pending:  <Clock     className="w-4 h-4 text-amber-500" />,
  approved: <CheckCircle className="w-4 h-4 text-green-500" />,
  rejected: <XCircle   className="w-4 h-4 text-red-500" />,
};

const statusLabel = {
  pending:  { fa: 'در انتظار بررسی', en: 'Pending' },
  approved: { fa: 'تأیید شده',        en: 'Approved' },
  rejected: { fa: 'رد شده',           en: 'Rejected' },
};

export default function PendingPlacesPage() {
  const [places, setPlaces] = useState<PendingPlace[]>([]);

  useEffect(() => {
    fetch('/api/places/pending').then((r) => r.json()).then(setPlaces);
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12" dir="rtl">
      <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-white mb-2">مکان‌های در انتظار</h1>
      <p className="text-zinc-500 dark:text-zinc-400 mb-8">مکان‌هایی که کاربران پیشنهاد داده‌اند</p>

      {places.length === 0 ? (
        <div className="text-center py-16 text-zinc-400">
          <MapPin className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p>هنوز مکانی ثبت نشده است</p>
        </div>
      ) : (
        <div className="space-y-3">
          {places.map((p) => (
            <div
              key={p.id}
              className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-zinc-100 dark:border-zinc-800 flex items-start gap-4"
            >
              <div className="w-10 h-10 bg-sky-50 dark:bg-sky-900/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-sky-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h2 className="font-semibold text-zinc-900 dark:text-white">{p.title}</h2>
                  <span className="flex items-center gap-1 text-xs">
                    {statusIcon[p.status]}
                    {statusLabel[p.status].fa}
                  </span>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2">{p.description}</p>
                {p.submitterName && (
                  <p className="text-xs text-zinc-400 mt-1">ثبت‌کننده: {p.submitterName}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
