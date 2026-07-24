import { useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { PROJECTS, PROJECT_FILTERS } from '../../constants/content';
import type { Project } from '../../types';
import { cn } from '../../utils/cn';

/* Animated browser-mockup preview that floats beside the cursor */
function BrowserPreview({ project }: { project: Project }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/60 bg-white shadow-glow dark:border-white/10 dark:bg-[#0d1424]">
      <div className="flex items-center gap-1.5 px-3 py-2.5">
        {['#f87171', '#fbbf24', '#34d399'].map((c, i) => (
          <motion.span key={i} className="h-2.5 w-2.5 rounded-full" style={{ background: c }}
            animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }} />
        ))}
        <div className="ml-2 h-4 flex-1 rounded-full bg-ink/5 dark:bg-white/10" />
      </div>
      <div className="relative h-0.5 w-full overflow-hidden bg-ink/5 dark:bg-white/10">
        <motion.div className="absolute inset-y-0 left-0 rounded-full bg-brand-gradient"
          animate={{ width: ['0%', '100%'] }} transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }} />
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={project.image} alt="" className="h-full w-full object-cover" />
        <div className={cn('absolute inset-0 bg-linear-to-t opacity-55 mix-blend-multiply', project.accent)} />
        <div className="absolute bottom-3 left-3 rounded-xl bg-white/90 px-3 py-1.5 backdrop-blur dark:bg-[#0d1424]/90">
          <p className="text-sm font-bold text-ink dark:text-white">{project.metric.value}</p>
          <p className="text-[10px] text-ink-muted dark:text-slate-400">{project.metric.label}</p>
        </div>
      </div>
    </div>
  );
}

function Row({ p, i, onEnter }: { p: Project; i: number; onEnter: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.45, delay: Math.min(i * 0.05, 0.25) }}
      onMouseEnter={onEnter}
      className="group relative border-b border-ink/10 dark:border-white/10"
    >
      <div className="pointer-events-none absolute inset-0 bg-brand-indigo/[0.04] opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-white/[0.03]" />
      <a href="#work" className="relative flex flex-col gap-5 py-7 transition-transform duration-500 lg:flex-row lg:items-center lg:justify-between lg:py-9 lg:group-hover:translate-x-3">
        <div className="flex items-start gap-4 lg:gap-8">
          <span className="mt-2 font-mono text-sm font-semibold text-ink-muted transition-colors group-hover:text-brand-indigo dark:text-slate-500">
            0{i + 1}
          </span>
          <div>
            <h3 className="relative inline-block text-3xl font-bold text-ink dark:text-white lg:text-[2.6rem] lg:leading-[1.1]">
              {p.title}
              <span className="absolute -bottom-1 left-0 h-[3px] w-full origin-left scale-x-0 rounded-full bg-brand-gradient transition-transform duration-500 group-hover:scale-x-100" />
            </h3>
            <p className="mt-2 text-sm font-medium text-ink-muted dark:text-slate-400">{p.client} · {p.category}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="rounded-full border border-ink/10 px-2.5 py-0.5 text-xs font-semibold text-ink-muted dark:border-white/10 dark:text-slate-400">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* inline image on mobile/tablet (no cursor hover there) */}
        <div className="overflow-hidden rounded-2xl border border-white/60 shadow-card lg:hidden dark:border-white/10">
          <img src={p.image} alt={`${p.title} — ${p.category}`} className="aspect-[16/10] w-full object-cover" loading="lazy" />
        </div>

        <div className="flex items-center justify-between gap-6 lg:justify-end">
          <div className="text-left lg:text-right">
            <p className="font-heading text-xl font-bold"><span className="text-gradient">{p.metric.value}</span></p>
            <p className="text-[11px] font-medium text-ink-muted dark:text-slate-500">{p.metric.label}</p>
          </div>
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-ink/15 text-ink transition-all duration-300 group-hover:border-transparent group-hover:bg-brand-gradient group-hover:text-white dark:border-white/15 dark:text-white">
            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </a>
    </motion.div>
  );
}

export default function Work() {
  const [filter, setFilter] = useState<(typeof PROJECT_FILTERS)[number]>('All');
  const [hovered, setHovered] = useState<number | null>(null);
  const filtered = useMemo(
    () => (filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter]
  );

  const listRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 28, mass: 0.5 });
  const y = useSpring(my, { stiffness: 220, damping: 28, mass: 0.5 });

  const onMove = (e: React.MouseEvent) => {
    const r = listRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(e.clientX - r.left + 28);
    my.set(e.clientY - r.top - 110);
  };

  const active = hovered !== null ? filtered[hovered] : null;

  return (
    <section id="work" className="relative py-24 lg:py-32">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading align="left" eyebrow="Featured Work" title="Selected Projects That" highlight="Moved The Needle." />
          <div className="flex flex-wrap gap-2">
            {PROJECT_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => { setFilter(f); setHovered(null); }}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 active:scale-95',
                  filter === f
                    ? 'bg-ink text-white dark:bg-white dark:text-ink'
                    : 'border border-ink/10 text-ink-muted hover:text-ink dark:border-white/10 dark:text-slate-400 dark:hover:text-white'
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div
          ref={listRef}
          onMouseLeave={() => setHovered(null)}
          onMouseMove={onMove}
          className="relative mt-10 border-t border-ink/10 dark:border-white/10"
        >
          {/* cursor-following animated preview (desktop) */}
          <motion.div style={{ x, y }} className="pointer-events-none absolute left-0 top-0 z-30 hidden w-72 lg:block">
            <AnimatePresence>
              {active && (
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, scale: 0.82, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: -3 }}
                  exit={{ opacity: 0, scale: 0.82, rotate: -5 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <BrowserPreview project={active} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div layout>
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <Row key={p.id} p={p} i={i} onEnter={() => setHovered(i)} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
