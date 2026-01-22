import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PERSONAS } from '../constants';
import { ArrowUpRight } from 'lucide-react';

// Abstract Geometric Artifacts (Sigils) to replace generic icons
const Sigil = ({ id, isHovered }: { id: string; isHovered: boolean }) => {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.5, ease: "easeInOut" },
        opacity: { duration: 0.5 }
      }
    }
  };

  const glow = isHovered ? "drop-shadow-[0_0_8px_rgba(17,17,17,0.3)]" : "";

  const renderPath = () => {
    switch (id) {
      case 'stoic': // The Cube & Pillar (Structure)
        return (
          <g className={glow}>
             <motion.rect x="30" y="30" width="40" height="40" stroke="currentColor" strokeWidth="1" fill="none" variants={draw} />
             <motion.line x1="30" y1="30" x2="70" y2="70" stroke="currentColor" strokeWidth="0.5" variants={draw} />
             <motion.line x1="70" y1="30" x2="30" y2="70" stroke="currentColor" strokeWidth="0.5" variants={draw} />
             <motion.circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" fill="none" className="opacity-50" variants={draw} />
             <motion.rect x="45" y="20" width="10" height="60" stroke="currentColor" strokeWidth="0.5" fill="none" variants={draw} />
          </g>
        );
      case 'mystic': // The Eye & Rays (Vision)
        return (
          <g className={glow}>
            <motion.path d="M10,50 Q50,10 90,50 Q50,90 10,50" stroke="currentColor" strokeWidth="1" fill="none" variants={draw} />
            <motion.circle cx="50" cy="50" r="12" stroke="currentColor" strokeWidth="1" fill="none" variants={draw} />
            {/* Removed opacity-80 class to prevent visibility bug when hidden */}
            <motion.circle cx="50" cy="50" r="4" fill="currentColor" variants={draw} />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <motion.line 
                    key={i}
                    x1="50" y1="50" 
                    x2={50 + 40 * Math.cos(angle * Math.PI / 180)} 
                    y2={50 + 40 * Math.sin(angle * Math.PI / 180)} 
                    stroke="currentColor" strokeWidth="0.5" 
                    className="opacity-30"
                    variants={draw} 
                />
            ))}
          </g>
        );
      case 'architect': // The Compass & Triangle (Design)
        return (
          <g className={glow}>
            <motion.path d="M50,10 L90,80 L10,80 Z" stroke="currentColor" strokeWidth="1" fill="none" variants={draw} />
            <motion.circle cx="50" cy="55" r="20" stroke="currentColor" strokeWidth="0.5" fill="none" variants={draw} />
            <motion.line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.5" variants={draw} />
            <motion.path d="M20,50 A30,30 0 0,1 80,50" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="2 2" variants={draw} />
            <motion.rect x="48" y="48" width="4" height="4" fill="currentColor" variants={draw} />
          </g>
        );
      case 'healer': // The Spiral & Leaf (Growth)
        return (
          <g className={glow}>
            <motion.path d="M50,90 C20,90 20,50 50,20 C80,50 80,90 50,90 Z" stroke="currentColor" strokeWidth="1" fill="none" variants={draw} />
            <motion.path d="M50,90 C35,70 35,60 50,40" stroke="currentColor" strokeWidth="0.5" fill="none" variants={draw} />
            <motion.path d="M50,90 C65,70 65,60 50,40" stroke="currentColor" strokeWidth="0.5" fill="none" variants={draw} />
            <motion.circle cx="50" cy="35" r="25" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="1 3" variants={draw} />
          </g>
        );
      default:
        return null;
    }
  };

  return (
    <motion.svg
      viewBox="0 0 100 100"
      className="w-full h-full text-ink"
      initial="hidden"
      animate={isHovered ? "visible" : "hidden"} // Animate when hovered
    >
      {renderPath()}
    </motion.svg>
  );
};

