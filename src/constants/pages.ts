import {
  Gem, Eye, Target, Zap, Handshake, ShieldCheck, Users2, CalendarCheck, KeyRound, LifeBuoy,
  Globe, Smartphone, Database, BrainCircuit, PenTool, TrendingUp,
  FileSignature, UserCog, HeartPulse,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ServiceCategory } from '../types';

/* ------------------------------------------------------------------ */
/*  About page                                                         */
/* ------------------------------------------------------------------ */

export const ABOUT_STORY = [
  'Wynex Technologies is a software development company headquartered in Patna, Bihar, and registered as an MSME with the Government of India. We design and build websites, web applications, mobile apps and custom business software for startups, growing businesses and established organisations.',
  'We started Wynex because too many businesses were stuck choosing between agencies that looked good but cut corners in the code, and developers who could build but never thought about the user. We do both: every project gets thoughtful design and careful engineering from the same team, from the first call to long after launch.',
  'Today we work with clients across India and abroad. Some come to us with a rough idea on a napkin, others with a product that has outgrown its first version. Either way, our job is the same — understand the business problem, build the right thing, and make sure it keeps working as you grow.',
];

export const MISSION = {
  title: 'Our mission',
  text: 'To give every business — not just the biggest ones — access to software that is well designed, properly engineered and genuinely useful, delivered by a team that treats their goals as its own.',
  icon: Target,
};

export const VISION = {
  title: 'Our vision',
  text: 'To be the technology partner businesses in India and beyond trust first — known for honest advice, dependable delivery and products that keep paying off for years.',
  icon: Eye,
};

export interface Value { title: string; text: string; icon: LucideIcon }

export const VALUES: Value[] = [
  { title: 'Craft over shortcuts', text: 'Clean code, thoughtful design and proper testing. We build things the right way so they don’t need rebuilding next year.', icon: Gem },
  { title: 'Radical transparency', text: 'Clear quotes, honest timelines and weekly progress you can see. If something changes, you hear it from us first.', icon: Eye },
  { title: 'Ownership', text: 'We treat your product like our own — raising risks early, suggesting improvements and caring about the outcome, not just the ticket.', icon: Handshake },
  { title: 'Speed with quality', text: 'Short, focused iterations get working software into your hands quickly, without trading away reliability.', icon: Zap },
  { title: 'Security by default', text: 'Secure coding practices, protected data and sensible access controls are part of every build, not an add-on.', icon: ShieldCheck },
  { title: 'Long-term partnership', text: 'Launch is the beginning. We stay on to support, maintain and grow what we’ve built together.', icon: HeartPulse },
];

export const WORKING_WITH_US: Value[] = [
  { title: 'One dedicated team', text: 'Designers, developers and a project lead who know your product end to end — no hand-offs between strangers.', icon: Users2 },
  { title: 'Weekly progress', text: 'A demo or update every week, so you always know what’s done, what’s next and where the budget stands.', icon: CalendarCheck },
  { title: 'You own everything', text: 'Source code, designs, accounts and intellectual property are yours. No lock-in, ever.', icon: KeyRound },
  { title: 'Support after launch', text: 'A warranty period on every project, plus care plans for updates, monitoring and new features.', icon: LifeBuoy },
];

/* ------------------------------------------------------------------ */
/*  Services page                                                      */
/* ------------------------------------------------------------------ */

export interface ServicePillar {
  category: ServiceCategory;
  title: string;
  summary: string;
  includes: string[];
  stack: string[];
  icon: LucideIcon;
}

export const SERVICE_PILLARS: ServicePillar[] = [
  {
    category: 'Web',
    title: 'Websites & Web Applications',
    summary: 'Fast, search-friendly websites that win customers, and web apps that run your business — built on modern frameworks and easy for your team to update.',
    includes: ['Business & corporate websites', 'Custom web applications & portals', 'E-commerce, Shopify & WordPress', 'Landing pages built to convert', 'Admin dashboards & CMS'],
    stack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Laravel', 'WordPress', 'Shopify'],
    icon: Globe,
  },
  {
    category: 'Mobile',
    title: 'Mobile App Development',
    summary: 'Android and iOS apps that feel smooth and native, from a single cross-platform codebase or fully native when the product needs it — and we handle store submission for you.',
    includes: ['Android & iOS apps', 'Cross-platform apps with Flutter & React Native', 'App UI/UX design', 'Play Store & App Store launch', 'Push notifications, payments & maps'],
    stack: ['Flutter', 'React Native', 'Kotlin', 'Swift', 'Firebase'],
    icon: Smartphone,
  },
  {
    category: 'Software',
    title: 'Custom Software & Business Systems',
    summary: 'Software shaped around how your business actually works — replacing spreadsheets and disconnected tools with one reliable system your team enjoys using.',
    includes: ['CRM, ERP & HRMS', 'Inventory, billing & booking systems', 'API development & third-party integrations', 'Legacy system modernisation', 'Maintenance & bug fixing'],
    stack: ['Node.js', 'Python', 'PHP', 'PostgreSQL', 'MySQL', 'MongoDB', 'REST & GraphQL'],
    icon: Database,
  },
  {
    category: 'Cloud & AI',
    title: 'Cloud, DevOps & AI',
    summary: 'Reliable hosting, automated deployments and practical AI features — chatbots, smart search and automation that save your team real time.',
    includes: ['Cloud setup on AWS, Azure & GCP', 'CI/CD, hosting & deployment', 'AI chatbots & LLM integration', 'Workflow automation', 'Performance tuning & security audits'],
    stack: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'OpenAI & Gemini APIs'],
    icon: BrainCircuit,
  },
  {
    category: 'Design',
    title: 'UI/UX & Product Design',
    summary: 'Research-led design that makes your product easy to use and memorable to look at — from first wireframe to a complete design system.',
    includes: ['User research & journeys', 'Wireframes & interactive prototypes', 'UI design for web & mobile', 'Design systems', 'Redesigns of existing products'],
    stack: ['Figma', 'Prototyping', 'Design systems', 'Accessibility (WCAG)'],
    icon: PenTool,
  },
  {
    category: 'Growth',
    title: 'SEO & Digital Marketing',
    summary: 'Get found and grow. Technical SEO, content and campaigns that bring in the right visitors and turn them into customers — measured with clear reporting.',
    includes: ['Technical & on-page SEO', 'Local SEO & Google Business Profile', 'Content strategy & blogging', 'Social media & paid ads', 'Analytics & conversion tracking'],
    stack: ['Google Search Console', 'Google Analytics', 'Google Ads', 'Meta Ads'],
    icon: TrendingUp,
  },
];

