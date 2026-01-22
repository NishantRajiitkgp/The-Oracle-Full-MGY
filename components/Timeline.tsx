import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TIMELINE_EVENTS } from '../constants';
import { Star } from 'lucide-react';

export const Timeline: React.FC = () => {
    const ref = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section ref={ref} className="py-32 relative bg-ink text-paper overflow-hidden">
             {/* Cosmic Dust Background */}
             <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '50px 50px'}}></div>

             <div className="max-w-4xl mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <h2 className="text-4xl lg:text-5xl font-serif text-paper mb-2">Constellation Corridor</h2>
                    <p className="text-paper/50 text-xs tracking-[0.2em] uppercase">Your Life Architecture</p>
                </div>

                <div className="relative">
                    {/* Central Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-[1px] h-full bg-paper/10 top-0"></div>
                    <motion.div 
                        className="absolute left-1/2 transform -translate-x-1/2 w-[1px] bg-paper top-0 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                        style={{ height: lineHeight }}
                    ></motion.div>

                    <div className="space-y-32">
                        {TIMELINE_EVENTS.map((event, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ margin: "-100px" }}
                                transition={{ duration: 0.8 }}
                                className={`flex items-center gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                            >
                                <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                                    <div className={`flex flex-col ${index % 2 === 0 ? 'items-end' : 'items-start'}`}>
                                        <span className="text-6xl font-display text-paper/5 font-bold -mb-6 relative z-0 select-none">{event.label}</span>
                                        <h3 className="font-serif text-3xl mb-1 relative z-10">{event.title}</h3>
                                        <div className="flex items-center gap-3 mb-3">
                                            {index % 2 === 0 && <span className="w-6 h-[1px] bg-gold/40"></span>}
                                            <p className="text-xs uppercase tracking-[0.25em] text-gold font-medium">{event.theme}</p>
                                            {index % 2 !== 0 && <span className="w-6 h-[1px] bg-gold/40"></span>}
                                        </div>
                                        <p className="text-sm font-light text-paper/60 leading-relaxed max-w-xs">{event.desc}</p>
                                    </div>
                                </div>
                                
                                <div className="relative z-10 flex-shrink-0">
                                    <div className="w-4 h-4 bg-ink border border-paper rotate-45 flex items-center justify-center group cursor-pointer hover:bg-paper transition-colors duration-300">
                                        <div className="w-1 h-1 bg-paper group-hover:bg-ink transition-colors"></div>
                                    </div>
                                    {/* Glowing aura around star */}
                                    <div className="absolute inset-0 bg-paper blur-md opacity-20 animate-pulse"></div>
                                </div>
                                
                                <div className="flex-1"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="text-center mt-32">
                     <button className="px-8 py-3 border border-paper/20 text-xs tracking-[0.2em] uppercase hover:bg-paper hover:text-ink transition-all duration-300">
                        Analyze My Architecture
                     </button>
                </div>
             </div>
        </section>
    );
};
