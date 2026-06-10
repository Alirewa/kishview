import { NextResponse } from 'next/server';
import { placesDb } from '@/lib/data';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const body: { status: 'approved' | 'rejected' } = await req.json();
  placesDb.update(params.id, body);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  placesDb.delete(params.id);
  return NextResponse.json({ ok: true });
}
