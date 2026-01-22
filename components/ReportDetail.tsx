import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Calendar, Clock, Lock, 
  Download, Share2, Printer, ChevronRight,
  Eye, Sparkles, Sliders, CheckCircle2,
  PlayCircle, FileText, Bookmark, ArrowUpRight, ArrowRight
} from 'lucide-react';

interface ReportDetailProps {
    onBack: () => void;
    onNavigate: (view: any) => void;
}

// --- MOCK DATA ---

const CHAPTERS = [
    { number: '01', title: 'The Primal Self', summary: 'Analysis of the Sun sign and vital force energy.', status: 'Unlocked', readTime: '5 min' },
    { number: '02', title: 'Emotional Architecture', summary: 'Moon placement and subconscious defense mechanisms.', status: 'Unlocked', readTime: '8 min' },
    { number: '03', title: 'The Mask & The Persona', summary: 'Rising sign dynamics in social spheres.', status: 'Preview', readTime: '6 min' },
    { number: '04', title: 'Shadow Integration', summary: 'Pluto aspects and hidden psychological drives.', status: 'Locked', readTime: '12 min' },
    { number: '05', title: 'Karmic Trajectory', summary: 'North Node path and soul destiny markers.', status: 'Locked', readTime: '10 min' },
    { number: '06', title: 'Daily Rituals', summary: 'Prescriptive habits based on 6th House.', status: 'Locked', readTime: '5 min' }
];

const RELATED_REPORTS = [
    { title: 'The Saturn Return', category: 'Midlife', time: '45 min' },
    { title: 'Vocational Alignment', category: 'Career', time: '20 min' },
    { title: 'Love Language', category: 'Relationships', time: '15 min' }
];

