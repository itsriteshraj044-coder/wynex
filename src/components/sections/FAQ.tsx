import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { FAQS } from '../../constants/content';

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 lg:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading align="left" eyebrow="FAQ" title="Questions," highlight="answered." subtitle="Everything you need to know before starting. Still curious? Just ask our team." />
        </div>

        <div className="flex flex-col gap-3">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-3xl border border-white/60 bg-white/70 backdrop-blur-xl transition-colors dark:border-white/10 dark:bg-white/[0.04]"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg font-bold text-ink dark:text-white">{faq.question}</span>
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-indigo/10 text-brand-indigo transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="px-6 pb-6 text-sm leading-relaxed text-ink-muted dark:text-slate-400">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
