import Link from 'next/link';

const policyLinks = [
  { name: 'डिलीवरी नीति (Shipping)', href: '/policies/shipping' },
  { name: 'वापसी नीति (Returns)', href: '/policies/return' },
  { name: 'रिफंड नीति (Refund)', href: '/policies/refund' },
  { name: 'प्राइवेसी पॉलिसी (Privacy)', href: '/policies/privacy' },
  { name: 'नियम व शर्तें (Terms)', href: '/policies/terms' },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--color-brand-forest)] text-[var(--color-bg-ivory)] border-t border-white/10 pb-20 sm:pb-16 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 md:gap-8">
          <div className="max-w-xs">
            <Link href="/" className="inline-block mb-3">
              <span className="text-3xl font-extrabold font-heading text-[var(--color-bg-ivory)]">
                निरोग नेचर
              </span>
            </Link>
            <p className="text-[var(--color-bg-cream)]/75 text-sm mb-5 font-medium leading-relaxed">
              100% शुद्ध आयुर्वेदिक और प्रमाणित समाधान। सुरक्षित, असरदार और भरोसेमंद।
            </p>
            <div className="text-[var(--color-bg-cream)]/80 text-sm space-y-2">
              <p>
                ईमेल: <a href="mailto:contact@nirognature.com" className="hover:underline text-amber-300">contact@nirognature.com</a>
              </p>
              <p>
                कस्टमर केयर: <a href="tel:+919899756597" className="hover:underline text-amber-300 font-bold">+91 98997 56597</a>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:gap-20">
            <div>
              <h4 className="text-[var(--color-accent-antique)] font-bold font-heading mb-4 text-sm uppercase tracking-wider">
                महत्वपूर्ण पॉलिसी
              </h4>
              <ul className="space-y-2.5">
                {policyLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-[var(--color-bg-cream)]/75 hover:text-white transition-colors text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[var(--color-accent-antique)] font-bold font-heading mb-4 text-sm uppercase tracking-wider">
                त्वरित संपर्क
              </h4>
              <ul className="space-y-2.5 text-sm text-[var(--color-bg-cream)]/75">
                <li>
                  <a
                    href="https://api.whatsapp.com/send/?phone=919899756597&text=Namaste%2C%20mujhe%20Nirog%20Nature%20ke%20bare%20mein%20jankari%20chahiye"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-300 transition-colors flex items-center gap-1.5"
                  >
                    💬 WhatsApp पर बात करें
                  </a>
                </li>
                <li>
                  <a href="tel:+919899756597" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                    📞 कॉल पर बात करें
                  </a>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white transition-colors">
                    ❓ सवाल-जवाब (FAQs)
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[var(--color-bg-cream)]/50 text-xs">
            © {new Date().getFullYear()} Nirog Nature. सर्वाधिकार सुरक्षित।
          </p>
        </div>
      </div>
    </footer>
  );
}
