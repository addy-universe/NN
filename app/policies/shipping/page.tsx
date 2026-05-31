export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-bold font-heading mb-8">Shipping Policy</h1>
        <div className="prose prose-gray max-w-none text-sm leading-relaxed space-y-6">
          <p className="text-gray-600">Last updated: May 24, 2026</p>
          <h2 className="text-xl font-bold mt-8">Shipping Rates</h2>
          <p>We offer FREE shipping on all prepaid orders above ₹499. For orders below ₹499, a flat shipping fee of ₹49 applies. Cash on Delivery orders include a ₹29 COD handling charge.</p>
          <h2 className="text-xl font-bold mt-8">Delivery Timeframes</h2>
          <p>Metro cities: 2-4 business days. Tier 2 cities: 4-6 business days. Remote areas: 6-10 business days.</p>
          <h2 className="text-xl font-bold mt-8">Order Tracking</h2>
          <p>Once your order is shipped, you will receive a tracking number via SMS and email. You can track your order using the tracking link provided.</p>
          <h2 className="text-xl font-bold mt-8">Contact</h2>
          <p>For shipping inquiries, email nirognature@gmail.com or call +91 98997 56597.</p>
        </div>
      </div>
    </div>
  );
}
