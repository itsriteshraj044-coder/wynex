import { motion } from 'framer-motion';
import { ArrowUpRight, Play, Star, Sparkles } from 'lucide-react';
import Magnetic from '../ui/Magnetic';
import TechOrbit from './TechOrbit';
import { scrollToId } from '../../utils/scroll';
import { useModal } from '../../context/ModalContext';

const words = ['Websites.', 'Apps.', 'Software.', 'AI Products.'];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const rise = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const { openModal } = useModal();
  return (
    <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16">
      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-2xl">
          <motion.div variants={rise}>
            <span className="eyebrow">
              <Sparkles className="h-3.5 w-3.5" />
              Award-winning digital product studio
            </span>
          </motion.div>

          <motion.h1
            variants={rise}
            className="mt-6 text-balance font-heading text-5xl font-bold leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-7xl dark:text-white"
          >
            We design & build
            <br />
            award-winning{' '}
            <span className="relative inline-block">
              <FlipWords />
            </span>
          </motion.h1>

          <motion.p variants={rise} className="mt-7 max-w-xl text-lg leading-relaxed text-ink-muted sm:text-xl dark:text-slate-300">
            Wynex Technologies partners with ambitious brands to craft high-performance
            websites, mobile apps, custom software, and AI solutions — engineered for
            scale and obsessed over for craft.
          </motion.p>

          <motion.div variants={rise} className="mt-9 flex flex-wrap items-center gap-4">
            <Magnetic>
              <button onClick={openModal} className="btn-primary">
                Start your project <ArrowUpRight className="h-4 w-4" />
              </button>
            </Magnetic>
            <a href="#work" onClick={(e) => { e.preventDefault(); scrollToId('#work'); }} className="btn-ghost">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-gradient text-white"><Play className="h-3 w-3 fill-current" /></span>
              View our work
            </a>
          </motion.div>

          <motion.div variants={rise} className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2.5">
                {[
                  '1656221009909-4f202547cd94',
                  '1656236607879-cd489955e17b',
                  '1724225618359-a1d2763326f9',
                  '1768221677463-191fc4e15690',
                ].map((id) => (
                  <img key={id} src={`https://images.unsplash.com/photo-${id}?w=80&h=80&q=60&auto=format&fit=crop&crop=faces`} alt="" className="h-9 w-9 rounded-full border-2 border-white object-cover dark:border-[#0d1424]" loading="lazy" />
                ))}
              </div>
              <div className="text-sm">
                <div className="flex items-center gap-0.5 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
                </div>
                <p className="font-semibold text-ink dark:text-white">320+ products shipped</p>
              </div>
            </div>
            <div className="h-10 w-px bg-ink/10 dark:bg-white/10" />
            <div className="text-sm">
              <p className="text-2xl font-extrabold text-ink dark:text-white">98%</p>
              <p className="text-ink-muted dark:text-slate-400">Client retention</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Animated tech-stack orbit */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="relative"
        >
          <TechOrbit />
        </motion.div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex">
        <span className="text-xs font-medium uppercase tracking-widest text-ink-muted dark:text-slate-500">Scroll</span>
        <div className="flex h-9 w-5 justify-center rounded-full border border-ink/20 p-1 dark:border-white/20">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.6, repeat: Infinity }} className="h-1.5 w-1.5 rounded-full bg-brand-indigo" />
        </div>
      </div>
    </section>
  );
}

function FlipWords() {
  return (
    <span className="relative inline-grid">
      {words.map((w, i) => (
        <motion.span
          key={w}
          className="text-gradient animate-gradient-x col-start-1 row-start-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: [0, 1, 1, 0], y: [20, 0, 0, -20] }}
          transition={{ duration: 3.2, times: [0, 0.1, 0.85, 1], repeat: Infinity, delay: i * 3.2, repeatDelay: words.length * 3.2 - 3.2 }}
        >
          {w}
        </motion.span>
      ))}
      <span className="invisible">AI Products.</span>
    </span>
  );
}
