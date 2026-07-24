import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { TESTIMONIALS } from '../../constants/content';

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const count = TESTIMONIALS.length;

  const go = useCallback((d: number) => {
    setDir(d);
    setIndex((i) => (i + d + count) % count);
  }, [count]);

  useEffect(() => {
    const id = setInterval(() => go(1), 6000);
    return () => clearInterval(id);
  }, [go]);

  const t = TESTIMONIALS[index];

  return (
    <section id="testimonials" className="relative overflow-hidden py-24 lg:py-32">
      <div className="container-x">
        <SectionHeading eyebrow="Client love" title="Words from the teams" highlight="we build with." />

        <div className="relative mx-auto mt-14 max-w-4xl">
          <Quote className="absolute -left-2 -top-6 h-16 w-16 text-brand-indigo/10 dark:text-brand-indigo/20" />
          <div className="min-h-[22rem] sm:min-h-[18rem]">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.blockquote
                key={t.id}
                custom={dir}
                initial={{ opacity: 0, x: dir * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -60 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-4xl border border-white/60 bg-white/70 p-8 shadow-card backdrop-blur-xl sm:p-12 dark:border-white/10 dark:bg-white/[0.04]"
              >
                <div className="mb-5 flex gap-1 text-amber-500">
                  {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                </div>
                <p className="text-balance text-xl font-medium leading-relaxed text-ink sm:text-2xl dark:text-white">
                  "{t.quote}"
                </p>
                <footer className="mt-8 flex items-center gap-4">
                  <img src={t.avatar} alt={t.name} className="h-14 w-14 rounded-full border-2 border-white object-cover shadow-md dark:border-white/10" loading="lazy" />
                  <div>
                    <p className="font-bold text-ink dark:text-white">{t.name}</p>
                    <p className="text-sm text-ink-muted dark:text-slate-400">{t.role}, {t.company}</p>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button onClick={() => go(-1)} aria-label="Previous testimonial" className="grid h-11 w-11 place-items-center rounded-full border border-ink/10 bg-white/60 text-ink transition-colors hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDir(i > index ? 1 : -1); setIndex(i); }}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${i === index ? 'w-8 bg-brand-gradient' : 'w-2 bg-ink/15 dark:bg-white/20'}`}
                />
              ))}
            </div>
            <button onClick={() => go(1)} aria-label="Next testimonial" className="grid h-11 w-11 place-items-center rounded-full border border-ink/10 bg-white/60 text-ink transition-colors hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
