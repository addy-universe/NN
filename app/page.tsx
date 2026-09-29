'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Truck, 
  Award, 
  Lock, 
  Sparkles, 
  PhoneCall, 
  Leaf, 
  Clock, 
  ArrowRight, 
  Check, 
  PackageCheck, 
  Star,
  Play
} from 'lucide-react';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import { event } from '@/lib/fpixel';

// FIXED PRICE SET TO EXACTLY ₹1,800
const PRODUCT_PRICE = 1800;
const PRODUCT_MRP = 3000;
const PRODUCT_SAVINGS = 1200;
const PRODUCT_NAME = 'निरोग नेचर नाग छत्री (Nirog Nature Naag Chattri)';

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

// FRONT IMAGE FIRST
const PRODUCT_IMAGES = [
  {
    id: 'front',
    label: 'सामने (Front)',
    sub: 'Bottle View',
    src: '/images/naag-chattri-front.png',
  },
  {
    id: 'hero',
    label: 'सम्पूर्ण पैक',
    sub: 'Full View',
    src: '/images/naag-chattri-hero.png',
  },
  {
    id: 'back',
    label: 'पीछे (Back)',
    sub: 'Label & Formula',
    src: '/images/naag-chattri-back.png',
  },
];

const INGREDIENTS = [
  { name: 'कौंच बीज (Kaunch Beej)', dose: '200 mg', desc: 'प्राकृतिक पौरुष ऊर्जा, ताकत और नर्वस सिस्टम को मजबूत करता है।' },
  { name: 'शुद्ध शिलाजीत (Shuddh Shilajit)', dose: '100 mg', desc: 'शारीरिक कमजोरी मिटाकर अंदरूनी शक्ति, स्टैमिना और जोश बढ़ाता है।' },
  { name: 'अश्वगंधा (Ashwagandha)', dose: '100 mg', desc: 'तनाव, चिंता और थकावट को खत्म कर मांसपेशियों को भरपूर बल देता है।' },
  { name: 'सफ़ेद मूसली (Safed Musli)', dose: '100 mg', desc: 'धातु पुष्टि, गाढ़ापन और स्थायी सहनशक्ति प्रदान करता है।' },
  { name: 'गोखरू (Gokshura)', dose: '80 mg', desc: 'प्राकृतिक टेस्टोस्टेरोन और पौरुष बल बढ़ाने में अत्यंत सहायक।' },
  { name: 'शतावरी (Shatavari)', dose: '80 mg', desc: 'शरीर को ठंडक, आंतरिक पोषण और अंगों को सुदृढ़ता देता है।' },
  { name: 'विदारीकंद (Vidarikand)', dose: '80 mg', desc: 'मांसपेशियों का विकास, स्फूर्ति और नई ऊर्जा का संचार करता है।' },
  { name: 'काली मूसली (Kali Musli)', dose: '60 mg', desc: 'प्राचीन काल से बल और वीर्य वृद्धि के लिए विख्यात औषधि।' },
  { name: 'जायफल (Jaiphal)', dose: '40 mg', desc: 'रक्त संचार को तीव्र कर नसों में नया जीवन और जोश भरता है।' },
];

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
  // Payment options in order: 'advance' (₹100 advance), 'full', 'cod'
  const [paymentOption, setPaymentOption] = useState<'advance' | 'full' | 'cod'>('advance');
  const advanceAmount = 100;
  const [selectedImage, setSelectedImage] = useState<string>('/images/naag-chattri-front.png');
  
  const [formData, setFormData] = useState({
    fullName: '', mobile: '', address: '', city: '', state: '', pincode: ''
  });

  const [orderStatus, setOrderStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [generatedOrderId, setGeneratedOrderId] = useState<string>('');


  const orderSubmittedRef = useRef(false);
  const lastCapturedDataRef = useRef('');
  const hasInitiatedCheckoutRef = useRef(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // 1. Meta Pixel: Fire ViewContent on mount + Page Visit notification
  useEffect(() => {
    event('ViewContent', {
      content_name: PRODUCT_NAME,
      content_category: 'Ayurvedic Vitality',
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
        content_name: PRODUCT_NAME,
        value: PRODUCT_PRICE,
        currency: 'INR'
      });
    }
  };

  // 3. Helper to send Abandoned Lead / Partial Address data
  const sendAbandonedLead = (dataToSend = formData) => {
    if (orderSubmittedRef.current) return;
    if (!dataToSend.fullName && !dataToSend.mobile && !dataToSend.address) return;

    const serialized = JSON.stringify({ ...dataToSend, paymentOption, advanceAmount });
    if (lastCapturedDataRef.current === serialized) return;
    lastCapturedDataRef.current = serialized;

    fetch('/api/abandoned-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productName: PRODUCT_NAME,
        paymentOption: paymentOption === 'advance' ? `Advance (₹${advanceAmount})` : paymentOption,
        amount: PRODUCT_PRICE,
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
  }, [formData, paymentOption, advanceAmount]);

  // 5. Capture lead on page exit / navigate back
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (orderSubmittedRef.current) return;
      if (formData.fullName || formData.mobile || formData.address) {
        const payload = JSON.stringify({
          productName: PRODUCT_NAME,
          paymentOption: paymentOption === 'advance' ? `Advance (₹${advanceAmount})` : paymentOption,
          amount: PRODUCT_PRICE,
          ...formData
        });
        navigator.sendBeacon('/api/abandoned-lead', payload);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [formData, paymentOption, advanceAmount]);

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
            productName: PRODUCT_NAME,
            product: PRODUCT_NAME,
            ...formData,
            paymentOption,
            amount: PRODUCT_PRICE,
            advanceAmount: paymentOption === 'advance' ? 100 : (paymentOption === 'full' ? PRODUCT_PRICE : 0),
            remainingAmount: paymentOption === 'advance' ? (PRODUCT_PRICE - 100) : (paymentOption === 'full' ? 0 : PRODUCT_PRICE),
            paymentDetails,
            date: new Date().toISOString()
          })
        });

        // Fire Meta Pixel Purchase event on order completion
        event('Purchase', {
          content_name: PRODUCT_NAME,
          content_type: 'product',
          value: paymentOption === 'advance' ? 100 : PRODUCT_PRICE,
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

    if (paymentOption === 'advance' || paymentOption === 'full') {
      const amountToPay = paymentOption === 'advance' ? 100 : PRODUCT_PRICE;
      setOrderStatus('processing');
      try {
        const res = await fetch('/api/razorpay', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: amountToPay })
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
          name: 'निरोग नेचर - नाग छत्री',
          description: paymentOption === 'advance'
            ? `एडवांस पेमेंट (₹100) - बाकी ₹${PRODUCT_PRICE - 100} डिलीवरी पर नकद`
            : `पूरा पेमेंट - निरोग नेचर नाग छत्री (₹${PRODUCT_PRICE})`,
          handler: function (response: RazorpaySuccessResponse) {
            submitOrderToBackend({
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
              advancePaid: paymentOption === 'advance' ? 100 : PRODUCT_PRICE,
              remainingCod: paymentOption === 'advance' ? PRODUCT_PRICE - 100 : 0
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
            निरोग नेचर पर भरोसा करने के लिए धन्यवाद। हमारा प्रतिनिधि आपसे संपर्क करके पार्सल डिस्पैच की पुष्टि करेगा।
          </p>
          
          <div className="bg-stone-50 p-5 rounded-2xl text-left mb-6 space-y-3 text-sm border border-stone-200">
            <div className="flex justify-between border-b border-stone-200/80 pb-2">
              <span className="text-stone-500 font-medium">उत्पाद:</span>
              <span className="font-bold text-stone-900">निरोग नेचर नाग छत्री</span>
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
                {paymentOption === 'advance' 
                  ? 'Pay Advance (₹100 प्राप्त)' 
                  : paymentOption === 'full' 
                  ? 'Full Payment (पूरा ऑनलाइन भुगतान)' 
                  : 'Cash on Delivery (COD)'}
              </span>
            </div>
            
            {paymentOption === 'advance' ? (
              <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl text-amber-950 font-bold text-xs mt-3 space-y-2">
                <div className="flex items-center gap-2 text-emerald-800">
                  <Check className="w-5 h-5 shrink-0 text-emerald-700" />
                  <span>आपका ₹100 अग्रिम भुगतान सुरक्षित रूप से प्राप्त हो चुका है।</span>
                </div>
                <div className="flex items-start gap-2 text-amber-900 pt-1.5 border-t border-amber-200/70">
                  <Truck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <span>बाकी बची राशि <strong>₹{(PRODUCT_PRICE - 100).toLocaleString('en-IN')}</strong> डिलीवरी के समय पार्सल मिलने पर डिलीवरी बॉय को नकद दें।</span>
                </div>
              </div>
            ) : paymentOption === 'full' ? (
              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-emerald-950 font-bold text-xs mt-3 flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>आपका पूरा भुगतान सुरक्षित रूप से प्राप्त हो चुका है। डिलीवरी के समय कोई शुल्क नहीं देना।</span>
              </div>
            ) : (
              <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-amber-950 font-bold text-xs mt-3 flex items-center gap-2">
                <Truck className="w-5 h-5 text-amber-700 shrink-0" />
                <span>डिलीवरी के समय पार्सल मिलने पर डिलीवरी बॉय को <strong>₹{PRODUCT_PRICE.toLocaleString('en-IN')}</strong> नकद दें।</span>
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
              href={`https://api.whatsapp.com/send/?phone=919899756597&text=Namaste%2C%20maine%20Naag%20Chattri%20ka%20order%20place%20kiya%20hai%2C%20Order%20ID%3A%20${generatedOrderId}%2C%20kripya%20status%20bataiye`}
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
    <div className="w-full bg-stone-50 font-sans text-stone-900 pb-20 sm:pb-0">
      
      {/* 0. AUTHENTIC TOP BANNER */}
      <div className="bg-emerald-950 text-emerald-100 text-xs font-semibold py-2 px-3 sm:px-4 text-center border-b border-emerald-900/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
          <div className="flex items-center gap-1.5 mx-auto sm:mx-0 text-[11px] sm:text-xs">
            <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>FSSAI स्वीकृत मानक • 100% शाकाहारी आयुर्वेदिक फॉर्मूला</span>
          </div>
          <div className="hidden sm:flex items-center gap-5 text-[11px] text-emerald-300">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> GMP Certified Lab</span>
            <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-emerald-400" /> 100% गुप्त पैकिंग</span>
            <span className="flex items-center gap-1.5"><Truck className="w-3.5 h-3.5 text-emerald-400" /> फ्री होम डिलीवरी</span>
          </div>
        </div>
      </div>

      {/* 1. HERO SECTION - MOBILE FIRST & FIXED PRICE ₹1,800 */}
      <section className="relative overflow-hidden bg-gradient-to-b from-stone-950 via-emerald-950 to-emerald-900 text-white pt-6 sm:pt-12 pb-12 sm:pb-20 px-3 sm:px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* MOBILE ONLY TOP HEADLINE */}
          <div className="lg:hidden text-center mb-4">
            <div className="inline-flex items-center gap-1.5 bg-emerald-900/90 border border-emerald-600/60 text-emerald-200 text-[11px] font-bold px-3 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              100% शुद्ध आयुर्वेदिक • 0% साइड इफ़ेक्ट
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-black font-heading leading-tight text-stone-100">
              निरोग नेचर <span className="text-amber-400">नाग छत्री</span>
            </h1>
            <p className="text-xs text-stone-300 mt-1 font-medium">
              प्राकृतिक ताकत, पौरुष ऊर्जा एवं अंदरूनी स्टैमिना (Veg Capsules)
            </p>

            <div className="flex items-center justify-center gap-1.5 mt-2 text-xs">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span className="font-bold text-amber-300">4.9 / 5</span>
              <span className="text-stone-400">(32,400+ संतुष्ट पुरुष)</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-center">
            
            {/* PRODUCT CARD SHOWCASE (Mobile first: order-1 / desktop right: order-2) */}
            <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
              <div className="bg-white rounded-3xl p-3.5 sm:p-5 shadow-2xl border border-emerald-900/30 text-stone-900 w-full max-w-sm">
                
                {/* Top Card Badges */}
                <div className="flex items-center justify-between gap-2 mb-2 px-0.5">
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    FSSAI: 1332399900000
                  </span>
                  <span className="bg-amber-500 text-stone-950 font-black text-xs px-3 py-1 rounded-full shadow-sm">
                    बचत ₹{PRODUCT_SAVINGS}
                  </span>
                </div>

                {/* Main Product Showcase - Pure White background */}
                <div className="aspect-square w-full rounded-2xl bg-white p-2 sm:p-3 flex items-center justify-center overflow-hidden border border-stone-200 relative shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={selectedImage} 
                    alt="निरोग नेचर नाग छत्री (Nirog Nature Naag Chattri)" 
                    className="w-full h-full object-contain transition-all duration-300" 
                  />
                  <div className="absolute bottom-2 left-2 bg-stone-900/85 backdrop-blur-sm text-[10px] text-amber-300 font-bold px-2.5 py-1 rounded-md border border-amber-500/30">
                    {selectedImage === '/images/naag-chattri-front.png' 
                      ? 'सामने (Front View)' 
                      : selectedImage === '/images/naag-chattri-hero.png' 
                        ? 'सम्पूर्ण पैक (Full View)' 
                        : 'पीछे (Back & Label)'}
                  </div>
                </div>

                {/* View Switcher: FRONT FIRST */}
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {PRODUCT_IMAGES.map((img) => {
                    const isSelected = selectedImage === img.src;
                    return (
                      <button
                        key={img.id}
                        type="button"
                        onClick={() => setSelectedImage(img.src)}
                        className={`flex flex-col items-center p-1.5 sm:p-2 rounded-xl border-2 transition-all ${
                          isSelected
                            ? 'border-emerald-700 bg-emerald-50 text-emerald-950 shadow-sm ring-1 ring-emerald-600'
                            : 'border-stone-200 bg-stone-50 text-stone-600 hover:border-emerald-300'
                        }`}
                      >
                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg overflow-hidden bg-white p-0.5 mb-1 shrink-0 border border-stone-200">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={img.src} alt={img.label} className="w-full h-full object-contain" />
                        </div>
                        <span className="text-[11px] font-bold truncate leading-tight">{img.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* FIXED PRICE DISPLAY (₹1,800) */}
                <div className="text-center mt-3 pt-3 border-t border-stone-100">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-stone-400 text-sm line-through">MRP: ₹{PRODUCT_MRP}</span>
                    <span className="text-3xl sm:text-4xl font-black text-emerald-900">₹{PRODUCT_PRICE}</span>
                    <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold">फ्री डिलीवरी</span>
                  </div>
                  <div className="mt-1 flex items-center justify-center gap-2 text-xs font-bold text-amber-700">
                    <span>⚡ स्पेशल ऑफर बचत: ₹{PRODUCT_SAVINGS}</span>
                    <span>•</span>
                    <span className="text-emerald-800">कैश ऑन डिलीवरी उपलब्ध</span>
                  </div>
                </div>

                {/* Instant Order Button */}
                <button 
                  onClick={scrollToOrderForm}
                  className="w-full mt-3.5 py-4 bg-amber-500 hover:bg-amber-400 text-stone-950 text-base font-black rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 transform active:scale-95"
                >
                  👉 अभी ऑर्डर करें (एडवांस या COD उपलब्ध)
                </button>
                <p className="text-[11px] text-stone-500 text-center mt-1.5 font-medium">
                  🔒 ₹100 एडवांस या कैश ऑन डिलीवरी (COD) • 100% सुरक्षित
                </p>
              </div>
            </div>

            {/* HERO TEXT & DETAILS (Desktop Left / Mobile Below Card) */}
            <div className="lg:col-span-7 text-center lg:text-left order-2 lg:order-1">
              
              {/* Desktop Headline */}
              <div className="hidden lg:block">
                <div className="inline-flex items-center gap-2 bg-emerald-900/80 border border-emerald-700/60 text-emerald-200 text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow-sm backdrop-blur-md">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  प्रमाणिक एवं शुद्ध आयुर्वेदिक उपचार
                </div>

                <h1 className="text-3xl lg:text-5xl font-black font-heading leading-tight mb-4 text-stone-100">
                  प्राकृतिक शक्ति एवं ऊर्जा <br />
                  <span className="text-amber-400 font-bold">निरोग नेचर नाग छत्री</span>
                </h1>

                <p className="text-stone-300 text-base lg:text-lg leading-relaxed mb-6 max-w-xl font-medium">
                  कौंच बीज (200mg), शुद्ध शिलाजीत (100mg), अश्वगंधा (100mg) और सफ़ेद मूसली (100mg) समेत 9 शक्तिशाली औषधियों का संगम। कमजोरी, थकान और स्ट्रेस मिटाकर अंदरूनी ताकत व नया जोश पाएँ।
                </p>
              </div>

              {/* 3 Highlights */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 my-4 sm:mb-6 bg-stone-900/70 border border-emerald-800/40 p-3.5 rounded-2xl backdrop-blur-sm max-w-lg mx-auto lg:mx-0">
                <div className="text-center">
                  <p className="text-amber-400 font-black text-lg sm:text-xl font-heading">100%</p>
                  <p className="text-[10px] sm:text-xs text-stone-300 font-medium">शुद्ध आयुर्वेदिक</p>
                </div>
                <div className="text-center border-x border-emerald-800/40">
                  <p className="text-amber-400 font-black text-lg sm:text-xl font-heading">30,000+</p>
                  <p className="text-[10px] sm:text-xs text-stone-300 font-medium">संतुष्ट ग्राहक</p>
                </div>
                <div className="text-center">
                  <p className="text-amber-400 font-black text-lg sm:text-xl font-heading">0%</p>
                  <p className="text-[10px] sm:text-xs text-stone-300 font-medium">साइड इफ़ेक्ट</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <button 
                  onClick={scrollToOrderForm}
                  className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-base sm:text-lg rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 transform active:scale-95"
                >
                  📦 अभी ऑर्डर फॉर्म भरें (₹{PRODUCT_PRICE}) <ArrowRight className="w-5 h-5" />
                </button>
                <a 
                  href="#product-video"
                  className="px-6 py-4 bg-emerald-900/90 hover:bg-emerald-800 text-emerald-100 font-bold text-sm rounded-2xl border border-emerald-700/60 transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
                  असली वीडियो देखें
                </a>
              </div>

              <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] sm:text-xs text-emerald-200 max-w-lg mx-auto lg:mx-0">
                <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" /> 100% गुप्त पैकिंग</span>
                <span className="flex items-center gap-1.5"><Truck className="w-3.5 h-3.5 text-amber-400 shrink-0" /> फ्री होम डिलीवरी</span>
                <span className="flex items-center gap-1.5"><PackageCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" /> 24 घंटे में डिस्पैच</span>
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" /> FSSAI प्रमाणित</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. REAL VIDEO SHOWCASE SECTION */}
      <section id="product-video" className="py-12 sm:py-16 px-3 sm:px-4 bg-stone-900 text-white border-b border-stone-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 bg-emerald-900/80 border border-emerald-600/50 text-emerald-200 text-xs font-bold px-3.5 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            100% असली व प्रमाणिक उत्पाद
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading text-stone-100 mb-2">
            🎬 असली वीडियो देखें • निरोग नेचर नाग छत्री
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm max-w-xl mx-auto mb-6 font-medium">
            देखें कि असली नाग छत्री कैसी दिखती है, पैकेजिंग कैसी है और सीलबंद डिब्बी में क्या मिलता है।
          </p>

          <div className="relative mx-auto max-w-2xl rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-emerald-700/60 bg-black aspect-video flex items-center justify-center">
            <video
              controls
              playsInline
              preload="metadata"
              poster="/images/naag-chattri-front.png"
              className="w-full h-full object-contain bg-black"
            >
              <source src="/images/main video.mov" type="video/mp4" />
              <source src="/images/main video.mov" type="video/quicktime" />
              आपका ब्राउज़र वीडियो सपोर्ट नहीं करता।
            </video>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={scrollToOrderForm}
              className="w-full sm:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-base rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 transform active:scale-95"
            >
              📦 मुझे यह मंगवाना है (Order COD ₹{PRODUCT_PRICE}) <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="https://api.whatsapp.com/send/?phone=919899756597&text=Namaste%2C%20mujhe%20Nirog%20Nature%20Naag%20Chattri%20ke%20bare%20me%20jankari%20chahiye"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-4 bg-green-700 hover:bg-green-600 text-white font-bold text-sm rounded-2xl transition-all flex items-center justify-center gap-2"
            >
              💬 WhatsApp पर जानकारी लें
            </a>
          </div>
        </div>
      </section>

      {/* 3. AUTHENTIC HERBAL INGREDIENTS */}
      <section id="ingredients" className="py-12 sm:py-16 px-3 sm:px-4 bg-white border-b border-stone-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-emerald-800 font-bold text-xs uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              🌿 100% प्राकृतिक घटक (Label Formula)
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-heading text-stone-900 mt-2 mb-1.5">
              किन 9 शक्तिशाली जड़ी-बूटियों से बना है?
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm">
              बोतल के पीछे छपी प्रामाणिक सामग्री — हर कैप्सूल में शुद्ध जड़ी-बूटियों का सटीक अनुपात:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {INGREDIENTS.map((item, i) => (
              <div key={i} className="bg-stone-50 p-4 rounded-2xl border border-stone-200 hover:border-emerald-400 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Leaf className="w-4 h-4 text-emerald-800" />
                  </div>
                  <span className="text-xs font-black text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                    {item.dose}
                  </span>
                </div>
                <h3 className="font-bold text-stone-900 text-sm mb-1 font-heading">{item.name}</h3>
                <p className="text-stone-600 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-amber-50 border border-amber-200 p-3.5 rounded-2xl text-center text-xs text-amber-950 font-medium max-w-2xl mx-auto">
            ⚡ <strong>नोट:</strong> इसमें कोई हानिकारक रसायन, स्टेरॉयड या प्रिजर्वेटिव नहीं है। यह 100% शाकाहारी (Veg Capsules) और सुरक्षित है।
          </div>
        </div>
      </section>

      {/* 4. HOW TO USE / कैसे इस्तेमाल करें */}
      <section id="how-to-use" className="py-12 sm:py-16 px-3 sm:px-4 bg-emerald-50/50 border-b border-stone-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-emerald-800 font-bold text-xs uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
              आसान इस्तेमाल का तरीका
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-heading text-stone-900 mt-2 mb-1.5">
              कैप्सूल कैसे और कब खानी है?
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm">
              बोतल पर दिए निर्देश के अनुसार — कोई कठिन नियम नहीं, बस नियम से लें।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-emerald-100 shadow-sm text-center">
              <div className="w-11 h-11 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center mx-auto mb-3 font-black text-base">
                1
              </div>
              <h3 className="font-bold text-stone-900 text-sm sm:text-base mb-1.5">दिन में 2 बार (1-1 कैप्सूल)</h3>
              <p className="text-stone-600 text-xs leading-relaxed">
                सुबह नाश्ते के बाद 1 कैप्सूल और रात को सोने से पहले 1 कैप्सूल लें।
              </p>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-emerald-100 shadow-sm text-center">
              <div className="w-11 h-11 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center mx-auto mb-3 font-black text-base">
                2
              </div>
              <h3 className="font-bold text-stone-900 text-sm sm:text-base mb-1.5">दूध या गुनगुने पानी के साथ</h3>
              <p className="text-stone-600 text-xs leading-relaxed">
                ताजे पानी या हल्के गुनगुने दूध के साथ लें। दूध के साथ लेने पर और बेहतर पोषण मिलता है।
              </p>
            </div>

            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-emerald-100 shadow-sm text-center">
              <div className="w-11 h-11 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center mx-auto mb-3 font-black text-base">
                3
              </div>
              <h3 className="font-bold text-stone-900 text-sm sm:text-base mb-1.5">नियमित पूरा कोर्स करें</h3>
              <p className="text-stone-600 text-xs leading-relaxed">
                उत्तम और स्थायी लाभ के लिए दवा नियमित रूप से इस्तेमाल करें।
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* 6. SUPER SIMPLE ORDER FORM - FIXED ₹1,800 */}
      <section id="order-form" className="py-14 sm:py-20 px-3 sm:px-4 bg-gradient-to-b from-stone-50 to-emerald-50">
        <div className="max-w-xl mx-auto">
          
          <div className="text-center mb-6 sm:mb-8">
            <span className="bg-emerald-800 text-white font-bold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider">
              📦 100% सुरक्षित ऑर्डर फॉर्म
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-heading text-stone-900 mt-2.5 mb-1.5">
              अपना डिलीवरी पता भरें
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm">
              सामान घर पहुँचने पर पैसे दें (कैश ऑन डिलीवरी)। डिलीवरी बॉय आपके घर पार्सल लेकर आएगा।
            </p>
          </div>
          
          <div className="bg-white p-4 sm:p-8 rounded-3xl shadow-xl border border-stone-200">
            
            {/* PRODUCT SUMMARY BANNER */}
            <div className="bg-emerald-50 border border-emerald-200 p-3.5 sm:p-4 rounded-2xl mb-6 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white p-1 border border-emerald-200 shadow-sm shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/naag-chattri-front.png" alt="Product" className="w-full h-full object-contain" />
                </div>
                <div>
                  <p className="text-[10px] text-emerald-800 font-bold uppercase">आयुर्वेदिक फॉर्मूला</p>
                  <p className="font-black text-stone-900 text-xs sm:text-sm">निरोग नेचर नाग छत्री</p>
                  <p className="text-[11px] text-stone-600">संपूर्ण आयुर्वेदिक कोर्स (Veg Capsules)</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-stone-400 text-[11px] line-through block">MRP: ₹{PRODUCT_MRP}</span>
                <span className="text-base sm:text-lg font-black text-emerald-800">₹{PRODUCT_PRICE}</span>
                <span className="text-[10px] text-emerald-700 font-bold block">फ्री डिलीवरी</span>
              </div>
            </div>
            
            <form onSubmit={handleOrderSubmit} onFocus={handleFormInteraction} className="space-y-5">
              
              {/* STEP 1: ADDRESS */}
              <div className="space-y-3.5">
                <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-800 text-white font-bold flex items-center justify-center text-xs">1</div>
                  <h3 className="text-sm sm:text-base font-bold text-stone-900 font-heading">आपका नाम और डिलीवरी पता</h3>
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
                    className="w-full px-3.5 py-3 bg-stone-50 border border-stone-300 rounded-xl text-base font-semibold focus:ring-2 focus:ring-emerald-700 focus:bg-white outline-none transition-all" 
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
                    className="w-full px-3.5 py-3 bg-stone-50 border border-stone-300 rounded-xl text-base font-semibold focus:ring-2 focus:ring-emerald-700 focus:bg-white outline-none transition-all" 
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
                    className="w-full px-3.5 py-3 bg-stone-50 border border-stone-300 rounded-xl text-base font-semibold focus:ring-2 focus:ring-emerald-700 focus:bg-white outline-none transition-all resize-none" 
                    value={formData.address} 
                    onChange={e => setFormData({...formData, address: e.target.value})} 
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      शहर / गाँव (City) <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      required 
                      placeholder="उदा: लखनऊ"
                      className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-emerald-700 focus:bg-white outline-none" 
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
                      className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-emerald-700 focus:bg-white outline-none" 
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
                      className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-emerald-700 focus:bg-white outline-none" 
                      value={formData.pincode} 
                      onChange={e => setFormData({...formData, pincode: e.target.value.replace(/[^0-9]/g, '')})} 
                    />
                  </div>
                </div>
              </div>

              {/* STEP 2: PAYMENT METHOD */}
              <div className="space-y-3 pt-2 border-t border-stone-200">
                <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-emerald-800 text-white font-bold flex items-center justify-center text-xs">2</div>
                    <h3 className="text-sm sm:text-base font-bold text-stone-900 font-heading">भुगतान का माध्यम चुनें (Payment Options)</h3>
                  </div>
                  <span className="text-[11px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    100% सुरक्षित
                  </span>
                </div>
                
                {/* 1. PAY ADVANCE (First Option: Fixed ₹100 Advance) */}
                <div 
                  className={`p-3.5 sm:p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    paymentOption === 'advance' 
                      ? 'border-emerald-700 bg-emerald-50/70 shadow-sm' 
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`} 
                  onClick={() => setPaymentOption('advance')}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 shrink-0 ${
                      paymentOption === 'advance' ? 'border-emerald-700 bg-emerald-700' : 'border-stone-400'
                    }`}>
                      {paymentOption === 'advance' && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-black text-sm text-stone-900">
                          ⚡ Pay Advance (मात्र ₹100 एडवांस)
                        </span>
                        <span className="bg-emerald-700 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                          सबसे लोकप्रिय
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                        मात्र <strong>₹100</strong> एडवांस देकर ऑर्डर पक्का करें। बाकी राशि <strong>₹{PRODUCT_PRICE - 100}</strong> पार्सल मिलने पर घर पर नकद (COD) दें।
                      </p>

                      {/* Clear Breakdown Box */}
                      {paymentOption === 'advance' && (
                        <div className="mt-2.5 bg-white/90 p-2.5 rounded-xl border border-emerald-200 text-xs space-y-1">
                          <div className="flex justify-between text-stone-700 font-medium">
                            <span>💳 अभी ऑनलाइन भरें:</span>
                            <span className="font-bold text-emerald-800">₹100</span>
                          </div>
                          <div className="flex justify-between text-stone-700 font-medium">
                            <span>📦 डिलीवरी के समय घर पर नकद दें:</span>
                            <span className="font-bold text-stone-900">₹{PRODUCT_PRICE - 100}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 2. FULL PAYMENT (Second Option: pay full upfront) */}
                <div 
                  className={`p-3.5 sm:p-4 rounded-2xl border-2 cursor-pointer transition-all ${
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
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-black text-sm text-stone-900">
                          💳 Full Payment (पूरा ऑनलाइन भुगतान)
                        </span>
                        <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded-full border border-amber-300">
                          फास्ट डिलीवरी
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                        पूरा <strong>₹{PRODUCT_PRICE}</strong> अभी ऑनलाइन भुगतान करें। डिलीवरी के समय कोई रुपया नहीं देना होगा।
                      </p>
                      <p className="text-[11px] text-emerald-800 font-semibold mt-1">
                        ✓ UPI, Google Pay, PhonePe, Paytm, कार्ड या नेट बैंकिंग से सुरक्षित भुगतान।
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3. CASH ON DELIVERY (Third Option: pay upon receipt) */}
                <div 
                  className={`p-3.5 sm:p-4 rounded-2xl border-2 cursor-pointer transition-all ${
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
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-black text-sm text-stone-900">
                          📦 Cash on Delivery (COD - कैश ऑन डिलीवरी)
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                        कोई एडवांस नहीं। जब डिलीवरी बॉय घर पर पार्सल लेकर आए, तभी पूरे <strong>₹{PRODUCT_PRICE}</strong> नकद दें।
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* BILL SUMMARY */}
              <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 text-xs space-y-1.5">
                <div className="flex justify-between text-stone-600">
                  <span>उत्पाद मूल्य:</span>
                  <span>₹{PRODUCT_PRICE}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>होम डिलीवरी:</span>
                  <span>मुफ़्त (Free Delivery)</span>
                </div>
                {paymentOption === 'advance' ? (
                  <div className="border-t border-stone-200 pt-2 space-y-1">
                    <div className="flex justify-between font-bold text-emerald-800">
                      <span>अभी ऑनलाइन देय (Advance):</span>
                      <span className="text-sm">₹100</span>
                    </div>
                    <div className="flex justify-between font-bold text-stone-900">
                      <span>घर पर देय राशि (Cash on Delivery):</span>
                      <span className="text-sm">₹{PRODUCT_PRICE - 100}</span>
                    </div>
                  </div>
                ) : paymentOption === 'full' ? (
                  <div className="border-t border-stone-200 pt-1.5 flex justify-between font-black text-sm text-stone-900">
                    <span>ऑनलाइन भुगतान राशि (Full):</span>
                    <span className="text-emerald-800 text-base">₹{PRODUCT_PRICE}</span>
                  </div>
                ) : (
                  <div className="border-t border-stone-200 pt-1.5 flex justify-between font-black text-sm text-stone-900">
                    <span>घर पर देय राशि (COD):</span>
                    <span className="text-emerald-800 text-base">₹{PRODUCT_PRICE}</span>
                  </div>
                )}
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={orderStatus === 'processing'}
                className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all disabled:opacity-70 flex items-center justify-center gap-2 transform active:scale-95"
              >
                {orderStatus === 'processing' ? (
                  <span>ऑर्डर प्रोसेस हो रहा है...</span>
                ) : paymentOption === 'advance' ? (
                  <span>💳 अभी ₹100 एडवांस देकर ऑर्डर करें (बाकी ₹{PRODUCT_PRICE - 100} डिलीवरी पर)</span>
                ) : paymentOption === 'full' ? (
                  <span>💳 अभी ₹{PRODUCT_PRICE} पूरा ऑनलाइन भरें</span>
                ) : (
                  <span>📦 ऑर्डर कन्फर्म करें (सामान मिलने पर ₹{PRODUCT_PRICE} दें)</span>
                )}
              </button>
              
              <div className="text-center space-y-1.5 pt-1">
                <div className="flex items-center justify-center gap-3 text-stone-500 text-xs font-semibold">
                  <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5 text-emerald-700" /> 100% गुप्त पैकिंग</span>
                  <span className="flex items-center gap-1"><PackageCheck className="w-3.5 h-3.5 text-emerald-700" /> 24 घंटे में डिस्पैच</span>
                </div>
                <p className="text-[11px] text-stone-500">
                  पार्सल मिलने तक या कोई भी सवाल पूछने के लिए संपर्क करें: <a href="tel:+919899756597" className="font-bold text-emerald-800 underline">98997 56597</a>
                </p>
              </div>
              
            </form>
          </div>
        </div>
      </section>


      {/* 8. FLOATING WHATSAPP BUTTON */}
      <WhatsAppButton />

      {/* 9. STICKY MOBILE BOTTOM BAR */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 px-3.5 py-2.5 flex items-center justify-between shadow-2xl">
        <div>
          <span className="text-[10px] text-stone-500 line-through block">MRP: ₹{PRODUCT_MRP}</span>
          <div className="flex items-baseline gap-1">
            <span className="text-base font-black text-emerald-900">₹{PRODUCT_PRICE}</span>
            <span className="text-[10px] text-emerald-700 font-bold">
              {paymentOption === 'advance' ? '₹100 एडवांस' : paymentOption === 'full' ? 'फुल पेमेंट' : 'COD'} • फ्री डिलीवरी
            </span>
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
