import { NextResponse } from 'next/server';
import { ticketsDb } from '@/lib/data';
import type { Ticket } from '@/types/shop';

export async function GET() {
  return NextResponse.json(ticketsDb.active());
}

export async function POST(req: Request) {
  const ticket: Ticket = await req.json();
  ticketsDb.upsert(ticket);
  return NextResponse.json({ ok: true });
}
