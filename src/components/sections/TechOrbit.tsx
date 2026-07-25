import { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  SiReact, SiTypescript, SiNodedotjs, SiTailwindcss,
  SiNextdotjs, SiPython, SiGraphql, SiDocker, SiFigma, SiMongodb,
} from 'react-icons/si';
import type { IconType } from 'react-icons';

interface Tech { Icon: IconType; color: string; label: string; }

const INNER: Tech[] = [
  { Icon: SiReact, color: '#61DAFB', label: 'React' },
  { Icon: SiTypescript, color: '#3178C6', label: 'TypeScript' },
  { Icon: SiNodedotjs, color: '#539E43', label: 'Node.js' },
  { Icon: SiTailwindcss, color: '#06B6D4', label: 'Tailwind CSS' },
];

const OUTER: Tech[] = [
  { Icon: SiNextdotjs, color: '#0F172A', label: 'Next.js' },
  { Icon: SiPython, color: '#3776AB', label: 'Python' },
  { Icon: SiGraphql, color: '#E10098', label: 'GraphQL' },
  { Icon: SiDocker, color: '#2496ED', label: 'Docker' },
  { Icon: SiFigma, color: '#F24E1E', label: 'Figma' },
  { Icon: SiMongodb, color: '#47A248', label: 'MongoDB' },
];

function Badge({ tech, size }: { tech: Tech; size: string }) {
  const reduced = useReducedMotion();
  const { Icon, color } = tech;
  return (
    <motion.div
      whileHover={{ scale: 1.15 }}
      animate={reduced ? undefined : { y: [0, -5, 0] }}
      transition={{ y: { duration: 3.4, repeat: Infinity, ease: 'easeInOut' } }}
      className="grid place-items-center rounded-2xl border border-white/60 bg-white/80 shadow-card backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06]"
      style={{ width: size, height: size }}
      aria-label={tech.label}
      role="img"
    >
      <Icon style={{ color, fontSize: `calc(${size} * 0.5)` }} />
    </motion.div>
  );
}

/**
 * One orbit ring. `radiusPct` is the badge-centre distance from the middle,
 * as a percentage of the container — identical to the ring outline's radius,
 * so badges always sit exactly on the line at any container size.
 */
function Ring({ techs, radiusPct, duration, reverse, badge }: {
  techs: Tech[]; radiusPct: number; duration: number; reverse?: boolean; badge: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className="absolute inset-0"
      animate={reduced ? undefined : { rotate: reverse ? -360 : 360 }}
      transition={{ duration, ease: 'linear', repeat: Infinity }}
    >
      {techs.map((tech, i) => {
        const theta = (i / techs.length) * Math.PI * 2 - Math.PI / 2; // start at top
        const left = 50 + radiusPct * Math.cos(theta);
        const top = 50 + radiusPct * Math.sin(theta);
        return (
          <div
            key={tech.label}
            className="absolute"
            style={{ left: `${left}%`, top: `${top}%`, transform: 'translate(-50%, -50%)' }}
          >
            {/* counter-rotate keeps each icon upright while the ring spins */}
            <motion.div
              animate={reduced ? undefined : { rotate: reverse ? 360 : -360 }}
              transition={{ duration, ease: 'linear', repeat: Infinity }}
            >
              <Badge tech={tech} size={badge} />
            </motion.div>
          </div>
        );
      })}
    </motion.div>
  );
}

/** Animated orbiting tech-stack icon cluster — the hero's centerpiece. */
function TechOrbit() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[17rem] sm:max-w-[22rem] md:max-w-[28rem] lg:max-w-[36rem] xl:max-w-[42rem]">
      {/* orbit ring outlines — diameters 44% & 78% → radii 22% & 39% */}
      <div className="absolute left-1/2 top-1/2 h-[44%] w-[44%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-indigo/15 dark:border-white/10" />
      <div className="absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-cyan/15 dark:border-white/10" />

      {/* soft ambient glow at centre (no logo/emblem) */}
      <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-gradient opacity-20 blur-3xl sm:h-40 sm:w-40 md:h-48 md:w-48 lg:h-56 lg:w-56" />

      {/* orbiting rings — radii match the outlines exactly. Badge sizes scale
          with viewport width (clamped) so they never overflow on mobile, while
          the clamp ceiling preserves the original 72px/82px look on desktop. */}
      <Ring techs={INNER} radiusPct={22} duration={28} badge="clamp(30px, 8vw, 72px)" />
      <Ring techs={OUTER} radiusPct={39} duration={44} reverse badge="clamp(34px, 9vw, 82px)" />
    </div>
  );
}

export default memo(TechOrbit);
