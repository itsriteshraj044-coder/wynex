import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { Gauge, ShieldCheck, Rocket, HeartHandshake, Layers, Clock, type LucideIcon } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { cn } from '../../utils/cn';
import {
  DeployPipeline, SpeedGauge, SecurityShield, GrowthChart, NetworkNodes, SupportClock,
} from './WhyVectors';

interface Reason {
  icon: LucideIcon;
  title: string;
  desc: string;
  vector: ReactNode;
  badge?: ReactNode;
  wide?: boolean;
}

const reasons: Reason[] = [
  {
    icon: Rocket,
    title: 'Ship Faster',
    desc: 'Battle-tested foundations and reusable systems take you from idea to launch in weeks — not quarters.',
    vector: <DeployPipeline />,
    badge: <Badge><CountUp end={3} enableScrollSpy scrollSpyOnce />× faster delivery</Badge>,
    wide: true,
  },
  {
    icon: Gauge,
    title: 'Obsessed With Performance',
    desc: 'Perfect Core Web Vitals and buttery 60fps interactions, by default.',
    vector: <SpeedGauge />,
    badge: <Badge><CountUp end={60} enableScrollSpy scrollSpyOnce /> fps · 100 CWV</Badge>,
  },
  {
    icon: ShieldCheck,
    title: 'Secure By Design',
    desc: 'OWASP-aligned practices, audits and hardening baked into every build.',
    vector: <SecurityShield />,
    badge: <Badge>OWASP · SOC-2 ready</Badge>,
  },
  {
    icon: Layers,
    title: 'Scales With You',
    desc: 'Clean architecture that grows from your first user to your millionth — without a rewrite.',
    vector: <GrowthChart />,
    badge: <Badge>1 → <CountUp end={45} enableScrollSpy scrollSpyOnce />M+ users</Badge>,
    wide: true,
  },
  {
    icon: HeartHandshake,
    title: 'A True Partnership',
    desc: 'A dedicated senior pod that treats your roadmap like their own — no juniors, no hand-offs.',
    vector: <NetworkNodes />,
    badge: <Badge>Dedicated senior pod</Badge>,
    wide: true,
  },
  {
    icon: Clock,
    title: '24/7 Support',
    desc: 'Proactive monitoring and rapid response, whenever you need us.',
    vector: <SupportClock />,
    badge: <Badge>24 / 7 monitoring</Badge>,
  },
];

function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-brand-indigo/15 bg-white/70 px-3 py-1 text-xs font-semibold text-brand-indigo backdrop-blur dark:border-white/10 dark:bg-white/5">
      <span className="h-1.5 w-1.5 rounded-full bg-brand-gradient" />
      {children}
    </span>
  );
}

function handleSpotlight(e: React.MouseEvent<HTMLDivElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${e.clientX - r.left}px`);
  el.style.setProperty('--my', `${e.clientY - r.top}px`);
}

function Card({ reason, index }: { reason: Reason; index: number }) {
  const { icon: Icon, title, desc, vector, badge, wide } = reason;
  return (
    <motion.div
      onMouseMove={handleSpotlight}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: (index % 3) * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'group relative overflow-hidden rounded-[1.75rem] border border-white/60 bg-white/70 shadow-card backdrop-blur-xl transition-transform duration-500 hover:-translate-y-1.5 dark:border-white/10 dark:bg-white/[0.04]',
        wide ? 'lg:col-span-2' : 'lg:col-span-1'
      )}
    >
      {/* animated gradient border on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: 'linear-gradient(130deg,#4f46e5,#06b6d4,#8b5cf6)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: '1.5px',
        }}
      />
      {/* cursor spotlight */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'radial-gradient(340px circle at var(--mx) var(--my), rgba(99,102,241,0.14), transparent 65%)' }}
      />

      <div className={cn('relative flex h-full gap-6 p-7 lg:p-8', wide ? 'flex-col sm:flex-row sm:items-center' : 'flex-col')}>
        {/* text */}
        <div className={cn('flex flex-col', wide ? 'sm:flex-1' : '')}>
          <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-brand-indigo/10 text-brand-indigo transition-colors duration-300 group-hover:bg-brand-gradient group-hover:text-white">
            <Icon className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold text-ink dark:text-white">{title}</h3>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-muted dark:text-slate-400">{desc}</p>
          {badge && <div className="mt-4">{badge}</div>}
        </div>

        {/* animated vector */}
        <div
          className={cn(
            'relative grid shrink-0 place-items-center text-brand-indigo/70 dark:text-white/50',
            wide ? 'h-32 w-full sm:h-36 sm:w-56' : 'mt-2 h-28 w-full'
          )}
        >
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-brand-gradient opacity-[0.06] blur-xl transition-opacity duration-500 group-hover:opacity-[0.14]" />
          {vector}
        </div>
      </div>
    </motion.div>
  );
}

export default function WhyChooseUs() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Why Wynex"
          title="The Partner Ambitious Teams"
          highlight="Rely On."
          subtitle="Not just another agency — an engineering partner obsessed with speed, craft and outcomes."
        />

        <div className="mt-14 grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <Card key={r.title} reason={r} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
