'use client';

import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getCustomerRefunds } from '@/actions/refunds';
import RefundList from '@/features/refunds/components/RefundList';

export default function RefundsClient() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [refunds, setRefunds] = useState<Record<string, any>[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login?redirect=/refunds');
      } else {
        getCustomerRefunds(user.id).then(data => {
          setRefunds(data);
          setFetching(false);
        }).catch(err => {
          console.error(err);
          setFetching(false);
        });
      }
    }
  }, [user, loading, router]);

  if (loading || fetching) return <div className="p-8 text-center text-gray-500">Loading your refunds...</div>;
  if (!user) return null;

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 page-content">
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
