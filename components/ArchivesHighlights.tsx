import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Search, Filter, Bookmark, 
  MoreHorizontal, Copy, Trash2, Edit2, 
  ExternalLink, Tag, Save, ChevronRight,
  FileText, MessageCircle, Sun, Quote,
  CheckCircle2, Plus
} from 'lucide-react';

interface ArchivesHighlightsProps {
    onNavigate: (view: any) => void;
    onBack: () => void;
}

// --- MOCK DATA ---

const HIGHLIGHTS = [
    {
        id: 'h1',
        text: "Silence is your loudest weapon, but it often wounds the one wielding it. You do not fear the dark; you fear the shallow light that hides the truth.",
        source: 'Emotional Architecture',
        sourceType: 'report',
        chapter: '02. Defense Protocols',
        date: 'Oct 24, 2026',
        tags: ['Psychology', 'Shadow Work'],
        note: "This hits hard. I do withdraw when I feel exposed.",
        context: "When threatened, your instant reflex is withdrawal. This is not passive; it is an active strategic retreat to assess the enemy. However, in intimate partnerships, this silence is often interpreted as punishment."
    },
    {
        id: 'h2',
        text: "Structure is not the enemy of freedom, but its container. Do not fight the wall; build with it.",
        source: 'Daily Guidance: Oct 24',
        sourceType: 'daily',
        date: 'Oct 24, 2026',
        tags: ['Saturn', 'Discipline'],
        note: null,
        context: "The planetary alignment today suggests a tension between your desire for expansion and the necessity of limitation. Saturn rewards patience today."
    },
    {
        id: 'h3',
        text: "The flood is not destruction; it is the rising tide of intuition that you have been suppressing in your waking life.",
        source: 'Chat: The Mystic',
        sourceType: 'chat',
        date: 'Oct 22, 2026',
        tags: ['Dreams', 'Intuition'],
        note: "Connects to the recurring water dream.",
        context: "Your Moon in Scorpio is currently being aspected by Neptune. This dissolves boundaries between the conscious and subconscious."
    },
    {
        id: 'h4',
        text: "Money is simply energy waiting for a clear channel. Scarcity is a blockage in the pipe, not a lack of water.",
        source: 'Financial Blockages',
        sourceType: 'report',
        chapter: '01. The Root',
        date: 'Sep 22, 2026',
        tags: ['Wealth', 'Mindset'],
        note: "Need to audit my recurring expenses again.",
        context: "Uncovering the psychological roots of scarcity mindset in your chart reveals a deep-seated belief that resources must be hoarded to be safe."
    },
    {
        id: 'h5',
        text: "You require a partner who is grounded enough to hold your intensity, but open enough to travel with you into the depths.",
        source: 'Corridor Blueprint',
        sourceType: 'report',
        chapter: 'Ideal Resonance',
        date: 'Aug 15, 2026',
        tags: ['Love', 'Relationships'],
        note: null,
        context: "Your 7th House ruler suggests a need for stability, but your Venus demands transformation. This paradox is your core relationship challenge."
    }
];

const FILTERS = ['All', 'Reports', 'Daily', 'Chat'];
const TAGS = ['Psychology', 'Career', 'Love', 'Shadow Work', 'Saturn', 'Dreams', 'Wealth'];

