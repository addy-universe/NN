'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const whatsappUrl = "https://api.whatsapp.com/send/?phone=919899756597&text=Hi%20NirogNature,%20mujhe%20free%20doctor%20consultation%20ke%20liye%20baat%20karni%20hai.&type=phone_number&app_absent=0";

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex items-center gap-3">
      {/* Animated Help Badge */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="hidden md:flex items-center gap-2 bg-white text-gray-800 text-xs font-bold px-4 py-2.5 rounded-full shadow-lg border border-gray-100 hover:text-green-600 transition-colors"
      >
        <span className="w-2 h-2 rounded-full bg-green-500 animate-ping shrink-0" />
        Doctor se WhatsApp par baat karein!
      </motion.a>

      {/* Floating Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba56] text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 relative"
        aria-label="Chat with us on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-white/10" />
        
        {/* Mobile Notification Ring */}
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-extrabold rounded-full flex items-center justify-center animate-bounce">
          1
        </span>
      </motion.a>
    </div>
  );
}
