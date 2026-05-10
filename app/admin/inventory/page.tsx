import { Metadata } from 'next';
import styles from '@/admin-panel/AdminPanel.module.css';

export const metadata: Metadata = {
  title: 'Inventory & Stock | Admin',
};

export default function AdminInventoryPage() {
  return (
    <div className={styles.recentProducts}>
      <div className={styles.sectionHeader}>
        <h2>Inventory Management</h2>
      </div>
      <p style={{ color: '#71717a' }}>Track stock levels and warehouse updates.</p>
      
      <div style={{ marginTop: '2rem', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #e4e4e7', borderRadius: '12px', color: '#a1a1aa' }}>
        Inventory tracking active.
      </div>
    </div>
  );
}
