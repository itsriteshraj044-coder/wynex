import type { ReactNode } from 'react';
import { useMagnetic } from '../../hooks/useMagnetic';

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

/** Wrap any element to give it a magnetic pull toward the cursor. */
export default function Magnetic({ children, strength = 0.3, className }: MagneticProps) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic<HTMLDivElement>(strength);
  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
      style={{ transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)', willChange: 'transform' }}
    >
      {children}
    </div>
  );
}
