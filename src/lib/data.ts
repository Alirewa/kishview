import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import type { Ticket, Order, PendingPlace } from '@/types/shop';

const DATA_DIR = path.join(process.cwd(), 'data');

function read<T>(file: string): T[] {
  const p = path.join(DATA_DIR, file);
  if (!fs.existsSync(p)) return [];
  return JSON.parse(fs.readFileSync(p, 'utf-8'));
}

function write<T>(file: string, data: T[]): void {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(data, null, 2), 'utf-8');
}

export const ticketsDb = {
  all: () => read<Ticket>('tickets.json'),
  active: () => read<Ticket>('tickets.json').filter(t => t.active),
  find: (id: string) => read<Ticket>('tickets.json').find(t => t.id === id),
  save: (tickets: Ticket[]) => write('tickets.json', tickets),
  upsert: (ticket: Ticket) => {
    const all = read<Ticket>('tickets.json');
    const idx = all.findIndex(t => t.id === ticket.id);
    if (idx >= 0) all[idx] = ticket; else all.push(ticket);
    write('tickets.json', all);
  },
  delete: (id: string) => write('tickets.json', read<Ticket>('tickets.json').filter(t => t.id !== id)),
};

export const ordersDb = {
  all: () => read<Order>('orders.json'),
  find: (id: string) => read<Order>('orders.json').find(o => o.id === id),
  create: (data: Omit<Order, 'id' | 'createdAt'>): Order => {
    const order: Order = { id: randomUUID(), createdAt: new Date().toISOString(), ...data };
    const all = read<Order>('orders.json');
    all.unshift(order);
    write('orders.json', all);
    return order;
  },
  update: (id: string, patch: Partial<Order>) => {
    const all = read<Order>('orders.json');
    const idx = all.findIndex(o => o.id === id);
    if (idx >= 0) all[idx] = { ...all[idx], ...patch };
    write('orders.json', all);
  },
};

export const placesDb = {
  all: () => read<PendingPlace>('pending-places.json'),
  create: (data: Omit<PendingPlace, 'id' | 'createdAt' | 'status'>): PendingPlace => {
    const place: PendingPlace = { id: randomUUID(), createdAt: new Date().toISOString(), status: 'pending', ...data };
    const all = read<PendingPlace>('pending-places.json');
    all.unshift(place);
    write('pending-places.json', all);
    return place;
  },
  update: (id: string, patch: Partial<PendingPlace>) => {
    const all = read<PendingPlace>('pending-places.json');
    const idx = all.findIndex(p => p.id === id);
    if (idx >= 0) all[idx] = { ...all[idx], ...patch };
    write('pending-places.json', all);
  },
  delete: (id: string) => write('pending-places.json', read<PendingPlace>('pending-places.json').filter(p => p.id !== id)),
};
