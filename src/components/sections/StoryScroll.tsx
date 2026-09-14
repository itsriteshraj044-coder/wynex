import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Compass, PenTool, Code2, Rocket } from 'lucide-react';
import { HERO_FRAMES } from '../../constants/content';

const FRAME_ICONS = [Compass, PenTool, Code2, Rocket];
const FRAME_ACCENTS = ['#4F46E5', '#8B5CF6', '#06B6D4', '#38BDF8'];

// --- PREMIUM ABSTRACT ANIMATIONS ---

const VisualStrategy = () => (
  <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-3xl bg-white/50 dark:bg-black/40 backdrop-blur-xl border border-ink/5 dark:border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] overflow-hidden flex items-center justify-center p-6">
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent" />
    
    {/* Center Core */}
    <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="absolute z-10 w-8 h-8 bg-indigo-500 rounded-full shadow-[0_0_30px_rgba(99,102,241,0.8)]" />
    
    {/* Orbit Ring 1 */}
    <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="absolute w-28 h-28 sm:w-36 sm:h-36 border border-indigo-500/30 rounded-full flex items-start justify-center">
       <div className="w-3 h-3 bg-indigo-400 rounded-full -mt-1.5 shadow-[0_0_15px_rgba(129,140,248,0.8)]" />
    </motion.div>
    
    {/* Orbit Ring 2 */}
    <motion.div animate={{ rotate: -360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="absolute w-44 h-44 sm:w-56 sm:h-56 border border-indigo-500/20 rounded-full flex items-center justify-end">
       <div className="w-4 h-4 bg-indigo-300 rounded-full -mr-2 shadow-[0_0_15px_rgba(165,180,252,0.8)]" />
    </motion.div>
  </div>
);

const VisualDesign = () => (
  <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-3xl bg-white/50 dark:bg-black/40 backdrop-blur-xl border border-ink/5 dark:border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] overflow-hidden flex items-center justify-center p-6">
     
     {/* Wireframe Container */}
     <div className="relative z-10 w-full max-w-[280px] aspect-[4/3] bg-white dark:bg-[#0a0a0a] rounded-xl border border-ink/10 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <motion.div 
          animate={{ opacity: [0, 1, 1, 0], y: [-10, 0, 0, -10] }}
          transition={{ duration: 4, repeat: Infinity, times: [0, 0.1, 0.9, 1] }}
          className="h-8 border-b border-ink/5 dark:border-white/5 flex items-center px-3 gap-2 bg-slate-50 dark:bg-ink/50"
        >
           <div className="w-2 h-2 rounded-full bg-rose-400" />
           <div className="w-2 h-2 rounded-full bg-amber-400" />
           <div className="w-2 h-2 rounded-full bg-emerald-400" />
           <div className="ml-auto w-16 h-2 bg-ink/10 dark:bg-white/10 rounded-full" />
        </motion.div>
        
        <div className="flex flex-1 overflow-hidden">
           {/* Sidebar */}
           <motion.div 
             animate={{ opacity: [0, 1, 1, 0], x: [-10, 0, 0, -10] }}
             transition={{ duration: 4, repeat: Infinity, times: [0, 0.2, 0.9, 1] }}
             className="w-16 border-r border-ink/5 dark:border-white/5 p-2 flex flex-col gap-2 bg-slate-50/50 dark:bg-transparent"
           >
              <div className="w-full h-3 bg-violet-500/40 rounded" />
              <div className="w-full h-3 bg-ink/5 dark:bg-white/5 rounded" />
              <div className="w-full h-3 bg-ink/5 dark:bg-white/5 rounded" />
              <div className="w-full h-3 bg-ink/5 dark:bg-white/5 rounded" />
           </motion.div>
           
           {/* Main Content */}
           <div className="flex-1 p-4 flex flex-col gap-3">
              <motion.div 
                animate={{ opacity: [0, 1, 1, 0], scale: [0.95, 1, 1, 0.95] }}
                transition={{ duration: 4, repeat: Infinity, times: [0, 0.3, 0.9, 1] }}
                className="w-2/3 h-6 bg-indigo-500/20 rounded-md"
              />
              <div className="flex gap-2">
                 <motion.div 
                   animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, 10] }}
                   transition={{ duration: 4, repeat: Infinity, times: [0, 0.4, 0.9, 1] }}
                   className="flex-1 h-20 bg-violet-500/10 border border-violet-500/20 rounded-lg flex items-center justify-center"
                 >
                    <div className="w-6 h-6 rounded-full bg-violet-400/50" />
                 </motion.div>
                 <motion.div 
                   animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, 10] }}
                   transition={{ duration: 4, repeat: Infinity, times: [0, 0.5, 0.9, 1] }}
                   className="flex-1 h-20 bg-fuchsia-500/10 border border-fuchsia-500/20 rounded-lg flex items-center justify-center"
                 >
                    <div className="w-6 h-6 rounded-full bg-fuchsia-400/50" />
                 </motion.div>
              </div>
           </div>
        </div>
     </div>
  </div>
);

