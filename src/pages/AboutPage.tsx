import { motion } from 'framer-motion';
import { MapPin, BadgeCheck } from 'lucide-react';
import Seo from '../components/ui/Seo';
import PageHero from '../components/ui/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import CtaBanner from '../components/sections/CtaBanner';
import { ABOUT_STORY, MISSION, VISION, VALUES, WORKING_WITH_US } from '../constants/pages';
import type { Value } from '../constants/pages';
import { SITE } from '../constants/site';

export default function AboutPage() {
  return (
    <>
      <Seo
        title="About Us — Wynex Technologies"
        description="Wynex Technologies is an MSME-registered software development company in Patna, Bihar, building websites, mobile apps and custom software for businesses in India and abroad."
        path="/about"
      />
      <PageHero
        page="About Us"
        eyebrow="About Wynex"
        title="We build software that"
        highlight="moves businesses forward."
        subtitle="A design-and-engineering team from Patna, helping startups and growing businesses turn ideas into products people love to use."
      />

      {/* Story */}
      <section className="relative py-16 lg:py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-4xl border border-white/60 shadow-glow dark:border-white/10"
          >
            <img
              src="https://images.unsplash.com/photo-1716703742352-0bbdb45f505b?auto=format&fit=crop&w=1000&q=70"
              alt="The Wynex Technologies team collaborating on a project"
              className="h-[26rem] w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-x-4 bottom-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-ink backdrop-blur dark:bg-[#0d1424]/90 dark:text-white">
                <MapPin className="h-3.5 w-3.5 text-brand-indigo" /> Patna, Bihar
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-ink backdrop-blur dark:bg-[#0d1424]/90 dark:text-white">
                <BadgeCheck className="h-3.5 w-3.5 text-brand-indigo" /> MSME Registered
              </span>
            </div>
          </motion.div>

          <div>
            <SectionHeading align="left" eyebrow="Our story" title="Design and engineering," highlight="under one roof." />
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-muted dark:text-slate-300">
              {ABOUT_STORY.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & vision */}
      <section className="relative py-12 lg:py-16">
        <div className="container-x grid gap-6 md:grid-cols-2">
          {[MISSION, VISION].map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-4xl border border-white/60 bg-white/70 p-8 shadow-card backdrop-blur-xl sm:p-10 dark:border-white/10 dark:bg-white/[0.04]"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-gradient text-white">
                <m.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-6 text-2xl font-bold dark:text-white">{m.title}</h3>
              <p className="mt-3 text-lg leading-relaxed text-ink-muted dark:text-slate-300">{m.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="relative py-16 lg:py-24">
        <div className="container-x">
          <SectionHeading eyebrow="What we stand for" title="The values behind" highlight="every project." />
          <CardGrid items={VALUES} />
        </div>
      </section>

      {/* Working with us */}
      <section className="relative py-16 lg:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Working with us"
            title="What you can expect"
            highlight="from day one."
            subtitle={`Whether you're down the road in Patna or on the other side of the world, here's how we work with every client. Questions? Write to ${SITE.email}.`}
          />
          <CardGrid items={WORKING_WITH_US} columns="lg:grid-cols-4" />
        </div>
      </section>

      <WhyChooseUs />
      <CtaBanner title="Let’s build something together." />
    </>
  );
}

function CardGrid({ items, columns = 'lg:grid-cols-3' }: { items: Value[]; columns?: string }) {
  return (
    <div className={`mt-12 grid gap-5 sm:grid-cols-2 ${columns}`}>
      {items.map((v, i) => (
        <motion.div
          key={v.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: Math.min(i * 0.06, 0.3), duration: 0.5 }}
          className="group rounded-3xl border border-white/60 bg-white/70 p-6 shadow-card backdrop-blur-xl transition-colors hover:border-brand-indigo/30 dark:border-white/10 dark:bg-white/[0.04]"
        >
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-indigo/10 text-brand-indigo transition-colors duration-300 group-hover:bg-brand-gradient group-hover:text-white">
            <v.icon className="h-6 w-6" />
          </span>
          <h3 className="mt-5 text-lg font-bold dark:text-white">{v.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted dark:text-slate-400">{v.text}</p>
        </motion.div>
      ))}
    </div>
  );
}
