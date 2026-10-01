#!/usr/bin/env node
/**
 * Pre-renders every route to static HTML after `vite build`.
 *
 * The site is a client-side React app, so without this every URL returns the
 * same index.html: Google has to run JavaScript to see a page's content, and
 * link previews (WhatsApp, LinkedIn, X) always show the homepage. For each
 * route this writes dist/_pages/<route>.html with that page's title,
 * description, canonical, Open Graph tags, JSON-LD and readable content inside
 * #root. public/.htaccess serves those files; React then mounts and replaces
 * #root exactly as before, so visitors see no difference.
 *
 * Runs with Node's built-in TypeScript support (Node >= 22.18) so it can read
 * the same src/constants/*.ts content the app renders.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { BlogPost } from '../src/types/index.ts';
import { PAGE_SEO, SITE_URL, DEFAULT_OG_IMAGE, blogPostSeo, blogPostJsonLd } from '../src/constants/seo.ts';
import type { PageSeo, SeoPath } from '../src/constants/seo.ts';
import { SITE, NAV_ITEMS } from '../src/constants/site.ts';
import { SERVICES } from '../src/constants/services.ts';
import { PROJECTS, PROCESS, FAQS } from '../src/constants/content.ts';
import { ABOUT_STORY, MISSION, VISION, VALUES, WORKING_WITH_US, SERVICE_PILLARS, PROCESS_DETAILS, ENGAGEMENT_MODELS } from '../src/constants/pages.ts';
import { LEGAL } from '../src/constants/legal.ts';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const OUT = path.join(DIST, '_pages');
const BLOG_DIR = path.join(ROOT, 'src', 'content', 'blog');

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const esc = (s: string) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const list = (items: string[]) => `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;
const para = (s: string) => `<p>${esc(s)}</p>`;
const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

const nav = `<nav><ul>${NAV_ITEMS.map((n) => `<li><a href="${n.href}">${esc(n.label)}</a></li>`).join('')}</ul></nav>`;
const footer = `<footer><p>${esc(SITE.name)} · ${esc(SITE.address)} · <a href="mailto:${SITE.email}">${SITE.email}</a> · ${esc(SITE.phone)}</p>
<p><a href="/privacy">Privacy Policy</a> · <a href="/terms">Terms &amp; Conditions</a> · <a href="/cookies">Cookie Policy</a></p></footer>`;

/** Same inline styling as the homepage's crawlable fallback in index.html. */
const page = (inner: string) =>
  `<main style="max-width: 860px; margin: 0 auto; padding: 4rem 1.5rem; font-family: system-ui, sans-serif; color: #0B1020;">\n${nav}\n${inner}\n${footer}\n</main>`;

/* ------------------------------------------------------------------ */
/*  Template                                                           */
/* ------------------------------------------------------------------ */

const TEMPLATE = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');

function setAttr(html: string, pattern: RegExp, value: string, what: string) {
  if (!pattern.test(html)) throw new Error(`prerender: index.html is missing ${what}`);
  return html.replace(pattern, (_m, before: string, after: string) => `${before}${esc(value)}${after}`);
}

interface Render {
  seo: PageSeo;
  path: string;
  body?: string; // omitted = keep index.html's own crawlable content
  image?: string;
  type?: 'website' | 'article';
  jsonLd?: object;
}

