import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { SplitText } from 'gsap/SplitText';
import { Compass, PenTool, Code2, Rocket } from 'lucide-react';
import { HERO_FRAMES } from '../../constants/content';
import StoryDecor from './StoryDecor';

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, SplitText);

const FRAME_ICONS = [Compass, PenTool, Code2, Rocket];
// Cycles the brand palette so each frame's icon glow + background blob has its own identity.
const FRAME_ACCENTS = ['#4F46E5', '#8B5CF6', '#06B6D4', '#38BDF8'];

const ICON_SHAPE_SELECTOR = '.story-icon path, .story-icon circle, .story-icon polygon, .story-icon polyline, .story-icon line, .story-icon rect, .story-icon ellipse';

/**
 * Apple-style pinned, frame-by-frame scroll storytelling. Each frame's line-art
 * icon draws itself in with DrawSVG and its headline reveals word-by-word,
 * layered on top of the frame's own fade/blur/scale transition.
 */
export default function StoryScroll() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const splits: SplitText[] = [];

    const ctx = gsap.context(() => {
      const frames = gsap.utils.toArray<HTMLElement>('.story-frame');
      const bar = root.current?.querySelector('.story-progress-fill');

      if (reduced) {
        gsap.set(frames, { opacity: 1, y: 0, scale: 1 });
        gsap.set(ICON_SHAPE_SELECTOR, { drawSVG: '100%' });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: `+=${frames.length * 100}%`,
          // Lenis already smooths the raw scroll input; stacking GSAP's own scrub
          // lag on top of that made the pin feel disconnected from the finger on
          // touch. A light scrub keeps the fade cinematic without doubling up.
          scrub: 0.25,
          pin: true,
          anticipatePin: 1,
        },
      });

      frames.forEach((frame, i) => {
        const icon = frame.querySelectorAll(ICON_SHAPE_SELECTOR);
        const headline = frame.querySelector<HTMLElement>('.story-headline');
        const split = headline ? new SplitText(headline, { type: 'words', wordsClass: 'story-word' }) : null;
        if (split) splits.push(split);

        gsap.set(icon, { drawSVG: '0%' });
        if (split) gsap.set(split.words, { yPercent: 70, opacity: 0 });

        tl.fromTo(
          frame,
          { opacity: 0, y: 60, scale: 0.94, filter: 'blur(10px)' },
          { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.5, ease: 'power2.out' }
        );
        tl.to(icon, { drawSVG: '100%', duration: 0.6, ease: 'power2.inOut' }, '<');
        if (split) {
          tl.to(split.words, { yPercent: 0, opacity: 1, duration: 0.5, stagger: 0.035, ease: 'power3.out' }, '<0.05');
        }

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

    return () => {
      ctx.revert();
      splits.forEach((s) => s.revert());
    };
  }, []);

  return (
    <section ref={root} id="story" className="relative h-screen overflow-hidden">
      {/* progress bar with a tick mark at each frame boundary */}
      <div className="absolute left-1/2 top-8 z-20 -translate-x-1/2">
        <div className="relative h-1 w-44 overflow-hidden rounded-full bg-ink/10 sm:w-56 dark:bg-white/10">
          <div className="story-progress-fill h-full origin-left scale-x-0 bg-brand-gradient" />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-between">
            {HERO_FRAMES.map((f) => (
              <span key={f.title} className="h-2.5 w-0.5 rounded-full bg-white/90 dark:bg-[#070b16]/80" />
            ))}
          </div>
        </div>
      </div>

      <div className="relative flex h-full items-center justify-center">
        {HERO_FRAMES.map((frame, i) => {
          const Icon = FRAME_ICONS[i % FRAME_ICONS.length];
          const accent = FRAME_ACCENTS[i % FRAME_ACCENTS.length];
          return (
            <div key={frame.title} className="story-frame absolute inset-0">
              {/* color-shifting ambient blob, unique per frame */}
              <div
                className="animate-blob pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-3xl"
                style={{ background: accent }}
                aria-hidden="true"
              />

              <StoryDecor index={i} />

              <div className="container-x relative z-10 flex h-full flex-col items-center justify-center text-center">
                <div
                  className="mb-6 grid h-20 w-20 place-items-center rounded-3xl border border-white/60 bg-white/70 shadow-glow backdrop-blur-xl sm:h-24 sm:w-24 dark:border-white/10 dark:bg-white/[0.06]"
                  style={{ color: accent }}
                >
                  <Icon className="story-icon h-10 w-10 sm:h-12 sm:w-12" strokeWidth={1.4} aria-hidden="true" />
                </div>

                <span className="mb-4 font-mono text-sm font-semibold uppercase tracking-[0.3em] text-brand-indigo">
                  0{i + 1} — {frame.title}
                </span>
                <h2 className="story-headline max-w-4xl text-balance text-4xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl dark:text-white">
                  {frame.headline}
                </h2>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted sm:text-xl dark:text-slate-300">
                  {frame.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
