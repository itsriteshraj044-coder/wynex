import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import Seo from '../components/ui/Seo';

export default function NotFound() {
  return (
    <>
      <Seo title="404 — Page not found | Wynex Technologies" path="/404" />
      <div className="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="font-heading text-[8rem] font-bold leading-none sm:text-[12rem]"
        >
          <span className="text-gradient animate-gradient-x">404</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-4 max-w-md text-lg text-ink-muted dark:text-slate-400">
          The page you're looking for drifted off into the aurora. Let's get you back on track.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-primary"><Home className="h-4 w-4" /> Back home</Link>
          <button onClick={() => window.history.back()} className="btn-ghost"><ArrowLeft className="h-4 w-4" /> Go back</button>
        </motion.div>
      </div>
    </>
  );
}
