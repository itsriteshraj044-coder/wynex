import {
  Globe, Layout, Smartphone, Apple, Bot, Feather, Atom, Rocket,
  ShoppingCart, ShoppingBag, Database, Users, Building2, Boxes,
  Plug, Cloud, PenTool, Search, Megaphone, Gauge, Wrench, Bug,
  ShieldCheck, Zap, Server, BrainCircuit, Workflow, LayoutGrid,
} from 'lucide-react';
import type { Service } from '../types';

export const SERVICES: Service[] = [
  { slug: 'custom-website', title: 'Custom Website Development', description: 'Bespoke, blazing-fast marketing sites engineered for conversion and story.', icon: Globe, category: 'Web', features: ['Headless CMS', 'Core Web Vitals', 'A/B ready'] },
  { slug: 'web-apps', title: 'Web Application Development', description: 'Scalable, real-time web apps with clean architecture and delightful UX.', icon: Layout, category: 'Web', features: ['Real-time', 'Role-based access', 'API-first'] },
  { slug: 'mobile-apps', title: 'Mobile App Development', description: 'Native-quality cross-platform apps that feel effortless on every device.', icon: Smartphone, category: 'Mobile', features: ['Offline-first', 'Push', 'App store ready'] },
  { slug: 'android', title: 'Android Development', description: 'High-performance Kotlin apps built to Material 3 standards.', icon: LayoutGrid, category: 'Mobile', features: ['Kotlin', 'Jetpack', 'Play Store'] },
  { slug: 'ios', title: 'iOS Development', description: 'Polished Swift & SwiftUI experiences tuned for the Apple ecosystem.', icon: Apple, category: 'Mobile', features: ['SwiftUI', 'Widgets', 'App Clips'] },
  { slug: 'flutter', title: 'Flutter Development', description: 'One codebase, pixel-perfect on iOS, Android, web and desktop.', icon: Feather, category: 'Mobile', features: ['Single codebase', '120fps', 'Custom UI'] },
  { slug: 'react', title: 'React Development', description: 'Component-driven interfaces with best-in-class performance.', icon: Atom, category: 'Web', features: ['Hooks', 'RSC', 'Design systems'] },
  { slug: 'nextjs', title: 'Next.js Development', description: 'SSR & edge-rendered apps that rank and load instantly.', icon: Rocket, category: 'Web', features: ['App Router', 'Edge', 'ISR'] },
  { slug: 'wordpress', title: 'WordPress Development', description: 'Custom themes and headless WP builds marketers actually love.', icon: PenTool, category: 'Web', features: ['Custom themes', 'ACF', 'Headless'] },
  { slug: 'shopify', title: 'Shopify Development', description: 'Conversion-optimized storefronts with custom Liquid & Hydrogen.', icon: ShoppingBag, category: 'Web', features: ['Hydrogen', 'Custom theme', 'Apps'] },
  { slug: 'ecommerce', title: 'E-commerce Development', description: 'End-to-end commerce platforms built to scale to millions.', icon: ShoppingCart, category: 'Web', features: ['Payments', 'Inventory', 'Multi-currency'] },
  { slug: 'crm', title: 'CRM Development', description: 'Tailored customer platforms that unify sales and support.', icon: Users, category: 'Software', features: ['Pipelines', 'Automation', 'Analytics'] },
  { slug: 'hrms', title: 'HRMS Development', description: 'People platforms for onboarding, payroll and performance.', icon: Building2, category: 'Software', features: ['Payroll', 'Attendance', 'Self-serve'] },
  { slug: 'erp', title: 'ERP Development', description: 'Unified operations software connecting every department.', icon: Boxes, category: 'Software', features: ['Modules', 'Reporting', 'Integrations'] },
  { slug: 'custom-software', title: 'Custom Software Development', description: 'From concept to launch — software shaped exactly to your process.', icon: Database, category: 'Software', features: ['Discovery', 'Architecture', 'Scale'] },
  { slug: 'api', title: 'API Integration', description: 'Robust integrations that make your stack talk seamlessly.', icon: Plug, category: 'Software', features: ['REST/GraphQL', 'Webhooks', 'Auth'] },
  { slug: 'cloud', title: 'Cloud Solutions', description: 'Resilient, cost-efficient infrastructure on AWS, Azure & GCP.', icon: Cloud, category: 'Cloud & AI', features: ['IaC', 'Autoscale', 'Observability'] },
  { slug: 'ui-ux', title: 'UI/UX Design', description: 'Research-led product design that turns ideas into loved products.', icon: PenTool, category: 'Design', features: ['Research', 'Prototyping', 'Design systems'] },
  { slug: 'seo', title: 'SEO', description: 'Technical & content SEO that earns durable organic growth.', icon: Search, category: 'Growth', features: ['Technical SEO', 'Content', 'Schema'] },
  { slug: 'digital-marketing', title: 'Digital Marketing', description: 'Full-funnel campaigns that acquire and retain customers.', icon: Megaphone, category: 'Growth', features: ['Paid', 'Lifecycle', 'Analytics'] },
  { slug: 'performance', title: 'Performance Optimization', description: 'Sub-second experiences with perfect Core Web Vitals.', icon: Gauge, category: 'Cloud & AI', features: ['CWV', 'Caching', 'CDN'] },
  { slug: 'maintenance', title: 'Website Maintenance', description: 'Proactive care plans that keep products fast and secure.', icon: Wrench, category: 'Software', features: ['Monitoring', 'Updates', 'SLAs'] },
  { slug: 'bug-fixing', title: 'Bug Fixing', description: 'Rapid triage and resolution for critical production issues.', icon: Bug, category: 'Software', features: ['Triage', 'Root cause', 'Hotfix'] },
  { slug: 'security', title: 'Security Audit', description: 'Deep audits and hardening to protect data and reputation.', icon: ShieldCheck, category: 'Cloud & AI', features: ['Pentest', 'OWASP', 'Hardening'] },
  { slug: 'speed', title: 'Speed Optimization', description: 'Precision tuning that shaves seconds and lifts revenue.', icon: Zap, category: 'Cloud & AI', features: ['Bundle', 'Images', 'Edge'] },
  { slug: 'hosting', title: 'Hosting & Deployment', description: 'Zero-downtime CI/CD pipelines and managed hosting.', icon: Server, category: 'Cloud & AI', features: ['CI/CD', 'Blue-green', 'Managed'] },
  { slug: 'ai', title: 'AI Integration', description: 'Ship intelligent features with LLMs, RAG and computer vision.', icon: BrainCircuit, category: 'Cloud & AI', features: ['LLMs', 'RAG', 'Vision'] },
  { slug: 'automation', title: 'Automation Solutions', description: 'Workflow automation that removes busywork and scales teams.', icon: Workflow, category: 'Cloud & AI', features: ['Workflows', 'Bots', 'Integrations'] },
];

export const SERVICE_CATEGORIES = ['All', 'Web', 'Mobile', 'Software', 'Cloud & AI', 'Design', 'Growth'] as const;

// Icons re-exported for other sections
export { Bot };
