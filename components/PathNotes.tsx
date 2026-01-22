import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Plus, Filter, Calendar, ChevronDown, 
  MoreHorizontal, Edit2, Trash2, Pin, CheckCircle2, 
  Circle, ArrowUpRight, MessageSquare, FileText, Sun,
  Sparkles, Brain, Heart, Briefcase, Lock, X
} from 'lucide-react';

interface PathNotesProps {
    onNavigate: (view: any) => void;
}

// --- MOCK DATA ---

const CATEGORIES = ['All', 'Self', 'Love', 'Work', 'Social', 'Psychology'];

const NOTES = [
    {
        id: 'n1',
        timeGroup: 'Today',
        date: 'Oct 24 • 10:30 AM',
        title: 'The Fear of Success',
        category: 'Work',
        source: 'Chat: The Strategist',
        sourceType: 'chat',
        excerpt: "Success feels dangerous because it implies visibility. To be seen is to be judged. The Strategist noted that my Mars placement indicates a warrior archetype that is currently sleeping.",
        commitment: "Write the proposal outline without editing.",
        status: 'pending'
    },
    {
        id: 'n2',
        timeGroup: 'Today',
        date: 'Oct 24 • 08:15 AM',
        title: 'Saturn Transit Impact',
        category: 'Self',
        source: 'Daily Guidance',
        sourceType: 'daily',
        excerpt: "Structure is not the enemy. Today's heavy feeling is just gravity testing the foundation.",
        status: 'completed'
    },
    {
        id: 'n3',
        timeGroup: 'This Week',
        date: 'Oct 22',
        title: 'Emotional Defense Mechanisms',
        category: 'Psychology',
        source: 'Report: Emotional Architecture',
        sourceType: 'report',
        excerpt: "My Moon in Scorpio creates a 'pre-emptive strike' dynamic in relationships. I withdraw before I can be rejected.",
        commitment: "Pause for 5 minutes before reacting to texts.",
        status: 'pending'
    },
    {
        id: 'n4',
        timeGroup: 'This Week',
        date: 'Oct 20',
        title: 'Dream Journal: The Flood',
        category: 'Self',
        source: 'Manual Entry',
        sourceType: 'manual',
        excerpt: "Water was everywhere but I wasn't drowning. I was breathing underwater. The Mystic suggests this is emotional adaptation.",
        status: 'neutral'
    },
    {
        id: 'n5',
        timeGroup: 'October',
        date: 'Oct 12',
        title: 'Q4 Financial Strategy',
        category: 'Work',
        source: 'Chat: The Strategist',
        sourceType: 'chat',
        excerpt: "Consolidate resources. Do not expand until Jupiter enters the 2nd house.",
        commitment: "Cancel unused subscriptions.",
        status: 'completed'
    }
];

const COMMITMENTS = [
    { id: 1, text: "Write proposal outline", due: "Today", status: 'pending' },
    { id: 2, text: "Pause before reacting", due: "Ongoing", status: 'pending' },
    { id: 3, text: "Cancel subscriptions", due: "Done", status: 'completed' },
];

const THEMES = ['Visibility', 'Structure', 'Emotional Safety'];

