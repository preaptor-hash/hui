'use client';

import AdminSidebar from '@/components/admin/AdminSidebar';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import styles from '@/admin-panel/AdminPanel.module.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login?redirect=/admin');
      } else if (profile && profile.role !== 'admin' && profile.role !== 'manager' && profile.role !== 'super_admin') {
        router.push('/');
      }
    }
  }, [user, profile, loading, router]);

  if (loading) {
    return <div className={styles.loginContainer}>Loading Admin...</div>;
  }

  if (!user || (profile && profile.role !== 'admin' && profile.role !== 'manager' && profile.role !== 'super_admin')) return null;

  return (
    <div className={styles.adminContainer}>
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className={styles.sidebarOverlay} 
          style={{ display: 'block' }} 
          onClick={() => setIsSidebarOpen(false)} 
        />
      )}

      {/* Sidebar with mobile state */}
      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
        <AdminSidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      <div className={styles.mainContent}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <button 
              className={styles.menuBtn} 
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h1>Dashboard</h1>
          </div>
          
          <div className={styles.adminProfile}>
            <div className={styles.avatar}>
              {(user.email?.[0] || 'A').toUpperCase()}
            </div>
            <div style={{ display: 'none' }} className="md-flex"> {/* Desktop only text */}
              <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{user.email}</span>
            </div>
          </div>
        </header>

        <main>
          {children}
        </main>
      </div>

      <style jsx global>{`
        @media (min-width: 769px) {
          .md-flex { display: flex !important; flex-direction: column; }
        }
      `}</style>
    </div>
  );
}
