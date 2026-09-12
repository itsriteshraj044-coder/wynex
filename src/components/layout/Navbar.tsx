import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react';
import { NAV_ITEMS, SITE } from '../../constants/site';
import { scrollToId } from '../../utils/scroll';
import ThemeToggle from '../ui/ThemeToggle';
import Magnetic from '../ui/Magnetic';
import { cn } from '../../utils/cn';
import { useModal } from '../../context/ModalContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { openModal } = useModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleAnchor = (href: string) => (e: React.MouseEvent) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => scrollToId(href), 400);
      } else {
        scrollToId(href);
      }
      setMobileOpen(false);
    }
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'flex w-full max-w-[1400px] items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5',
            scrolled
              ? 'border border-white/60 bg-white/70 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-[#0d1424]/70'
              : 'border border-transparent bg-transparent'
          )}
        >
          {/* Logo */}
          <div className="flex flex-col items-center gap-1">
            <Link to="/" className="flex items-center" aria-label="Wynex Technologies home">
              <img src="/logo-mark.png" alt="Wynex Technologies logo" className="h-9 w-auto dark:brightness-0 dark:invert" width="77" height="36" />
            </Link>
            <div className="hidden items-center gap-1.5 rounded-full border border-brand-indigo/20 bg-brand-indigo/5 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-brand-indigo sm:flex dark:border-brand-indigo/30 dark:bg-brand-indigo/10">
              <span className="relative flex h-1 w-1">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-indigo opacity-75"></span>
                <span className="relative inline-flex h-1 w-1 rounded-full bg-brand-indigo"></span>
              </span>
              MSME Registered
            </div>
          </div>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setMega(true)}
                onMouseLeave={() => item.children && setMega(false)}
              >
                {item.children ? (
                  <button className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold text-ink/80 transition-colors hover:text-ink dark:text-slate-300 dark:hover:text-white">
                    {item.label}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                ) : item.href.startsWith('/#') ? (
                  <a href={item.href} onClick={handleAnchor(item.href)} className="rounded-full px-4 py-2 text-sm font-semibold text-ink/80 transition-colors hover:text-ink dark:text-slate-300 dark:hover:text-white">
                    {item.label}
                  </a>
                ) : (
                  <Link to={item.href} className="rounded-full px-4 py-2 text-sm font-semibold text-ink/80 transition-colors hover:text-ink dark:text-slate-300 dark:hover:text-white">
                    {item.label}
                  </Link>
                )}

                {/* Mega menu */}
                {item.children && (
                  <AnimatePresence>
                    {mega && (
                      <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 top-full w-[34rem] -translate-x-1/2 pt-4"
                      >
                        <div className="grid grid-cols-2 gap-1 rounded-3xl border border-white/60 bg-white/90 p-3 shadow-glow backdrop-blur-2xl dark:border-white/10 dark:bg-[#0d1424]/95">
                          {item.children.map((c) => (
                            <a
                              key={c.label}
                              href={c.href}
                              onClick={handleAnchor(c.href)}
                              className="group flex flex-col gap-0.5 rounded-2xl p-3.5 transition-colors hover:bg-brand-indigo/5 dark:hover:bg-white/5"
                            >
                              <span className="flex items-center gap-1 text-sm font-bold text-ink dark:text-white">
                                {c.label}
                                <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100 text-brand-indigo" />
                              </span>
                              <span className="text-xs text-ink-muted dark:text-slate-400">{c.description}</span>
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle className="hidden sm:grid" />
            <Magnetic className="hidden lg:block">
              <button onClick={openModal} className="btn-primary">
                Start a project
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </Magnetic>
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="grid h-10 w-10 place-items-center rounded-full border border-ink/10 bg-white/60 text-ink lg:hidden dark:border-white/10 dark:bg-white/5 dark:text-white"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col bg-white/95 px-6 pb-10 pt-24 backdrop-blur-2xl lg:hidden dark:bg-[#070b16]/97"
          >
            <ul className="flex flex-col gap-1">
              {NAV_ITEMS.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <a
                    href={item.href}
                    onClick={handleAnchor(item.href)}
                    className="block border-b border-ink/5 py-4 text-2xl font-bold text-ink dark:border-white/5 dark:text-white"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-8 flex items-center gap-3">
              <button onClick={() => { openModal(); setMobileOpen(false); }} className="btn-primary flex-1">
                Start a project <ArrowUpRight className="h-4 w-4" />
              </button>
              <ThemeToggle />
            </div>
            <p className="mt-auto pt-8 text-sm text-ink-muted dark:text-slate-500">{SITE.email}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
