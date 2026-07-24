import Marquee from '../ui/Marquee';
import { CLIENTS } from '../../constants/content';

export default function TrustedBy() {
  return (
    <section className="relative border-y border-ink/5 bg-white/40 py-10 backdrop-blur-sm dark:border-white/5 dark:bg-white/[0.02]">
      <div className="container-x">
        <p className="mb-8 text-center text-sm font-semibold uppercase tracking-[0.2em] text-ink-muted dark:text-slate-500">
          Trusted by forward-thinking teams worldwide
        </p>
      </div>
      <Marquee speed={28}>
        {CLIENTS.map((c) => (
          <span
            key={c}
            className="mx-6 flex items-center gap-2 whitespace-nowrap font-display text-2xl font-extrabold text-ink/30 transition-colors hover:text-ink/70 dark:text-white/20 dark:hover:text-white/60"
          >
            <span className="h-2 w-2 rounded-full bg-brand-gradient" />
            {c}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
