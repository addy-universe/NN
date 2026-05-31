'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Heart, Leaf, Shield, FlaskConical, Users, Award, Target } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-brand-50 to-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">About NirogNature</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading mb-6">
              Wellness rooted in <span className="gradient-text">science & tradition</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              We believe that true wellness comes from the perfect harmony of ancient Ayurvedic wisdom and modern scientific research. NirogNature was born from this conviction — to create premium health supplements that are honest, effective, and accessible to every Indian.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mission */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-6">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              To democratize premium wellness by making clinically-researched, 100% natural Ayurvedic supplements affordable and accessible. We&apos;re committed to transparency in everything we do — from ingredient sourcing to final lab reports.
            </p>
            <div className="space-y-3">
              {['Research-backed formulations with standardized extracts', 'GMP & ISO certified manufacturing facilities', 'Third-party lab tested for purity & potency', 'Zero synthetic fillers, colors, or preservatives', 'Sustainable and ethical ingredient sourcing'].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-600 shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="aspect-square relative rounded-3xl overflow-hidden shadow-lg border border-brand-100/50">
            <img
              src="/images/clinic-consultation.jpeg"
              alt="NirogNature Ayurvedic Clinic Consultation Desk"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-gray-50 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-center mb-12">What drives us</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Heart, title: 'Authentic Care', desc: 'Every product is made with genuine intention to improve lives.' },
              { icon: FlaskConical, title: 'Science First', desc: 'Clinical research guides every formula we create.' },
              { icon: Leaf, title: 'Pure Ingredients', desc: 'Sourced from trusted farms and verified for purity.' },
              { icon: Shield, title: 'Full Transparency', desc: 'Published lab reports and clear ingredient lists.' },
            ].map((val, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <val.icon className="w-8 h-8 text-brand-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">{val.title}</h3>
                <p className="text-sm text-gray-500">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { value: '30,000+', label: 'Happy Customers' },
            { value: '4.8/5', label: 'Average Rating' },
            { value: '25+', label: 'Premium Products' },
            { value: '100%', label: 'Natural Ingredients' },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <p className="text-4xl sm:text-5xl font-bold text-brand-700 font-heading mb-2">{stat.value}</p>
              <p className="text-gray-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
