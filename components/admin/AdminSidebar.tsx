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
import styles from '@/admin-panel/AdminPanel.module.css';

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
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <h2>Indica<span>Admin</span></h2>
      </div>
      
      <nav>
        <ul>
          {menuItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            
            return (
              <li 
                key={item.name}
                className={isActive ? styles.active : ''}
                onClick={() => router.push(item.href)}
              >
                <Icon size={20} />
                {item.name}
              </li>
            );
          })}
        </ul>
      </nav>

      <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <button
          onClick={handleLogout}
          className={styles.addBtn}
          style={{ width: '100%', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.8rem', justifyContent: 'center' }}
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
