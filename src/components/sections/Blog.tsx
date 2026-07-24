import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { BLOG_POSTS, formatDate } from '../../utils/blog';

export default function Blog() {
  const posts = BLOG_POSTS.slice(0, 3);

  return (
    <section id="blog" className="relative py-24 lg:py-32">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading align="left" eyebrow="Insights" title="Ideas Worth" highlight="Reading." />
          <Link to="/blog" className="btn-ghost">All Articles <ArrowUpRight className="h-4 w-4" /></Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
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
                <h3 className="text-lg font-bold leading-snug text-ink transition-colors group-hover:text-brand-indigo dark:text-white">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted dark:text-slate-400">{post.excerpt}</p>
                <Link to={`/blog/${post.slug}`} className="mt-4 flex items-center gap-1 text-sm font-semibold text-brand-indigo">
                  Read Article <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
