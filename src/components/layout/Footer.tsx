import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github, Dribbble, ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { SITE } from '../../constants/site';
import { scrollToId } from '../../utils/scroll';

const columns = [
  {
    title: 'Services',
    links: [
      { label: 'Web Development', href: '/#services' },
      { label: 'Mobile Apps', href: '/#services' },
      { label: 'Custom Software', href: '/#services' },
      { label: 'Cloud & AI', href: '/#services' },
      { label: 'UI/UX Design', href: '/#services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/#about' },
      { label: 'Our Work', href: '/#work' },
      { label: 'Process', href: '/#process' },
      { label: 'Contact', href: '/#contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/#blog' },
      { label: 'Case Studies', href: '/#work' },
      { label: 'FAQ', href: '/#faq' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
];

const socials = [
  { icon: Twitter, href: SITE.social.twitter, label: 'Twitter' },
  { icon: Linkedin, href: SITE.social.linkedin, label: 'LinkedIn' },
  { icon: Github, href: SITE.social.github, label: 'GitHub' },
  { icon: Dribbble, href: SITE.social.dribbble, label: 'Dribbble' },
];

export default function Footer() {
  const onAnchor = (href: string) => (e: React.MouseEvent) => {
    if (href.startsWith('/#') && window.location.pathname === '/') {
      e.preventDefault();
      scrollToId(href);
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-ink/5 bg-surface-off/60 dark:border-white/5 dark:bg-[#080d1a]">
      <div className="bg-mesh absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="container-x relative py-16 lg:py-20">
        {/* CTA band */}
        <div className="mb-16 flex flex-col items-start justify-between gap-6 rounded-4xl border border-white/60 bg-white/70 p-8 shadow-card backdrop-blur-xl lg:flex-row lg:items-center lg:p-12 dark:border-white/10 dark:bg-white/5">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl dark:text-white">Let's build something extraordinary.</h2>
            <p className="mt-2 max-w-lg text-ink-muted dark:text-slate-400">Tell us about your project and we'll get back within one business day.</p>
          </div>
          <a href="/#contact" onClick={onAnchor('/#contact')} className="btn-primary shrink-0">
            Start a project <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block" aria-label="Wynex Technologies home">
              <img src="/logo.png" alt="Wynex Technologies logo" className="h-16 w-auto dark:brightness-0 dark:invert" width="93" height="64" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted dark:text-slate-400">
              A premium software agency engineering award-winning websites, apps and AI products for ambitious brands.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-ink-muted dark:text-slate-400">
              <li className="flex items-center gap-2.5"><Mail className="h-4 w-4 text-brand-indigo" /> {SITE.email}</li>
              <li className="flex items-center gap-2.5"><Phone className="h-4 w-4 text-brand-indigo" /> {SITE.phone}</li>
              <li className="flex items-center gap-2.5"><MapPin className="h-4 w-4 text-brand-indigo" /> {SITE.address}</li>
            </ul>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-ink dark:text-white">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.href.startsWith('/#') ? (
                      <a href={l.href} onClick={onAnchor(l.href)} className="text-sm text-ink-muted transition-colors hover:text-brand-indigo dark:text-slate-400 dark:hover:text-white">{l.label}</a>
                    ) : (
                      <Link to={l.href} className="text-sm text-ink-muted transition-colors hover:text-brand-indigo dark:text-slate-400 dark:hover:text-white">{l.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-ink/5 pt-8 sm:flex-row dark:border-white/5">
          <p className="text-sm text-ink-muted dark:text-slate-500">© {new Date().getFullYear()} Wynex Technologies. All rights reserved.</p>
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="grid h-9 w-9 place-items-center rounded-full border border-ink/10 text-ink-muted transition-colors hover:border-brand-indigo hover:text-brand-indigo dark:border-white/10 dark:text-slate-400">
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
