'use client';

import AdminSidebar from '@/components/admin/AdminSidebar';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styles from '@/admin-panel/AdminPanel.module.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

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
      <AdminSidebar />
      <div className={styles.mainContent}>
        <header className={styles.header}>
          <h1>Dashboard</h1>
          <div className={styles.adminProfile}>
            <div className={styles.avatar}>
              {(user.email?.[0] || 'A').toUpperCase()}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{user.email}</span>
              <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>{profile?.role || 'Admin'}</span>
            </div>
          </div>
        </header>

        <main>
          {children}
        </main>
      </div>
    </div>
  );
}
