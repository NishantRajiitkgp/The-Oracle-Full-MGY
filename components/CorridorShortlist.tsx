import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Search, Filter, SlidersHorizontal, 
  ChevronDown, Heart, X, MapPin, Star, Shield, 
  Zap, MessageCircle, FileText, ArrowRight, 
  Trash2, Brain, Activity, Sparkles, User, Lock
} from 'lucide-react';

interface CorridorShortlistProps {
    onNavigate: (view: any) => void;
    onBack: () => void;
}

// --- MOCK DATA ---

const SAVED_MATCHES = [
    {
        id: 1,
        name: 'Elena R.',
        age: 28,
        city: 'London',
        distance: '4 km',
        score: 98,
        intent: 'Soul Union',
        scores: { safety: 85, attraction: 99, growth: 92 },
        savedDate: 'Oct 24',
        imageGradient: "from-purple-200 to-indigo-100",
        insight: "Her Pluto sits exactly on your Ascendant. Transformation event."
    },
    {
        id: 4,
        name: 'Julian B.',
        age: 33,
        city: 'Tokyo',
        distance: 'Remote',
        score: 94,
        intent: 'Legacy',
        scores: { safety: 88, attraction: 92, growth: 96 },
        savedDate: 'Oct 22',
        imageGradient: "from-yellow-100 to-amber-200",
        insight: "Sun conjunct Sun. Creative explosion partnership."
    },
    {
        id: 6,
        name: 'Sasha V.',
        age: 27,
        city: 'Berlin',
        distance: 'Local',
        score: 89,
        intent: 'Discovery',
        scores: { safety: 92, attraction: 78, growth: 85 },
        savedDate: 'Oct 20',
        imageGradient: "from-pink-100 to-rose-200",
        insight: "Moon trine Venus. A soft, healing connection."
    }
];

const BLUEPRINT_SNAPSHOT = {
    primaryNeed: "Emotional Containment",
    nonNegotiable: "Radical Honesty",
    frictionZone: "Power Struggles"
};

const SUGGESTED_ACTIONS = [
    { text: "Start conversation with Elena", icon: MessageCircle },
    { text: "Generate relationship report for Julian", icon: FileText },
    { text: "Ask The Lover about Sasha's Venus", icon: Brain }
];

