import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sun, Moon, ArrowRight, Send, Activity, 
  Calendar, MapPin, RefreshCw, Briefcase, 
  Heart, Coins, Brain, Star, ChevronRight,
  Maximize2, ArrowUpRight, Lock
} from 'lucide-react';

interface ObservatoryDashboardProps {
    onNavigate?: (view: any) => void;
}

// --- MOCK DATA ---
const TRANSITS = [
  { name: 'Mercury □ Saturn', sector: 'Career', intensity: 'High', time: '2d 4h', desc: 'Mental Restriction' },
  { name: 'Venus △ Mars', sector: 'Love', intensity: 'Med', time: '5d 12h', desc: 'Passionate Action' },
  { name: 'Moon in Scorpio', sector: 'Self', intensity: 'Low', time: '12h', desc: 'Deep Feeling' },
  { name: 'Jupiter ☍ Sun', sector: 'Wealth', intensity: 'High', time: '3d 1h', desc: 'Overconfidence' },
];

const ROOMS = [
  { id: 'career', name: 'Career & Vocation', status: 'Active', trend: 'up', icon: Briefcase, score: 88, forecast: 'Expansion imminent' },
  { id: 'love', name: 'Love & Union', status: 'Tense', trend: 'down', icon: Heart, score: 42, forecast: 'Karmic clearing' },
  { id: 'wealth', name: 'Wealth & Resources', status: 'Stable', trend: 'flat', icon: Coins, score: 65, forecast: 'Consolidation phase' },
  { id: 'mind', name: 'Mind & Clarity', status: 'Optimized', trend: 'up', icon: Brain, score: 91, forecast: 'High receptivity' },
];

// --- SUB-COMPONENTS ---

// 1. The Sparkline (Trend Visualizer)
const Sparkline = ({ trend, color }: { trend: string; color: string }) => {
    // Simple SVG paths for trends
    const paths = {
        up: "M0 20 C 10 20, 15 15, 25 10 S 35 15, 50 2",
        down: "M0 5 C 10 5, 15 10, 25 15 S 35 10, 50 22",
        flat: "M0 12 C 10 10, 20 14, 30 12 S 40 10, 50 12"
    };
    
    return (
        <svg width="50" height="24" viewBox="0 0 50 24" className="overflow-visible">
            <path 
                d={paths[trend as keyof typeof paths]} 
                fill="none" 
                stroke={color} 
                strokeWidth="1.5" 
                strokeLinecap="round"
            />
            <circle cx={trend === 'up' ? 50 : trend === 'down' ? 50 : 50} cy={trend === 'up' ? 2 : trend === 'down' ? 22 : 12} r="2" fill={color} />
        </svg>
    );
}

