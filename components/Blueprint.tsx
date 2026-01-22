import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Blueprint: React.FC = () => {
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    // Zodiac Glyphs
    const zodiacs = ['♈︎', '♉︎', '♊︎', '♋︎', '♌︎', '♍︎', '♎︎', '♏︎', '♐︎', '♑︎', '♒︎', '♓︎'];

    return (
        <section className="py-32 bg-[#F5F2EB] relative overflow-hidden flex flex-col items-center border-t border-ink/5">
             {/* Background Tech Mesh - Subtle Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                style={{ 
                    backgroundImage: 'linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)', 
                    backgroundSize: '40px 40px' 
                }}>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                
                {/* Text Content - Left */}
                <div className="order-2 lg:order-1 space-y-10">
                     <div className="space-y-4">
                         <div className="flex items-center gap-4">
                            <span className="h-[1px] w-12 bg-ink"></span>
                            <span className="text-xs uppercase tracking-[0.3em] text-ink/60">System Core</span>
                         </div>
                         <h2 className="text-6xl lg:text-7xl font-display text-ink leading-[0.9]">
                            Cosmic <br/> <span className="italic font-serif opacity-60">Architecture</span>
                         </h2>
                     </div>
                     
                     <p className="font-light text-ink/70 leading-relaxed text-lg max-w-md">
                        This is the schematic of your psyche. High-resolution mechanics revealing the tension and flow of your soul's contract.
                     </p>

                     <div className="grid grid-cols-2 gap-6 pt-4">
                        <div className="group border-l border-ink/10 pl-4 hover:border-ink/40 transition-colors">
                            <h4 className="font-display text-2xl mb-1">Sun</h4>
                            <p className="text-xs uppercase tracking-widest text-ink/40">Vitality Engine</p>
                        </div>
                        <div className="group border-l border-ink/10 pl-4 hover:border-ink/40 transition-colors">
                            <h4 className="font-display text-2xl mb-1">Moon</h4>
                            <p className="text-xs uppercase tracking-widest text-ink/40">Emotional Body</p>
                        </div>
                     </div>

                     <div className="flex gap-4 pt-4">
                        <button className="px-6 py-3 bg-ink text-paper text-xs uppercase tracking-[0.2em] hover:bg-ink/80 transition-colors">
                            Full Analysis
                        </button>
                        <button className="px-6 py-3 border border-ink/20 text-ink text-xs uppercase tracking-[0.2em] hover:border-ink transition-colors">
                            Export PDF
                        </button>
                     </div>
                </div>

                {/* The Artifact (Chart) - Right */}
                <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative perspective-1000">
                    <div className="relative w-[500px] h-[500px] md:w-[600px] md:h-[600px]">
                        {/* 1. Base Glow */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/10 to-blue-100/20 rounded-full blur-3xl transform scale-75"></div>

                        {/* 2. The Instrument */}
                        <div className="relative w-full h-full flex items-center justify-center">
                            
                            <svg viewBox="0 0 600 600" className="w-full h-full drop-shadow-2xl overflow-visible">
                                <defs>
                                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                        <feGaussianBlur stdDeviation="2" result="blur" />
                                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                    </filter>
                                </defs>

                                {/* Layer 1: Outer Degree Ring (Static) */}
                                <circle cx="300" cy="300" r="290" fill="none" stroke="#111" strokeWidth="0.5" strokeOpacity="0.1" />
                                <circle cx="300" cy="300" r="280" fill="none" stroke="#111" strokeWidth="1" strokeOpacity="0.05" />
                                {/* Ticks */}
                                {[...Array(72)].map((_, i) => {
                                    const angle = (i * 5) * (Math.PI / 180);
                                    const isMajor = i % 2 === 0;
                                    const r1 = isMajor ? 280 : 285;
                                    const r2 = 290;
                                    const x1 = 300 + r1 * Math.cos(angle);
                                    const y1 = 300 + r1 * Math.sin(angle);
                                    const x2 = 300 + r2 * Math.cos(angle);
                                    const y2 = 300 + r2 * Math.sin(angle);
                                    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#111" strokeOpacity={isMajor ? 0.3 : 0.1} strokeWidth={1} />
                                })}

                                {/* Layer 2: Rotating Zodiac Ring */}
                                <g className="origin-center animate-[spin_120s_linear_infinite]">
                                    <circle cx="300" cy="300" r="250" fill="none" stroke="#111" strokeWidth="1" strokeOpacity="0.1" strokeDasharray="2 4"/>
                                    {zodiacs.map((sign, i) => {
                                        const angle = (i * 30 - 90 + 15) * (Math.PI / 180); 
                                        const r = 265;
                                        const x = 300 + r * Math.cos(angle);
                                        const y = 300 + r * Math.sin(angle);
                                        return (
                                            <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill="#111" fillOpacity="0.5" fontSize="16" className="font-serif">
                                                {sign}
                                            </text>
                                        )
                                    })}
                                    {/* House Dividers extending inwards */}
                                    {[...Array(12)].map((_, i) => {
                                        const angle = (i * 30 - 90) * (Math.PI / 180);
                                        const r1 = 100; 
                                        const r2 = 280; 
                                        const x1 = 300 + r1 * Math.cos(angle);
                                        const y1 = 300 + r1 * Math.sin(angle);
                                        const x2 = 300 + r2 * Math.cos(angle);
                                        const y2 = 300 + r2 * Math.sin(angle);
                                        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#111" strokeOpacity="0.05" strokeWidth="1" />
                                    })}
                                </g>

                                {/* Layer 3: Inner Mechanical Ring (Counter-Rotate) */}
                                <g className="origin-center animate-[spin_60s_linear_infinite_reverse]">
                                     <circle cx="300" cy="300" r="180" fill="none" stroke="#111" strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="10 10"/>
                                     <circle cx="300" cy="300" r="175" fill="none" stroke="#111" strokeWidth="0.5" strokeOpacity="0.1"/>
                                </g>

                                {/* Layer 4: Sacred Geometry / Aspects */}
                                <g>
                                    {/* Grand Trine (Flow) */}
                                    <path 
                                        d="M 300 80 L 490 390 L 110 390 Z" 
                                        fill="rgba(212, 175, 55, 0.05)" 
                                        stroke="#D4AF37" 
                                        strokeWidth="1" 
                                        strokeOpacity="0.4"
                                        className="transition-all duration-500 hover:stroke-opacity-100 hover:fill-gold/10 cursor-pointer"
                                        onMouseEnter={() => setHoveredNode("Grand Trine: Creative Flow")}
                                        onMouseLeave={() => setHoveredNode(null)}
                                    />
                                    
                                    {/* T-Square (Tension) */}
                                    <path 
                                        d="M 300 80 L 300 520 M 300 80 L 110 300 M 300 520 L 110 300"
                                        stroke="#BF616A" 
                                        strokeWidth="1.5" 
                                        strokeOpacity="0.5"
                                        fill="none"
                                        className="transition-all duration-500 hover:stroke-opacity-100 cursor-pointer"
                                        onMouseEnter={() => setHoveredNode("T-Square: Dynamic Tension")}
                                        onMouseLeave={() => setHoveredNode(null)}
                                    />
                                </g>

                                {/* Layer 5: Planetary Nodes */}
                                {/* Sun */}
                                <g className="cursor-pointer group" onMouseEnter={() => setHoveredNode("Sun in Leo (10th House)")} onMouseLeave={() => setHoveredNode(null)}>
                                    <line x1="300" y1="300" x2="300" y2="80" stroke="#111" strokeWidth="1" strokeOpacity="0.2" />
                                    <circle cx="300" cy="80" r="12" fill="#FDFBF7" stroke="#111" strokeWidth="1" className="group-hover:stroke-gold transition-colors"/>
                                    <circle cx="300" cy="80" r="3" fill="#111" />
                                    <text x="300" y="60" textAnchor="middle" fontSize="10" className="uppercase tracking-widest font-sans opacity-0 group-hover:opacity-100 transition-opacity" fill="#111">Sun</text>
                                </g>

                                {/* Moon */}
                                <g className="cursor-pointer group" onMouseEnter={() => setHoveredNode("Moon in Scorpio (4th House)")} onMouseLeave={() => setHoveredNode(null)}>
                                    <line x1="300" y1="300" x2="490" y2="390" stroke="#111" strokeWidth="1" strokeOpacity="0.2" />
                                    <circle cx="490" cy="390" r="10" fill="#111" className="group-hover:fill-gold transition-colors"/>
                                    <circle cx="487" cy="387" r="8" fill="#111" fillOpacity="0.5"/> 
                                    <text x="490" y="415" textAnchor="middle" fontSize="10" className="uppercase tracking-widest font-sans opacity-0 group-hover:opacity-100 transition-opacity" fill="#111">Moon</text>
                                </g>

                                {/* Mars */}
                                <g className="cursor-pointer group" onMouseEnter={() => setHoveredNode("Mars in Aries (1st House)")} onMouseLeave={() => setHoveredNode(null)}>
                                    <line x1="300" y1="300" x2="110" y2="300" stroke="#111" strokeWidth="1" strokeOpacity="0.2" />
                                    <circle cx="110" cy="300" r="8" fill="#BF616A" stroke="#111" strokeWidth="1" />
                                    <text x="110" y="325" textAnchor="middle" fontSize="10" className="uppercase tracking-widest font-sans opacity-0 group-hover:opacity-100 transition-opacity" fill="#111">Mars</text>
                                </g>

                                {/* Saturn */}
                                <g className="cursor-pointer group" onMouseEnter={() => setHoveredNode("Saturn in Aquarius (7th House)")} onMouseLeave={() => setHoveredNode(null)}>
                                    <line x1="300" y1="300" x2="300" y2="520" stroke="#111" strokeWidth="1" strokeOpacity="0.2" />
                                    <circle cx="300" cy="520" r="9" fill="none" stroke="#111" strokeWidth="2" className="group-hover:stroke-gold transition-colors"/>
                                    <line x1="290" y1="520" x2="310" y2="520" stroke="#111" strokeWidth="1" className="group-hover:stroke-gold"/>
                                    <text x="300" y="545" textAnchor="middle" fontSize="10" className="uppercase tracking-widest font-sans opacity-0 group-hover:opacity-100 transition-opacity" fill="#111">Saturn</text>
                                </g>

                                {/* Center Core */}
                                <g className="filter drop-shadow-lg">
                                    <circle cx="300" cy="300" r="40" fill="#FDFBF7" stroke="#111" strokeWidth="1" />
                                    <circle cx="300" cy="300" r="4" fill="#111" />
                                    <path d="M 300 270 L 300 330 M 270 300 L 330 300" stroke="#111" strokeWidth="0.5" />
                                    <circle cx="300" cy="300" r="32" fill="none" stroke="#111" strokeWidth="0.5" strokeDasharray="2 4" className="origin-center animate-[spin_30s_linear_infinite]" />
                                </g>

                            </svg>

                            {/* Tooltip Overlay */}
                            <AnimatePresence>
                                {hoveredNode && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-16 bg-ink/90 backdrop-blur-md text-paper px-6 py-3 border border-paper/10 shadow-xl z-20"
                                    >
                                        <div className="text-xs uppercase tracking-[0.2em] font-medium whitespace-nowrap">
                                            {hoveredNode}
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
};
