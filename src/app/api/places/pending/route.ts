import { NextResponse } from 'next/server';
import { placesDb } from '@/lib/data';

export async function GET() {
  return NextResponse.json(placesDb.all());
}

export async function POST(req: Request) {
  const body: { title: string; description: string; coordinates?: { lat: number; lng: number }; submitterName?: string } = await req.json();
  const place = placesDb.create(body);
  return NextResponse.json(place);
}