// 2. The Astrolabe (Redesigned Interface)
const Astrolabe = () => {
  const metrics = { focus: 85, love: 45, money: 92, risk: 30 };
  const center = 150; // Increased size
  const scale = 1.2; 
  
  // Dynamic Points
  const p1 = { x: center, y: center - (metrics.focus * scale) }; 
  const p2 = { x: center + (metrics.love * scale), y: center }; 
  const p3 = { x: center, y: center + (metrics.money * scale) }; 
  const p4 = { x: center - (metrics.risk * scale), y: center }; 
  
  const pathData = `M${p1.x},${p1.y} L${p2.x},${p2.y} L${p3.x},${p3.y} L${p4.x},${p4.y} Z`;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 300 300" className="w-full h-full max-w-[400px] max-h-[400px] overflow-visible font-mono">
        <defs>
            <radialGradient id="radar-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.0" />
                <stop offset="90%" stopColor="#D4AF37" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.3" />
            </radialGradient>
            <filter id="glow-gold" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
        </defs>

        {/* --- STATIC RINGS --- */}
        {/* Outer Degree Ring */}
        <circle cx="150" cy="150" r="140" fill="none" stroke="#111" strokeWidth="0.5" strokeOpacity="0.1" />
        {[...Array(60)].map((_, i) => (
            <line 
                key={i} 
                x1={150 + 135 * Math.cos(i * 6 * Math.PI / 180)} 
                y1={150 + 135 * Math.sin(i * 6 * Math.PI / 180)} 
                x2={150 + 140 * Math.cos(i * 6 * Math.PI / 180)} 
                y2={150 + 140 * Math.sin(i * 6 * Math.PI / 180)} 
                stroke="#111" strokeOpacity={i % 5 === 0 ? 0.3 : 0.1} strokeWidth={1}
            />
        ))}

        {/* --- ANIMATED RINGS --- */}
        {/* Counter-Rotating Dashed Ring */}
        <motion.circle 
            cx="150" cy="150" r="110" 
            fill="none" stroke="#111" strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="4 4"
            animate={{ rotate: -360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "center" }}
        />

        {/* Radar Scanner Beam */}
        <motion.path 
            d="M150 150 L150 10 A140 140 0 0 1 290 150 Z" // Quarter wedge
            fill="url(#radar-gradient)"
            opacity="0.2"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "150px 150px" }}
        />

        {/* --- AXES & LABELS --- */}
        <g opacity="0.4">
            <line x1="150" y1="20" x2="150" y2="280" stroke="#111" strokeWidth="0.5" />
            <line x1="20" y1="150" x2="280" y2="150" stroke="#111" strokeWidth="0.5" />
        </g>
        
        {/* Labels with connecting lines */}
        <g className="text-[10px] uppercase tracking-widest font-bold fill-ink">
            <text x="150" y="15" textAnchor="middle">Focus</text>
            <text x="290" y="153" textAnchor="start">Love</text>
            <text x="150" y="295" textAnchor="middle">Money</text>
            <text x="10" y="153" textAnchor="end">Risk</text>
        </g>

        {/* --- DATA SHAPE --- */}
        <motion.path 
            d={pathData} 
            fill="rgba(212, 175, 55, 0.15)" 
            stroke="#D4AF37" 
            strokeWidth="2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            filter="url(#glow-gold)"
        />
        
        {/* Pulsing Nodes */}
        {[p1, p2, p3, p4].map((p, i) => (
             <motion.circle 
                key={i} 
                cx={p.x} cy={p.y} r="3" fill="#D4AF37"
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
             />
        ))}

      </svg>
      
      {/* Central Score Display */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-24 h-24 bg-white/80 backdrop-blur-sm rounded-full border border-ink/5 flex flex-col items-center justify-center shadow-sm">
               <div className="absolute inset-0 border border-ink/10 rounded-full animate-ping opacity-20"></div>
               <span className="text-4xl font-display text-ink">92</span>
               <div className="h-[1px] w-8 bg-gold my-1"></div>
               <span className="text-[8px] uppercase tracking-[0.2em] text-ink/50">Aligned</span>
          </div>
      </div>
    </div>
  );
};

