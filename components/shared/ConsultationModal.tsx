'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Phone, Stethoscope, CheckCircle, ArrowRight } from 'lucide-react';
import { useConsultationStore } from '@/lib/store';

const healthIssues = [
  'Stamina aur Energy badhana',
  'Muscles aur Fit Body banana',
  'Skin Glow aur Anti-Aging',
  'Baal jhadna rokna (Hair Growth)',
  'Digestion aur Vajan kam karna',
  'Daily Immunity aur Stress relief',
];

export default function ConsultationModal() {
  const { isOpen, closeModal } = useConsultationStore();
  const [step, setStep] = useState(1);
  const [selectedIssue, setSelectedIssue] = useState('');
  const [mode, setMode] = useState('phone');
  const [fullName, setFullName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [prefDate, setPrefDate] = useState('');
  const [prefTime, setPrefTime] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phoneNum || !prefDate || !prefTime) {
      setErrorMsg('Kripya saari details sahi se bharein');
      return;
    }
    setErrorMsg('');
    setStep(3); // Success step
  };

  const handleClose = () => {
    setStep(1);
    setSelectedIssue('');
    setFullName('');
    setPhoneNum('');
    setPrefDate('');
    setPrefTime('');
    setErrorMsg('');
    closeModal();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-brand-50">
              <div className="flex items-center gap-2.5">
                <Stethoscope className="w-5 h-5 text-brand-700 animate-pulse-soft" />
                <div>
                  <h3 className="font-bold text-gray-900 text-base font-heading">Doctor Se Muft Baat Karein</h3>
                  <p className="text-[10px] text-brand-600 font-semibold tracking-wider uppercase">Pure Ayurvedic & Certified Experts</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-1.5 rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6">
              {/* Step 1: Health Issue Selection */}
              {step === 1 && (
                <div className="space-y-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Aap kis health goal ya concern ke baare me baat karna chahte hain?</p>
                  <div className="grid grid-cols-2 gap-3">
                    {healthIssues.map((issue) => (
                      <button
                        key={issue}
                        onClick={() => setSelectedIssue(issue)}
                        className={`p-3 text-left rounded-xl border text-xs font-medium transition-all ${
                          selectedIssue === issue
                            ? 'border-brand-700 bg-brand-50 text-brand-700'
                            : 'border-gray-200 text-gray-600 hover:border-brand-300'
                        }`}
                      >
                        {issue}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => selectedIssue ? setStep(2) : setErrorMsg('Kripya koi ek concern select karein')}
                    className="w-full mt-4 flex items-center justify-center gap-2 py-3.5 bg-brand-700 text-white font-semibold rounded-xl hover:bg-brand-800 transition-colors text-sm"
                  >
                    Agla Step <ArrowRight className="w-4 h-4" />
                  </button>
                  {errorMsg && <p className="text-xs text-red-500 text-center font-medium">{errorMsg}</p>}
                </div>
              )}

              {/* Step 2: Consultation Details & Contact Info */}
              {step === 2 && (
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Aapka Naam (Full Name)</label>
                    <input
                      type="text"
                      required
                      placeholder="Apna naam likhein"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="Apna 10-digit number likhein"
                      value={phoneNum}
                      onChange={(e) => setPhoneNum(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Konsi Date ko?</label>
                      <input
                        type="date"
                        required
                        value={prefDate}
                        onChange={(e) => setPrefDate(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Konsa Time?</label>
                      <input
                        type="time"
                        required
                        value={prefTime}
                        onChange={(e) => setPrefTime(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="py-2">
                    <label className="block text-xs font-semibold text-gray-700 mb-2">Aap kaise baat karna chahenge?</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 text-xs font-medium cursor-pointer text-gray-600">
                        <input
                          type="radio"
                          name="mode"
                          checked={mode === 'phone'}
                          onChange={() => setMode('phone')}
                          className="text-brand-700 focus:ring-brand-500"
                        />
                        Direct Phone Call
                      </label>
                      <label className="flex items-center gap-2 text-xs font-medium cursor-pointer text-gray-600">
                        <input
                          type="radio"
                          name="mode"
                          checked={mode === 'whatsapp'}
                          onChange={() => setMode('whatsapp')}
                          className="text-brand-700 focus:ring-brand-500"
                        />
                        WhatsApp Consultation
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-3.5 border border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors text-xs"
                    >
                      Peeche
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3.5 bg-brand-700 text-white font-semibold rounded-xl hover:bg-brand-800 transition-colors text-xs text-center"
                    >
                      Free Consultation Book Karein
                    </button>
                  </div>
                  {errorMsg && <p className="text-xs text-red-500 text-center font-medium">{errorMsg}</p>}
                </form>
              )}

              {/* Step 3: Success Confirmation */}
              {step === 3 && (
                <div className="py-8 text-center space-y-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.1 }}
                    className="w-16 h-16 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle className="w-10 h-10" />
                  </motion.div>
                  <h4 className="text-lg font-bold text-gray-900 font-heading">Consultation Book Ho Gaya!</h4>
                  <p className="text-xs text-gray-500 leading-relaxed max-w-sm mx-auto">
                    Shukriya <span className="font-semibold text-gray-800">{fullName}</span>, aapka free consultation book ho chuka hai. 
                    Humare health expert aapke chuninda time <span className="font-semibold text-gray-800">{prefTime}</span> par <span className="font-semibold text-gray-800">{prefDate}</span> ko contact karenge.
                  </p>
                  <p className="text-xs text-brand-700 font-semibold mt-2">
                    ⚡ Humare senior doctor ya wellness coach aapko number ({phoneNum}) par bohot jald call karenge.
                  </p>
                  <button
                    onClick={handleClose}
                    className="mt-6 px-6 py-2.5 bg-gray-900 text-white text-xs font-semibold rounded-xl hover:bg-gray-800 transition-colors"
                  >
                    Band Karein
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
