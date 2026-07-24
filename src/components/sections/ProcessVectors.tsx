import { motion, useReducedMotion, useTime, useTransform } from 'framer-motion';

const rad = (d: number) => (d * Math.PI) / 180;
const loop = { repeat: Infinity, ease: 'easeInOut' as const };

function Grad({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#4f46e5" />
        <stop offset="0.5" stopColor="#8b5cf6" />
        <stop offset="1" stopColor="#06b6d4" />
      </linearGradient>
    </defs>
  );
}

/* 01 — Discover: radar sweep, pulsing rings, detected blips */
export function DiscoverVec() {
  const reduced = useReducedMotion();
  const time = useTime();
  const angle = useTransform(time, (v) => (reduced ? 40 : (v / 4000) * 360));
  const sx = useTransform(angle, (a) => 100 + 68 * Math.sin(rad(a)));
  const sy = useTransform(angle, (a) => 75 - 68 * Math.cos(rad(a)));
  const rings = [26, 46, 66];
  const blips = [{ x: 140, y: 48 }, { x: 66, y: 104 }, { x: 132, y: 108 }];
  return (
    <svg viewBox="0 0 200 150" className="h-full w-full">
      <Grad id="dsc" />
      {rings.map((r, i) => (
        <motion.circle key={i} cx="100" cy="75" r={r} fill="none" stroke="url(#dsc)" strokeWidth="1.5"
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          animate={reduced ? undefined : { opacity: [0.08, 0.45, 0.08], scale: [0.9, 1, 0.9] }}
          transition={reduced ? undefined : { duration: 3, delay: i * 0.4, ...loop }} />
      ))}
      <motion.line x1="100" y1="75" x2={sx} y2={sy} stroke="url(#dsc)" strokeWidth="2.5" strokeLinecap="round" />
      {blips.map((b, i) => (
        <motion.circle key={i} cx={b.x} cy={b.y} r="4.5" fill="#06b6d4"
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          animate={reduced ? undefined : { opacity: [0, 1, 0], scale: [0.5, 1.4, 0.5] }}
          transition={reduced ? undefined : { duration: 4, delay: i * 1.2, repeat: Infinity }} />
      ))}
      <circle cx="100" cy="75" r="5" fill="url(#dsc)" />
    </svg>
  );
}

/* 02 — Design: a UI layout assembles itself while a cursor moves around */
export function DesignVec() {
  const reduced = useReducedMotion();
  const D = 4;
  const line = (delay: number) => (reduced ? { duration: 0 } : { duration: D, times: [0, 0.2, 0.9, 1], delay, repeat: Infinity } as const);
  return (
    <svg viewBox="0 0 200 150" className="h-full w-full">
      <Grad id="dsg" />
      {/* frame */}
      <rect x="30" y="22" width="140" height="106" rx="12" fill="none" stroke="url(#dsg)" strokeWidth="1.5" strokeOpacity="0.5" />
      {/* header bar */}
      <motion.rect x="44" y="36" height="12" rx="4" fill="url(#dsg)" fillOpacity="0.75"
        initial={{ width: 0 }} animate={{ width: reduced ? 112 : [0, 112, 112, 0] }} transition={line(0.2)} />
      {/* image block */}
      <motion.rect x="44" y="56" width="112" height="38" rx="6" fill="url(#dsg)" fillOpacity="0.16"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: reduced ? 1 : [0, 1, 1, 0], opacity: reduced ? 1 : [0, 1, 1, 0] }}
        transition={reduced ? { duration: 0 } : { duration: D, times: [0, 0.25, 0.9, 1], delay: 0.5, repeat: Infinity }} />
      {/* text lines */}
      <motion.rect x="44" y="102" height="8" rx="4" fill="url(#dsg)" fillOpacity="0.6"
        initial={{ width: 0 }} animate={{ width: reduced ? 74 : [0, 74, 74, 0] }} transition={line(0.8)} />
      <motion.rect x="44" y="114" height="8" rx="4" fill="url(#dsg)" fillOpacity="0.6"
        initial={{ width: 0 }} animate={{ width: reduced ? 92 : [0, 92, 92, 0] }} transition={line(1)} />
      {/* cursor */}
      <motion.g
        animate={reduced ? undefined : { x: [8, 66, 24, 88, 8], y: [0, 22, 58, 40, 0] }}
        transition={reduced ? undefined : { duration: D, repeat: Infinity, ease: 'easeInOut' }}>
        <path d="M44 44 l0 17 l4 -4 l3 6 l2 -1 l-3 -6 l6 0 z" fill="#1e293b" className="dark:fill-white" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" />
      </motion.g>
    </svg>
  );
}

