'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Truck, CreditCard, Tag, X, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/data';
import { event } from '@/lib/fpixel';

export default function CheckoutPage() {
  const { items, totalPrice, totalSavings, clearCart } = useCartStore();
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [couponError, setCouponError] = useState('');

  // Fire InitiateCheckout when arriving at checkout page
  useEffect(() => {
    if (items.length > 0) {
      event('InitiateCheckout', {
        value: totalPrice(),
        currency: 'INR',
        num_items: items.length,
      });
    }
  }, [items.length, totalPrice]);

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
      setCouponError('अमान्य कूपन कोड (Invalid coupon code)');
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

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.mobile || !formData.address) {
      alert('कृपया अपना नाम, मोबाइल नंबर और पूरा पता अवश्य भरें।');
      return;
    }

    if (formData.mobile.length !== 10) {
      alert('कृपया सही 10 अंकों का मोबाइल नंबर भरें।');
      return;
    }

    setIsSubmitting(true);
    const orderNum = `NN-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      const productNames = items.map(i => `${i.product.name} (${i.variant.name} × ${i.quantity})`).join(', ');

      await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: orderNum,
          productName: productNames || 'Nirog Nature Products',
          ...formData,
          paymentOption: paymentMethod,
          amount: finalTotal,
          date: new Date().toISOString(),
        }),
      });

      // Fire Meta Pixel Purchase event
      event('Purchase', {
        value: finalTotal,
        currency: 'INR',
        content_name: productNames,
      });

      clearCart();
      router.push('/checkout/success');
    } catch (err) {
      console.error(err);
      alert('ऑर्डर दर्ज करने में कोई त्रुटि आई। कृपया दोबारा प्रयास करें।');
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center shadow-lg border border-stone-200">
          <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
            🛒
          </div>
          <h2 className="text-2xl font-bold font-heading mb-2 text-stone-900">आपकी कार्ट खाली है</h2>
          <p className="text-stone-500 text-sm mb-6">
            कृपया पहले कोई उत्पाद चुनें, ताकि आप ऑर्डर दर्ज कर सकें।
          </p>
          <Link
            href="/"
            className="inline-block w-full py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl transition-all shadow"
          >
            उत्पाद देखें (View Product)
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/" className="text-xs text-stone-500 hover:underline">
            ← मुख्य पृष्ठ पर वापस जाएँ
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black font-heading text-stone-900 mt-2">
            ऑर्डर एवं चेकआउट (Checkout)
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm">
            अपना डिलीवरी पता भरें। डिलीवरी बॉय पार्सल लेकर आपके पते पर पहुँचेगा।
          </p>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Address + Payment */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Address Card */}
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-stone-200">
                <div className="flex items-center gap-2 border-b border-stone-200 pb-3 mb-5">
                  <div className="w-6 h-6 rounded-full bg-emerald-800 text-white text-xs font-bold flex items-center justify-center">1</div>
                  <h2 className="text-lg font-bold font-heading text-stone-900">डिलीवरी की जानकारी (Delivery Details)</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      आपका पूरा नाम (Full Name) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="उदा: राजेश कुमार"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 text-sm font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      मोबाइल नंबर (10 अंकों का फोन नंबर) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      minLength={10}
                      maxLength={10}
                      placeholder="उदा: 98XXXXXXXX"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/[^0-9]/g, '') })}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 text-sm font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      घर का पूरा पता (House No, Street, Area) <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="मकान नंबर, गली नंबर, गाँव या कॉलोनी, लैंडमार्क"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 text-sm font-semibold resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">शहर / गाँव <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        required
                        placeholder="उदा: जयपुर"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 text-sm font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">राज्य (State) <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        required
                        placeholder="उदा: राजस्थान"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 text-sm font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">पिन कोड <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        required
                        minLength={6}
                        maxLength={6}
                        placeholder="6 अंक (302001)"
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/[^0-9]/g, '') })}
                        className="w-full px-3 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 text-sm font-semibold"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Payment Method Card */}
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-stone-200">
                <div className="flex items-center gap-2 border-b border-stone-200 pb-3 mb-5">
                  <div className="w-6 h-6 rounded-full bg-emerald-800 text-white text-xs font-bold flex items-center justify-center">2</div>
                  <h2 className="text-lg font-bold font-heading text-stone-900">भुगतान का माध्यम (Payment Method)</h2>
                </div>

                <div className="space-y-3">
                  {/* COD */}
                  <label 
                    onClick={() => setPaymentMethod('cod')}
                    className={`flex items-start gap-4 p-4 border-2 rounded-2xl cursor-pointer transition-all ${
                      paymentMethod === 'cod' ? 'border-emerald-700 bg-emerald-50/60 shadow-sm' : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="w-4 h-4 text-emerald-800 mt-1"
                    />
                    <Truck className="w-5 h-5 text-emerald-800 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-bold text-sm text-stone-900">📦 कैश ऑन डिलीवरी (Cash on Delivery)</p>
                      <p className="text-xs text-stone-600 mt-0.5">सामान घर पहुँचने पर पैसे दें। कोई एडवांस नहीं।</p>
                    </div>
                  </label>

                  {/* Online */}
                  <label 
                    onClick={() => setPaymentMethod('online')}
                    className={`flex items-start gap-4 p-4 border-2 rounded-2xl cursor-pointer transition-all ${
                      paymentMethod === 'online' ? 'border-emerald-700 bg-emerald-50/60 shadow-sm' : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'online'}
                      onChange={() => setPaymentMethod('online')}
                      className="w-4 h-4 text-emerald-800 mt-1"
                    />
                    <CreditCard className="w-5 h-5 text-emerald-800 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-bold text-sm text-stone-900">💳 ऑनलाइन पेमेंट (UPI / Cards / NetBanking)</p>
                      <p className="text-xs text-stone-600 mt-0.5">तुरंत सुरक्षित ऑनलाइन भुगतान करें।</p>
                    </div>
                  </label>
                </div>
              </motion.div>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-5">
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200 sticky top-24">
                <h2 className="text-lg font-bold font-heading mb-4 text-stone-900">ऑर्डर सारांश (Order Summary)</h2>
                
                <div className="space-y-3 mb-5 max-h-60 overflow-y-auto pr-1">
                  {items.map(item => (
                    <div key={`${item.product.id}-${item.variant.id}`} className="flex items-center justify-between text-xs py-2 border-b border-stone-100">
                      <div>
                        <p className="font-bold text-stone-900">{item.product.name}</p>
                        <p className="text-stone-500">{item.variant.name} × {item.quantity}</p>
                      </div>
                      <span className="font-black text-stone-900">{formatPrice(item.variant.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                {/* Coupon */}
                <div className="border-t border-stone-100 pt-3 mb-4">
                  {appliedCoupon ? (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-emerald-800" />
                        <div>
                          <p className="text-xs font-bold text-emerald-900">{appliedCoupon} कूपन लागू</p>
                          <p className="text-[10px] text-emerald-700">बचत: {formatPrice(discountAmount)}</p>
                        </div>
                      </div>
                      <button
                        onClick={handleRemoveCoupon}
                        className="p-1 rounded-full hover:bg-emerald-100 text-emerald-800"
                        type="button"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="कूपन कोड (उदा: NIROG50)"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 px-3 py-2 border border-stone-200 rounded-xl text-xs uppercase font-mono"
                      />
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        className="px-3.5 py-2 bg-stone-900 text-white font-bold rounded-xl text-xs hover:bg-stone-800 transition-colors"
                      >
                        लागू करें
                      </button>
                    </div>
                  )}
                  {couponError && (
                    <p className="text-[10px] text-red-500 font-medium mt-1">{couponError}</p>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="border-t border-stone-100 pt-3 space-y-2 text-xs">
                  <div className="flex justify-between text-stone-600">
                    <span>सामग्री मूल्य:</span>
                    <span>{formatPrice(totalPrice())}</span>
                  </div>
                  {totalSavings() > 0 && (
                    <div className="flex justify-between text-green-700 font-bold">
                      <span>कुल बचत:</span>
                      <span>-{formatPrice(totalSavings())}</span>
                    </div>
                  )}
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-800 font-bold">
                      <span>कूपन छूट:</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-stone-600">
                    <span>होम डिलीवरी:</span>
                    <span className="text-green-700 font-bold">मुफ़्त (Free)</span>
                  </div>
                  <div className="flex justify-between font-black text-base text-stone-950 pt-2 border-t border-stone-200">
                    <span>कुल राशि:</span>
                    <span className="text-emerald-800">{formatPrice(finalTotal)}</span>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 mt-6 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black rounded-xl text-base shadow-lg transition-all disabled:opacity-70 flex items-center justify-center gap-2 active:scale-95"
                >
                  {isSubmitting ? (
                    <span>ऑर्डर दर्ज हो रहा है...</span>
                  ) : paymentMethod === 'cod' ? (
                    <span>📦 ऑर्डर पक्का करें (Cash on Delivery)</span>
                  ) : (
                    <span>💳 अभी {formatPrice(finalTotal)} ऑनलाइन भरें</span>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 mt-4 text-[11px] text-stone-500">
                  <Lock className="w-3.5 h-3.5 text-emerald-800" />
                  <span>100% सुरक्षित • गुप्त पार्सल पैकिंग</span>
                </div>
              </motion.div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}