/* ------------------------------------------------------------------ */
/*  Process page                                                       */
/* ------------------------------------------------------------------ */

export interface ProcessDetail {
  /** Matches PROCESS[n].number in content.ts. */
  number: string;
  intro: string;
  activities: string[];
  deliverables: string[];
  duration: string;
}

export const PROCESS_DETAILS: ProcessDetail[] = [
  {
    number: '01',
    intro: 'Every project starts with listening. We learn your business, your users and what success looks like, so we build the right thing — not just a thing.',
    activities: ['Kick-off call with your stakeholders', 'Goals, audience and competitor review', 'Feature list and priorities (what’s in v1, what can wait)', 'Technical feasibility and platform choice'],
    deliverables: ['Project scope document', 'Fixed quote and milestone plan', 'Sitemap or feature map'],
    duration: '3–7 days',
  },
  {
    number: '02',
    intro: 'We turn the plan into something you can see and click. Design decisions are made with you, before a single line of production code is written.',
    activities: ['Wireframes for key screens and flows', 'Visual design in your brand style', 'Clickable prototype for feedback', 'Revisions until you’re happy'],
    deliverables: ['Figma designs for every screen', 'Interactive prototype', 'Design system / style guide'],
    duration: '1–3 weeks',
  },
  {
    number: '03',
    intro: 'Our developers build in short sprints with a demo every week. You see real progress early and can steer as we go.',
    activities: ['Front-end and back-end development', 'Integrations: payments, CRM, APIs', 'Code reviews and automated tests', 'Weekly demos on a private staging link'],
    deliverables: ['Working software on a staging site', 'Weekly progress updates', 'Access to the code repository'],
    duration: '2–12 weeks, depending on scope',
  },
  {
    number: '04',
    intro: 'Launch day should be boring — in the best way. We test thoroughly, set up hosting and monitoring, and go live without downtime.',
    activities: ['Cross-device and browser testing', 'Speed, SEO and security checks', 'Hosting, domain, SSL and email setup', 'App Store / Play Store submission (for apps)'],
    deliverables: ['Live website or published app', 'Admin access and credentials', 'Handover walkthrough for your team'],
    duration: '3–7 days',
  },
  {
    number: '05',
    intro: 'Once real users arrive, we measure what’s working and improve it — page speed, conversion, and the features people actually use.',
    activities: ['Analytics and conversion tracking', 'Performance and Core Web Vitals tuning', 'User feedback review', 'Small improvements and A/B tests'],
    deliverables: ['Monthly performance report', 'Prioritised improvement list'],
    duration: 'Ongoing',
  },
  {
    number: '06',
    intro: 'We don’t disappear after launch. Every project includes a warranty period, and our care plans keep your product secure, updated and growing.',
    activities: ['Bug fixes during the warranty period', 'Security updates and backups', 'Uptime monitoring', 'New features as your business grows'],
    deliverables: ['Support channel with a named contact', 'Care plan with clear response times'],
    duration: 'As long as you need us',
  },
];

export interface EngagementModel {
  title: string;
  bestFor: string;
  points: string[];
  icon: LucideIcon;
}

export const ENGAGEMENT_MODELS: EngagementModel[] = [
  {
    title: 'Fixed-scope project',
    bestFor: 'Websites, MVPs and projects with clear requirements',
    points: ['Agreed scope, price and timeline up front', 'Payments tied to milestones', 'Change requests quoted before work starts'],
    icon: FileSignature,
  },
  {
    title: 'Dedicated team',
    bestFor: 'Growing products and long-running development',
    points: ['Developers and designers working only on your product', 'Flexible priorities, sprint by sprint', 'Monthly billing; scale the team up or down'],
    icon: UserCog,
  },
  {
    title: 'Care & growth plan',
    bestFor: 'Live websites and apps that need ongoing attention',
    points: ['Updates, backups and security patches', 'Monitoring with fast response on issues', 'A monthly allowance for improvements'],
    icon: HeartPulse,
  },
];