function render({ seo, path: route, body, image = DEFAULT_OG_IMAGE, type = 'website', jsonLd }: Render) {
  const url = SITE_URL + (route === '/' ? '/' : route);
  let html = TEMPLATE;
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(seo.title)}</title>`);
  html = setAttr(html, /(<meta data-rh="true" name="description"\s+content=")[^"]*(")/, seo.description, 'meta description');
  html = setAttr(html, /(<meta data-rh="true" property="og:title" content=")[^"]*(")/, seo.title, 'og:title');
  html = setAttr(html, /(<meta data-rh="true" property="og:description" content=")[^"]*(")/, seo.description, 'og:description');
  html = setAttr(html, /(<meta data-rh="true" name="twitter:title" content=")[^"]*(")/, seo.title, 'twitter:title');
  html = setAttr(html, /(<meta data-rh="true" name="twitter:description" content=")[^"]*(")/, seo.description, 'twitter:description');
  html = setAttr(html, /(<meta property="og:type" content=")[^"]*(")/, type, 'og:type');
  html = setAttr(html, /(<meta property="og:image" content=")[^"]*(")/, image, 'og:image');
  html = setAttr(html, /(<meta name="twitter:image" content=")[^"]*(")/, image, 'twitter:image');

  const head = [
    `<link data-rh="true" rel="canonical" href="${esc(url)}" />`,
    `<meta data-rh="true" property="og:url" content="${esc(url)}" />`,
    jsonLd ? `<script data-rh="true" type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>` : '',
  ].filter(Boolean).join('\n    ');
  if (!html.includes('<!--prerender:head-->')) throw new Error('prerender: index.html is missing <!--prerender:head-->');
  html = html.replace('<!--prerender:head-->', head);

  if (body !== undefined) {
    const re = /<!--prerender:body-start-->[\s\S]*?<!--prerender:body-end-->/;
    if (!re.test(html)) throw new Error('prerender: index.html is missing the body markers');
    html = html.replace(re, `<!--prerender:body-start-->\n      ${page(body)}\n      <!--prerender:body-end-->`);
  }

  const file = path.join(OUT, route === '/' ? 'index.html' : `${route.slice(1)}.html`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

const seoFor = (p: SeoPath) => PAGE_SEO[p];

/* ------------------------------------------------------------------ */
/*  Pages                                                              */
/* ------------------------------------------------------------------ */

const posts: BlogPost[] = fs
  .readdirSync(BLOG_DIR)
  .filter((f) => f.endsWith('.json'))
  .map((f) => JSON.parse(fs.readFileSync(path.join(BLOG_DIR, f), 'utf8')) as BlogPost)
  .sort((a, b) => b.date.localeCompare(a.date))
  // Newest wins on a duplicate slug, matching getPostBySlug() in src/utils/blog.ts.
  .filter((p, i, all) => all.findIndex((q) => q.slug === p.slug) === i);

fs.rmSync(OUT, { recursive: true, force: true });

render({ seo: seoFor('/'), path: '/' });

render({
  seo: seoFor('/about'),
  path: '/about',
  body: `<h1>About ${esc(SITE.name)}</h1>
${ABOUT_STORY.map(para).join('\n')}
<h2>${esc(MISSION.title)}</h2>${para(MISSION.text)}
<h2>${esc(VISION.title)}</h2>${para(VISION.text)}
<h2>Our values</h2>${VALUES.map((v) => `<h3>${esc(v.title)}</h3>${para(v.text)}`).join('')}
<h2>Working with us</h2>${WORKING_WITH_US.map((v) => `<h3>${esc(v.title)}</h3>${para(v.text)}`).join('')}`,
});

render({
  seo: seoFor('/work'),
  path: '/work',
  body: `<h1>Our work</h1>
<p>Websites, web apps and mobile apps designed, engineered and launched by ${esc(SITE.name)}.</p>
${PROJECTS.map((p) => `<h2>${esc(p.title)}</h2>
<p><strong>${esc(p.client)}</strong> · ${esc(p.category)}</p>${para(p.description)}
<p>Built with: ${esc(p.tags.join(', '))}</p>${p.link ? `<p><a href="${esc(p.link)}">Visit live site</a></p>` : ''}`).join('\n')}`,
});

render({
  seo: seoFor('/services'),
  path: '/services',
  body: `<h1>Our services</h1>
<p>Websites, mobile apps, business software, cloud, AI, design and marketing — planned, built and supported by one team.</p>
${SERVICE_PILLARS.map((p) => `<h2>${esc(p.title)}</h2>${para(p.summary)}${list(p.includes)}<p>Technologies: ${esc(p.stack.join(', '))}</p>`).join('\n')}
<h2>All services</h2>
<ul>${SERVICES.map((s) => `<li><strong>${esc(s.title)}</strong> — ${esc(s.description)}</li>`).join('')}</ul>
<h2>Frequently asked questions</h2>
${FAQS.map((f) => `<h3>${esc(f.question)}</h3>${para(f.answer)}`).join('')}`,
});

render({
  seo: seoFor('/process'),
  path: '/process',
  body: `<h1>Our process</h1>
