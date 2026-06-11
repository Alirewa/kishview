import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Ticket, ShoppingBag, MapPin, LogOut } from 'lucide-react';

const navItems = [
  { href: '/admin/dashboard', label: 'داشبورد', icon: LayoutDashboard },
  { href: '/admin/dashboard/tickets', label: 'بلیت‌ها', icon: Ticket },
  { href: '/admin/dashboard/orders', label: 'سفارشات', icon: ShoppingBag },
  { href: '/admin/dashboard/places', label: 'مکان‌های پیشنهادی', icon: MapPin },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();
  if (!session) redirect('/admin/login');

  return (
    <div className="min-h-screen bg-zinc-950 flex" dir="rtl">
      {/* Sidebar */}
      <aside className="w-56 bg-zinc-900 border-l border-zinc-800 flex flex-col">
        <div className="p-5 border-b border-zinc-800">
          <div className="text-white font-bold text-lg">کیش ویو</div>
          <div className="text-zinc-500 text-xs mt-0.5">پنل مدیریت</div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors text-sm"
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-zinc-800">
          <Link
            href="/api/auth/signout"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition-colors text-sm"
          >
            <LogOut className="w-4 h-4" />
            خروج
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
