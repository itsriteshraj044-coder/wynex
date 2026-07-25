import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Global smooth scroll wired to GSAP ScrollTrigger.
 * Respects prefers-reduced-motion by skipping smoothing.
 */
export function useLenis() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // expose for anchor scrolling
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    // Pinned ScrollTrigger sections measure their start/end offsets on first
    // mount, before webfonts swap in, hero images finish loading, or the page's
    // own entrance transition settles — any of which shifts document height and
    // leaves the pin mis-measured until something forces a recalculation (this is
    // why a pinned section can render blank the first time you scroll into it,
    // and only look right after a second scroll re-triggers layout). Watch the
    // document for height changes and refresh automatically instead of guessing.
    let refreshTimeout: number;
    const scheduleRefresh = () => {
      window.clearTimeout(refreshTimeout);
      refreshTimeout = window.setTimeout(() => ScrollTrigger.refresh(), 150);
    };
    const ro = new ResizeObserver(scheduleRefresh);
    ro.observe(document.body);
    document.fonts?.ready.then(scheduleRefresh);

    return () => {
      window.clearTimeout(refreshTimeout);
      ro.disconnect();
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);
}
