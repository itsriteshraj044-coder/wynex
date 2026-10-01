#!/usr/bin/env node
/**
 * Writes dist/sitemap.xml after `vite build`. Static routes are listed below;
 * every article in src/content/blog/ is added automatically, so posts from the
 * daily blog workflow are in the sitemap as soon as their commit is deployed.
 *
 * Keep STATIC_ROUTES in sync with the <Route>s in src/App.tsx. Homepage
 * sections (#services, #work, …) are anchors, not pages, so they don't belong here.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE_URL = 'https://wynextechnologies.com';
const STATIC_ROUTES = ['/', '/blog', '/privacy', '/terms', '/cookies'];

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const BLOG_DIR = path.join(ROOT, 'src', 'content', 'blog');
const OUT_FILE = path.join(ROOT, 'dist', 'sitemap.xml');

const escapeXml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

const posts = fs
  .readdirSync(BLOG_DIR)
  .filter((f) => f.endsWith('.json'))
  .map((f) => JSON.parse(fs.readFileSync(path.join(BLOG_DIR, f), 'utf8')))
  .filter((p) => p.slug)
  .sort((a, b) => String(b.date).localeCompare(String(a.date)))
  // Newest wins on a duplicate slug, matching getPostBySlug() in src/utils/blog.ts.
  .filter((p, i, all) => all.findIndex((q) => q.slug === p.slug) === i);

const latestPostDate = posts[0]?.date;

const entries = [
  ...STATIC_ROUTES.map((route) => ({
    loc: SITE_URL + route,
    lastmod: route === '/blog' ? latestPostDate : undefined,
  })),
  ...posts.map((p) => ({ loc: `${SITE_URL}/blog/${p.slug}`, lastmod: p.date })),
];

const isIsoDate = (d) => typeof d === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(d);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    ({ loc, lastmod }) =>
      `  <url><loc>${escapeXml(loc)}</loc>${isIsoDate(lastmod) ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`,
  )
  .join('\n')}
</urlset>
`;

fs.writeFileSync(OUT_FILE, xml);
console.log(`sitemap.xml: ${entries.length} URLs (${posts.length} blog posts)`);
