import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { PROJECTS, PROJECT_FILTERS } from '../../constants/content';
import { cn } from '../../utils/cn';

const SectionHeading = ({ title, highlight }: { title: string, highlight: string }) => (
  <div className="flex flex-col items-start max-w-3xl">
    <span className="eyebrow mb-6 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-brand-indigo">
      <Sparkles className="h-4 w-4" />
      Featured Work
    </span>
    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-ink dark:text-white leading-[1.1] tracking-tight">
      {title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500 dark:from-indigo-400 dark:to-cyan-400">{highlight}</span>
    </h2>
  </div>
);

const ProjectImage = ({ image, alt, className }: { image: string | string[], alt: string, className?: string }) => {
  const [idx, setIdx] = React.useState(0);
  
  React.useEffect(() => {
    if (Array.isArray(image) && image.length > 1) {
      const interval = setInterval(() => {
        setIdx(prev => (prev + 1) % image.length);
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [image]);

  const modifiedClassName = className?.replace('object-cover', '').replace('h-full', 'h-auto');

  if (!Array.isArray(image) || image.length <= 1) {
    const src = Array.isArray(image) ? image[0] : image;
    return <img src={src} alt={alt} className={`w-full block ${modifiedClassName || ''}`} />;
  }

  return (
    <div className="relative w-full overflow-hidden bg-ink/5 dark:bg-black/50">
      <motion.div
        className="flex w-full items-stretch"
        animate={{ x: `-${idx * 100}%` }}
        transition={{ type: "tween", ease: "easeInOut", duration: 0.8 }}
      >
        {image.map((src, i) => (
          <div key={i} className="relative w-full flex-shrink-0 flex items-center justify-center">
            <img 
              src={src} 
              alt={`${alt} ${i + 1}`} 
              className={`w-full block ${modifiedClassName || ''}`}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function Work() {
  const [filter, setFilter] = useState<(typeof PROJECT_FILTERS)[number]>('All');
  const [activeIdx, setActiveIdx] = useState(0);

  const filtered = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter((p) => p.category === filter);

  // Reset active index when filter changes
  React.useEffect(() => {
    setActiveIdx(0);
  }, [filter]);

  const activeProject = filtered[activeIdx] || filtered[0];

  return (
    <section id="work" className="relative py-24 lg:py-32 overflow-hidden bg-slate-50 dark:bg-[#03060d]">
      <div className="container-x relative z-10">
        
        {/* Header & Filters */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <SectionHeading title="Selected projects that" highlight="moved the needle." />
          
          <div className="flex flex-wrap gap-2">
            {PROJECT_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  'rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 active:scale-95 shadow-sm',
                  filter === f
                    ? 'bg-ink text-white shadow-md dark:bg-white dark:text-ink'
                    : 'bg-white text-ink-muted border border-ink/10 hover:text-ink hover:border-ink/30 dark:bg-ink dark:border-white/10 dark:text-slate-400 dark:hover:text-white dark:hover:border-white/30'
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Compact Split Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
           
           {/* LEFT SIDE: Scrollable List of Project Names */}
           <div className="w-full lg:w-[45%]">
              
              <div 
                 className="flex flex-col h-[600px] overflow-y-auto overflow-x-hidden pr-4 lg:pr-6 py-4"
                 style={{
                   scrollbarWidth: 'thin',
                   scrollbarColor: 'rgba(156, 163, 175, 0.3) transparent'
                 }}
              >
                 {filtered.map((project, idx) => {
                    const isActive = activeIdx === idx;
                    return (
                      <motion.div 
                        key={project.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.5, delay: Math.min(idx * 0.1, 0.4) }}
                        onMouseEnter={() => setActiveIdx(idx)}
                        onClick={() => setActiveIdx(idx)}
                        className={cn(
                          "group py-8 cursor-pointer border-b border-ink/10 dark:border-white/10 transition-all duration-300",
                          isActive ? "opacity-100 pl-4 lg:pl-6 border-brand-indigo dark:border-cyan-500" : "opacity-40 hover:opacity-70"
                        )}
                      >
                        <div className="flex items-center gap-4 mb-2">
                           <span className="font-mono text-sm font-semibold text-brand-indigo dark:text-cyan-400">0{idx + 1}</span>
                           <span className="text-xs font-semibold uppercase tracking-wider text-ink dark:text-slate-400">{project.client} &bull; {project.category}</span>
                        </div>
                        <h3 className={cn(
                          "text-4xl sm:text-4xl xl:text-5xl font-bold tracking-tight transition-colors duration-300",
                          isActive ? "text-ink dark:text-white" : "text-ink dark:text-white group-hover:text-ink/80 dark:group-hover:text-white/80"
                        )}>
                          {project.title}
                        </h3>
                        
                        {/* Mobile Only: Show photo and details inline when active */}
                        {isActive && (
                           <motion.div 
                             initial={{ opacity: 0, height: 0 }}
                             animate={{ opacity: 1, height: 'auto' }}
                             className="mt-8 block lg:hidden"
                           >
                              <div className="relative w-full rounded-2xl overflow-hidden mb-6 shadow-xl">
                                 <ProjectImage image={project.image} alt={project.title} className="w-full h-full object-cover" />
                              </div>
                              <p className="text-base text-ink-muted dark:text-slate-300 mb-6">{project.description}</p>
                              <div className="flex justify-between items-center">
                                 <div>
                                    <p className="text-2xl font-bold text-ink dark:text-white">{project.metric.value}</p>
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-brand-indigo">{project.metric.label}</p>
                                 </div>
                                 {project.link ? (
                                   <a href={project.link} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-ink dark:bg-white text-white dark:text-ink flex items-center justify-center">
                                      <ArrowUpRight className="w-5 h-5" />
                                   </a>
                                 ) : (
                                   <button className="w-12 h-12 rounded-full bg-ink dark:bg-white text-white dark:text-ink flex items-center justify-center">
                                      <ArrowUpRight className="w-5 h-5" />
                                   </button>
                                 )}
                              </div>
                           </motion.div>
                        )}
                      </motion.div>
                    );
                 })}
              </div>
           </div>

           {/* RIGHT SIDE: Sticky Photo & Details (Desktop Only) */}
           <div className="hidden lg:flex w-full lg:w-[55%] flex-col justify-center">
              <div className="w-full">
                 <AnimatePresence mode="wait">
                    {activeProject && (
                       <motion.div 
                          key={activeProject.id}
                          initial={{ opacity: 0, y: 20, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -20, scale: 0.98 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="flex flex-col"
                       >
                          {/* Photo */}
                          <div className="relative w-full rounded-[2rem] overflow-hidden mb-8 shadow-2xl border border-ink/5 dark:border-white/10 group/img cursor-pointer">
                             <ProjectImage 
                               image={activeProject.image} 
                               alt={activeProject.title} 
                               className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-[1.03]" 
                             />
                             <div className="absolute inset-0 bg-ink/5 dark:bg-black/10 group-hover/img:bg-transparent transition-colors duration-500 pointer-events-none" />
                             
                             {/* Floating Metric Card */}
                             <div className="absolute bottom-6 right-6 bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-xl p-4 px-6 rounded-2xl shadow-xl border border-ink/10 dark:border-white/10 transform translate-y-4 opacity-0 group-hover/img:translate-y-0 group-hover/img:opacity-100 transition-all duration-500">
                                <p className="text-3xl font-bold text-ink dark:text-white mb-1 tracking-tight">{activeProject.metric.value}</p>
                                <p className="text-xs font-bold uppercase tracking-widest text-brand-indigo dark:text-cyan-400">{activeProject.metric.label}</p>
                             </div>
                          </div>

                          {/* Details */}
                          <div className="flex justify-between items-start gap-8 px-2">
                             <div className="max-w-xl">
                               <p className="text-lg text-ink-muted dark:text-slate-300 leading-relaxed mb-6">
                                  {activeProject.description}
                               </p>
                               <div className="flex flex-wrap gap-2">
                                  {activeProject.tags.map(tag => (
                                     <span key={tag} className="px-3 py-1.5 rounded-xl bg-ink/5 dark:bg-white/5 text-xs font-semibold text-ink-muted dark:text-slate-400 transition-colors hover:bg-ink/10 dark:hover:bg-white/10 cursor-default">
                                        {tag}
                                     </span>
                                  ))}
                               </div>
                             </div>

                             {activeProject.link ? (
                               <a href={activeProject.link} target="_blank" rel="noopener noreferrer" className="shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-ink dark:bg-white text-white dark:text-ink hover:scale-110 hover:bg-brand-indigo dark:hover:bg-cyan-400 dark:hover:text-black shadow-lg transition-all duration-300 ease-out">
                                  <ArrowUpRight className="w-6 h-6" />
                               </a>
                             ) : (
                               <button className="shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-ink dark:bg-white text-white dark:text-ink hover:scale-110 hover:bg-brand-indigo dark:hover:bg-cyan-400 dark:hover:text-black shadow-lg transition-all duration-300 ease-out">
                                  <ArrowUpRight className="w-6 h-6" />
                               </button>
                             )}
                          </div>
                       </motion.div>
                    )}
                 </AnimatePresence>
              </div>
           </div>

        </div>

      </div>
    </section>
  );
}
