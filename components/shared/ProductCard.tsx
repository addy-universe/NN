'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '@/lib/types';
import { formatPrice, getDiscount } from '@/lib/data';
import { useCartStore } from '@/lib/store';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);

  const discount = getDiscount(product.price, product.comparePrice);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const message = encodeURIComponent(`Hi NirogNature, I want to order the product *${product.name}* (Price: ₹${product.price}).`);
    window.open(`https://api.whatsapp.com/send/?phone=919899756597&text=${message}&type=phone_number&app_absent=0`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/product/${product.slug}`} className="group block">
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-brand-500/10 transition-all duration-300 hover:-translate-y-1">
          {/* Image */}
          <div className="relative aspect-square bg-gradient-to-br from-brand-50 to-cream overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center p-4">
              {product.images && product.images.length > 0 && !product.images[0].includes('products/') && !imgError ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  onError={() => setImgError(true)}
                  className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500 rounded-xl"
                />
              ) : (
                <div className="w-32 h-32 sm:w-40 sm:h-40 bg-brand-100/50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <span className="text-6xl sm:text-7xl">🌿</span>
                </div>
              )}
            </div>

            {/* Badge */}
            {product.badge && (
              <span className={`absolute top-3 left-3 px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${
                product.badge === 'Best Seller' ? 'bg-gold-500 text-white' :
                product.badge === 'New' ? 'bg-blue-500 text-white' :
                product.badge === 'Premium' ? 'bg-gray-900 text-white' :
                product.badge === 'Hot' ? 'bg-red-500 text-white' :
                product.badge === 'Vegan' ? 'bg-green-500 text-white' :
                'bg-brand-600 text-white'
              }`}>
                {product.badge}
              </span>
            )}

            {/* Discount Badge */}
            {discount > 0 && (
              <span className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-bold bg-red-500 text-white rounded-full">
                -{discount}%
              </span>
            )}

            {/* Quick Order */}
            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#25D366] hover:bg-[#20ba56] text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-green-500/20 hover:scale-[1.02]"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.437 0 9.862-4.416 9.866-9.852.002-2.633-1.018-5.109-2.873-6.968C16.395 1.94 13.929.92 11.302.92c-5.436 0-9.86 4.417-9.865 9.853-.002 1.834.488 3.626 1.416 5.207L1.87 21.2l5.077-1.346L6.647 19.15z"/>
                </svg>
                Order on WhatsApp
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <p className="text-[11px] font-medium text-brand-600 uppercase tracking-wider mb-1">
              {product.category.replace('-', ' ')}
            </p>
            <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-2 group-hover:text-brand-700 transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1.5 mb-3">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.rating)
                        ? 'text-gold-400 fill-gold-400'
                        : 'text-gray-200 fill-gray-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">({product.reviewCount})</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</span>
              {product.comparePrice > product.price && (
                <span className="text-sm text-gray-400 line-through">{formatPrice(product.comparePrice)}</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
