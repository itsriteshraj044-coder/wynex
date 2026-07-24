import type { BlogPost } from '../types';

/**
 * Loads every article JSON in src/content/blog at build time.
 * The daily AI generation script writes new files here; a rebuild
 * (triggered by the GitHub Action commit) publishes them.
 */
const modules = import.meta.glob('../content/blog/*.json', { eager: true }) as Record<
  string,
  { default: BlogPost }
>;

export const BLOG_POSTS: BlogPost[] = Object.values(modules)
  .map((m) => m.default)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function relatedPosts(slug: string, limit = 3): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, limit);
}

/** ISO (YYYY-MM-DD) → "Jul 25, 2026". */
export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
