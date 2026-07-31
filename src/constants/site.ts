import type { NavItem } from '../types';

export const SITE = {
  name: 'Wynex Technologies',
  short: 'Wynex',
  tagline: 'We engineer award-winning digital products.',
  email: 'wynextechnologiespatna@gmail.com',
  phone: '+91 98765 43210',
  phoneAlt: '+91 73773 34604',
  address: 'Boring Road, Patna, Bihar 800001, India',
  social: {
    twitter: 'https://twitter.com/wynextech',
    linkedin: 'https://www.linkedin.com/company/wynextech',
    github: 'https://github.com/wynextech',
    dribbble: 'https://dribbble.com/wynextech',
  },
};

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Services',
    href: '/#services',
    children: [
      { label: 'Web Development', href: '/#services', description: 'Custom sites & web apps' },
      { label: 'Mobile Apps', href: '/#services', description: 'iOS, Android & Flutter' },
      { label: 'Custom Software', href: '/#services', description: 'ERP, CRM, HRMS & SaaS' },
      { label: 'Cloud & AI', href: '/#services', description: 'DevOps, ML & automation' },
      { label: 'UI/UX Design', href: '/#services', description: 'Product & brand design' },
      { label: 'Growth & SEO', href: '/#services', description: 'Marketing & performance' },
    ],
  },
  { label: 'Work', href: '/#work' },
  { label: 'Process', href: '/#process' },
  { label: 'About', href: '/#about' },
];
