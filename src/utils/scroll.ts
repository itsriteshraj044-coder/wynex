/** Smoothly scroll to an in-page anchor id via Lenis when available. */
export function scrollToId(hash: string) {
  const id = hash.replace(/^\/?#/, '');
  const el = document.getElementById(id);
  if (!el) return false;
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element | number, o?: object) => void } }).__lenis;
  if (lenis) lenis.scrollTo(el, { offset: -90, duration: 1.2 });
  else el.scrollIntoView({ behavior: 'smooth' });
  return true;
}
