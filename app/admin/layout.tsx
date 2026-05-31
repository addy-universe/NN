'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Package, FileText, MessageSquare, Image as ImageIcon,
  HelpCircle, Settings, Users, Tag, Menu, X, LogOut, ChevronRight
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Blogs', href: '/admin/blogs', icon: FileText },
  { name: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
  { name: 'Banners', href: '/admin/banners', icon: ImageIcon },
  { name: 'FAQs', href: '/admin/faqs', icon: HelpCircle },
  { name: 'Leads', href: '/admin/leads', icon: Users },
  { name: 'Coupons', href: '/admin/coupons', icon: Tag },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-gray-900 text-white">
        <div className="p-6 border-b border-gray-800">
          <Link href="/admin" className="text-xl font-extrabold font-heading">
            <span className="text-brand-400">Nirog</span>Nature
          </Link>
          <p className="text-xs text-gray-500 mt-1">Admin Dashboard</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(item => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                pathname === item.href ? 'bg-brand-700 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <item.icon className="w-4 h-4" />{item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-800">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-400 hover:text-white rounded-xl hover:bg-gray-800 transition-all">
            <LogOut className="w-4 h-4" />Back to Website
          </Link>
        </div>
      </aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-gray-900 text-white p-4">
            <div className="flex items-center justify-between mb-6 px-2">
              <span className="text-xl font-bold"><span className="text-brand-400">Nirog</span>Nature</span>
              <button onClick={() => setSidebarOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <nav className="space-y-1">
              {navItems.map(item => (
                <Link key={item.name} href={item.href} onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    pathname === item.href ? 'bg-brand-700 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}>
                  <item.icon className="w-4 h-4" />{item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Link href="/admin" className="hover:text-brand-700">Admin</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gray-900 font-medium capitalize">{pathname.split('/').pop() || 'Dashboard'}</span>
            </div>
            <div className="w-8 h-8 bg-brand-600 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">A</span>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
