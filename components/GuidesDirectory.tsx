import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, MessageSquare, ArrowRight, Sparkles, 
  Brain, Heart, Briefcase, Users, Eye, 
  ChevronRight, Clock, Plus, Zap, Filter
} from 'lucide-react';

interface GuidesDirectoryProps {
    onNavigate: (view: any, data?: any) => void;
}

// --- MOCK DATA ---

const CATEGORIES = ['All', 'Self', 'Love', 'Work', 'Social', 'Psychology'];

const GUIDES = [
    {
        id: 'mystic',
        name: 'The Mystic',
        domain: 'Self & Psychology',
        promise: 'Reveals the hidden architecture of your subconscious.',
        bestFor: ['Shadow Work', 'Spiritual Crisis', 'Dream Analysis'],
        icon: Eye,
        color: 'text-purple-600',
        bg: 'bg-purple-50'
    },
    {
        id: 'strategist',
        name: 'The Strategist',
        domain: 'Work & Ambition',
        promise: 'Architects the most efficient path to your legacy.',
        bestFor: ['Career Pivots', 'Negotiation', '5-Year Planning'],
        icon: Briefcase,
        color: 'text-blue-600',
        bg: 'bg-blue-50'
    },
    {
        id: 'lover',
        name: 'The Lover',
        domain: 'Love & Union',
        promise: 'Translates the language of desire and attachment.',
        bestFor: ['Relationship Dynamics', 'Breakups', 'Attraction'],
        icon: Heart,
        color: 'text-red-600',
        bg: 'bg-red-50'
    },
    {
        id: 'socialite',
        name: 'The Socialite',
        domain: 'Social & Network',
        promise: 'Navigates the web of human connection and status.',
        bestFor: ['Networking', 'Social Anxiety', 'Public Image'],
        icon: Users,
        color: 'text-orange-600',
        bg: 'bg-orange-50'
    },
    {
        id: 'mirror',
        name: 'The Mirror',
        domain: 'Radical Honesty',
        promise: 'Reflects exactly what you are refusing to see.',
        bestFor: ['Reality Checks', 'Blockage Removal', 'Hard Truths'],
        icon: Zap,
        color: 'text-ink',
        bg: 'bg-ink/5'
    }
];

const SESSIONS = [
    { guide: 'The Strategist', topic: 'Career Pivot to Tech', time: '2 hours ago' },
    { guide: 'The Mystic', topic: 'Recurring Dream Analysis', time: 'Yesterday' },
    { guide: 'The Lover', topic: 'Venus Retrograde Impact', time: 'Oct 20' },
    { guide: 'The Mirror', topic: 'Why do I feel stuck?', time: 'Oct 15' },
    { guide: 'The Strategist', topic: 'Q4 Financial Planning', time: 'Oct 12' }
];

const PROMPTS = [
    "Why do I feel stuck right now?",
    "Should I change my career direction?",
    "Is this relationship serving my highest good?",
    "What is the lesson of this current transit?",
    "How do I stop self-sabotaging?",
    "What should I focus on this month?",
    "Why do I attract the same patterns?",
    "Interpret my Saturn Return."
];