const VisualEngineering = () => (
  <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-3xl bg-white/50 dark:bg-black/40 backdrop-blur-xl border border-ink/5 dark:border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] overflow-hidden flex items-center justify-center p-6">
     
     {/* IDE Window */}
     <div className="relative z-10 w-full max-w-[280px] aspect-[4/3] bg-[#0d1117] rounded-xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Window Controls (Mac Style) */}
        <motion.div 
          animate={{ opacity: [0, 1, 1, 0], y: [-10, 0, 0, -10] }}
          transition={{ duration: 5, repeat: Infinity, times: [0, 0.1, 0.9, 1] }}
          className="h-8 border-b border-white/5 flex items-center px-3 gap-2 bg-[#161b22]"
        >
           <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
           <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
           <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
           <div className="ml-auto w-12 h-2 bg-white/10 rounded-full" />
        </motion.div>
        
        <div className="flex flex-1 overflow-hidden">
           {/* File Explorer Sidebar */}
           <motion.div 
             animate={{ opacity: [0, 1, 1, 0], x: [-10, 0, 0, -10] }}
             transition={{ duration: 5, repeat: Infinity, times: [0, 0.15, 0.9, 1] }}
             className="w-16 border-r border-white/5 p-2 flex flex-col gap-2 bg-[#0d1117]/50"
           >
              <div className="w-full h-2 bg-blue-500/30 rounded" />
              <div className="w-3/4 h-2 bg-white/10 rounded ml-2" />
              <div className="w-full h-2 bg-white/10 rounded ml-2" />
              <div className="w-full h-2 bg-blue-500/30 rounded mt-2" />
              <div className="w-4/5 h-2 bg-white/10 rounded ml-2" />
           </motion.div>
           
           {/* Code Area */}
           <div className="flex-1 p-4 flex flex-col gap-3 overflow-hidden">
              
              {/* Line 1: function init() { */}
              <motion.div 
                animate={{ opacity: [0, 1, 1, 0], x: [-10, 0, 0, -10] }}
                transition={{ duration: 5, repeat: Infinity, times: [0, 0.2, 0.9, 1] }}
                className="flex gap-2"
              >
                 <div className="w-8 h-2.5 bg-pink-400/80 rounded" />
                 <div className="w-12 h-2.5 bg-blue-400/80 rounded" />
                 <div className="w-4 h-2.5 bg-white/40 rounded" />
              </motion.div>

              {/* Line 2: const server = await */}
              <motion.div 
                animate={{ opacity: [0, 1, 1, 0], x: [-10, 0, 0, -10] }}
                transition={{ duration: 5, repeat: Infinity, times: [0, 0.3, 0.9, 1] }}
                className="flex gap-2 pl-4"
              >
                 <div className="w-6 h-2.5 bg-pink-400/80 rounded" />
                 <div className="w-10 h-2.5 bg-cyan-400/80 rounded" />
                 <div className="w-4 h-2.5 bg-white/40 rounded" />
                 <div className="w-8 h-2.5 bg-pink-400/80 rounded" />
              </motion.div>

              {/* Line 3: db.connect(); */}
              <motion.div 
                animate={{ opacity: [0, 1, 1, 0], x: [-10, 0, 0, -10] }}
                transition={{ duration: 5, repeat: Infinity, times: [0, 0.4, 0.9, 1] }}
                className="flex gap-2 pl-8"
              >
                 <div className="w-6 h-2.5 bg-yellow-300/80 rounded" />
                 <div className="w-10 h-2.5 bg-blue-400/80 rounded" />
              </motion.div>

              {/* Line 4: server.deploy(); */}
              <motion.div 
                animate={{ opacity: [0, 1, 1, 0], x: [-10, 0, 0, -10] }}
                transition={{ duration: 5, repeat: Infinity, times: [0, 0.5, 0.9, 1] }}
                className="flex gap-2 pl-4"
              >
                 <div className="w-12 h-2.5 bg-cyan-400/80 rounded" />
                 <div className="w-10 h-2.5 bg-blue-400/80 rounded" />
              </motion.div>

              {/* Line 5: } */}
              <motion.div 
                animate={{ opacity: [0, 1, 1, 0], x: [-10, 0, 0, -10] }}
                transition={{ duration: 5, repeat: Infinity, times: [0, 0.6, 0.9, 1] }}
                className="flex gap-2"
              >
                 <div className="w-4 h-2.5 bg-white/40 rounded" />
              </motion.div>

              {/* Blinking Cursor */}
              <motion.div 
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="w-1.5 h-3.5 bg-blue-400 mt-1"
              />
           </div>
        </div>
     </div>
  </div>
);

