import { createClient } from '@/lib/supabase/server';
import { Metadata } from 'next';
import { Eye, Download, Search, Filter, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import styles from '@/admin-panel/AdminPanel.module.css';

export const metadata: Metadata = {
  title: 'Order Management | Admin',
};

export const dynamic = 'force-dynamic';

export default async function AdminOrdersPage() {
  const supabase = await createClient();
  const { data: orders } = await supabase
    .from('orders')
    .select('*, profiles(full_name)')
    .order('created_at', { ascending: false });

  return (
    <div className={styles.recentProducts}>
      <div className={styles.sectionHeader}>
        <div className={styles.headerTitle}>
          <h2>Order Management</h2>
          <p className={styles.subtitle}>Track and fulfill customer orders</p>
        </div>
        <div className={styles.headerActions}>
           <div className={styles.searchBox}>
            <Search size={18} />
            <input type="text" placeholder="Order ID or Customer..." />
          </div>
          <button className={styles.addBtn} style={{ background: '#f1f5f9', color: '#1e293b' }}>
            <Download size={18} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order.id}>
                <td>
                  <span className={styles.pName}>#{order.id.slice(0, 8).toUpperCase()}</span>
                </td>
                <td>
                  <div className={styles.customerCell}>
                    <span className={styles.pName}>{order.profiles?.full_name || 'Guest'}</span>
                  </div>
                </td>
                <td>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '0.9rem' }}>
                    <Calendar size={14} />
                    {format(new Date(order.created_at), 'MMM dd, yyyy')}
                   </div>
                </td>
                <td className={styles.priceCell}>₹{order.grand_total?.toLocaleString('en-IN')}</td>
                <td>
                  <span className={`${styles.statusBadge} ${styles[order.status?.toLowerCase()] || ''}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.actionBtn} title="View Details"><Eye size={16} /></button>
                    <button className={styles.actionBtn} title="Download Invoice"><Download size={16} /></button>
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
