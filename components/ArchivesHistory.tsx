import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Search, Filter, Calendar, 
  ChevronDown, FileText, Download, Trash2, 
  Eye, Clock, RefreshCw, Bookmark, ArrowRight,
  BarChart2, Star, ChevronRight
} from 'lucide-react';

interface ArchivesHistoryProps {
    onNavigate: (view: any) => void;
    onBack: () => void;
}

// --- MOCK DATA ---

const HISTORY_ITEMS = [
    {
        id: 'h1',
        month: 'October 2026',
        items: [
            {
                id: 'r1',
                date: 'Oct 24',
                time: '10:30 AM',
                title: 'Emotional Architecture Analysis',
                category: 'Psychology',
                coverage: 'Next 12 Months',
                readTime: '30 min',
                status: 'Ready',
                generatedBy: 'The Mystic'
            },
            {
                id: 'r2',
                date: 'Oct 24',
                time: '08:15 AM',
                title: 'Daily Transit Log: Oct 24',
                category: 'Daily',
                coverage: '24 Hours',
                readTime: '5 min',
                status: 'Ready',
                generatedBy: 'System'
            },
            {
                id: 'r3',
                date: 'Oct 10',
                time: '02:00 PM',
                title: 'Vocational North Node',
                category: 'Career',
                coverage: 'Lifetime',
                readTime: '20 min',
                status: 'Needs Update',
                generatedBy: 'The Strategist'
            }
        ]
    },
    {
        id: 'h2',
        month: 'September 2026',
        items: [
            {
                id: 'r4',
                date: 'Sep 22',
                time: '09:45 AM',
                title: 'Financial Blockages Audit',
                category: 'Money',
                coverage: 'Q4 2026',
                readTime: '15 min',
                status: 'Ready',
                generatedBy: 'The Strategist'
            },
            {
                id: 'r5',
                date: 'Sep 01',
                time: '11:00 AM',
                title: 'Monthly Forecast: September',
                category: 'Monthly',
                coverage: 'Sep 01 - Sep 30',
                readTime: '10 min',
                status: 'Expired',
                generatedBy: 'System'
            }
        ]
    }
];

const FILTERS = ['All', 'Daily', 'Psychology', 'Career', 'Money', 'Love'];

const STATS = {
    total: 12,
    thisMonth: 3,
    topCategory: 'Psychology',
    lastGenerated: 'Oct 24, 2026'
};

const MOST_READ = [
    { title: 'The Saturn Return Protocol', opens: 24 },
    { title: 'Emotional Architecture', opens: 12 },
    { title: '2026 Annual Forecast', opens: 8 }
];

const RECENT_HIGHLIGHTS = [
    { text: "Resistance is the compass showing you where you must go.", source: 'Saturn Return Protocol' },
    { text: "Money is simply energy waiting for a clear channel.", source: 'Financial Blockages' }
];

