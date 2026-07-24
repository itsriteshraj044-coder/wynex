import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import Marquee from '../ui/Marquee';
import { TECHNOLOGIES } from '../../constants/content';

export default function Technologies() {
  const half = Math.ceil(TECHNOLOGIES.length / 2);
  const rowA = TECHNOLOGIES.slice(0, half);
  const rowB = TECHNOLOGIES.slice(half);

  return (
    <section id="technologies" className="relative overflow-hidden py-24 lg:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Our stack"
          title="Cutting-edge technologies,"
          highlight="chosen with intent."
          subtitle="We pick the right tool for your goals — proven, modern and built to last."
        />
      </div>

      <div className="mt-14 flex flex-col gap-5">
        {[rowA, rowB].map((row, ri) => (
          <Marquee key={ri} reverse={ri % 2 === 1} speed={36 + ri * 6}>
            {row.map((t) => (
              <TechChip key={t.name} name={t.name} color={t.color} />
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  );
}

function TechChip({ name, color }: { name: string; color: string }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="mx-3 flex items-center gap-3 whitespace-nowrap rounded-2xl border border-white/60 bg-white/70 px-6 py-4 shadow-card backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]"
    >
      <span className="grid h-9 w-9 place-items-center rounded-xl text-sm font-extrabold text-white" style={{ background: color }}>
        {name.charAt(0)}
      </span>
      <span className="text-lg font-bold text-ink dark:text-white">{name}</span>
    </motion.div>
  );
}