/* 03 — Develop: code window with lines that type in + blinking caret */
export function DevelopVec() {
  const reduced = useReducedMotion();
  const lines = [
    { y: 52, w: 72, c: '#8b5cf6' },
    { y: 69, w: 112, c: '#38bdf8' },
    { y: 86, w: 58, c: '#06b6d4' },
    { y: 103, w: 96, c: '#6366f1' },
  ];
  return (
    <svg viewBox="0 0 200 150" className="h-full w-full">
      <Grad id="dev" />
      <rect x="22" y="26" width="156" height="100" rx="14" className="fill-white dark:fill-white/5" stroke="url(#dev)" strokeWidth="1.5" strokeOpacity="0.5" />
      <circle cx="38" cy="40" r="3.2" fill="#f87171" />
      <circle cx="50" cy="40" r="3.2" fill="#fbbf24" />
      <circle cx="62" cy="40" r="3.2" fill="#34d399" />
      {lines.map((l, i) => (
        <motion.rect key={i} x="38" y={l.y} height="7" rx="3.5" fill={l.c} fillOpacity="0.9"
          initial={{ width: 0 }}
          animate={{ width: reduced ? l.w : [0, l.w] }}
          transition={reduced ? { duration: 0 } : { duration: 0.6, delay: 0.4 + i * 0.5, repeat: Infinity, repeatType: 'reverse', repeatDelay: 2.6 }} />
      ))}
      <motion.rect x="140" y="101" width="7" height="11" rx="1.5" fill="url(#dev)"
        animate={reduced ? undefined : { opacity: [1, 0, 1] }} transition={reduced ? undefined : { duration: 1, repeat: Infinity }} />
    </svg>
  );
}

