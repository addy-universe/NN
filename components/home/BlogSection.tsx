'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import Link from 'next/link';
import { Blog } from '@/lib/types';

interface BlogSectionProps {
  blogs: Blog[];
}

export default function BlogSection({ blogs }: BlogSectionProps) {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10"
        >
          <div>
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-2">From our blog</p>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading">Wellness wisdom & tips</h2>
          </div>
          <Link href="/blog" className="flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800 transition-colors group">
            Read All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, i) => (
            <motion.div key={blog.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <Link href={`/blog/${blog.slug}`} className="group block">
                <div className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="aspect-[16/10] bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center">
                    <span className="text-5xl">📚</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full">{blog.category}</span>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500"><Clock className="w-3 h-3" />{blog.readTime}</div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-brand-700 transition-colors line-clamp-2">{blog.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-4">{blog.excerpt}</p>
                    <span className="text-xs text-gray-600 font-medium">{blog.author} · {blog.date}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
