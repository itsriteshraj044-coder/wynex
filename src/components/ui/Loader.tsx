import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/** Animated brand loading screen shown on first paint. */
export default function Loader() {
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const dur = 1500;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setCount(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 350);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-white dark:bg-[#070b16]"
          exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
          <div className="bg-mesh absolute inset-0 opacity-60" />
          <div className="relative flex flex-col items-center gap-8">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img src="/logo.png" alt="Wynex Technologies" className="h-28 w-auto dark:brightness-0 dark:invert" width="203" height="112" />
            </motion.div>

            <div className="h-[3px] w-56 overflow-hidden rounded-full bg-ink/10 dark:bg-white/10">
              <motion.div className="h-full bg-brand-gradient" style={{ width: `${count}%` }} />
            </div>
            <span className="font-body text-sm font-semibold tabular-nums text-ink-muted">{count}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