export const ArchivesHistory: React.FC<ArchivesHistoryProps> = ({ onNavigate, onBack }) => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="min-h-screen bg-paper pt-32 pb-20 relative overflow-hidden">
             {/* Background Grid */}
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none grid-bg" />

             <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 space-y-12">
                
                {/* 1. HEADER */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end border-b border-ink/5 pb-8 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-ink/40">
                            <button onClick={onBack} className="hover:text-ink transition-colors">Archives</button>
                            <ChevronRight size={10} />
                            <span className="text-ink font-bold">History</span>
                        </div>
                        
                        <div>
                            <h1 className="text-4xl lg:text-5xl font-display text-ink mb-2">Archive History</h1>
                            <p className="text-lg text-ink/60 font-serif max-w-xl">
                                A chronological record of all generated reports, manuscripts, and dossiers.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
                        <div className="relative group min-w-[280px]">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/20 group-focus-within:text-gold transition-colors" size={16} />
                            <input 
                                type="text" 
                                placeholder="Search history..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white border border-ink/10 py-3 pl-12 pr-4 text-sm font-serif placeholder:font-sans placeholder:text-ink/20 focus:outline-none focus:border-gold transition-colors"
                            />
                        </div>
                        <button 
                            onClick={() => onNavigate('archives')} 
                            className="px-6 py-3 bg-ink text-paper text-xs uppercase tracking-widest hover:bg-gold hover:text-white transition-colors shadow-md flex items-center justify-center gap-2"
                        >
                            <RefreshCw size={14} /> Generate New
                        </button>
                    </div>
                </div>

                {/* 2. FILTERS (Sticky) */}
                <div className="sticky top-24 z-30 bg-paper/95 backdrop-blur-sm border-b border-ink/5 py-4 -mx-6 px-6 lg:-mx-12 lg:px-12 flex items-center gap-2 overflow-x-auto hide-scrollbar">
                    <div className="flex items-center gap-2 pr-4 border-r border-ink/10 mr-2">
                        <Filter size={14} className="text-ink/40" />
                        <span className="text-[10px] uppercase tracking-widest text-ink/40">Filter</span>
                    </div>
                    {FILTERS.map(filter => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`
                                px-4 py-2 text-[10px] uppercase tracking-widest border transition-all whitespace-nowrap rounded-sm
                                ${activeFilter === filter 
                                    ? 'bg-ink text-paper border-ink' 
                                    : 'bg-white border-ink/10 text-ink/60 hover:border-ink/40 hover:text-ink'}
                            `}
                        >
                            {filter}
                        </button>
                    ))}
                    
                    <div className="flex-1"></div>

                    <div className="hidden md:flex items-center gap-2 pl-4 border-l border-ink/10 ml-2">
                        <button className="flex items-center gap-2 px-3 py-2 text-[10px] uppercase tracking-widest text-ink/60 hover:text-ink">
                            Newest First <ChevronDown size={12} />
                        </button>
                    </div>
                </div>


                {/* 3. MAIN LAYOUT */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* --- LEFT: TIMELINE (8 Cols) --- */}
                    <div className="lg:col-span-8 space-y-12">
                        {HISTORY_ITEMS.map((group, groupIndex) => (
                            <div key={group.id}>
                                <h3 className="text-xs font-mono uppercase tracking-widest text-ink/40 mb-6 sticky top-44 bg-paper/95 py-2 z-20">
                                    {group.month}
                                </h3>
                                <div className="space-y-4 relative border-l border-ink/10 ml-3 pl-8">
                                    {group.items.map((item, i) => (
                                        <motion.div 
                                            key={item.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="bg-white border border-ink/10 p-6 hover:shadow-md transition-all group relative"
                                        >
                                            {/* Timeline Node */}
                                            <div className="absolute -left-[37px] top-8 w-3 h-3 bg-white border border-ink/20 rounded-full group-hover:border-gold group-hover:bg-gold transition-colors z-10"></div>
                                            <div className="absolute -left-[34px] top-[38px] w-8 h-[1px] bg-ink/10 group-hover:bg-gold/50 transition-colors"></div>

                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 rounded-full ${
                                                        item.category === 'Psychology' ? 'bg-purple-50 text-purple-700' :
                                                        item.category === 'Career' ? 'bg-blue-50 text-blue-700' :
                                                        item.category === 'Money' ? 'bg-green-50 text-green-700' :
                                                        'bg-ink/5 text-ink/60'
                                                    }`}>
                                                        <FileText size={16} />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-serif text-lg text-ink group-hover:text-gold transition-colors cursor-pointer" onClick={() => onNavigate('report-detail')}>
                                                            {item.title}
                                                        </h4>
                                                        <div className="flex items-center gap-2 text-[10px] text-ink/40 font-mono mt-1">
                                                            <span>{item.date}</span>
                                                            <span>•</span>
                                                            <span>{item.time}</span>
                                                            <span>•</span>
                                                            <span>By {item.generatedBy}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={`px-3 py-1 text-[9px] uppercase tracking-widest rounded-full border ${
                                                    item.status === 'Ready' ? 'bg-green-50 border-green-200 text-green-700' :
                                                    item.status === 'Needs Update' ? 'bg-orange-50 border-orange-200 text-orange-700' :
                                                    'bg-gray-50 border-gray-200 text-gray-500'
                                                }`}>
                                                    {item.status}
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between pt-4 border-t border-ink/5">
                                                <div className="flex gap-4 text-[10px] uppercase tracking-widest text-ink/50">
                                                    <span className="flex items-center gap-1"><Clock size={12} /> {item.readTime}</span>
                                                    <span className="flex items-center gap-1"><Calendar size={12} /> {item.coverage}</span>
                                                </div>
                                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button onClick={() => onNavigate('report-reader')} className="p-2 hover:bg-ink/5 text-ink/40 hover:text-ink rounded-full transition-colors" title="Read">
                                                        <Eye size={14} />
                                                    </button>
                                                    <button className="p-2 hover:bg-ink/5 text-ink/40 hover:text-ink rounded-full transition-colors" title="Download PDF">
                                                        <Download size={14} />
                                                    </button>
                                                    <button className="p-2 hover:bg-ink/5 text-ink/40 hover:text-red-600 rounded-full transition-colors" title="Delete">
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        
                        <div className="text-center pt-8">
                            <button className="text-xs uppercase tracking-widest text-ink/40 hover:text-ink transition-colors border-b border-transparent hover:border-ink pb-1">
                                Load Older Archives
                            </button>
                        </div>
                    </div>


                    {/* --- RIGHT: INSIGHTS (4 Cols) --- */}
                    <div className="lg:col-span-4 space-y-8 sticky top-24 h-fit">
                        
                        {/* A. Stats Card */}
                        <div className="bg-ink text-paper p-8 shadow-xl relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-6 text-gold">
                                    <BarChart2 size={16} />
                                    <h3 className="text-xs uppercase tracking-[0.2em] font-bold">Library Vitals</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <div className="text-3xl font-display text-white">{STATS.total}</div>
                                        <div className="text-[9px] uppercase tracking-widest text-white/40">Total Generated</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-display text-white">{STATS.thisMonth}</div>
                                        <div className="text-[9px] uppercase tracking-widest text-white/40">This Month</div>
                                    </div>
                                </div>
                                <div className="pt-6 border-t border-white/10">
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-white/60">Top Category</span>
                                        <span className="text-white font-serif">{STATS.topCategory}</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-white/60">Last Active</span>
                                        <span className="text-white font-mono">{STATS.lastGenerated}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
                        </div>

                        {/* B. Most Read */}
                        <div className="bg-white border border-ink/10 p-6">
                            <h3 className="text-xs font-mono uppercase tracking-widest text-ink/40 mb-6 flex items-center gap-2">
                                <Star size={12} /> Most Consulted
                            </h3>
                            <div className="space-y-4">
                                {MOST_READ.map((item, i) => (
                                    <div key={i} className="flex justify-between items-center group cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] font-mono text-ink/30">0{i+1}</span>
                                            <span className="text-xs font-serif font-bold text-ink group-hover:text-gold transition-colors">{item.title}</span>
                                        </div>
                                        <span className="text-[9px] text-ink/40 bg-ink/5 px-2 py-0.5 rounded-full">{item.opens}x</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* C. Highlights Snapshot */}
                        <div className="bg-paper-light border border-ink/10 p-6">
                            <h3 className="text-xs font-mono uppercase tracking-widest text-ink/40 mb-6 flex items-center gap-2">
                                <Bookmark size={12} /> Recent Wisdom
                            </h3>
                            <div className="space-y-6">
                                {RECENT_HIGHLIGHTS.map((item, i) => (
                                    <div key={i} className="relative pl-3 border-l-2 border-gold/30">
                                        <p className="text-xs font-serif italic text-ink/80 mb-2 leading-relaxed">"{item.text}"</p>
                                        <div className="flex items-center justify-between text-[9px] uppercase tracking-widest text-ink/40">
                                            <span>{item.source}</span>
                                            <ArrowRight size={10} className="hover:text-gold cursor-pointer transition-colors" />
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

             </div>
        </div>
    );
};