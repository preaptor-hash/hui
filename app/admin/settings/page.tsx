import { Metadata } from 'next';
import styles from '@/admin-panel/AdminPanel.module.css';

export const metadata: Metadata = {
  title: 'Enterprise Settings | Admin',
};

export default function AdminSettingsPage() {
  return (
    <div className={styles.recentProducts}>
      <div className={styles.sectionHeader}>
        <h2>Admin Settings</h2>
        <button className={styles.addBtn}>Save Changes</button>
      </div>
      <p style={{ color: '#71717a' }}>Configure store global parameters and admin permissions.</p>
      
      <div style={{ marginTop: '2rem', display: 'grid', gap: '1.5rem' }}>
        <div className={styles.formGroup}>
          <label>Store Name</label>
          <input type="text" defaultValue="Indica Luxe" />
        </div>
        <div className={styles.formGroup}>
          <label>Support Email</label>
          <input type="email" defaultValue="support@indicaluxe.com" />
        </div>
      </div>
    </div>
  );
}
