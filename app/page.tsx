'use client';

import { useState, useEffect, useRef } from 'react';
import { ShieldCheck, CheckCircle2, Truck, Award, Lock, Sparkles, PhoneCall, Leaf, Clock, ArrowRight, Check, PackageCheck } from 'lucide-react';
import DoctorsSection from '@/components/home/DoctorsSection';
import ClinicSection from '@/components/home/ClinicSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FAQSection from '@/components/home/FAQSection';
import ConsultationModal from '@/components/shared/ConsultationModal';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import { getDoctors, getTestimonials, getFaqs } from '@/lib/data';
import { useConsultationStore } from '@/lib/store';
import { event } from '@/lib/fpixel';

const PRODUCT_PRICE = 11300;

interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayFailureResponse {
  error: {
    description: string;
  };
}

interface RazorpayInstance {
  open: () => void;
  on: (event: string, callback: (response: RazorpayFailureResponse) => void) => void;
}

interface RazorpayConstructor {
  new (options: Record<string, unknown>): RazorpayInstance;
}

const INDIAN_STATES = [
  'Uttar Pradesh (उत्तर प्रदेश)',
  'Bihar (बिहार)',
  'Rajasthan (राजस्थान)',
  'Madhya Pradesh (मध्य प्रदेश)',
  'Haryana (हरियाणा)',
  'Punjab (पंजाब)',
  'Delhi (दिल्ली)',
  'Maharashtra (महाराष्ट्र)',
  'Gujarat (गुजरात)',
  'West Bengal (पश्चिम बंगाल)',
  'Jharkhand (झारखंड)',
  'Chhattisgarh (छत्तीसगढ़)',
  'Uttarakhand (उत्तराखंड)',
  'Himachal Pradesh (हिमाचल प्रदेश)',
  'Jammu & Kashmir (जम्मू और कश्मीर)',
  'Assam (असम)',
  'Odisha (ओडिशा)',
  'Karnataka (कर्नाटक)',
  'Telangana (तेलंगाना)',
  'Andhra Pradesh (आंध्र प्रदेश)',
  'Tamil Nadu (तमिलनाडु)',
  'Kerala (केरल)',
];