export const ArchivesHighlights: React.FC<ArchivesHighlightsProps> = ({ onNavigate, onBack }) => {
    const [selectedHighlight, setSelectedHighlight] = useState<typeof HIGHLIGHTS[0] | null>(null);
    const [activeFilter, setActiveFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [userNote, setUserNote] = useState('');

    // Handle selection
    const handleSelect = (highlight: typeof HIGHLIGHTS[0]) => {
        setSelectedHighlight(highlight);
        setUserNote(highlight.note || '');
    };

    const filteredHighlights = HIGHLIGHTS.filter(h => 
        (activeFilter === 'All' || 
         (activeFilter === 'Reports' && h.sourceType === 'report') ||
         (activeFilter === 'Daily' && h.sourceType === 'daily') ||
         (activeFilter === 'Chat' && h.sourceType === 'chat')) &&
        (h.text.toLowerCase().includes(searchQuery.toLowerCase()) || h.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())))
    );

    const getIcon = (type: string) => {
        switch(type) {
            case 'report': return <FileText size={14} />;
            case 'chat': return <MessageCircle size={14} />;
            case 'daily': return <Sun size={14} />;
            default: return <Bookmark size={14} />;
        }
    };

    return (
        <div className="min-h-screen bg-paper pt-32 pb-20 relative overflow-hidden">
             {/* Background Grid */}
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none grid-bg" />

             <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10 space-y-12">
                
                {/* 1. HEADER */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end border-b border-ink/5 pb-8 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-ink/40">
                            <button onClick={onBack} className="hover:text-ink transition-colors">Archives</button>
                            <ChevronRight size={10} />
                            <span className="text-ink font-bold">Highlights</span>
                        </div>
                        
                        <div>
                            <h1 className="text-4xl lg:text-5xl font-display text-ink mb-2">Saved Wisdom</h1>
                            <p className="text-lg text-ink/60 font-serif max-w-xl">
                                A curated collection of resonance. Excerpts, quotes, and insights from your journey.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
                        <div className="relative group min-w-[280px]">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/20 group-focus-within:text-gold transition-colors" size={16} />
                            <input 
                                type="text" 
                                placeholder="Search highlights..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white border border-ink/10 py-3 pl-12 pr-4 text-sm font-serif placeholder:font-sans placeholder:text-ink/20 focus:outline-none focus:border-gold transition-colors"
                            />
                        </div>
                        <button className="px-6 py-3 border border-ink/10 bg-white text-xs uppercase tracking-widest hover:border-ink transition-colors shadow-sm flex items-center justify-center gap-2">
                            Export All
                        </button>
                    </div>
                </div>

                {/* 2. FILTERS */}
                <div className="sticky top-24 z-30 bg-paper/95 backdrop-blur-sm border-b border-ink/5 py-4 -mx-6 px-6 lg:-mx-12 lg:px-12 flex items-center gap-4 overflow-x-auto hide-scrollbar">
                    <div className="flex items-center gap-2 pr-4 border-r border-ink/10 mr-2">
                        <Filter size={14} className="text-ink/40" />
                        <span className="text-[10px] uppercase tracking-widest text-ink/40">Source</span>
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
                    
                    <div className="w-px h-6 bg-ink/10 mx-2"></div>
                    
                    <div className="flex items-center gap-2">
                        {TAGS.slice(0, 4).map(tag => (
                            <button key={tag} className="px-3 py-1.5 border border-ink/5 bg-ink/5 text-[9px] uppercase tracking-widest text-ink/50 hover:bg-ink hover:text-paper hover:border-ink transition-colors rounded-sm">
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>


                {/* 3. MAIN LAYOUT */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* --- LEFT: HIGHLIGHTS FEED (7 Cols) --- */}
                    <div className="lg:col-span-7 space-y-6">
                        {filteredHighlights.map((highlight, i) => (
                            <motion.div 
                                key={highlight.id}
                                layoutId={highlight.id}
                                onClick={() => handleSelect(highlight)}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className={`
                                    group relative p-8 border cursor-pointer transition-all duration-300
                                    ${selectedHighlight?.id === highlight.id 
                                        ? 'bg-white border-l-4 border-l-gold border-y-ink/10 border-r-ink/10 shadow-lg translate-x-2' 
                                        : 'bg-white border border-ink/10 hover:border-ink/30 hover:shadow-md'}
                                `}
                            >
                                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-ink/40 mb-4">
                                    {getIcon(highlight.sourceType)}
                                    <span>{highlight.source}</span>
                                    {highlight.chapter && <span className="opacity-50">• {highlight.chapter}</span>}
                                </div>

                                <blockquote className="font-serif text-lg leading-relaxed text-ink/90 mb-6 border-l-2 border-transparent pl-0 group-hover:pl-4 group-hover:border-ink/10 transition-all">
                                    "{highlight.text}"
                                </blockquote>

                                <div className="flex items-center justify-between border-t border-ink/5 pt-4">
                                    <div className="flex items-center gap-2">
                                        {highlight.tags.map(tag => (
                                            <span key={tag} className="px-2 py-1 bg-ink/5 text-[9px] uppercase tracking-widest text-ink/50 rounded-sm">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 hover:bg-ink/5 rounded-full text-ink/40 hover:text-ink"><Copy size={14} /></button>
                                        <button className="p-2 hover:bg-ink/5 rounded-full text-ink/40 hover:text-red-600"><Trash2 size={14} /></button>
                                    </div>
                                </div>
                                
                                {highlight.note && (
                                    <div className="absolute top-6 right-6">
                                        <div className="w-2 h-2 bg-gold rounded-full"></div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>


                    {/* --- RIGHT: DETAIL PANEL (5 Cols) --- */}
                    <div className="hidden lg:block lg:col-span-5 relative">
                        <div className="sticky top-40">
                            <AnimatePresence mode="wait">
                                {selectedHighlight ? (
                                    <motion.div 
                                        key={selectedHighlight.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="bg-paper-light border border-ink/10 shadow-xl"
                                    >
                                        {/* Highlight Detail Header */}
                                        <div className="p-8 border-b border-ink/5 bg-white relative overflow-hidden">
                                            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                                                <Quote size={80} />
                                            </div>
                                            
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="w-8 h-8 rounded-full bg-ink/5 flex items-center justify-center text-ink/60">
                                                    {getIcon(selectedHighlight.sourceType)}
                                                </div>
                                                <div>
                                                    <div className="text-xs font-bold text-ink uppercase tracking-wider">{selectedHighlight.source}</div>
                                                    <div className="text-[10px] text-ink/40 font-mono">{selectedHighlight.date}</div>
                                                </div>
                                            </div>

                                            <div className="font-serif text-xl leading-relaxed text-ink italic mb-6">
                                                "{selectedHighlight.text}"
                                            </div>

                                            <button className="text-[10px] uppercase tracking-widest text-ink/40 hover:text-ink hover:underline flex items-center gap-1">
                                                Go to Source <ExternalLink size={10} />
                                            </button>
                                        </div>

                                        {/* Context */}
                                        <div className="p-8 border-b border-ink/5">
                                            <h3 className="text-[10px] uppercase tracking-widest text-ink/40 mb-3 font-bold">Context Preview</h3>
                                            <div className="text-xs text-ink/60 leading-relaxed font-serif bg-white p-4 border border-ink/5 italic">
                                                ...{selectedHighlight.context}...
                                            </div>
                                        </div>

                                        {/* Annotation */}
                                        <div className="p-8">
                                            <div className="flex justify-between items-center mb-3">
                                                <h3 className="text-[10px] uppercase tracking-widest text-ink/40 font-bold flex items-center gap-2">
                                                    <Edit2 size={10} /> Annotation
                                                </h3>
                                                {userNote !== selectedHighlight.note && (
                                                    <span className="text-[9px] text-gold uppercase tracking-widest animate-pulse">Unsaved</span>
                                                )}
                                            </div>
                                            <textarea 
                                                className="w-full bg-white border border-ink/10 p-4 text-sm font-serif text-ink focus:outline-none focus:border-gold transition-colors min-h-[120px] resize-none mb-4"
                                                placeholder="Add your thoughts here..."
                                                value={userNote}
                                                onChange={(e) => setUserNote(e.target.value)}
                                            />
                                            
                                            <div className="flex justify-between items-center">
                                                <div className="flex gap-2">
                                                    <button className="p-2 border border-ink/10 bg-white hover:border-gold hover:text-gold transition-colors text-ink/40" title="Link to Room">
                                                        <Tag size={14} />
                                                    </button>
                                                    <button className="p-2 border border-ink/10 bg-white hover:border-gold hover:text-gold transition-colors text-ink/40" title="Add to Path">
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                                <button className="flex items-center gap-2 px-6 py-2 bg-ink text-paper text-[10px] uppercase tracking-widest hover:bg-gold transition-colors">
                                                    <Save size={12} /> Save Note
                                                </button>
                                            </div>
                                        </div>

                                    </motion.div>
                                ) : (
                                    <div className="h-[400px] flex flex-col items-center justify-center text-ink/30 border border-dashed border-ink/10 rounded-sm">
                                        <Bookmark size={32} strokeWidth={1} className="mb-4 opacity-50" />
                                        <span className="text-xs uppercase tracking-widest">Select a highlight to review</span>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                </div>

             </div>
        </div>
    );
};