import { useRef, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface Props {
  children: ReactNode;
  className?: string;
  max?: number;
}

/** 3D tilt-on-hover card with a moving glare highlight. */
export default function TiltCard({ children, className, max = 8 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const move = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (py - 0.5) * -2 * max;
    const ry = (px - 0.5) * 2 * max;
    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    el.style.setProperty('--gx', `${px * 100}%`);
    el.style.setProperty('--gy', `${py * 100}%`);
  };

  const leave = () => {
    const el = ref.current;
    if (el) el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      className={cn('relative transition-transform duration-300 ease-out [transform-style:preserve-3d]', className)}
      style={{ willChange: 'transform' }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 [background:radial-gradient(400px_circle_at_var(--gx)_var(--gy),rgba(255,255,255,0.5),transparent_60%)] group-hover:opacity-100"
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
