import { Compass, PenTool, Code2, Rocket, LineChart, Headphones } from 'lucide-react';
import type { Project, Testimonial, Stat, ProcessStep, FAQItem, TechItem } from '../types';

export const PROJECTS: Project[] = [
  { id: 'p5', title: 'Roamigos Hostel', client: 'Roamigos', category: 'Web App', description: 'A vibrant and user-friendly website built for a traveling hostel, offering easy room discovery, booking, and local community guides.', tags: ['React', 'Next.js', 'TypeScript', 'Tailwind'], image: ['/projects/roamigos-1.png', '/projects/roamigos-2.png', '/projects/roamigos-3.png', '/projects/roamigos-4.png'], link: 'https://roamigos-hostels.vercel.app/', accent: 'from-orange-500 to-yellow-400', metric: { value: '2x', label: 'bookings' } },
  { id: 'p4', title: 'Storm Code', client: 'Storm Code Agency', category: 'Portfolio', description: 'A dynamic, high-performance agency portfolio demonstrating cutting-edge web development and design capabilities.', tags: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'GSAP'], image: ['/projects/stormcode-1.png', '/projects/stormcode-2.png', '/projects/stormcode-3.png', '/projects/stormcode-4.png'], link: 'https://stormcode.in/', accent: 'from-indigo-500 to-violet-400', metric: { value: 'A+', label: 'design grade' } },
  { id: 'p2', title: 'Game Dev', client: 'Personal Portfolio', category: 'Portfolio', description: 'A highly interactive and immersive 3D portfolio showcasing custom game development projects, assets, and design concepts.', tags: ['Three.js', 'WebGL', 'React', 'TypeScript'], image: ['/projects/game-dev-1.png', '/projects/game-dev-2.png'], link: 'https://game-dev-portfolio-liard.vercel.app/', accent: 'from-violet-500 to-fuchsia-400', metric: { value: '60fps', label: 'performance' } },
  { id: 'p1', title: 'AI Personal OS', client: 'Personal AI', category: 'Web App', description: 'A unified AI platform that serves as your personal operating system for daily tasks, workflows, and seamless productivity.', tags: ['React', 'Next.js', 'TypeScript', 'Java', 'AI'], image: ['/projects/ai-os-1.png', '/projects/ai-os-2.png'], link: 'https://ai-personal-os-orpin.vercel.app/', accent: 'from-indigo-500 to-cyan-400', metric: { value: '10x', label: 'productivity' } },
  { id: 'p3', title: 'Portfolio Website', client: 'Personal Portfolio', category: 'Portfolio', description: 'A sleek, modern, and fully responsive personal portfolio designed to showcase skills, projects, and professional experience.', tags: ['React', 'TypeScript', 'Tailwind', 'Framer'], image: ['/projects/portfolio-1.png', '/projects/portfolio-2.png', '/projects/portfolio-3.png'], link: 'https://portfolio-alpha-topaz-xa4ny8x215.vercel.app/', accent: 'from-cyan-500 to-sky-400', metric: { value: '100', label: 'lighthouse score' } },
  { id: 'p6', title: 'Restaurant Application', client: 'Food Delivery', category: 'Mobile App', description: 'A premium mobile application for seamless food delivery, featuring intuitive navigation, live order tracking, and a mouth-watering UI design.', tags: ['React Native', 'Firebase', 'Stripe'], image: ['/projects/restaurant-1.jpg', '/projects/restaurant-2.jpg', '/projects/restaurant-3.jpg'], accent: 'from-red-500 to-orange-400', metric: { value: '1M+', label: 'downloads' } },
];

export const PROJECT_FILTERS = ['All', 'Web App', 'Portfolio', 'E-commerce', 'Mobile App', 'Software', 'Cloud & AI'] as const;

const AV = (id: string) => `https://images.unsplash.com/photo-${id}?w=160&h=160&q=70&auto=format&fit=crop&crop=faces`;

export const TESTIMONIALS: Testimonial[] = [
  { id: 't1', name: 'Arjun Mehta', role: 'VP Engineering', company: 'SetuPay', quote: 'Wynex delivered a platform that outperformed our wildest expectations. The engineering rigour and design polish are simply world-class.', avatar: AV('1656221009909-4f202547cd94'), rating: 5 },
  { id: 't2', name: 'Ananya Iyer', role: 'Chief Product Officer', company: 'Arogya Health', quote: 'From discovery to launch, the process felt effortless. The app our patients across India now depend on is beautiful and rock-solid.', avatar: AV('1656236607879-cd489955e17b'), rating: 5 },
  { id: 't3', name: 'Rohan Gupta', role: 'Founder & CEO', company: 'BazaarKart', quote: 'Our conversions jumped 47% within a quarter. The team treats your business like their own — rare and invaluable.', avatar: AV('1724225618359-a1d2763326f9'), rating: 5 },
  { id: 't4', name: 'Kavya Reddy', role: 'Head of Growth', company: 'GyaanAI', quote: 'The AI assistant Wynex built now resolves 90% of our tickets in Hindi and English. It paid for itself within weeks.', avatar: AV('1768221677463-191fc4e15690'), rating: 5 },
  { id: 't5', name: 'Vikram Nair', role: 'CTO', company: 'Megh Systems', quote: 'They re-architected our entire cloud stack with zero downtime. 99.99% uptime speaks for itself.', avatar: AV('1638368349569-e49499196d9f'), rating: 5 },
];

