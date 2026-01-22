import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Target, Zap } from 'lucide-react';

export const Observatory: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section 
        className="min-h-screen bg-[#050505] text-[#E0E0E0] relative flex items-center overflow-hidden py-32"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '60px 60px' }}>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        
        {/* Header */}
        <div className="mb-24 flex justify-between items-end border-b border-white/10 pb-8">
            <div>
                <div className="flex items-center gap-3 mb-4 text-gold">
                    <Activity size={16} />
                    <span className="text-xs uppercase tracking-[0.3em]">USP 02 — Calibration</span>
                </div>
                <h2 className="text-5xl lg:text-7xl font-display text-white">The Observatory</h2>
            </div>
            <div className="text-right hidden md:block">
                <div className="text-3xl font-mono text-gold mb-1">23° 41' 12"</div>
                <div className="text-[10px] uppercase tracking-widest text-white/40">Current Planetary Alignment</div>
            </div>
        </div>

        {/* The Machine Visualization */}
        <div className="relative w-full h-[600px] border border-white/10 bg-[#0a0a0a] rounded-sm overflow-hidden flex flex-col md:flex-row group">
            
            {/* Left: The Timeline Scanner */}
            <div className="w-full md:w-2/3 relative border-r border-white/10 p-12 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50"></div>
                
                {/* Planet Orbits */}
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full h-[1px] bg-white/10"></div>
                    
                    {/* Planet Nodes */}
                    {[1, 2, 3].map((i) => (
                        <motion.div 
                            key={i}
                            className="absolute top-1/2 transform -translate-y-1/2"
                            initial={{ left: `${20 + i * 25}%` }}
                            animate={{ left: [`${20 + i * 25}%`, `${25 + i * 25}%`, `${20 + i * 25}%`] }}
                            transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <div className="w-4 h-4 bg-[#0a0a0a] border border-white rounded-full relative z-10 flex items-center justify-center group-hover:border-gold transition-colors">
                                <div className="w-1 h-1 bg-white"></div>
                            </div>
                            
                            {/* Beam down */}
                            <motion.div 
                                className="absolute top-4 left-1/2 w-[1px] h-[300px] bg-gradient-to-b from-gold/50 to-transparent origin-top"
                                initial={{ scaleY: 0 }}
                                whileInView={{ scaleY: 1 }}
                                transition={{ delay: 0.5 + i }}
                            />
                            
                            {/* Label */}
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-[10px] font-mono text-white/50 whitespace-nowrap">
                                {i === 1 ? 'MER (Rx)' : i === 2 ? 'VEN' : 'JUP'}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Scanning Bar */}
                <motion.div 
                    className="absolute top-0 bottom-0 w-[2px] bg-gold shadow-[0_0_20px_#D4AF37] z-20"
                    animate={{ left: ['0%', '100%'] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />

                {/* Text Content Overlay */}
                <div className="absolute bottom-12 left-12 z-30">
                    <h3 className="text-3xl font-serif text-white mb-2">Predictive Analytics</h3>
                    <p className="text-sm text-white/60 max-w-sm font-light leading-relaxed">
                        Our engine cross-references your birth data with real-time planetary transits. We don't just say "Mercury Retrograde"; we predict exactly how it impacts your career sector.
                    </p>
                </div>
            </div>

            {/* Right: The Alert Panel */}
            <div className="w-full md:w-1/3 bg-[#0f0f0f] p-8 flex flex-col relative">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                
                <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-8 text-red-500 animate-pulse">
                            <Target size={14} />
                            <span className="text-[10px] uppercase tracking-widest font-bold">Transit Alert Detected</span>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-[#1a1a1a] p-5 border border-white/5">
                                <div className="text-[10px] uppercase text-white/30 mb-2">Target Sector</div>
                                <div className="text-xl font-display text-white">Career & Public Image</div>
                            </div>

                            <div className="bg-[#1a1a1a] p-5 border border-white/5">
                                <div className="text-[10px] uppercase text-white/30 mb-2">The Event</div>
                                <div className="text-xl font-serif text-gold">Mars enters 10th House</div>
                                <p className="mt-2 text-xs text-white/50 leading-relaxed">
                                    A surge of energy in your professional life. Use this week to launch, pitch, or demand visibility.
                                </p>
                            </div>

                            {/* Added Metrics Block */}
                            <div className="bg-[#1a1a1a] p-5 border border-white/5">
                                <div className="flex justify-between items-end mb-4">
                                    <div className="flex items-center gap-2">
                                        <Zap size={12} className="text-white/40" />
                                        <span className="text-[10px] uppercase text-white/30">Force Impact</span>
                                    </div>
                                    <span className="text-[10px] font-mono text-red-400 animate-pulse">CRITICAL</span>
                                </div>
                                
                                <div className="space-y-3">
                                    {/* Bar 1 */}
                                    <div>
                                        <div className="flex justify-between text-[9px] uppercase tracking-wider text-white/40 mb-1">
                                            <span>Intensity</span>
                                            <span>94%</span>
                                        </div>
                                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                whileInView={{ width: '94%' }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                                className="h-full bg-gradient-to-r from-red-600 to-red-400 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                                            ></motion.div>
                                        </div>
                                    </div>
                                    {/* Bar 2 */}
                                    <div>
                                        <div className="flex justify-between text-[9px] uppercase tracking-wider text-white/40 mb-1">
                                            <span>Duration</span>
                                            <span>6 Weeks</span>
                                        </div>
                                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                            <motion.div 
                                                 initial={{ width: 0 }}
                                                 whileInView={{ width: '65%' }}
                                                 transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                                                 className="h-full bg-white/40"
                                            ></motion.div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button className="w-full py-4 mt-8 border border-white/20 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                        View Full Analysis
                    </button>
                </div>
            </div>

        </div>
      </div>
    </section>
  );
};
