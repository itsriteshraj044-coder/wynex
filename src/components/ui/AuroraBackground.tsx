import { memo } from 'react';

/** Fixed full-viewport animated gradient-mesh aurora with noise overlay. */
function AuroraBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-surface dark:bg-[#070b16]" />
      <div className="absolute inset-0 bg-mesh opacity-90 dark:opacity-40" />
      {/* gradient blobs */}
      <div className="absolute -left-40 -top-40 h-[36rem] w-[36rem] animate-blob rounded-full bg-brand-iris/25 blur-3xl dark:bg-brand-iris/20" />
      <div className="absolute -right-32 top-20 h-[32rem] w-[32rem] animate-blob rounded-full bg-brand-cyan/20 blur-3xl [animation-delay:4s] dark:bg-brand-cyan/15" />
      <div className="absolute bottom-0 left-1/3 h-[34rem] w-[34rem] animate-blob rounded-full bg-brand-purple/20 blur-3xl [animation-delay:8s] dark:bg-brand-purple/15" />
      {/* noise */}
      <div className="absolute inset-0 bg-noise opacity-[0.035] mix-blend-overlay dark:opacity-[0.06]" />
    </div>
  );
}

export default memo(AuroraBackground);
