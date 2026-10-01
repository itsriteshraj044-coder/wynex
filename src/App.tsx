import { lazy, Suspense, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { ModalProvider } from './context/ModalContext';
import { useLenis } from './hooks/useLenis';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AuroraBackground from './components/ui/AuroraBackground';
import CustomCursor from './components/ui/CustomCursor';
import ScrollProgress from './components/ui/ScrollProgress';
import BackToTop from './components/ui/BackToTop';
import WhatsAppButton from './components/ui/WhatsAppButton';
import CookieConsent from './components/ui/CookieConsent';
import Loader from './components/ui/Loader';
import Home from './pages/Home';
import { scrollToId } from './utils/scroll';

const Legal = lazy(() => import('./pages/Legal'));
const BlogIndex = lazy(() => import('./pages/BlogIndex'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const WorkPage = lazy(() => import('./pages/WorkPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ProcessPage = lazy(() => import('./pages/ProcessPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

/** Jump straight to the top — no smooth scroll — through Lenis when it's running. */
function jumpToTop() {
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, o?: object) => void } }).__lenis;
  lenis?.scrollTo(0, { immediate: true, force: true });
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
}

/** Runs after the old page has faded out, just before the new one mounts. */
function onPageExit() {
  const { hash } = window.location;
  // Wait for the homepage's pinned sections to settle, or the target offset is stale.
  if (hash) setTimeout(() => scrollToId(hash), 800);
  else jumpToTop();
}

/**
 * Every page opens at the top — or at its #section when the URL has one. Route
 * changes are handled once the old page has faded out (onPageExit above), so the
 * new page never shows up mid-scroll. This covers the rest: the first load (incl.
 * a shared /#faq link), the browser restoring the old position on reload, and
 * clicking the link of the page you're already on.
 */
function ScrollToTop() {
  const { pathname, hash, key } = useLocation();
  const lastPath = useRef(pathname);

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    // Sections render after React mounts, so the browser's own #hash jump misses them.
    if (hash) setTimeout(() => scrollToId(hash), 800);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (lastPath.current === pathname && !hash) jumpToTop();
    lastPath.current = pathname;
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}

function Page({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <Suspense fallback={<div className="grid min-h-[60vh] place-items-center text-ink-muted">Loading…</div>}>
      <AnimatePresence mode="wait" onExitComplete={onPageExit}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Page><Home /></Page>} />
          <Route path="/about" element={<Page><AboutPage /></Page>} />
          <Route path="/work" element={<Page><WorkPage /></Page>} />
          <Route path="/services" element={<Page><ServicesPage /></Page>} />
          <Route path="/process" element={<Page><ProcessPage /></Page>} />
          <Route path="/blog" element={<Page><BlogIndex /></Page>} />
          <Route path="/blog/:slug" element={<Page><BlogPost /></Page>} />
          <Route path="/contact" element={<Page><ContactPage /></Page>} />
          <Route path="/privacy" element={<Page><Legal type="privacy" /></Page>} />
          <Route path="/terms" element={<Page><Legal type="terms" /></Page>} />
          <Route path="/cookies" element={<Page><Legal type="cookies" /></Page>} />
          <Route path="*" element={<Page><NotFound /></Page>} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}

export default function App() {
  useLenis();
  return (
    <ThemeProvider>
      <ModalProvider>
        <Loader />
      <AuroraBackground />
      <CustomCursor />
      <ScrollProgress />
      <ScrollToTop />
      <Navbar />
      <AnimatedRoutes />
      <Footer />
      <BackToTop />
      <WhatsAppButton />
      <CookieConsent />
      </ModalProvider>
    </ThemeProvider>
  );
}
