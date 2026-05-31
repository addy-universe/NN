'use client';

import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Building2 } from 'lucide-react';

export default function ClinicSection() {
  return (
    <section className="section-padding bg-gray-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-brand-600 font-semibold tracking-wider uppercase text-sm mb-3">Visit Us In Person</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-gray-900 mb-6">
            Humara <span className="text-brand-700">NirogNature</span> Clinic
          </h2>
          <p className="text-lg text-gray-600">
            Aap hamare clinic me aakar direct consultation aur genuine Ayurvedic products prapt kar sakte hain. Humari subah se raat tak ki sewayen aapke liye khuli hain.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Images */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-black/10 group"
            >
              <img 
                src="/images/day.png" 
                alt="NirogNature Clinic Day View" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                  Day Time View
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-black/10 group mt-8 lg:mt-12"
            >
              <img 
                src="/images/night.png" 
                alt="NirogNature Clinic Night View" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                  Night Time View
                </p>
              </div>
            </motion.div>
          </div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-brand-900/5 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 font-heading flex items-center gap-3">
                <Building2 className="text-brand-600" />
                Clinic Details
              </h3>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center shrink-0 mt-1">
                    <MapPin className="w-5 h-5 text-brand-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Address</p>
                    <p className="text-gray-600 mt-1">Ganga General Store ke paas, Rishikesh Stationery ke bagal mein, Main Market.</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center shrink-0 mt-1">
                    <Clock className="w-5 h-5 text-brand-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Timings</p>
                    <p className="text-gray-600 mt-1">Monday - Sunday: 9:00 AM se 9:00 PM tak.</p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center shrink-0 mt-1">
                    <Phone className="w-5 h-5 text-brand-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Contact</p>
                    <p className="text-gray-600 mt-1">+91 98997 56597</p>
                  </div>
                </li>
              </ul>
              
              <a 
                href="https://api.whatsapp.com/send/?phone=919899756597&text=Hi%20NirogNature,%20I%20want%20to%20visit%20your%20clinic.&type=phone_number&app_absent=0" 
                target="_blank" 
                rel="noreferrer"
                className="mt-8 w-full block text-center py-4 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors shadow-lg shadow-brand-600/30"
              >
                Get Directions on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
