import { NextResponse } from 'next/server';
import { ordersDb } from '@/lib/data';
import type { OrderCustomer, CartItem, OrderStatus } from '@/types/shop';

export async function GET() {
  return NextResponse.json(ordersDb.all());
}

export async function POST(req: Request) {
  const body: {
    customer: OrderCustomer;
    items: CartItem[];
    discountCode?: string;
    discountAmount?: number;
    total: number;
  } = await req.json();

  const discountAmount = body.discountAmount ?? 0;
  const grandTotal = Math.max(0, body.total - discountAmount);

  const order = ordersDb.create({
    customer: body.customer,
    items: body.items,
    discountCode: body.discountCode ?? '',
    discountAmount,
    total: body.total,
    grandTotal,
    status: 'pending' as OrderStatus,
  });

  return NextResponse.json(order);
}
