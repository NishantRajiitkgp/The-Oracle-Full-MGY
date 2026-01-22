import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowRight } from 'lucide-react';

const REPORTS = [
  { 
    id: 1, 
    year: "2026", 
    title: "The Annual Forecast", 
    subtitle: "A 12-month architecture of your time.",
    desc: "Detailed month-by-month breakdown of major themes, challenges, and windows of opportunity." 
  },
  { 
    id: 2, 
    year: "LIFE", 
    title: "The Soul Contract", 
    subtitle: "Why you are here.",
    desc: "An analysis of your North Node and Saturn placement to reveal your karmic debt and destiny." 
  },
  { 
    id: 3, 
    year: "NOW", 
    title: "Current Transits", 
    subtitle: "Navigating the present moment.",
    desc: "Real-time tactical advice for the planetary weather happening right now." 
  }
];

export const Archives: React.FC = () => {
  return (
    <section className="py-32 bg-[#F2F0E9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        <div className="text-center max-w-3xl mx-auto mb-24">
            <div className="flex items-center justify-center gap-3 mb-4">
                <FileText size={16} className="text-ink/60" />
                <span className="text-xs uppercase tracking-[0.3em] text-ink/40">USP 03 — Revelation</span>
            </div>
            <h2 className="text-5xl lg:text-7xl font-display text-ink mb-6">The Archives</h2>
            <p className="text-lg font-light text-ink/60">
                Beyond snippets. Receive category-specific manuscripts that read like a biography written by the universe.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REPORTS.map((report, index) => (
                <motion.div
                    key={report.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ margin: "-50px" }}
                    transition={{ delay: index * 0.2, duration: 0.8 }}
                    className="group relative h-[600px] perspective-1000"
                >
                    {/* The Physical Tablet/Book */}
                    <div className="absolute inset-0 bg-[#FDFBF7] border border-ink/10 shadow-[0_20px_40px_rgba(0,0,0,0.05)] p-10 flex flex-col justify-between transition-all duration-700 ease-out group-hover:transform group-hover:rotate-x-2 group-hover:-translate-y-4 group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)]">
                        
                        {/* Decorative Binding */}
                        <div className="absolute left-4 top-0 bottom-0 w-[1px] bg-ink/5 border-l border-dashed border-ink/20"></div>

                        {/* Top */}
                        <div>
                            <span className="font-display text-6xl text-ink/10 block mb-8">{report.year}</span>
                            <h3 className="text-3xl font-serif text-ink mb-2 leading-tight">{report.title}</h3>
                            <div className="w-12 h-[2px] bg-gold mb-4"></div>
                            <p className="font-serif italic text-ink/60">{report.subtitle}</p>
                        </div>

                        {/* Middle Text Preview (Blurry until hover) */}
                        <div className="space-y-2 opacity-30 group-hover:opacity-60 transition-opacity duration-500">
                            <div className="w-full h-2 bg-ink/10 rounded-full"></div>
                            <div className="w-5/6 h-2 bg-ink/10 rounded-full"></div>
                            <div className="w-4/6 h-2 bg-ink/10 rounded-full"></div>
                            <div className="w-full h-2 bg-ink/10 rounded-full"></div>
                        </div>

                        {/* Bottom */}
                        <div>
                            <p className="text-sm font-light text-ink/70 mb-8 leading-relaxed">
                                {report.desc}
                            </p>
                            <button className="flex items-center gap-4 text-xs uppercase tracking-widest font-bold group-hover:gap-6 transition-all">
                                Open Manuscript <ArrowRight size={14} />
                            </button>
                        </div>

                    </div>
                    
                    {/* Backing Shadow for 3D effect */}
                    <div className="absolute inset-4 top-8 bg-ink/5 blur-xl -z-10 group-hover:translate-y-8 transition-transform duration-700"></div>
                </motion.div>
            ))}
        </div>

      </div>
    </section>
  );
};