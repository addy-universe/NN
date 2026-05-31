'use client';

import FAQSection from '@/components/home/FAQSection';
import faqsData from '@/data/faqs.json';
import { FAQ } from '@/lib/types';
import { motion } from 'framer-motion';

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-brand-50 to-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">Help Center</p>
            <h1 className="text-4xl sm:text-5xl font-bold font-heading mb-4">Frequently Asked Questions</h1>
            <p className="text-gray-600 max-w-xl">Find answers to common questions about our products, shipping, and policies.</p>
          </motion.div>
        </div>
      </div>
      <FAQSection faqs={faqsData as FAQ[]} />
    </div>
  );
}
