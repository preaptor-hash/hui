'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { updateRefundStatus } from '@/actions/refunds';

export default function AdminRefundList({ initialRefunds }: { initialRefunds: Record<string, any>[] }) {
  const [refunds, setRefunds] = useState(initialRefunds);
  const [searchTerm, setSearchTerm] = useState('');
  const [processingId, setProcessingId] = useState<string | null>(null);

  const filteredRefunds = refunds.filter(refund => 
    refund.refund_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    refund.profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'processed': return 'bg-blue-100 text-blue-800';
      case 'pending':
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      setProcessingId(id);
      const updated = await updateRefundStatus(id, newStatus, `Admin marked as ${newStatus}`);
      setRefunds(current => current.map(r => r.id === id ? { ...r, refund_status: newStatus } : r));
    } catch (error) {
      console.error('Failed to update refund status:', error);
      alert('Failed to update status');
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <h2 className="text-xl font-bold text-gray-900">Refund Requests</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search refunds..."
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
              <th className="px-6 py-4">Refund No</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredRefunds.map((refund) => (
              <tr key={refund.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{refund.refund_number}</td>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{refund.profiles?.full_name || 'N/A'}</div>
                  <div className="text-xs text-gray-500">{refund.profiles?.email || 'N/A'}</div>
                </td>
                <td className="px-6 py-4">{format(new Date(refund.created_at), 'MMM dd, yyyy')}</td>
                <td className="px-6 py-4 capitalize">{refund.refund_type}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(refund.refund_status)}`}>
                    {refund.refund_status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  {refund.refund_status === 'pending' ? (
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleStatusUpdate(refund.id, 'approved')}
                        disabled={processingId === refund.id}
                        className="text-green-600 hover:bg-green-50 px-3 py-1.5 rounded-md font-medium transition-colors border border-green-200"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(refund.id, 'rejected')}
                        disabled={processingId === refund.id}
                        className="text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-md font-medium transition-colors border border-red-200"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span className="text-gray-400 italic">Resolved</span>
                  )}
                </td>
              </tr>
            ))}
            {filteredRefunds.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  No refunds found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