export const ObservatoryDashboard: React.FC<ObservatoryDashboardProps> = ({ onNavigate }) => {
  const [activeTransit, setActiveTransit] = useState(0);

  // Auto-scroll transits ticker logic can go here if needed
  
  return (
    <div className="min-h-screen bg-paper pt-32 pb-20 relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none grid-bg" />

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 space-y-12">
            
            {/* 1. TOP HEADER */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-ink/5 pb-6"
            >
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-[9px] uppercase tracking-[0.3em] text-ink/40">Real-Time Connection</span>
                    </div>
                    <h1 className="text-5xl lg:text-6xl font-display text-ink">Observatory</h1>
                </div>
                
                <div className="flex flex-wrap gap-6 mt-4 md:mt-0 text-[10px] uppercase tracking-widest text-ink/40 font-mono">
                    <div className="flex items-center gap-2 px-3 py-1 border border-ink/10 rounded-full">
                        <Calendar size={12} />
                        <span>Oct 24, 2026</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 border border-ink/10 rounded-full">
                        <MapPin size={12} />
                        <span>London (51.5°N)</span>
                    </div>
                    <button className="flex items-center gap-2 px-3 py-1 border border-ink/10 rounded-full text-ink hover:bg-ink hover:text-paper transition-colors">
                        <RefreshCw size={12} />
                        <span>Recalibrate</span>
                    </button>
                </div>
            </motion.div>


            {/* 2. THE DASHBOARD GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                
                {/* --- LEFT COLUMN: GUIDANCE & CALIBRATION (7 Cols) --- */}
                <div className="lg:col-span-7 flex flex-col gap-8">
                    
                    {/* A. Daily Guidance Monolith */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="bg-[#FDFBF7] border border-ink/10 p-10 lg:p-14 relative overflow-hidden shadow-sm group min-h-[400px] flex flex-col justify-between"
                    >
                        {/* Background Typographic Element */}
                        <div className="absolute -right-4 -top-8 text-[120px] font-serif italic text-ink/5 pointer-events-none">
                            Saturn
                        </div>

                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <span className="w-8 h-[1px] bg-gold"></span>
                                <span className="text-xs font-mono uppercase tracking-widest text-ink/50">Daily Insight</span>
                            </div>

                            <h2 className="text-4xl lg:text-5xl font-serif leading-tight mb-6 text-ink">
                                "The structure you build today becomes the <span className="italic text-gold">sanctuary</span> of tomorrow."
                            </h2>
                            
                            <p className="text-lg text-ink/60 font-light leading-relaxed max-w-lg border-l-2 border-ink/5 pl-6">
                                With Saturn trine your natal Sun, the energy favors architectural thinking. Do not look for shortcuts. Lay the brick.
                            </p>
                        </div>

                        <div className="flex items-center justify-between pt-8 border-t border-ink/5 mt-8">
                             <div className="flex gap-8">
                                 <div>
                                     <span className="block text-[9px] uppercase tracking-widest text-ink/40 mb-1">Window</span>
                                     <span className="font-mono text-sm">09:00 — 11:30</span>
                                 </div>
                                 <div>
                                     <span className="block text-[9px] uppercase tracking-widest text-ink/40 mb-1">Intensity</span>
                                     <span className="font-mono text-sm">High</span>
                                 </div>
                             </div>
                             <button 
                                onClick={() => onNavigate && onNavigate('today')}
                                className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold group-hover:gap-4 transition-all hover:text-gold"
                             >
                                 Expand <ArrowRight size={14} />
                             </button>
                        </div>
                    </motion.div>

                    {/* B. The Stream (Transits) */}
                    <div 
                        onClick={() => onNavigate && onNavigate('transits')}
                        className="bg-white border border-ink/10 p-1 cursor-pointer group hover:border-gold/30 transition-all"
                    >
                        <div className="bg-ink text-paper px-4 py-2 flex justify-between items-center text-[10px] uppercase tracking-widest">
                            <span>Planetary Stream</span>
                            <div className="flex items-center gap-2">
                                <span className="text-[9px] opacity-60 group-hover:opacity-100 transition-opacity">View Full Ephemeris</span>
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            </div>
                        </div>
                        <div className="divide-y divide-ink/5">
                            {TRANSITS.map((t, i) => (
                                <div key={i} className="flex items-center justify-between p-4 hover:bg-paper-light transition-colors group/item">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-1 h-1 rounded-full ${t.intensity === 'High' ? 'bg-red-500' : 'bg-gold'}`}></div>
                                        <div>
                                            <div className="font-serif text-lg leading-none group-hover/item:text-gold transition-colors">{t.name}</div>
                                            <div className="text-[10px] uppercase text-ink/40 mt-1">{t.sector} Sector</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-mono text-xs">{t.time}</div>
                                        <div className="text-[10px] text-ink/40 italic">{t.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


                {/* --- RIGHT COLUMN: METRICS & ROOMS (5 Cols) --- */}
                <div className="lg:col-span-5 flex flex-col gap-8">
                    
                    {/* C. Metric Calibration (Astrolabe) */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        onClick={() => onNavigate && onNavigate('cycle')}
                        className="bg-white border border-ink/10 p-8 flex flex-col relative aspect-square shadow-sm cursor-pointer hover:border-gold/30 transition-colors group"
                    >
                        <div className="flex justify-between items-start absolute top-6 left-6 right-6 z-10">
                            <h3 className="text-xs font-mono uppercase tracking-widest text-ink/40">Metric Calibration</h3>
                            <Maximize2 size={14} className="text-ink/20 group-hover:text-ink cursor-pointer transition-colors" />
                        </div>
                        
                        {/* The Chart */}
                        <div className="flex-1">
                            <Astrolabe />
                        </div>

                        {/* Footer Data */}
                        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end border-t border-ink/5 pt-4">
                            <div>
                                <span className="block text-[9px] uppercase tracking-widest text-ink/40 mb-1">Current Cycle</span>
                                <span className="font-serif text-lg group-hover:text-gold transition-colors">Saturn Return</span>
                            </div>
                            <div className="text-right">
                                <span className="block text-[9px] uppercase tracking-widest text-ink/40 mb-1">Phase</span>
                                <span className="font-serif text-lg">II / III</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* D. Oracle Input (Compact) */}
                    <div className="bg-paper-light border border-ink/10 p-6 flex items-center gap-4 group focus-within:border-gold transition-colors shadow-sm">
                         <div className="flex-1">
                             <label className="text-[9px] uppercase tracking-widest text-ink/40 mb-2 block">Quick Query</label>
                             <input 
                                type="text" 
                                placeholder="Ask the Oracle..." 
                                className="w-full bg-transparent border-none p-0 text-lg font-serif placeholder:text-ink/20 focus:ring-0"
                             />
                         </div>
                         <button className="w-10 h-10 bg-ink text-paper flex items-center justify-center hover:bg-gold transition-colors">
                             <Send size={16} />
                         </button>
                    </div>

                </div>
            </div>


            {/* 3. LIFE ROOMS (The Creative "Blueprint" Cards) */}
            <div className="pt-12 border-t border-ink/5">
                <div className="flex justify-between items-end mb-8">
                    <h3 className="text-2xl font-display text-ink">Life Rooms</h3>
                    <div className="flex gap-2 text-[10px] uppercase tracking-widest text-ink/40">
                        <span>Status:</span>
                        <span className="text-ink font-bold">Active</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {ROOMS.map((room, i) => (
                        <motion.div 
                            key={room.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative h-[320px] bg-white border border-ink/10 hover:border-ink/50 transition-all duration-500 overflow-hidden cursor-pointer flex flex-col justify-between p-6"
                        >
                            {/* Hover Background Pattern */}
                            <div className="absolute inset-0 bg-paper opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#111 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
                            </div>

                            {/* Top: Header */}
                            <div className="relative z-10 flex justify-between items-start">
                                <div className="p-2 border border-ink/10 rounded-sm bg-white group-hover:border-ink transition-colors">
                                    <room.icon size={20} strokeWidth={1} />
                                </div>
                                <div className={`px-2 py-1 text-[9px] uppercase tracking-widest font-bold border ${
                                    room.status === 'Tense' ? 'border-red-200 text-red-600 bg-red-50' : 
                                    room.status === 'Active' ? 'border-green-200 text-green-600 bg-green-50' :
                                    'border-ink/10 text-ink/40 bg-ink/5'
                                }`}>
                                    {room.status}
                                </div>
                            </div>

                            {/* Middle: Main Info */}
                            <div className="relative z-10 mt-4">
                                <h4 className="font-serif text-2xl mb-1 group-hover:translate-x-1 transition-transform duration-300">{room.name}</h4>
                                <div className="h-[1px] w-8 bg-gold mb-4 group-hover:w-16 transition-all duration-500"></div>
                                
                                <div className="space-y-1 opacity-60 group-hover:opacity-100 transition-opacity">
                                    <div className="flex justify-between text-xs font-mono">
                                        <span>Alignment</span>
                                        <span>{room.score}%</span>
                                    </div>
                                    <div className="w-full h-1 bg-ink/5 rounded-full overflow-hidden">
                                        <div style={{ width: `${room.score}%` }} className="h-full bg-ink/80"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom: Sparkline & Action */}
                            <div className="relative z-10 mt-auto pt-6 border-t border-ink/5 flex justify-between items-end">
                                <div>
                                    <span className="text-[9px] uppercase tracking-widest text-ink/40 mb-1 block">Trend</span>
                                    <Sparkline 
                                        trend={room.trend} 
                                        color={room.trend === 'down' ? '#EF4444' : room.trend === 'up' ? '#10B981' : '#9CA3AF'} 
                                    />
                                </div>
                                
                                <div className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                    <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold bg-ink text-paper px-3 py-2 hover:bg-gold transition-colors">
                                        Access <ArrowUpRight size={12} />
                                    </button>
                                </div>
                                
                                {/* Lock Icon for Tense rooms (Optional visual cue) */}
                                {room.status === 'Locked' && <Lock size={14} className="text-ink/20 absolute bottom-6 right-6" />}
                            </div>

                        </motion.div>
                    ))}
                </div>
            </div>

        </div>
    );
};