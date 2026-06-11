import { NextResponse } from 'next/server';
import { ordersDb } from '@/lib/data';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const formData = await req.formData();
  const file = formData.get('receipt') as File | null;
  if (!file) return NextResponse.json({ error: 'no file' }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const { writeFile, mkdir } = await import('fs/promises');
  const { join } = await import('path');
  const dir = join(process.cwd(), 'public', 'receipts');
  await mkdir(dir, { recursive: true });
  const ext = file.name.split('.').pop() ?? 'jpg';
  const filename = `${params.id}.${ext}`;
  await writeFile(join(dir, filename), Buffer.from(bytes));

  const receiptUrl = `/receipts/${filename}`;
  ordersDb.update(params.id, { receiptUrl, status: 'receipt_uploaded' });
  return NextResponse.json({ ok: true, receiptUrl });
}
