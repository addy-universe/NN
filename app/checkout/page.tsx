'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Shield, Truck, CreditCard, Tag, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/data';

export default function CheckoutPage() {
  const { items, totalPrice, totalSavings } = useCartStore();
  const router = useRouter();

  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'NIROG50') {
      const discount = Math.round(totalPrice() * 0.5);
      setDiscountAmount(discount);
      setAppliedCoupon('NIROG50');
      setCouponError('');
    } else if (code === 'USER5') {
      const discount = Math.round(totalPrice() * 0.05);
      setDiscountAmount(discount);
      setAppliedCoupon('USER5');
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code');
      setDiscountAmount(0);
      setAppliedCoupon('');
    }
  };

  const handleRemoveCoupon = () => {
    setDiscountAmount(0);
    setAppliedCoupon('');
    setCouponCode('');
    setCouponError('');
  };

  const finalTotal = Math.max(0, totalPrice() - discountAmount);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-3xl font-bold font-heading mb-8">Checkout</h1>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl font-bold font-heading mb-6">Delivery Information</h2>
              <form className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                  <input type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Address</label>
                  <textarea rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm resize-none" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">State</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">PIN Code</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm" />
                  </div>
                </div>
              </form>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl font-bold font-heading mb-6">Payment Method</h2>
              <div className="space-y-3">
                {[
                  { label: 'UPI / Razorpay', sub: 'UPI, Cards, Net Banking, Wallets', icon: CreditCard },
                  { label: 'Cash on Delivery', sub: 'Pay when you receive', icon: Truck },
                ].map((method, i) => (
                  <label key={i} className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-brand-300 transition-colors">
                    <input type="radio" name="payment" defaultChecked={i === 0} className="w-4 h-4 text-brand-600" />
                    <method.icon className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium text-sm">{method.label}</p>
                      <p className="text-xs text-gray-500">{method.sub}</p>
                    </div>
                  </label>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="bg-white rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-bold font-heading mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div key={`${item.product.id}-${item.variant.id}`} className="flex items-center justify-between text-sm">
                    <div>
                      <p className="font-medium text-gray-900">{item.product.name}</p>
                      <p className="text-xs text-gray-500">{item.variant.name} × {item.quantity}</p>
                    </div>
                    <span className="font-semibold">{formatPrice(item.variant.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-4 mb-4">
                {appliedCoupon ? (
                  <div className="bg-brand-50 border border-brand-100 rounded-xl p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-brand-700" />
                      <div>
                        <p className="text-xs font-bold text-brand-800">{appliedCoupon} Applied</p>
                        <p className="text-[10px] text-brand-600">Saved {formatPrice(discountAmount)}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      className="p-1 rounded-full hover:bg-brand-100 text-brand-700 transition-colors"
                      type="button"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. NIROG50)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 uppercase font-mono"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors text-xs"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && (
                  <p className="text-[10px] text-red-500 font-medium mt-1 ml-1">{couponError}</p>
                )}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-3">
                <div className="flex justify-between text-sm"><span>Subtotal</span><span>{formatPrice(totalPrice())}</span></div>
                {totalSavings() > 0 && <div className="flex justify-between text-sm text-green-600"><span>You Save</span><span>-{formatPrice(totalSavings())}</span></div>}
                {discountAmount > 0 && (
                  <div className="flex justify-between text-sm text-brand-700 font-medium">
                    <span>Coupon Discount ({appliedCoupon})</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm"><span>Shipping</span><span className="text-green-600">Free</span></div>
                <div className="flex justify-between font-bold text-lg pt-3 border-t border-gray-100"><span>Total</span><span>{formatPrice(finalTotal)}</span></div>
              </div>
              <button
                onClick={() => router.push('/checkout/success')}
                className="w-full py-4 mt-6 bg-brand-700 text-white font-semibold rounded-xl hover:bg-brand-800 transition-colors shadow-lg shadow-brand-700/25"
              >
                Place Order
              </button>
              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500">
                <Shield className="w-3.5 h-3.5" /> Secure checkout with 256-bit SSL encryption
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