export const GuidesDirectory: React.FC<GuidesDirectoryProps> = ({ onNavigate }) => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredGuides = GUIDES.filter(guide => 
        (activeCategory === 'All' || guide.domain.includes(activeCategory)) &&
        (guide.name.toLowerCase().includes(searchQuery.toLowerCase()) || guide.promise.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-paper pt-32 pb-20 relative overflow-hidden">
             {/* Background Grid */}
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none grid-bg" />

             <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 space-y-16">
                
                {/* 1. HEADER */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-ink/5 pb-8 gap-8"
                >
                    <div className="max-w-xl">
                        <div className="flex items-center gap-3 mb-2 text-ink/40">
                            <Sparkles size={14} />
                            <span className="text-[10px] uppercase tracking-[0.3em]">The Council</span>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-display text-ink mb-4">The Guides</h1>
                        <p className="text-lg text-ink/60 font-light font-serif">
                             Specialized personas calibrated to specific sectors of your psyche. Choose a guide, ask a question, leave with a plan.
                        </p>
                    </div>

                    <div className="w-full md:w-auto flex flex-col gap-4">
                        <div className="flex gap-4">
                            <div className="relative group flex-1 md:w-64">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/20 group-focus-within:text-gold transition-colors" size={16} />
                                <input 
                                    type="text" 
                                    placeholder="Search council..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-white border border-ink/10 py-3 pl-12 pr-4 text-sm font-serif placeholder:font-sans placeholder:text-ink/20 focus:outline-none focus:border-gold transition-colors"
                                />
                            </div>
                            <button 
                                onClick={() => onNavigate('guides-chat')}
                                className="flex items-center gap-2 px-6 py-3 bg-ink text-paper text-xs uppercase tracking-widest hover:bg-gold hover:text-white transition-all shadow-md"
                            >
                                <Plus size={14} />
                                <span className="hidden sm:inline">New Session</span>
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* 2. MAIN LAYOUT GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* --- LEFT COLUMN (Guides Grid) --- */}
                    <div className="lg:col-span-8 space-y-12">
                        
                        {/* Filters */}
                        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-2">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`
                                        px-4 py-2 text-[10px] uppercase tracking-widest border transition-all whitespace-nowrap
                                        ${activeCategory === cat 
                                            ? 'bg-ink text-paper border-ink' 
                                            : 'bg-white border-ink/10 text-ink/60 hover:border-ink/40 hover:text-ink'}
                                    `}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Guide Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredGuides.map((guide, i) => (
                                <motion.div 
                                    key={guide.id}
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white border border-ink/10 p-6 flex flex-col justify-between hover:border-ink/30 hover:shadow-lg transition-all group relative overflow-hidden min-h-[320px]"
                                >
                                    {/* Top Section */}
                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className={`p-3 rounded-full ${guide.bg} ${guide.color}`}>
                                                <guide.icon size={24} strokeWidth={1} />
                                            </div>
                                            <span className="px-2 py-1 bg-ink/5 text-[9px] uppercase tracking-widest text-ink/40">
                                                {guide.domain.split('&')[0]}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl font-serif text-ink mb-2 group-hover:text-gold transition-colors">{guide.name}</h3>
                                        <p className="text-sm text-ink/60 font-light leading-relaxed mb-6 italic border-l-2 border-ink/5 pl-3">
                                            "{guide.promise}"
                                        </p>

                                        <div className="space-y-2">
                                            <span className="text-[9px] uppercase tracking-widest text-ink/30 block mb-1">Specialties</span>
                                            {guide.bestFor.map((item, idx) => (
                                                <div key={idx} className="flex items-center gap-2 text-xs text-ink/70">
                                                    <div className="w-1 h-1 bg-ink/20 rounded-full"></div>
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Bottom Action */}
                                    <div className="mt-8 pt-6 border-t border-ink/5 relative z-10 flex items-center justify-between">
                                        <button 
                                            onClick={() => onNavigate('guide-detail', { guideId: guide.id })}
                                            className="text-[10px] uppercase tracking-widest text-ink/40 hover:text-ink transition-colors"
                                        >
                                            View Profile
                                        </button>
                                        <button 
                                            onClick={() => onNavigate('guides-chat', { guideId: guide.id })}
                                            className="flex items-center gap-2 px-4 py-2 bg-ink text-paper text-[10px] uppercase tracking-widest hover:bg-gold hover:text-white transition-all"
                                        >
                                            Speak <ArrowRight size={12} />
                                        </button>
                                    </div>

                                    {/* Abstract Hover Bg */}
                                    <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-ink/[0.02] rounded-full group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
                                </motion.div>
                            ))}
                        </div>

                    </div>


                    {/* --- RIGHT COLUMN (Sidebar) --- */}
                    <div className="lg:col-span-4 space-y-8">
                        
                        {/* 5. QUICK ROOM ENTRY */}
                        <div className="bg-ink text-paper p-8 relative overflow-hidden shadow-xl">
                            <div className="relative z-10">
                                <h3 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-6">Quick Entry by Room</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { label: 'Self', icon: Brain },
                                        { label: 'Love', icon: Heart },
                                        { label: 'Work', icon: Briefcase },
                                        { label: 'Social', icon: Users }
                                    ].map((room) => (
                                        <button 
                                            key={room.label} 
                                            onClick={() => onNavigate('guides-chat')}
                                            className="flex flex-col items-center justify-center gap-2 p-4 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all group"
                                        >
                                            <room.icon size={18} className="text-white/60 group-hover:text-gold transition-colors" />
                                            <span className="text-[10px] uppercase tracking-widest">{room.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {/* Texture */}
                            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
                        </div>

                        {/* 6. RECENT SESSIONS */}
                        <div className="bg-white border border-ink/10 p-6">
                             <h3 className="text-xs font-mono uppercase tracking-widest text-ink/40 mb-6 flex items-center gap-2">
                                <Clock size={12} /> Recent Dialogues
                            </h3>
                            <div className="space-y-4">
                                {SESSIONS.map((session, i) => (
                                    <div 
                                        key={i} 
                                        onClick={() => onNavigate('guides-chat')}
                                        className="group cursor-pointer border-b border-ink/5 pb-3 last:border-0 last:pb-0"
                                    >
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="text-xs font-serif font-bold group-hover:text-gold transition-colors">{session.guide}</span>
                                            <span className="text-[9px] font-mono text-ink/30">{session.time}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-ink/60 italic truncate max-w-[200px]">{session.topic}</span>
                                            <ChevronRight size={12} className="text-ink/20 group-hover:text-ink transition-colors opacity-0 group-hover:opacity-100" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-4 text-[10px] uppercase tracking-widest text-ink/40 hover:text-ink pt-2">
                                View Full History
                            </button>
                        </div>

                        {/* 7. STARTER PROMPTS */}
                        <div className="bg-paper-light border border-ink/10 p-6">
                            <h3 className="text-xs font-mono uppercase tracking-widest text-ink/40 mb-6 flex items-center gap-2">
                                <MessageSquare size={12} /> Where to begin?
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {PROMPTS.map((prompt, i) => (
                                    <button 
                                        key={i}
                                        onClick={() => onNavigate('guides-chat')}
                                        className="text-left px-3 py-2 bg-white border border-ink/5 text-xs text-ink/70 hover:border-gold hover:text-ink transition-all rounded-sm leading-relaxed"
                                    >
                                        {prompt}
                                    </button>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

             </div>
        </div>
    );
};