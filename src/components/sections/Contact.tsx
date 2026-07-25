import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, CheckCircle2, Loader2 } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { SITE } from '../../constants/site';
import { SERVICES } from '../../constants/services';

type Status = 'idle' | 'sending' | 'sent';

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({ name: '', email: '', phone: '', city: '', state: '', service: SERVICES[0].title, message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Please enter your name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!/^[+\d][\d\s-]{7,}$/.test(form.phone.trim())) e.phone = 'Enter a valid phone number';
    if (!form.city.trim()) e.city = 'Please enter your city';
    if (!form.state.trim()) e.state = 'Please enter your state';
    if (form.message.trim().length < 10) e.message = 'Tell us a little more (10+ chars)';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    // Simulated submission — wire to your backend / form service here.
    setTimeout(() => setStatus('sent'), 1500);
  };

  const field = (name: keyof typeof form) => ({
    value: form[name],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [name]: e.target.value })),
  });

  return (
    <section id="contact" className="relative py-24 lg:py-32">
      <div className="container-x">
        <div className="overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/70 shadow-glow backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]">
          <div className="grid lg:grid-cols-[1fr_1.1fr]">
            {/* Left: info + map */}
            <div className="relative flex flex-col justify-between gap-10 bg-brand-gradient p-8 text-white sm:p-12">
              <div>
                <SectionHeading align="left" eyebrow="Get in touch" title="Let's start" highlight="something great." className="[&_h2]:text-white [&_.eyebrow]:border-white/30 [&_.eyebrow]:bg-white/10 [&_.eyebrow]:text-white [&_span.text-gradient]:text-white [&_span.text-gradient]:!bg-none" />
                <p className="mt-4 max-w-md text-white/85">
                  Share your vision and we'll respond within one business day with next steps and a tailored plan.
                </p>
              </div>

              <ul className="space-y-4">
                <li className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-white/15"><Mail className="h-5 w-5" /></span><a href={`mailto:${SITE.email}`} className="font-medium hover:underline">{SITE.email}</a></li>
                <li className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-white/15"><Phone className="h-5 w-5" /></span><a href={`tel:${SITE.phone}`} className="font-medium hover:underline">{SITE.phone}</a></li>
                <li className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-white/15"><MapPin className="h-5 w-5" /></span><span className="font-medium">{SITE.address}</span></li>
              </ul>

              {/* Map placeholder */}
              <div className="relative h-40 overflow-hidden rounded-2xl border border-white/20">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:24px_24px]" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="relative flex h-4 w-4">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                    <span className="relative inline-flex h-4 w-4 rounded-full bg-white" />
                  </span>
                </div>
                <span className="absolute bottom-3 left-3 text-xs font-semibold text-white/80">Patna HQ</span>
              </div>
            </div>

            {/* Right: form */}
            <div className="p-8 sm:p-12">
              {status === 'sent' ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex h-full flex-col items-center justify-center text-center">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-brand-indigo/10 text-brand-indigo">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="mt-5 text-2xl font-bold text-ink dark:text-white">Message sent!</h3>
                  <p className="mt-2 max-w-sm text-ink-muted dark:text-slate-400">Thanks, {form.name.split(' ')[0] || 'there'}. Our team will reach out within one business day.</p>
                </motion.div>
              ) : (
                <form onSubmit={submit} noValidate className="flex flex-col gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full name" id="name" error={errors.name}>
                      <input id="name" {...field('name')} className="input" placeholder="Jane Doe" autoComplete="name" />
                    </Field>
                    <Field label="Email" id="email" error={errors.email}>
                      <input id="email" type="email" {...field('email')} className="input" placeholder="jane@company.com" autoComplete="email" />
                    </Field>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Phone number" id="phone" error={errors.phone}>
                      <input id="phone" type="tel" {...field('phone')} className="input" placeholder="+91 98765 43210" autoComplete="tel" />
                    </Field>
                    <Field label="Service" id="service">
                      <select id="service" {...field('service')} className="input">
                        {SERVICES.map((s) => <option key={s.slug}>{s.title}</option>)}
                      </select>
                    </Field>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="City" id="city" error={errors.city}>
                      <input id="city" {...field('city')} className="input" placeholder="Mumbai" autoComplete="address-level2" />
                    </Field>
                    <Field label="State" id="state" error={errors.state}>
                      <input id="state" {...field('state')} className="input" placeholder="Maharashtra" autoComplete="address-level1" />
                    </Field>
                  </div>
                  <Field label="Tell us about your project" id="message" error={errors.message}>
                    <textarea id="message" {...field('message')} rows={4} className="input resize-none" placeholder="What are you looking to build?" />
                  </Field>

                  <button type="submit" disabled={status === 'sending'} className="btn-primary mt-1 w-full disabled:opacity-70">
                    {status === 'sending' ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : <>Send message <Send className="h-4 w-4" /></>}
                  </button>
                  <p className="text-center text-xs text-ink-muted dark:text-slate-500">We respect your privacy. No spam, ever.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .input {
          width: 100%;
          border-radius: 1rem;
          border: 1px solid rgba(15,23,42,0.10);
          background: rgba(255,255,255,0.7);
          padding: 0.8rem 1rem;
          font-size: 0.9rem;
          color: #0B1020;
          outline: none;
          transition: border-color .2s, box-shadow .2s;
        }
        .input:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.15); }
        .dark .input { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.12); color: #fff; }
      `}</style>
    </section>
  );
}

function Field({ label, id, error, children }: { label: string; id: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-ink dark:text-slate-200">{label}</label>
      {children}
      {error && <span className="text-xs font-medium text-rose-500">{error}</span>}
    </div>
  );
}
