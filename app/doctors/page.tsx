'use client';

import { motion } from 'framer-motion';
import { Award, BookOpen } from 'lucide-react';
import doctorsData from '@/data/doctors.json';
import { useConsultationStore } from '@/lib/store';

export default function DoctorsPage() {
  const openConsultation = useConsultationStore((s) => s.openModal);
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-brand-50 to-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">Our Experts</p>
            <h1 className="text-4xl sm:text-5xl font-bold font-heading mb-4">Meet Our Doctors</h1>
            <p className="text-gray-600 max-w-xl">Our team of certified Ayurvedic practitioners and nutrition scientists ensures every NirogNature product meets the highest standards.</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid sm:grid-cols-2 gap-8">
          {doctorsData.map((doc, i) => (
            <motion.div key={doc.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-[3/2] bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center">
                  <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-3xl font-bold text-brand-700 font-heading">{doc.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-bold font-heading">{doc.name}</h2>
                    <Award className="w-5 h-5 text-gold-500" />
                  </div>
                  <p className="text-brand-600 font-medium text-sm mb-1">{doc.title}</p>
                  <p className="text-xs text-gray-500 mb-4">{doc.experience} experience • {doc.specialty}</p>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{doc.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {doc.qualifications.map((q, j) => (
                      <span key={j} className="text-xs px-3 py-1 bg-brand-50 text-brand-700 rounded-full font-medium">{q}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-brand-700 rounded-2xl p-8 sm:p-12 text-center">
            <h3 className="text-2xl font-bold text-white font-heading mb-4">Book a Free Consultation</h3>
            <p className="text-brand-200 mb-6 max-w-xl mx-auto">Get personalized wellness guidance from our expert doctors. Free for all NirogNature customers.</p>
            <button onClick={openConsultation} className="px-8 py-4 bg-white text-brand-800 font-semibold rounded-xl hover:bg-brand-50 transition-colors">
              <BookOpen className="w-4 h-4 inline mr-2" />Book Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
