import { NextResponse } from 'next/server';
import { ticketsDb } from '@/lib/data';
import type { Ticket } from '@/types/shop';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const ticket = ticketsDb.find(params.id);
  if (!ticket) return NextResponse.json({ error: 'not found' }, { status: 404 });
  return NextResponse.json(ticket);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body: Ticket = await req.json();
  ticketsDb.upsert({ ...body, id: params.id });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  ticketsDb.delete(params.id);
  return NextResponse.json({ ok: true });
}
