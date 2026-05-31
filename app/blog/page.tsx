'use client';

import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import blogsData from '@/data/blogs.json';

export default function BlogListPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-brand-50 to-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">Our Blog</p>
            <h1 className="text-4xl sm:text-5xl font-bold font-heading mb-4">Wellness Wisdom</h1>
            <p className="text-gray-600 max-w-xl">Expert insights, tips, and research on Ayurvedic health, nutrition, and modern wellness.</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogsData.map((blog, i) => (
            <motion.div key={blog.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Link href={`/blog/${blog.slug}`} className="group block h-full">
                <div className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                  <div className="aspect-[16/10] bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center">
                    <span className="text-5xl">📚</span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full">{blog.category}</span>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500"><Clock className="w-3 h-3" />{blog.readTime}</div>
                    </div>
                    <h2 className="font-semibold text-gray-900 mb-2 group-hover:text-brand-700 transition-colors">{blog.title}</h2>
                    <p className="text-sm text-gray-500 flex-1 line-clamp-3">{blog.excerpt}</p>
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-50">
                      <span className="text-xs text-gray-600 font-medium">{blog.author}</span>
                      <span className="text-xs text-gray-400">·</span>
                      <span className="text-xs text-gray-500">{blog.date}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
