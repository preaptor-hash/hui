import { getCustomerInvoices } from '@/actions/invoices';
import InvoiceList from '@/features/invoices/components/InvoiceList';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Invoices | Your Store',
};

export const dynamic = 'force-dynamic';

export default async function CustomerInvoicesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const invoices = await getCustomerInvoices(user.id);

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
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
