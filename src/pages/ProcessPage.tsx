import { motion } from 'framer-motion';
import { CheckCircle2, Clock, PackageCheck } from 'lucide-react';
import Seo from '../components/ui/Seo';
import { PAGE_SEO } from '../constants/seo';
import SectionHeading from '../components/ui/SectionHeading';
import Process from '../components/sections/Process';
import CtaBanner from '../components/sections/CtaBanner';
import { PROCESS } from '../constants/content';
import { PROCESS_DETAILS, ENGAGEMENT_MODELS } from '../constants/pages';

export default function ProcessPage() {
  return (
    <>
      <Seo {...PAGE_SEO['/process']} path="/process" />

      {/* The interactive process doubles as the page intro, so it gets room under the navbar. */}
      <div className="pt-12">
        <Process />
      </div>

      {/* Step-by-step detail */}
      <section className="relative py-16 lg:py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Step by step" title="What happens at" highlight="each stage." />
          <div className="mx-auto mt-12 flex max-w-5xl flex-col gap-6">
            {PROCESS.map((step) => {
              const d = PROCESS_DETAILS.find((x) => x.number === step.number);
              if (!d) return null;
              return (
                <motion.article
                  key={step.number}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5 }}
                  className="grid gap-6 rounded-4xl border border-white/60 bg-white/70 p-7 shadow-card backdrop-blur-xl sm:p-9 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] dark:border-white/10 dark:bg-white/[0.04]"
                >
                  <div>
                    <div className="flex items-center gap-4">
                      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-gradient text-white">
                        <step.icon className="h-6 w-6" />
                      </span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-brand-indigo">Step {step.number}</p>
                        <h3 className="text-2xl font-bold dark:text-white">{step.title}</h3>
                      </div>
                    </div>
                    <p className="mt-5 leading-relaxed text-ink-muted dark:text-slate-300">{d.intro}</p>
                    <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-indigo/10 px-3.5 py-1.5 text-xs font-semibold text-brand-indigo dark:bg-brand-indigo/20 dark:text-brand-iris">
                      <Clock className="h-3.5 w-3.5" /> Typical time: {d.duration}
                    </p>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <List title="What we do" items={d.activities} icon={<CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-indigo" />} />
                    <List title="What you get" items={d.deliverables} icon={<PackageCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-violet" />} />
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Engagement models */}
      <section className="relative py-16 lg:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Ways to work together"
            title="Pick the model that"
            highlight="fits your project."
            subtitle="Every engagement follows the same process — the difference is how scope and billing are set up."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {ENGAGEMENT_MODELS.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="flex flex-col rounded-4xl border border-white/60 bg-white/70 p-8 shadow-card backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-indigo/10 text-brand-indigo">
                  <m.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-xl font-bold dark:text-white">{m.title}</h3>
                <p className="mt-1 text-sm font-medium text-brand-indigo dark:text-brand-iris">Best for: {m.bestFor}</p>
                <ul className="mt-5 space-y-2.5">
                  {m.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-sm text-ink-muted dark:text-slate-300">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-indigo" /> {pt}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner title="Ready to start step one?" text="Book a free discovery call. We’ll understand your goals and send a clear scope, timeline and fixed quote." />
    </>
  );
}

function List({ title, items, icon }: { title: string; items: string[]; icon: React.ReactNode }) {
  return (
    <div>
      <p className="text-sm font-bold uppercase tracking-wider text-ink dark:text-white">{title}</p>
      <ul className="mt-3 space-y-2.5">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-2 text-sm text-ink-muted dark:text-slate-300">
            {icon} {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
