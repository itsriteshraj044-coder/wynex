import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface Props {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
  speed?: number;
}

/** Infinite, seamless CSS marquee. Duplicates children for a smooth loop. */
export default function Marquee({ children, className, reverse, speed = 32 }: Props) {
  return (
    <div className={cn('group relative flex w-full overflow-hidden', className)}>
      <div
        className="marquee-track flex min-w-full shrink-0 items-center justify-around gap-8"
        style={{ animationDuration: `${speed}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className="marquee-track flex min-w-full shrink-0 items-center justify-around gap-8"
        style={{ animationDuration: `${speed}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        {children}
      </div>
    </div>
  );
}
