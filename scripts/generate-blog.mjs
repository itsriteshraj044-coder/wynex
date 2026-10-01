#!/usr/bin/env node
/**
 * Writes one SEO-optimized article per run about a trending AI news story and
 * saves it as JSON in src/content/blog/. Each run: (1) reads this week's AI
 * headlines from news feeds (OpenAI, Google, DeepMind, TechCrunch, The Verge,
 * Hugging Face), (2) Gemini shortlists what people are searching for, (3) the
 * top story we haven't covered is written up using only the fetched article's
 * facts, (4) a human-editor pass rewrites AI-sounding prose, (5) the source is
 * linked. Runs three times a week via CI (see .github/workflows/daily-blog.yml);
 * the commit triggers a deploy.
 *
 * Requires: GEMINI_API_KEY in the environment (from Google AI Studio).
 * Optional: GEMINI_MODEL (defaults to gemini-flash-latest).
 *           DRY_RUN=1 prints the article instead of saving it.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { GoogleGenAI, Type } from '@google/genai';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, '..', 'src', 'content', 'blog');
// `gemini-flash-latest` always resolves to the current flash model this key is
// provisioned for (works across Gemini generations without hardcoding a version).
const MODEL = process.env.GEMINI_MODEL || 'gemini-flash-latest';

// Curated, hotlink-friendly Unsplash images by category.
const IMAGES = {
  Performance: ['1531403009284-440f080d1e12', '1460925895917-afdab827c52f', '1518770660439-4636190af475'],
  AI: ['1620712943543-bcc4688e7485', '1677442136019-21780ecad995', '1526374965328-7f61d4dc18c5'],
  Design: ['1467232004584-a241de8bcf5d', '1561070791-2526d30994b5', '1545235617-9465d2a55698'],
  Web: ['1547658719-da2b51169166', '1481487196290-c152efe083f5', '1498050108023-c5249f4df085'],
  Mobile: ['1512941937669-90a1b58e7e9c', '1607252650355-f7fd0460ccdb', '1580910051074-3eb694886505'],
  'Cloud & DevOps': ['1451187580459-43490279c0fa', '1544197150-b99a580bb7a8', '1667372393119-3d4c48d07fc9'],
  Security: ['1550751827-4bd374c3f58b', '1614064641938-3bbee52942c7', '1510915228340-29c85a43dcfe'],
};
const CATEGORIES = Object.keys(IMAGES);

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);
}

// Topic-similarity guard. Generic filler ("Optimizing", "Mastering", "Strategies",
// "High-Scale", …) is ignored so reworded repeats of the same topic still match.
const TITLE_STOPWORDS = new Set(
  'a an and the of for in on with to at by from into via your how why what when using use guide building build architecting architect designing design implementing implement mastering master optimizing optimize optimization improving scaling scale scalable modern advanced high large enterprise production strategies strategy patterns pattern practices best performance resilient reliable effective efficient handling'.split(' '),
);
function titleWords(title) {
  return new Set(
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w && !/^\d{4}$/.test(w) && !TITLE_STOPWORDS.has(w))
      .map((w) => w.replace(/(ing|es|s)$/, '')),
  );
}
// Jaccard similarity of the meaningful words in two titles (0 – 1).
function titleSimilarity(a, b) {
  const A = titleWords(a);
  const B = titleWords(b);
  let shared = 0;
  for (const w of A) if (B.has(w)) shared++;
  return shared / (A.size + B.size - shared) || 0;
}
// Calibrated on this blog's history: true repeats scored ≥ 0.71, while
// related-but-distinct angles (e.g. tracing setup vs. tracing overhead) scored ≤ 0.6.
const DUPLICATE_THRESHOLD = 0.65;

function findDuplicate(candidate, posts) {
  for (const p of posts) {
    if (p.slug === candidate.slug) return { post: p, reason: 'same URL slug' };
    const score = titleSimilarity(candidate.title, p.title);
    if (score >= DUPLICATE_THRESHOLD) return { post: p, reason: `${Math.round(score * 100)}% title overlap` };
  }
  return null;
}

// Cleans model output so we never publish raw escape sequences or messy
// whitespace. Markdown is stored with REAL newlines in JSON (JSON.stringify
// re-escapes them to \n on disk, which react-markdown renders correctly).
function sanitizeContent(md) {
  return String(md || '')
    // Model sometimes emits the two literal characters "\" + "n" instead of a
    // real newline — turn those (and \r\n, \t) into the real thing.
    .replace(/\\r\\n|\\n/g, '\n')
    .replace(/\\t/g, '  ')
    .replace(/\r\n?/g, '\n')
    // Strip a leaked H1 (we render the title ourselves) and any stray code fences.
    .replace(/^\s*#\s+.*\n+/, '')
    .replace(/^```(?:markdown|md)?\s*\n?/i, '')
    .replace(/\n?```\s*$/i, '')
    // Collapse 3+ blank lines and trim trailing spaces per line.
    .replace(/[ \t]+$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function existingPosts() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => {
      try {
        const p = JSON.parse(fs.readFileSync(path.join(BLOG_DIR, f), 'utf8'));
        if (!p.title || !p.slug) return null;
        return { title: p.title, slug: p.slug, category: p.category || '', date: p.date || '' };
      } catch {
        return null;
      }
    })
    .filter(Boolean)
    // Newest first so the model links to fresh, relevant articles.
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: 'Compelling, specific, SEO-friendly title in Title Case.' },
    slug: { type: Type.STRING, description: 'URL-safe slug: lowercase words separated by hyphens.' },
    excerpt: { type: Type.STRING, description: 'One-sentence hook, under 160 characters.' },
    metaDescription: { type: Type.STRING, description: 'SEO meta description, 140-160 characters, includes the primary keyword.' },
    keywords: { type: Type.ARRAY, items: { type: Type.STRING }, description: '5-8 SEO keywords/phrases.' },
    category: { type: Type.STRING, enum: CATEGORIES },
    tags: { type: Type.ARRAY, items: { type: Type.STRING }, description: '3 short tags.' },
    readTime: { type: Type.STRING, description: 'Estimated read time like "6 min".' },
    content: {
      type: Type.STRING,
      description:
        'Full article body in GitHub-flavored Markdown, 800-1200 words. Structure: a 2-3 sentence hook intro; several ## sections (with ### sub-sections where useful) that DELIBERATELY MIX flowing explanatory prose with scannable structure — every major section should pair a short descriptive paragraph with EITHER a bullet list OR a numbered list of concrete points (never wall-to-wall prose, never bullets-only). Bold key terms. Include a fenced code block only when it genuinely helps. End with a "## The takeaway" section. Do NOT include the H1 title. Natural, human, senior-engineer voice. Weave keywords in naturally — no keyword stuffing. IMPORTANT: Insert 2-3 contextual internal links to the RELATED existing articles listed in the prompt, using Markdown links whose href is exactly the given site-relative path (e.g. [natural anchor text](/blog/some-slug)). Only link when the connection is genuinely relevant, place links inline within sentences (never a bare "read more"), and never link to the article you are writing.',
    },
  },
  required: ['title', 'slug', 'excerpt', 'metaDescription', 'keywords', 'category', 'tags', 'readTime', 'content'],
  propertyOrdering: ['title', 'slug', 'excerpt', 'metaDescription', 'keywords', 'category', 'tags', 'readTime', 'content'],
};

// Retry a single model with backoff on rate limits (429) and on Google's
// transient "overloaded" errors (500/503); other errors bubble up.
const RETRYABLE = new Set([429, 500, 503]);
async function generateWithRetry(ai, model, contents, config) {
  const waitsMs = [0, 20000, 40000]; // before attempts 1, 2, 3
  let lastErr;
  for (let i = 0; i < waitsMs.length; i++) {
    if (waitsMs[i]) {
      const status = Number(lastErr?.status ?? lastErr?.code);
      const why = status === 429 ? 'Rate limited' : `Got ${status} (overloaded)`;
      console.warn(`${why} on "${model}" — waiting ${waitsMs[i] / 1000}s then retrying…`);
      await new Promise((r) => setTimeout(r, waitsMs[i]));
    }
    try {
      return await ai.models.generateContent({ model, contents, config });
    } catch (e) {
      lastErr = e;
      const status = Number(e?.status ?? e?.code);
      if (status === 429 && i === 0) {
        // Say which quota ran out (per-minute vs per-day, which model) so a
        // failed run in CI is diagnosable from the log alone.
        const ids = [...new Set(String(e?.message).match(/"quotaId":\s*"[^"]+"/g) || [])].map((q) => q.split('"')[3]);
        const limits = [...new Set(String(e?.message).match(/limit: \d+, model: [\w.-]+/g) || [])];
        console.warn(`  quota hit on "${model}": ${[...ids, ...limits].join(' · ') || String(e?.message).replace(/\s+/g, ' ').slice(0, 900)}`);
      }
      if (!RETRYABLE.has(status)) throw e;
      // A quota of 0 means this key can't use the model at all (e.g. Pro on the
      // free tier); waiting won't help, so move on to the next model.
      if (status === 429 && /limit: 0\b/.test(String(e?.message))) throw e;
    }
  }
  throw lastErr;
}

// Words and phrases that make text read as machine-written.
const AI_TICS = [
  'delve', "in today's fast-paced", 'ever-evolving', 'landscape', 'realm', 'tapestry', 'crucial', 'pivotal',
  'robust', 'seamless', 'leverage', 'harness', 'unlock', 'elevate', 'game-changer', 'game changer', 'cutting-edge',
  'navigate the complexities', "it's important to note", 'it is important to note', 'moreover', 'furthermore',
  'in conclusion', 'embark', 'paramount', 'myriad', 'plethora', 'testament to', 'foster', 'holistic', 'synergy',
  'supercharge', 'unleash', 'revolutionize', 'in the world of', 'when it comes to',
];

const countTics = (text) => {
  const lower = text.toLowerCase();
  return AI_TICS.reduce((n, t) => n + (lower.split(t).length - 1), 0);
};

const EDIT_CONFIG = { temperature: 0.7, maxOutputTokens: 8192, responseMimeType: 'text/plain' };

const editPrompt = (draft) => `You are a sharp human editor at Wynex Technologies, a software agency in Patna, India. Rewrite the article below so it reads like an experienced engineer wrote it for clients and fellow developers — natural, direct and specific — not like AI output.

Do:
- Vary sentence length; mix short punchy lines with longer explanations.
- Use contractions and plain words. Address the reader as "you" where it fits.
- Prefer concrete detail: real tools, numbers, trade-offs, a quick example from client work.
- Cut filler, hedging and generic openers. Use em dashes sparingly.
- Never use these words or phrases: ${AI_TICS.join(', ')}.

Keep exactly:
- The same facts and technical accuracy. Don't invent statistics, clients or quotes.
- The Markdown structure: every ## and ### heading (you may reword them), lists, code blocks, and the final "## The takeaway" section.
- Every Markdown link, with its URL unchanged — e.g. [text](/blog/some-slug). You may reword the anchor text.
- Roughly the same length (within about 15%).

Return only the edited Markdown article — no title, no notes, no code fences around it.

ARTICLE:
${draft}`;

const links = (md) => [...md.matchAll(/\]\(([^)\s]+)\)/g)].map((m) => m[1]).sort();
const wordCount = (md) => md.split(/\s+/).filter(Boolean).length;
const h2Count = (md) => (md.match(/^##\s/gm) || []).length;

/** Returns the edited article, or the draft unchanged if the edit fails a check. */
async function humanize(draft, run) {
  let edited;
  try {
    const { response } = await run(editPrompt(draft));
    edited = sanitizeContent(response.text || '');
  } catch (e) {
    console.warn(`  ⚠ human edit skipped (model error: ${e?.message || e})`);
    return draft;
  }
  const problems = [];
  const before = links(draft);
  const after = new Set(links(edited));
  if (before.some((l) => !after.has(l))) problems.push('dropped a link');
  const ratio = wordCount(edited) / Math.max(1, wordCount(draft));
  if (ratio < 0.8 || ratio > 1.25) problems.push(`length changed ${Math.round((ratio - 1) * 100)}%`);
  if (h2Count(edited) < h2Count(draft) - 1) problems.push('lost sections');
  if (/^##\s+The takeaway/m.test(draft) && !/^##\s+The takeaway/m.test(edited)) problems.push('lost "The takeaway"');
  if (problems.length) {
    console.warn(`  ⚠ human edit rejected (${problems.join('; ')}) — publishing the original draft`);
    return draft;
  }
  console.log(`  human edit: ${wordCount(draft)} → ${wordCount(edited)} words · AI phrases ${countTics(draft)} → ${countTics(edited)}`);
  return edited;
}

/* ------------------------------------------------------------------ */
/*  Trending AI news: read news feeds, pick a story, read the article  */
/* ------------------------------------------------------------------ */

// Official AI blogs plus newsrooms that cover the rest (Anthropic, Meta, xAI…).
// Reading feeds directly is free and gives real article links; Gemini's own
// Google Search grounding isn't available on the free API tier.
const NEWS_FEEDS = [
  'https://openai.com/news/rss.xml',
  'https://blog.google/technology/ai/rss/',
  'https://deepmind.google/blog/rss.xml',
  'https://techcrunch.com/category/artificial-intelligence/feed/',
  'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml',
  'https://huggingface.co/blog/feed.xml',
];
// How each feed's publisher is named in the article ("according to TechCrunch…").
const SOURCE_NAMES = {
  'openai.com': 'OpenAI',
  'blog.google': 'Google',
  'deepmind.google': 'Google DeepMind',
  'techcrunch.com': 'TechCrunch',
  'theverge.com': 'The Verge',
  'huggingface.co': 'Hugging Face',
};
const MAX_STORY_AGE_DAYS = 7;
const BOT_UA = 'Mozilla/5.0 (compatible; WynexBlogBot/1.0; +https://wynextechnologies.com)';

const decodeEntities = (s) =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&#8217;|&rsquo;|&#x27;/g, "'")
    .replace(/&#8216;|&lsquo;/g, "'")
    .replace(/&#8220;|&#8221;|&ldquo;|&rdquo;/g, '"')
    .replace(/&#8211;|&ndash;/g, '–')
    .replace(/&#8212;|&mdash;/g, '—')
    .replace(/&nbsp;|&#160;/g, ' ');

const stripTags = (html) =>
  decodeEntities(
    html
      .replace(/<(script|style|noscript|svg|nav|footer|header|form|aside)[\s\S]*?<\/\1>/gi, ' ')
      .replace(/<[^>]+>/g, ' '),
  )
    .replace(/\s+/g, ' ')
    .trim();

function feedTag(block, name) {
  const m = block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, 'i'));
  // Unwrap CDATA first, or the tag stripper would remove it along with the text.
  return m ? stripTags(m[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')) : '';
}

function parseFeed(xml, feedUrl) {
  const host = new URL(feedUrl).hostname.replace(/^www\./, '');
  const source = SOURCE_NAMES[host] ?? host;
  const blocks = xml.match(/<item[\s>][\s\S]*?<\/item>|<entry[\s>][\s\S]*?<\/entry>/gi) || [];
  return blocks.map((b) => {
    const atomLink = (b.match(/<link[^>]*rel="alternate"[^>]*href="([^"]+)"/i) || b.match(/<link[^>]*href="([^"]+)"/i) || [])[1];
    const link = (feedTag(b, 'link') || atomLink || '').trim();
    const when = feedTag(b, 'pubDate') || feedTag(b, 'published') || feedTag(b, 'updated') || feedTag(b, 'dc:date');
    const time = Date.parse(when);
    return {
      title: feedTag(b, 'title'),
      link,
      date: Number.isNaN(time) ? '' : new Date(time).toISOString().slice(0, 10),
      summary: (feedTag(b, 'description') || feedTag(b, 'summary')).slice(0, 300),
      source,
    };
  });
}

async function fetchText(url, ms = 15000) {
  const res = await fetch(url, { headers: { 'user-agent': BOT_UA }, redirect: 'follow', signal: AbortSignal.timeout(ms) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

/** Recent AI headlines from all feeds, newest first, de-duplicated by title. */
async function collectNews(today) {
  const cutoff = new Date(Date.parse(today) - MAX_STORY_AGE_DAYS * 864e5).toISOString().slice(0, 10);
  const results = await Promise.allSettled(NEWS_FEEDS.map(async (f) => parseFeed(await fetchText(f), f)));
  const items = [];
  results.forEach((r, i) => {
    if (r.status === 'fulfilled') items.push(...r.value);
    else console.warn(`  feed skipped (${r.reason?.message || r.reason}): ${NEWS_FEEDS[i]}`);
  });
  const seen = new Set();
  return items
    .filter((it) => it.title && /^https?:\/\//.test(it.link) && it.date && it.date >= cutoff && it.date <= today)
    .sort((a, b) => b.date.localeCompare(a.date))
    .filter((it) => {
      const key = it.title.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 60);
}

const pickSchema = {
  type: Type.OBJECT,
  properties: { picks: { type: Type.ARRAY, items: { type: Type.INTEGER }, description: 'Indexes of the chosen headlines, best first.' } },
  required: ['picks'],
};
// Thinking models count their reasoning against maxOutputTokens, so leave room
// even though the answer itself is tiny.
const PICK_CONFIG = { temperature: 0.2, maxOutputTokens: 8192, responseMimeType: 'application/json', responseSchema: pickSchema };

const pickPrompt = (news, posts) => `You run the blog of Wynex Technologies, a software agency. From this week's AI headlines below, choose up to 8 that the most people will be searching for right now, best first.

Prefer: new AI model launches and major upgrades (OpenAI/ChatGPT, Google Gemini, Anthropic Claude, Meta Llama, xAI Grok, Microsoft Copilot, Mistral, DeepSeek, Apple and similar), big new AI features or products, and pricing/availability changes that affect businesses or developers.
Avoid: funding rounds, lawsuits, opinion pieces, research papers with no product, minor tutorials, and anything already covered by these published articles:
${posts.length ? posts.map((p) => `- ${p.title}`).join('\n') : '- (none yet)'}

Headlines:
${news.map((n, i) => `${i}. [${n.date}] (${n.source}) ${n.title}${n.summary ? ` — ${n.summary.slice(0, 160)}` : ''}`).join('\n')}

Return JSON: {"picks": [indexes]}.`;

/** The article's readable text, or null if it can't be fetched or is too thin. */
async function readArticle(url) {
  try {
    const html = await fetchText(url);
    const main = (html.match(/<article[\s\S]*?<\/article>/i) || html.match(/<main[\s\S]*?<\/main>/i) || [html])[0];
    let text = stripTags(main);
    // Some sites keep little inside <article>; fall back to the whole page.
    if (text.length < 1000) text = stripTags(html);
    return text.length >= 1000 ? text.slice(0, 14000) : null;
  } catch (e) {
    console.warn(`  couldn't read ${url} (${e.message})`);
    return null;
  }
}

const articlePrompt = (story, sourceText, posts, linkable, today) => `You are a senior technical writer at Wynex Technologies, a software development agency in Patna, India. Write ONE SEO-optimized blog article about this week's AI news. Today is ${today}.

NEWS: ${story.title}
Published ${story.date} by ${story.source}: ${story.link}

SOURCE ARTICLE TEXT (your only source of facts — do not invent numbers, dates, features, prices, benchmarks or quotes; if a detail isn't here, leave it out):
"""
${sourceText}
"""

Write for business owners, product teams and developers who just heard the news and are searching for it. Structure:
- A 2-3 sentence hook: what was announced and why it matters.
- ## What was announced — the key facts, clearly.
- ## What's new — what changed or how it compares (only where the source supports it).
- ## What it means for businesses and developers — practical impact, including for teams in India.
- ## How to try it or prepare — concrete next steps.
- ## The takeaway
Mix short paragraphs with bullet lists. Attribute the news to ${story.source} once in the intro. Do NOT add a "Sources" section — it is added automatically.

Title: specific and searchable — name the company and product/model (e.g. "Google's Gemini 3.5 Is Here: What's New and What It Means for Your Business"). No clickbait; don't start with "Optimizing" or "Mastering".

Already published (don't repeat these topics):
${posts.length ? posts.map((p) => `- ${p.title}`).join('\n') : '- (none yet)'}

Internal links: only if genuinely relevant, link 1-2 of these inline with the exact path; otherwise skip:
${linkable.length ? linkable.map((p) => `- [${p.title}](/blog/${p.slug})`).join('\n') : '- (none)'}

Requirements: 800-1200 words of Markdown in "content" (no H1); a 140-160 character meta description with the main keyword; 5-8 keywords; category "AI".

Return only the structured JSON object.`;

const sourceLabel = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
};

async function main() {
  // .trim() self-heals the #1 CI failure: a trailing space/newline pasted into
  // the GitHub secret, which makes Google reject the key with a 400/403.
  const apiKey = (process.env.GEMINI_API_KEY || '').trim();
  if (!apiKey) {
    console.error('Missing GEMINI_API_KEY environment variable.');
    process.exit(1);
  }

  const ai = new GoogleGenAI({ apiKey });
  const posts = existingPosts();
  const linkable = posts.slice(0, 24);
  const category = 'AI';
  const today = new Date().toISOString().slice(0, 10);

  const config = {
    temperature: 0.8,
    maxOutputTokens: 8192,
    responseMimeType: 'application/json',
    responseSchema,
  };
  // Try the configured model, then fall back to other "latest" aliases (which
  // track whatever this key is entitled to, avoiding version-specific 404s).
  const candidates = [MODEL, 'gemini-flash-lite-latest', 'gemini-pro-latest'].filter((m, i, a) => a.indexOf(m) === i);

  async function generate(prompt, cfg = config) {
    let lastErr;
    for (const m of candidates) {
      try {
        return { response: await generateWithRetry(ai, m, prompt, cfg), model: m };
      } catch (e) {
        lastErr = e;
        const status = Number(e?.status ?? e?.code);
        // Auth / bad-request problems won't be fixed by trying another model.
        if ([400, 401, 403].includes(status)) throw e;
        console.warn(`Model "${m}" failed (${status || 'error'}); trying next…`);
      }
    }
    throw lastErr;
  }

  // 1. This week's AI headlines, straight from the news feeds.
  const news = await collectNews(today);
  console.log(`News: ${news.length} AI headlines from the last ${MAX_STORY_AGE_DAYS} days`);
  if (!news.length) {
    console.error('\nNo article published: no recent AI headlines could be read from the news feeds.');
    process.exit(1);
  }

  // 2. Let Gemini shortlist the stories people are most likely searching for.
  const { response: pickRes } = await generate(pickPrompt(news, posts), PICK_CONFIG);
  let picks = [];
  const pickText = (pickRes.text || '').replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '').trim();
  try {
    picks = JSON.parse(pickText || '{}').picks || [];
  } catch {
    /* handled below */
  }
  const shortlist = [...new Set(picks.map(Number))].filter((i) => Number.isInteger(i) && news[i]).map((i) => news[i]);
  console.log('Shortlist:');
  for (const s of shortlist) console.log(`  - [${s.date}] (${s.source}) ${s.title}`);
  if (!shortlist.length) {
    console.error('\nNo article published: Gemini did not shortlist any headline.');
    console.error(`  finish reason: ${pickRes.candidates?.[0]?.finishReason ?? 'unknown'} · reply: ${pickText.slice(0, 300) || '(empty)'}`);
    process.exit(1);
  }

  // 3. Write up the first shortlisted story that's new to us and readable.
  const MAX_ATTEMPTS = 3;
  let post, usedModel, story;
  let attempts = 0;
  for (const pick of shortlist) {
    let s = pick;
    const already = findDuplicate({ title: s.title, slug: slugify(s.title) }, posts);
    if (already) {
      console.warn(`Skipping "${s.title}" — already covered by "${already.post.title}" (${already.reason}).`);
      continue;
    }
    let sourceText = await readArticle(s.link);
    if (!sourceText) {
      // Some publishers (OpenAI, for one) block bots. Fall back to another
      // outlet's coverage of the same news, matched on the headline.
      const others = news
        .filter((n) => n.source !== s.source)
        .map((n) => ({ n, score: titleSimilarity(n.title, s.title) }))
        .filter((x) => x.score >= 0.2)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);
      for (const { n } of others) {
        sourceText = await readArticle(n.link);
        if (sourceText) {
          console.log(`  "${s.title}" (${s.source}) is unreadable; using ${n.source}'s coverage: ${n.title}`);
          s = n;
          break;
        }
      }
    }
    if (!sourceText) {
      console.warn(`Skipping "${s.title}" — couldn't read the article or find other coverage.`);
      continue;
    }
    if (++attempts > MAX_ATTEMPTS) break;
    const { response, model } = await generate(articlePrompt(s, sourceText, posts, linkable, today));
    const raw = response.text;
    if (!raw) {
      console.error('No text returned. Finish reason:', response.candidates?.[0]?.finishReason);
      continue;
    }
    const candidate = JSON.parse(raw.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim());
    candidate.slug = slugify(candidate.slug || candidate.title);
    const dup = findDuplicate(candidate, posts);
    if (dup) {
      console.warn(`"${candidate.title}" duplicates "${dup.post.title}" (${dup.reason}); trying the next story.`);
      continue;
    }
    post = candidate;
    usedModel = model;
    story = s;
    break;
  }
  if (!post) {
    console.error('\nNo article published: every shortlisted story was already covered, unreadable or failed to generate.');
    process.exit(1);
  }

  // Normalise + enrich
  post.id = post.slug;
  post.category = category;

  // Clean up escape sequences / stray fences / whitespace before anything else.
  post.content = sanitizeContent(post.content);

  // Human editing pass: a second, editor-style rewrite that strips AI tics and
  // reads like a person wrote it. Falls back to the draft if anything looks off.
  post.content = await humanize(post.content, (prompt) => generate(prompt, EDIT_CONFIG));

  // Guard interlinks: keep only Markdown links that point to a real /blog/<slug>
  // (and never to this same article). Unknown internal links are unwrapped to
  // plain text so we never publish a dead link.
  const validSlugs = new Set(posts.map((p) => p.slug).concat(post.slug));
  let kept = 0;
  post.content = post.content.replace(
    /\[([^\]]+)\]\((\/blog\/[a-z0-9-]+)\)/gi,
    (whole, text, href) => {
      const target = href.replace('/blog/', '');
      if (target !== post.slug && validSlugs.has(target)) {
        kept++;
        return whole;
      }
      return text; // drop dead/self links, keep the anchor words
    },
  );

  // Cite the article the facts came from.
  const label = `${story.source} — ${story.title}`.replace(/[[\]]/g, '');
  post.content += `\n\n## Source\n\n- [${label}](${story.link})`;

  // Structural quality gate: a good article needs H2 sections, at least one
  // list, and (when there are posts to link) real internal links. We warn
  // loudly rather than fail the run so a scheduled post is never blocked, but the
  // signal is visible in CI logs.
  const hasHeadings = (post.content.match(/^##\s/gm) || []).length >= 2;
  const hasList = /^\s*([-*]|\d+\.)\s/m.test(post.content);
  const words = post.content.split(/\s+/).filter(Boolean).length;
  const warns = [];
  if (!hasHeadings) warns.push('fewer than 2 H2 sections');
  if (!hasList) warns.push('no bullet/numbered list (point-wise structure missing)');
  if (words < 700) warns.push(`only ${words} words`);
  if (linkable.length && kept === 0) warns.push('no internal links (interlinking missing)');
  if (warns.length) console.warn(`  ⚠ quality check: ${warns.join('; ')}`);
  console.log(`  internal links kept: ${kept} · words: ${words} · lists: ${hasList ? 'yes' : 'no'}`);
  post.date = today;
  post.author = 'Wynex Editorial';
  const imgId = pick(IMAGES[post.category] || IMAGES.Web);
  post.image = `https://images.unsplash.com/photo-${imgId}?auto=format&fit=crop&w=1200&q=70`;

  if (process.env.DRY_RUN) {
    console.log(`
[dry run] Not saved. Model: ${usedModel}
Story: ${story.title} (${story.date}, ${story.source})
Title: ${post.title}
Slug: ${post.slug}
Meta: ${post.metaDescription}
Words: ${words}

${post.content.slice(0, 1500)}
…
${post.content.slice(-600)}`);
    return;
  }

  fs.mkdirSync(BLOG_DIR, { recursive: true });
  let file = path.join(BLOG_DIR, `${today}-${post.slug}.json`);
  let n = 2;
  while (fs.existsSync(file)) {
    file = path.join(BLOG_DIR, `${today}-${post.slug}-${n++}.json`);
  }
  fs.writeFileSync(file, JSON.stringify(post, null, 2) + '\n');

  console.log(`✓ Generated with ${usedModel}: ${post.title}`);
  console.log(`  ${path.relative(path.join(__dirname, '..'), file)}`);
}

main().catch((err) => {
  const status = Number(err?.status ?? err?.code);
  console.error('\nBlog generation failed.');
  if ([400, 401, 403].includes(status)) {
    console.error('→ API key / permission problem. Re-check the GEMINI_API_KEY secret has NO extra');
    console.error('  spaces or newline, and that the key is valid & enabled for the Gemini API.');
  } else if (status === 404) {
    console.error('→ Model not available to this key. Set the GEMINI_MODEL secret to a supported model.');
  } else if (status === 429) {
    console.error('→ Rate limit / quota exceeded. Wait and retry, or enable billing on the key.');
  }
  console.error(err?.message || err);
  process.exit(1);
});
