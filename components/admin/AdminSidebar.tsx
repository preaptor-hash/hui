'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  Package, 
  FileText, 
  Settings, 
  LogOut,
  Truck,
  RotateCcw,
  BarChart3
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

const menuItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Inventory', href: '/admin/inventory', icon: Truck },
  { name: 'Customers', href: '/admin/customers', icon: Users },
  { name: 'Invoices', href: '/admin/invoices', icon: FileText },
  { name: 'Refunds', href: '/admin/refunds', icon: RotateCcw },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div className="flex flex-col w-64 bg-[#0a0a0b] text-zinc-400 h-screen sticky top-0 border-r border-zinc-800/50">
      <div className="flex items-center justify-center h-20 border-b border-zinc-800/50">
        <Link href="/admin" className="text-2xl font-bold text-white tracking-tight">
          Indica<span className="text-zinc-500 font-light">Admin</span>
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-4">
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors group ${
                  isActive 
                    ? 'bg-white/10 text-white shadow-sm' 
                    : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className={`mr-3 flex-shrink-0 h-5 w-5 ${isActive ? 'text-white' : 'text-zinc-500 group-hover:text-white'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-zinc-800/50">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg text-zinc-400 hover:bg-white/5 hover:text-white transition-colors group"
        >
          <LogOut className="mr-3 flex-shrink-0 h-5 w-5 text-zinc-500 group-hover:text-white" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
