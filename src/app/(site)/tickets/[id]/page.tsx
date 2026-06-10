import { notFound } from 'next/navigation';
import TicketDetailClient from './TicketDetailClient';
import type { Ticket } from '@/types/shop';

async function getTicket(id: string): Promise<Ticket | null> {
  const { ticketsDb } = await import('@/lib/data');
  return ticketsDb.find(id) ?? null;
}

export async function generateStaticParams() {
  return [];
}

export default async function TicketDetailPage({ params }: { params: { id: string } }) {
  const ticket = await getTicket(params.id);
  if (!ticket) notFound();
  return <TicketDetailClient ticket={ticket} />;
}