export const ReportDetail: React.FC<ReportDetailProps> = ({ onBack, onNavigate }) => {
    const [tone, setTone] = useState('Direct');
    const [timeRange, setTimeRange] = useState('Next 12 Months');
    const [focus, setFocus] = useState('General');

    return (
        <div className="min-h-screen bg-paper pt-32 pb-20 relative overflow-hidden">
             {/* Background Grid */}
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none grid-bg" />

             <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 space-y-12">
                
                {/* 1. BREADCRUMB & HEADER */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                >
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-ink/40">
                        <button onClick={onBack} className="hover:text-ink transition-colors">Archives</button>
                        <ChevronRight size={10} />
                        <span className="hover:text-ink transition-colors cursor-pointer">Psychology</span>
                        <ChevronRight size={10} />
                        <span className="text-ink">Emotional Architecture</span>
                    </div>

                    {/* Header Block */}
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end border-b border-ink/5 pb-8 gap-8">
                        <div className="max-w-3xl">
                            <h1 className="text-4xl lg:text-6xl font-display text-ink mb-4 leading-tight">
                                Emotional Architecture <br/> <span className="italic font-serif opacity-60">Analysis</span>
                            </h1>
                            <p className="text-lg text-ink/60 font-light font-serif max-w-xl leading-relaxed mb-6">
                                A deep forensic audit of your subconscious patterns, emotional needs, and the hidden mechanics of your Moon placement.
                            </p>
                            
                            <div className="flex flex-wrap items-center gap-6 text-[10px] uppercase tracking-widest text-ink/40">
                                <span className="px-3 py-1 border border-ink/10 bg-white text-ink">Psychology</span>
                                <span className="flex items-center gap-2"><Sparkles size={12} className="text-gold" /> Deep Intensity</span>
                                <span className="flex items-center gap-2"><Clock size={12} /> 45 Min Read</span>
                                <span className="flex items-center gap-2"><Calendar size={12} /> Updated Today</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button 
                                onClick={() => onNavigate('report-reader')}
                                className="px-8 py-4 bg-ink text-paper text-xs uppercase tracking-[0.25em] hover:bg-gold hover:text-white transition-all shadow-lg flex items-center gap-3"
                            >
                                <Download size={16} /> Open Report
                            </button>
                            <button className="w-12 h-12 border border-ink/10 flex items-center justify-center hover:bg-ink hover:text-paper transition-colors bg-white">
                                <Bookmark size={16} />
                            </button>
                            <button className="w-12 h-12 border border-ink/10 flex items-center justify-center hover:bg-ink hover:text-paper transition-colors bg-white">
                                <Share2 size={16} />
                            </button>
                        </div>
                    </div>
                </motion.div>


                {/* 2. MAIN LAYOUT */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* --- LEFT COLUMN (Main Content) --- */}
                    <div className="lg:col-span-8 space-y-16">
                        
                        {/* A. OVERVIEW */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white p-8 border border-ink/5">
                                <h3 className="text-xs font-mono uppercase tracking-widest text-ink/40 mb-4">What You'll Learn</h3>
                                <ul className="space-y-3">
                                    {[
                                        "Your core emotional defense mechanisms.",
                                        "How to soothe your specific Moon sign anxiety.",
                                        "The root of your recurring relationship patterns.",
                                        "Strategies for emotional sovereignty."
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm font-serif text-ink/80 leading-relaxed">
                                            <CheckCircle2 size={14} className="text-gold mt-1 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-paper-light p-8 border border-ink/5">
                                <h3 className="text-xs font-mono uppercase tracking-widest text-ink/40 mb-4">Best Used When...</h3>
                                <ul className="space-y-3">
                                    {[
                                        "Feeling overwhelmed or ungrounded.",
                                        "Entering a new relationship.",
                                        "During significant moon transits.",
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm font-serif text-ink/80 leading-relaxed">
                                            <div className="w-1 h-1 rounded-full bg-ink/30 mt-2"></div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* B. CHAPTER LIST */}
                        <div>
                            <div className="flex items-center justify-between mb-6 border-b border-ink/5 pb-2">
                                <h3 className="text-lg font-serif italic text-ink">Table of Contents</h3>
                                <span className="text-[10px] uppercase tracking-widest text-ink/40">6 Chapters</span>
                            </div>

                            <div className="space-y-4">
                                {CHAPTERS.map((chapter, i) => (
                                    <motion.div 
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className={`
                                            group border p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all
                                            ${chapter.status === 'Locked' 
                                                ? 'border-ink/5 bg-ink/5 opacity-60' 
                                                : 'border-ink/10 bg-white hover:border-ink/30 hover:shadow-sm'}
                                        `}
                                    >
                                        <div className="flex items-start gap-6">
                                            <span className="font-display text-2xl text-ink/10">{chapter.number}</span>
                                            <div>
                                                <div className="flex items-center gap-3">
                                                    <h4 className="font-serif text-lg text-ink">{chapter.title}</h4>
                                                    {chapter.status === 'Locked' && <Lock size={12} className="text-ink/30" />}
                                                </div>
                                                <p className="text-xs text-ink/50 mt-1 font-light">{chapter.summary}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                                            <span className="text-[10px] font-mono text-ink/30">{chapter.readTime}</span>
                                            {chapter.status === 'Locked' ? (
                                                <button className="px-4 py-2 border border-ink/10 text-[10px] uppercase tracking-widest text-ink/40 hover:text-ink hover:border-ink transition-colors bg-white">
                                                    Unlock
                                                </button>
                                            ) : (
                                                <button 
                                                    onClick={() => onNavigate('report-reader')}
                                                    className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-ink hover:text-gold transition-colors font-bold"
                                                >
                                                    Read <ArrowRight size={12} />
                                                </button>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* C. PREVIEW EXCERPT */}
                        <div className="bg-[#FDFBF7] border border-ink/10 p-10 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-gold"></div>
                            <div className="absolute top-6 right-6 text-ink/10">
                                <FileText size={64} strokeWidth={0.5} />
                            </div>

                            <h3 className="text-xs font-mono uppercase tracking-widest text-ink/40 mb-6">Excerpt: Chapter 02</h3>
                            
                            <div className="prose prose-lg font-serif text-ink/80 leading-loose max-w-none">
                                <p>
                                    <span className="text-4xl float-left mr-2 mt-[-10px] font-display text-gold">W</span>
                                    ith your Moon in Scorpio, emotional safety is paradoxically found in depth and intensity. While others may seek calm waters, you are naturally inclined to dive into the undertow. This is not a flaw; it is a specialized survival mechanism.
                                </p>
                                <p className="blur-[2px] opacity-50 select-none">
                                    The challenge arises when this need for intensity manifests as unnecessary crisis creation. You may find yourself subconsciously sabotaging peace because it feels unfamiliar or "unsafe." The work here is to build tolerance for tranquility.
                                </p>
                            </div>

                            <div className="mt-8 flex gap-4">
                                <button 
                                    onClick={() => onNavigate('report-reader')}
                                    className="px-6 py-3 border border-ink text-xs uppercase tracking-widest hover:bg-ink hover:text-paper transition-colors"
                                >
                                    Unlock Full Analysis
                                </button>
                            </div>
                        </div>

                        {/* D. RELATED REPORTS */}
                        <div>
                             <h3 className="text-xs font-mono uppercase tracking-widest text-ink/40 mb-6 flex items-center gap-2">
                                <Sparkles size={12} /> Related Manuscripts
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {RELATED_REPORTS.map((report, i) => (
                                    <div key={i} className="bg-white border border-ink/10 p-6 hover:shadow-md transition-all cursor-pointer group">
                                        <div className="text-[9px] uppercase tracking-widest text-ink/40 mb-2">{report.category}</div>
                                        <h4 className="font-serif text-lg leading-tight mb-4 group-hover:text-gold transition-colors">{report.title}</h4>
                                        <div className="flex justify-between items-center border-t border-ink/5 pt-3">
                                            <span className="text-[10px] font-mono text-ink/30">{report.time}</span>
                                            <ArrowUpRight size={12} className="text-ink/20 group-hover:text-ink transition-colors" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>


                    {/* --- RIGHT COLUMN (Sidebar) --- */}
                    <div className="lg:col-span-4 space-y-8">
                        
                        {/* E. GENERATION SETTINGS */}
                        <div className="bg-white border border-ink/10 p-6 sticky top-24">
                            <div className="flex items-center gap-2 mb-6 text-ink/40">
                                <Sliders size={14} />
                                <span className="text-xs font-mono uppercase tracking-widest">Calibration</span>
                            </div>

                            <div className="space-y-6">
                                {/* Time Range */}
                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest text-ink/60 mb-3">Time Horizon</label>
                                    <div className="flex flex-col gap-2">
                                        {['Current (Now)', 'Next 30 Days', 'Next 12 Months'].map(opt => (
                                            <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${timeRange === opt ? 'border-gold bg-gold' : 'border-ink/20 group-hover:border-ink'}`}>
                                                    {timeRange === opt && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                                                </div>
                                                <input 
                                                    type="radio" 
                                                    name="time" 
                                                    className="hidden" 
                                                    checked={timeRange === opt} 
                                                    onChange={() => setTimeRange(opt)} 
                                                />
                                                <span className={`text-sm font-serif ${timeRange === opt ? 'text-ink' : 'text-ink/60'}`}>{opt}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Tone */}
                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest text-ink/60 mb-3">Tone</label>
                                    <div className="flex gap-2">
                                        {['Direct', 'Gentle', 'Analytical'].map(opt => (
                                            <button 
                                                key={opt}
                                                onClick={() => setTone(opt)}
                                                className={`flex-1 py-2 text-[10px] uppercase tracking-widest border transition-colors ${tone === opt ? 'bg-ink text-paper border-ink' : 'bg-transparent border-ink/10 text-ink/50 hover:border-ink/30'}`}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button className="w-full py-3 bg-ink/5 text-ink border border-ink/10 text-xs uppercase tracking-widest hover:bg-ink hover:text-paper transition-colors flex items-center justify-center gap-2">
                                    <Sparkles size={12} /> Regenerate Report
                                </button>
                            </div>
                        </div>

                        {/* F. ACCESS CARD */}
                        <div className="bg-ink text-paper p-8 relative overflow-hidden shadow-xl">
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <h3 className="font-serif text-2xl text-gold">Oracle Pass</h3>
                                    <Lock size={16} className="text-white/40" />
                                </div>
                                <p className="text-sm text-white/60 font-light mb-6 leading-relaxed">
                                    Unlock the full spectrum of your psychological architecture. Includes deep-dive chapters 04-06 and shadow work prompts.
                                </p>
                                <button className="w-full py-3 bg-gold text-ink font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors border border-gold">
                                    Unlock Access
                                </button>
                            </div>
                            {/* Abstract bg */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] border-[40px] border-white/5 rounded-full blur-2xl pointer-events-none"></div>
                        </div>

                        {/* G. ASK A GUIDE */}
                        <div className="bg-paper-light border border-ink/10 p-6">
                            <h3 className="text-xs font-mono uppercase tracking-widest text-ink/40 mb-4">Consult The Guides</h3>
                            <div className="space-y-3">
                                <button className="w-full text-left p-3 border border-ink/5 bg-white hover:border-ink/20 transition-colors flex items-center gap-3 group">
                                    <div className="w-8 h-8 bg-ink/5 rounded-full flex items-center justify-center text-ink group-hover:bg-ink group-hover:text-paper transition-colors">
                                        <Eye size={14} />
                                    </div>
                                    <span className="text-xs uppercase tracking-wider text-ink/70">Ask The Mystic</span>
                                </button>
                                <button className="w-full text-left p-3 border border-ink/5 bg-white hover:border-ink/20 transition-colors flex items-center gap-3 group">
                                    <div className="w-8 h-8 bg-ink/5 rounded-full flex items-center justify-center text-ink group-hover:bg-ink group-hover:text-paper transition-colors">
                                        <ArrowUpRight size={14} />
                                    </div>
                                    <span className="text-xs uppercase tracking-wider text-ink/70">Ask The Strategist</span>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

                {/* 4. FOOTER NOTE */}
                <div className="border-t border-ink/5 pt-8 text-center">
                    <p className="text-[10px] text-ink/30 uppercase tracking-widest max-w-2xl mx-auto leading-relaxed">
                        * All reports are generated based on your birth data (Oct 24, 1988) and current planetary transits. 
                        Psychological analysis is not a substitute for clinical therapy.
                    </p>
                </div>

             </div>
        </div>
    );
};
