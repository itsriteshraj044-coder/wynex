import { motion } from 'framer-motion';
import { CheckCircle2, Award, Users2, Globe2 } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const highlights = [
  'Senior, product-minded engineers & designers',
  'Transparent weekly delivery with real demos',
  'Design systems that scale with your brand',
  'Performance and accessibility built in, not bolted on',
];

const badges = [
  { icon: Award, label: 'Awwwards calibre', sub: 'Design & motion craft' },
  { icon: Users2, label: '40+ specialists', sub: 'Across 14 countries' },
  { icon: Globe2, label: 'Global delivery', sub: 'US · EU · APAC' },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 lg:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-4xl border border-white/60 shadow-glow dark:border-white/10"
          >
            <img
              src="https://images.unsplash.com/photo-1716703742352-0bbdb45f505b?auto=format&fit=crop&w=1000&q=70"
              alt="The Wynex Technologies team collaborating in a bright modern studio in India"
              className="h-[30rem] w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-t from-brand-indigo/30 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="absolute -bottom-6 -right-4 flex items-center gap-4 rounded-3xl border border-white/60 bg-white/90 p-5 shadow-card backdrop-blur-xl sm:-right-8 dark:border-white/10 dark:bg-[#0d1424]/90"
          >
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-gradient text-white">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-ink dark:text-white">12+ yrs</p>
              <p className="text-sm text-ink-muted dark:text-slate-400">Combined craft</p>
            </div>
          </motion.div>
        </div>

        <div>
          <SectionHeading
            align="left"
            eyebrow="About Wynex"
            title="A studio where engineering"
            highlight="meets artistry."
          />
          <p className="mt-6 text-lg leading-relaxed text-ink-muted dark:text-slate-300">
            Wynex Technologies is a full-service software agency built in India on a simple belief:
            world-class products come from pairing rigorous engineering with obsessive design.
            From ambitious Indian startups to global enterprises, we ship digital experiences that
            perform beautifully and grow revenue.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {highlights.map((h) => (
              <li key={h} className="flex items-start gap-2.5 text-sm font-medium text-ink dark:text-slate-200">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-indigo" />
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {badges.map((b) => (
              <div key={b.label} className="rounded-2xl border border-ink/5 bg-white/60 p-4 backdrop-blur dark:border-white/10 dark:bg-white/5">
                <b.icon className="h-6 w-6 text-brand-violet" />
                <p className="mt-2 text-sm font-bold text-ink dark:text-white">{b.label}</p>
                <p className="text-xs text-ink-muted dark:text-slate-400">{b.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
