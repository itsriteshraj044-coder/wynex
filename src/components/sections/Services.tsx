import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import TiltCard from '../ui/TiltCard';
import { SERVICES, SERVICE_CATEGORIES } from '../../constants/services';
import { scrollToId } from '../../utils/scroll';
import { cn } from '../../utils/cn';

export default function Services() {
  const [active, setActive] = useState<(typeof SERVICE_CATEGORIES)[number]>('All');

  const filtered = useMemo(
    () => (active === 'All' ? SERVICES : SERVICES.filter((s) => s.category === active)),
    [active]
  );

  return (
    <section id="services" className="relative py-24 lg:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="What we do"
          title="End-to-end services to"
          highlight="ship & scale."
          subtitle="From a single landing page to enterprise platforms, one senior team covers your entire product lifecycle."
        />

        {/* Filters */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {SERVICE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={cn(
                'rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 active:scale-95',
                active === cat
                  ? 'bg-ink text-white shadow-glow dark:bg-white dark:text-ink'
                  : 'border border-ink/10 bg-white/60 text-ink-muted hover:text-ink dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:text-white'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((s, i) => (
              <motion.div
                key={s.slug}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.3) }}
              >
                <TiltCard className="group h-full">
                  <div className="flex h-full flex-col rounded-3xl border border-white/60 bg-white/70 p-6 shadow-card backdrop-blur-xl transition-colors hover:border-brand-indigo/30 dark:border-white/10 dark:bg-white/[0.04]">
                    <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-brand-indigo/10 text-brand-indigo transition-all duration-300 group-hover:bg-brand-gradient group-hover:text-white">
                      <s.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-ink dark:text-white">{s.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted dark:text-slate-400">{s.description}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {s.features.map((f) => (
                        <span key={f} className="rounded-full bg-surface-off px-2.5 py-1 text-[11px] font-semibold text-ink-muted dark:bg-white/5 dark:text-slate-400">{f}</span>
                      ))}
                    </div>
                    <button
                      onClick={() => scrollToId('#contact')}
                      className="mt-5 flex items-center gap-1 text-sm font-semibold text-brand-indigo opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    >
                      Get started <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
