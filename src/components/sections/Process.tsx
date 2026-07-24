import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { PROCESS } from '../../constants/content';
import { PROCESS_VECTORS } from './ProcessVectors';
import { cn } from '../../utils/cn';

export default function Process() {
  const [active, setActive] = useState(0);
  const total = PROCESS.length;

  // Auto-advance; resets on every change (manual click or auto tick).
  useEffect(() => {
    const t = setTimeout(() => setActive((a) => (a + 1) % total), 5200);
    return () => clearTimeout(t);
  }, [active, total]);

  const step = PROCESS[active];
  const Vector = PROCESS_VECTORS[active];

  return (
    <section id="process" className="relative py-24 lg:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="How We Work"
          title="A Proven Process From"
          highlight="Idea To Impact."
          subtitle="Transparent, collaborative and relentlessly focused on outcomes — click any step to explore it."
        />

        <div className="mx-auto mt-14 grid max-w-4xl gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)] lg:items-center lg:gap-8">
          {/* Left — interactive step rail */}
          <div className="flex flex-col">
            {PROCESS.map((s, i) => {
              const isActive = i === active;
              const done = i < active;
              const last = i === total - 1;
              return (
                <button
                  key={s.number}
                  onClick={() => setActive(i)}
                  aria-current={isActive}
                  className="group flex w-full gap-4 text-left"
                >
                  {/* icon + connector */}
                  <div className="flex flex-col items-center">
                    <motion.span
                      animate={{ scale: isActive ? 1.1 : 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className={cn(
                        'grid h-12 w-12 shrink-0 place-items-center rounded-2xl transition-colors duration-300',
                        isActive
                          ? 'bg-brand-gradient text-white shadow-glow'
                          : done
                            ? 'bg-brand-indigo/15 text-brand-indigo'
                            : 'bg-ink/5 text-ink-muted dark:bg-white/5 dark:text-slate-500'
                      )}
                    >
                      <s.icon className="h-5 w-5" />
                    </motion.span>
                    {!last && (
                      <div className="my-1.5 w-[3px] flex-1 overflow-hidden rounded-full bg-ink/10 dark:bg-white/10">
                        <motion.div
                          className="w-full rounded-full bg-brand-gradient"
                          initial={false}
                          animate={{ height: done ? '100%' : '0%' }}
                          transition={{ duration: 0.45, ease: 'easeInOut' }}
                        />
                      </div>
                    )}
                  </div>

                  {/* text */}
                  <div className={cn('flex-1', last ? 'pb-1' : 'pb-8')}>
                    <div className="flex items-center gap-2 pt-2.5">
                      <span className="font-mono text-xs font-bold text-brand-indigo">{s.number}</span>
                      <h3 className={cn(
                        'text-lg font-bold transition-colors',
                        isActive ? 'text-ink dark:text-white' : 'text-ink-muted dark:text-slate-400 group-hover:text-ink dark:group-hover:text-slate-200'
                      )}>
                        {s.title}
                      </h3>
                    </div>
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="pt-1.5 text-sm leading-relaxed text-ink-muted dark:text-slate-400 lg:hidden">{s.description}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right — animated illustration panel */}
          <div>
            <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/70 p-5 shadow-glow backdrop-blur-xl sm:p-6 dark:border-white/10 dark:bg-white/[0.04]">
              <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-brand-gradient opacity-[0.12] blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-brand-cyan/20 blur-3xl" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-bold text-brand-indigo">{step.number}</span>
                  <span className="rounded-full border border-ink/10 bg-white/60 px-3 py-1 text-xs font-semibold text-ink-muted dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
                    Step {active + 1} / {total}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="my-4 grid aspect-[16/9] place-items-center overflow-hidden rounded-2xl border border-white/60 bg-brand-indigo/[0.04] dark:border-white/10 dark:bg-white/[0.03]">
                      <div className="h-full w-full max-w-[15rem] p-3">
                        <Vector />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-ink dark:text-white">{step.title}</h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-muted dark:text-slate-400">{step.description}</p>
                  </motion.div>
                </AnimatePresence>

                {/* progress dots */}
                <div className="mt-6 flex items-center gap-2">
                  {PROCESS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      aria-label={`Go to step ${i + 1}`}
                      className={cn(
                        'h-1.5 rounded-full transition-all duration-300',
                        i === active ? 'w-8 bg-brand-gradient' : 'w-2 bg-ink/15 hover:bg-ink/30 dark:bg-white/20'
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
