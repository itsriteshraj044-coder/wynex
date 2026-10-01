import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import SectionHeading from './SectionHeading';

interface Props {
  /** Breadcrumb label for the current page. */
  page: string;
  eyebrow: string;
  title: string;
  highlight?: string;
  subtitle: string;
}

/** Top-of-page intro for inner pages: breadcrumb plus the shared section heading. */
export default function PageHero({ page, eyebrow, title, highlight, subtitle }: Props) {
  return (
    <section className="relative pb-6 pt-36 lg:pt-44">
      <div className="container-x">
        <nav aria-label="Breadcrumb" className="mb-8 flex justify-center">
          <ol className="flex items-center gap-1.5 text-sm text-ink-muted dark:text-slate-400">
            <li><Link to="/" className="transition-colors hover:text-brand-indigo">Home</Link></li>
            <li aria-hidden><ChevronRight className="h-3.5 w-3.5" /></li>
            <li aria-current="page" className="font-semibold text-ink dark:text-white">{page}</li>
          </ol>
        </nav>
        <SectionHeading eyebrow={eyebrow} title={title} highlight={highlight} subtitle={subtitle} />
      </div>
    </section>
  );
}
