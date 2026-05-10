import { getAllRefunds } from '@/actions/refunds';
import AdminRefundList from '@/features/refunds/components/AdminRefundList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refunds Management | Admin Dashboard',
};

export const dynamic = 'force-dynamic';

// Next.js App Router Page
export default async function AdminRefundsPage() {
  const refunds = await getAllRefunds();

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Refunds & Returns</h1>
          <p className="mt-2 text-sm text-gray-500">
            Review, approve, and process customer refund requests.
          </p>
        </div>
      </div>
      
      <AdminRefundList initialRefunds={refunds} />
    </div>
  );
}
