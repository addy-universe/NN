'use client';

import { Plus, Edit, Trash2, Tag } from 'lucide-react';

const coupons = [
  { id: 1, code: 'NIROG50', discount: '50% off', type: 'Percentage', minOrder: '₹499', usageLimit: 1000, used: 423, status: 'Active', expiry: '2026-06-30' },
  { id: 2, code: 'USER5', discount: '5% off', type: 'Percentage', minOrder: '₹549', usageLimit: 500, used: 189, status: 'Active', expiry: '2026-12-31' },
  { id: 3, code: 'FIRST100', discount: '₹100 off', type: 'Fixed', minOrder: '₹999', usageLimit: 200, used: 200, status: 'Expired', expiry: '2026-04-30' },
];

export default function AdminCouponsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold font-heading">Coupons</h1><p className="text-sm text-gray-500 mt-1">Manage discount codes and offers</p></div>
        <button className="flex items-center gap-2 px-5 py-3 bg-brand-700 text-white font-semibold rounded-xl hover:bg-brand-800 text-sm"><Plus className="w-4 h-4" /> Create Coupon</button>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead><tr className="bg-gray-50">
            <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-3">Code</th>
            <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-3">Discount</th>
            <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-3">Min Order</th>
            <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-3">Usage</th>
            <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-3">Expiry</th>
            <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-3">Status</th>
            <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-3">Actions</th>
          </tr></thead>
          <tbody className="divide-y divide-gray-50">
            {coupons.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-6 py-4"><span className="text-sm font-mono font-bold text-brand-700 bg-brand-50 px-3 py-1 rounded-lg">{c.code}</span></td>
                <td className="px-6 py-4 text-sm font-medium">{c.discount}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{c.minOrder}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{c.used}/{c.usageLimit}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{c.expiry}</td>
                <td className="px-6 py-4"><span className={`text-xs px-2.5 py-1 rounded-full font-medium ${c.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{c.status}</span></td>
                <td className="px-6 py-4"><div className="flex gap-2"><button className="p-2 text-gray-400 hover:text-brand-600 rounded-lg hover:bg-brand-50"><Edit className="w-4 h-4" /></button><button className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"><Trash2 className="w-4 h-4" /></button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
