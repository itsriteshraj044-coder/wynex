import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Clock } from 'lucide-react';
import Seo from '../components/ui/Seo';
import SectionHeading from '../components/ui/SectionHeading';
import { BLOG_POSTS, formatDate } from '../utils/blog';
import { cn } from '../utils/cn';

export default function BlogIndex() {
  const categories = useMemo(() => ['All', ...Array.from(new Set(BLOG_POSTS.map((p) => p.category)))], []);
  const [filter, setFilter] = useState('All');
  const posts = filter === 'All' ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.category === filter);

  return (
    <>
      <Seo
        title="Insights & Blog — Wynex Technologies"
        description="Fresh, AI-authored engineering, design and AI insights from Wynex Technologies — updated daily."
        path="/blog"
      />
      <div className="pt-32">
        <div className="container-x">
          <SectionHeading
            eyebrow="Insights"
            title="The Wynex"
            highlight="Journal."
            subtitle="Engineering, design and AI insights — fresh perspectives published continuously."
          />

          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 active:scale-95',
                  filter === c
                    ? 'bg-ink text-white dark:bg-white dark:text-ink'
                    : 'border border-ink/10 text-ink-muted hover:text-ink dark:border-white/10 dark:text-slate-400 dark:hover:text-white'
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <motion.div layout className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {posts.map((post, i) => (
                <motion.article
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.3) }}
                  className="group flex flex-col overflow-hidden rounded-4xl border border-white/60 bg-white/70 shadow-card backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-glow dark:border-white/10 dark:bg-white/[0.04]"
                >
                  <Link to={`/blog/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden">
                    <img src={post.image} alt={post.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-brand-indigo backdrop-blur dark:bg-[#0d1424]/90">{post.category}</span>
                  </Link>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex items-center gap-3 text-xs text-ink-muted dark:text-slate-500">
                      <span>{formatDate(post.date)}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
                    </div>
                    <h2 className="text-lg font-bold leading-snug text-ink transition-colors group-hover:text-brand-indigo dark:text-white">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted dark:text-slate-400">{post.excerpt}</p>
                    <Link to={`/blog/${post.slug}`} className="mt-4 flex items-center gap-1 text-sm font-semibold text-brand-indigo">
                      Read Article <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          <div className="h-24" />
        </div>
      </div>
    </>
  );
}
