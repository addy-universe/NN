'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import blogsData from '@/data/blogs.json';

export default function BlogDetailPage() {
  const params = useParams();
  const blog = blogsData.find(b => b.slug === params.slug);

  if (!blog) return <div className="min-h-screen flex items-center justify-center"><p>Blog not found. <Link href="/blog" className="text-brand-700 underline">Back to blog</Link></p></div>;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-700 mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
        <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">{blog.category}</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading mt-4 mb-6">{blog.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-100">
            <div className="flex items-center gap-1.5"><User className="w-4 h-4" />{blog.author}</div>
            <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{blog.date}</div>
            <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{blog.readTime}</div>
          </div>
          <div className="aspect-[16/9] bg-gradient-to-br from-brand-100 to-brand-200 rounded-2xl flex items-center justify-center mb-8">
            <span className="text-7xl">📚</span>
          </div>
          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-gray-600 leading-relaxed mb-6">{blog.excerpt}</p>
            <p className="text-gray-600 leading-relaxed">{blog.content}</p>
            <p className="text-gray-600 leading-relaxed mt-4">This is a placeholder for the full blog content. In production, this would be fetched from the CMS/database with rich text formatting, embedded images, and structured headings.</p>
          </div>
          <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-gray-100">
            {blog.tags.map(tag => (
              <span key={tag} className="text-xs px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full">#{tag}</span>
            ))}
          </div>
        </motion.article>
      </div>
    </div>
  );
}
