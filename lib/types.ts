export interface Product {
  id: string;
  name: string;
  slug: string;
  shortDesc: string;
  description: string;
  price: number;
  comparePrice: number;
  category: string;
  subcategory: string;
  tags: string[];
  badge: string;
  images: string[];
  rating: number;
  reviewCount: number;
  benefits: string[];
  ingredients: string;
  howToUse: string;
  variants: Variant[];
  inStock: boolean;
  sku: string;
  weight: string;
}

export interface Variant {
  id: string;
  name: string;
  price: number;
  comparePrice: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  image: string;
  productCount: number;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  role: string;
  initials: string;
  rating: number;
  text: string;
  product: string;
  verified: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  experience: string;
  image: string;
  bio: string;
  qualifications: string[];
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
  tags: string[];
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface CartItem {
  product: Product;
  variant: Variant;
  quantity: number;
}
