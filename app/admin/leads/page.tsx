'use client';

import { Mail, Phone, Calendar, Eye } from 'lucide-react';

const leads = [
  { id: 1, name: 'Amit Kumar', email: 'amit@gmail.com', phone: '+91 98765 43210', source: 'Newsletter', date: '2026-05-23', status: 'New' },
  { id: 2, name: 'Sunita Rao', email: 'sunita@yahoo.com', phone: '+91 87654 32109', source: 'Contact Form', date: '2026-05-22', status: 'Contacted' },
  { id: 3, name: 'Rajesh Patel', email: 'rajesh@outlook.com', phone: '+91 76543 21098', source: 'Consultation', date: '2026-05-21', status: 'Converted' },
  { id: 4, name: 'Meena Sharma', email: 'meena@gmail.com', phone: '+91 65432 10987', source: 'Newsletter', date: '2026-05-20', status: 'New' },
];

export default function AdminLeadsPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold font-heading">Leads & Forms</h1><p className="text-sm text-gray-500 mt-1">Track newsletter signups, contact forms, and consultation requests</p></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[{ label: 'Total Leads', value: '342', color: 'bg-blue-500' }, { label: 'New This Week', value: '28', color: 'bg-green-500' }, { label: 'Contacted', value: '156', color: 'bg-yellow-500' }, { label: 'Converted', value: '89', color: 'bg-purple-500' }].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5"><div className={`w-8 h-8 ${s.color} rounded-lg flex items-center justify-center mb-3`}><span className="text-white text-xs font-bold">#</span></div><p className="text-2xl font-bold">{s.value}</p><p className="text-xs text-gray-500">{s.label}</p></div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead><tr className="bg-gray-50">
            <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-3">Name</th>
            <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-3">Contact</th>
            <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-3">Source</th>
            <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-3">Date</th>
            <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-3">Status</th>
          </tr></thead>
          <tbody className="divide-y divide-gray-50">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{lead.name}</td>
                <td className="px-6 py-4"><p className="text-xs text-gray-600">{lead.email}</p><p className="text-xs text-gray-500">{lead.phone}</p></td>
                <td className="px-6 py-4 text-sm text-gray-600">{lead.source}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{lead.date}</td>
                <td className="px-6 py-4"><span className={`text-xs px-2.5 py-1 rounded-full font-medium ${lead.status === 'New' ? 'bg-blue-100 text-blue-700' : lead.status === 'Contacted' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{lead.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
