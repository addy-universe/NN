'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Search, ShoppingCart, User, ChevronDown,
  Heart, Sparkles, Dumbbell, Apple, Scissors
} from 'lucide-react';
import { useCartStore } from '@/lib/store';
import productsData from '@/data/products.json';
import { formatPrice } from '@/lib/data';

const shopLinks = [
  { name: 'Wellness', href: '/shop?category=wellness', icon: Heart },
  { name: 'Daily Nutrition', href: '/shop?category=daily-nutrition', icon: Apple },
  { name: 'Fitness', href: '/shop?category=fitness', icon: Dumbbell },
  { name: 'Skin Care', href: '/shop?category=skin-care', icon: Sparkles },
  { name: 'Hair Care', href: '/shop?category=hair-care', icon: Scissors },
  { name: 'Shop All', href: '/shop', icon: null },
];

const discoverLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Our Experts', href: '/doctors' },
  { name: 'Blog', href: '/blog' },
  { name: 'Testimonials', href: '/testimonials' },
  { name: 'Contact Us', href: '/contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const totalItems = useCartStore((s) => s.totalItems);
  const openCart = useCartStore((s) => s.openCart);

  useEffect(() => {
    setMounted(true);
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

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-brand-800 text-white text-center py-2 px-4 text-xs sm:text-sm font-medium tracking-wide">
        <p>
          ⚡ FLASH SALE! GET UPTO 50% OFF ON ALL ORDERS | Use Code:{' '}
          <span className="font-bold text-gold-300">NIROG50</span> |{' '}
          <Link href="/shop" className="underline underline-offset-2 hover:text-gold-200 transition-colors">
            SHOP NOW →
          </Link>
        </p>
      </div>

      {/* Category Quick Links - Desktop only */}
      <div className="hidden lg:block bg-brand-50 border-b border-brand-100">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-8 py-2">
          {shopLinks.slice(0, 5).map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-1.5 text-xs font-medium text-brand-700 hover:text-brand-900 transition-colors"
            >
              {link.icon && <link.icon className="w-3.5 h-3.5" />}
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5'
            : 'bg-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
              <img
                src="/images/logo.jpeg"
                alt="NirogNature Logo"
                className="w-10 h-10 object-contain rounded-full shadow-sm group-hover:scale-105 transition-transform duration-300 border border-brand-100/50"
              />
              <span className="text-2xl lg:text-3xl font-extrabold font-heading tracking-tight">
                <span className="text-brand-700">Nirog</span>
                <span className="text-gray-800">Nature</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {/* Shop Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('shop')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-gray-700 hover:text-brand-700 transition-colors rounded-lg hover:bg-brand-50">
                  Shop <ChevronDown className="w-4 h-4" />
                </button>
                <AnimatePresence>
                  {activeDropdown === 'shop' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl shadow-black/10 border border-gray-100 p-3 mt-1"
                    >
                      {shopLinks.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:text-brand-700 hover:bg-brand-50 rounded-xl transition-all"
                        >
                          {link.icon && <link.icon className="w-4 h-4 text-brand-500" />}
                          <span className="font-medium">{link.name}</span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Discover Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('discover')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-gray-700 hover:text-brand-700 transition-colors rounded-lg hover:bg-brand-50">
                  Discover <ChevronDown className="w-4 h-4" />
                </button>
                <AnimatePresence>
                  {activeDropdown === 'discover' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 w-56 bg-white rounded-2xl shadow-xl shadow-black/10 border border-gray-100 p-3 mt-1"
                    >
                      {discoverLinks.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          className="block px-4 py-3 text-sm font-medium text-gray-600 hover:text-brand-700 hover:bg-brand-50 rounded-xl transition-all"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/shop?tag=bestseller" className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-brand-700 transition-colors rounded-lg hover:bg-brand-50">
                Bestsellers
              </Link>
              <Link href="/blog" className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-brand-700 transition-colors rounded-lg hover:bg-brand-50">
                Blog
              </Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-gray-600" />
              </button>
              <Link href="/account" className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors" aria-label="Account">
                <User className="w-5 h-5 text-gray-600" />
              </Link>
              <a
                href="https://api.whatsapp.com/send/?phone=919899756597&text=Hi%20NirogNature,%20I%20want%20to%20know%20more%20about%20your%20Ayurvedic%20products.&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors text-[#25D366] hover:text-[#20ba56]"
                aria-label="WhatsApp Chat"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.437 0 9.862-4.416 9.866-9.852.002-2.633-1.018-5.109-2.873-6.968C16.395 1.94 13.929.92 11.302.92c-5.436 0-9.86 4.417-9.865 9.853-.002 1.834.488 3.626 1.416 5.207L1.87 21.2l5.077-1.346L6.647 19.15z"/>
                </svg>
              </a>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
            <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <img
                      src="/images/logo.jpeg"
                      alt="NirogNature Logo"
                      className="w-8 h-8 object-contain rounded-full border border-brand-100/50"
                    />
                    <span className="text-xl font-bold font-heading">
                      <span className="text-brand-700">Nirog</span>Nature
                    </span>
                  </div>
                  <button onClick={() => setMobileOpen(false)} className="p-2 rounded-full hover:bg-gray-100">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-1 mb-6">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Shop</p>
                  {shopLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:text-brand-700 hover:bg-brand-50 rounded-xl transition-all"
                    >
                      {link.icon && <link.icon className="w-4 h-4 text-brand-500" />}
                      {link.name}
                    </Link>
                  ))}
                </div>

                <div className="space-y-1 mb-6">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Discover</p>
                  {discoverLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-brand-700 hover:bg-brand-50 rounded-xl transition-all"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <Link
                    href="/shop"
                    onClick={() => setMobileOpen(false)}
                    className="block w-full py-3.5 text-center bg-brand-700 text-white font-semibold rounded-xl hover:bg-brand-800 transition-colors"
                  >
                    Shop All Products
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex justify-center p-4 sm:p-6 md:p-10 pt-16 md:pt-24"
          >
            <div className="absolute inset-0" onClick={() => setIsSearchOpen(false)} />
            <motion.div
              initial={{ scale: 0.97, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.97, y: -20 }}
              className="relative bg-white rounded-3xl w-full max-w-2xl h-[500px] shadow-2xl flex flex-col overflow-hidden border border-gray-100"
            >
              {/* Search Header */}
              <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products, ingredients, tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 text-sm text-gray-900 placeholder-gray-400 focus:outline-none py-1 bg-transparent"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {searchQuery ? (
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                      Search Results
                    </h4>
                    {productsData.filter(p =>
                      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
                    ).length > 0 ? (
                      <div className="grid gap-3">
                        {productsData
                          .filter(p =>
                            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
                          )
                          .map(product => (
                            <Link
                              key={product.id}
                              href={`/product/${product.slug}`}
                              onClick={() => {
                                setIsSearchOpen(false);
                                setSearchQuery('');
                              }}
                              className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all group"
                            >
                              <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                                🌿
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">
                                  {product.name}
                                </p>
                                <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mt-0.5">
                                  {product.category}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-bold text-gray-900">
                                  {formatPrice(product.variants[0].price)}
                                </p>
                                <p className="text-[10px] text-gray-400 line-through">
                                  {formatPrice(product.variants[0].comparePrice)}
                                </p>
                              </div>
                            </Link>
                          ))}
                      </div>
                    ) : (
                      <div className="py-12 text-center text-gray-400 text-sm">
                        No products found matching &ldquo;{searchQuery}&rdquo;
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Suggested Searches */}
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
                        Popular Searches
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {['Shilajit', 'Ashwagandha', 'Hair', 'Stamina', 'Daily Nutrition'].map(tag => (
                          <button
                            key={tag}
                            onClick={() => setSearchQuery(tag)}
                            className="px-3.5 py-1.5 bg-gray-50 text-gray-600 hover:bg-brand-50 hover:text-brand-700 rounded-xl text-xs font-semibold border border-gray-100 hover:border-brand-100 transition-all"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quick Link Products */}
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                        Featured Products
                      </h4>
                      <div className="grid gap-3">
                        {productsData.slice(0, 3).map(product => (
                          <Link
                            key={product.id}
                            href={`/product/${product.slug}`}
                            onClick={() => setIsSearchOpen(false)}
                            className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all group"
                          >
                            <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                              🌿
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">
                                {product.name}
                              </p>
                              <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mt-0.5">
                                {product.category}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold text-gray-900">
                                {formatPrice(product.variants[0].price)}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
