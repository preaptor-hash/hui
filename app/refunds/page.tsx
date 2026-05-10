import { getCustomerRefunds } from '@/actions/refunds';
import RefundList from '@/features/refunds/components/RefundList';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Refunds | Your Store',
};

export const dynamic = 'force-dynamic';

export default async function CustomerRefundsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const refunds = await getCustomerRefunds(user.id);

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">My Refunds & Returns</h1>
        <p className="mt-2 text-sm text-gray-500">
          Track the status of your refund and return requests.
        </p>
      </div>
      
      <RefundList initialRefunds={refunds} />
    </div>
  );
}
