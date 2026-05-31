'use client';

import { motion } from 'framer-motion';
import { MessageCircle, UserCheck, Calendar, Activity, Stethoscope } from 'lucide-react';

const steps = [
  { icon: MessageCircle, title: 'Connect Karein', desc: 'Call ya WhatsApp ke zariye humse judein', color: 'bg-blue-500' },
  { icon: UserCheck, title: 'Health Coach', desc: 'Aapko milega ek personal health expert', color: 'bg-green-500' },
  { icon: Calendar, title: 'Time Choose Karein', desc: 'Apne hisab se free consultation book karein', color: 'bg-purple-500' },
  { icon: Activity, title: 'Health Checkup', desc: 'Aapki health requirements ko acche se samjhein', color: 'bg-orange-500' },
  { icon: Stethoscope, title: 'Custom Plan', desc: 'Apne liye bilkul sahi health aur diet plan paayein', color: 'bg-brand-600' },
];

export default function ProcessSection() {
  return (
    <section className="section-padding bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">Kaise Kaam Karta Hai</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading mb-4">
            Aapki Sehat Ka Safar, Bilkul Aasan
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Doctor se pehli baat se lekar aapke custom health plan tak, har ek step ko humne asardar aur simple banaya hai.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-16 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-blue-200 via-brand-200 to-brand-400" />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className={`w-14 h-14 ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg relative z-10`}>
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Step {i + 1}</span>
                <h3 className="font-semibold text-gray-900 mt-1 mb-2 text-sm">{step.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
