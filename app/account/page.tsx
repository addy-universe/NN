'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Lock, Eye, EyeOff, ShoppingBag, Heart, MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AccountPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-12 text-center max-w-md w-full"
        >
          <div className="w-16 h-16 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold font-heading mb-2">Welcome to NirogNature!</h2>
          <p className="text-gray-500 text-sm mb-8">
            Your account has been set up. Start exploring our premium Ayurvedic wellness products.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {[
              { icon: ShoppingBag, title: 'My Orders', desc: 'Track your purchases', href: '/shop' },
              { icon: Heart, title: 'Wishlist', desc: 'Saved products', href: '/shop' },
              { icon: MapPin, title: 'Addresses', desc: 'Delivery locations', href: '/contact' },
              { icon: Phone, title: 'Support', desc: 'Get help', href: '/contact' },
            ].map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="p-4 bg-gray-50 rounded-xl hover:bg-brand-50 hover:shadow-md transition-all text-left group"
              >
                <item.icon className="w-5 h-5 text-brand-600 mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </Link>
            ))}
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-700 text-white font-semibold rounded-xl hover:bg-brand-800 transition-colors shadow-lg shadow-brand-700/25 text-sm"
          >
            Start Shopping <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-brand-50 to-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-2">Account</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading mb-4">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-gray-600 max-w-xl">
              {isLogin
                ? 'Sign in to track orders, manage your wishlist, and access exclusive offers.'
                : 'Join NirogNature for exclusive deals, order tracking, and personalized wellness recommendations.'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 sm:px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100"
        >
          {/* Tab Switcher */}
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                isLogin ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                !isLogin ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                  />
                </div>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                />
              </div>
            </div>
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                  />
                </div>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-brand-700 text-white font-semibold rounded-xl hover:bg-brand-800 transition-colors shadow-lg shadow-brand-700/25 text-sm"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {isLogin && (
            <p className="text-xs text-center text-gray-500 mt-4">
              Forgot your password?{' '}
              <button className="text-brand-700 font-semibold hover:underline">Reset it</button>
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