export const STATS: Stat[] = [
  { value: 320, suffix: '+', label: 'Products shipped' },
  { value: 98, suffix: '%', label: 'Client retention' },
  { value: 45, suffix: 'M+', label: 'Users reached' },
  { value: 14, suffix: '', label: 'Countries served' },
];

export const PROCESS: ProcessStep[] = [
  { number: '01', title: 'Discover', description: 'We immerse in your goals, users and market to define a sharp product strategy.', icon: Compass },
  { number: '02', title: 'Design', description: 'Research-led UX and pixel-perfect UI, validated with interactive prototypes.', icon: PenTool },
  { number: '03', title: 'Develop', description: 'Clean, tested, scalable code shipped in transparent weekly increments.', icon: Code2 },
  { number: '04', title: 'Deploy', description: 'Zero-downtime launches with CI/CD, monitoring and performance budgets.', icon: Rocket },
  { number: '05', title: 'Optimize', description: 'Data-driven iteration on conversion, speed and retention post-launch.', icon: LineChart },
  { number: '06', title: 'Support', description: 'Proactive care plans and a dedicated team that has your back 24/7.', icon: Headphones },
];

export const FAQS: FAQItem[] = [
  { question: 'How long does a typical project take?', answer: 'Most marketing sites ship in 4–6 weeks, while complex web or mobile apps run 3–5 months. After a short discovery call we give you a precise, milestone-based timeline.' },
  { question: 'How much does it cost to work with Wynex?', answer: 'Engagements start around $8k for focused websites and scale with complexity. We provide a transparent, fixed-scope quote before any work begins — no surprises.' },
  { question: 'Do you work with startups and enterprises?', answer: 'Both. We have shipped MVPs for seed-stage founders and re-platformed systems for enterprises serving millions. Our process flexes to your stage.' },
  { question: 'What technologies do you specialize in?', answer: 'React, Next.js, TypeScript, Flutter, Swift, Kotlin, Node, Python, and the major clouds (AWS, Azure, GCP). We choose the right tool for your goals, not trends.' },
  { question: 'Do you provide ongoing support after launch?', answer: 'Yes. Every project includes a warranty period, and our care plans cover monitoring, updates, security and continuous optimization.' },
  { question: 'Can you take over an existing project?', answer: 'Absolutely. We regularly audit, rescue and modernize inherited codebases, then bring them up to our engineering standards.' },
];

export const TECHNOLOGIES: TechItem[] = [
  { name: 'React', color: '#61DAFB' }, { name: 'Next.js', color: '#0F172A' },
  { name: 'TypeScript', color: '#3178C6' }, { name: 'Vue', color: '#42B883' },
  { name: 'Angular', color: '#DD0031' }, { name: 'Node.js', color: '#539E43' },
  { name: 'Python', color: '#3776AB' }, { name: 'Laravel', color: '#FF2D20' },
  { name: 'PHP', color: '#777BB4' }, { name: 'Flutter', color: '#02569B' },
  { name: 'Swift', color: '#F05138' }, { name: 'Kotlin', color: '#7F52FF' },
  { name: 'WordPress', color: '#21759B' }, { name: 'Shopify', color: '#96BF48' },
  { name: 'AWS', color: '#FF9900' }, { name: 'Azure', color: '#0078D4' },
  { name: 'Docker', color: '#2496ED' }, { name: 'Kubernetes', color: '#326CE5' },
  { name: 'MongoDB', color: '#47A248' }, { name: 'PostgreSQL', color: '#4169E1' },
  { name: 'MySQL', color: '#4479A1' }, { name: 'Firebase', color: '#FFCA28' },
  { name: 'GraphQL', color: '#E10098' }, { name: 'Tailwind', color: '#06B6D4' },
];

export const CLIENTS = ['Fasal', 'Jar', 'Rocketlane', 'Unscript', 'Peppermint', 'Neodocs', 'Portl', 'Vidyut', 'CarbonCraft', 'Loop Health'];

export const HERO_FRAMES = [
  { title: 'Strategy', headline: 'It starts with a sharp idea.', text: 'We translate your vision into a product strategy engineered for measurable outcomes.' },
  { title: 'Design', headline: 'Then we make it beautiful.', text: 'Award-worthy interfaces, crafted pixel by pixel and validated with real users.' },
  { title: 'Engineering', headline: 'And build it to last.', text: 'Clean, scalable, tested code shipped by a team obsessed with craft and speed.' },
  { title: 'Launch', headline: 'Ready for the world.', text: 'Zero-downtime deploys, perfect performance, and growth baked in from day one.' },
];
