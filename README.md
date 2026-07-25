# Wynex Technologies

An award-worthy, light-theme marketing site for a premium IT / software agency.
Built with **React 18 + TypeScript + Vite**, heavily animated and fully responsive.

## Tech stack

- **React 18 + TypeScript + Vite** — app foundation & code-splitting
- **Tailwind CSS** — design system (light theme, glassmorphism, gradient mesh)
- **Framer Motion** — component & page-transition animation
- **GSAP + ScrollTrigger** — pinned frame-by-frame scroll storytelling
- **Three.js / React Three Fiber / Drei** — interactive 3D hero orb + particles
- **Lenis** — smooth scroll (wired into ScrollTrigger)
- **Lucide React** — icon set
- **React CountUp**, **React Intersection Observer** — animated stats
- **React Router**, **React Helmet Async** — routing & per-page SEO

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the build
```

## Project structure

```
src/
  components/
    layout/      Navbar, Footer
    sections/    Hero, StoryScroll, Services, Work, Testimonials, …
    three/       HeroScene (R3F)
    ui/          Reusable primitives (Cursor, Loader, Marquee, TiltCard, …)
  constants/     Site config + all content (services, projects, copy)
  context/       ThemeContext (light/dark toggle, default light)
  hooks/         useLenis, useMagnetic
  pages/         Home, Careers, Legal, NotFound
  types/         Shared TS types
  utils/         cn, smooth-scroll helper
public/          favicon, manifest, robots.txt, sitemap.xml
```

## Highlights

- Frame-by-frame Apple-style scroll storytelling (GSAP ScrollTrigger + pin)
- Interactive 3D hero (distorted iridescent orb, orbit rings, particle field), lazy-loaded & code-split
- Custom animated cursor, magnetic buttons, tilt cards, infinite marquees
- Animated loading screen, scroll-progress bar, back-to-top rocket, AI chatbot widget
- Light/Dark mode (default light), PWA manifest, full SEO meta + JSON-LD schema
- 28 services with category filter, filtered project showcase, testimonial slider,
  animated process timeline, pricing, FAQ accordion, blog, contact form + map placeholder
- Accessibility: focus states, aria labels, `prefers-reduced-motion` respected

## AI-authored daily blog

The Insights section, `/blog` index and `/blog/:slug` article pages are driven by JSON files in
`src/content/blog/`. `scripts/generate-blog.mjs` uses the **Google Gemini API** (`@google/genai`,
`gemini-flash-latest`) with structured JSON output to generate one SEO-optimized article per run, and
`.github/workflows/daily-blog.yml` runs it **daily** and commits the result — which triggers a
redeploy that publishes the new post.

```bash
cp .env.example .env      # add your GEMINI_API_KEY (from https://aistudio.google.com/apikey)
npm run generate:blog     # writes a new article into src/content/blog/
```

For CI, add `GEMINI_API_KEY` as a GitHub Actions secret (repo → Settings → Secrets → Actions).
Optionally set `GEMINI_MODEL` (e.g. `gemini-pro-latest`) to change the model.

## Deployment

This is a static SPA — deploy the `dist/` output to any static host. Config files for the two
most common hosts are included, both with the **SPA rewrite** that keeps client-side routes
(`/blog/:slug`, `/privacy`, …) working on direct load / refresh.

### Vercel (`vercel.json` included)
1. Import the GitHub repo at [vercel.com/new](https://vercel.com/new) — the Vite preset is auto-detected.
2. Add the `ANTHROPIC_API_KEY` env var if you want the blog script to run there too (optional; CI already handles daily generation).
3. Deploy. Every push (including the daily blog commit) redeploys automatically.

### Netlify (`netlify.toml` included)
1. "Add new site → Import from Git", pick the repo. Build command `npm run build`, publish dir `dist` (already set in `netlify.toml`).
2. Deploy. Auto-deploys on every push.

Manual / other hosts:

```bash
npm run build     # outputs to dist/
npm run preview   # preview the production build locally
```

Serve `dist/` behind a catch-all rewrite to `index.html` so client-side routes resolve.

## Notes / next steps

- Images use royalty-free Unsplash/pravatar URLs — swap for optimized local assets before launch.
- The contact form and newsletter are simulated on the client — wire to your backend / form service.
- The chatbot uses rule-based canned replies — connect to an LLM endpoint for live AI.
