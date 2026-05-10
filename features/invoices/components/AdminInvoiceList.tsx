'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { getInvoiceDownloadUrl } from '@/actions/invoices';

export default function AdminInvoiceList({ initialInvoices }: { initialInvoices: Record<string, any>[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const filteredInvoices = initialInvoices.filter(invoice => 
    invoice.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <h2 className="text-xl font-bold text-gray-900">Invoice Management</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search invoices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none w-64 text-sm"
          />
          <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-gray-700 text-xs uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">Invoice No</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredInvoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{invoice.invoice_number}</td>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{invoice.profiles?.full_name || 'N/A'}</div>
                  <div className="text-xs text-gray-500">{invoice.profiles?.email || 'N/A'}</div>
                </td>
                <td className="px-6 py-4">{format(new Date(invoice.issued_at), 'MMM dd, yyyy')}</td>
                <td className="px-6 py-4">₹{invoice.grand_total.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    invoice.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {invoice.payment_status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  {invoice.pdf_url ? (
                    <button
                      onClick={() => handleDownload(invoice.pdf_url, invoice.id)}
                      disabled={loadingId === invoice.id}
                      className="text-blue-600 hover:text-blue-900 font-medium bg-blue-50 px-3 py-1.5 rounded-md hover:bg-blue-100 transition-colors disabled:opacity-50"
                    >
                      {loadingId === invoice.id ? 'Loading...' : 'View PDF'}
                    </button>
                  ) : (
                    <span className="text-gray-400 text-sm">No PDF</span>
                  )}
                </td>
              </tr>
            ))}
            {filteredInvoices.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  No invoices found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