<p>Six steps, weekly demos and no surprises — here is what happens at each stage.</p>
${PROCESS.map((s) => {
  const d = PROCESS_DETAILS.find((x) => x.number === s.number);
  return `<h2>${esc(s.number)}. ${esc(s.title)}</h2>${para(d?.intro ?? s.description)}${
    d ? `<h3>What we do</h3>${list(d.activities)}<h3>What you get</h3>${list(d.deliverables)}<p>Typical time: ${esc(d.duration)}</p>` : ''
  }`;
}).join('\n')}
<h2>Ways to work together</h2>
${ENGAGEMENT_MODELS.map((m) => `<h3>${esc(m.title)}</h3><p>Best for: ${esc(m.bestFor)}</p>${list(m.points)}`).join('')}`,
});

render({
  seo: seoFor('/contact'),
  path: '/contact',
  body: `<h1>Contact ${esc(SITE.name)}</h1>
<p>Share your project and we'll get back to you within one business day with next steps and a tailored plan.</p>
<ul>
<li>Email: <a href="mailto:${SITE.email}">${SITE.email}</a></li>
<li>Phone: <a href="tel:${SITE.phone.replace(/\s/g, '')}">${esc(SITE.phone)}</a>, <a href="tel:${SITE.phoneAlt.replace(/\s/g, '')}">${esc(SITE.phoneAlt)}</a></li>
<li>Address: ${esc(SITE.address)}</li>
</ul>`,
});

render({
  seo: seoFor('/blog'),
  path: '/blog',
  body: `<h1>Insights &amp; Blog</h1>
<p>Engineering, design and AI insights from the ${esc(SITE.name)} team.</p>
${posts.map((p) => `<article><h2><a href="/blog/${esc(p.slug)}">${esc(p.title)}</a></h2>
<p>${esc(formatDate(p.date))} · ${esc(p.category)}</p>${para(p.excerpt)}</article>`).join('\n')}`,
});

for (const post of posts) {
  const article = renderToStaticMarkup(createElement(Markdown, { remarkPlugins: [remarkGfm] }, post.content ?? ''));
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  render({
    seo: blogPostSeo(post),
    path: `/blog/${post.slug}`,
    type: 'article',
    image: post.image,
    jsonLd: blogPostJsonLd(post),
    body: `<article>
<p><a href="/blog">All articles</a> · ${esc(post.category)}</p>
<h1>${esc(post.title)}</h1>
<p>${esc(post.author ?? 'Wynex Editorial')} · ${esc(formatDate(post.date))} · ${esc(post.readTime)} read</p>
<img src="${esc(post.image)}" alt="${esc(post.title)}" width="1200" height="630" />
${article}
</article>
<h2>Related articles</h2>
<ul>${related.map((p) => `<li><a href="/blog/${esc(p.slug)}">${esc(p.title)}</a></li>`).join('')}</ul>`,
  });
}

for (const type of ['privacy', 'terms', 'cookies'] as const) {
  const doc = LEGAL[type];
  render({
    seo: seoFor(`/${type}`),
    path: `/${type}`,
    body: `<h1>${esc(doc.title)}</h1>
<p>Last updated: ${esc(doc.updated)}</p>${para(doc.intro)}
${doc.sections.map((s, i) => `<h2>${i + 1}. ${esc(s.heading)}</h2>${s.blocks.map((b) => (typeof b === 'string' ? para(b) : list(b.list))).join('')}`).join('\n')}`,
  });
}

const count = fs.readdirSync(OUT, { recursive: true }).filter((f) => String(f).endsWith('.html')).length;
console.log(`prerender: ${count} pages written to dist/_pages (${posts.length} blog posts)`);
