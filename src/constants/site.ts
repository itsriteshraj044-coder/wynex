import type { NavItem } from '../types';

export const SITE = {
  name: 'Wynex Technologies',
  short: 'Wynex',
  tagline: 'We engineer award-winning digital products.',
  email: 'info@wynextechnologies.com',
  phone: '+91 93412 67488',
  phoneAlt: '+91 73773 34604',
  address: 'Pragati Nagar, I.O.C Road Sipara, Patna, Bihar 800030, India',
  social: {
    linkedin: 'https://www.linkedin.com/company/wynex-technologies/',
    facebook: 'https://www.facebook.com/share/1Da5aNKAhP/',
    instagram: 'https://www.instagram.com/wynextechnologies/',
    threads: 'https://www.threads.com/@wynextechnologies/',
  },
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'Process', href: '/process' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact Us', href: '/contact' },
];
