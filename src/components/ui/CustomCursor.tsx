import { useEffect, useRef, useState } from 'react';

/** Animated dual-ring cursor with hover/interactive states. Desktop pointer only. */
export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!fine) return;
    setEnabled(true);
    document.body.classList.add('cursor-none-custom');

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${mx}px, ${my}px)`;
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const interactive = t.closest('a, button, [data-cursor="hover"], input, textarea');
      ring.current?.classList.toggle('cursor-active', !!interactive);
    };

    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseover', over, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      document.body.classList.remove('cursor-none-custom');
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-1 -mt-1 h-2 w-2 rounded-full bg-brand-indigo mix-blend-multiply dark:mix-blend-screen"
      />
      <div
        ref={ring}
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[9998] -ml-5 -mt-5 h-10 w-10 rounded-full border border-brand-indigo/60 transition-[width,height,background-color,border-color] duration-200"
      />
      <style>{`
        .cursor-ring.cursor-active {
          width: 4rem; height: 4rem; margin-left: -2rem; margin-top: -2rem;
          background-color: rgba(99,102,241,0.10);
          border-color: rgba(99,102,241,0.35);
        }
      `}</style>
    </>
  );
}
