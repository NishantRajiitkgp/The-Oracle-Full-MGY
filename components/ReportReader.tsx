import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Search, Bookmark, Share2, Download, 
  Settings, ChevronDown, ChevronRight, MessageCircle, 
  PenTool, List, Star, AlertTriangle, Zap, ArrowUpRight,
  CheckCircle2, ChevronUp, ArrowRight
} from 'lucide-react';

interface ReportReaderProps {
    onBack: () => void;
}

// --- MOCK DATA ---

const METADATA = {
    title: "Emotional Architecture",
    user: "Marcus G. Y.",
    generated: "Oct 24, 2026",
    window: "Jan 2026 — Dec 2026"
};

const CHAPTERS = [
    { 
        id: 'intro', 
        title: 'Introduction', 
        content: "The emotional body is not a chaotic storm, but a structured hydraulic system. This report maps the pipes, valves, and reservoirs of your psyche."
    },
    { 
        id: 'ch1', 
        title: '01. The Primal Moon', 
        subtitles: ['The Scorpio Mechanism', 'Safety through Depth'],
        content: `Your Moon in Scorpio suggests that emotional safety is inextricably linked to intensity. While others seek comfort in stability, you find it in the truth of the depths. This is a survival mechanism forged in early childhood, where you likely learned that surface-level appearances could not be trusted.`,
        pullQuote: "You do not fear the dark; you fear the shallow light that hides the truth.",
        insight: { type: 'Pattern', text: "You subconsciously create crises when life becomes too calm, mistaking peace for boredom or lack of intimacy." }
    },
    { 
        id: 'ch2', 
        title: '02. Defense Protocols', 
        subtitles: ['The Wall of Silence', 'Pre-emptive Strike'],
        content: `When threatened, your instant reflex is withdrawal. This is not passive; it is an active strategic retreat to assess the enemy. However, in intimate partnerships, this silence is often interpreted as punishment.`,
        pullQuote: "Silence is your loudest weapon, but it often wounds the one wielding it.",
        insight: { type: 'Warning', text: "Current transits (Saturn sq. Moon) are calcifying your defenses. Be wary of becoming unreachable." }
    },
    { 
        id: 'ch3', 
        title: '03. Integration Strategy', 
        subtitles: ['Somatic Release', 'The 8th House Portal'],
        content: `To metabolize this intensity, you must have a physical outlet. The 8th house governs elimination. Without regular purging of emotional buildup, the system becomes toxic.`,
        insight: { type: 'Action', text: "Schedule 30 minutes of high-intensity movement immediately following stressful interactions this month." }
    }
];

const TAKEAWAYS = [
    "Moon in Scorpio demands depth, not drama.",
    "Silence is a defense mechanism, not a communication tool.",
    "Physical release is non-negotiable for 8th house placements.",
    "Saturn is asking you to mature your emotional responses.",
    "Safety is found in self-trust, not external control."
];

