import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Mail } from 'lucide-react';
import Seo from '../components/ui/Seo';
import { LEGAL } from '../constants/legal';
import type { LegalBlock } from '../constants/legal';
import { SITE } from '../constants/site';
import { scrollToId } from '../utils/scroll';

const DESCRIPTIONS = {
  privacy: 'How Wynex Technologies collects, uses and protects personal data — your rights under India’s DPDP Act, the Google services we use, and how to contact our Grievance Officer.',
  terms: 'The Terms & Conditions for using the Wynex Technologies website and for our client projects, quotes, payments and intellectual property.',
  cookies: 'Which cookies and similar technologies the Wynex Technologies website and its embedded services use, and how to manage them.',
};

const SITE_ORIGIN = 'https://wynextechnologies.com';

/** Turn URLs and email addresses inside plain text into links. */
function linkify(text: string) {
  const parts = text.split(/(https?:\/\/[^\s]+|[\w.+-]+@[\w-]+\.[\w.-]+)/g);
  return parts.map((part, i) => {
    const isUrl = /^https?:\/\//.test(part);
    const isEmail = !isUrl && /^[\w.+-]+@[\w-]+\.[\w.-]+$/.test(part);
    if (!isUrl && !isEmail) return <Fragment key={i}>{part}</Fragment>;
    // Keep sentence punctuation that the pattern swallowed outside the link.
    const [, href, trail] = part.match(/^(.*?)([.,;:)]*)$/) ?? [part, part, ''];
    const cls = '[overflow-wrap:anywhere] font-semibold text-brand-indigo underline-offset-2 hover:underline dark:text-brand-iris';
    let link;
    if (isEmail) link = <a href={`mailto:${href}`} className={cls}>{href}</a>;
    else if (href.startsWith(SITE_ORIGIN)) link = <Link to={href.slice(SITE_ORIGIN.length) || '/'} className={cls}>{href.replace('https://', '')}</Link>;
    else link = <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{href.replace('https://', '')}</a>;
    return <Fragment key={i}>{link}{trail}</Fragment>;
  });
}

function Block({ block }: { block: LegalBlock }) {
  if (typeof block === 'string') return <p className="leading-relaxed text-ink-muted dark:text-slate-300">{linkify(block)}</p>;
  return (
    <ul className="space-y-2.5 pl-1">
      {block.list.map((item) => (
        <li key={item} className="flex gap-3 leading-relaxed text-ink-muted dark:text-slate-300">
          <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-indigo" />
          <span>{linkify(item)}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Legal({ type }: { type: 'privacy' | 'terms' | 'cookies' }) {
  const doc = LEGAL[type];
  const jump = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToId(`#${id}`);
  };

  return (
    <>
      <Seo title={`${doc.title} — Wynex Technologies`} description={DESCRIPTIONS[type]} path={`/${type}`} />
      <div className="pb-24 pt-36 lg:pt-44">
        <div className="container-x">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-sm text-ink-muted dark:text-slate-400">
              <li><Link to="/" className="transition-colors hover:text-brand-indigo">Home</Link></li>
              <li aria-hidden><ChevronRight className="h-3.5 w-3.5" /></li>
              <li aria-current="page" className="font-semibold text-ink dark:text-white">{doc.title}</li>
            </ol>
          </nav>

          <header className="border-b border-ink/10 pb-10 dark:border-white/10">
            <p className="eyebrow mb-4">Legal</p>
            <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl dark:text-white">{doc.title}</h1>
            <p className="mt-3 text-sm text-ink-muted dark:text-slate-500">Last updated: {doc.updated}</p>
            <p className="mt-6 text-lg leading-relaxed text-ink-muted dark:text-slate-300">{linkify(doc.intro)}</p>
          </header>

          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[16rem_minmax(0,1fr)] xl:grid-cols-[18rem_minmax(0,1fr)]">
            {/* Table of contents */}
            <aside className="lg:sticky lg:top-32 lg:self-start">
              <p className="text-xs font-bold uppercase tracking-widest text-ink dark:text-white">On this page</p>
              <ol className="mt-4 space-y-1 border-l border-ink/10 dark:border-white/10">
                {doc.sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      onClick={jump(s.id)}
                      className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm text-ink-muted transition-colors hover:border-brand-indigo hover:text-ink dark:text-slate-400 dark:hover:text-white"
                    >
                      {i + 1}. {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
              <div className="mt-8 hidden rounded-2xl border border-white/60 bg-white/70 p-5 text-sm backdrop-blur-xl lg:block dark:border-white/10 dark:bg-white/[0.04]">
                <p className="font-semibold text-ink dark:text-white">Questions?</p>
                <a href={`mailto:${SITE.email}`} className="mt-2 inline-flex items-center gap-2 font-semibold text-brand-indigo dark:text-brand-iris">
                  <Mail className="h-4 w-4" /> {SITE.email}
                </a>
              </div>
            </aside>

            {/* Sections */}
            <div className="flex flex-col gap-10">
              {doc.sections.map((s, i) => (
                <section key={s.id} id={s.id} className="scroll-mt-32">
                  <h2 className="text-2xl font-bold text-ink dark:text-white">
                    <span className="mr-2 text-brand-indigo">{i + 1}.</span>{s.heading}
                  </h2>
                  <div className="mt-4 flex flex-col gap-4">
                    {s.blocks.map((b, j) => <Block key={j} block={b} />)}
                  </div>
                </section>
              ))}

              <div className="rounded-3xl border border-white/60 bg-white/70 p-6 text-ink-muted backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-400">
                Questions about this {doc.title.toLowerCase()}? Email us at{' '}
                <a href={`mailto:${SITE.email}`} className="font-semibold text-brand-indigo dark:text-brand-iris">{SITE.email}</a>
                {' '}or visit our <Link to="/contact" className="font-semibold text-brand-indigo dark:text-brand-iris">Contact Us</Link> page.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
