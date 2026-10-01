import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { useModal } from '../../context/ModalContext';

interface Props {
  title?: string;
  text?: string;
}

/** Closing call-to-action used at the bottom of inner pages. */
export default function CtaBanner({
  title = 'Have a project in mind?',
  text = 'Tell us what you’re planning. We’ll reply with honest advice, a clear plan and a fixed quote — no obligation.',
}: Props) {
  const { openModal } = useModal();
  return (
    <section className="relative py-20 lg:py-28">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-brand-gradient px-8 py-14 text-center text-white shadow-glow sm:px-16"
        >
          <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/15 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
          <h2 className="relative mx-auto max-w-2xl text-balance text-3xl font-bold !text-white sm:text-4xl">{title}</h2>
          <p className="relative mx-auto mt-4 max-w-xl text-white/85">{text}</p>
          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={openModal}
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-indigo"
            >
              Start a project <ArrowUpRight className="h-4 w-4" />
            </button>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <MessageCircle className="h-4 w-4" /> Contact us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
