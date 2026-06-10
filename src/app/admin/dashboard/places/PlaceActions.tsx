'use client';
import { useRouter } from 'next/navigation';

export default function PlaceActions({ placeId, status }: { placeId: string; status: string }) {
  const router = useRouter();

  async function patch(newStatus: 'approved' | 'rejected') {
    await fetch(`/api/places/pending/${placeId}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    router.refresh();
  }

  async function remove() {
    await fetch(`/api/places/pending/${placeId}`, { method: 'DELETE' });
    router.refresh();
  }

  return (
    <>
      {status !== 'approved' && (
        <button onClick={() => patch('approved')} className="text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded-lg hover:bg-green-900/60">
          تأیید
        </button>
      )}
      {status !== 'rejected' && (
        <button onClick={() => patch('rejected')} className="text-xs bg-red-900/30 text-red-400 px-2 py-1 rounded-lg hover:bg-red-900/60">
          رد
        </button>
      )}
      <button onClick={remove} className="text-xs bg-zinc-800 text-zinc-500 px-2 py-1 rounded-lg hover:bg-zinc-700 hover:text-zinc-300">
        حذف
      </button>
    </>
  );
}
