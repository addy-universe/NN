'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Filter, Grid3X3, LayoutList, SlidersHorizontal } from 'lucide-react';
import ProductCard from '@/components/shared/ProductCard';
import productsData from '@/data/products.json';
import { Product } from '@/lib/types';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const categories = [
  { value: 'all', label: 'All Products' },
  { value: 'wellness', label: 'Wellness' },
  { value: 'daily-nutrition', label: 'Daily Nutrition' },
  { value: 'fitness', label: 'Fitness' },
  { value: 'skin-care', label: 'Skin Care' },
  { value: 'hair-care', label: 'Hair Care' },
];

const sortOptions = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest First' },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const tagFilter = searchParams.get('tag') || '';
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('popular');

  const products = productsData as Product[];

  const filtered = useMemo(() => {
    let result = activeCategory === 'all' ? products : products.filter(p => p.category === activeCategory);
    if (tagFilter) {
      result = result.filter(p => p.tags.includes(tagFilter));
    }
    switch (sortBy) {
      case 'price-low': result = [...result].sort((a, b) => a.price - b.price); break;
      case 'price-high': result = [...result].sort((a, b) => b.price - a.price); break;
      case 'rating': result = [...result].sort((a, b) => b.rating - a.rating); break;
      default: break;
    }
    return result;
  }, [activeCategory, sortBy, products, tagFilter]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-brand-50 to-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-2">Shop</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading mb-4">Premium Wellness Products</h1>
            <p className="text-gray-600 max-w-xl">Science-backed Ayurvedic supplements designed for modern life. Clean ingredients, real results.</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeCategory === cat.value
                    ? 'bg-brand-700 text-white shadow-lg shadow-brand-700/25'
                    : 'bg-white text-gray-600 hover:bg-brand-50 hover:text-brand-700 border border-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            {sortOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-6">{filtered.length} products found</p>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><p>Loading...</p></div>}>
      <ShopContent />
    </Suspense>
  );
}
