'use client';

import { Plus, Edit, Trash2, Star } from 'lucide-react';
import testimonialsData from '@/data/testimonials.json';

export default function AdminTestimonialsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading">Testimonials</h1>
          <p className="text-sm text-gray-500 mt-1">Manage customer testimonials</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-3 bg-brand-700 text-white font-semibold rounded-xl hover:bg-brand-800 transition-colors text-sm">
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      <div className="grid gap-4">
        {testimonialsData.map((t) => (
          <div key={t.id} className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-brand-700">{t.initials}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{t.name}</h3>
                  <p className="text-xs text-gray-500">{t.role}, {t.location}</p>
                  <div className="flex gap-0.5 mt-1">{[...Array(t.rating)].map((_, i) => <Star key={i} className="w-3 h-3 text-gold-400 fill-gold-400" />)}</div>
                  <p className="text-sm text-gray-600 mt-2 max-w-lg">{t.text}</p>
                  <p className="text-xs text-brand-600 mt-1">Product: {t.product}</p>
                </div>
              </div>
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
