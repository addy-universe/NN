'use client';

import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import productsData from '@/data/products.json';
import { formatPrice } from '@/lib/data';

export default function AdminProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const products = productsData.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading">Products</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your product catalog</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-3 bg-brand-700 text-white font-semibold rounded-xl hover:bg-brand-800 transition-colors text-sm">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
        />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-3">Product</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-3">Category</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-3">Price</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-3">Rating</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center shrink-0">
                        <span className="text-lg">🌿</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 line-clamp-1">{p.name}</p>
                        <p className="text-xs text-gray-500">SKU: {p.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 capitalize">{p.category.replace('-', ' ')}</td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold">{formatPrice(p.price)}</span>
                    <span className="text-xs text-gray-400 line-through ml-2">{formatPrice(p.comparePrice)}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">⭐ {p.rating} ({p.reviewCount})</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${p.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {p.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"><Eye className="w-4 h-4" /></button>
                      <button className="p-2 text-gray-400 hover:text-brand-600 rounded-lg hover:bg-brand-50 transition-colors"><Edit className="w-4 h-4" /></button>
                      <button className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
