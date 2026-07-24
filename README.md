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

## Notes / next steps

- Images use royalty-free Unsplash/pravatar URLs — swap for optimized local assets before launch.
- The contact form and newsletter are simulated on the client — wire to your backend / form service.
- The chatbot uses rule-based canned replies — connect to an LLM endpoint for live AI.
