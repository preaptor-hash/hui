import { createClient } from '@/lib/supabase/server';
import { Metadata } from 'next';
import Image from 'next/image';
import { Edit, Trash2, Plus, Search, Filter } from 'lucide-react';
import styles from '@/admin-panel/AdminPanel.module.css';

export const metadata: Metadata = {
  title: 'Product Catalog | Admin',
};

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from('products')
    .select('*, categories(name)')
    .order('created_at', { ascending: false });

  return (
    <div className={styles.recentProducts}>
      <div className={styles.sectionHeader}>
        <div className={styles.headerTitle}>
          <h2>Product Catalog</h2>
          <p className={styles.subtitle}>Showing {products?.length || 0} items in your store</p>
        </div>
        <div className={styles.headerActions}>
          <div className={styles.searchBox}>
            <Search size={18} />
            <input type="text" placeholder="Search products..." />
          </div>
          <button className={styles.addBtn}>
            <Plus size={18} />
            <span>New Product</span>
          </button>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product.id}>
                <td>
                  <div className={styles.productCell}>
                    <div className={styles.miniImg}>
                      <Image src={product.image} alt={product.name} fill style={{ objectFit: 'cover' }} unoptimized />
                    </div>
                    <div>
                      <span className={styles.pName}>{product.name}</span>
                      <span className={styles.pId}>ID: {product.id.slice(0, 8)}</span>
                    </div>
                  </div>
                </td>
                <td>{product.categories?.name || 'Uncategorized'}</td>
                <td className={styles.priceCell}>₹{product.price.toLocaleString('en-IN')}</td>
                <td>
                  <span className={`${styles.stockBadge} ${product.stock < 10 ? styles.lowStock : ''}`}>
                    {product.stock} units
                  </span>
                </td>
                <td>
                  <span className={`${styles.statusBadge} ${product.active ? styles.active : styles.inactive}`}>
                    {product.active ? 'Active' : 'Draft'}
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.actionBtn} title="Edit"><Edit size={16} /></button>
                    <button className={`${styles.actionBtn} ${styles.delete}`} title="Delete"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

