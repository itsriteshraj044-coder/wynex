import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, ArrowUpRight, Clock, Calendar, User } from 'lucide-react';
import Seo from '../components/ui/Seo';
import { getPostBySlug, relatedPosts, formatDate } from '../utils/blog';
import type { Components } from 'react-markdown';

const mdComponents: Components = {
  h2: ({ children }) => <h2 className="mt-10 mb-3 text-2xl font-bold text-ink dark:text-white">{children}</h2>,
  h3: ({ children }) => <h3 className="mt-8 mb-2 text-xl font-bold text-ink dark:text-white">{children}</h3>,
  p: ({ children }) => <p className="mb-5 leading-relaxed text-ink-soft dark:text-slate-300">{children}</p>,
  ul: ({ children }) => <ul className="mb-5 ml-1 space-y-2">{children}</ul>,
  ol: ({ children }) => <ol className="mb-5 ml-5 list-decimal space-y-2">{children}</ol>,
  li: ({ children }) => (
    <li className="flex gap-2.5 leading-relaxed text-ink-soft dark:text-slate-300">
      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gradient" />
      <span>{children}</span>
    </li>
  ),
  strong: ({ children }) => <strong className="font-semibold text-ink dark:text-white">{children}</strong>,
  a: ({ children, href }) => <a href={href} className="font-medium text-brand-indigo underline underline-offset-2">{children}</a>,
  code: ({ children }) => <code className="rounded bg-brand-indigo/10 px-1.5 py-0.5 font-mono text-sm text-brand-indigo">{children}</code>,
  blockquote: ({ children }) => <blockquote className="my-6 border-l-4 border-brand-indigo/40 pl-4 italic text-ink-muted dark:text-slate-400">{children}</blockquote>,
};

export default function BlogPost() {
  const { slug = '' } = useParams();
  const post = getPostBySlug(slug);

  if (!post) return <Navigate to="/blog" replace />;

  const related = relatedPosts(post.slug);
  const url = `https://wynex-seven.vercel.app/blog/${post.slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription ?? post.excerpt,
    image: post.image,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Organization', name: post.author ?? 'Wynex Technologies' },
    publisher: {
      '@type': 'Organization',
      name: 'Wynex Technologies',
      logo: { '@type': 'ImageObject', url: 'https://wynex-seven.vercel.app/favicon.png' },
    },
    keywords: (post.keywords ?? post.tags ?? []).join(', '),
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };

  return (
    <>
      <Seo title={`${post.title} — Wynex Technologies`} description={post.metaDescription ?? post.excerpt} path={`/blog/${post.slug}`} />
      <Helmet>
        <meta name="keywords" content={(post.keywords ?? post.tags ?? []).join(', ')} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={post.image} />
        <meta name="twitter:image" content={post.image} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <article className="pt-32">
        <div className="container-x">
          <div>
            <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-muted transition-colors hover:text-brand-indigo dark:text-slate-400">
              <ArrowLeft className="h-4 w-4" /> All articles
            </Link>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mt-6">
              <span className="eyebrow">{post.category}</span>
              <h1 className="mt-4 text-balance text-4xl font-bold leading-[1.1] text-ink sm:text-5xl dark:text-white">{post.title}</h1>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-muted dark:text-slate-400">
                <span className="flex items-center gap-1.5"><User className="h-4 w-4" /> {post.author ?? 'Wynex Editorial'}</span>
                <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {formatDate(post.date)}</span>
                <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {post.readTime} read</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-10 overflow-hidden rounded-4xl border border-white/60 shadow-glow dark:border-white/10"
          >
            <img src={post.image} alt={post.title} className="aspect-[16/9] w-full object-cover" />
          </motion.div>

          <div className="mt-12 text-lg">
            {post.content ? (
              <Markdown remarkPlugins={[remarkGfm]} components={mdComponents}>{post.content}</Markdown>
            ) : (
              <p className="leading-relaxed text-ink-muted dark:text-slate-400">{post.excerpt}</p>
            )}

            {post.tags && post.tags.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2 border-t border-ink/10 pt-8 dark:border-white/10">
                {post.tags.map((t) => (
                  <span key={t} className="rounded-full border border-ink/10 px-3 py-1 text-xs font-semibold text-ink-muted dark:border-white/10 dark:text-slate-400">#{t}</span>
                ))}
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="mt-14">
            <div className="flex flex-col items-start justify-between gap-4 rounded-4xl border border-white/60 bg-brand-indigo/5 p-8 backdrop-blur-xl sm:flex-row sm:items-center dark:border-white/10 dark:bg-white/[0.04]">
              <div>
                <h3 className="text-xl font-bold text-ink dark:text-white">Have a project in mind?</h3>
                <p className="mt-1 text-sm text-ink-muted dark:text-slate-400">Let's build something award-winning together.</p>
              </div>
              <Link to="/#contact" className="btn-primary shrink-0">Start a project <ArrowUpRight className="h-4 w-4" /></Link>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-20">
              <h2 className="mb-8 text-2xl font-bold text-ink dark:text-white">More Insights</h2>
              <div className="grid gap-6 md:grid-cols-3 xl:grid-cols-4">
                {related.map((r) => (
                  <Link key={r.id} to={`/blog/${r.slug}`} className="group flex flex-col overflow-hidden rounded-3xl border border-white/60 bg-white/70 shadow-card backdrop-blur-xl transition-all hover:-translate-y-1 hover:shadow-glow dark:border-white/10 dark:bg-white/[0.04]">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img src={r.image} alt={r.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                    </div>
                    <div className="p-5">
                      <span className="text-xs font-bold text-brand-indigo">{r.category}</span>
                      <h3 className="mt-1.5 text-base font-bold leading-snug text-ink dark:text-white">{r.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="h-24" />
        </div>
      </article>
    </>
  );
}
