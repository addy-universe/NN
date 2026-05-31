'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, BookOpen, Play, CheckCircle, ShieldCheck } from 'lucide-react';
import { useConsultationStore } from '@/lib/store';
import { Doctor } from '@/lib/types';

interface DoctorsSectionProps {
  doctors: Doctor[];
}

export default function DoctorsSection({ doctors }: DoctorsSectionProps) {
  const openConsultation = useConsultationStore((s) => s.openModal);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeVideo, setActiveVideo] = useState<'tour' | 'consultation'>('tour');

  const videoUrls = {
    tour: '/images/1777914059266933.MP4',
    consultation: '/images/1778354557137082.mov',
  };

  // Take first 3 doctors to leave space for the premium video player card
  const displayDoctors = doctors.slice(0, 3);

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">Expert Doctors Ka Bharosa</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading mb-4">
            Miliye Humare Expert Doctors Se
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            &ldquo;Aapki behtar sehat hi humara sabse bada sankalp hai.&rdquo; Humare certified aur experienced doctors ki team 
            har product ki safety aur purity ko bar-bar check karti hai.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {/* Doctor Profiles */}
          {displayDoctors.map((doctor, i) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex"
            >
              <div className="bg-gray-50 rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-brand-500/5 transition-all duration-300 hover:-translate-y-1 border border-gray-100 flex flex-col justify-between w-full">
                {/* Avatar */}
                <div className="aspect-[4/3] bg-gradient-to-br from-brand-50 to-brand-100 flex items-center justify-center relative overflow-hidden shrink-0">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md border border-brand-100/50">
                    <span className="text-2xl font-bold text-brand-700 font-heading">
                      {doctor.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm rounded-lg px-2.5 py-1 flex items-center gap-1.5 shadow-sm">
                    <Award className="w-3.5 h-3.5 text-gold-500" />
                    <span className="text-[10px] font-semibold text-gray-700">{doctor.experience}</span>
                  </div>
                </div>

                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{doctor.name}</h3>
                    <p className="text-xs text-brand-600 font-bold mb-2 uppercase tracking-wide">{doctor.title}</p>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-4 leading-relaxed">{doctor.specialty}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-100">
                    {doctor.qualifications.slice(0, 2).map((q, j) => (
                      <span key={j} className="text-[9px] px-2 py-0.5 bg-brand-50 text-brand-700 rounded-full font-semibold">
                        {q}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Premium Interactive Doctor Video Guide Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex"
          >
            <div className="bg-brand-950 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-brand-950/20 transition-all duration-300 hover:-translate-y-1 border border-white/5 flex flex-col justify-between w-full relative group">
              {isPlaying ? (
                <div className="w-full h-full min-h-[300px] bg-black flex flex-col">
                  <div className="flex bg-brand-900/80 p-2 gap-2 text-xs border-b border-white/5 shrink-0 z-20">
                    <button
                      onClick={() => { setActiveVideo('tour'); setIsPlaying(true); }}
                      className={`flex-1 py-1.5 rounded-lg font-semibold transition-all ${
                        activeVideo === 'tour' ? 'bg-brand-700 text-white shadow' : 'text-brand-300 hover:text-white'
                      }`}
                    >
                      Clinic Tour
                    </button>
                    <button
                      onClick={() => { setActiveVideo('consultation'); setIsPlaying(true); }}
                      className={`flex-1 py-1.5 rounded-lg font-semibold transition-all ${
                        activeVideo === 'consultation' ? 'bg-brand-700 text-white shadow' : 'text-brand-300 hover:text-white'
                      }`}
                    >
                      Doctor Guide
                    </button>
                  </div>
                  <video
                    className="w-full flex-grow object-cover h-[250px]"
                    src={videoUrls[activeVideo]}
                    autoPlay
                    controls
                    playsInline
                  />
                </div>
              ) : (
                <div className="p-6 flex flex-col justify-between h-full min-h-[300px] relative z-10 text-white">
                  {/* Glowing background highlights */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-700/20 rounded-full blur-2xl group-hover:bg-brand-700/35 transition-all duration-300" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gold-500/10 rounded-full blur-2xl" />

                  {/* Header Badge */}
                  <div className="flex items-center justify-between relative z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 text-white rounded-full text-[9px] font-bold uppercase tracking-wider">
                      <ShieldCheck className="w-3.5 h-3.5 text-brand-400" />
                      Free Consultation Guide
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse-soft" />
                  </div>

                  {/* Center Play Button Overlay */}
                  <div className="my-auto flex flex-col items-center justify-center relative z-10 py-6">
                    <button
                      onClick={() => setIsPlaying(true)}
                      className="w-14 h-14 bg-brand-600 hover:bg-brand-700 text-white rounded-full flex items-center justify-center shadow-lg shadow-brand-600/30 hover:scale-110 active:scale-95 transition-all duration-300 relative z-20 group/btn"
                    >
                      <Play className="w-6 h-6 fill-white ml-1 text-white" />
                      <span className="absolute inset-0 rounded-full bg-brand-500 animate-ping opacity-25 -z-10 group-hover/btn:opacity-40" />
                    </button>
                    <p className="text-[10px] text-brand-300 uppercase tracking-widest font-bold mt-3">Watch Doctor Videos</p>
                  </div>

                  {/* Footer Text */}
                  <div className="relative z-10">
                    <div className="flex gap-2 mb-2">
                      <span className="text-[9px] bg-brand-800 text-brand-300 px-2 py-0.5 rounded font-semibold">Clinic Tour</span>
                      <span className="text-[9px] bg-brand-800 text-brand-300 px-2 py-0.5 rounded font-semibold">Consultation Guide</span>
                    </div>
                    <h3 className="font-bold text-base leading-snug mb-1 font-heading">
                      Humare Doctors Se Miliye (Video Guide)
                    </h3>
                    <p className="text-xs text-brand-200 leading-relaxed font-light">
                      Miliye humare experienced doctors se aur dekhye humari authentic Ayurvedic clinic aur laboratory.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <button
            onClick={openConsultation}
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-50 text-brand-700 font-semibold rounded-xl hover:bg-brand-100 transition-colors text-sm"
          >
            <BookOpen className="w-4 h-4" />
            Doctor Se Muft Baat Karein (Book Consultation)
          </button>
        </motion.div>
      </div>
    </section>
  );
}
