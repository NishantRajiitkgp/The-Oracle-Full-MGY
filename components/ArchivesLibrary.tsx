import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, BookOpen, Clock, 
  ChevronDown, ArrowUpRight, FileText, 
  Sparkles, Bookmark, Download, Lock,
  Grid, List, SlidersHorizontal, ArrowRight
} from 'lucide-react';

interface ArchivesLibraryProps {
    onNavigate: (view: any) => void;
}

// --- MOCK DATA ---

const FILTERS = ['All', 'Daily', 'Yearly', 'Psychology', 'Career', 'Money', 'Love', 'Midlife'];

const FEATURED = [
    {
        id: 'f1',
        title: 'The Saturn Return Protocol',
        category: 'Midlife',
        reason: 'Recommended based on current transit (Saturn Return)',
        depth: 'Intense',
        readTime: '25 min',
        status: 'Generated'
    },
    {
        id: 'f2',
        title: '2026 Solar Return',
        category: 'Yearly',
        reason: 'Upcoming major cycle shift',
        depth: 'Deep',
        readTime: '45 min',
        status: 'Generated'
    },
    {
        id: 'f3',
        title: 'Venus Retrograde Survival',
        category: 'Love',
        reason: 'Transit active in 3 days',
        depth: 'Light',
        readTime: '12 min',
        status: 'Not Generated'
    }
];

const REPORTS = [
    {
        id: 1,
        title: 'Emotional Architecture Analysis',
        category: 'Psychology',
        desc: 'A deep dive into your moon placement and emotional defense mechanisms.',
        depth: 'Deep',
        readTime: '30 min',
        status: 'Updated Today',
        date: 'Oct 24, 2026'
    },
    {
        id: 2,
        title: 'Vocational North Node',
        category: 'Career',
        desc: 'Aligning your professional path with your karmic destiny point.',
        depth: 'Deep',
        readTime: '20 min',
        status: 'Generated',
        date: 'Oct 10, 2026'
    },
    {
        id: 3,
        title: 'Synastry: The Mirror',
        category: 'Love',
        desc: 'Relationship compatibility matrix for current partnerships.',
        depth: 'Intense',
        readTime: '40 min',
        status: 'Not Generated',
        date: '-'
    },
    {
        id: 4,
        title: 'Financial Blockages',
        category: 'Money',
        desc: 'Uncovering the psychological roots of scarcity mindset in your chart.',
        depth: 'Deep',
        readTime: '15 min',
        status: 'Generated',
        date: 'Sep 22, 2026'
    },
    {
        id: 5,
        title: 'Daily Transit Log: October',
        category: 'Daily',
        desc: 'Compendium of daily movements and micro-adjustments.',
        depth: 'Light',
        readTime: '5 min',
        status: 'Updated Today',
        date: 'Oct 24, 2026'
    },
    {
        id: 6,
        title: 'The Shadow Work Guide',
        category: 'Psychology',
        desc: 'Integration exercises for your 8th and 12th house placements.',
        depth: 'Intense',
        readTime: '60 min',
        status: 'Locked',
        date: '-'
    }
];

const SAVED_HIGHLIGHTS = [
    { source: 'The Saturn Return Protocol', text: 'Resistance is the compass showing you where you must go.' },
    { source: 'Vocational North Node', text: 'Leadership is not a title, it is a frequency you embody.' },
    { source: 'Financial Blockages', text: 'Money is simply energy waiting for a clear channel.' }
];

