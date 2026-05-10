import { Metadata } from 'next';
import styles from '@/admin-panel/AdminPanel.module.css';

export const metadata: Metadata = {
  title: 'Product Catalog | Admin',
};

export default function AdminProductsPage() {
  return (
    <div className={styles.recentProducts}>
      <div className={styles.sectionHeader}>
        <h2>Product Catalog</h2>
        <button className={styles.addBtn}>Add New Product</button>
      </div>
      <p style={{ color: '#71717a' }}>Manage your store inventory and product listings.</p>
      
      <div style={{ marginTop: '2rem', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #e4e4e7', borderRadius: '12px', color: '#a1a1aa' }}>
        Product list is loading...
      </div>
    </div>
  );
}
