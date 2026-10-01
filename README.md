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
`.github/workflows/daily-blog.yml` runs it **daily** and commits the result — and then deploys the
site to Hostinger so the new post goes live.

```bash
cp .env.example .env      # add your GEMINI_API_KEY (from https://aistudio.google.com/apikey)
npm run generate:blog     # writes a new article into src/content/blog/
```

For CI, add `GEMINI_API_KEY` as a GitHub Actions secret (repo → Settings → Secrets → Actions).
Optionally set `GEMINI_MODEL` (e.g. `gemini-pro-latest`) to change the model.

## Deployment (Hostinger)

The site is a static SPA hosted on Hostinger at https://wynextechnologies.com.
`.github/workflows/deploy.yml` builds it and uploads `dist/` to `public_html/` over FTP on every push
to `main`, and the daily blog workflow calls it after committing each new article, so posts go live
with no manual step.

One-time setup in the repo's Settings → Secrets and variables → Actions:

- **Secrets:** `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD` (hPanel → Files → FTP Accounts) and `GEMINI_API_KEY`.
- **Optional (variable or secret):** `FTP_SERVER_DIR` — upload folder, default `public_html/` (use `./` if the FTP
  account's root already is `public_html`); `FTP_PROTOCOL` — `ftps` by default, set `ftp` if TLS fails.

`public/.htaccess` (copied into `dist/`) handles the SPA fallback so `/blog/:slug` etc. work on direct load,
forces `https://` without `www`, 301-redirects removed blog URLs, and sets cache headers.
`dist/sitemap.xml` is generated on every build by `scripts/generate-sitemap.mjs`.

Don't delete `.ftp-deploy-sync-state.json` from `public_html/` — the deploy uses it to upload only changed files.

```bash
npm run build     # outputs to dist/
npm run preview   # preview the production build locally
```

## Notes / next steps

- Images use royalty-free Unsplash/pravatar URLs — swap for optimized local assets before launch.
- The contact form and newsletter are simulated on the client — wire to your backend / form service.
- The chatbot uses rule-based canned replies — connect to an LLM endpoint for live AI.