const VisualLaunch = () => (
  <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-3xl bg-white/50 dark:bg-black/40 backdrop-blur-xl border border-ink/5 dark:border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] overflow-hidden flex items-center justify-center p-6">
     <div className="absolute inset-0 bg-gradient-to-t from-sky-500/10 to-transparent" />
     
     <div className="relative w-full h-full flex items-center justify-center">
       {/* Floating Rocket Core */}
       <motion.div 
         animate={{ y: [0, -10, 0] }}
         transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
         className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-sky-400 to-blue-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(14,165,233,0.6)]"
       >
          <Rocket className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
       </motion.div>

       {/* Rising Energy Sparks */}
       {[...Array(8)].map((_, i) => (
          <motion.div 
            key={i}
            animate={{ 
              y: [0, -120], 
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5],
              x: [(Math.random() - 0.5) * 60, (Math.random() - 0.5) * 120]
            }}
            transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2, ease: "easeOut" }}
            className="absolute bottom-1/4 w-2 h-2 sm:w-3 sm:h-3 bg-sky-300 rounded-full shadow-[0_0_15px_rgba(125,211,252,0.8)]"
          />
       ))}
     </div>
  </div>
);

const CUSTOM_VISUALS = [VisualStrategy, VisualDesign, VisualEngineering, VisualLaunch];

export default function StoryScroll() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  
  // Drives the glowing line down the center
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={containerRef} id="story" className="relative py-24 lg:py-40 overflow-hidden font-sans">
      <div className="container-x relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-24 lg:mb-40">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="eyebrow mb-6 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-brand-indigo">
               <span className="h-1.5 w-1.5 rounded-full bg-brand-indigo" />
               Our Methodology
            </span>
            <h2 className="text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl text-ink dark:text-white tracking-tight">
              Built with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500 dark:from-indigo-400 dark:to-cyan-400">precision.</span>
            </h2>
          </motion.div>
        </div>

        {/* Center Timeline Layout */}
        <div className="relative max-w-6xl mx-auto">
          
          {/* Base Line (Faded) */}
          <div className="absolute left-[24px] sm:left-1/2 top-0 bottom-0 w-[2px] bg-ink/5 dark:bg-white/5 sm:-translate-x-1/2 rounded-full" />
          
          {/* Animated Glowing Line */}
          <motion.div 
            className="absolute left-[24px] sm:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-indigo-500 via-purple-500 to-cyan-500 sm:-translate-x-1/2 origin-top rounded-full shadow-[0_0_15px_rgba(99,102,241,0.8)]"
            style={{ scaleY }}
          />

          <div className="flex flex-col gap-20 sm:gap-32">
            {HERO_FRAMES.map((frame, i) => {
              const Icon = FRAME_ICONS[i];
              const accent = FRAME_ACCENTS[i];
              const isEven = i % 2 === 0;
              const VisualContent = CUSTOM_VISUALS[i];

              return (
                <div key={frame.title} className="relative w-full">
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-[24px] sm:left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-black border-2 border-indigo-500 rounded-full z-20 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />

                  {/* Row Content */}
                  <motion.div 
                    // ENTIRE ROW enters from Left-to-Right for Strategy (isEven)
                    initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-15%" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`flex flex-col sm:flex-row items-center justify-between w-full pl-[60px] sm:pl-0 gap-10 sm:gap-0 ${isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
                  >
                    
                    {/* Text Side */}
                    <div className="w-full sm:w-[42%] flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-6">
                        <span 
                          className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl text-base font-bold"
                          style={{ backgroundColor: `${accent}1A`, color: accent, border: `1px solid ${accent}33` }}
                        >
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                        </span>
                        <span className="font-mono text-sm font-semibold uppercase tracking-widest text-ink/70 dark:text-slate-300">
                          {frame.title}
                        </span>
                      </div>
                      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink dark:text-white mb-4 leading-[1.2] tracking-tight">
                        {frame.headline}
                      </h3>
                      <p className="text-lg sm:text-xl text-ink-muted dark:text-slate-400 leading-relaxed font-light">
                        {frame.text}
                      </p>
                    </div>

                    {/* Visual Side */}
                    <div className="w-full sm:w-[42%]">
                       <VisualContent />
                    </div>

                  </motion.div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

