import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, ArrowRight, CheckCircle2, Loader2, AlertCircle, ChevronDown } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { SITE } from '../../constants/site';
import { SERVICES } from '../../constants/services';
import { sendForm } from '../../utils/contact';

type Status = 'idle' | 'sending' | 'sent';

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({ name: '', email: '', phone: '', city: '', state: '', service: SERVICES[0].title, message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sendError, setSendError] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const startedAt = useRef(Date.now());

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Please enter your name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!/^[+\d][\d\s-]{7,}$/.test(form.phone.trim())) e.phone = 'Enter a valid phone number';
    if (!form.city.trim()) e.city = 'Please enter your city';
    if (!form.state.trim()) e.state = 'Please enter your state';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    setSendError('');
    try {
      await sendForm({ type: 'contact', ...form }, startedAt.current, honeypot);
      setStatus('sent');
    } catch (err) {
      setSendError((err as Error).message);
      setStatus('idle');
    }
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
                <form onSubmit={submit} noValidate className="relative">
                  {/* Honeypot: hidden from people, filled in by bots. */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="absolute -left-[9999px] h-px w-px opacity-0"
                  />

                  <h3 className="text-2xl font-bold text-ink dark:text-white sm:text-3xl">Tell us about your project</h3>
                  <p className="mt-2 text-ink-muted dark:text-slate-400">Fill in a few details and we'll get back to you within one business day.</p>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <FloatingInput id="name" label="Full name" autoComplete="name" error={errors.name} {...field('name')} />
                    </div>
                    <FloatingInput id="email" label="Email address" type="email" autoComplete="email" error={errors.email} {...field('email')} />
                    <FloatingInput id="phone" label="Phone number" type="tel" autoComplete="tel" error={errors.phone} {...field('phone')} />
                    <FloatingInput id="city" label="City" autoComplete="address-level2" error={errors.city} {...field('city')} />
                    <FloatingInput id="state" label="State" autoComplete="address-level1" error={errors.state} {...field('state')} />
                    <div className="sm:col-span-2">
                      <FloatingSelect id="service" label="Service you need" {...field('service')}>
                        {SERVICES.map((s) => <option key={s.slug} value={s.title}>{s.title}</option>)}
                      </FloatingSelect>
                    </div>
                    <div className="relative sm:col-span-2">
                      <textarea
                        id="message"
                        rows={4}
                        placeholder=" "
                        {...field('message')}
                        className={`${fieldBox} peer resize-none`}
                      />
                      <label htmlFor="message" className={`${floatLabel} top-5 peer-focus:top-3.5 peer-[:not(:placeholder-shown)]:top-3.5`}>
                        Project details <span className="font-normal opacity-70">(optional)</span>
                      </label>
                    </div>
                  </div>

                  {sendError && (
                    <div role="alert" className="mt-6 rounded-2xl border border-rose-500/25 bg-rose-500/[0.07] p-4 text-sm text-rose-600 dark:text-rose-400">
                      <p className="flex items-center gap-2 font-semibold">
                        <AlertCircle className="h-4 w-4 shrink-0" /> {sendError}
                      </p>
                      <p className="mt-1 pl-6">
                        You can also email us at{' '}
                        <a href={`mailto:${SITE.email}`} className="font-semibold underline">{SITE.email}</a>.
                      </p>
                    </div>
                  )}

                  <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-ink px-7 py-4 text-base font-semibold text-white transition-colors duration-200 hover:bg-brand-indigo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-ink dark:hover:bg-brand-indigo dark:hover:text-white dark:focus-visible:ring-offset-ink"
                    >
                      {status === 'sending' ? (
                        <><Loader2 className="h-5 w-5 animate-spin" /> Sending…</>
                      ) : (
                        <>Send message <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" /></>
                      )}
                    </button>
                    <p className="text-sm text-ink-muted dark:text-slate-500">We reply within one business day. No spam, ever.</p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/*
 * Floating-label fields: the label sits inside the box like a placeholder and
 * slides up once the field is focused or filled. Inputs use placeholder=" " so
 * :placeholder-shown tells us whether they're empty.
 */
const fieldBox =
  'w-full rounded-2xl border border-ink/10 bg-white/80 px-4 pb-2.5 pt-6 text-[15px] text-ink outline-none transition ' +
  'hover:border-ink/20 focus:border-brand-indigo focus:ring-4 focus:ring-brand-indigo/10 ' +
  'dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:border-white/20 dark:focus:border-brand-iris';

const floatLabel =
  'pointer-events-none absolute left-4 -translate-y-1/2 text-[15px] text-ink-muted transition-all duration-200 ' +
  'peer-focus:text-xs peer-focus:font-semibold peer-focus:text-brand-indigo ' +
  'peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-semibold ' +
  'motion-reduce:transition-none dark:text-slate-400 dark:peer-focus:text-brand-iris';

const errorBox = '!border-rose-500 focus:!ring-rose-500/15';

type FloatingInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  error?: string;
  autoComplete?: string;
};

function FloatingInput({ id, label, value, onChange, type = 'text', error, autoComplete }: FloatingInputProps) {
  return (
    <div>
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder=" "
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${fieldBox} peer ${error ? errorBox : ''}`}
        />
        <label
          htmlFor={id}
          className={`${floatLabel} top-1/2 peer-focus:top-3.5 peer-[:not(:placeholder-shown)]:top-3.5 ${error ? '!text-rose-500' : ''}`}
        >
          {label}
        </label>
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 pl-1 text-xs font-medium text-rose-600 dark:text-rose-400">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {error}
        </p>
      )}
    </div>
  );
}

/** A select always has a value, so its label stays in the raised position. */
function FloatingSelect({ id, label, value, onChange, children }: {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <select id={id} value={value} onChange={onChange} className={`${fieldBox} peer cursor-pointer appearance-none pr-10 [&>option]:bg-white [&>option]:text-ink`}>
        {children}
      </select>
      <label htmlFor={id} className={`${floatLabel} top-3.5 text-xs font-semibold`}>{label}</label>
      <ChevronDown aria-hidden className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted dark:text-slate-400" />
    </div>
  );
}