export default function SingleProductPage() {
  // Default to Cash on Delivery (COD) for maximum simplicity & conversion
  const [paymentOption, setPaymentOption] = useState<'cod' | 'full'>('cod');
  const [selectedImage, setSelectedImage] = useState<string>('/urja-front.png');
  
  const [formData, setFormData] = useState({
    fullName: '', mobile: '', address: '', city: '', state: '', pincode: ''
  });

  const [orderStatus, setOrderStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [generatedOrderId, setGeneratedOrderId] = useState<string>('');
  const openConsultation = useConsultationStore((s) => s.openModal);

  const doctors = getDoctors();
  const testimonials = getTestimonials();
  const faqs = getFaqs();

  const orderSubmittedRef = useRef(false);
  const lastCapturedDataRef = useRef('');
  const hasInitiatedCheckoutRef = useRef(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // 1. Meta Pixel: Fire ViewContent on mount + Page Visit notification
  useEffect(() => {
    event('ViewContent', {
      content_name: 'निरोग नेचर ऊर्जा मैक्स गोल्ड',
      content_category: 'Ayurvedic Wellness',
      value: PRODUCT_PRICE,
      currency: 'INR'
    });

    fetch('/api/track-visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: '/' })
    }).catch(() => {});
  }, []);

  // 2. Track when user starts interacting with the order form
  const handleFormInteraction = () => {
    if (!hasInitiatedCheckoutRef.current) {
      hasInitiatedCheckoutRef.current = true;
      event('InitiateCheckout', {
        content_name: 'निरोग नेचर ऊर्जा मैक्स गोल्ड',
        value: PRODUCT_PRICE,
        currency: 'INR'
      });
    }
  };

  // 3. Helper to send Abandoned Lead / Partial Address data
  const sendAbandonedLead = (dataToSend = formData) => {
    if (orderSubmittedRef.current) return;
    if (!dataToSend.fullName && !dataToSend.mobile && !dataToSend.address) return;

    const serialized = JSON.stringify(dataToSend);
    if (lastCapturedDataRef.current === serialized) return;
    lastCapturedDataRef.current = serialized;

    fetch('/api/abandoned-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productName: 'निरोग नेचर ऊर्जा मैक्स गोल्ड',
        paymentOption,
        ...dataToSend
      })
    }).catch(() => {});
  };

  // 4. Auto-save lead details when user fills in form (Debounced 2.5s)
  useEffect(() => {
    if (orderSubmittedRef.current) return;
    if (!formData.fullName && !formData.mobile && !formData.address) return;

    const timer = setTimeout(() => {
      sendAbandonedLead(formData);
    }, 2500);

    return () => clearTimeout(timer);
  }, [formData, paymentOption]);

  // 5. Capture lead on page exit / navigate back
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (orderSubmittedRef.current) return;
      if (formData.fullName || formData.mobile || formData.address) {
        const payload = JSON.stringify({
          productName: 'निरोग नेचर ऊर्जा मैक्स गोल्ड',
          paymentOption,
          ...formData
        });
        navigator.sendBeacon('/api/abandoned-lead', payload);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [formData, paymentOption]);

  const scrollToOrderForm = () => {
    handleFormInteraction();
    const formEl = document.getElementById('order-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 500);
    }
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.mobile.length !== 10) {
      alert('कृपया अपना सही 10 अंकों का मोबाइल नंबर भरें');
      return;
    }

    orderSubmittedRef.current = true;
    const orderNum = `NN-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedOrderId(orderNum);

    const submitOrderToBackend = async (paymentDetails: Record<string, unknown> | null = null) => {
      try {
        await fetch('/api/order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: orderNum,
            productName: 'निरोग नेचर ऊर्जा मैक्स गोल्ड',
            product: 'निरोग नेचर ऊर्जा मैक्स गोल्ड',
            ...formData,
            paymentOption,
            amount: PRODUCT_PRICE,
            paymentDetails,
            date: new Date().toISOString()
          })
        });

        // Fire Meta Pixel Purchase event on order completion
        event('Purchase', {
          content_name: 'निरोग नेचर ऊर्जा मैक्स गोल्ड',
          content_type: 'product',
          value: PRODUCT_PRICE,
          currency: 'INR'
        });

        setOrderStatus('success');
      } catch (error) {
        console.error(error);
        orderSubmittedRef.current = false;
        alert('ऑर्डर दर्ज करने में कोई समस्या आई। कृपया दोबारा प्रयास करें या हमें कॉल करें।');
        setOrderStatus('idle');
      }
    };

    if (paymentOption === 'full') {
      setOrderStatus('processing');
      try {
        const res = await fetch('/api/razorpay', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: PRODUCT_PRICE })
        });
        
        const data = await res.json();
        
        if (!data.success) {
          throw new Error('Payment initialization failed');
        }

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_live_TOn6Gjuzof9k8E', 
          amount: data.order.amount,
          currency: data.order.currency,
          order_id: data.order.id,
          name: 'निरोग नेचर - ऊर्जा मैक्स गोल्ड',
          description: 'पूरा पेमेंट - निरोग नेचर ऊर्जा मैक्स गोल्ड',
          handler: function (response: RazorpaySuccessResponse) {
            submitOrderToBackend({
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature
            });
          },
          prefill: {
            name: formData.fullName,
            contact: formData.mobile
          },
          theme: {
            color: '#166534'
          },
          modal: {
            ondismiss: function() {
              setOrderStatus('idle');
            }
          }
        };

        const RazorpayGlobal = (window as unknown as { Razorpay: RazorpayConstructor }).Razorpay;
        if (!RazorpayGlobal) {
          throw new Error('Razorpay SDK not loaded');
        }
        const rzp = new RazorpayGlobal(options);
        rzp.on('payment.failed', function (response: RazorpayFailureResponse) {
          alert('पेमेंट पूरा नहीं हो सका: ' + response.error.description);
          setOrderStatus('idle');
        });
        rzp.open();
      } catch (error) {
        console.error(error);
        alert('ऑनलाइन पेमेंट शुरू नहीं हो पाया। आप नीचे "कैश ऑन डिलीवरी (COD)" चुनकर भी ऑर्डर कर सकते हैं।');
        setOrderStatus('idle');
      }
    } else {
      // Direct Cash On Delivery (COD) - 0 friction
      setOrderStatus('processing');
      submitOrderToBackend(null);
    }
  };

  // SUCCESS SCREEN
  if (orderStatus === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4 py-12">
        <div className="max-w-lg w-full bg-white p-6 sm:p-10 rounded-3xl shadow-2xl border border-emerald-200 text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-12 h-12 text-emerald-700" />
          </div>
          
          <span className="bg-emerald-100 text-emerald-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            ऑर्डर नंबर: {generatedOrderId || 'NN-SUCCESS'}
          </span>

          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 font-heading mt-3 mb-2">
            बधाई हो! आपका ऑर्डर दर्ज हो गया है
          </h2>
          <p className="text-stone-600 text-sm mb-6">
            निरोग नेचर पर भरोसा करने के लिए धन्यवाद। हमारा प्रतिनिधि आपसे फ़ोन पर संपर्क करके पार्सल डिस्पैच की पुष्टि करेगा।
          </p>
          
          <div className="bg-stone-50 p-5 rounded-2xl text-left mb-6 space-y-3 text-sm border border-stone-200">
            <div className="flex justify-between border-b border-stone-200/80 pb-2">
              <span className="text-stone-500 font-medium">उत्पाद:</span>
              <span className="font-bold text-stone-900">निरोग नेचर ऊर्जा मैक्स गोल्ड</span>
            </div>
            <div className="flex justify-between border-b border-stone-200/80 pb-2">
              <span className="text-stone-500 font-medium">ग्राहक:</span>
              <span className="font-bold text-stone-900">{formData.fullName || 'ग्राहक'}</span>
            </div>
            <div className="flex justify-between border-b border-stone-200/80 pb-2">
              <span className="text-stone-500 font-medium">फ़ोन नंबर:</span>
              <span className="font-bold text-emerald-800">{formData.mobile}</span>
            </div>
            <div className="flex justify-between border-b border-stone-200/80 pb-2">
              <span className="text-stone-500 font-medium">भुगतान का तरीका:</span>
              <span className="font-bold text-stone-900">
                {paymentOption === 'cod' ? 'कैश ऑन डिलीवरी (COD)' : 'ऑनलाइन भुगतान (Paid)'}
              </span>
            </div>
            
            {paymentOption === 'cod' ? (
              <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-amber-950 font-bold text-xs mt-3 flex items-center gap-2">
                <Truck className="w-5 h-5 text-amber-700 shrink-0" />
                <span>डिलीवरी के समय पार्सल मिलने पर डिलीवरी बॉय को <strong>₹{PRODUCT_PRICE.toLocaleString('en-IN')}</strong> नकद दें।</span>
              </div>
            ) : (
              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-emerald-950 font-bold text-xs mt-3 flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>आपका भुगतान सुरक्षित रूप से प्राप्त हो चुका है। डिलीवरी के समय कोई शुल्क नहीं देना।</span>
              </div>
            )}
          </div>
          
          <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-100 text-xs text-stone-700 mb-6 text-left space-y-1">
            <p className="flex items-center gap-2 font-medium">
              <Lock className="w-4 h-4 text-emerald-700 shrink-0" />
              <span><strong>गोपनीय पार्सल (Discreet Packaging):</strong> पार्सल के बाहर उत्पाद का नाम नहीं लिखा होता।</span>
            </p>
            <p className="flex items-center gap-2 font-medium">
              <Clock className="w-4 h-4 text-emerald-700 shrink-0" />
              <span><strong>डिलीवरी समय:</strong> 3 से 5 दिनों में आपके घर डिलीवरी।</span>
            </p>
          </div>

          <div className="space-y-3">
            <a
              href="https://api.whatsapp.com/send/?phone=919899756597&text=Namaste%2C%20maine%20order%20place%20kiya%20hai%2C%20kripya%20status%20bataiye"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold text-sm rounded-xl shadow transition-all flex items-center justify-center gap-2"
            >
              💬 WhatsApp पर ऑर्डर स्टेटस जानें
            </a>
            
            <button 
              onClick={() => window.location.reload()} 
              className="w-full py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-sm rounded-xl transition-all"
            >
              मुख्य पृष्ठ पर वापस जाएँ
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-stone-50 font-sans text-stone-900 pb-16 sm:pb-0">
      
      {/* 0. AUTHENTIC TOP BANNER */}
      <div className="bg-emerald-950 text-emerald-100 text-xs font-semibold py-2.5 px-4 text-center border-b border-emerald-900/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <Award className="w-4 h-4 text-amber-400 shrink-0" />
            <span>आयुष (AYUSH) स्वीकृत मानक • 100% शुद्ध आयुर्वेदिक फॉर्मूला</span>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-[11px] text-emerald-300">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> GMP Certified Lab</span>
            <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-emerald-400" /> 100% गुप्त (Secret) पैकिंग</span>
            <button onClick={openConsultation} className="hover:underline text-amber-300 font-bold flex items-center gap-1">
              <PhoneCall className="w-3 h-3" /> डॉ. मुफ़्त परामर्श
            </button>
          </div>
        </div>
      </div>

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-stone-950 via-emerald-950 to-emerald-900 text-white pt-10 sm:pt-14 pb-16 sm:pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Hero Text Content */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-emerald-900/80 border border-emerald-700/60 text-emerald-200 text-xs font-bold px-4 py-1.5 rounded-full mb-5 shadow-sm backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                प्रमाणिक एवं शुद्ध आयुर्वेदिक उपचार
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-heading leading-tight mb-4 text-stone-100">
                प्राकृतिक शक्ति एवं ऊर्जा <br />
                <span className="text-amber-400 font-bold">निरोग नेचर ऊर्जा मैक्स गोल्ड</span>
              </h1>

              <p className="text-stone-300 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 max-w-xl mx-auto lg:mx-0 font-medium">
                शुद्ध हिमालयन शिलाजीत, अश्वगंधा, कौंच बीज और 14 असरदार जड़ी-बूटियों का संगम। कमजोरी, थकान और स्ट्रेस को दूर कर प्राकृतिक ताकत वापस पाएँ।
              </p>

              {/* 3 Highlights */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 bg-stone-900/70 border border-emerald-800/40 p-3.5 rounded-2xl backdrop-blur-sm max-w-lg mx-auto lg:mx-0">
                <div className="text-center">
                  <p className="text-amber-400 font-black text-lg sm:text-xl font-heading">100%</p>
                  <p className="text-[11px] sm:text-xs text-stone-300 font-medium">शुद्ध आयुर्वेदिक</p>
                </div>
                <div className="text-center border-x border-emerald-800/40">
                  <p className="text-amber-400 font-black text-lg sm:text-xl font-heading">30,000+</p>
                  <p className="text-[11px] sm:text-xs text-stone-300 font-medium">संतुष्ट ग्राहक</p>
                </div>
                <div className="text-center">
                  <p className="text-amber-400 font-black text-lg sm:text-xl font-heading">0%</p>
                  <p className="text-[11px] sm:text-xs text-stone-300 font-medium">साइड इफ़ेक्ट</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start">
                <button 
                  onClick={scrollToOrderForm}
                  className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-base sm:text-lg rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 transform active:scale-95"
                >
                  📦 अभी ऑर्डर करें (कैश ऑन डिलीवरी) <ArrowRight className="w-5 h-5" />
                </button>
                <a 
                  href="tel:+919899756597"
                  className="px-6 py-3.5 bg-emerald-900/90 hover:bg-emerald-800 text-emerald-100 font-bold text-sm rounded-2xl border border-emerald-700/60 transition-all flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  कॉल करें: 98997 56597
                </a>
              </div>

              <p className="text-xs text-emerald-300 mt-4 font-semibold flex items-center justify-center lg:justify-start gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-400" /> कोई एडवांस नहीं • पार्सल घर मिलने पर पैसे दें
              </p>
            </div>

            {/* Product Card Showcase */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative bg-gradient-to-b from-emerald-900/60 to-stone-900/90 border border-emerald-700/50 p-5 sm:p-6 rounded-3xl shadow-2xl backdrop-blur-md max-w-sm w-full">
                <div className="absolute top-4 right-4 z-10 bg-amber-500 text-stone-950 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow">
                  ऑफर बचत ₹3,700
                </div>

                <div className="aspect-square w-full rounded-2xl bg-stone-950/40 p-4 mb-3 flex items-center justify-center overflow-hidden border border-emerald-800/30 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={selectedImage} 
                    alt="निरोग नेचर ऊर्जा मैक्स गोल्ड" 
                    className="w-full h-full object-contain transition-all duration-300" 
                  />
                  <div className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-sm text-[10px] text-amber-300 font-bold px-2 py-0.5 rounded border border-amber-500/30">
                    {selectedImage === '/urja-front.png' ? 'फ्रंट (Front View)' : 'बैक (Back View)'}
                  </div>
                </div>

                {/* View Switcher */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <button
                    type="button"
                    onClick={() => setSelectedImage('/urja-front.png')}
                    className={`flex items-center gap-2 p-2 rounded-xl border transition-all text-xs font-bold ${
                      selectedImage === '/urja-front.png'
                        ? 'border-amber-400 bg-amber-400/20 text-amber-300'
                        : 'border-emerald-800/40 bg-stone-950/40 text-stone-400 hover:border-emerald-700'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg overflow-hidden bg-stone-950 p-0.5 shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/urja-front.png" alt="Front" className="w-full h-full object-contain" />
                    </div>
                    <span>सामने का फोटो (Front)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedImage('/urja-back.png')}
                    className={`flex items-center gap-2 p-2 rounded-xl border transition-all text-xs font-bold ${
                      selectedImage === '/urja-back.png'
                        ? 'border-amber-400 bg-amber-400/20 text-amber-300'
                        : 'border-emerald-800/40 bg-stone-950/40 text-stone-400 hover:border-emerald-700'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg overflow-hidden bg-stone-950 p-0.5 shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/urja-back.png" alt="Back" className="w-full h-full object-contain" />
                    </div>
                    <span>पीछे का फोटो (Back)</span>
                  </button>
                </div>

                <div className="text-center">
                  <p className="text-stone-400 text-xs font-semibold line-through">MRP: ₹15,000</p>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <span className="text-3xl sm:text-4xl font-black text-amber-400">₹11,300</span>
                    <span className="text-xs bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded font-bold">फ्री डिलीवरी</span>
                  </div>

                  <div className="space-y-1.5 text-stone-300 text-xs font-medium text-left border-t border-emerald-800/40 pt-3 mb-4">
                    <p className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span><strong>100% ऑथेंटिक</strong> जड़ी-बूटियाँ</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span><strong>कैश ऑन डिलीवरी (COD)</strong> उपलब्ध</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span><strong>गुपचुप (गोपनीय) पार्सल</strong> - किसी को पता नहीं चलेगा</span>
                    </p>
                  </div>

                  <button 
                    onClick={scrollToOrderForm}
                    className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 text-base font-black rounded-xl shadow-lg transition-all"
                  >
                    👉 अभी ऑर्डर फॉर्म भरें
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. AUTHENTIC HERBAL INGREDIENTS */}
      <section id="ingredients" className="py-14 sm:py-16 px-4 bg-white border-b border-stone-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-emerald-800 font-bold text-xs uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              🌿 100% प्राकृतिक घटक
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-heading text-stone-900 mt-3 mb-2">
              किन शक्तिशाली जड़ी-बूटियों से बना है?
            </h2>
            <p className="text-stone-600 text-sm">
              सभी सामग्रियाँ उच्च गुणवत्ता और NABL मान्यता प्राप्त लैब से जाँची हुई हैं।
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'हिमालयन शुद्ध शिलाजीत', desc: 'शारीरिक कमजोरी दूर कर प्राकृतिक स्टैमिना और अंदरूनी जोश को बढ़ाता है।' },
              { title: 'नागोरी अश्वगंधा', desc: 'तनाव, चिंता और थकावट को मिटाकर मांसपेशियों को भरपूर ताकत देता है।' },
              { title: 'सफ़ेद मूसली', desc: 'शरीर के धातु बल, ऊर्जा और सहनशक्ति को मजबूत बनाने में बेहद असरदार।' },
              { title: 'गोखरू एवं कौंच बीज', desc: 'शरीर की प्राकृतिक पौरुष क्षमता और लंबे समय तक स्फूर्ति बनाए रखने में सहायक।' },
            ].map((item, i) => (
              <div key={i} className="bg-stone-50 p-5 rounded-2xl border border-stone-200 hover:border-emerald-400 transition-colors">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center mb-3">
                  <Leaf className="w-5 h-5 text-emerald-800" />
                </div>
                <h3 className="font-bold text-stone-900 text-sm mb-1.5 font-heading">{item.title}</h3>
                <p className="text-stone-600 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. HOW TO USE / कैसे इस्तेमाल करें (Clear simple steps for less-educated users) */}
      <section id="how-to-use" className="py-14 sm:py-16 px-4 bg-emerald-50/50 border-b border-stone-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-emerald-800 font-bold text-xs uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
              आसान इस्तेमाल का तरीका
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-heading text-stone-900 mt-3 mb-2">
              दवा कैसे और कब खानी है?
            </h2>
            <p className="text-stone-600 text-sm">
              कोई कठिन नियम नहीं — बस दिन में 2 बार नियम से लें और असर खुद महसूस करें।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm text-center">
              <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center mx-auto mb-4 font-black text-lg">
                1
              </div>
              <h3 className="font-bold text-stone-900 text-base mb-2">सुबह नाश्ते के बाद</h3>
              <p className="text-stone-600 text-xs leading-relaxed">
                सुबह नाश्ता करने के 30 मिनट बाद 1 खुराक ताज़ा पानी या हल्के गुनगुने दूध के साथ लें।
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm text-center">
              <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center mx-auto mb-4 font-black text-lg">
                2
              </div>
              <h3 className="font-bold text-stone-900 text-base mb-2">रात को सोने से पहले</h3>
              <p className="text-stone-600 text-xs leading-relaxed">
                रात का भोजन करने के बाद, सोने से 30 मिनट पहले 1 खुराक गुनगुने दूध के साथ लें।
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm text-center">
              <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center mx-auto mb-4 font-black text-lg">
                3
              </div>
              <h3 className="font-bold text-stone-900 text-base mb-2">पूरे 30 दिन का कोर्स</h3>
              <p className="text-stone-600 text-xs leading-relaxed">
                श्रेष्ठ और स्थायी परिणाम के लिए दवा बीच में न छोड़ें। पूरे 30 दिन नियम से इस्तेमाल करें।
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={scrollToOrderForm}
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm rounded-xl shadow transition-all"
            >
              📦 मुझे यह कोर्स चाहिए (Order COD) <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. VERIFIED DOCTORS */}
      <div id="why-us">
        <DoctorsSection doctors={doctors} />
      </div>

      {/* 5. PHYSICAL CLINIC VERIFICATION */}
      <ClinicSection />

      {/* 6. VERIFIED CUSTOMER REVIEWS */}
      <TestimonialsSection testimonials={testimonials} />

      {/* 7. TRANSPARENT & SUPER SIMPLE ORDER FORM */}
      <section id="order-form" className="py-16 sm:py-20 px-4 bg-gradient-to-b from-stone-50 to-emerald-50">
        <div className="max-w-xl mx-auto">
          
          <div className="text-center mb-8">
            <span className="bg-emerald-800 text-white font-bold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider">
              📦 100% सुरक्षित ऑर्डर फॉर्म
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-heading text-stone-900 mt-3 mb-2">
              अपना डिलीवरी पता भरें
            </h2>
            <p className="text-stone-600 text-sm">
              सामान घर पहुँचने पर पैसे दें (कैश ऑन डिलीवरी)। डिलीवरी बॉय आपके घर पार्सल लेकर आएगा।
            </p>
          </div>
          
          <div className="bg-white p-5 sm:p-8 rounded-3xl shadow-xl border border-stone-200">
            
            {/* PRODUCT SUMMARY BANNER */}
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl mb-6 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white p-1 border border-emerald-200 shadow-sm shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/urja-front.png" alt="Product" className="w-full h-full object-contain" />
                </div>
                <div>
                  <p className="text-[11px] text-emerald-800 font-bold uppercase">आयुर्वेदिक किट</p>
                  <p className="font-black text-stone-900 text-sm sm:text-base">निरोग नेचर ऊर्जा मैक्स गोल्ड</p>
                  <p className="text-xs text-stone-500">1 महीने का संपूर्ण कोर्स</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-stone-400 text-xs line-through block">₹15,000</span>
                <span className="text-lg font-black text-emerald-800">₹11,300</span>
                <span className="text-[10px] text-emerald-700 font-bold block">फ्री डिलीवरी</span>
              </div>
            </div>
            
            <form onSubmit={handleOrderSubmit} onFocus={handleFormInteraction} className="space-y-6">
              
              {/* STEP 1: ADDRESS */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-stone-200 pb-2.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-800 text-white font-bold flex items-center justify-center text-xs">1</div>
                  <h3 className="text-base font-bold text-stone-900 font-heading">आपका नाम और डिलीवरी पता</h3>
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    आपका पूरा नाम (Full Name) <span className="text-red-500">*</span>
                  </label>
                  <input 
                    ref={nameInputRef}
                    type="text" 
                    required 
                    placeholder="जैसे: राहुल शर्मा" 
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-emerald-700 focus:bg-white outline-none transition-all" 
                    value={formData.fullName} 
                    onChange={e => setFormData({...formData, fullName: e.target.value})} 
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    मोबाइल नंबर (10 अंकों का फोन नंबर) <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="tel" 
                    required 
                    minLength={10} 
                    maxLength={10} 
                    placeholder="10 अंकों का मोबाइल नंबर (उदा: 98XXXXXXXX)" 
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-emerald-700 focus:bg-white outline-none transition-all" 
                    value={formData.mobile} 
                    onChange={e => setFormData({...formData, mobile: e.target.value.replace(/[^0-9]/g, '')})} 
                  />
                  <p className="text-[11px] text-stone-500 mt-1">डिलीवरी बॉय इसी नंबर पर कॉल करके पार्सल देगा।</p>
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    घर का पूरा पता (House No, Gali, Area / Landmark) <span className="text-red-500">*</span>
                  </label>
                  <textarea 
                    required 
                    placeholder="मकान नंबर, गली नंबर, गाँव या कॉलोनी का नाम, पास की प्रसिद्ध जगह (लैंडमार्क)" 
                    rows={3} 
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-emerald-700 focus:bg-white outline-none transition-all resize-none" 
                    value={formData.address} 
                    onChange={e => setFormData({...formData, address: e.target.value})} 
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      शहर / गाँव (City) <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      required 
                      placeholder="उदा: लखनऊ"
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-emerald-700 focus:bg-white outline-none" 
                      value={formData.city} 
                      onChange={e => setFormData({...formData, city: e.target.value})} 
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      राज्य (State) <span className="text-red-500">*</span>
                    </label>
                    <input 
                      list="indian-states" 
                      required 
                      placeholder="राज्य चुनें"
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-emerald-700 focus:bg-white outline-none" 
                      value={formData.state} 
                      onChange={e => setFormData({...formData, state: e.target.value})} 
                    />
                    <datalist id="indian-states">
                      {INDIAN_STATES.map((st) => (
                        <option key={st} value={st} />
                      ))}
                    </datalist>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      पिन कोड (Pincode) <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      required 
                      minLength={6} 
                      maxLength={6} 
                      placeholder="6 अंक (226001)"
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-emerald-700 focus:bg-white outline-none" 
                      value={formData.pincode} 
                      onChange={e => setFormData({...formData, pincode: e.target.value.replace(/[^0-9]/g, '')})} 
                    />
                  </div>
                </div>
              </div>

              {/* STEP 2: PAYMENT METHOD (Super clear 2 options) */}
              <div className="space-y-3 pt-3 border-t border-stone-200">
                <div className="flex items-center gap-2 border-b border-stone-200 pb-2.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-800 text-white font-bold flex items-center justify-center text-xs">2</div>
                  <h3 className="text-base font-bold text-stone-900 font-heading">पैसे देने का तरीका चुनें</h3>
                </div>
                
                {/* OPTION 1: CASH ON DELIVERY (Default) */}
                <div 
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    paymentOption === 'cod' 
                      ? 'border-emerald-700 bg-emerald-50/70 shadow-sm' 
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`} 
                  onClick={() => setPaymentOption('cod')}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 shrink-0 ${
                      paymentOption === 'cod' ? 'border-emerald-700 bg-emerald-700' : 'border-stone-400'
                    }`}>
                      {paymentOption === 'cod' && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-black text-sm text-stone-900">📦 कैश ऑन डिलीवरी (Cash on Delivery)</span>
                        <span className="bg-amber-400 text-stone-950 text-[10px] font-black px-2 py-0.5 rounded">सबसे आसान</span>
                      </div>
                      <p className="text-xs text-stone-600 mt-1">
                        कोई एडवांस नहीं देना। जब डिलीवरी बॉय घर पर पार्सल लेकर आए, तभी ₹11,300 नकद दें।
                      </p>
                    </div>
                  </div>
                </div>

                {/* OPTION 2: FULL PREPAID */}
                <div 
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    paymentOption === 'full' 
                      ? 'border-emerald-700 bg-emerald-50/70 shadow-sm' 
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`} 
                  onClick={() => setPaymentOption('full')}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 shrink-0 ${
                      paymentOption === 'full' ? 'border-emerald-700 bg-emerald-700' : 'border-stone-400'
                    }`}>
                      {paymentOption === 'full' && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <div>
                      <span className="font-bold text-sm text-stone-900">💳 ऑनलाइन पेमेंट (UPI / GPay / PhonePe / Card)</span>
                      <p className="text-xs text-stone-600 mt-1">
                        तुरंत ऑनलाइन पेमेंट करें। 100% सुरक्षित Razorpay गेटवे।
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* BILL SUMMARY */}
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs space-y-2">
                <div className="flex justify-between text-stone-600">
                  <span>उत्पाद मूल्य (निरोग नेचर ऊर्जा मैक्स गोल्ड):</span>
                  <span>₹11,300</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>होम डिलीवरी:</span>
                  <span>मुफ़्त (Free Delivery)</span>
                </div>
                <div className="border-t border-stone-200 pt-2 flex justify-between font-black text-sm text-stone-900">
                  <span>{paymentOption === 'cod' ? 'घर पर देय राशि:' : 'ऑनलाइन भुगतान राशि:'}</span>
                  <span className="text-emerald-800 text-base">₹11,300</span>
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={orderStatus === 'processing'}
                className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all disabled:opacity-70 flex items-center justify-center gap-2 transform active:scale-95"
              >
                {orderStatus === 'processing' ? (
                  <span>ऑर्डर प्रोसेस हो रहा है...</span>
                ) : paymentOption === 'cod' ? (
                  <span>📦 ऑर्डर कन्फर्म करें (सामान मिलने पर ₹11,300 दें)</span>
                ) : (
                  <span>💳 अभी ₹11,300 ऑनलाइन भरें</span>
                )}
              </button>
              
              <div className="text-center space-y-2 pt-1">
                <div className="flex items-center justify-center gap-3 text-stone-500 text-xs font-semibold">
                  <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5 text-emerald-700" /> 100% गुप्त पैकिंग</span>
                  <span className="flex items-center gap-1"><PackageCheck className="w-3.5 h-3.5 text-emerald-700" /> 24 घंटे में डिस्पैच</span>
                </div>
                <p className="text-[11px] text-stone-500">
                  पार्सल मिलने तक या कोई भी सवाल पूछने के लिए कॉल करें: <a href="tel:+919899756597" className="font-bold text-emerald-800 underline">98997 56597</a>
                </p>
              </div>
              
            </form>
          </div>
        </div>
      </section>

      {/* 8. FREQUENTLY ASKED QUESTIONS */}
      <div id="faq">
        <FAQSection faqs={faqs} />
      </div>

      {/* 9. FLOATING WHATSAPP & CONSULTATION MODAL */}
      <WhatsAppButton />
      <ConsultationModal />

      {/* 10. STICKY MOBILE BOTTOM BAR (High conversion for Meta Ads on mobile) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 px-4 py-2.5 flex items-center justify-between shadow-2xl">
        <div>
          <span className="text-[10px] text-stone-500 line-through block">₹15,000</span>
          <div className="flex items-baseline gap-1">
            <span className="text-base font-black text-emerald-900">₹11,300</span>
            <span className="text-[10px] text-emerald-700 font-bold">COD</span>
          </div>
        </div>
        <button
          onClick={scrollToOrderForm}
          className="px-5 py-2.5 bg-amber-500 text-stone-950 font-black text-xs rounded-xl shadow-md active:scale-95 transition-all flex items-center gap-1.5"
        >
          <span>🛒 अभी ऑर्डर करें</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
      
    </div>
  );
}
