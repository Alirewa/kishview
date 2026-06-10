export interface TicketSession {
  id: string;
  name: string;
  time?: string;
  price: number;
  capacity: number;
}

export interface Ticket {
  id: string;
  placeId?: string;
  name: string;
  description: string;
  imageUrl?: string;
  category: string;
  coordinates?: [number, number];
  address?: string;
  sessions: TicketSession[];
  active: boolean;
  featured: boolean;
}

export interface CartItem {
  ticketId: string;
  ticketName: string;
  sessionId: string;
  sessionName: string;
  date: string;
  qty: number;
  unitPrice: number;
}

export interface OrderCustomer {
  name: string;
  phone: string;
  nationalId: string;
  email: string;
}

export type OrderStatus =
  | 'pending'
  | 'paid'
  | 'confirmed'
  | 'rejected'
  | 'receipt_uploaded';

export interface Order {
  id: string;
  createdAt: string;
  status: OrderStatus;
  customer: OrderCustomer;
  items: CartItem[];
  discountCode?: string;
  discountAmount: number;
  total: number;
  grandTotal: number;
  receiptUrl?: string;
}

export interface PendingPlace {
  id: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
  title: string;
  description: string;
  coordinates?: { lat: number; lng: number };
  submitterName?: string;
}
