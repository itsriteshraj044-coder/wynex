import { motion, useReducedMotion, useTime, useTransform } from 'framer-motion';

const rad = (deg: number) => (deg * Math.PI) / 180;

/* Shared gradient defs helper */
function Defs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#6366f1" />
        <stop offset="0.5" stopColor="#8b5cf6" />
        <stop offset="1" stopColor="#06b6d4" />
      </linearGradient>
    </defs>
  );
}

const loop = { repeat: Infinity, ease: 'easeInOut' as const };

/* 1 — Deployment pipeline: milestones pulse, progress line fills, dot travels */
export function DeployPipeline() {
  const reduced = useReducedMotion();
  const nodes = [24, 112, 200, 288];
  return (
    <svg viewBox="0 0 312 96" className="h-full w-full overflow-visible">
      <Defs id="pl" />
      <line x1="24" y1="48" x2="288" y2="48" stroke="currentColor" strokeOpacity="0.12" strokeWidth="3" strokeLinecap="round" />
      <motion.line
        x1="24" y1="48" x2="288" y2="48" stroke="url(#pl)" strokeWidth="3" strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={reduced ? { pathLength: 1 } : { pathLength: [0, 1, 1, 0] }}
        transition={reduced ? undefined : { duration: 4, times: [0, 0.55, 0.8, 1], ...loop }}
      />
      {nodes.map((x, i) => (
        <motion.g
          key={x}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          animate={reduced ? undefined : { scale: [1, 1.3, 1] }}
          transition={reduced ? undefined : { duration: 2, delay: i * 0.4, ...loop }}
        >
          <circle cx={x} cy="48" r="10" className="fill-white dark:fill-[#0d1424]" />
          <circle cx={x} cy="48" r="10" fill="none" stroke="url(#pl)" strokeWidth="2.5" />
          <circle cx={x} cy="48" r="4" fill="url(#pl)" />
        </motion.g>
      ))}
      {!reduced && (
        <motion.circle r="5" cy="48" fill="#06b6d4"
          animate={{ cx: [24, 288], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.4, ...loop }} />
      )}
    </svg>
  );
}

/* 2 — Speed gauge: needle sweeps inside the arc. The base stays pinned at
   (80,84); only the tip is animated along the arc, so it can never drift. */
export function SpeedGauge() {
  const reduced = useReducedMotion();
  const time = useTime();
  const L = 46; // needle length (< arc radius 60, so tip stays inside)
  // Smooth sinusoidal sweep between -66deg and +64deg around vertical.
  const angle = useTransform(time, (v) => (reduced ? 38 : -1 + 65 * Math.sin((v / 4000) * Math.PI * 2)));
  const x2 = useTransform(angle, (a) => 80 + L * Math.sin(rad(a)));
  const y2 = useTransform(angle, (a) => 84 - L * Math.cos(rad(a)));
  // Arc fill tracks the needle: -90deg = empty (left), +90deg = full (right).
  const fill = useTransform(angle, (a) => (a + 90) / 180);
  return (
    <svg viewBox="0 0 160 96" className="h-full w-full">
      <Defs id="gg" />
      <path d="M20 84 A60 60 0 0 1 140 84" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="10" strokeLinecap="round" />
      <motion.path
        d="M20 84 A60 60 0 0 1 140 84" fill="none" stroke="url(#gg)" strokeWidth="10" strokeLinecap="round"
        style={{ pathLength: fill }}
      />
      <motion.line
        x1="80" y1="84" x2={x2} y2={y2}
        stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" className="dark:stroke-white"
      />
      <circle cx="80" cy="84" r="6" fill="url(#gg)" />
      <circle cx="80" cy="84" r="2.5" fill="#fff" />
    </svg>
  );
}

