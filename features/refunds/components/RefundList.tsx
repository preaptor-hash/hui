'use client';

import { useState } from 'react';
import { format } from 'date-fns';

export default function RefundList({ initialRefunds }: { initialRefunds: Record<string, any>[] }) {
  const [refunds] = useState(initialRefunds);

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'processed': return 'bg-blue-100 text-blue-800';
      case 'pending':
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (!refunds.length) {
    return (
      <div className="bg-white rounded-lg p-8 text-center border border-gray-100">
        <h3 className="text-xl font-medium text-gray-900 mb-2">No Refunds Found</h3>
        <p className="text-gray-500">You haven't requested any refunds.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-gray-700 text-xs uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">Refund No</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Reason</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {refunds.map((refund) => (
              <tr key={refund.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{refund.refund_number}</td>
                <td className="px-6 py-4">{format(new Date(refund.created_at), 'MMM dd, yyyy')}</td>
                <td className="px-6 py-4 max-w-xs truncate">{refund.refund_reason}</td>
                <td className="px-6 py-4 capitalize">{refund.refund_type}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(refund.refund_status)}`}>
                    {refund.refund_status.replace('_', ' ')}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
