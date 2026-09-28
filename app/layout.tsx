import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MetaPixel from "@/components/shared/MetaPixel";
import Script from "next/script";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nirognature.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "निरोग नेचर | पुरुषों के लिए असली आयुर्वेदिक ताकत",
  description: "आयुर्वेद के पुराने ज्ञान और प्राकृतिक जड़ी-बूटियों से बनी, पुरुषों की सेहत के लिए खास दवा। 100% सुरक्षित और असरदार।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive" />
      </head>
      <body className="antialiased selection:bg-green-900 selection:text-white">
        <MetaPixel />
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
