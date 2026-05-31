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
      <ProductsSection
        title="All Products"
        subtitle="Premium range"
        products={products}
        viewAllLink="/shop"
        bgClass="bg-white"
      />
      <CategoriesSection />
      <BrandMission />
      <ProcessSection />
      <ClinicSection />
      <DoctorsSection doctors={doctors} />
      <TestimonialsSection testimonials={testimonials} />
      <BlogSection blogs={blogs} />
      <FAQSection faqs={faqs} />
      <CTASection />
    </>
  );
}
