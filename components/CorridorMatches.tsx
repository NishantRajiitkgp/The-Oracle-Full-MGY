import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, SlidersHorizontal, ChevronDown, Search, 
  Heart, X, MapPin, Star, Shield, Zap, Activity, 
  ArrowRight, MessageCircle, Lock, User, Check,
  RefreshCw, Sparkles, ArrowUpRight
} from 'lucide-react';

interface CorridorMatchesProps {
    onNavigate: (view: any) => void;
}

// --- MOCK DATA ---

const MATCHES = [
    {
        id: 1,
        name: 'Elena R.',
        age: 28,
        city: 'London',
        distance: '4 km',
        score: 98,
        tags: ['Soul Contract', 'High Intensity'],
        scores: { safety: 85, attraction: 99, growth: 92 },
        placements: { sun: 'Leo', moon: 'Scorpio', rise: 'Virgo' },
        insight: "Her Pluto sits exactly on your Ascendant. This is not a casual meeting; it is a transformation event.",
        isNew: true,
        imageGradient: "from-purple-200 to-indigo-100"
    },
    {
        id: 2,
        name: 'Marcus T.',
        age: 31,
        city: 'Berlin',
        distance: 'Local',
        score: 88,
        tags: ['The Anchor', 'Stabilizing'],
        scores: { safety: 95, attraction: 75, growth: 80 },
        placements: { sun: 'Taurus', moon: 'Cancer', rise: 'Leo' },
        insight: "His Saturn stabilizes your volatile Moon. He offers the container for your emotional storm.",
        isNew: false,
        imageGradient: "from-emerald-100 to-teal-200"
    },
    {
        id: 3,
        name: 'Sarah K.',
        age: 29,
        city: 'New York',
        distance: '12 km',
        score: 76,
        tags: ['Karmic Teacher', 'Friction'],
        scores: { safety: 40, attraction: 95, growth: 88 },
        placements: { sun: 'Aries', moon: 'Sagittarius', rise: 'Gemini' },
        insight: "High friction in communication sectors. She enters your life to teach you how to speak your truth.",
        isNew: true,
        imageGradient: "from-orange-100 to-red-100"
    },
    {
        id: 4,
        name: 'Julian B.',
        age: 33,
        city: 'Tokyo',
        distance: 'Remote',
        score: 94,
        tags: ['Twin Flame', 'Mirror'],
        scores: { safety: 88, attraction: 92, growth: 96 },
        placements: { sun: 'Leo', moon: 'Leo', rise: 'Libra' },
        insight: "Sun conjunct Sun. You shine in the same spectrum. A partnership of creative explosion.",
        isNew: false,
        imageGradient: "from-yellow-100 to-amber-200"
    },
    {
        id: 5,
        name: 'Alex M.',
        age: 30,
        city: 'London',
        distance: '2 km',
        score: 82,
        tags: ['Intellectual Ally'],
        scores: { safety: 90, attraction: 65, growth: 85 },
        placements: { sun: 'Aquarius', moon: 'Libra', rise: 'Capricorn' },
        insight: "Mercury trine Mercury. You will never run out of things to discuss.",
        isNew: false,
        imageGradient: "from-blue-100 to-sky-200"
    }
];

const SHORTLIST = [
    { id: 1, name: 'Elena R.', status: 'Orbiting' },
    { id: 4, name: 'Julian B.', status: 'Orbiting' }
];

