import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, Sparkles } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setDone(true);
  };

  return (
    <section className="relative py-16">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2.5rem] border border-white/60 bg-ink px-8 py-12 text-center shadow-glow sm:px-16 sm:py-16 dark:border-white/10"
        >
          <div className="bg-mesh absolute inset-0 opacity-30" aria-hidden="true" />
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-violet/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-brand-cyan/30 blur-3xl" />

          <div className="relative">
            <span className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white">
              <Sparkles className="h-3.5 w-3.5" /> Newsletter
            </span>
            <h2 className="mx-auto max-w-2xl text-balance text-3xl font-bold text-white sm:text-4xl">
              Get product & engineering insights, monthly.
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-white/70">
              Join 12,000+ founders and builders. No spam — just the good stuff. Unsubscribe anytime.
            </p>

            {done ? (
              <p className="mx-auto mt-8 flex w-fit items-center gap-2 rounded-full bg-white/15 px-6 py-3 font-semibold text-white">
                <CheckCircle2 className="h-5 w-5" /> You're subscribed — welcome aboard!
              </p>
            ) : (
              <form onSubmit={submit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  aria-label="Email address"
                  className="flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3.5 text-sm text-white placeholder-white/50 outline-none ring-white/30 backdrop-blur focus:ring-2"
                />
                <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5">
                  Subscribe <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
