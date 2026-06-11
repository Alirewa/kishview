import { places } from '@/data/places';
import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json(places, {
    headers: {
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
    },
  });
}
