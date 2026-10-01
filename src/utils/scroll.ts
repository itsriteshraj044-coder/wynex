/** Space left above the target so it isn't hidden under the fixed navbar. */
const HEADER_OFFSET = 100;

/** Smoothly scroll to an in-page anchor id via Lenis when available. */
export function scrollToId(hash: string) {
  const id = hash.replace(/^\/?#/, '');
  const el = document.getElementById(id);
  if (!el) return false;
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, o?: object) => void } }).__lenis;
  if (lenis) {
    // Pass an absolute position: when given the element itself, Lenis mis-measures
    // it once the page is already scrolled and overshoots.
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    lenis.scrollTo(Math.max(0, top), { duration: 1.2 });
  } else {
    el.scrollIntoView({ behavior: 'smooth' });
  }
  return true;
}
