'use client';

import { Save } from 'lucide-react';

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div><h1 className="text-2xl font-bold font-heading">Settings</h1><p className="text-sm text-gray-500 mt-1">Manage your site configuration</p></div>
      
      <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 space-y-6">
        <h2 className="text-lg font-bold font-heading">General</h2>
        <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Site Name</label><input type="text" defaultValue="NirogNature" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Tagline</label><input type="text" defaultValue="Premium Ayurvedic Wellness" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Support Email</label><input type="email" defaultValue="nirognature@gmail.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label><input type="tel" defaultValue="+91 98997 56597" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm" /></div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 space-y-6">
        <h2 className="text-lg font-bold font-heading">SEO</h2>
        <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Meta Title</label><input type="text" defaultValue="NirogNature — Premium Ayurvedic Wellness" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Meta Description</label><textarea rows={3} defaultValue="India's trusted premium Ayurvedic wellness brand." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm resize-none" /></div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 space-y-6">
        <h2 className="text-lg font-bold font-heading">Shipping</h2>
        <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Free Shipping Threshold (₹)</label><input type="number" defaultValue={499} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Standard Shipping Rate (₹)</label><input type="number" defaultValue={49} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm" /></div>
      </div>

      <button className="flex items-center gap-2 px-8 py-4 bg-brand-700 text-white font-semibold rounded-xl hover:bg-brand-800 transition-colors shadow-lg shadow-brand-700/25">
        <Save className="w-4 h-4" /> Save Settings
      </button>
    </div>
  );
}
