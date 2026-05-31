'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/data';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice, totalSavings } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50"
            onClick={closeCart}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute right-0 top-0 bottom-0 w-full sm:w-[420px] bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-brand-700" />
                <h2 className="text-lg font-bold font-heading">Your Cart</h2>
                <span className="text-xs bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full font-medium">
                  {items.length} {items.length === 1 ? 'item' : 'items'}
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                    <ShoppingBag className="w-8 h-8 text-gray-300" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Your cart is empty</h3>
                  <p className="text-sm text-gray-500 mb-6">Add some premium wellness products to get started.</p>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="px-6 py-3 bg-brand-700 text-white font-semibold rounded-xl hover:bg-brand-800 transition-colors text-sm"
                  >
                    Browse Products
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.variant.id}`}
                      className="flex gap-4 p-4 bg-gray-50 rounded-2xl"
                    >
                      <div className="w-20 h-20 bg-brand-50 rounded-xl flex items-center justify-center shrink-0">
                        <span className="text-2xl">🌿</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-gray-900 line-clamp-2">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-gray-500 mt-0.5">{item.variant.name}</p>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.variant.id, item.quantity - 1)}
                              className="p-1.5 hover:bg-gray-50 rounded-l-lg transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.variant.id, item.quantity + 1)}
                              className="p-1.5 hover:bg-gray-50 rounded-r-lg transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-sm text-gray-900">
                              {formatPrice(item.variant.price * item.quantity)}
                            </span>
                            <button
                              onClick={() => removeItem(item.product.id, item.variant.id)}
                              className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 px-6 py-4 space-y-3">
                {totalSavings() > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-600 font-medium">You save</span>
                    <span className="text-green-600 font-bold">{formatPrice(totalSavings())}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">Subtotal</span>
                  <span className="text-xl font-bold text-gray-900">{formatPrice(totalPrice())}</span>
                </div>
                <p className="text-xs text-gray-500">Shipping & taxes calculated at checkout</p>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="flex items-center justify-center gap-2 w-full py-4 bg-brand-700 text-white font-semibold rounded-xl hover:bg-brand-800 transition-colors text-sm"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={closeCart}
                  className="w-full py-3 text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
