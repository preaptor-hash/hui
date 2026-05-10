import { createClient } from '@/lib/supabase/server';
import { Metadata } from 'next';
import { User, Mail, Search, MoreHorizontal, History } from 'lucide-react';
import styles from '@/admin-panel/AdminPanel.module.css';

export const metadata: Metadata = {
  title: 'Customer Directory | Admin',
};

export const dynamic = 'force-dynamic';

export default async function AdminCustomersPage() {
  const supabase = await createClient();
  const { data: customers } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'customer')
    .order('created_at', { ascending: false });

  return (
    <div className={styles.recentProducts}>
      <div className={styles.sectionHeader}>
        <div className={styles.headerTitle}>
          <h2>Customer Directory</h2>
          <p className={styles.subtitle}>Manage your customer relationships</p>
        </div>
        <div className={styles.headerActions}>
           <div className={styles.searchBox}>
            <Search size={18} />
            <input type="text" placeholder="Search by name or email..." />
          </div>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Contact</th>
              <th>Joined Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers?.map((customer) => (
              <tr key={customer.id}>
                <td>
                  <div className={styles.productCell}>
                    <div className={styles.avatar}>
                      {customer.full_name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <span className={styles.pName}>{customer.full_name || 'Anonymous User'}</span>
                      <span className={styles.pId}>UID: {customer.id.slice(0, 8)}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className={styles.customerCell}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#1e293b' }}>
                      <Mail size={14} />
                      <span style={{ fontSize: '0.9rem' }}>{customer.email || 'No email'}</span>
                    </div>
                  </div>
                </td>
                <td>
                   <span style={{ color: '#64748b', fontSize: '0.9rem' }}>
                    {new Date(customer.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                   </span>
                </td>
                <td>
                  <span className={`${styles.statusBadge} ${styles.active}`}>
                    Active
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.actionBtn} title="View History"><History size={16} /></button>
                    <button className={styles.actionBtn} title="More Options"><MoreHorizontal size={16} /></button>
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

