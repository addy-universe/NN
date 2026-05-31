'use client';

import { Plus, Edit, Trash2 } from 'lucide-react';
import faqsData from '@/data/faqs.json';

export default function AdminFAQsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold font-heading">FAQs</h1><p className="text-sm text-gray-500 mt-1">Manage frequently asked questions</p></div>
        <button className="flex items-center gap-2 px-5 py-3 bg-brand-700 text-white font-semibold rounded-xl hover:bg-brand-800 text-sm"><Plus className="w-4 h-4" /> Add FAQ</button>
      </div>
      <div className="space-y-3">
        {faqsData.map((faq) => (
          <div key={faq.id} className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-start justify-between gap-4">
              <div><h3 className="font-semibold text-gray-900 text-sm">{faq.question}</h3><p className="text-sm text-gray-500 mt-2 line-clamp-2">{faq.answer}</p></div>
              <div className="flex items-center gap-2 shrink-0">
                <button className="p-2 text-gray-400 hover:text-brand-600 rounded-lg hover:bg-brand-50"><Edit className="w-4 h-4" /></button>
                <button className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