export const PathNotes: React.FC<PathNotesProps> = ({ onNavigate }) => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedNote, setSelectedNote] = useState<any>(null);

    const getIconForSource = (type: string) => {
        switch(type) {
            case 'chat': return <MessageSquare size={12} />;
            case 'report': return <FileText size={12} />;
            case 'daily': return <Sun size={12} />;
            default: return <Edit2 size={12} />;
        }
    };

    const filteredNotes = NOTES.filter(note => 
        (activeCategory === 'All' || note.category === activeCategory) &&
        (note.title.toLowerCase().includes(searchQuery.toLowerCase()) || note.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    // Grouping for render
    const groups = ['Today', 'This Week', 'October'];

    return (
        <div className="min-h-screen bg-paper pt-32 pb-20 relative overflow-hidden">
             {/* Background Grid */}
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none grid-bg" />

             <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10 space-y-10">
                
                {/* 1. HEADER */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col lg:flex-row justify-between items-start lg:items-end border-b border-ink/5 pb-8 gap-8"
                >
                    <div>
                        <div className="flex items-center gap-3 mb-2 text-ink/40">
                            <Sparkles size={14} />
                            <span className="text-[10px] uppercase tracking-[0.3em]">The Journal</span>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-display text-ink mb-2">Path Notes</h1>
                        <p className="text-ink/60 font-serif font-light">
                             The architecture of your evolution. Saved insights, commitments, and turning points.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                        <div className="relative group min-w-[240px]">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/20 group-focus-within:text-gold transition-colors" size={16} />
                            <input 
                                type="text" 
                                placeholder="Search timeline..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white border border-ink/10 py-3 pl-12 pr-4 text-sm font-serif placeholder:font-sans placeholder:text-ink/20 focus:outline-none focus:border-gold transition-colors shadow-sm"
                            />
                        </div>
                        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-ink text-paper text-xs uppercase tracking-widest hover:bg-gold hover:text-white transition-all shadow-md">
                            <Plus size={14} />
                            <span>Create Note</span>
                        </button>
                    </div>
                </motion.div>

                {/* 2. CONTROLS */}
                <div className="sticky top-24 z-20 bg-paper/95 backdrop-blur-md py-4 border-b border-ink/5 flex items-center gap-4 overflow-x-auto hide-scrollbar -mx-6 px-6 lg:-mx-12 lg:px-12">
                     <div className="flex items-center gap-2 pr-4 border-r border-ink/10">
                        <Filter size={14} className="text-ink/40" />
                        <span className="text-[10px] uppercase tracking-widest text-ink/40">Filter</span>
                     </div>
                     
                     {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`
                                px-3 py-1.5 text-[10px] uppercase tracking-widest border transition-all whitespace-nowrap rounded-sm
                                ${activeCategory === cat 
                                    ? 'bg-ink text-paper border-ink' 
                                    : 'bg-white border-ink/10 text-ink/60 hover:border-ink/40 hover:text-ink'}
                            `}
                        >
                            {cat}
                        </button>
                     ))}

                     <div className="flex-1"></div>

                     <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-ink/40 hover:text-ink transition-colors whitespace-nowrap">
                         <Calendar size={14} /> Date Range <ChevronDown size={12} />
                     </button>
                </div>

                {/* 3. MAIN LAYOUT */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* --- LEFT COLUMN (Timeline) --- */}
                    <div className="lg:col-span-8">
                        <div className="space-y-12">
                            {groups.map((group) => {
                                const groupNotes = filteredNotes.filter(n => n.timeGroup === group);
                                if (groupNotes.length === 0) return null;

                                return (
                                    <div key={group} className="relative">
                                        {/* Timeline Line */}
                                        <div className="absolute left-[19px] top-8 bottom-0 w-[1px] bg-ink/5"></div>

                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="w-10 h-10 rounded-full border border-ink/10 bg-paper flex items-center justify-center z-10">
                                                <div className="w-2 h-2 bg-ink/20 rounded-full"></div>
                                            </div>
                                            <h3 className="text-sm font-mono uppercase tracking-widest text-ink/40">{group}</h3>
                                        </div>

                                        <div className="space-y-6 pl-20 relative">
                                            {groupNotes.map((note, i) => (
                                                <motion.div 
                                                    key={note.id}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.1 }}
                                                    onClick={() => setSelectedNote(note)}
                                                    className="group relative bg-white border border-ink/10 p-6 hover:shadow-lg hover:border-ink/30 transition-all cursor-pointer"
                                                >
                                                    {/* Connector Dot */}
                                                    <div className="absolute -left-[65px] top-8 w-3 h-3 bg-white border border-ink/20 rounded-full group-hover:border-gold group-hover:bg-gold transition-colors z-10"></div>
                                                    <div className="absolute -left-[62px] top-[38px] w-12 h-[1px] bg-ink/10 group-hover:bg-gold/50 transition-colors"></div>

                                                    <div className="flex justify-between items-start mb-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`
                                                                flex items-center gap-2 px-2 py-1 rounded-sm text-[9px] uppercase tracking-widest border
                                                                ${note.sourceType === 'chat' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                                                                  note.sourceType === 'report' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                                                  note.sourceType === 'daily' ? 'bg-orange-50 text-orange-700 border-orange-100' :
                                                                  'bg-gray-50 text-gray-700 border-gray-100'}
                                                            `}>
                                                                {getIconForSource(note.sourceType)}
                                                                {note.source}
                                                            </div>
                                                            <span className="text-[10px] text-ink/30 font-mono">{note.date}</span>
                                                        </div>
                                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                                            <button className="p-1.5 hover:bg-ink/5 rounded-full text-ink/40 hover:text-ink"><Pin size={14} /></button>
                                                            <button className="p-1.5 hover:bg-ink/5 rounded-full text-ink/40 hover:text-ink"><MoreHorizontal size={14} /></button>
                                                        </div>
                                                    </div>

                                                    <div className="mb-4">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <h4 className="text-xl font-serif text-ink group-hover:text-gold transition-colors">{note.title}</h4>
                                                            <span className="text-[9px] uppercase tracking-widest text-ink/30 border border-ink/10 px-2 py-0.5 rounded-full">{note.category}</span>
                                                        </div>
                                                        <p className="text-sm font-serif text-ink/70 leading-relaxed line-clamp-2">
                                                            {note.excerpt}
                                                        </p>
                                                    </div>

                                                    {note.commitment && (
                                                        <div className="mt-4 pt-4 border-t border-ink/5 flex items-center gap-3">
                                                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${note.status === 'completed' ? 'bg-green-500 border-green-500' : 'border-ink/20'}`}>
                                                                {note.status === 'completed' && <CheckCircle2 size={10} className="text-white" />}
                                                            </div>
                                                            <span className={`text-xs font-medium ${note.status === 'completed' ? 'text-ink/40 line-through' : 'text-ink'}`}>
                                                                Commitment: {note.commitment}
                                                            </span>
                                                        </div>
                                                    )}
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* --- RIGHT COLUMN (Synthesis Engine) --- */}
                    <div className="hidden lg:block lg:col-span-4 space-y-8 sticky top-32">
                        
                        {/* A. INSIGHTS SUMMARY */}
                        <div className="bg-ink text-paper p-8 shadow-xl relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-6 text-gold">
                                    <Brain size={16} />
                                    <span className="text-[10px] uppercase tracking-widest">Synthesis Engine</span>
                                </div>
                                
                                <div className="space-y-6">
                                    <div>
                                        <div className="text-3xl font-display text-white mb-1">Work & Purpose</div>
                                        <div className="text-[10px] uppercase tracking-wider text-white/40">Dominant Theme (This Week)</div>
                                    </div>
                                    
                                    <div className="flex flex-wrap gap-2">
                                        {THEMES.map(theme => (
                                            <span key={theme} className="px-3 py-1 bg-white/10 border border-white/10 rounded-full text-[10px] uppercase tracking-widest text-white/80">
                                                {theme}
                                            </span>
                                        ))}
                                    </div>
                                    
                                    <p className="text-xs text-white/60 leading-relaxed border-l-2 border-gold/50 pl-3">
                                        "You are consistently flagging anxiety around visibility in your career sector. This correlates with the current Saturn transit."
                                    </p>
                                </div>

                                <button className="w-full mt-8 py-3 bg-gold text-ink font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors border border-gold">
                                    Generate Weekly Report
                                </button>
                            </div>
                            {/* Abstract BG */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
                        </div>

                        {/* B. COMMITMENTS TRACKER */}
                        <div className="bg-white border border-ink/10 p-6">
                             <h3 className="text-xs font-mono uppercase tracking-widest text-ink/40 mb-6 flex items-center gap-2">
                                <CheckCircle2 size={12} /> Active Commitments
                            </h3>
                            <div className="space-y-4">
                                {COMMITMENTS.map(c => (
                                    <div key={c.id} className="flex items-start gap-3 group cursor-pointer">
                                        <div className={`mt-0.5 w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${c.status === 'completed' ? 'bg-ink border-ink' : 'border-ink/20 group-hover:border-gold'}`}>
                                            {c.status === 'completed' && <CheckCircle2 size={10} className="text-paper" />}
                                        </div>
                                        <div className="flex-1">
                                            <div className={`text-sm ${c.status === 'completed' ? 'text-ink/30 line-through' : 'text-ink'}`}>{c.text}</div>
                                            {c.status !== 'completed' && <div className="text-[9px] uppercase tracking-widest text-red-400 mt-1">Due {c.due}</div>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* C. SUGGESTIONS */}
                        <div className="bg-paper-light border border-ink/10 p-6">
                             <h3 className="text-xs font-mono uppercase tracking-widest text-ink/40 mb-6 flex items-center gap-2">
                                <Sparkles size={12} /> Suggested Next Steps
                            </h3>
                            <div className="space-y-3">
                                <button className="w-full p-3 bg-white border border-ink/5 hover:border-ink/20 text-left transition-colors flex items-center gap-3">
                                    <div className="w-8 h-8 bg-purple-50 text-purple-600 flex items-center justify-center rounded-full">
                                        <MessageSquare size={14} />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-ink">Speak to The Strategist</div>
                                        <div className="text-[9px] uppercase text-ink/40">Topic: Career Visibility</div>
                                    </div>
                                </button>
                                <button className="w-full p-3 bg-white border border-ink/5 hover:border-ink/20 text-left transition-colors flex items-center gap-3">
                                    <div className="w-8 h-8 bg-blue-50 text-blue-600 flex items-center justify-center rounded-full">
                                        <FileText size={14} />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-ink">Open 'Saturn Return'</div>
                                        <div className="text-[9px] uppercase text-ink/40">Report: Chapter 04</div>
                                    </div>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

             </div>

             {/* NOTE DETAIL MODAL */}
             <AnimatePresence>
                {selectedNote && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedNote(null)}
                            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
                        />
                        <motion.div 
                            layoutId={selectedNote.id}
                            className="relative w-full max-w-2xl bg-paper shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            <div className="p-8 border-b border-ink/5 bg-white flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className={`px-2 py-1 text-[9px] uppercase tracking-widest rounded-sm bg-ink/5 text-ink/60`}>
                                            {selectedNote.category}
                                        </span>
                                        <span className="text-[10px] font-mono text-ink/30">{selectedNote.date}</span>
                                    </div>
                                    <h2 className="text-3xl font-serif text-ink">{selectedNote.title}</h2>
                                </div>
                                <button 
                                    onClick={() => setSelectedNote(null)}
                                    className="p-2 hover:bg-ink/5 rounded-full transition-colors"
                                >
                                    <X size={20} className="text-ink/40" />
                                </button>
                            </div>

                            <div className="p-8 overflow-y-auto bg-[#FDFBF7]">
                                <div className="mb-8">
                                    <span className="text-[10px] uppercase tracking-widest text-ink/40 mb-2 block">Original Insight</span>
                                    <div className="font-serif text-lg text-ink/80 leading-relaxed italic border-l-2 border-gold pl-6 py-2">
                                        "{selectedNote.excerpt}"
                                    </div>
                                </div>

                                <div className="mb-8 p-4 bg-white border border-ink/10 rounded-sm flex items-center gap-4">
                                    <div className="w-10 h-10 bg-ink/5 rounded-full flex items-center justify-center">
                                        {getIconForSource(selectedNote.sourceType)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-[10px] uppercase tracking-widest text-ink/40">Source Context</div>
                                        <div className="text-sm font-medium">{selectedNote.source}</div>
                                    </div>
                                    <button className="text-xs uppercase tracking-widest text-ink/40 hover:text-gold flex items-center gap-1">
                                        View Source <ArrowUpRight size={12} />
                                    </button>
                                </div>

                                <div>
                                    <span className="text-[10px] uppercase tracking-widest text-ink/40 mb-2 block">Your Reflection</span>
                                    <textarea 
                                        className="w-full bg-white border border-ink/10 p-4 text-sm font-serif min-h-[150px] focus:outline-none focus:border-gold transition-colors"
                                        placeholder="Add your thoughts on this insight..."
                                    />
                                </div>
                            </div>

                            <div className="p-6 border-t border-ink/5 bg-white flex justify-between items-center">
                                <button className="text-xs uppercase tracking-widest text-red-400 hover:text-red-600 flex items-center gap-2">
                                    <Trash2 size={14} /> Delete
                                </button>
                                <button className="px-8 py-3 bg-ink text-paper text-xs uppercase tracking-widest hover:bg-gold hover:text-white transition-colors">
                                    Save Changes
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
             </AnimatePresence>

        </div>
    );
};