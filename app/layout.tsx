import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import ConsultationModal from "@/components/shared/ConsultationModal";
import WhatsAppButton from "@/components/shared/WhatsAppButton";

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

export const metadata: Metadata = {
  title: "NirogNature — Premium Ayurvedic Wellness | Sahi Sehat, Sahi Ayurved",
  description:
    "India ka most trusted premium Ayurvedic wellness brand. Stamina, immunity, skin aur hair health ke liye science-backed natural supplements. 100% pure, GMP certified aur lab tested products. Aaj hi apni health journey behtar banayein. ₹499 se upar ke orders par free shipping.",
  keywords: "ayurvedic supplements, wellness, health supplements, ashwagandha, shilajit, natural supplements, men's health, immunity booster, ayurvedic dawa, NirogNature",
  openGraph: {
    title: "NirogNature — Premium Ayurvedic Wellness",
    description: "Modern life ke liye science-backed Ayurvedic supplements. 100% natural aur GMP certified products jo aapko svasth rakhein.",
    type: "website",
    locale: "hi_IN",
    siteName: "NirogNature",
  },
  icons: {
    icon: "/images/favicon.jpeg",
    shortcut: "/images/favicon.jpeg",
    apple: "/images/favicon.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`} data-scroll-behavior="smooth">
      <body className="font-body antialiased">
        <Header />
        <CartDrawer />
        <ConsultationModal />
        <WhatsAppButton />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
