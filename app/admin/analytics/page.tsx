import { Metadata } from 'next';
import styles from '@/admin-panel/AdminPanel.module.css';

export const metadata: Metadata = {
  title: 'Data Analytics | Admin',
};

export default function AdminAnalyticsPage() {
  return (
    <div className={styles.recentProducts}>
      <div className={styles.sectionHeader}>
        <h2>Advanced Analytics</h2>
      </div>
      <p style={{ color: '#71717a' }}>Deep dive into store performance and conversion metrics.</p>
      
      <div style={{ marginTop: '2rem', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #e4e4e7', borderRadius: '12px', color: '#a1a1aa' }}>
        Analytics engine is processing data...
      </div>
    </div>
  );
}
