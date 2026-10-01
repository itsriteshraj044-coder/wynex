import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface MoreLinkProps {
  to: string;
  label: string;
}

/** "View all" style button that leads from a homepage section to its full page. */
export default function MoreLink({ to, label, className }: MoreLinkProps & { className?: string }) {
  return (
    <div className={cn('mt-12 flex justify-center', className)}>
      <Link to={to} className="btn-ghost group dark:border-white/10 dark:bg-white/5 dark:text-white">
        {label}
        <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
