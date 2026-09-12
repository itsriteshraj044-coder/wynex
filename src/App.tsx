import { lazy, Suspense, useEffect } from 'react';
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
import Chatbot from './components/ui/Chatbot';
import Loader from './components/ui/Loader';
import Home from './pages/Home';

const Legal = lazy(() => import('./pages/Legal'));
const BlogIndex = lazy(() => import('./pages/BlogIndex'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const NotFound = lazy(() => import('./pages/NotFound'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
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
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Page><Home /></Page>} />
          <Route path="/blog" element={<Page><BlogIndex /></Page>} />
          <Route path="/blog/:slug" element={<Page><BlogPost /></Page>} />
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
      <Chatbot />
      </ModalProvider>
    </ThemeProvider>
  );
}