export const Personas: React.FC = () => {
  return (
    <section className="py-32 border-t border-ink/5 bg-[#F9F8F4] overflow-hidden relative">
      {/* Background Noise Texture for specific section premium feel */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")` }}></div>

      <div className="px-6 lg:px-12 mb-20 flex flex-col md:flex-row justify-between items-end max-w-7xl mx-auto relative z-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="h-[1px] w-12 bg-ink/30"></div>
             <span className="text-[10px] uppercase tracking-[0.3em] text-ink/60">The Collection</span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-display text-ink">The Guides</h2>
        </div>
        <div className="hidden lg:flex items-center gap-4 text-xs font-mono text-ink/40">
            <span>( SCROLL TO EXPLORE )</span>
            <div className="w-24 h-[1px] bg-ink/20"></div>
        </div>
      </div>

      <div className="overflow-x-auto pb-20 pl-6 lg:pl-12 hide-scrollbar">
        <div className="flex gap-8 w-max pr-12">
          {PERSONAS.map((persona, index) => {
             // eslint-disable-next-line react-hooks/rules-of-hooks
             const [isHovered, setIsHovered] = useState(false);

             return (
                <motion.div
                  key={persona.id}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.15, duration: 0.8, ease: "easeOut" }}
                  className="relative group w-[320px] h-[580px] flex-shrink-0 cursor-pointer perspective-1000"
                >
                  {/* Card Container */}
                  <div className={`
                    absolute inset-0 bg-paper border transition-all duration-700 ease-in-out flex flex-col justify-between p-8
                    ${isHovered ? `border-ink shadow-2xl translate-y-[-10px]` : 'border-ink/10 shadow-sm'}
                  `}>
                    
                    {/* Top: Number & Status */}
                    <div className="flex justify-between items-start opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="font-serif italic text-lg">No. 0{index + 1}</span>
                        {/* Changed bg-ink/20 to opacity-0 to hide the dot when not hovered */}
                        <div className={`w-2 h-2 rounded-full transition-all duration-500 ${isHovered ? 'bg-green-500 animate-pulse opacity-100' : 'bg-ink/20 opacity-0'}`}></div>
                    </div>

                    {/* Center: The Artifact (Sigil) */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110">
                        <Sigil id={persona.id} isHovered={isHovered} />
                    </div>

                    {/* Bottom: Info */}
                    <div className="relative z-10 mt-auto">
                        <div className="overflow-hidden mb-4">
                             <motion.h3 
                                className="text-4xl font-display text-ink leading-none mb-2"
                                animate={{ y: isHovered ? -5 : 0 }}
                                transition={{ duration: 0.5 }}
                             >
                                {persona.name}
                             </motion.h3>
                             <div className={`h-[1px] bg-ink/20 w-full transform origin-left transition-transform duration-700 ${isHovered ? 'scale-x-100' : 'scale-x-0'}`}></div>
                        </div>

                        <p className="text-xs uppercase tracking-widest text-ink/50 mb-6 group-hover:text-ink/70 transition-colors">
                            {persona.doctrine}
                        </p>

                        <div className="h-12 overflow-hidden relative">
                             {/* Default State: Quote */}
                            <div className={`absolute inset-0 transition-transform duration-500 ${isHovered ? '-translate-y-full' : 'translate-y-0'}`}>
                                <p className="font-serif italic text-ink/70 text-sm line-clamp-2 leading-relaxed">
                                    "{persona.quote}"
                                </p>
                            </div>

                             {/* Hover State: Action */}
                             <div className={`absolute inset-0 flex items-center justify-between transition-transform duration-500 ${isHovered ? 'translate-y-0' : 'translate-y-full'}`}>
                                <span className="text-xs uppercase tracking-[0.2em] font-medium">Commence Dialogue</span>
                                <div className="w-8 h-8 border border-ink flex items-center justify-center rounded-full hover:bg-ink hover:text-paper transition-colors">
                                    <ArrowUpRight size={14} />
                                </div>
                             </div>
                        </div>
                    </div>

                    {/* Background Overlay for Texture/Color Shift */}
                    <div className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'} bg-gradient-to-b from-transparent via-transparent to-ink/5`}></div>
                  </div>
                </motion.div>
             );
          })}
          
          {/* End Spacer */}
          <div className="w-12 h-full"></div>
        </div>
      </div>
    </section>
  );
};
