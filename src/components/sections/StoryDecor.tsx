import type { ReactNode } from 'react';
import { TrendingUp, Rocket, Palette, Zap } from 'lucide-react';
import { SiReact, SiTypescript, SiNodedotjs, SiDocker } from 'react-icons/si';
import { cn } from '../../utils/cn';

/* ------------------------------------------------------------------ */
/*  Small presentational "3D card" widgets                            */
/* ------------------------------------------------------------------ */

function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'rounded-3xl border border-white/60 bg-white/75 p-6 shadow-glow backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.07]',
        className
      )}
    >
      {children}
    </div>
  );
}

function DashboardCard() {
  const bars = [45, 68, 52, 82, 60, 92];
  return (
    <Card className="w-60">
      <div className="flex items-center justify-between">
        <span className="text-base font-bold text-ink dark:text-white">Analytics</span>
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
      </div>
      <div className="mt-4 flex h-24 items-end gap-2">
        {bars.map((h, i) => (
          <div key={i} className="flex-1 rounded-md bg-brand-gradient" style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-emerald-500">
        <TrendingUp className="h-4 w-4" /> +24.8%
      </div>
    </Card>
  );
}

function TechCard() {
  const icons = [
    { I: SiReact, c: '#61DAFB' },
    { I: SiTypescript, c: '#3178C6' },
    { I: SiNodedotjs, c: '#539E43' },
    { I: SiDocker, c: '#2496ED' },
  ];
  return (
    <Card className="w-52">
      <p className="mb-4 text-base font-bold text-ink dark:text-white">Tech stack</p>
      <div className="grid grid-cols-2 gap-3">
        {icons.map(({ I, c }, i) => (
          <div key={i} className="grid h-14 w-14 place-items-center rounded-2xl bg-white/80 shadow-sm dark:bg-white/10">
            <I style={{ color: c, fontSize: 28 }} />
          </div>
        ))}
      </div>
    </Card>
  );
}

function CodeCard() {
  return (
    <Card className="w-72">
      <div className="mb-4 flex gap-2">
        <span className="h-3 w-3 rounded-full bg-rose-400" />
        <span className="h-3 w-3 rounded-full bg-amber-400" />
        <span className="h-3 w-3 rounded-full bg-emerald-400" />
      </div>
      <pre className="font-mono text-[13px] leading-[1.8] text-ink dark:text-slate-200">
        <div><span className="text-brand-purple">const</span> <span className="text-brand-sky">app</span> = <span className="text-emerald-500">build</span>();</div>
        <div className="text-ink-muted dark:text-slate-500">{'// ship award-winning'}</div>
        <div><span className="text-brand-purple">await</span> app.<span className="text-brand-indigo">deploy</span>();</div>
        <div className="text-emerald-500">✓ live in production<span className="ml-1 inline-block h-4 w-2 animate-pulse bg-brand-indigo align-middle" /></div>
      </pre>
    </Card>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <Card className="w-56">
      <p className="font-heading text-4xl font-extrabold"><span className="text-gradient">{value}</span></p>
      <p className="mt-0.5 text-sm text-ink-muted dark:text-slate-400">{label}</p>
      <svg viewBox="0 0 120 32" className="mt-3 h-9 w-full">
        <polyline points="0,26 20,18 40,22 60,10 80,14 100,4 120,8" fill="none" stroke="url(#sg)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <defs>
          <linearGradient id="sg" x1="0" x2="1">
            <stop offset="0" stopColor="#6366F1" />
            <stop offset="1" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
      </svg>
    </Card>
  );
}

function RingCard({ pct, label }: { pct: number; label: string }) {
  const r = 18;
  const c = 2 * Math.PI * r;
  const off = c * (1 - pct / 100);
  return (
    <Card className="flex w-52 items-center gap-4">
      <svg viewBox="0 0 48 48" className="h-16 w-16 -rotate-90">
        <circle cx="24" cy="24" r={r} fill="none" stroke="currentColor" strokeWidth="5" className="text-ink/10 dark:text-white/10" />
        <circle cx="24" cy="24" r={r} fill="none" stroke="url(#rg)" strokeWidth="5" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off} />
        <defs>
          <linearGradient id="rg" x1="0" x2="1">
            <stop offset="0" stopColor="#4F46E5" />
            <stop offset="1" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
      </svg>
      <div>
        <p className="text-2xl font-extrabold text-ink dark:text-white">{pct}%</p>
        <p className="text-sm text-ink-muted dark:text-slate-400">{label}</p>
      </div>
    </Card>
  );
}

function ToastCard({ icon, title, sub }: { icon: ReactNode; title: string; sub: string }) {
  return (
    <Card className="flex w-72 items-center gap-4">
      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-gradient text-white">{icon}</span>
      <div>
        <p className="text-base font-bold text-ink dark:text-white">{title}</p>
        <p className="text-sm text-ink-muted dark:text-slate-400">{sub}</p>
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Layout: four floating cards, one per side, per frame              */
/* ------------------------------------------------------------------ */

const POSITIONS = [
  { pos: 'left-2 top-20 sm:left-6 sm:top-28 xl:left-16 xl:top-32', origin: 'origin-top-left', tilt: 'perspective(1100px) rotateY(15deg) rotateX(7deg)', delay: 0 },     // top-left
  { pos: 'right-2 top-20 sm:right-6 sm:top-28 xl:right-16 xl:top-32', origin: 'origin-top-right', tilt: 'perspective(1100px) rotateY(-15deg) rotateX(7deg)', delay: 0.9 },  // top-right
  { pos: 'left-2 bottom-20 sm:left-6 sm:bottom-28 xl:left-16 xl:bottom-32', origin: 'origin-bottom-left', tilt: 'perspective(1100px) rotateY(15deg) rotateX(-7deg)', delay: 1.4 }, // bottom-left
  { pos: 'right-2 bottom-20 sm:right-6 sm:bottom-28 xl:right-16 xl:bottom-32', origin: 'origin-bottom-right', tilt: 'perspective(1100px) rotateY(-15deg) rotateX(-7deg)', delay: 0.4 }, // bottom-right
];

// A pool of widgets; each frame shows a rotated selection so all four differ.
const POOL: ReactNode[] = [
  <DashboardCard />,
  <StatCard value="45M+" label="Users reached" />,
  <CodeCard />,
  <RingCard pct={98} label="Client retention" />,
  <TechCard />,
  <ToastCard icon={<Rocket className="h-6 w-6" />} title="Deployed" sub="Zero downtime" />,
  <StatCard value="320+" label="Products shipped" />,
  <RingCard pct={92} label="Perf score" />,
  <ToastCard icon={<Palette className="h-6 w-6" />} title="Design system" sub="Pixel perfect" />,
  <ToastCard icon={<Zap className="h-6 w-6" />} title="Blazing fast" sub="Sub-second loads" />,
];

/** Four floating 3D cards surrounding a story frame. `index` rotates the selection. */
export default function StoryDecor({ index }: { index: number }) {
  return (
    <div aria-hidden="true">
      {POSITIONS.map((p, i) => {
        const widget = POOL[(index * 4 + i) % POOL.length];
        return (
          <div key={i} className={cn('absolute z-0 scale-[0.42] sm:scale-[0.58] md:scale-[0.75] lg:scale-100', p.origin, p.pos)}>
            <div style={{ transform: p.tilt, transformStyle: 'preserve-3d' }}>
              <div className="animate-float" style={{ animationDelay: `${p.delay}s` }}>
                {widget}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
