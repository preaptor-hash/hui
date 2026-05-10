import { getAllInvoices } from '@/actions/invoices';
import AdminInvoiceList from '@/features/invoices/components/AdminInvoiceList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Invoice Management | Admin Dashboard',
};

export const dynamic = 'force-dynamic';

// Next.js App Router Page
export default async function AdminInvoicesPage() {
  const invoices = await getAllInvoices();

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Invoices</h1>
          <p className="mt-2 text-sm text-gray-500">
            Manage and view all customer invoices across the platform.
          </p>
        </div>
      </div>
      
      <AdminInvoiceList initialInvoices={invoices} />
    </div>
  );
}
