import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Calendar, ChevronLeft, ChevronRight, 
  Download, Share2, Sun, Moon, Activity, 
  Clock, AlertCircle, ArrowUpRight, Save, 
  Send, Briefcase, Heart, Coins, Brain,
  CheckCircle2, XCircle, Plus
} from 'lucide-react';

interface TodayGuidanceProps {
    onBack: () => void;
}

const TIMING_WINDOWS = [
    { label: 'Power', time: '09:00 - 11:30', reason: 'Mercury trine Saturn supports deep work.', type: 'positive' },
    { label: 'Caution', time: '14:00 - 15:30', reason: 'Moon void of course. Avoid signing.', type: 'negative' },
    { label: 'Flow', time: '19:00 - 21:00', reason: 'Venus enters 5th house. Creative peak.', type: 'neutral' }
];

const PREDICTIONS = {
    happen: [
        "Unexpected communication from a past mentor.",
        "A sudden clarity regarding a financial block.",
        "Friction in domestic partnership around 6 PM."
    ],
    do: [
        "Delay the contract review until tomorrow.",
        "Initiate the difficult conversation before noon.",
        "Journal the dream you had last night."
    ]
};

const ENERGY_METRICS = [
    { label: 'Focus', score: 85, desc: 'Sharp, piercing clarity.' },
    { label: 'Love', score: 42, desc: 'Turbulent undercurrents.' },
    { label: 'Money', score: 92, desc: 'Flow state active.' },
    { label: 'Risk', score: 20, desc: 'Conservative approach recommended.' }
];

const ROOM_IMPACTS = [
    { name: 'Career', status: 'Active', desc: 'High visibility window.', icon: Briefcase, color: 'text-green-600', bg: 'bg-green-50' },
    { name: 'Love', status: 'Tense', desc: 'Misalignment possible.', icon: Heart, color: 'text-red-600', bg: 'bg-red-50' },
    { name: 'Wealth', status: 'Stable', desc: 'Consolidate gains.', icon: Coins, color: 'text-ink/60', bg: 'bg-ink/5' },
    { name: 'Mind', status: 'Optimized', desc: 'Mercury favors logic.', icon: Brain, color: 'text-green-600', bg: 'bg-green-50' },
];

const SAVED_NOTES = [
    { time: '08:30 AM', text: 'Woke up with a sense of urgency about the project.' },
    { time: 'Yesterday', text: 'Saturn transit felt heavy in the evening.' }
];

