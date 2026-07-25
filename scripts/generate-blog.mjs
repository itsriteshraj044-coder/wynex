#!/usr/bin/env node
/**
 * Generates one SEO-optimized tech blog article per run using the Google
 * Gemini API and writes it as JSON into src/content/blog/. Intended to run
 * daily via CI (see .github/workflows/daily-blog.yml); the commit it produces
 * triggers a rebuild that publishes the new article.
 *
 * Requires: GEMINI_API_KEY in the environment (from Google AI Studio).
 * Optional: GEMINI_MODEL (defaults to gemini-2.5-flash).
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

function existingTitles() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => {
      try {
        return JSON.parse(fs.readFileSync(path.join(BLOG_DIR, f), 'utf8')).title;
      } catch {
        return null;
      }
    })
    .filter(Boolean);
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
        'Full article body in GitHub-flavored Markdown, 700-1100 words. Use ## and ### headings, short paragraphs, at least one bullet list, bold key terms, and a concluding "## The takeaway" section. Do NOT include the H1 title. Natural, human, expert voice. Weave keywords in naturally — no keyword stuffing.',
    },
  },
  required: ['title', 'slug', 'excerpt', 'metaDescription', 'keywords', 'category', 'tags', 'readTime', 'content'],
  propertyOrdering: ['title', 'slug', 'excerpt', 'metaDescription', 'keywords', 'category', 'tags', 'readTime', 'content'],
};

// Retry a single model on 429 (rate limit) with backoff; other errors bubble up.
async function generateWithRetry(ai, model, contents, config) {
  const waitsMs = [0, 20000, 40000]; // before attempts 1, 2, 3
  let lastErr;
  for (let i = 0; i < waitsMs.length; i++) {
    if (waitsMs[i]) {
      console.warn(`Rate limited on "${model}" — waiting ${waitsMs[i] / 1000}s then retrying…`);
      await new Promise((r) => setTimeout(r, waitsMs[i]));
    }
    try {
      return await ai.models.generateContent({ model, contents, config });
    } catch (e) {
      lastErr = e;
      if (Number(e?.status ?? e?.code) !== 429) throw e; // only retry rate limits
    }
  }
  throw lastErr;
}

async function main() {
  // .trim() self-heals the #1 CI failure: a trailing space/newline pasted into
  // the GitHub secret, which makes Google reject the key with a 400/403.
  const apiKey = (process.env.GEMINI_API_KEY || '').trim();
  if (!apiKey) {
    console.error('Missing GEMINI_API_KEY environment variable.');
    process.exit(1);
  }

  const ai = new GoogleGenAI({ apiKey });
  const avoid = existingTitles().slice(0, 40);

  const prompt = `You are a senior technical writer and SEO specialist for Wynex Technologies, a premium software development agency.

Write ONE fresh, genuinely useful, SEO-optimized blog article about a current software/technology topic. Choose a specific, practical angle that developers, founders or product leaders would search for — e.g. web performance, React/Next.js patterns, AI/LLM engineering, cloud/DevOps, mobile, UX/design engineering, security, or developer productivity.

Make it distinct from these already-published titles (do NOT repeat their topics):
${avoid.length ? avoid.map((t) => `- ${t}`).join('\n') : '- (none yet)'}

Requirements:
- Expert, human, non-generic voice. Concrete and actionable, not fluffy.
- Strong SEO: a searchable title, a 140-160 char meta description containing the primary keyword, 5-8 relevant keywords, semantic H2/H3 structure, and natural keyword usage.
- 700-1100 words of Markdown in "content" (no H1). Include at least one bullet list and a final "## The takeaway".
- Pick the single best-fitting category from the allowed list.

Return only the structured JSON object.`;

  const config = {
    temperature: 0.9,
    maxOutputTokens: 8192,
    responseMimeType: 'application/json',
    responseSchema,
  };
  // Try the configured model, then fall back to other "latest" aliases (which
  // track whatever this key is entitled to, avoiding version-specific 404s).
  const candidates = [MODEL, 'gemini-flash-lite-latest', 'gemini-pro-latest'].filter((m, i, a) => a.indexOf(m) === i);

  let response, usedModel, lastErr;
  for (const m of candidates) {
    try {
      response = await generateWithRetry(ai, m, prompt, config);
      usedModel = m;
      break;
    } catch (e) {
      lastErr = e;
      const status = Number(e?.status ?? e?.code);
      // Auth / bad-request problems won't be fixed by trying another model.
      if ([400, 401, 403].includes(status)) throw e;
      console.warn(`Model "${m}" failed (${status || 'error'}); trying next…`);
    }
  }
  if (!response) throw lastErr;

  const raw = response.text;
  if (!raw) {
    console.error('No text returned. Finish reason:', response.candidates?.[0]?.finishReason);
    console.error('Prompt feedback:', JSON.stringify(response.promptFeedback));
    process.exit(1);
  }

  const post = JSON.parse(raw.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim());

  // Normalise + enrich
  const today = new Date().toISOString().slice(0, 10);
  post.slug = slugify(post.slug || post.title);
  post.id = post.slug;
  post.date = today;
  post.author = 'Wynex Editorial';
  const imgId = pick(IMAGES[post.category] || IMAGES.Web);
  post.image = `https://images.unsplash.com/photo-${imgId}?auto=format&fit=crop&w=1200&q=70`;

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
