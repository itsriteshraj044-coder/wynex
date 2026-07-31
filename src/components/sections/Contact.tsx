import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, MapPin, Phone, ArrowRight, CheckCircle2, Loader2, AlertCircle, ChevronDown } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { SITE } from '../../constants/site';
import { SERVICES } from '../../constants/services';

type Status = 'idle' | 'sending' | 'sent';

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({ name: '', email: '', phone: '', city: '', state: '', service: SERVICES[0].title, message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const reduceMotion = useReducedMotion();

  const errorList = Object.values(errors).filter(Boolean);

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
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((f) => ({ ...f, [name]: e.target.value }));
      // Clear the error as soon as the user starts fixing the field.
      setErrors((prev) => (prev[name] ? { ...prev, [name]: '' } : prev));
    },
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
                <li className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-white/15"><Phone className="h-5 w-5" /></span><a href={`tel:${SITE.phoneAlt}`} className="font-medium hover:underline">{SITE.phoneAlt}</a></li>
                <li className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-white/15"><MapPin className="h-5 w-5" /></span><span className="font-medium">{SITE.address}</span></li>
              </ul>

              {/* HQ map */}
              <div className="group relative h-56 overflow-hidden rounded-2xl border border-white/20 shadow-lg">
                <iframe
                  title={`Map showing ${SITE.name} HQ at ${SITE.address}`}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(SITE.address)}&z=15&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full border-0 grayscale-[35%] contrast-[1.05] transition-[filter] duration-500 group-hover:grayscale-0"
                />

                {/* Blinking HQ pointer — sits over the map centre, never blocks map gestures */}
                <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
                  <span className="relative flex h-5 w-5 items-center justify-center">
                    <span className="absolute h-full w-full animate-ping rounded-full bg-brand-indigo opacity-75" />
                    <span className="absolute h-full w-full animate-pulse rounded-full bg-brand-indigo/40" />
                    <span className="relative grid h-5 w-5 place-items-center rounded-full bg-brand-indigo ring-2 ring-white shadow-lg">
                      <MapPin className="h-3 w-3 text-white" />
                    </span>
                  </span>
                  <span className="mx-auto block h-3 w-px bg-white/70" />
                </div>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-black/75"
                >
                  <MapPin className="h-3.5 w-3.5" /> Patna HQ — open in Maps
                </a>
              </div>
            </div>

            {/* Right: form */}
            <div className="relative p-8 sm:p-12">
              {/* Soft brand glow behind the glass form */}
              <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand-violet/20 blur-3xl" />
              <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-brand-cyan/15 blur-3xl" />

              {status === 'sent' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                  className="relative flex h-full min-h-[26rem] flex-col items-center justify-center text-center"
                >
                  <span className="relative grid h-20 w-20 place-items-center rounded-full bg-brand-indigo/10 text-brand-indigo">
                    <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-brand-indigo/20" />
                    <CheckCircle2 className="relative h-10 w-10" />
                  </span>
                  <h3 className="mt-6 text-2xl font-bold text-ink dark:text-white">Message sent!</h3>
                  <p className="mt-2 max-w-sm text-ink-muted dark:text-slate-400">
                    Thanks, {form.name.split(' ')[0] || 'there'}. Our team will reach out within one business day.
                  </p>
                </motion.div>
              ) : (
                /*
                 * Conversational form: the fields are inline blanks inside a
                 * sentence. Each one still carries a real (screen-reader only)
                 * label, so the prose is decoration — not the accessible name.
                 */
                <form onSubmit={submit} noValidate className="relative">
                  <p className="text-xl font-medium leading-[2.4] text-ink dark:text-slate-200 sm:text-2xl sm:leading-[2.5]">
                    Hi Wynex, I'm{' '}
                    <Blank id="name" label="Your name" placeholder="your name" autoComplete="name" error={errors.name} {...field('name')} />
                    {' '}from{' '}
                    <Blank id="city" label="Your city" placeholder="city" autoComplete="address-level2" error={errors.city} {...field('city')} />
                    ,{' '}
                    <Blank id="state" label="Your state" placeholder="state" autoComplete="address-level1" error={errors.state} {...field('state')} />
                    .
                  </p>

                  <p className="mt-6 text-xl font-medium leading-[2.4] text-ink dark:text-slate-200 sm:text-2xl sm:leading-[2.5]">
                    I need help with{' '}
                    <BlankSelect id="service" label="Service you need" value={form.service} onChange={field('service').onChange}>
                      {SERVICES.map((s) => <option key={s.slug} value={s.title}>{s.title}</option>)}
                    </BlankSelect>
                    . You can reach me at{' '}
                    <Blank id="email" label="Your email address" type="email" placeholder="your@email.com" autoComplete="email" error={errors.email} {...field('email')} />
                    {' '}or{' '}
                    <Blank id="phone" label="Your phone number" type="tel" placeholder="phone number" autoComplete="tel" error={errors.phone} {...field('phone')} />
                    .
                  </p>

                  <div className="mt-8">
                    <label htmlFor="message" className="text-xl font-medium text-ink dark:text-slate-200 sm:text-2xl">
                      Here's what I have in mind:
                    </label>
                    <textarea
                      id="message"
                      {...field('message')}
                      rows={4}
                      aria-invalid={errors.message ? true : undefined}
                      className={`blank-area mt-3 ${errors.message ? 'blank--error' : ''}`}
                      placeholder="A short description of the project, timeline and budget…"
                    />
                  </div>

                  {errorList.length > 0 && (
                    <motion.div
                      initial={reduceMotion ? false : { opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      role="alert"
                      className="mt-6 rounded-2xl border border-rose-500/25 bg-rose-500/[0.07] p-4"
                    >
                      <p className="flex items-center gap-2 text-sm font-semibold text-rose-600 dark:text-rose-400">
                        <AlertCircle className="h-4 w-4 shrink-0" /> A few blanks still need attention
                      </p>
                      <ul className="mt-2 space-y-1 pl-6 text-sm text-rose-600/90 dark:text-rose-400/90">
                        {errorList.map((msg) => <li key={msg} className="list-disc">{msg}</li>)}
                      </ul>
                    </motion.div>
                  )}

                  <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <motion.button
                      type="submit"
                      disabled={status === 'sending'}
                      whileHover={reduceMotion ? undefined : { x: 3 }}
                      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-ink px-7 py-4 text-base font-semibold text-white transition-colors duration-200 hover:bg-brand-indigo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-ink dark:hover:bg-brand-indigo dark:hover:text-white dark:focus-visible:ring-offset-ink"
                    >
                      {status === 'sending' ? (
                        <><Loader2 className="h-5 w-5 animate-spin" /> Sending…</>
                      ) : (
                        <>Let's talk <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" /></>
                      )}
                    </motion.button>
                    <p className="text-sm text-ink-muted dark:text-slate-500">We reply within one business day. No spam, ever.</p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Inline blanks — underlined words inside the sentence, not boxes */
        .blank {
          max-width: 100%;
          background: transparent;
          border: 0;
          border-bottom: 2px dashed rgba(79,70,229,0.4);
          padding: 0 0.35rem 0.15rem;
          font: inherit;
          font-weight: 600;
          color: #4F46E5;
          outline: none;
          transition: border-color .2s ease, color .2s ease, background-size .25s ease;
          background-image: linear-gradient(90deg, #4F46E5, #8B5CF6, #38BDF8);
          background-repeat: no-repeat;
          background-position: 0 100%;
          background-size: 0% 2px;
        }
        .blank::placeholder { color: rgba(71,85,105,0.5); font-weight: 500; }
        .blank:hover { border-bottom-color: rgba(79,70,229,0.7); }
        .blank:not(:placeholder-shown) { border-bottom-style: solid; }
        /* Focus paints a gradient underline that grows out from the left */
        .blank:focus {
          border-bottom-color: transparent;
          background-size: 100% 2px;
        }
        .blank--error {
          border-bottom-color: #F43F5E;
          border-bottom-style: solid;
          color: #F43F5E;
        }
        .blank--error::placeholder { color: rgba(244,63,94,0.6); }

        .blank--select {
          appearance: none;
          -webkit-appearance: none;
          padding-right: 1.5rem;
          cursor: pointer;
          border-bottom-style: solid;
        }
        .blank--select option { color: #0B1020; font-size: 1rem; font-weight: 500; }

        /* Project description: same language, full width */
        .blank-area {
          display: block;
          width: 100%;
          resize: none;
          background: transparent;
          border: 0;
          border-bottom: 2px dashed rgba(79,70,229,0.4);
          padding: 0 0.35rem 0.6rem;
          font: inherit;
          font-size: 1.0625rem;
          line-height: 1.9;
          font-weight: 500;
          color: #0B1020;
          outline: none;
          transition: border-color .2s ease, background-size .25s ease;
          background-image: linear-gradient(90deg, #4F46E5, #8B5CF6, #38BDF8);
          background-repeat: no-repeat;
          background-position: 0 100%;
          background-size: 0% 2px;
        }
        .blank-area::placeholder { color: rgba(71,85,105,0.5); font-weight: 400; }
        .blank-area:hover { border-bottom-color: rgba(79,70,229,0.7); }
        .blank-area:not(:placeholder-shown) { border-bottom-style: solid; }
        .blank-area:focus { border-bottom-color: transparent; background-size: 100% 2px; }

        .dark .blank { color: #A5B4FC; border-bottom-color: rgba(165,180,252,0.4); }
        .dark .blank::placeholder { color: rgba(148,163,184,0.55); }
        .dark .blank:hover { border-bottom-color: rgba(165,180,252,0.75); }
        .dark .blank--error { color: #FB7185; border-bottom-color: #FB7185; }
        .dark .blank--select option { color: #0B1020; }
        .dark .blank-area { color: #E2E8F0; border-bottom-color: rgba(165,180,252,0.4); }
        .dark .blank-area::placeholder { color: rgba(148,163,184,0.55); }
        .dark .blank-area:hover { border-bottom-color: rgba(165,180,252,0.75); }

        @media (prefers-reduced-motion: reduce) {
          .blank, .blank-area { transition-duration: .01ms; }
        }
      `}</style>
    </section>
  );
}

type BlankProps = {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  error?: string;
  autoComplete?: string;
};

/** Widen the blank to fit its content so the sentence stays tight around it. */
const blankWidth = (value: string, placeholder: string) =>
  `${Math.min(Math.max((value || placeholder).length + 1, 8), 24)}ch`;

/** An inline "fill in the blank" input that sits inside the sentence. */
function Blank({ id, label, value, onChange, placeholder, type = 'text', error, autoComplete }: BlankProps) {
  return (
    <span className="inline-block">
      <label htmlFor={id} className="sr-only">{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        style={{ width: blankWidth(value, placeholder) }}
        className={`blank ${error ? 'blank--error' : ''}`}
      />
    </span>
  );
}

/** Same inline treatment for the service dropdown. */
function BlankSelect({ id, label, value, onChange, children }: {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
}) {
  return (
    <span className="relative inline-block">
      <label htmlFor={id} className="sr-only">{label}</label>
      <select id={id} value={value} onChange={onChange} className="blank blank--select">
        {children}
      </select>
      <ChevronDown aria-hidden className="pointer-events-none absolute right-1 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-indigo dark:text-brand-iris" />
    </span>
  );
}
