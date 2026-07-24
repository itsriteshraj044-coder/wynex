import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface Props {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function SectionHeading({ eyebrow, title, highlight, subtitle, align = 'center', className }: Props) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      className={cn('flex flex-col gap-4', align === 'center' ? 'items-center text-center' : 'items-start text-left', className)}
    >
      {eyebrow && (
        <motion.span variants={item} className="eyebrow">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-indigo" />
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        variants={item}
        className="max-w-4xl text-balance text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl dark:text-white"
      >
        {title}{' '}
        {highlight && <span className="text-gradient animate-gradient-x">{highlight}</span>}
      </motion.h2>
      {subtitle && (
        <motion.p variants={item} className="max-w-2xl text-lg leading-relaxed text-ink-muted dark:text-slate-400">
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
