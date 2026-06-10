'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TicketToggle({ ticketId, active }: { ticketId: string; active: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function toggle() {
    setLoading(true);
    await fetch(`/api/tickets/${ticketId}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ active: !active }),
    });
    router.refresh();
    setLoading(false);
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
        active
          ? 'bg-green-900/30 text-green-400 hover:bg-green-900/60'
          : 'bg-zinc-800 text-zinc-500 hover:bg-zinc-700'
      }`}
    >
      {active ? 'فعال' : 'غیرفعال'}
    </button>
  );
}
