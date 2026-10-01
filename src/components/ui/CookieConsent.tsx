import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie } from 'lucide-react';
import { getConsent, setConsent, OPEN_CONSENT_EVENT } from '../../utils/analytics';
import type { ConsentChoice } from '../../utils/analytics';

/**
 * Asks once whether analytics cookies may be used and remembers the answer.
 * Until the visitor accepts, Google Analytics runs in cookieless consent mode
 * (see index.html). The footer's "Cookie settings" reopens it.
 */
export default function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Let the page settle first so the banner doesn't compete with the loader.
    const t = setTimeout(() => setOpen(getConsent() === null), 1500);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => {
      clearTimeout(t);
      window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
    };
  }, []);

  const choose = (choice: ConsentChoice) => {
    setConsent(choice);
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-md rounded-3xl border border-white/60 bg-white/95 p-5 shadow-glow backdrop-blur-xl sm:left-6 sm:right-auto sm:mx-0 dark:border-white/10 dark:bg-[#0d1424]/95"
        >
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-brand-indigo/10 text-brand-indigo">
              <Cookie className="h-5 w-5" />
            </span>
            <div>
              <p className="font-semibold text-ink dark:text-white">Can we use analytics cookies?</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted dark:text-slate-400">
                We use Google Analytics to see which pages are useful so we can improve the site. No ads, and we never sell
                your data. See our <Link to="/cookies" className="font-semibold text-brand-indigo underline-offset-2 hover:underline dark:text-brand-iris">Cookie Policy</Link>.
              </p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              onClick={() => choose('denied')}
              className="rounded-full border border-ink/15 px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-ink/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo dark:border-white/15 dark:text-white dark:hover:border-white/30"
            >
              Reject
            </button>
            <button
              onClick={() => choose('granted')}
              className="rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-indigo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo focus-visible:ring-offset-2 dark:bg-white dark:text-ink dark:hover:bg-brand-indigo dark:hover:text-white"
            >
              Accept
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
