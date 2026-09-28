import Link from 'next/link';

export default function ReturnPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-bold font-heading mb-8">वापसी और रिफंड नीति (Return & Refund Policy)</h1>
        <div className="prose prose-stone max-w-none text-sm leading-relaxed space-y-6 text-stone-700">
          <p className="text-stone-500">अंतिम अपडेट: 2026</p>
          <p>निरोग नेचर (Nirog Nature) में आपका भरोसा हमारी पहली प्राथमिकता है। हम अपने ग्राहकों को 100% संतोषजनक सेवा देने के लिए प्रतिबद्ध हैं।</p>
          
          <h2 className="text-xl font-bold text-stone-900 mt-8">1. रिटर्न की शर्तें (Returns)</h2>
          <p>यदि आपको प्राप्त उत्पाद क्षतिग्रस्त (Damaged) या गलत मिलता है, तो आप डिलीवरी के 7 दिनों के भीतर रिटर्न या रिप्लेसमेंट का अनुरोध कर सकते हैं।</p>

          <h2 className="text-xl font-bold text-stone-900 mt-8">2. रिफंड प्रक्रिया (Refund Process)</h2>
          <p>रिटर्न स्वीकार होने के बाद, आपका रिफंड 5 से 7 कार्य दिवसों में आपके बैंक खाते या मूल भुगतान विधि (UPI/Card) में ट्रांसफर कर दिया जाएगा।</p>

          <h2 className="text-xl font-bold text-stone-900 mt-8">3. संपर्क सूत्र (Support)</h2>
          <p>
            किसी भी सहायता या रिटर्न के लिए, कृपया हमारे कस्टमर केयर नंबर पर संपर्क करें:<br />
            <strong>फ़ोन / WhatsApp:</strong> <a href="tel:+919899756597" className="text-emerald-700 font-bold">+91 98997 56597</a><br />
            <strong>ईमेल:</strong> <a href="mailto:contact@nirognature.com" className="text-emerald-700 font-bold">contact@nirognature.com</a>
          </p>

          <div className="pt-6">
            <Link href="/" className="inline-flex items-center text-emerald-800 font-bold hover:underline">
              ← होमपेज पर वापस जाएँ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
