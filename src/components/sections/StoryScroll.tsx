import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HERO_FRAMES } from '../../constants/content';
import StoryDecor from './StoryDecor';

gsap.registerPlugin(ScrollTrigger);

/**
 * Apple-style pinned, frame-by-frame scroll storytelling.
 * Each frame fades/scales in sync with scroll progress.
 */
export default function StoryScroll() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      const frames = gsap.utils.toArray<HTMLElement>('.story-frame');
      const bar = root.current?.querySelector('.story-progress-fill');

      if (reduced) {
        gsap.set(frames, { opacity: 1, y: 0, scale: 1 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: `+=${frames.length * 100}%`,
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });

      frames.forEach((frame, i) => {
        tl.fromTo(
          frame,
          { opacity: 0, y: 60, scale: 0.94, filter: 'blur(10px)' },
          { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.5, ease: 'power2.out' }
        );
        if (i < frames.length - 1) {
          tl.to(frame, { opacity: 0, y: -60, scale: 0.94, filter: 'blur(10px)', duration: 0.5, ease: 'power2.in' }, '+=0.5');
        }
      });

      if (bar) {
        gsap.to(bar, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: `+=${frames.length * 100}%`, scrub: true },
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="story" className="relative h-screen overflow-hidden">
      <div className="absolute left-1/2 top-8 z-20 flex -translate-x-1/2 items-center gap-3">
        <div className="h-1 w-40 overflow-hidden rounded-full bg-ink/10 dark:bg-white/10">
          <div className="story-progress-fill h-full origin-left scale-x-0 bg-brand-gradient" />
        </div>
      </div>

      <div className="relative flex h-full items-center justify-center">
        {HERO_FRAMES.map((frame, i) => (
          <div key={frame.title} className="story-frame absolute inset-0">
            <StoryDecor index={i} />
            <div className="container-x relative z-10 flex h-full flex-col items-center justify-center text-center">
              <span className="mb-6 font-mono text-sm font-semibold uppercase tracking-[0.3em] text-brand-indigo">
                0{i + 1} — {frame.title}
              </span>
              <h2 className="max-w-4xl text-balance text-4xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl dark:text-white">
                {frame.headline}
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted sm:text-xl dark:text-slate-300">
                {frame.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
