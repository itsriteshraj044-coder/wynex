import { Award, Trophy, Star, BadgeCheck, Medal } from 'lucide-react';
import Marquee from '../ui/Marquee';

const awards = [
  { icon: Trophy, label: 'Awwwards — Site of the Day' },
  { icon: Star, label: 'CSS Design Awards — WOTD' },
  { icon: Award, label: 'Clutch — Top B2B Company' },
  { icon: BadgeCheck, label: 'Google Cloud Partner' },
  { icon: Medal, label: 'AWS Advanced Tier' },
  { icon: Trophy, label: 'FWA — Site of the Day' },
];

export default function Awards() {
  return (
    <section className="relative border-y border-ink/5 bg-white/40 py-12 backdrop-blur-sm dark:border-white/5 dark:bg-white/[0.02]">
      <p className="container-x mb-8 text-center text-sm font-semibold uppercase tracking-[0.2em] text-ink-muted dark:text-slate-500">
        Awards & certifications
      </p>
      <Marquee speed={30}>
        {awards.map((a) => (
          <div key={a.label} className="mx-4 flex items-center gap-3 whitespace-nowrap rounded-2xl border border-white/60 bg-white/70 px-6 py-3.5 shadow-card backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]">
            <a.icon className="h-5 w-5 text-brand-violet" />
            <span className="font-semibold text-ink dark:text-white">{a.label}</span>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
