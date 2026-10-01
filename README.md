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
- Animated loading screen, scroll-progress bar, back-to-top rocket, floating WhatsApp chat button
- Light/Dark mode (default light), PWA manifest, full SEO meta + JSON-LD schema
- 28 services with category filter, filtered project showcase, testimonial slider,
  animated process timeline, pricing, FAQ accordion, blog, contact form + map placeholder
- Accessibility: focus states, aria labels, `prefers-reduced-motion` respected

## AI-authored blog

The Insights section, `/blog` index and `/blog/:slug` article pages are driven by JSON files in
`src/content/blog/`. `.github/workflows/daily-blog.yml` runs `scripts/generate-blog.mjs` **three times a
week** (Mon, Wed, Fri at 06:00 UTC) to publish one article about **trending AI news**:

1. Reads this week's AI headlines from news feeds (OpenAI, Google, Google DeepMind, TechCrunch AI,
   The Verge AI, Hugging Face).
2. Gemini (`@google/genai`, `gemini-flash-latest`) shortlists the stories people are searching for —
   model launches, major features, pricing — skipping topics already published.
3. Fetches the chosen article (or another outlet's coverage if the publisher blocks bots) and writes
   the post using only its facts, with a business/India angle.
4. A second "human editor" pass rewrites AI-sounding phrasing (falling back to the draft if the edit
   drops links or sections), and the source article is linked at the end.
5. Commits the post and deploys the site to Hostinger.

Run it from the Actions tab with **dry_run** ticked to print an article without publishing it.
Removed post URLs return 410 Gone (see `public/.htaccess`).

```bash
cp .env.example .env      # add your GEMINI_API_KEY (from https://aistudio.google.com/apikey)
npm run generate:blog     # writes a new article into src/content/blog/
```

For CI, add `GEMINI_API_KEY` as a GitHub Actions secret (repo → Settings → Secrets → Actions).
Optionally set `GEMINI_MODEL` (e.g. `gemini-pro-latest`) to change the model.

## Deployment (Hostinger)

The site is a static SPA hosted on Hostinger at https://wynextechnologies.com.
`.github/workflows/deploy.yml` builds it and uploads `dist/` to `public_html/` over FTP on every push
to `main`, and the blog workflow calls it after committing each new article, so posts go live
with no manual step.

One-time setup in the repo's Settings → Secrets and variables → Actions:

- **Secrets:** `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD` (hPanel → Files → FTP Accounts) and `GEMINI_API_KEY`.
- **Optional (variable or secret):** `FTP_SERVER_DIR` — upload folder, default `public_html/` (use `./` if the FTP
  account's root already is `public_html`); `FTP_PROTOCOL` — `ftps` by default, set `ftp` if TLS fails.

`public/.htaccess` (copied into `dist/`) handles the SPA fallback so `/blog/:slug` etc. work on direct load,
forces `https://` without `www`, 301-redirects removed blog URLs, and sets cache headers.
`dist/sitemap.xml` is generated on every build by `scripts/generate-sitemap.mjs`, and
`scripts/prerender.ts` writes `dist/_pages/<route>.html` for every page and blog post — each with its own
title, meta tags, canonical, Open Graph image and readable content — which `.htaccess` serves at the
normal URLs so crawlers and link previews don't depend on JavaScript. SEO titles and descriptions live in
`src/constants/seo.ts`, shared by the app and the prerenderer.

Don't delete `.ftp-deploy-sync-state.json` from `public_html/` — the deploy uses it to upload only changed files.

```bash
npm run build     # outputs to dist/
npm run preview   # preview the production build locally
```

## Notes / next steps

- Images use royalty-free Unsplash/pravatar URLs — swap for optimized local assets before launch.
- The contact form and newsletter are simulated on the client — wire to your backend / form service.
