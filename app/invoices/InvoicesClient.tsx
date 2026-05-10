'use client';

import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getCustomerInvoices } from '@/actions/invoices';
import InvoiceList from '@/features/invoices/components/InvoiceList';

export default function InvoicesClient() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [invoices, setInvoices] = useState<Record<string, any>[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login?redirect=/invoices');
      } else {
        getCustomerInvoices(user.id).then(data => {
          setInvoices(data);
          setFetching(false);
        }).catch(err => {
          console.error(err);
          setFetching(false);
        });
      }
    }
  }, [user, loading, router]);

  if (loading || fetching) return <div className="p-8 text-center text-gray-500">Loading your invoices...</div>;
  if (!user) return null;

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 page-content">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">My Invoices</h1>
        <p className="mt-2 text-sm text-gray-500">
          View and download your past invoices.
        </p>
      </div>
      
      <InvoiceList initialInvoices={invoices} />
    </div>
  );
}
