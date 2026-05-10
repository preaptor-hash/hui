import { Metadata } from 'next';
import styles from '@/admin-panel/AdminPanel.module.css';

export const metadata: Metadata = {
  title: 'Customer Directory | Admin',
};

export default function AdminCustomersPage() {
  return (
    <div className={styles.recentProducts}>
      <div className={styles.sectionHeader}>
        <h2>Customer Management</h2>
      </div>
      <p style={{ color: '#71717a' }}>View customer profiles and order history.</p>
      
      <div style={{ marginTop: '2rem', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #e4e4e7', borderRadius: '12px', color: '#a1a1aa' }}>
        Customer database is currently empty.
      </div>
    </div>
  );
}
