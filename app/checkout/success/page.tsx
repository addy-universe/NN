'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, ShoppingBag, Truck, Calendar, PhoneCall, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/data';

export default function CheckoutSuccessPage() {
  const clearCart = useCartStore((s) => s.clearCart);
  const [orderNumber, setOrderNumber] = useState('');
  const [orderDate, setOrderDate] = useState('');

  useEffect(() => {
    // Generate a random order number and date on mount
    const num = `NN-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(num);

    const date = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    setOrderDate(date);

    // Clear cart after loading the checkout page details
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-12 text-center relative overflow-hidden"
      >
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-brand-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-36 h-36 bg-gold-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative">
          {/* Animated Checkbox */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            className="w-20 h-20 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="w-12 h-12" />
          </motion.div>

          <h1 className="text-3xl font-extrabold font-heading text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-500 text-sm mb-8">
            Thank you for shopping with NirogNature. Your wellness journey begins today!
          </p>

          {/* Details Card */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left border border-gray-100">
            <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
              <div>
                <p className="text-gray-400 font-medium">Order Number</p>
                <p className="font-mono font-bold text-gray-900 mt-0.5">{orderNumber || 'NN-XXXXXX'}</p>
              </div>
              <div>
                <p className="text-gray-400 font-medium">Payment Status</p>
                <p className="font-semibold text-green-600 mt-0.5">Paid / Approved</p>
              </div>
              <div>
                <p className="text-gray-400 font-medium">Estimated Delivery</p>
                <p className="font-semibold text-gray-900 mt-0.5">3 - 5 Business Days</p>
              </div>
              <div>
                <p className="text-gray-400 font-medium">Order Date</p>
                <p className="font-semibold text-gray-900 mt-0.5">{orderDate || 'Today'}</p>
              </div>
            </div>
          </div>

          {/* Core Trust Badges */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {[
              { icon: Truck, text: 'Free Delivery', sub: 'Across India' },
              { icon: Calendar, text: 'Instant Dispatch', sub: 'Within 24 Hours' },
              { icon: PhoneCall, text: '24/7 Care Support', sub: '+91 98997 56597' },
            ].map((badge, i) => (
              <div key={i} className="text-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <badge.icon className="w-5 h-5 text-brand-600 mx-auto mb-2" />
                <p className="text-xs font-semibold text-gray-900">{badge.text}</p>
                <p className="text-[9px] text-gray-400 mt-0.5">{badge.sub}</p>
              </div>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/shop"
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-brand-700 hover:bg-brand-800 text-white font-semibold rounded-xl transition-all shadow-lg shadow-brand-700/20 text-sm sm:text-base"
            >
              Continue Shopping <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/blog"
              className="flex-1 py-4 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors text-sm sm:text-base"
            >
              Read Wellness Tips
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