export const ArchivesLibrary: React.FC<ArchivesLibraryProps> = ({ onNavigate }) => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredReports = REPORTS.filter(report => 
        (activeFilter === 'All' || report.category === activeFilter) &&
        (report.title.toLowerCase().includes(searchQuery.toLowerCase()) || report.desc.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-paper pt-32 pb-20 relative overflow-hidden">
             {/* Background Grid */}
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none grid-bg" />

             <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 space-y-12">
                
                {/* 1. HEADER */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-ink/5 pb-8"
                >
                    <div className="max-w-xl">
                        <div className="flex items-center gap-3 mb-2 text-ink/40">
                            <BookOpen size={14} />
                            <span className="text-[10px] uppercase tracking-[0.3em]">The Library</span>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-display text-ink mb-4">The Archives</h1>
                        <p className="text-lg text-ink/60 font-light font-serif">
                            Manuscripts, forecasts, and deep-dive dossiers generated for your specific life architecture.
                        </p>
                    </div>

                    <div className="w-full md:w-auto mt-8 md:mt-0 flex flex-col md:flex-row gap-4">
                        <div className="relative group min-w-[280px]">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/20 group-focus-within:text-gold transition-colors" size={16} />
                            <input 
                                type="text" 
                                placeholder="Search reports..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white border border-ink/10 py-3 pl-12 pr-4 text-sm font-serif placeholder:font-sans placeholder:text-ink/20 focus:outline-none focus:border-gold transition-colors"
                            />
                        </div>
                        <button 
                            onClick={() => onNavigate('archives-history')}
                            className="flex items-center gap-2 px-4 py-3 bg-white border border-ink/10 hover:border-ink transition-colors text-xs uppercase tracking-widest text-ink/60 hover:text-ink"
                        >
                            <Clock size={14} />
                            <span>History</span>
                        </button>
                        <button 
                            onClick={() => onNavigate('archives-highlights')}
                            className="flex items-center gap-2 px-4 py-3 bg-white border border-ink/10 hover:border-ink transition-colors text-xs uppercase tracking-widest text-ink/60 hover:text-ink"
                        >
                            <Bookmark size={14} />
                            <span>Highlights</span>
                        </button>
                    </div>
                </motion.div>

                {/* 2. FILTER BAR (Sticky) */}
                <div className="sticky top-24 z-30 bg-paper/95 backdrop-blur-sm border-b border-ink/5 py-4 -mx-6 px-6 lg:-mx-12 lg:px-12 flex items-center gap-2 overflow-x-auto hide-scrollbar">
                    {FILTERS.map(filter => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`
                                px-4 py-2 text-[10px] uppercase tracking-widest border transition-all whitespace-nowrap
                                ${activeFilter === filter 
                                    ? 'bg-ink text-paper border-ink' 
                                    : 'bg-transparent border-ink/10 text-ink/60 hover:border-ink/40 hover:text-ink'}
                            `}
                        >
                            {filter}
                        </button>
                    ))}
                    <div className="w-px h-6 bg-ink/10 mx-2 flex-shrink-0"></div>
                     <button className="px-4 py-2 text-[10px] uppercase tracking-widest border border-dashed border-ink/20 text-ink/40 hover:text-ink hover:border-ink transition-all whitespace-nowrap">
                        + Custom Filter
                    </button>
                </div>


                {/* 3. MAIN CONTENT GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* --- LEFT COLUMN (Library) --- */}
                    <div className="lg:col-span-8 space-y-16">
                        
                        {/* A. FEATURED / RECOMMENDED */}
                        {activeFilter === 'All' && !searchQuery && (
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <Sparkles size={14} className="text-gold" />
                                    <h3 className="text-xs font-mono uppercase tracking-widest text-ink/40">Recommended for You</h3>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {FEATURED.map((item, i) => (
                                        <motion.div 
                                            key={item.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            onClick={() => onNavigate('report-detail')}
                                            className="bg-[#FDFBF7] border border-ink/10 p-6 flex flex-col justify-between h-[280px] hover:shadow-lg transition-all group relative overflow-hidden cursor-pointer"
                                        >
                                            {/* Top Tag */}
                                            <div className="flex justify-between items-start mb-4">
                                                <span className="px-2 py-1 bg-ink/5 text-[9px] uppercase tracking-widest text-ink/50">{item.category}</span>
                                                {item.status === 'Generated' ? (
                                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                                ) : (
                                                    <div className="w-2 h-2 rounded-full border border-ink/20"></div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="relative z-10">
                                                <h4 className="font-serif text-xl leading-tight mb-2 group-hover:text-gold transition-colors">{item.title}</h4>
                                                <p className="text-xs text-ink/50 leading-relaxed border-l border-ink/10 pl-3 italic">
                                                    {item.reason}
                                                </p>
                                            </div>

                                            {/* Footer */}
                                            <div className="mt-auto pt-6 border-t border-ink/5 flex items-center justify-between">
                                                <div className="flex items-center gap-3 text-[10px] uppercase tracking-wider text-ink/40">
                                                    <span>{item.depth}</span>
                                                    <span className="w-1 h-1 bg-ink/20 rounded-full"></span>
                                                    <span>{item.readTime}</span>
                                                </div>
                                                <button className="opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
                                                    <ArrowUpRight size={16} />
                                                </button>
                                            </div>

                                            {/* Decorative Background */}
                                            <div className="absolute -right-4 -bottom-4 text-[80px] font-serif text-ink/[0.02] pointer-events-none group-hover:text-ink/[0.04] transition-colors">
                                                {i + 1}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* B. MAIN REPORT GRID */}
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xs font-mono uppercase tracking-widest text-ink/40 flex items-center gap-2">
                                    <List size={14} /> Full Compendium
                                </h3>
                                <span className="text-[10px] text-ink/30 font-mono">{filteredReports.length} ENTRIES</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {filteredReports.map((report, i) => (
                                    <motion.div 
                                        key={report.id}
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        onClick={() => onNavigate('report-detail')}
                                        className={`
                                            border p-6 flex flex-col gap-4 group transition-all duration-500 cursor-pointer
                                            ${report.status === 'Locked' ? 'bg-ink/5 border-ink/5 opacity-70' : 'bg-white border-ink/10 hover:border-ink/30 hover:shadow-sm'}
                                        `}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="flex gap-2">
                                                <span className="px-2 py-1 bg-ink/5 text-[9px] uppercase tracking-widest text-ink/60">{report.category}</span>
                                                {report.status === 'Updated Today' && (
                                                    <span className="px-2 py-1 bg-green-50 text-[9px] uppercase tracking-widest text-green-700">New</span>
                                                )}
                                            </div>
                                            {report.status === 'Locked' ? <Lock size={14} className="text-ink/30" /> : null}
                                        </div>

                                        <div>
                                            <h4 className="font-serif text-2xl mb-2 group-hover:text-gold transition-colors">{report.title}</h4>
                                            <p className="text-sm text-ink/60 font-light leading-relaxed">
                                                {report.desc}
                                            </p>
                                        </div>

                                        <div className="mt-auto pt-6 border-t border-ink/5 flex items-center justify-between">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-ink/40">
                                                    <Clock size={10} /> {report.readTime}
                                                </div>
                                                <div className="text-[10px] font-mono text-ink/30">
                                                    {report.status} • {report.date}
                                                </div>
                                            </div>

                                            {report.status === 'Not Generated' ? (
                                                <button className="px-4 py-2 border border-ink text-[10px] uppercase tracking-widest hover:bg-ink hover:text-paper transition-colors">
                                                    Generate
                                                </button>
                                            ) : report.status === 'Locked' ? (
                                                <button className="px-4 py-2 bg-ink/10 text-ink/40 text-[10px] uppercase tracking-widest cursor-not-allowed">
                                                    Premium
                                                </button>
                                            ) : (
                                                <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest hover:text-gold transition-colors font-bold">
                                                    Read Report <ArrowRight size={12} />
                                                </button>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            
                            <div className="mt-12 text-center">
                                <button className="text-xs uppercase tracking-widest text-ink/40 hover:text-ink transition-colors border-b border-transparent hover:border-ink pb-1">
                                    Load Older Manuscripts
                                </button>
                            </div>
                        </div>

                    </div>


                    {/* --- RIGHT COLUMN (Sidebar) --- */}
                    <div className="lg:col-span-4 space-y-8">
                        
                        {/* C. ARCHIVE STATUS */}
                        <div className="bg-ink text-paper p-8 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-10">
                                <FileText size={80} strokeWidth={0.5} />
                            </div>
                            
                            <h3 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-6">Archive Status</h3>
                            
                            <div className="space-y-6 relative z-10">
                                <div>
                                    <div className="text-4xl font-display text-white">12</div>
                                    <div className="text-[10px] uppercase tracking-wider text-white/40">Total Reports Generated</div>
                                </div>
                                <div className="h-px bg-white/10 w-full"></div>
                                <div>
                                    <div className="text-white/60 font-serif text-lg mb-1">Emotional Architecture</div>
                                    <div className="text-[10px] uppercase tracking-wider text-white/40">Last Generated</div>
                                </div>
                            </div>

                            <div className="mt-8 flex gap-2">
                                <button 
                                    onClick={() => onNavigate('archives-history')}
                                    className="flex-1 py-3 border border-white/20 text-xs uppercase tracking-widest hover:bg-white hover:text-ink transition-colors"
                                >
                                    History
                                </button>
                                <button 
                                    onClick={() => onNavigate('archives-highlights')}
                                    className="flex-1 py-3 border border-white/20 text-xs uppercase tracking-widest hover:bg-white hover:text-ink transition-colors"
                                >
                                    Highlights
                                </button>
                            </div>
                        </div>

                        {/* D. GENERATE BY LIFE ROOM */}
                        <div className="bg-white border border-ink/10 p-6">
                            <h3 className="text-xs font-mono uppercase tracking-widest text-ink/40 mb-6 flex items-center gap-2">
                                <Sparkles size={12} /> Generate by Room
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { name: 'Career & Vocation', desc: 'Professional alignment & timing.' },
                                    { name: 'Love & Union', desc: 'Partnership dynamics analysis.' },
                                    { name: 'Wealth & Resources', desc: 'Financial flow & blockages.' },
                                    { name: 'Mind & Clarity', desc: 'Mental patterns & decisions.' }
                                ].map((room, i) => (
                                    <div key={i} className="flex items-center justify-between group cursor-pointer border-b border-ink/5 pb-3 last:border-0 last:pb-0">
                                        <div>
                                            <div className="font-serif text-sm group-hover:text-gold transition-colors">{room.name}</div>
                                            <div className="text-[10px] text-ink/40">{room.desc}</div>
                                        </div>
                                        <button className="w-6 h-6 border border-ink/10 rounded-full flex items-center justify-center text-ink/40 group-hover:bg-ink group-hover:text-paper group-hover:border-ink transition-all">
                                            <Sparkles size={10} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* E. SAVED HIGHLIGHTS */}
                        <div className="bg-paper-light border border-ink/10 p-6">
                             <h3 className="text-xs font-mono uppercase tracking-widest text-ink/40 mb-6 flex items-center gap-2">
                                <Bookmark size={12} /> Recent Highlights
                            </h3>
                            <div className="space-y-6">
                                {SAVED_HIGHLIGHTS.map((highlight, i) => (
                                    <div key={i} className="relative pl-4 border-l-2 border-gold/30 hover:border-gold transition-colors group cursor-pointer">
                                        <p className="font-serif italic text-ink/80 text-sm mb-2 leading-relaxed">
                                            "{highlight.text}"
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-[9px] uppercase tracking-widest text-ink/40 group-hover:text-ink/60">{highlight.source}</span>
                                            <ArrowUpRight size={10} className="text-ink/20 group-hover:text-gold opacity-0 group-hover:opacity-100 transition-all" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button 
                                onClick={() => onNavigate('archives-highlights')}
                                className="w-full mt-6 text-[10px] uppercase tracking-widest text-ink/40 hover:text-ink border-t border-ink/5 pt-3"
                            >
                                View All Highlights
                            </button>
                        </div>

                    </div>
                </div>

                {/* 5. BOTTOM SECTION: GUIDES CONNECTION */}
                <div className="border-t border-ink/5 pt-12 pb-8 text-center">
                    <h2 className="text-3xl font-serif text-ink mb-8">Discuss your findings</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="px-8 py-4 bg-white border border-ink/10 text-xs uppercase tracking-widest hover:border-ink transition-colors shadow-sm">
                            Speak to The Strategist
                        </button>
                        <button className="px-8 py-4 bg-white border border-ink/10 text-xs uppercase tracking-widest hover:border-ink transition-colors shadow-sm">
                            Speak to The Lover
                        </button>
                        <button className="px-8 py-4 bg-white border border-ink/10 text-xs uppercase tracking-widest hover:border-ink transition-colors shadow-sm">
                            Speak to The Mirror
                        </button>
                    </div>
                </div>

             </div>
        </div>
    );
};