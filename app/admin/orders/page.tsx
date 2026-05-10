import { Metadata } from 'next';
import styles from '@/admin-panel/AdminPanel.module.css';

export const metadata: Metadata = {
  title: 'Order Management | Admin',
};

export default function AdminOrdersPage() {
  return (
    <div className={styles.recentProducts}>
      <div className={styles.sectionHeader}>
        <h2>Order Management</h2>
        <button className={styles.addBtn}>Export Orders</button>
      </div>
      <p style={{ color: '#71717a' }}>View and manage customer orders here.</p>
      
      <div style={{ marginTop: '2rem', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #e4e4e7', borderRadius: '12px', color: '#a1a1aa' }}>
        No orders found in the database.
      </div>
    </div>
  );
}
