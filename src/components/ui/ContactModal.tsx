import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Loader2, Mail, Phone } from 'lucide-react';
import { SITE } from '../../constants/site';
import { SERVICES } from '../../constants/services';

export default function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [form, setForm] = useState({ name: '', email: '', phone: '', city: '', state: '', service: SERVICES[0].title, message: '' });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setTimeout(() => {
        onClose();
        setStatus('idle');
        setForm({ name: '', email: '', phone: '', city: '', state: '', service: SERVICES[0].title, message: '' });
      }, 3000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm dark:bg-[#070b16]/80"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/60 bg-white shadow-2xl dark:border-white/10 dark:bg-[#0d1424]"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 grid h-8 w-8 place-items-center rounded-full bg-ink/5 text-ink transition-colors hover:bg-ink/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="p-8 sm:p-10">
              {status === 'sent' ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <span className="mb-6 grid h-16 w-16 place-items-center rounded-full bg-brand-indigo/10 text-brand-indigo">
                    <CheckCircle2 className="h-8 w-8" />
                  </span>
                  <h3 className="text-2xl font-bold text-ink dark:text-white">Message sent!</h3>
                  <p className="mt-2 text-ink-muted dark:text-slate-400">We will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={submit} className="flex flex-col gap-5">
                  <div>
                    <h2 className="text-2xl font-bold text-ink dark:text-white">Let's build something.</h2>
                    <p className="mt-2 text-sm text-ink-muted dark:text-slate-400">Fill out the form below or reach us directly.</p>
                  </div>
                  <div className="mt-2 flex flex-col gap-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="sr-only">Name</label>
                        <input
                          required
                          placeholder="Your name"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full rounded-xl border border-ink/10 bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-brand-indigo dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-brand-indigo"
                        />
                      </div>
                      <div>
                        <label className="sr-only">Email</label>
                        <input
                          required
                          type="email"
                          placeholder="Your email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full rounded-xl border border-ink/10 bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-brand-indigo dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-brand-indigo"
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="sr-only">Phone</label>
                        <input
                          required
                          type="tel"
                          placeholder="Phone number"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full rounded-xl border border-ink/10 bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-brand-indigo dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-brand-indigo"
                        />
                      </div>
                      <div>
                        <label className="sr-only">Service</label>
                        <select
                          required
                          value={form.service}
                          onChange={(e) => setForm({ ...form, service: e.target.value })}
                          className="w-full rounded-xl border border-ink/10 bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-brand-indigo dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-brand-indigo"
                        >
                          {SERVICES.map((s) => <option key={s.slug} value={s.title}>{s.title}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="sr-only">City</label>
                        <input
                          required
                          placeholder="City"
                          value={form.city}
                          onChange={(e) => setForm({ ...form, city: e.target.value })}
                          className="w-full rounded-xl border border-ink/10 bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-brand-indigo dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-brand-indigo"
                        />
                      </div>
                      <div>
                        <label className="sr-only">State</label>
                        <input
                          required
                          placeholder="State"
                          value={form.state}
                          onChange={(e) => setForm({ ...form, state: e.target.value })}
                          className="w-full rounded-xl border border-ink/10 bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-brand-indigo dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-brand-indigo"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="sr-only">Message</label>
                      <textarea
                        required
                        rows={3}
                        placeholder="How can we help?"
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full resize-none rounded-xl border border-ink/10 bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-brand-indigo dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-brand-indigo"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-primary mt-2 w-full justify-center"
                  >
                    {status === 'sending' ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</> : 'Send Message'}
                  </button>
                  <div className="mt-4 flex flex-col items-center gap-2 text-xs text-ink-muted sm:flex-row sm:justify-center sm:gap-6 dark:text-slate-400">
                    <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> {SITE.email}</span>
                    <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> {SITE.phone}</span>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
