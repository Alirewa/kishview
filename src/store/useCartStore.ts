'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '@/types/shop';

interface CartState {
  items: CartItem[];
  discountCode: string;
  discountAmount: number;
  addItem: (item: CartItem) => void;
  removeItem: (ticketId: string, sessionId: string, date: string) => void;
  updateQty: (ticketId: string, sessionId: string, date: string, qty: number) => void;
  applyDiscount: (code: string, amount: number) => void;
  clearDiscount: () => void;
  clearCart: () => void;
  total: () => number;
  grandTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      discountCode: '',
      discountAmount: 0,

      addItem: (item) => set((s) => {
        const existing = s.items.findIndex(
          i => i.ticketId === item.ticketId && i.sessionId === item.sessionId && i.date === item.date
        );
        if (existing >= 0) {
          const items = [...s.items];
          items[existing] = { ...items[existing], qty: items[existing].qty + item.qty };
          return { items };
        }
        return { items: [...s.items, item] };
      }),

      removeItem: (ticketId, sessionId, date) => set((s) => ({
        items: s.items.filter(i => !(i.ticketId === ticketId && i.sessionId === sessionId && i.date === date))
      })),

      updateQty: (ticketId, sessionId, date, qty) => set((s) => ({
        items: s.items.map(i =>
          i.ticketId === ticketId && i.sessionId === sessionId && i.date === date
            ? { ...i, qty }
            : i
        ).filter(i => i.qty > 0)
      })),

      applyDiscount: (code, amount) => set({ discountCode: code, discountAmount: amount }),
      clearDiscount: () => set({ discountCode: '', discountAmount: 0 }),
      clearCart: () => set({ items: [], discountCode: '', discountAmount: 0 }),

      total: () => get().items.reduce((s, i) => s + i.unitPrice * i.qty, 0),
      grandTotal: () => Math.max(0, get().total() - get().discountAmount),
    }),
    { name: 'kishview-cart', partialize: (s) => ({ items: s.items, discountCode: s.discountCode, discountAmount: s.discountAmount }) }
  )
);
