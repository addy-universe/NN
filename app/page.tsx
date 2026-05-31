import HeroSection from '@/components/home/HeroSection';
import PosterSlider from '@/components/home/PosterSlider';
import CategoriesSection from '@/components/home/CategoriesSection';
import ProductsSection from '@/components/home/ProductsSection';
import BrandMission from '@/components/home/BrandMission';
import ProcessSection from '@/components/home/ProcessSection';
import ClinicSection from '@/components/home/ClinicSection';
import DoctorsSection from '@/components/home/DoctorsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import BlogSection from '@/components/home/BlogSection';
import FAQSection from '@/components/home/FAQSection';
import CTASection from '@/components/home/CTASection';
import { getProducts, getTestimonials, getDoctors, getBlogs, getFaqs } from '@/lib/data';

export default function HomePage() {
  const products = getProducts();
  const bestsellers = products.filter(p => p.tags.includes('bestseller'));
  const testimonials = getTestimonials();
  const doctors = getDoctors();
  const blogs = getBlogs();
  const faqs = getFaqs();

  return (
    <>
      <HeroSection />
      <PosterSlider />
      <CategoriesSection />
      <ProductsSection
        title="Bestsellers"
        subtitle="Most loved"
        products={bestsellers}
        viewAllLink="/shop?tag=bestseller"
        bgClass="bg-white"
      />
      <BrandMission />
      <ProductsSection
        title="All Products"
        subtitle="Premium range"
        products={products.slice(0, 4)}
        viewAllLink="/shop"
        bgClass="bg-gray-50"
      />
      <ProcessSection />
      <ClinicSection />
      <DoctorsSection doctors={doctors} />
      <TestimonialsSection testimonials={testimonials} />
      <ProductsSection
        title="New Arrivals"
        subtitle="Just launched"
        products={products.slice(4, 8)}
        viewAllLink="/shop"
        bgClass="bg-white"
      />
      <BlogSection blogs={blogs} />
      <FAQSection faqs={faqs} />
      <CTASection />
    </>
  );
}
