import type { LucideIcon } from 'lucide-react';

export interface Service {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  category: ServiceCategory;
  features: string[];
}

export type ServiceCategory =
  | 'Web'
  | 'Mobile'
  | 'Software'
  | 'Cloud & AI'
  | 'Design'
  | 'Growth';

export interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
  accent: string;
  metric: { value: string; label: string };
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
  rating: number;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  /** Full article body in Markdown (present on generated/seed posts). */
  content?: string;
  /** SEO meta description (<=160 chars). */
  metaDescription?: string;
  keywords?: string[];
  tags?: string[];
  author?: string;
}

export interface TechItem {
  name: string;
  color: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; description: string }[];
}
