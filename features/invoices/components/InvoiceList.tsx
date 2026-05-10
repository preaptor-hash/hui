'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { getInvoiceDownloadUrl } from '@/actions/invoices';

export default function InvoiceList({ initialInvoices }: { initialInvoices: Record<string, any>[] }) {
  const [invoices] = useState(initialInvoices);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleDownload = async (pdfUrl: string, id: string) => {
    try {
      setLoadingId(id);
      const url = await getInvoiceDownloadUrl(pdfUrl);
      window.open(url, '_blank');
    } catch (error) {
      console.error('Failed to download invoice:', error);
      alert('Failed to download invoice');
    } finally {
      setLoadingId(null);
    }
  };

  if (!invoices.length) {
    return (
      <div className="bg-white rounded-lg p-8 text-center border border-gray-100">
        <h3 className="text-xl font-medium text-gray-900 mb-2">No Invoices Found</h3>
        <p className="text-gray-500">You haven't generated any invoices yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-gray-700 text-xs uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">Invoice No</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{invoice.invoice_number}</td>
                <td className="px-6 py-4">{format(new Date(invoice.issued_at), 'MMM dd, yyyy')}</td>
                <td className="px-6 py-4">₹{invoice.grand_total.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {invoice.payment_status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  {invoice.pdf_url ? (
                    <button
                      onClick={() => handleDownload(invoice.pdf_url, invoice.id)}
                      disabled={loadingId === invoice.id}
                      className="text-blue-600 hover:text-blue-900 font-medium disabled:opacity-50"
                    >
                      {loadingId === invoice.id ? 'Downloading...' : 'Download PDF'}
                    </button>
                  ) : (
                    <span className="text-gray-400">Processing...</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