export const CorridorShortlist: React.FC<CorridorShortlistProps> = ({ onNavigate, onBack }) => {
    const [matches, setMatches] = useState(SAVED_MATCHES);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('Highest Compatibility');
    const [selectedOracleMatch, setSelectedOracleMatch] = useState<string>(matches[0]?.name || '');

    const removeMatch = (id: number) => {
        setMatches(prev => prev.filter(m => m.id !== id));
    };

    const filteredMatches = matches.filter(m => 
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        m.city.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-paper pt-32 pb-20 relative overflow-hidden">
             {/* Background Grid */}
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none grid-bg" />

             <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10 space-y-10">
                
                {/* 1. HEADER */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-ink/5 pb-8 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-ink/40">
                            <button onClick={onBack} className="hover:text-ink transition-colors">Corridor</button>
                            <ChevronDown size={10} className="-rotate-90" />
                            <span className="text-ink font-bold">Shortlist</span>
                        </div>
                        
                        <div>
                            <h1 className="text-4xl lg:text-5xl font-display text-ink mb-2">Saved Connections</h1>
                            <p className="text-lg text-ink/60 font-serif max-w-xl">
                                Profiles you have bookmarked for deeper investigation.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 w-full md:w-auto">
                        <button 
                            onClick={() => onNavigate('corridor-matches')}
                            className="flex items-center gap-2 px-6 py-3 border border-ink/10 bg-white hover:border-ink transition-colors text-xs uppercase tracking-widest"
                        >
                            View Feed
                        </button>
                        <button 
                            onClick={() => onNavigate('corridor-settings')}
                            className="flex items-center gap-2 px-6 py-3 border border-ink/10 bg-white hover:border-ink transition-colors text-xs uppercase tracking-widest"
                        >
                            Settings
                        </button>
                    </div>
                </div>

                {/* 2. FILTERS */}
                <div className="flex flex-col md:flex-row items-center gap-6 py-4 sticky top-24 z-20 bg-paper/95 backdrop-blur-sm border-b border-ink/5">
                    <div className="relative group w-full md:w-64">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/20 group-focus-within:text-gold transition-colors" size={16} />
                        <input 
                            type="text" 
                            placeholder="Search list..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border border-ink/10 py-2 pl-10 pr-4 text-xs font-serif placeholder:font-sans placeholder:text-ink/20 focus:outline-none focus:border-gold transition-colors"
                        />
                    </div>
                    
                    <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar w-full">
                        <div className="flex items-center gap-2 pr-4 border-r border-ink/10 mr-2">
                            <Filter size={14} className="text-ink/40" />
                            <span className="text-[10px] uppercase tracking-widest text-ink/40">Sort</span>
                        </div>
                        {['Highest Compatibility', 'Most Recent', 'Closest'].map(opt => (
                            <button
                                key={opt}
                                onClick={() => setSortBy(opt)}
                                className={`
                                    px-3 py-1.5 text-[10px] uppercase tracking-widest border transition-all whitespace-nowrap rounded-sm
                                    ${sortBy === opt 
                                        ? 'bg-ink text-paper border-ink' 
                                        : 'bg-white border-ink/10 text-ink/60 hover:border-ink/40 hover:text-ink'}
                                `}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 3. MAIN CONTENT */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 min-h-[600px]">
                    
                    {/* --- LEFT: SHORTLIST GRID --- */}
                    <div className="lg:col-span-7 space-y-6">
                        <AnimatePresence>
                            {filteredMatches.length > 0 ? (
                                filteredMatches.map((match, i) => (
                                    <motion.div 
                                        key={match.id}
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="bg-white border border-ink/10 flex flex-col sm:flex-row overflow-hidden hover:shadow-lg hover:border-ink/30 transition-all group"
                                    >
                                        {/* Visual */}
                                        <div className={`w-full sm:w-48 bg-gradient-to-br ${match.imageGradient} p-6 flex flex-col justify-between items-center text-center relative`}>
                                            <div className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-ink/50 mb-2">
                                                <User size={24} />
                                            </div>
                                            <div className="text-4xl font-display text-ink/20 mix-blend-overlay font-bold">
                                                {match.score}
                                            </div>
                                            <div className="absolute top-4 left-4 bg-white/90 px-2 py-0.5 text-[9px] uppercase tracking-widest rounded-sm font-bold text-ink/60">
                                                {match.intent}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 p-6 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h3 className="text-2xl font-serif text-ink group-hover:text-gold transition-colors">{match.name}</h3>
                                                        <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-ink/40 mt-1">
                                                            <span>{match.age}</span>
                                                            <span className="w-1 h-1 bg-ink/20 rounded-full"></span>
                                                            <span className="flex items-center gap-1"><MapPin size={10} /> {match.city}</span>
                                                            <span className="w-1 h-1 bg-ink/20 rounded-full"></span>
                                                            <span className="font-mono">Saved {match.savedDate}</span>
                                                        </div>
                                                    </div>
                                                    <button 
                                                        onClick={() => removeMatch(match.id)}
                                                        className="text-ink/20 hover:text-red-500 transition-colors p-1"
                                                        title="Remove from shortlist"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>

                                                <p className="text-xs font-serif text-ink/60 italic leading-relaxed border-l-2 border-gold/30 pl-3 mb-6">
                                                    "{match.insight}"
                                                </p>

                                                {/* Mini Scores */}
                                                <div className="grid grid-cols-3 gap-4 mb-2">
                                                    {[
                                                        { label: 'Safety', val: match.scores.safety, color: 'bg-blue-400' },
                                                        { label: 'Attraction', val: match.scores.attraction, color: 'bg-red-400' },
                                                        { label: 'Growth', val: match.scores.growth, color: 'bg-gold' }
                                                    ].map((s, idx) => (
                                                        <div key={idx}>
                                                            <div className="flex justify-between text-[8px] uppercase tracking-widest text-ink/40 mb-1">
                                                                <span>{s.label}</span>
                                                                <span>{s.val}%</span>
                                                            </div>
                                                            <div className="h-1 bg-ink/5 rounded-full overflow-hidden">
                                                                <div style={{ width: `${s.val}%` }} className={`h-full ${s.color}`}></div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-ink/5">
                                                <button 
                                                    onClick={() => onNavigate('corridor-match-detail')}
                                                    className="text-[10px] uppercase tracking-widest text-ink/40 hover:text-ink transition-colors px-3 py-2"
                                                >
                                                    View Dossier
                                                </button>
                                                <button 
                                                    onClick={() => onNavigate('corridor-chat')}
                                                    className="flex items-center gap-2 px-4 py-2 bg-ink text-paper text-[10px] uppercase tracking-widest hover:bg-gold transition-colors"
                                                >
                                                    Message <ArrowRight size={12} />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="h-64 flex flex-col items-center justify-center border border-dashed border-ink/10 text-ink/40">
                                    <Heart size={32} className="mb-4 opacity-50" />
                                    <p className="text-xs uppercase tracking-widest">No profiles shortlisted.</p>
                                    <button 
                                        onClick={() => onNavigate('corridor-matches')}
                                        className="mt-4 px-6 py-2 border border-ink/20 text-ink text-[10px] uppercase tracking-widest hover:bg-ink hover:text-paper transition-colors"
                                    >
                                        Return to Matches
                                    </button>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>


                    {/* --- RIGHT: TOOLS & CONTEXT --- */}
                    <div className="hidden lg:block lg:col-span-5 space-y-8 sticky top-32">
                        
                        {/* A. Blueprint Snapshot */}
                        <div className="bg-ink text-paper p-8 shadow-xl relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-6 text-gold">
                                    <Shield size={16} />
                                    <h3 className="text-xs uppercase tracking-[0.2em] font-bold">Your Blueprint</h3>
                                </div>
                                <div className="space-y-4 text-sm font-light opacity-80 leading-relaxed mb-6">
                                    <p>
                                        <span className="text-gold font-bold uppercase text-[10px] tracking-widest block mb-1">Primary Need</span>
                                        {BLUEPRINT_SNAPSHOT.primaryNeed}
                                    </p>
                                    <p>
                                        <span className="text-gold font-bold uppercase text-[10px] tracking-widest block mb-1">Non-Negotiable</span>
                                        {BLUEPRINT_SNAPSHOT.nonNegotiable}
                                    </p>
                                    <p>
                                        <span className="text-red-400 font-bold uppercase text-[10px] tracking-widest block mb-1">Friction Zone</span>
                                        {BLUEPRINT_SNAPSHOT.frictionZone}
                                    </p>
                                </div>
                                <button 
                                    onClick={() => onNavigate('corridor-blueprint')}
                                    className="w-full py-3 border border-white/20 text-xs uppercase tracking-widest hover:bg-white hover:text-ink transition-colors flex items-center justify-center gap-2"
                                >
                                    Review Full Blueprint <ArrowRight size={12} />
                                </button>
                            </div>
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl pointer-events-none"></div>
                        </div>

                        {/* B. Oracle Query */}
                        <div className="bg-white border border-ink/10 p-6 shadow-sm">
                            <h3 className="text-xs font-mono uppercase tracking-widest text-ink/40 mb-4 flex items-center gap-2">
                                <Sparkles size={12} /> Query The Field
                            </h3>
                            <div className="space-y-3">
                                <div className="relative">
                                    <select 
                                        className="w-full bg-paper-light border border-ink/10 p-3 text-xs font-serif text-ink/70 focus:outline-none focus:border-gold appearance-none"
                                        value={selectedOracleMatch}
                                        onChange={(e) => setSelectedOracleMatch(e.target.value)}
                                    >
                                        {matches.map(m => <option key={m.id} value={m.name}>{m.name}</option>)}
                                    </select>
                                    <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/30 pointer-events-none" />
                                </div>
                                <textarea 
                                    className="w-full bg-paper-light border border-ink/10 p-3 text-xs font-serif text-ink/70 focus:outline-none focus:border-gold min-h-[80px] resize-none"
                                    placeholder={`Ask about your connection with ${selectedOracleMatch}...`}
                                />
                                <button className="w-full py-2 bg-ink text-paper text-[10px] uppercase tracking-widest hover:bg-gold transition-colors">
                                    Consult Oracle
                                </button>
                            </div>
                        </div>

                        {/* C. Suggested Actions */}
                        <div className="bg-paper-light border border-ink/10 p-6">
                            <h3 className="text-xs font-mono uppercase tracking-widest text-ink/40 mb-4 flex items-center gap-2">
                                <Activity size={12} /> Recommended
                            </h3>
                            <div className="space-y-3">
                                {SUGGESTED_ACTIONS.map((action, i) => (
                                    <button 
                                        key={i}
                                        onClick={() => onNavigate('corridor-chat')}
                                        className="w-full p-3 bg-white border border-ink/5 hover:border-gold/50 text-left transition-all flex items-center gap-3 group"
                                    >
                                        <div className="w-8 h-8 bg-ink/5 rounded-full flex items-center justify-center text-ink/40 group-hover:text-ink group-hover:bg-gold/20 transition-colors">
                                            <action.icon size={14} />
                                        </div>
                                        <span className="text-xs text-ink/70 group-hover:text-ink">{action.text}</span>
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