'use client';

import { motion } from 'framer-motion';
import ProductCard from '@/components/shared/ProductCard';
import { Product } from '@/lib/types';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ProductsSectionProps {
  title: string;
  subtitle: string;
  products: Product[];
  viewAllLink?: string;
  bgClass?: string;
}

export default function ProductsSection({ title, subtitle, products, viewAllLink = '/shop', bgClass = 'bg-white' }: ProductsSectionProps) {
  return (
    <section className={`section-padding ${bgClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10"
        >
          <div>
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-2">{subtitle}</p>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading">{title}</h2>
          </div>
          <Link
            href={viewAllLink}
            className="flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800 transition-colors group"
          >
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
