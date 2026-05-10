import { createClient } from '@/lib/supabase/server';
import { IndianRupee, ShoppingCart, Users, Package } from 'lucide-react';
import { Metadata } from 'next';
import styles from '@/admin-panel/AdminPanel.module.css';

export const metadata: Metadata = {
  title: 'Dashboard Overview',
};

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // Basic Aggregations
  const [{ count: orderCount }, { count: productCount }, { count: customerCount }] = await Promise.all([
    supabase.from('orders').select('*', { count: 'exact', head: true }),
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'customer'),
  ]);

  const { data: revenueData } = await supabase
    .from('orders')
    .select('grand_total')
    .eq('status', 'delivered');

  const totalRevenue = revenueData?.reduce((sum: number, order: any) => sum + Number(order.grand_total), 0) || 0;

  const kpis = [
    { title: 'Total Revenue', value: `₹${totalRevenue.toLocaleString('en-IN')}`, icon: IndianRupee },
    { title: 'Total Orders', value: orderCount || 0, icon: ShoppingCart },
    { title: 'Total Customers', value: customerCount || 0, icon: Users },
    { title: 'Total Products', value: productCount || 0, icon: Package },
  ];

  return (
    <div>
      <div className={styles.sectionHeader}>
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ color: '#71717a', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Overview</p>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#18181b' }}>Enterprise Performance</h2>
        </div>
      </div>
      
      <div className={styles.statsGrid}>
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.title} className={styles.statCard}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3>{kpi.title}</h3>
                <Icon size={20} color="#6366f1" />
              </div>
              <div className={styles.statValue}>{kpi.value}</div>
              <div className={styles.statTrend}>+12.5% from last month</div>
            </div>
          );
        })}
      </div>

      <div className={styles.dashboardGrid}>
        <div className={styles.recentProducts} style={{ minHeight: '400px' }}>
          <div className={styles.sectionHeader}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#18181b' }}>Revenue Analytics</h3>
          </div>
          <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa', borderRadius: '12px', border: '1px dashed #e4e4e7', color: '#a1a1aa' }}>
            [ Real-time Chart Data ]
          </div>
        </div>

        <div className={styles.recentProducts}>
          <div className={styles.sectionHeader}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '600' }}>Recent Activity</h3>
          </div>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#6366f1', marginTop: '5px' }} />
                <div>
                  <p style={{ fontWeight: '600', color: '#18181b' }}>Order #ORD-{2000 + i} received</p>
                  <p style={{ color: '#71717a', fontSize: '0.75rem' }}>{i * 5} mins ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
