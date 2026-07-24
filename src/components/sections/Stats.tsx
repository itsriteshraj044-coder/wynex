import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { STATS } from '../../constants/content';

export default function Stats() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });

  return (
    <section ref={ref} className="relative py-16">
      <div className="container-x">
        <div className="grid grid-cols-2 gap-4 rounded-4xl border border-white/60 bg-white/60 p-8 shadow-card backdrop-blur-xl sm:p-10 lg:grid-cols-4 dark:border-white/10 dark:bg-white/[0.04]">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <p className="font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">
                <span className="text-gradient">
                  {inView ? <CountUp end={s.value} duration={2.2} separator="," /> : 0}
                  {s.suffix}
                </span>
              </p>
              <p className="mt-1.5 text-sm font-medium text-ink-muted dark:text-slate-400">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
