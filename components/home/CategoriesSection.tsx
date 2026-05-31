'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Apple, Dumbbell, Sparkles, Scissors, ArrowRight } from 'lucide-react';

const categories = [
  { name: 'Wellness', slug: 'wellness', icon: Heart, color: 'from-green-400 to-emerald-500', count: '12 products' },
  { name: 'Daily Nutrition', slug: 'daily-nutrition', icon: Apple, color: 'from-orange-400 to-amber-500', count: '8 products' },
  { name: 'Fitness', slug: 'fitness', icon: Dumbbell, color: 'from-blue-400 to-indigo-500', count: '6 products' },
  { name: 'Skin Care', slug: 'skin-care', icon: Sparkles, color: 'from-pink-400 to-rose-500', count: '5 products' },
  { name: 'Hair Care', slug: 'hair-care', icon: Scissors, color: 'from-purple-400 to-violet-500', count: '4 products' },
];

export default function CategoriesSection() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">Browse by category</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading">
            Find what your body needs
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={`/shop?category=${cat.slug}`}
                className="group block p-6 bg-gray-50 rounded-2xl hover:shadow-lg hover:shadow-black/5 transition-all duration-300 hover:-translate-y-1 text-center"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <cat.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{cat.name}</h3>
                <p className="text-xs text-gray-500">{cat.count}</p>
                <ArrowRight className="w-4 h-4 text-gray-400 mx-auto mt-3 group-hover:text-brand-600 group-hover:translate-x-1 transition-all" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
