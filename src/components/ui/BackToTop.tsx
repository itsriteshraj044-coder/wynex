import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket } from 'lucide-react';

/** Floating rocket that returns the user to the top with a launch animation. */
export default function BackToTop() {
  const [show, setShow] = useState(false);
  const [launching, setLaunching] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toTop = () => {
    setLaunching(true);
    const lenis = (window as unknown as { __lenis?: { scrollTo: (v: number, o?: object) => void } }).__lenis;
    if (lenis) lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setLaunching(false), 900);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          onClick={toTop}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          className="fixed bottom-6 right-6 z-[60] grid h-14 w-14 place-items-center rounded-full bg-ink text-white shadow-glow dark:bg-white dark:text-ink"
        >
          <motion.span animate={launching ? { y: -60, opacity: 0 } : { y: 0, opacity: 1 }} transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}>
            <Rocket className="h-6 w-6 -rotate-45" />
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
