import productsData from '@/data/products.json';
import categoriesData from '@/data/categories.json';
import testimonialsData from '@/data/testimonials.json';
import doctorsData from '@/data/doctors.json';
import blogsData from '@/data/blogs.json';
import faqsData from '@/data/faqs.json';
import { Product, Category, Testimonial, Doctor, Blog, FAQ } from './types';

export function getProducts(): Product[] {
  return productsData as Product[];
}

export function getProductBySlug(slug: string): Product | undefined {
  return (productsData as Product[]).find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return (productsData as Product[]).filter((p) => p.category === category);
}

export function getBestsellers(): Product[] {
  return (productsData as Product[]).filter((p) => p.tags.includes('bestseller'));
}

export function getCategories(): Category[] {
  return categoriesData as Category[];
}

export function getTestimonials(): Testimonial[] {
  return testimonialsData as Testimonial[];
}

export function getDoctors(): Doctor[] {
  return doctorsData as Doctor[];
}

export function getBlogs(): Blog[] {
  return blogsData as Blog[];
}

export function getBlogBySlug(slug: string): Blog | undefined {
  return (blogsData as Blog[]).find((b) => b.slug === slug);
}

export function getFaqs(): FAQ[] {
  return faqsData as FAQ[];
}

export function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`;
}

export function getDiscount(price: number, comparePrice: number): number {
  return Math.round(((comparePrice - price) / comparePrice) * 100);
}
