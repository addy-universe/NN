'use client';

import { motion } from 'framer-motion';
import { Star, BadgeCheck, Quote } from 'lucide-react';
import testimonialsData from '@/data/testimonials.json';

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-brand-50 to-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">Customer Love</p>
            <h1 className="text-4xl sm:text-5xl font-bold font-heading mb-4">Real Results, Real People</h1>
            <p className="text-gray-600 max-w-xl">Hear from thousands of satisfied customers who transformed their wellness journey with NirogNature.</p>
          </motion.div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonialsData.map((t, i) => (
            <motion.div key={t.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="bg-white rounded-2xl p-6 h-full border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(t.rating)].map((_, j) => <Star key={j} className="w-4 h-4 text-gold-400 fill-gold-400" />)}
                </div>
                <Quote className="w-6 h-6 text-brand-200 mb-2" />
                <p className="text-gray-700 text-sm leading-relaxed mb-4">{t.text}</p>
                <p className="text-xs text-brand-600 font-medium mb-4">Product: {t.product}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                  <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-brand-700">{t.initials}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-semibold text-sm text-gray-900">{t.name}</h4>
                      {t.verified && <BadgeCheck className="w-4 h-4 text-blue-500" />}
                    </div>
                    <p className="text-xs text-gray-500">{t.role}, {t.location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
