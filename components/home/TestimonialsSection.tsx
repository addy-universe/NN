'use client';

import { motion } from 'framer-motion';
import { Star, BadgeCheck, Quote } from 'lucide-react';
import { Testimonial } from '@/lib/types';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  // Double for continuous marquee
  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="section-padding bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">Customers Ki Kahani</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading mb-4">
            Pure India Ka NirogNature Par Bharosa
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Miliye humare un customers se jinhone NirogNature ke sath apni life aur health ko positive tarike se badla hai.
          </p>
        </motion.div>
      </div>

      {/* Marquee Row */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-cream to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-cream to-transparent z-10" />
        
        <div className="marquee-track gap-6 px-4">
          {doubled.map((testimonial, i) => (
            <div
              key={`${testimonial.id}-${i}`}
              className="w-[340px] sm:w-[380px] shrink-0"
            >
              <div className="bg-white rounded-2xl p-6 h-full border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-gold-400 fill-gold-400" />
                  ))}
                </div>

                <Quote className="w-6 h-6 text-brand-200 mb-2" />

                <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                  {testimonial.text}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-brand-700">{testimonial.initials}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-semibold text-sm text-gray-900">{testimonial.name}</h4>
                        {testimonial.verified && (
                          <BadgeCheck className="w-4 h-4 text-blue-500" />
                        )}
                      </div>
                      <p className="text-xs text-gray-500">{testimonial.role}, {testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
