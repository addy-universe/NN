'use client';

import { Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';

const banners = [
  { id: 1, title: 'Flash Sale Banner', status: 'Active', position: 'Hero', page: 'Homepage' },
  { id: 2, title: 'New Product Launch', status: 'Active', position: 'Secondary', page: 'Homepage' },
  { id: 3, title: 'Offer Banner', status: 'Draft', position: 'Mid-page', page: 'Shop' },
];

export default function AdminBannersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading">Banners</h1>
          <p className="text-sm text-gray-500 mt-1">Manage homepage and promotional banners</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-3 bg-brand-700 text-white font-semibold rounded-xl hover:bg-brand-800 transition-colors text-sm">
          <Plus className="w-4 h-4" /> Add Banner
        </button>
      </div>

      <div className="grid gap-4">
        {banners.map((banner) => (
          <div key={banner.id} className="bg-white rounded-2xl border border-gray-100 p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-14 bg-gray-100 rounded-xl flex items-center justify-center"><ImageIcon className="w-6 h-6 text-gray-400" /></div>
              <div>
                <h3 className="font-semibold text-gray-900">{banner.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{banner.position} · {banner.page}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${banner.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{banner.status}</span>
              <div className="flex items-center gap-2">
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
