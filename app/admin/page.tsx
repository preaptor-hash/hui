import { createClient } from '@/lib/supabase/server';
import { IndianRupee, ShoppingCart, Users, Package } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard Overview',
};

export const dynamic = 'force-dynamic';

// Next.js App Router Page
export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // Basic Aggregations (Mocked logic for speed, normally you'd use SQL COUNT or an RPC)
  const [{ count: orderCount }, { count: productCount }, { count: customerCount }] = await Promise.all([
    supabase.from('orders').select('*', { count: 'exact', head: true }),
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'customer'),
  ]);

  // Total Revenue calculation (ideally done via sum in SQL)
  const { data: revenueData } = await supabase
    .from('orders')
    .select('grand_total')
    .eq('status', 'delivered');

  const totalRevenue = revenueData?.reduce((sum: number, order: any) => sum + Number(order.grand_total), 0) || 0;

  const kpis = [
    { title: 'Total Revenue', value: `₹${totalRevenue.toLocaleString('en-IN')}`, icon: IndianRupee, color: 'text-zinc-900', bg: 'bg-zinc-100' },
    { title: 'Total Orders', value: orderCount || 0, icon: ShoppingCart, color: 'text-zinc-800', bg: 'bg-zinc-100' },
    { title: 'Total Customers', value: customerCount || 0, icon: Users, color: 'text-zinc-700', bg: 'bg-zinc-100/80' },
    { title: 'Total Products', value: productCount || 0, icon: Package, color: 'text-zinc-600', bg: 'bg-zinc-100/50' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Dashboard Overview</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Your enterprise performance metrics and recent activities.
        </p>
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.title} className="bg-white rounded-xl shadow-sm border border-zinc-200/50 p-6 flex items-center space-x-4 transition-all hover:shadow-md">
              <div className={`p-3 rounded-full ${kpi.bg}`}>
                <Icon className={`w-6 h-6 ${kpi.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-500">{kpi.title}</p>
                <p className="text-2xl font-bold text-zinc-900">{kpi.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-zinc-200/50 p-6 min-h-[400px]">
          <h2 className="text-lg font-bold text-zinc-900 mb-4">Revenue Analytics</h2>
          <div className="flex items-center justify-center h-full text-zinc-400 border-2 border-dashed border-zinc-100 rounded-lg">
            [ Recharts Line Graph Placeholder ]
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-zinc-200/50 p-6">
          <h2 className="text-lg font-bold text-zinc-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {/* Activity Items Placeholder */}
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-start space-x-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-zinc-800 mt-1.5" />
                <div>
                  <p className="font-medium text-zinc-900">New order #ORD-{1000 + i}</p>
                  <p className="text-zinc-500">2 minutes ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