export const TodayGuidance: React.FC<TodayGuidanceProps> = ({ onBack }) => {
    const [reflection, setReflection] = useState('');

    return (
        <div className="min-h-screen bg-paper pt-32 pb-20 relative overflow-hidden">
             {/* Background Grid */}
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none grid-bg" />

             <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 space-y-12">
                
                {/* 1. HEADER */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-ink/5 pb-6"
                >
                    <div className="flex items-center gap-6">
                        <button onClick={onBack} className="w-10 h-10 border border-ink/10 flex items-center justify-center hover:bg-ink hover:text-paper transition-colors rounded-full">
                            <ArrowLeft size={16} />
                        </button>
                        <div>
                            <div className="text-[10px] uppercase tracking-[0.3em] text-ink/40 mb-2">Daily Alignment</div>
                            <h1 className="text-4xl lg:text-5xl font-display text-ink">Today's Guidance</h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mt-6 md:mt-0">
                        <div className="flex items-center bg-white border border-ink/10 rounded-full px-4 py-2 gap-4">
                            <button className="text-ink/40 hover:text-ink transition-colors"><ChevronLeft size={16} /></button>
                            <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-mono">
                                <Calendar size={12} />
                                <span>Oct 24, 2026</span>
                            </div>
                            <button className="text-ink/40 hover:text-ink transition-colors"><ChevronRight size={16} /></button>
                        </div>
                        <button className="w-10 h-10 border border-ink/10 bg-white flex items-center justify-center hover:text-gold transition-colors rounded-full">
                            <Share2 size={16} />
                        </button>
                    </div>
                </motion.div>


                {/* 2. MAIN GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* --- LEFT COLUMN (Content) --- */}
                    <div className="lg:col-span-8 space-y-12">
                        
                        {/* A. HERO ORACLE */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-[#FDFBF7] border border-ink/10 p-10 lg:p-14 relative overflow-hidden shadow-sm"
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                                <Sun size={120} strokeWidth={0.5} />
                            </div>
                            
                            <div className="relative z-10">
                                <div className="w-12 h-[2px] bg-gold mb-8"></div>
                                <h2 className="text-3xl lg:text-5xl font-serif leading-tight mb-8 text-ink">
                                    "Structure is not the enemy of freedom, but its <span className="italic text-gold">container</span>."
                                </h2>
                                <p className="text-lg text-ink/70 font-light leading-relaxed max-w-2xl">
                                    The planetary alignment today suggests a tension between your desire for expansion and the necessity of limitation. Do not fight the wall; build with it. Saturn rewards patience today.
                                </p>
                            </div>
                        </motion.div>

                        {/* B. ENERGY BREAKDOWN */}
                        <div>
                            <h3 className="text-xs font-mono uppercase tracking-widest text-ink/40 mb-6 flex items-center gap-2">
                                <Activity size={12} /> Energy Signature
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {ENERGY_METRICS.map((metric, i) => (
                                    <motion.div 
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="bg-white border border-ink/10 p-6 flex flex-col justify-between h-[240px] hover:border-ink/30 transition-colors group relative overflow-hidden shadow-sm hover:shadow-md"
                                    >
                                        <div className="flex justify-between items-start z-10">
                                            <span className="text-[10px] uppercase tracking-[0.2em] text-ink/40 font-medium">{metric.label}</span>
                                            <span className="font-serif text-4xl text-ink">{metric.score}</span>
                                        </div>
                                        
                                        {/* Circular Gauge Visualization */}
                                        <div className="relative w-28 h-28 mx-auto my-4 z-10">
                                            <svg className="w-full h-full transform -rotate-90 overflow-visible">
                                                {/* Background Track */}
                                                <circle cx="56" cy="56" r="46" stroke="#111" strokeWidth="1" strokeOpacity="0.05" fill="none" />
                                                
                                                {/* Progress Arc */}
                                                <motion.circle 
                                                    cx="56" cy="56" r="46" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"
                                                    className={metric.score >= 50 ? "text-gold" : "text-red-400"}
                                                    strokeDasharray={289} // 2 * pi * 46 ≈ 289
                                                    strokeDashoffset={289}
                                                    initial={{ strokeDashoffset: 289 }}
                                                    animate={{ strokeDashoffset: 289 - (289 * metric.score) / 100 }}
                                                    transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                                                />
                                            </svg>
                                        </div>

                                        <p className="text-xs text-ink/60 text-center leading-relaxed font-light z-10">{metric.desc}</p>
                                        
                                        {/* Subtle Background Hover Effect */}
                                        <div className="absolute inset-0 bg-ink/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* C. TIMING WINDOWS */}
                        <div>
                            <h3 className="text-xs font-mono uppercase tracking-widest text-ink/40 mb-6 flex items-center gap-2">
                                <Clock size={12} /> Chrono-Map
                            </h3>
                            <div className="bg-white border border-ink/10 divide-y divide-ink/5">
                                {TIMING_WINDOWS.map((window, i) => (
                                    <div key={i} className="flex flex-col md:flex-row items-start md:items-center p-6 gap-6 group hover:bg-paper-light transition-colors">
                                        <div className={`
                                            w-24 px-3 py-1 text-[10px] uppercase tracking-widest text-center border rounded-full
                                            ${window.type === 'positive' ? 'border-green-200 bg-green-50 text-green-700' : 
                                              window.type === 'negative' ? 'border-red-200 bg-red-50 text-red-700' : 
                                              'border-ink/10 bg-ink/5 text-ink/60'}
                                        `}>
                                            {window.label}
                                        </div>
                                        <div className="font-mono text-sm w-32">{window.time}</div>
                                        <div className="text-sm font-serif text-ink/70 flex-1">{window.reason}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* D. PREDICTIONS VS GUIDANCE */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Predictions */}
                            <div className="bg-paper-light border border-ink/10 p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-1 h-1 bg-ink rounded-full"></div>
                                    <h3 className="font-serif italic text-xl">The Potential</h3>
                                </div>
                                <ul className="space-y-4">
                                    {PREDICTIONS.happen.map((item, i) => (
                                        <li key={i} className="flex gap-4 text-sm font-light text-ink/80 leading-relaxed group">
                                            <span className="text-ink/20 group-hover:text-gold transition-colors">0{i+1}</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Guidance */}
                            <div className="bg-ink text-paper p-8 shadow-xl">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-1 h-1 bg-paper rounded-full"></div>
                                    <h3 className="font-serif italic text-xl text-gold">The Imperative</h3>
                                </div>
                                <ul className="space-y-4">
                                    {PREDICTIONS.do.map((item, i) => (
                                        <li key={i} className="flex gap-4 text-sm font-light text-paper/80 leading-relaxed group">
                                            <CheckCircle2 size={16} className="text-gold/50 group-hover:text-gold transition-colors flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* E. LIFE ROOMS IMPACT */}
                        <div>
                             <h3 className="text-xs font-mono uppercase tracking-widest text-ink/40 mb-6 flex items-center gap-2">
                                <Briefcase size={12} /> Resonance Check
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {ROOM_IMPACTS.map((room, i) => (
                                    <div key={i} className="bg-white border border-ink/10 p-4 flex items-center justify-between hover:border-ink/30 transition-colors cursor-pointer group">
                                        <div className="flex items-center gap-4">
                                            <div className={`p-2 rounded-full ${room.bg} ${room.color} bg-opacity-20`}>
                                                <room.icon size={16} />
                                            </div>
                                            <div>
                                                <div className="font-serif text-lg">{room.name}</div>
                                                <div className="text-[10px] uppercase tracking-wider text-ink/40">{room.desc}</div>
                                            </div>
                                        </div>
                                        <div className={`text-[9px] uppercase tracking-widest px-2 py-1 rounded-sm font-bold ${room.bg} ${room.color}`}>
                                            {room.status}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* F. INTEGRATION BLOCK */}
                        <div className="bg-[#FDFBF7] border-t border-b border-ink/10 py-12 px-8 text-center relative">
                            <h3 className="font-serif text-2xl mb-4">The Integration</h3>
                            <p className="text-sm text-ink/60 mb-8 font-light italic">
                                "Where are you resisting the structure that is trying to support you?"
                            </p>
                            
                            <div className="max-w-xl mx-auto relative">
                                <input 
                                    type="text" 
                                    value={reflection}
                                    onChange={(e) => setReflection(e.target.value)}
                                    placeholder="Commit to one action..."
                                    className="w-full bg-white border border-ink/10 py-4 px-6 text-center font-serif focus:outline-none focus:border-gold transition-colors placeholder:text-ink/20"
                                />
                                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:text-gold transition-colors">
                                    <Save size={16} />
                                </button>
                            </div>
                        </div>

                    </div>


                    {/* --- RIGHT COLUMN (Actions) --- */}
                    <div className="lg:col-span-4 space-y-8">
                        
                        {/* G. QUICK CHAT */}
                        <div className="bg-white border border-ink/10 p-6 shadow-sm sticky top-32">
                            <label className="text-[10px] uppercase tracking-widest text-ink/40 mb-3 block">Quick Consultation</label>
                            <div className="relative mb-4">
                                <textarea 
                                    placeholder="Ask a question about today..."
                                    className="w-full bg-paper-light border border-ink/10 p-4 text-sm font-serif focus:outline-none focus:border-gold transition-colors placeholder:font-sans placeholder:text-ink/20 h-24 resize-none"
                                />
                                <button className="absolute right-3 bottom-3 text-ink/40 hover:text-gold transition-colors">
                                    <Send size={14} />
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {['Self', 'Work', 'Love'].map(tag => (
                                    <button key={tag} className="px-3 py-1 bg-ink/5 text-[9px] uppercase tracking-widest text-ink/60 hover:bg-ink hover:text-paper transition-colors">
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* H. TRANSITS LIST */}
                        <div className="bg-paper-light border border-ink/10 p-6">
                            <h3 className="text-xs font-mono uppercase tracking-widest text-ink/40 mb-4">Atmospheric Pressure</h3>
                            <div className="space-y-4">
                                {[
                                    { name: 'Moon Sq Pluto', desc: 'Emotional intensity', intensity: 'High' },
                                    { name: 'Sun Trine Saturn', desc: 'Productive stability', intensity: 'Med' },
                                    { name: 'Mars in Aries', desc: 'Drive and aggression', intensity: 'High' }
                                ].map((t, i) => (
                                    <div key={i} className="flex items-center justify-between border-b border-ink/5 pb-3 last:border-0 last:pb-0">
                                        <div>
                                            <div className="font-serif text-sm">{t.name}</div>
                                            <div className="text-[10px] text-ink/40">{t.desc}</div>
                                        </div>
                                        <div className={`w-2 h-2 rounded-full ${t.intensity === 'High' ? 'bg-red-500' : 'bg-gold'}`}></div>
                                    </div>
                                ))}
                            </div>
                             <button className="w-full mt-4 text-[10px] uppercase tracking-widest text-ink/40 hover:text-ink border-t border-ink/5 pt-3">
                                View Full Ephemeris
                            </button>
                        </div>

                        {/* I. SUGGESTED STEPS */}
                        <div className="space-y-3">
                            <button className="w-full py-4 border border-ink/10 bg-white hover:border-ink transition-colors flex items-center justify-center gap-2 text-xs uppercase tracking-widest">
                                <ArrowUpRight size={14} /> Talk to a Guide
                            </button>
                            <button className="w-full py-4 border border-ink/10 bg-white hover:border-ink transition-colors flex items-center justify-center gap-2 text-xs uppercase tracking-widest">
                                <Download size={14} /> Generate Report
                            </button>
                        </div>

                    </div>

                </div>


                {/* 3. BOTTOM: PATH NOTES */}
                <div className="border-t border-ink/5 pt-12 pb-20">
                     <h3 className="text-xs font-mono uppercase tracking-widest text-ink/40 mb-6 flex items-center gap-2">
                        <Save size={12} /> Artifacts from Today
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {SAVED_NOTES.map((note, i) => (
                            <div key={i} className="bg-white border border-ink/10 p-6 hover:shadow-md transition-shadow cursor-pointer">
                                <div className="text-[10px] font-mono text-ink/30 mb-2">{note.time}</div>
                                <p className="font-serif italic text-ink/70">{note.text}</p>
                            </div>
                        ))}
                        <button className="border border-dashed border-ink/20 flex flex-col items-center justify-center p-6 text-ink/40 hover:text-ink hover:border-ink transition-colors">
                            <Plus size={24} className="mb-2" />
                            <span className="text-[10px] uppercase tracking-widest">Add Reflection</span>
                        </button>
                    </div>
                </div>

             </div>
        </div>
    );
};
