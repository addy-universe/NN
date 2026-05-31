'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Leaf, Shield, FlaskConical, Heart } from 'lucide-react';

export default function BrandMission() {
  return (
    <section className="section-padding bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950 text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm font-semibold text-brand-300 uppercase tracking-wider mb-4">India Ka Trusted Choice</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading mb-6 leading-tight">
              Humara manna hai ki wellness <span className="text-brand-300">honest aur asardar</span> honi chahiye.
            </h2>
            <p className="text-brand-200 text-lg leading-relaxed mb-8">
              Humara maqsad hai aap tak 100% asli aur clinically researched products pahunchana. 
              NirogNature ke sath aapki health bilkul safe hands me hai!
            </p>

            <div className="space-y-4">
              {[
                'Doctor aur science dwara test kiya gaya formula',
                'Bina kisi artificial chemical ya milawat ke',
                'Pure aur powerful herbal extracts ka istemal',
                'Har batch lab me purity ke liye test hota hai',
                'Saare ingredients ki jaankari bilkul saaf aur sachi',
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-brand-400 shrink-0" />
                  <span className="text-brand-100">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { icon: Leaf, title: '100% Natural', desc: 'Pure jadi-butiyo se bana, bina side-effect', color: 'bg-brand-700/50' },
              { icon: Shield, title: 'GMP Certified', desc: 'Safe aur approved certified labs me taiyar', color: 'bg-brand-700/50' },
              { icon: FlaskConical, title: 'Lab Tested', desc: 'Har batch ki purity aur quality check hoti hai', color: 'bg-brand-700/50' },
              { icon: Heart, title: 'Expert-Backed', desc: 'Ayurvedic doctors dwara banaya gaya formula', color: 'bg-brand-700/50' },
            ].map((item, i) => (
              <div key={i} className={`${item.color} rounded-2xl p-6 backdrop-blur-sm border border-white/10`}>
                <item.icon className="w-8 h-8 text-brand-300 mb-4" />
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-brand-200">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
