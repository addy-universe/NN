'use client';

import { Plus, Edit, Trash2 } from 'lucide-react';
import blogsData from '@/data/blogs.json';

export default function AdminBlogsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading">Blog Posts</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your blog content</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-3 bg-brand-700 text-white font-semibold rounded-xl hover:bg-brand-800 transition-colors text-sm">
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>

      <div className="grid gap-4">
        {blogsData.map((blog) => (
          <div key={blog.id} className="bg-white rounded-2xl border border-gray-100 p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-brand-50 rounded-xl flex items-center justify-center shrink-0">
                <span className="text-2xl">📝</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{blog.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{blog.author} · {blog.date} · {blog.category}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-400 hover:text-brand-600 rounded-lg hover:bg-brand-50 transition-colors"><Edit className="w-4 h-4" /></button>
              <button className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
