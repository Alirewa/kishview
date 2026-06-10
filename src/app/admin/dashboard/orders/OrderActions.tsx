'use client';
import { useRouter } from 'next/navigation';

export default function OrderActions({ orderId, currentStatus, receiptUrl }: {
  orderId: string;
  currentStatus: string;
  receiptUrl?: string;
}) {
  const router = useRouter();

  async function patch(status: string) {
    await fetch(`/api/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    router.refresh();
  }

  return (
    <div className="flex items-center gap-2">
      {receiptUrl && (
        <a href={receiptUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-sky-400 hover:text-sky-300">
          رسید
        </a>
      )}
      {currentStatus !== 'confirmed' && (
        <button onClick={() => patch('confirmed')} className="text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded-lg hover:bg-green-900/60">
          تأیید
        </button>
      )}
      {currentStatus !== 'rejected' && (
        <button onClick={() => patch('rejected')} className="text-xs bg-red-900/30 text-red-400 px-2 py-1 rounded-lg hover:bg-red-900/60">
          رد
        </button>
      )}
    </div>
  );
}