export const CorridorMatches: React.FC<CorridorMatchesProps> = ({ onNavigate }) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [shortlist, setShortlist] = useState<number[]>([1, 4]);
    const [sortBy, setSortBy] = useState('Compatibility');

    const toggleShortlist = (id: number) => {
        if (shortlist.includes(id)) {
            setShortlist(shortlist.filter(i => i !== id));
        } else {
            setShortlist([...shortlist, id]);
        }
    };

    return (
        <div className="min-h-screen bg-paper pt-32 pb-20 relative overflow-hidden">
             {/* Background Grid */}
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none grid-bg" />

             <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10 space-y-10">
                
                {/* 1. PAGE HEADER */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-ink/5 pb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-2 text-ink/40">
                            <Activity size={14} />
                            <span className="text-[10px] uppercase tracking-[0.3em]">Live Feed</span>
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-display text-ink mb-2">Resonance Feed</h1>
                        <p className="text-ink/60 font-serif text-lg">
                            Souls vibrating within your defined blueprint parameters.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 mt-6 md:mt-0 w-full md:w-auto">
                        <button 
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className={`flex items-center gap-2 px-6 py-3 border text-xs uppercase tracking-widest transition-colors ${isFilterOpen ? 'bg-ink text-paper border-ink' : 'bg-white border-ink/10 hover:border-ink'}`}
                        >
                            <SlidersHorizontal size={14} /> Filters
                        </button>
                        
                        <div className="relative group flex-1 md:flex-none">
                            <button className="flex items-center justify-between gap-4 w-full md:w-48 px-6 py-3 border border-ink/10 bg-white text-xs uppercase tracking-widest hover:border-ink transition-colors">
                                <span>{sortBy}</span>
                                <ChevronDown size={14} />
                            </button>
                            {/* Dropdown (Mock) */}
                            <div className="absolute top-full left-0 right-0 bg-white border border-ink/10 shadow-lg mt-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-20">
                                {['Compatibility', 'Distance', 'Newest', 'Activity'].map(opt => (
                                    <button key={opt} onClick={() => setSortBy(opt)} className="w-full text-left px-4 py-2 text-[10px] uppercase tracking-widest hover:bg-ink/5 transition-colors">
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. FILTERS PANEL (Expandable) */}
                <AnimatePresence>
                    {isFilterOpen && (
                        <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-[#FDFBF7] border-b border-ink/10 overflow-hidden"
                        >
                            <div className="p-8 grid grid-cols-1 md:grid-cols-4 gap-8">
                                <div>
                                    <label className="text-[10px] uppercase tracking-widest text-ink/40 mb-4 block">Age Range</label>
                                    <div className="flex items-center gap-4 text-sm font-mono">
                                        <span>25</span>
                                        <div className="flex-1 h-1 bg-ink/10 rounded-full relative">
                                            <div className="absolute left-[10%] right-[30%] top-0 bottom-0 bg-ink"></div>
                                        </div>
                                        <span>45</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase tracking-widest text-ink/40 mb-4 block">Min. Resonance</label>
                                    <div className="flex gap-2">
                                        {['60%', '70%', '80%', '90%'].map(opt => (
                                            <button key={opt} className={`flex-1 py-2 text-xs border ${opt === '80%' ? 'bg-ink text-paper border-ink' : 'bg-white border-ink/10 text-ink/60'}`}>{opt}</button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase tracking-widest text-ink/40 mb-4 block">Intention</label>
                                    <div className="flex flex-wrap gap-2">
                                        {['Soul Union', 'Legacy', 'Discovery'].map(opt => (
                                            <button key={opt} className={`px-3 py-1 text-[10px] uppercase tracking-widest border ${opt === 'Soul Union' ? 'bg-ink/5 border-ink text-ink' : 'bg-white border-ink/10 text-ink/40'}`}>{opt}</button>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-end justify-end gap-4">
                                    <button onClick={() => setIsFilterOpen(false)} className="text-xs uppercase tracking-widest text-ink/40 hover:text-ink">Reset</button>
                                    <button onClick={() => setIsFilterOpen(false)} className="px-6 py-2 bg-ink text-paper text-xs uppercase tracking-widest hover:bg-gold transition-colors">Apply</button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>


                {/* 3. MAIN CONTENT */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* --- LEFT COLUMN: MATCH FEED (8 Cols) --- */}
                    <div className="lg:col-span-8 space-y-8">
                        {MATCHES.map((match, i) => (
                            <motion.div 
                                key={match.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative bg-white border border-ink/10 hover:border-ink/30 transition-all shadow-sm hover:shadow-md overflow-hidden flex flex-col sm:flex-row min-h-[300px]"
                            >
                                {/* Photo / Visual Side */}
                                <div className={`w-full sm:w-1/3 bg-gradient-to-br ${match.imageGradient} relative p-6 flex flex-col justify-between group-hover:scale-[1.02] transition-transform duration-700`}>
                                    <div className="flex justify-between items-start">
                                        {match.isNew && (
                                            <span className="bg-white/90 backdrop-blur-sm px-2 py-1 text-[9px] uppercase tracking-widest text-ink font-bold">New Signal</span>
                                        )}
                                        <div className="ml-auto w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-ink/60">
                                            <User size={14} />
                                        </div>
                                    </div>
                                    
                                    <div className="text-center">
                                        <span className="text-6xl font-display text-ink/20 mix-blend-overlay">{match.placements.sun.slice(0,3)}</span>
                                    </div>

                                    <div className="flex gap-1 justify-center text-[9px] uppercase tracking-widest font-bold text-ink/60 bg-white/30 backdrop-blur-md py-2 rounded-full">
                                        <span>☉ {match.placements.sun}</span>
                                        <span>•</span>
                                        <span>☾ {match.placements.moon}</span>
                                        <span>•</span>
                                        <span>↑ {match.placements.rise}</span>
                                    </div>
                                </div>

                                {/* Content Side */}
                                <div className="flex-1 p-8 flex flex-col justify-between relative">
                                    {/* Action Buttons (Absolute) */}
                                    <div className="absolute top-6 right-6 flex gap-2">
                                        <button 
                                            onClick={() => toggleShortlist(match.id)}
                                            className={`w-10 h-10 border rounded-full flex items-center justify-center transition-all ${shortlist.includes(match.id) ? 'bg-ink text-gold border-ink' : 'border-ink/10 text-ink/20 hover:border-ink hover:text-ink'}`}
                                        >
                                            <Heart size={16} fill={shortlist.includes(match.id) ? "currentColor" : "none"} />
                                        </button>
                                    </div>

                                    <div>
                                        <div className="flex items-baseline gap-3 mb-1">
                                            <h3 className="text-3xl font-display text-ink">{match.name}</h3>
                                            <span className="text-lg font-serif text-ink/40">{match.age}</span>
                                        </div>
                                        <div className="flex items-center gap-4 text-xs font-mono text-ink/40 uppercase tracking-widest mb-6">
                                            <span className="flex items-center gap-1"><MapPin size={10} /> {match.city}</span>
                                            <span>•</span>
                                            <span>{match.distance}</span>
                                        </div>

                                        {/* Oracle Insight */}
                                        <div className="relative pl-4 border-l-2 border-gold/30 italic font-serif text-ink/70 text-lg mb-6 leading-relaxed">
                                            "{match.insight}"
                                        </div>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            <span className="px-3 py-1 bg-ink text-paper text-[10px] uppercase tracking-widest font-bold">{match.score}% Resonance</span>
                                            {match.tags.map(tag => (
                                                <span key={tag} className="px-3 py-1 bg-ink/5 border border-ink/5 text-[10px] uppercase tracking-widest text-ink/60">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Scores Breakdown */}
                                    <div className="grid grid-cols-3 gap-4 border-t border-ink/5 pt-6">
                                        <div>
                                            <div className="flex justify-between text-[9px] uppercase tracking-widest text-ink/40 mb-1">
                                                Safety
                                            </div>
                                            <div className="h-1 bg-ink/5 rounded-full overflow-hidden">
                                                <div style={{ width: `${match.scores.safety}%` }} className="h-full bg-blue-400"></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-[9px] uppercase tracking-widest text-ink/40 mb-1">
                                                Attraction
                                            </div>
                                            <div className="h-1 bg-ink/5 rounded-full overflow-hidden">
                                                <div style={{ width: `${match.scores.attraction}%` }} className="h-full bg-red-400"></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-[9px] uppercase tracking-widest text-ink/40 mb-1">
                                                Growth
                                            </div>
                                            <div className="h-1 bg-ink/5 rounded-full overflow-hidden">
                                                <div style={{ width: `${match.scores.growth}%` }} className="h-full bg-gold"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex justify-end">
                                        <button 
                                            onClick={() => onNavigate('corridor-match-detail')}
                                            className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold hover:text-gold transition-colors group/btn"
                                        >
                                            Decrypt Dossier <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                        
                        <div className="text-center pt-8 pb-12">
                            <button className="px-8 py-3 border border-ink/10 bg-white text-xs uppercase tracking-widest hover:border-ink transition-colors flex items-center justify-center gap-2 mx-auto">
                                <RefreshCw size={14} /> Load More Signals
                            </button>
                        </div>
                    </div>


                    {/* --- RIGHT COLUMN: STICKY SIDEBAR (4 Cols) --- */}
                    <div className="hidden lg:block lg:col-span-4 space-y-8 sticky top-32 h-fit">
                        
                        {/* A. BLUEPRINT SNAPSHOT */}
                        <div className="bg-[#1a1a1a] text-[#F2F0E9] p-8 shadow-xl relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-6 text-gold">
                                    <Shield size={16} />
                                    <h3 className="text-xs uppercase tracking-[0.2em] font-bold">Your Blueprint</h3>
                                </div>
                                
                                <div className="space-y-4 text-sm font-light opacity-80 leading-relaxed mb-6">
                                    <p>
                                        <span className="text-gold font-bold uppercase text-[10px] tracking-widest block mb-1">Primary Need</span>
                                        Emotional containment without restriction.
                                    </p>
                                    <p>
                                        <span className="text-gold font-bold uppercase text-[10px] tracking-widest block mb-1">Non-Negotiable</span>
                                        Radical honesty & Financial stability.
                                    </p>
                                </div>

                                <div className="h-px bg-white/10 w-full mb-6"></div>

                                <button 
                                    onClick={() => onNavigate('corridor-blueprint')}
                                    className="w-full py-3 border border-white/20 text-xs uppercase tracking-widest hover:bg-white hover:text-ink transition-colors flex items-center justify-center gap-2"
                                >
                                    View Full Schematic <ArrowUpRight size={12} />
                                </button>
                            </div>
                            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-gold/10 rounded-full blur-3xl pointer-events-none"></div>
                        </div>

                        {/* B. ORBIT (SHORTLIST) */}
                        <div className="bg-white border border-ink/10 p-6">
                            <h3 className="text-xs font-mono uppercase tracking-widest text-ink/40 mb-6 flex items-center gap-2">
                                <Heart size={12} /> Orbiting Souls
                            </h3>
                            <div className="space-y-4">
                                {SHORTLIST.map((item, i) => (
                                    <div key={i} className="flex items-center justify-between group cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-ink/5 border border-ink/10 flex items-center justify-center text-xs font-serif text-ink">
                                                {item.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="text-sm font-serif text-ink group-hover:text-gold transition-colors">{item.name}</div>
                                                <div className="text-[9px] uppercase tracking-widest text-ink/30">Active</div>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => toggleShortlist(item.id)}
                                            className="text-ink/20 hover:text-red-400 transition-colors"
                                        >
                                            <X size={12} />
                                        </button>
                                    </div>
                                ))}
                                {SHORTLIST.length === 0 && (
                                    <div className="text-center text-xs text-ink/30 italic py-4">No profiles in orbit.</div>
                                )}
                            </div>
                            <button 
                                onClick={() => onNavigate('corridor-shortlist')}
                                className="w-full mt-6 text-[10px] uppercase tracking-widest text-ink/40 hover:text-ink border-t border-ink/5 pt-3"
                            >
                                Manage Shortlist
                            </button>
                        </div>

                        {/* C. ASK ORACLE */}
                        <div className="bg-paper-light border border-ink/10 p-6 relative">
                            <h3 className="text-xs font-mono uppercase tracking-widest text-ink/40 mb-4 flex items-center gap-2">
                                <MessageCircle size={12} /> Query The Field
                            </h3>
                            <div className="space-y-3">
                                <select className="w-full bg-white border border-ink/10 p-3 text-xs font-serif text-ink/70 focus:outline-none focus:border-gold">
                                    <option>Select a match...</option>
                                    {MATCHES.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                                </select>
                                <textarea 
                                    className="w-full bg-white border border-ink/10 p-3 text-xs font-serif text-ink/70 focus:outline-none focus:border-gold min-h-[80px]"
                                    placeholder="Is this a karmic trap?"
                                />
                                <button className="w-full py-2 bg-ink text-paper text-[10px] uppercase tracking-widest hover:bg-gold transition-colors">
                                    Ask
                                </button>
                            </div>
                        </div>

                    </div>

                </div>

             </div>
        </div>
    );
};