export const ReportReader: React.FC<ReportReaderProps> = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState<'guide' | 'notes' | 'takeaways'>('guide');
    const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');
    const [activeChapter, setActiveChapter] = useState('intro');
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    // Scroll spy logic would go here in a real app
    
    return (
        <div className="min-h-screen bg-paper pt-24 relative flex flex-col">
             
             {/* 2. READER HEADER */}
             <div className="bg-paper/95 backdrop-blur-sm border-b border-ink/5 sticky top-20 z-30 px-6 lg:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
                
                {/* Left: Metadata */}
                <div className="flex items-center gap-6 w-full md:w-auto">
                    <button onClick={onBack} className="w-8 h-8 flex items-center justify-center border border-ink/10 rounded-full hover:bg-ink hover:text-paper transition-colors">
                        <ArrowLeft size={14} />
                    </button>
                    <div>
                        <h1 className="font-serif text-xl text-ink">{METADATA.title}</h1>
                        <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-ink/40">
                            <span>For: {METADATA.user}</span>
                            <span className="w-1 h-1 bg-ink/20 rounded-full"></span>
                            <span>{METADATA.window}</span>
                        </div>
                    </div>
                </div>

                {/* Right: Tools */}
                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                     <button className="p-2 text-ink/40 hover:text-ink transition-colors" title="Export PDF">
                        <Download size={18} />
                     </button>
                     <button className="p-2 text-ink/40 hover:text-ink transition-colors" title="Share">
                        <Share2 size={18} />
                     </button>
                     <div className="relative">
                        <button 
                            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                            className={`p-2 transition-colors ${isSettingsOpen ? 'text-ink' : 'text-ink/40 hover:text-ink'}`}
                        >
                            <Settings size={18} />
                        </button>
                        {isSettingsOpen && (
                            <div className="absolute top-full right-0 mt-2 bg-white border border-ink/10 shadow-xl p-4 w-48 rounded-sm z-50">
                                <div className="text-[10px] uppercase tracking-widest text-ink/40 mb-2">Typography</div>
                                <div className="flex gap-2">
                                    <button onClick={() => setFontSize('sm')} className={`flex-1 py-1 border text-xs ${fontSize === 'sm' ? 'bg-ink text-paper border-ink' : 'border-ink/10'}`}>A</button>
                                    <button onClick={() => setFontSize('md')} className={`flex-1 py-1 border text-sm ${fontSize === 'md' ? 'bg-ink text-paper border-ink' : 'border-ink/10'}`}>A</button>
                                    <button onClick={() => setFontSize('lg')} className={`flex-1 py-1 border text-lg ${fontSize === 'lg' ? 'bg-ink text-paper border-ink' : 'border-ink/10'}`}>A</button>
                                </div>
                            </div>
                        )}
                     </div>
                     <button className="bg-ink text-paper text-xs uppercase tracking-widest px-4 py-2 hover:bg-gold transition-colors ml-2">
                        Save Report
                     </button>
                </div>
             </div>


             {/* 3. MAIN 3-COLUMN LAYOUT */}
             <div className="flex-1 max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 relative">
                 
                 {/* --- LEFT SIDEBAR (Navigation) --- */}
                 <div className="hidden lg:block lg:col-span-3 border-r border-ink/5 sticky top-[137px] h-[calc(100vh-137px)] overflow-y-auto p-6">
                    
                    <div className="mb-6 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/20" size={14} />
                        <input 
                            type="text" 
                            placeholder="Find in report..." 
                            className="w-full bg-white border border-ink/10 py-2 pl-9 pr-3 text-xs font-serif focus:outline-none focus:border-gold transition-colors"
                        />
                    </div>

                    <div className="mb-8">
                        <div className="text-[10px] uppercase tracking-widest text-ink/40 mb-4 flex justify-between">
                            <span>Table of Contents</span>
                            <span>35% Read</span>
                        </div>
                        {/* Progress Bar */}
                        <div className="w-full h-1 bg-ink/5 rounded-full mb-6">
                            <div className="w-[35%] h-full bg-gold rounded-full"></div>
                        </div>

                        <ul className="space-y-1">
                            {CHAPTERS.map((chapter) => (
                                <li key={chapter.id}>
                                    <button 
                                        onClick={() => setActiveChapter(chapter.id)}
                                        className={`w-full text-left py-2 px-3 text-sm font-serif transition-colors rounded-sm flex items-center justify-between group ${activeChapter === chapter.id ? 'bg-ink/5 text-ink' : 'text-ink/60 hover:text-ink hover:bg-white'}`}
                                    >
                                        <span className="truncate">{chapter.title}</span>
                                        {activeChapter === chapter.id && <div className="w-1.5 h-1.5 rounded-full bg-gold"></div>}
                                    </button>
                                    
                                    {/* Subtitles (Expanded) */}
                                    {activeChapter === chapter.id && chapter.subtitles && (
                                        <ul className="ml-4 border-l border-ink/10 pl-3 py-1 space-y-2 mt-1">
                                            {chapter.subtitles.map((sub, i) => (
                                                <li key={i} className="text-xs text-ink/40 hover:text-ink cursor-pointer transition-colors">
                                                    {sub}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                 </div>


                 {/* --- CENTER COLUMN (Manuscript) --- */}
                 <div className="col-span-1 lg:col-span-6 bg-white min-h-screen border-r border-ink/5">
                    <div className={`max-w-2xl mx-auto py-16 px-8 lg:px-12 transition-all ${
                        fontSize === 'sm' ? 'prose-sm' : fontSize === 'lg' ? 'prose-xl' : 'prose'
                    }`}>
                        
                        {/* Intro Block */}
                        <div className="mb-16 pb-12 border-b border-ink/5">
                            <h2 className="font-display text-4xl mb-6 text-ink">Executive Summary</h2>
                            <p className="font-serif text-ink/80 leading-relaxed text-lg">
                                {CHAPTERS[0].content}
                            </p>
                            <div className="mt-8 bg-paper-light border border-ink/5 p-6">
                                <span className="text-[10px] uppercase tracking-widest text-ink/40 mb-3 block">Key Themes</span>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {['Emotional Depth', 'Strategic Defense', 'Karmic Cycles', 'Somatic Release'].map(tag => (
                                        <li key={tag} className="flex items-center gap-2 text-xs font-bold text-ink/70">
                                            <div className="w-1 h-1 bg-gold rounded-full"></div>
                                            {tag}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Chapter Loop */}
                        {CHAPTERS.slice(1).map((chapter, index) => (
                            <div key={chapter.id} className="mb-24 scroll-mt-32" id={chapter.id}>
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="text-[10px] uppercase tracking-widest text-ink/30">Chapter</span>
                                    <div className="h-[1px] flex-1 bg-ink/10"></div>
                                </div>
                                
                                <h2 className="font-serif text-3xl text-ink mb-8">{chapter.title}</h2>
                                
                                <div className="font-serif text-ink/80 leading-loose space-y-6">
                                    <p>{chapter.content}</p>
                                    
                                    {/* Pull Quote */}
                                    {chapter.pullQuote && (
                                        <blockquote className="my-10 border-l-2 border-gold pl-6 py-2">
                                            <p className="text-xl italic text-ink font-serif leading-relaxed">"{chapter.pullQuote}"</p>
                                        </blockquote>
                                    )}

                                    <p>
                                        This positioning creates a reservoir of psychological power that is accessible only when you stop resisting the flow of your own feelings.
                                    </p>

                                    {/* Insight Card */}
                                    {chapter.insight && (
                                        <div className={`my-10 p-6 border-l-4 ${
                                            chapter.insight.type === 'Warning' ? 'border-red-400 bg-red-50' :
                                            chapter.insight.type === 'Action' ? 'border-green-400 bg-green-50' :
                                            'border-blue-400 bg-blue-50'
                                        }`}>
                                            <div className="flex items-center gap-2 mb-2">
                                                {chapter.insight.type === 'Warning' ? <AlertTriangle size={14} className="text-red-500" /> :
                                                 chapter.insight.type === 'Action' ? <Zap size={14} className="text-green-500" /> :
                                                 <Star size={14} className="text-blue-500" />}
                                                <span className={`text-[10px] uppercase tracking-widest font-bold ${
                                                    chapter.insight.type === 'Warning' ? 'text-red-600' :
                                                    chapter.insight.type === 'Action' ? 'text-green-600' :
                                                    'text-blue-600'
                                                }`}>
                                                    {chapter.insight.type}
                                                </span>
                                            </div>
                                            <p className="text-sm font-medium text-ink/80">{chapter.insight.text}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Inline Actions */}
                                <div className="mt-8 flex gap-4">
                                    <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest border border-ink/10 px-3 py-2 hover:bg-ink hover:text-paper transition-colors">
                                        <Bookmark size={12} /> Save Highlight
                                    </button>
                                    <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest border border-ink/10 px-3 py-2 hover:bg-ink hover:text-paper transition-colors">
                                        <MessageCircle size={12} /> Ask Guide
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Nav */}
                    <div className="max-w-2xl mx-auto px-8 lg:px-12 pb-20 flex justify-between items-center border-t border-ink/10 pt-8">
                        <button className="flex items-center gap-2 text-xs uppercase tracking-widest text-ink/40 hover:text-ink transition-colors">
                            <ArrowLeft size={14} /> Previous
                        </button>
                        <div className="text-[10px] text-ink/30 font-mono">END OF SECTION</div>
                        <button className="flex items-center gap-2 text-xs uppercase tracking-widest text-ink font-bold hover:text-gold transition-colors">
                            Next Chapter <ArrowRight size={14} />
                        </button>
                    </div>
                 </div>


                 {/* --- RIGHT SIDEBAR (Tools) --- */}
                 <div className="hidden lg:flex lg:col-span-3 sticky top-[137px] h-[calc(100vh-137px)] flex-col bg-paper-light">
                    
                    {/* Tool Tabs */}
                    <div className="flex border-b border-ink/10">
                        <button 
                            onClick={() => setActiveTab('guide')}
                            className={`flex-1 py-3 text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-colors ${activeTab === 'guide' ? 'bg-white border-b-2 border-gold text-ink' : 'text-ink/40 hover:text-ink'}`}
                        >
                            <MessageCircle size={12} /> Guide
                        </button>
                        <button 
                            onClick={() => setActiveTab('notes')}
                            className={`flex-1 py-3 text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-colors ${activeTab === 'notes' ? 'bg-white border-b-2 border-gold text-ink' : 'text-ink/40 hover:text-ink'}`}
                        >
                            <PenTool size={12} /> Notes
                        </button>
                        <button 
                            onClick={() => setActiveTab('takeaways')}
                            className={`flex-1 py-3 text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-colors ${activeTab === 'takeaways' ? 'bg-white border-b-2 border-gold text-ink' : 'text-ink/40 hover:text-ink'}`}
                        >
                            <List size={12} /> Key
                        </button>
                    </div>

                    {/* Tool Content Area */}
                    <div className="flex-1 overflow-y-auto p-6">
                        
                        {/* 1. GUIDE CHAT */}
                        {activeTab === 'guide' && (
                            <div className="h-full flex flex-col">
                                <div className="mb-4">
                                    <div className="relative group cursor-pointer border border-ink/10 bg-white p-3 flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-ink/5 flex items-center justify-center text-lg">👁️</div>
                                            <div>
                                                <div className="text-[10px] uppercase tracking-widest text-ink/40">Consulting</div>
                                                <div className="font-serif text-sm">The Mystic</div>
                                            </div>
                                        </div>
                                        <ChevronDown size={14} className="text-ink/40" />
                                    </div>
                                    <p className="text-xs text-ink/50 italic mb-6">
                                        "I am analyzing the text regarding your Moon placement. Ask me to clarify the shadow work technique."
                                    </p>
                                </div>

                                <div className="flex-1 space-y-4 mb-4">
                                    <div className="flex justify-end">
                                        <div className="bg-ink/5 text-ink text-xs p-3 rounded-tr-none rounded-lg max-w-[90%]">
                                            How do I integrate the shadow?
                                        </div>
                                    </div>
                                    <div className="flex justify-start">
                                        <div className="bg-white border border-ink/10 text-ink text-xs p-3 rounded-tl-none rounded-lg max-w-[90%] shadow-sm leading-relaxed">
                                            Start by observing your reflex to withdraw. When you feel the urge to hide, stay for 5 minutes longer.
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-auto relative">
                                    <input 
                                        type="text" 
                                        placeholder="Ask about this chapter..." 
                                        className="w-full bg-white border border-ink/10 py-3 pl-3 pr-10 text-xs font-serif focus:outline-none focus:border-gold transition-colors"
                                    />
                                    <button className="absolute right-2 top-1/2 -translate-y-1/2 text-ink/20 hover:text-gold transition-colors">
                                        <ArrowUpRight size={14} />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* 2. NOTES / HIGHLIGHTS */}
                        {activeTab === 'notes' && (
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-[10px] uppercase tracking-widest text-ink/40 mb-3">Highlights</h4>
                                    <div className="space-y-3">
                                        <div className="bg-white p-3 border-l-2 border-gold shadow-sm cursor-pointer group">
                                            <p className="font-serif italic text-xs text-ink/80 mb-2">"Silence is your loudest weapon, but it often wounds the one wielding it."</p>
                                            <div className="flex justify-between items-center text-[9px] uppercase tracking-widest text-ink/30 group-hover:text-ink/50">
                                                <span>Chapter 02</span>
                                                <ArrowUpRight size={10} />
                                            </div>
                                        </div>
                                        <div className="bg-white p-3 border-l-2 border-gold shadow-sm cursor-pointer group">
                                            <p className="font-serif italic text-xs text-ink/80 mb-2">"You do not fear the dark; you fear the shallow light."</p>
                                            <div className="flex justify-between items-center text-[9px] uppercase tracking-widest text-ink/30 group-hover:text-ink/50">
                                                <span>Chapter 01</span>
                                                <ArrowUpRight size={10} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className="w-full py-3 border border-dashed border-ink/20 text-xs uppercase tracking-widest text-ink/40 hover:text-ink hover:border-ink transition-colors">
                                    + Add Note
                                </button>
                            </div>
                        )}

                        {/* 3. KEY TAKEAWAYS */}
                        {activeTab === 'takeaways' && (
                            <div>
                                <h4 className="text-[10px] uppercase tracking-widest text-ink/40 mb-4">Auto-Generated Insights</h4>
                                <ul className="space-y-4">
                                    {TAKEAWAYS.map((t, i) => (
                                        <li key={i} className="bg-white p-4 border border-ink/5 shadow-sm group">
                                            <div className="flex gap-3 mb-2">
                                                <div className="text-gold font-serif italic text-lg">{i+1}.</div>
                                                <p className="text-xs font-medium text-ink/80 leading-relaxed">{t}</p>
                                            </div>
                                            <button className="ml-6 text-[9px] uppercase tracking-widest text-ink/30 hover:text-gold flex items-center gap-1 transition-colors">
                                                <CheckCircle2 size={10} /> Save to Path
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                    </div>

                 </div>

             </div>
        </div>
    );
};