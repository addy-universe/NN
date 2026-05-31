'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useConsultationStore } from '@/lib/store';
import { ArrowRight, Play, Shield, Leaf, FlaskConical, Truck, Stethoscope, Volume2, VolumeX } from 'lucide-react';

export default function HeroSection() {
  const openConsultation = useConsultationStore((s) => s.openModal);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-cream">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold-100/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Copy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-100 text-brand-700 rounded-full text-sm font-medium mb-6">
              <Leaf className="w-4 h-4" />
              100% Pure aur Lab-Tested Ayurvedic Products
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold font-heading leading-[1.1] mb-6">
              Aapki Sehat,{' '}
              <span className="gradient-text">Ab Nature Ke Sath</span>.
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8 max-w-xl">
              Pure Ayurvedic aur clinically researched formulas jo energy badhaye, stress door kare aur 
              aapko fit rakhein. Bina kisi side effect ke, 100% safe aur asardar!
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-700 text-white font-semibold rounded-xl hover:bg-brand-800 transition-all shadow-lg shadow-brand-700/25 hover:shadow-xl hover:shadow-brand-700/30 text-sm sm:text-base"
              >
                Products Dekhein <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={openConsultation}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-brand-300 hover:text-brand-700 transition-all text-sm sm:text-base"
              >
                <Stethoscope className="w-4 h-4 text-brand-600" /> Doctor Se Muft Baat Karein
              </button>
            </div>

            {/* Trust Metrics */}
            <div className="flex flex-wrap gap-8 sm:gap-12">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 font-heading">30,000+</p>
                <p className="text-sm text-gray-500">Khush Customers</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 font-heading">4.8/5</p>
                <p className="text-sm text-gray-500">Rating Reviews</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 font-heading">92%</p>
                <p className="text-sm text-gray-500">Log Repeat Order Karte Hai</p>
              </div>
            </div>
          </motion.div>

          {/* Right - Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto lg:max-w-none">
              {/* Main circle */}
              <div className="absolute inset-[10%] bg-gradient-to-br from-brand-200 to-brand-100 rounded-full animate-pulse-soft" />
              <div className="absolute inset-[15%] bg-gradient-to-br from-brand-100 to-white rounded-full" />
              
              {/* Product visual */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full max-w-[280px] sm:max-w-[340px] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl shadow-brand-500/20 border-4 border-white rotate-3 hover:rotate-0 transition-transform duration-500 relative group">
                  <video
                    className="w-full h-full object-cover"
                    src="/images/doctor main video.MP4"
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                  />
                  
                  {/* Mute/Unmute Button */}
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="absolute top-4 left-4 z-20 w-10 h-10 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center backdrop-blur-md transition-colors"
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5 text-white" />
                    ) : (
                      <Volume2 className="w-5 h-5 text-white" />
                    )}
                  </button>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 pointer-events-none">
                    <p className="font-bold font-heading text-xl text-white">Dr. Consultation</p>
                    <p className="text-sm text-brand-200">Expert Ayurvedic Advice</p>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-[15%] right-[5%] bg-white rounded-2xl shadow-lg shadow-black/10 px-4 py-3 flex items-center gap-2"
              >
                <Shield className="w-5 h-5 text-brand-600" />
                <div>
                  <p className="text-xs font-bold text-gray-900">GMP Certified</p>
                  <p className="text-[10px] text-gray-500">100% Asli</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute bottom-[15%] left-[5%] bg-white rounded-2xl shadow-lg shadow-black/10 px-4 py-3 flex items-center gap-2"
              >
                <FlaskConical className="w-5 h-5 text-gold-500" />
                <div>
                  <p className="text-xs font-bold text-gray-900">Doctor dwara</p>
                  <p className="text-[10px] text-gray-500">Certified</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
                className="absolute bottom-[25%] right-[10%] bg-white rounded-2xl shadow-lg shadow-black/10 px-4 py-3 flex items-center gap-2"
              >
                <Truck className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-xs font-bold text-gray-900">Free Delivery</p>
                  <p className="text-[10px] text-gray-500">₹499+ ke upar</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Trust Strip */}
      <div className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { icon: Shield, text: 'GMP Certified', sub: 'Pure aur Safe' },
              { icon: Leaf, text: '100% Natural', sub: 'Bina chemical ke' },
              { icon: FlaskConical, text: 'Lab Tested', sub: 'Har Batch certified' },
              { icon: Truck, text: 'Free Delivery', sub: '₹499 ke upar' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 justify-center">
                <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-brand-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{item.text}</p>
                  <p className="text-xs text-gray-500">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
