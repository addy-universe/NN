'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-brand-700 via-brand-800 to-brand-900 rounded-3xl p-8 sm:p-12 lg:p-16 text-center overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold-500/10 rounded-full blur-3xl" />
          <div className="relative">
            <Sparkles className="w-8 h-8 text-gold-400 mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-white mb-4">
              Ready to transform your wellness?
            </h2>
            <p className="text-brand-200 text-lg mb-8 max-w-2xl mx-auto">
              Start your 30-day transformation with premium Ayurvedic support and free delivery across India.
            </p>
            <Link href="/shop" className="inline-flex items-center gap-2 px-10 py-4 bg-white text-brand-800 font-bold rounded-xl hover:bg-brand-50 transition-colors shadow-lg text-sm sm:text-base">
              Start My Plan <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
