import { NextResponse } from 'next/server';
import { ordersDb } from '@/lib/data';
import type { OrderCustomer, CartItem, OrderStatus } from '@/types/shop';

export async function GET() {
  return NextResponse.json(ordersDb.all());
}

function sanitizeText(value: unknown, maxLen = 200): string {
  if (typeof value !== 'string') return '';
  return value.replace(/<[^>]*>/g, '').trim().slice(0, maxLen);
}

function isValidPhone(phone: string): boolean {
  return /^[0-9+\-\s]{7,20}$/.test(phone);
}

function isValidNationalId(id: string): boolean {
  return /^[0-9]{8,12}$/.test(id);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

export async function POST(req: Request) {
  let body: {
    customer: OrderCustomer;
    items: CartItem[];
    discountCode?: string;
    discountAmount?: number;
    total: number;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { customer, items, discountCode, discountAmount: rawDiscount, total } = body;

  if (!customer || typeof customer !== 'object') {
    return NextResponse.json({ error: 'Missing customer data' }, { status: 400 });
  }

  const name = sanitizeText(customer.name, 100);
  const phone = sanitizeText(customer.phone, 20);
  const nationalId = sanitizeText(customer.nationalId, 12);
  const email = sanitizeText(customer.email, 254);

  if (!name) return NextResponse.json({ error: 'نام الزامی است' }, { status: 400 });
  if (!phone || !isValidPhone(phone)) return NextResponse.json({ error: 'شماره تماس معتبر نیست' }, { status: 400 });
  if (!nationalId || !isValidNationalId(nationalId)) return NextResponse.json({ error: 'کد ملی معتبر نیست' }, { status: 400 });
  if (email && !isValidEmail(email)) return NextResponse.json({ error: 'ایمیل معتبر نیست' }, { status: 400 });

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: 'سبد خرید خالی است' }, { status: 400 });
  }

  if (typeof total !== 'number' || total <= 0) {
    return NextResponse.json({ error: 'مبلغ نامعتبر است' }, { status: 400 });
  }

  const discountAmount = Math.max(0, typeof rawDiscount === 'number' ? rawDiscount : 0);
  const grandTotal = Math.max(0, total - discountAmount);

  const order = ordersDb.create({
    customer: { name, phone, nationalId, email },
    items,
    discountCode: sanitizeText(discountCode ?? '', 50),
    discountAmount,
    total,
    grandTotal,
    status: 'pending' as OrderStatus,
  });

  return NextResponse.json(order);
}
