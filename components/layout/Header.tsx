'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'असली वीडियो', href: '#product-video' },
  { name: 'जड़ी-बूटियाँ', href: '#ingredients' },
  { name: 'कैसे इस्तेमाल करें', href: '#how-to-use' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileOpen]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl border-gray-100 shadow-sm'
            : 'bg-[var(--color-bg-cream)] border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
              <img
                src="/images/logo.jpeg"
                alt="Nirog Nature Logo"
                className="w-10 h-10 object-contain rounded-full shadow-sm group-hover:scale-105 transition-transform duration-300 border border-[var(--color-brand-forest)]/20"
              />
              <span className="text-2xl font-extrabold font-heading tracking-tight text-[var(--color-brand-forest)]">
                Nirog Nature
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-sm font-semibold text-[var(--color-charcoal)] hover:text-[var(--color-brand-forest)] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <a
                href="tel:+919899756597"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors"
                title="कॉल करें"
              >
                📞 98997 56597
              </a>
              <a
                href="#order-form"
                onClick={(e) => scrollToSection(e, '#order-form')}
                className="flex items-center justify-center px-5 py-2.5 bg-amber-500 text-stone-950 font-black rounded-xl hover:bg-amber-400 transition-all shadow-md text-xs sm:text-sm tracking-wide"
              >
                ऑर्डर करें (COD)
              </a>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5 text-[var(--color-brand-forest)]" /> : <Menu className="w-5 h-5 text-[var(--color-brand-forest)]" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-[var(--color-bg-cream)] shadow-2xl overflow-y-auto"
            >
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <img
                      src="/images/logo.jpeg"
                      alt="Nirog Nature Logo"
                      className="w-8 h-8 object-contain rounded-full border border-[var(--color-brand-forest)]/20"
                    />
                    <span className="text-xl font-bold font-heading text-[var(--color-brand-forest)]">
                      Nirog Nature
                    </span>
                  </div>
                  <button onClick={() => setMobileOpen(false)} className="p-2 rounded-full hover:bg-black/5">
                    <X className="w-5 h-5 text-[var(--color-charcoal)]" />
                  </button>
                </div>

                <div className="space-y-2 flex-1">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => scrollToSection(e, link.href)}
                      className="block px-4 py-4 text-base font-semibold text-[var(--color-charcoal)] hover:text-[var(--color-brand-forest)] hover:bg-black/5 rounded-none transition-all"
                    >
                      {link.name}
                    </a>
                  ))}
                  <div className="pt-4 border-t border-[var(--color-brand-forest)]/10 space-y-2">
                    <a
                      href="tel:+919899756597"
                      className="flex items-center gap-2 px-4 py-3 bg-emerald-50 text-emerald-900 rounded-xl font-bold text-sm"
                    >
                      📞 डॉक्टर / कस्टमर केयर: 98997 56597
                    </a>
                  </div>
                </div>

                <div className="pt-6 border-t border-[var(--color-brand-forest)]/10 mt-auto">
                  <a
                    href="#order-form"
                    onClick={(e) => scrollToSection(e, '#order-form')}
                    className="flex w-full py-4 justify-center bg-amber-500 text-stone-950 font-black rounded-xl hover:bg-amber-400 transition-colors uppercase tracking-wider text-sm shadow-md"
                  >
                    अभी ऑर्डर करें • ₹11,300 (COD)
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
