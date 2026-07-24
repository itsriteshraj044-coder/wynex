import { motion, useScroll, useSpring } from 'framer-motion';

/** Top gradient scroll-progress bar. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[9997] h-1 w-full origin-left bg-brand-gradient"
      aria-hidden="true"
    />
  );
}