/* 04 — Deploy: data packets upload into a cloud, arrow pulses, live dot blinks */
export function DeployVec() {
  const reduced = useReducedMotion();
  const packets = [{ x: 66, d: 0 }, { x: 103, d: 0.7 }, { x: 140, d: 1.4 }];
  return (
    <svg viewBox="0 0 200 150" className="h-full w-full">
      <Grad id="dpl" />
      {/* cloud — group opacity flattens the overlapping shapes */}
      <g fill="url(#dpl)" opacity="0.22">
        <circle cx="80" cy="56" r="16" />
        <circle cx="104" cy="48" r="22" />
        <circle cx="126" cy="58" r="14" />
        <rect x="78" y="52" width="52" height="26" rx="13" />
      </g>
      {/* upload arrow inside the cloud */}
      <motion.g animate={reduced ? undefined : { y: [4, -3, 4], opacity: [0.7, 1, 0.7] }} transition={reduced ? undefined : { duration: 1.6, ...loop }}>
        <path d="M103 72 V50 M94 59 L103 50 L112 59" fill="none" stroke="url(#dpl)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </motion.g>
      {/* rising packets */}
      {packets.map((p, i) => (
        <motion.rect key={i} x={p.x - 8} width="16" height="16" rx="4" fill="url(#dpl)"
          initial={{ y: 132, opacity: 0 }}
          animate={reduced ? { y: 96, opacity: 1 } : { y: [132, 92], opacity: [0, 1, 0] }}
          transition={reduced ? undefined : { duration: 2.4, delay: p.d, repeat: Infinity, ease: 'easeIn' }} />
      ))}
      {/* live indicator */}
      <motion.circle cx="150" cy="30" r="5" fill="#34d399"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        animate={reduced ? undefined : { scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
        transition={reduced ? undefined : { duration: 1.4, ...loop }} />
    </svg>
  );
}

/* 05 — Optimize: bars rise from a baseline + a trend line climbs with arrow */
export function OptimizeVec() {
  const reduced = useReducedMotion();
  const bars = [40, 60, 50, 82, 100];
  return (
    <svg viewBox="0 0 200 150" className="h-full w-full">
      <Grad id="opt" />
      {bars.map((h, i) => {
        const H = h * 0.9;
        return (
          <motion.rect key={i} x={30 + i * 30} width="18" rx="4" fill="url(#opt)" fillOpacity={0.3 + i * 0.13}
            initial={{ y: 120, height: 0 }}
            animate={reduced ? { y: 120 - H, height: H } : { y: [120, 120 - H, 120 - H * 0.66, 120 - H], height: [0, H, H * 0.66, H] }}
            transition={reduced ? undefined : { duration: 2.6, delay: 0.3 + i * 0.15, repeat: Infinity, repeatDelay: 0.5, ease: 'easeInOut' }} />
        );
      })}
      <motion.path d="M36 98 L66 82 L96 88 L128 52 L164 26" fill="none" stroke="#06b6d4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: reduced ? 1 : [0, 1] }}
        transition={reduced ? { duration: 0 } : { duration: 2, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse', repeatDelay: 1 }} />
      <path d="M164 26 l-10 2 l4 -9 z" fill="#06b6d4" />
    </svg>
  );
}

/* 06 — Support: sound-wave rings pulse from a headset + a chat bubble */
export function SupportVec() {
  const reduced = useReducedMotion();
  const waves = [22, 40, 58];
  return (
    <svg viewBox="0 0 200 150" className="h-full w-full">
      <Grad id="sup" />
      {waves.map((r, i) => (
        <motion.circle key={i} cx="96" cy="82" r={r} fill="none" stroke="url(#sup)" strokeWidth="2"
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          animate={reduced ? undefined : { scale: [0.6, 1.15, 0.6], opacity: [0, 0.5, 0] }}
          transition={reduced ? undefined : { duration: 3, delay: i * 0.6, repeat: Infinity, ease: 'easeOut' }} />
      ))}
      <circle cx="96" cy="82" r="18" fill="url(#sup)" />
      <path d="M86 82 a10 10 0 0 1 20 0" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="83" y="82" width="6" height="12" rx="3" fill="#fff" />
      <rect x="103" y="82" width="6" height="12" rx="3" fill="#fff" />
      <motion.g
        animate={reduced ? undefined : { opacity: [0, 1, 1, 0], y: [8, 0, 0, 8] }}
        transition={reduced ? undefined : { duration: 3, times: [0, 0.2, 0.8, 1], repeat: Infinity }}>
        <rect x="138" y="34" width="40" height="26" rx="9" className="fill-white dark:fill-white/10" stroke="url(#sup)" strokeWidth="1.5" strokeOpacity="0.6" />
        {[150, 158, 166].map((x, i) => (
          <motion.circle key={i} cx={x} cy="47" r="2.6" fill="url(#sup)"
            animate={reduced ? undefined : { opacity: [0.3, 1, 0.3] }} transition={reduced ? undefined : { duration: 1, delay: i * 0.2, repeat: Infinity }} />
        ))}
      </motion.g>
    </svg>
  );
}

export const PROCESS_VECTORS = [DiscoverVec, DesignVec, DevelopVec, DeployVec, OptimizeVec, SupportVec];
