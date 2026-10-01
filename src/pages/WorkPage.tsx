import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Seo from '../components/ui/Seo';
import { PAGE_SEO } from '../constants/seo';
import PageHero from '../components/ui/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import Work from '../components/sections/Work';
import CtaBanner from '../components/sections/CtaBanner';
import { PROJECTS } from '../constants/content';

export default function WorkPage() {
  return (
    <>
      <Seo {...PAGE_SEO['/work']} path="/work" />
      <PageHero
        page="Work"
        eyebrow="Our work"
        title="Projects we’re"
        highlight="proud to have built."
        subtitle="Websites, web apps and mobile apps for businesses and creators — each one designed, engineered and launched by our team."
      />

      <Work />

      {/* Every project at a glance */}
      <section className="relative py-16 lg:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="At a glance"
            title="Every project,"
            highlight="side by side."
            subtitle="What each project is, who it was for, and the technology we used to build it."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((p, i) => {
              const cover = Array.isArray(p.image) ? p.image[0] : p.image;
              return (
                <motion.article
                  key={p.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min((i % 3) * 0.08, 0.2), duration: 0.5 }}
                  className="group flex flex-col overflow-hidden rounded-4xl border border-white/60 bg-white/70 shadow-card backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-surface-off dark:bg-white/5">
                    <img
                      src={cover}
                      alt={`${p.title} — ${p.category} project by Wynex Technologies`}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink backdrop-blur dark:bg-[#0d1424]/90 dark:text-white">
                      {p.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-bold dark:text-white">{p.title}</h3>
                    <p className="mt-0.5 text-sm font-medium text-brand-indigo dark:text-brand-iris">{p.client}</p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted dark:text-slate-400">{p.description}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span key={t} className="rounded-full bg-surface-off px-2.5 py-1 text-[11px] font-semibold text-ink-muted dark:bg-white/5 dark:text-slate-400">{t}</span>
                      ))}
                    </div>
                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-indigo hover:underline dark:text-brand-iris"
                      >
                        Visit live site <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBanner title="Want your project here next?" text="Tell us what you’re building. We’ll share relevant work, a clear plan and a fixed quote." />
    </>
  );
}
