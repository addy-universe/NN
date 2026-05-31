'use client';

import { motion } from 'framer-motion';
import {
  Package, ShoppingCart, Users, TrendingUp, ArrowUpRight, ArrowDownRight,
  DollarSign, Eye, FileText, MessageSquare
} from 'lucide-react';
import Link from 'next/link';

const stats = [
  { title: 'Total Revenue', value: '₹12,45,800', change: '+18.2%', up: true, icon: DollarSign, color: 'bg-green-500' },
  { title: 'Total Orders', value: '1,247', change: '+12.5%', up: true, icon: ShoppingCart, color: 'bg-blue-500' },
  { title: 'Active Products', value: '25', change: '+3', up: true, icon: Package, color: 'bg-purple-500' },
  { title: 'Page Views', value: '48.2K', change: '+24.1%', up: true, icon: Eye, color: 'bg-orange-500' },
];

const recentOrders = [
  { id: 'ORD-1247', customer: 'Rohit Kapoor', product: 'Ashwagandha Gold', amount: '₹899', status: 'Delivered', statusColor: 'bg-green-100 text-green-700' },
  { id: 'ORD-1246', customer: 'Priya Deshmukh', product: 'Skin Radiance Gummies', amount: '₹799', status: 'Shipped', statusColor: 'bg-blue-100 text-blue-700' },
  { id: 'ORD-1245', customer: 'Aditya Sharma', product: 'Shilajit Resin Gold', amount: '₹1,299', status: 'Processing', statusColor: 'bg-yellow-100 text-yellow-700' },
  { id: 'ORD-1244', customer: 'Vikas Menon', product: 'TestoBoost Natural', amount: '₹1,099', status: 'Delivered', statusColor: 'bg-green-100 text-green-700' },
  { id: 'ORD-1243', customer: 'Neha Gupta', product: 'Biotin Tablets', amount: '₹499', status: 'Delivered', statusColor: 'bg-green-100 text-green-700' },
];

const quickActions = [
  { name: 'Add Product', href: '/admin/products', icon: Package },
  { name: 'New Blog Post', href: '/admin/blogs', icon: FileText },
  { name: 'View Leads', href: '/admin/leads', icon: Users },
  { name: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Welcome back! Here&apos;s what&apos;s happening with NirogNature.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${stat.up ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-bold font-heading mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {quickActions.map((action, i) => (
            <Link key={i} href={action.href} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md hover:border-brand-200 transition-all">
              <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center">
                <action.icon className="w-5 h-5 text-brand-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">{action.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div>
        <h2 className="text-lg font-bold font-heading mb-4">Recent Orders</h2>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Order ID</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Customer</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Product</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Amount</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{order.customer}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{order.product}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{order.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${order.statusColor}`}>{order.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