/* 3 — Security shield: outline draws, scan line sweeps, check appears */
export function SecurityShield() {
  const reduced = useReducedMotion();
  const shield = 'M60 10 L104 26 V56 C104 82 84 98 60 108 C36 98 16 82 16 56 V26 Z';
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full">
      <Defs id="sh" />
      <clipPath id="shclip"><path d={shield} /></clipPath>
      <path d={shield} className="fill-brand-indigo/5" />
      <motion.path
        d={shield} fill="none" stroke="url(#sh)" strokeWidth="3" strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={reduced ? { duration: 0 } : { duration: 2.2, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse', repeatDelay: 0.6 }}
      />
      {!reduced && (
        <g clipPath="url(#shclip)">
          <motion.rect x="10" width="100" height="16" fill="url(#sh)" opacity="0.35"
            animate={{ y: [12, 96, 12] }} transition={{ duration: 3, ...loop }} />
        </g>
      )}
      <motion.path
        d="M44 60 L55 71 L78 46" fill="none" stroke="url(#sh)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={reduced ? { duration: 0 } : { duration: 0.6, delay: 1, repeat: Infinity, repeatDelay: 3.2 }}
      />
    </svg>
  );
}

/* 4 — Growth: bars rise, trend line draws upward with arrow */
export function GrowthChart() {
  const reduced = useReducedMotion();
  const bars = [30, 55, 42, 78, 95];
  return (
    <svg viewBox="0 0 240 100" className="h-full w-full">
      <Defs id="gc" />
      {bars.map((h, i) => (
        <motion.rect
          key={i} x={20 + i * 30} width="16" rx="4" fill="url(#gc)" fillOpacity={0.3 + i * 0.14}
          initial={{ y: 92, height: 0 }}
          animate={reduced
            ? { y: 92 - h, height: h }
            : { y: [92, 92 - h, 92 - h * 0.72, 92 - h], height: [0, h, h * 0.72, h] }}
          transition={reduced ? undefined : { duration: 2.8, delay: 0.4 + i * 0.16, repeat: Infinity, repeatDelay: 0.6, ease: 'easeInOut' }}
        />
      ))}
      <motion.path
        d="M28 76 L58 62 L88 68 L118 40 L148 30 L182 14"
        fill="none" stroke="#06b6d4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
        transition={{ duration: 1.6, ease: 'easeInOut' }}
      />
      <motion.g initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 1.4 }} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
        <path d="M182 14 l-10 2 l4 -9 z" fill="#06b6d4" />
      </motion.g>
    </svg>
  );
}

/* 5 — Partnership network: central hub + orbiting nodes with pulsing links */
export function NetworkNodes() {
  const reduced = useReducedMotion();
  const pts = [
    { x: 30, y: 26 }, { x: 210, y: 22 }, { x: 34, y: 82 }, { x: 206, y: 86 },
  ];
  return (
    <svg viewBox="0 0 240 108" className="h-full w-full">
      <Defs id="nw" />
      {pts.map((p, i) => (
        <motion.line
          key={i} x1="120" y1="54" x2={p.x} y2={p.y} stroke="url(#nw)" strokeWidth="2"
          animate={reduced ? undefined : { opacity: [0.15, 0.7, 0.15] }}
          transition={reduced ? undefined : { duration: 2.4, delay: i * 0.3, ...loop }}
        />
      ))}
      {pts.map((p, i) => (
        <motion.circle
          key={`c${i}`} cx={p.x} cy={p.y} r="12" fill="url(#nw)" fillOpacity="0.9"
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          animate={reduced ? undefined : { scale: [1, 1.15, 1] }}
          transition={reduced ? undefined : { duration: 2.2, delay: i * 0.25, ...loop }}
        />
      ))}
      <motion.circle cx="120" cy="54" r="18" fill="url(#nw)"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        animate={reduced ? undefined : { scale: [1, 1.08, 1] }} transition={reduced ? undefined : { duration: 2, ...loop }} />
      <circle cx="120" cy="54" r="18" fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="1.5" />
    </svg>
  );
}

/* 6 — 24/7 clock: hands sweep around a fixed centre (60,60), ring pulses.
   Hand tips are computed from an angle so the base never drifts. */
export function SupportClock() {
  const reduced = useReducedMotion();
  const time = useTime();
  const hourA = useTransform(time, (v) => (reduced ? 40 : (v / 8000) * 360));
  const minA = useTransform(time, (v) => (reduced ? 150 : (v / 3000) * 360));
  const hx = useTransform(hourA, (a) => 60 + 16 * Math.sin(rad(a)));
  const hy = useTransform(hourA, (a) => 60 - 16 * Math.cos(rad(a)));
  const mx = useTransform(minA, (a) => 60 + 26 * Math.sin(rad(a)));
  const my = useTransform(minA, (a) => 60 - 26 * Math.cos(rad(a)));
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full">
      <Defs id="ck" />
      <motion.circle cx="60" cy="60" r="44" fill="none" stroke="url(#ck)" strokeWidth="2" strokeOpacity="0.4"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        animate={reduced ? undefined : { scale: [1, 1.06, 1], opacity: [0.4, 0.15, 0.4] }}
        transition={reduced ? undefined : { duration: 2.4, ...loop }} />
      <circle cx="60" cy="60" r="34" className="fill-brand-indigo/5" stroke="url(#ck)" strokeWidth="2.5" />
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={i} x1="60" y1="30" x2="60" y2="34" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5"
          transform={`rotate(${i * 30} 60 60)`} />
      ))}
      <motion.line x1="60" y1="60" x2={hx} y2={hy} stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" className="dark:stroke-white" />
      <motion.line x1="60" y1="60" x2={mx} y2={my} stroke="url(#ck)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="60" cy="60" r="4" fill="url(#ck)" />
    </svg>
  );
}
