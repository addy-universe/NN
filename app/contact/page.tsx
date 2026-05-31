'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to a backend API
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-brand-50 to-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">Get in Touch</p>
            <h1 className="text-4xl sm:text-5xl font-bold font-heading mb-4">Contact Us</h1>
            <p className="text-gray-600 max-w-xl">Have a question, need guidance, or want to partner with us? We&apos;d love to hear from you.</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            {[
              { icon: Mail, title: 'Email', text: 'nirognature@gmail.com', sub: 'We reply within 24 hours' },
              { icon: Phone, title: 'Phone', text: '+91 98997 56597', sub: 'Mon-Sat, 10 AM - 7 PM' },
              { icon: MapPin, title: 'Office', text: 'Gurugram, Haryana', sub: 'India 122009' },
              { icon: Clock, title: 'Hours', text: 'Monday - Saturday', sub: '10:00 AM - 7:00 PM IST' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-start gap-4 p-5 bg-white rounded-2xl">
                <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-brand-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
                  <p className="text-gray-700 text-sm">{item.text}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-2 bg-white rounded-2xl p-8">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center"
              >
                <div className="w-16 h-16 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-9 h-9" />
                </div>
                <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">Message Sent Successfully!</h3>
                <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
                  Thank you for reaching out, <span className="font-semibold text-gray-800">{name}</span>. Our team will get back to you within 24 hours at <span className="font-semibold text-gray-800">{email}</span>.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setPhone('');
                    setMessage('');
                    setSubject('General Inquiry');
                  }}
                  className="px-6 py-3 bg-brand-700 text-white font-semibold rounded-xl hover:bg-brand-800 transition-colors text-sm"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <>
                <h2 className="text-2xl font-bold font-heading mb-6">Send us a message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm"
                    >
                      <option>General Inquiry</option>
                      <option>Product Question</option>
                      <option>Order Support</option>
                      <option>Partnership</option>
                      <option>Bulk Orders</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                    <textarea
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <button type="submit" className="flex items-center gap-2 px-8 py-4 bg-brand-700 text-white font-semibold rounded-xl hover:bg-brand-800 transition-colors shadow-lg shadow-brand-700/25">
                    <Send className="w-4 h-4" /> Send Message
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
