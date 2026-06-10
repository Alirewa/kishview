import { NextResponse } from 'next/server';
import { ordersDb } from '@/lib/data';
import type { OrderStatus } from '@/types/shop';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const order = ordersDb.find(params.id);
  if (!order) return NextResponse.json({ error: 'not found' }, { status: 404 });
  return NextResponse.json(order);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const body: { status?: OrderStatus; receiptUrl?: string } = await req.json();
  ordersDb.update(params.id, body);
  return NextResponse.json({ ok: true });
}
