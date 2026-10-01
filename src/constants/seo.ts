/**
 * Per-page SEO metadata, shared by the React pages (via <Seo>) and by
 * scripts/prerender.ts, which bakes the same tags into each page's static HTML.
 * Keep this file free of React/runtime imports so Node can load it directly.
 */
import type { BlogPost } from '../types';

export const SITE_URL = 'https://wynextechnologies.com';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export interface PageSeo {
  title: string;
  description: string;
}

export const PAGE_SEO = {
  '/': {
    title: 'Wynex Technologies — Award-Winning Web, App & AI Development Agency',
    description: 'Premium software development agency crafting high-performance websites, web & mobile apps, custom software, cloud and AI solutions for ambitious brands worldwide.',
  },
  '/about': {
    title: 'About Us — Wynex Technologies',
    description: 'Wynex Technologies is an MSME-registered software development company in Patna, Bihar, building websites, mobile apps and custom software for businesses in India and abroad.',
  },
  '/work': {
    title: 'Our Work — Websites, Apps & Software Projects | Wynex Technologies',
    description: 'Explore websites, web apps, mobile apps and portfolios designed and built by Wynex Technologies, Patna — with the technologies behind each project.',
  },
  '/services': {
    title: 'Services — Website, App & Software Development | Wynex Technologies',
    description: 'Website development, mobile apps, custom software, CRM/ERP, cloud, AI integration, UI/UX design and SEO from Wynex Technologies, Patna. One team from idea to launch and beyond.',
  },
  '/process': {
    title: 'Our Process — How We Build Websites & Apps | Wynex Technologies',
    description: 'See how Wynex Technologies takes your project from idea to launch: discovery, design, development, deployment, optimisation and long-term support, with weekly demos and fixed quotes.',
  },
  '/contact': {
    title: 'Contact Us — Wynex Technologies',
    description: 'Get in touch with Wynex Technologies in Patna for websites, mobile apps, custom software, cloud and AI projects. Call, email, WhatsApp or send us your project details.',
  },
  '/blog': {
    title: 'Insights & Blog — Wynex Technologies',
    description: 'Practical engineering, design and AI insights from the Wynex Technologies team — new articles every week.',
  },
  '/privacy': {
    title: 'Privacy Policy — Wynex Technologies',
    description: 'How Wynex Technologies collects, uses and protects personal data — your rights under India’s DPDP Act, the Google services we use, and how to contact our Grievance Officer.',
  },
  '/terms': {
    title: 'Terms & Conditions — Wynex Technologies',
    description: 'The Terms & Conditions for using the Wynex Technologies website and for our client projects, quotes, payments and intellectual property.',
  },
  '/cookies': {
    title: 'Cookie Policy — Wynex Technologies',
    description: 'Which cookies and similar technologies the Wynex Technologies website and its embedded services use, and how to manage them.',
  },
} satisfies Record<string, PageSeo>;

export type SeoPath = keyof typeof PAGE_SEO;

export function blogPostSeo(post: BlogPost): PageSeo {
  return { title: `${post.title} — Wynex Technologies`, description: post.metaDescription ?? post.excerpt };
}

export function blogPostJsonLd(post: BlogPost) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription ?? post.excerpt,
    image: post.image,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Organization', name: post.author ?? 'Wynex Technologies' },
    publisher: {
      '@type': 'Organization',
      name: 'Wynex Technologies',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.png` },
    },
    keywords: (post.keywords ?? post.tags ?? []).join(', '),
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };
}
