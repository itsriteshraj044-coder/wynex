import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import Seo from '../components/ui/Seo';
import { PAGE_SEO } from '../constants/seo';
import PageHero from '../components/ui/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import Services from '../components/sections/Services';
import Technologies from '../components/sections/Technologies';
import FAQ from '../components/sections/FAQ';
import CtaBanner from '../components/sections/CtaBanner';
import { SERVICE_PILLARS } from '../constants/pages';
import { SERVICES } from '../constants/services';

export default function ServicesPage() {
  return (
    <>
      <Seo {...PAGE_SEO['/services']} path="/services" />
      <PageHero
        page="Services"
        eyebrow="Our services"
        title="Everything you need to"
        highlight="build and grow online."
        subtitle="Websites, mobile apps, business software, cloud, AI, design and marketing — planned, built and supported by one team."
      />

      {/* Service areas in detail */}
      <section className="relative py-16 lg:py-20">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          {SERVICE_PILLARS.map((p, i) => {
            const count = SERVICES.filter((s) => s.category === p.category).length;
            return (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 2) * 0.08, duration: 0.5 }}
                className="flex flex-col rounded-4xl border border-white/60 bg-white/70 p-8 shadow-card backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]"
              >
                <div className="flex items-start gap-4">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-gradient text-white">
                    <p.icon className="h-7 w-7" />
                  </span>
                  <div>
                    <h2 className="text-2xl font-bold dark:text-white">{p.title}</h2>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-brand-indigo">
                      {count} {count === 1 ? 'service' : 'services'}
                    </p>
                  </div>
                </div>
                <p className="mt-5 leading-relaxed text-ink-muted dark:text-slate-300">{p.summary}</p>
                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {p.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm font-medium text-ink dark:text-slate-200">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-indigo" /> {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
                  {p.stack.map((t) => (
                    <span key={t} className="rounded-full bg-surface-off px-2.5 py-1 text-[11px] font-semibold text-ink-muted dark:bg-white/5 dark:text-slate-400">{t}</span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <Services />

      <section className="relative pb-4 pt-8">
        <div className="container-x">
          <SectionHeading
            eyebrow="Not sure where to start?"
            title="Tell us the problem —"
            highlight="we’ll suggest the solution."
            subtitle="Many clients come to us with a goal, not a spec. Share what you want to achieve and we’ll recommend the right mix of services, timeline and budget."
          />
        </div>
      </section>

      <Technologies />
      <FAQ />
      <CtaBanner />
    </>
  );
}
