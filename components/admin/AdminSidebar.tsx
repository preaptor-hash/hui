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
  BarChart3,
  X
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import styles from '@/admin-panel/AdminPanel.module.css';

interface AdminSidebarProps {
  onClose?: () => void;
}

export default function AdminSidebar({ onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const handleNavClick = (href: string) => {
    router.push(href);
    if (onClose) onClose();
  };

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

  return (
    <>
      <div className={styles.logo} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '0 0.5rem' }}>
        <h2 style={{ color: '#18181b' }}>Indica<span style={{ color: '#6366f1' }}>Admin</span></h2>
        {onClose && (
          <button 
            onClick={onClose} 
            style={{ background: 'transparent', border: 'none', color: '#18181b', cursor: 'pointer' }}
            className="mobile-only"
          >
            <X size={24} />
          </button>
        )}
      </div>
      
      <nav style={{ width: '100%' }}>
        <ul className={styles.navList}>
          {menuItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            
            return (
              <li 
                key={item.name}
                className={isActive ? styles.active : ''}
                onClick={() => handleNavClick(item.href)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer' }}
              >
                <Icon size={20} color={isActive ? '#fff' : '#71717a'} />
                {item.name}
              </li>
            );
          })}
        </ul>
      </nav>

      <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid #e4e4e7', width: '100%' }}>
        <button
          onClick={handleLogout}
          className={styles.addBtn}
          style={{ width: '100%', background: 'transparent', border: '1px solid #e4e4e7', color: '#18181b', display: 'flex', alignItems: 'center', gap: '0.8rem', justifyContent: 'center' }}
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>

      <style jsx>{`
        @media (min-width: 769px) {
          .mobile-only { display: none !important; }
        }
      `}</style>
    </>
  );
}
