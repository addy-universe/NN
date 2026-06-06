'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart, Shield, Truck, RotateCcw, CheckCircle, ChevronRight, Minus, Plus } from 'lucide-react';
import productsData from '@/data/products.json';
import { Product } from '@/lib/types';
import { useCartStore } from '@/lib/store';
import { formatPrice, getDiscount } from '@/lib/data';
import ProductCard from '@/components/shared/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const products = productsData as Product[];
  const product = products.find(p => p.slug === slug);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [imgError, setImgError] = useState(false);
  const addItem = useCartStore(s => s.addItem);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link href="/shop" className="text-brand-700 hover:underline">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const variant = product.variants[selectedVariant];
  const discount = getDiscount(variant.price, variant.comparePrice);
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, variant);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-brand-700">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/shop" className="hover:text-brand-700">Shop</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-medium truncate">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Product Image */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <div className="aspect-square bg-gradient-to-br from-brand-50 to-cream rounded-3xl flex items-center justify-center sticky top-24 p-6">
              {product.images && product.images.length > 0 && !imgError ? (
                <div className="w-full h-full relative flex items-center justify-center">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    onError={() => setImgError(true)}
                    className="max-w-full max-h-full object-contain rounded-2xl shadow-xl hover:scale-105 transition-transform duration-500"
                  />
                  {product.badge && (
                    <span className="absolute top-4 left-4 px-4 py-1.5 bg-brand-700 text-white text-xs font-bold rounded-full uppercase shadow-md">
                      {product.badge}
                    </span>
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-48 h-48 sm:w-64 sm:h-64 bg-white rounded-3xl shadow-xl flex items-center justify-center mx-auto">
                    <span className="text-8xl sm:text-9xl">🌿</span>
                  </div>
                  {product.badge && (
                    <span className="inline-block mt-4 px-4 py-1.5 bg-brand-700 text-white text-xs font-bold rounded-full uppercase">
                      {product.badge}
                    </span>
                  )}
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-2">
              {product.category.replace('-', ' ')}
            </p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-gold-400 fill-gold-400' : 'text-gray-200'}`} />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-700">{product.rating}</span>
              <span className="text-sm text-gray-500">({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
              <span className="text-3xl font-bold text-gray-900">{formatPrice(variant.price)}</span>
              {variant.comparePrice > variant.price && (
                <>
                  <span className="text-xl text-gray-400 line-through">{formatPrice(variant.comparePrice)}</span>
                  <span className="px-3 py-1 bg-red-100 text-red-600 text-sm font-bold rounded-full">-{discount}% OFF</span>
                </>
              )}
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">{product.shortDesc}</p>

            {/* Variants */}
            {product.variants.length > 1 && (
              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-900 mb-3">Pack Size</p>
                <div className="flex gap-3">
                  {product.variants.map((v, i) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(i)}
                      className={`px-5 py-3 rounded-xl text-sm font-medium transition-all border-2 ${
                        selectedVariant === i
                          ? 'border-brand-700 bg-brand-50 text-brand-700'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + WhatsApp Order */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl bg-white shrink-0">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3.5 hover:bg-gray-50 rounded-l-xl border-r border-gray-100 transition-colors"><Minus className="w-4 h-4" /></button>
                <span className="w-10 text-center font-bold text-gray-900">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-3.5 hover:bg-gray-50 rounded-r-xl border-l border-gray-100 transition-colors"><Plus className="w-4 h-4" /></button>
              </div>
              <a
                href={`https://api.whatsapp.com/send/?phone=919899756597&text=${encodeURIComponent(`Hi NirogNature, I want to order the product *${product.name}* (Quantity: ${quantity}, Pack: ${variant.name}, Price: ${formatPrice(variant.price * quantity)}).`)}&type=phone_number&app_absent=0`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-3 py-4 bg-[#25D366] hover:bg-[#20ba56] text-white font-bold rounded-xl transition-all shadow-lg shadow-green-500/20 text-sm sm:text-base hover:shadow-green-500/35 hover:-translate-y-0.5 duration-300"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.437 0 9.862-4.416 9.866-9.852.002-2.633-1.018-5.109-2.873-6.968C16.395 1.94 13.929.92 11.302.92c-5.436 0-9.86 4.417-9.865 9.853-.002 1.834.488 3.626 1.416 5.207L1.87 21.2l5.077-1.346L6.647 19.15z"/>
                </svg>
                WhatsApp Par Order Karein
              </a>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 p-5 bg-gray-50 rounded-2xl mb-8">
              {[
                { icon: Truck, text: 'Free Shipping', sub: 'On ₹499+' },
                { icon: RotateCcw, text: '30-Day Returns', sub: 'Hassle-free' },
                { icon: Shield, text: 'Lab Tested', sub: 'Every Batch' },
              ].map((badge, i) => (
                <div key={i} className="text-center">
                  <badge.icon className="w-5 h-5 text-brand-600 mx-auto mb-1.5" />
                  <p className="text-xs font-semibold text-gray-900">{badge.text}</p>
                  <p className="text-[10px] text-gray-500">{badge.sub}</p>
                </div>
              ))}
            </div>

            {/* Benefits */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-900 mb-3">Key Benefits</h3>
              <div className="space-y-2">
                {product.benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-brand-600 shrink-0" />
                    <span className="text-sm text-gray-700">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="border-t border-gray-100 pt-8">
              <div className="flex gap-1 mb-6">
                {['description', 'ingredients', 'how-to-use'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab ? 'bg-brand-700 text-white' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {tab.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                  </button>
                ))}
              </div>
              <div className="text-sm text-gray-600 leading-relaxed">
                {activeTab === 'description' && <p>{product.description}</p>}
                {activeTab === 'ingredients' && <p>{product.ingredients}</p>}
                {activeTab === 'how-to-use' && <p>{product.howToUse}</p>}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-20 pt-12 border-t border-gray-100">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading mb-8">You may also like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
