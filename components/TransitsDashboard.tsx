import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Calendar, Filter, SlidersHorizontal, 
  ChevronDown, Search, ArrowRight, Activity, 
  AlertTriangle, CheckCircle2, Zap, Clock, 
  Download, RefreshCw, Eye, ChevronRight,
  Briefcase, Heart, Coins, Brain, Star
} from 'lucide-react';

interface TransitsDashboardProps {
    onNavigate: (view: any) => void;
    onBack: () => void;
}

// --- MOCK DATA ---

const TRANSITS = [
    {
        id: 't1',
        name: 'Mars Square Pluto',
        type: 'Challenging',
        room: 'Career & Vocation',
        planet: 'Mars',
        intensity: 94,
        startDate: 'Oct 22',
        peakDate: 'Oct 24',
        endDate: 'Oct 28',
        desc: 'Power struggles with authority figures are likely. Avoid ultimatums.',
        interpretation: {
            meaning: "This is a volatile aspect that creates friction between your drive (Mars) and deep transformation (Pluto). It often manifests as a battle of wills.",
            affect: "You may feel an intense urge to burn bridges or force an outcome. The pressure is internal but projected externally.",
            guidance: {
                do: ["Channel rage into physical exercise", "Strategy over brute force", "Investigate hidden motives"],
                avoid: ["Direct confrontation with bosses", "Ultimatums", "Power plays"]
            },
            timing: {
                best: "Oct 27 (Post-peak integration)",
                caution: "Oct 24, 2:00 PM - 6:00 PM"
            }
        }
    },
    {
        id: 't2',
        name: 'Venus Trine Jupiter',
        type: 'Supportive',
        room: 'Wealth & Resources',
        planet: 'Venus',
        intensity: 88,
        startDate: 'Oct 20',
        peakDate: 'Oct 25',
        endDate: 'Nov 02',
        desc: 'A golden window for financial expansion and ease.',
        interpretation: {
            meaning: "The two benefics are in harmony. This smooths out difficulties and attracts abundance with little effort.",
            affect: "You will feel luckier, more generous, and open to receiving. Social interactions feel effortless.",
            guidance: {
                do: ["Ask for the raise", "Launch the product", "Socialize intentionally"],
                avoid: ["Overindulgence", "Promising more than you can deliver"]
            },
            timing: {
                best: "Oct 25 (Peak attraction)",
                caution: "None"
            }
        }
    },
    {
        id: 't3',
        name: 'Mercury Retrograde',
        type: 'Neutral',
        room: 'Mind & Clarity',
        planet: 'Mercury',
        intensity: 65,
        startDate: 'Oct 15',
        peakDate: 'Nov 01',
        endDate: 'Nov 15',
        desc: 'Review, reassess, redo. Communication glitches expected.',
        interpretation: {
            meaning: "The classic signal to slow down. Mercury appears to move backward, asking you to review the past before moving forward.",
            affect: "Tech glitches, misunderstandings, and the return of ex-partners or old ideas.",
            guidance: {
                do: ["Edit old work", "Reconnect with old friends", "Back up data"],
                avoid: ["Signing new contracts", "Buying electronics", "First dates"]
            },
            timing: {
                best: "Any time for review",
                caution: "Nov 01 (Station Direct)"
            }
        }
    },
    {
        id: 't4',
        name: 'Saturn Conjunct Moon',
        type: 'Challenging',
        room: 'Self & Identity',
        planet: 'Saturn',
        intensity: 82,
        startDate: 'Oct 23',
        peakDate: 'Oct 24',
        endDate: 'Oct 26',
        desc: 'Emotional heaviness. A feeling of isolation or restriction.',
        interpretation: {
            meaning: "Saturn (The Taskmaster) sits on your Moon (Emotions). This feels like a wet blanket on your mood, but it is necessary for emotional maturity.",
            affect: "Loneliness, sobriety, and a need for solitude. You are building emotional resilience.",
            guidance: {
                do: ["Solitude", "Routine", "Responsibility"],
                avoid: ["Seeking validation", "Social parties", "Complaining"]
            },
            timing: {
                best: "Evening reflection",
                caution: "Morning interactions"
            }
        }
    },
    {
        id: 't5',
        name: 'Sun Enter Scorpio',
        type: 'Neutral',
        room: 'Love & Union',
        planet: 'Sun',
        intensity: 70,
        startDate: 'Oct 23',
        peakDate: 'Oct 23',
        endDate: 'Nov 21',
        desc: 'The season of depth begins. Surface level interactions become intolerable.',
        interpretation: {
            meaning: "The Sun illuminates the 8th house archetype. Everything becomes about power, intimacy, and truth.",
            affect: "You crave depth. Secrets may be revealed. Intimacy takes precedence over social grace.",
            guidance: {
                do: ["Investigate mysteries", "Deep bonding", "Financial auditing"],
                avoid: ["Superficiality", "Gossip", "Ignoring intuition"]
            },
            timing: {
                best: "All Month",
                caution: "None"
            }
        }
    }
];

const OVERVIEW_STATS = [
    { label: 'Active Transits', value: '12', trend: 'Normal' },
    { label: 'High Intensity', value: '3', trend: 'Alert', color: 'text-red-600' },
    { label: 'Next Major', value: 'Oct 28', sub: 'Full Moon' },
    { label: 'Active Room', value: 'Career', sub: '10th House' }
];

export const TransitsDashboard: React.FC<TransitsDashboardProps> = ({ onNavigate, onBack }) => {
    const [selectedTransit, setSelectedTransit] = useState<string | null>(TRANSITS[0].id);
    const [filterType, setFilterType] = useState('All');
    const [dateRange, setDateRange] = useState('Today');

    const activeTransitData = TRANSITS.find(t => t.id === selectedTransit);

    return (
        <div className="min-h-screen bg-paper pt-32 pb-20 relative overflow-hidden">
             {/* Background Grid */}
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none grid-bg" />

             <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10 space-y-8">
                
                {/* 1. HEADER */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end border-b border-ink/5 pb-8 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-ink/40">
                            <button onClick={onBack} className="hover:text-ink transition-colors">Observatory</button>
                            <ChevronRight size={10} />
                            <span className="text-ink font-bold">Transits</span>
                        </div>
                        
                        <div>
                            <h1 className="text-4xl lg:text-5xl font-display text-ink mb-2">Planetary Stream</h1>
                            <p className="text-lg text-ink/60 font-serif max-w-xl">
                                Real-time planetary influences mapped to your life architecture.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-4 w-full lg:w-auto">
                        <div className="flex bg-white border border-ink/10 rounded-sm p-1">
                            {['Today', '7 Days', '30 Days'].map(view => (
                                <button 
                                    key={view}
                                    onClick={() => setDateRange(view)}
                                    className={`px-4 py-2 text-[10px] uppercase tracking-widest transition-all ${dateRange === view ? 'bg-ink text-paper' : 'text-ink/40 hover:text-ink'}`}
                                >
                                    {view}
                                </button>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <button className="flex items-center gap-2 px-4 py-2 border border-ink/10 bg-white text-[10px] uppercase tracking-widest hover:border-ink transition-colors">
                                <RefreshCw size={12} /> Recalculate
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 border border-ink/10 bg-white text-[10px] uppercase tracking-widest hover:border-ink transition-colors">
                                <Download size={12} /> Export
                            </button>
                        </div>
                    </div>
                </div>

                {/* 2. OVERVIEW CARDS */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
                    {OVERVIEW_STATS.map((stat, i) => (
                        <div key={i} className="bg-white border border-ink/10 p-6 flex flex-col justify-between h-32 hover:border-ink/30 transition-colors">
                            <span className="text-[10px] uppercase tracking-widest text-ink/40">{stat.label}</span>
                            <div>
                                <div className={`text-3xl font-display ${stat.color || 'text-ink'}`}>{stat.value}</div>
                                {stat.sub && <div className="text-xs font-serif text-ink/50 mt-1">{stat.sub}</div>}
                                {stat.trend && !stat.sub && <div className="text-[10px] uppercase tracking-widest text-ink/30 mt-1">{stat.trend}</div>}
                            </div>
                        </div>
                    ))}
                </div>

                {/* 3. FILTERS (Sticky) */}
                <div className="sticky top-24 z-20 bg-paper/95 backdrop-blur-md py-4 border-b border-ink/5 -mx-6 px-6 lg:-mx-12 lg:px-12 flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2 pr-4 border-r border-ink/10">
                        <Filter size={14} className="text-ink/40" />
                        <span className="text-[10px] uppercase tracking-widest text-ink/40">Filters</span>
                    </div>
                    
                    {['All', 'Supportive', 'Challenging', 'Neutral'].map(type => (
                        <button
                            key={type}
                            onClick={() => setFilterType(type)}
                            className={`
                                px-3 py-1.5 text-[10px] uppercase tracking-widest border transition-all rounded-sm
                                ${filterType === type 
                                    ? 'bg-ink text-paper border-ink' 
                                    : 'bg-white border-ink/10 text-ink/60 hover:border-ink/40 hover:text-ink'}
                            `}
                        >
                            {type}
                        </button>
                    ))}

                    <div className="h-6 w-px bg-ink/10 mx-2"></div>

                    <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-ink/10 text-[10px] uppercase tracking-widest text-ink/60 hover:text-ink">
                        Life Room <ChevronDown size={10} />
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-ink/10 text-[10px] uppercase tracking-widest text-ink/60 hover:text-ink">
                        Planet <ChevronDown size={10} />
                    </button>
                </div>

                {/* 4. MAIN LAYOUT */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 min-h-[800px]">
                    
                    {/* --- LEFT: TRANSIT LIST --- */}
                    <div className="lg:col-span-7 space-y-4">
                        {TRANSITS.map((transit, i) => (
                            <motion.div 
                                key={transit.id}
                                layoutId={transit.id}
                                onClick={() => setSelectedTransit(transit.id)}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className={`
                                    group relative p-6 border cursor-pointer transition-all duration-300
                                    ${selectedTransit === transit.id 
                                        ? 'bg-ink text-paper border-ink shadow-xl translate-x-2' 
                                        : 'bg-white border-ink/10 hover:border-ink/30 hover:translate-x-1'}
                                `}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex flex-col">
                                        <span className={`text-[10px] uppercase tracking-widest mb-1 ${selectedTransit === transit.id ? 'text-white/40' : 'text-ink/40'}`}>
                                            {transit.startDate} — {transit.endDate}
                                        </span>
                                        <h3 className={`font-serif text-xl ${selectedTransit === transit.id ? 'text-white' : 'text-ink group-hover:text-gold transition-colors'}`}>
                                            {transit.name}
                                        </h3>
                                    </div>
                                    <div className={`
                                        w-8 h-8 flex items-center justify-center rounded-full border text-xs font-bold
                                        ${selectedTransit === transit.id ? 'border-white/20 bg-white/10' : 'border-ink/10 bg-paper-light'}
                                    `}>
                                        {transit.intensity}
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className={`px-2 py-1 text-[9px] uppercase tracking-widest border rounded-sm ${
                                        selectedTransit === transit.id ? 'border-white/20 text-white/60' : 'border-ink/10 bg-ink/5 text-ink/60'
                                    }`}>
                                        {transit.type}
                                    </span>
                                    <span className={`px-2 py-1 text-[9px] uppercase tracking-widest border rounded-sm ${
                                        selectedTransit === transit.id ? 'border-white/20 text-white/60' : 'border-ink/10 bg-ink/5 text-ink/60'
                                    }`}>
                                        {transit.room}
                                    </span>
                                </div>

                                <p className={`text-sm font-light leading-relaxed ${selectedTransit === transit.id ? 'text-white/70' : 'text-ink/60'}`}>
                                    {transit.desc}
                                </p>

                                {selectedTransit === transit.id && (
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gold">
                                        <ArrowRight size={20} />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>


                    {/* --- RIGHT: DETAIL PANEL --- */}
                    <div className="hidden lg:block lg:col-span-5 relative">
                        <div className="sticky top-40">
                            <AnimatePresence mode="wait">
                                {activeTransitData ? (
                                    <motion.div 
                                        key={activeTransitData.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="bg-white border border-ink/10 shadow-lg"
                                    >
                                        {/* Detail Header */}
                                        <div className="p-8 border-b border-ink/5 bg-paper-light">
                                            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-ink/40 mb-3">
                                                <Activity size={12} /> Transit Analysis
                                            </div>
                                            <h2 className="text-3xl font-display text-ink mb-2">{activeTransitData.name}</h2>
                                            <div className="flex items-center gap-4 text-xs font-mono text-ink/50">
                                                <span>Intensity: {activeTransitData.intensity}%</span>
                                                <div className="h-3 w-px bg-ink/20"></div>
                                                <span>Peak: {activeTransitData.peakDate}</span>
                                            </div>
                                        </div>

                                        {/* Interpretation */}
                                        <div className="p-8 space-y-8">
                                            
                                            {/* Meaning */}
                                            <div>
                                                <h3 className="text-xs font-bold uppercase tracking-widest text-ink mb-3">The Architecture</h3>
                                                <p className="text-sm text-ink/70 leading-relaxed font-serif">
                                                    {activeTransitData.interpretation.meaning}
                                                </p>
                                            </div>

                                            {/* Affect */}
                                            <div className="bg-ink/5 p-4 border-l-2 border-gold">
                                                <h3 className="text-[10px] uppercase tracking-widest text-ink/40 mb-2">Impact</h3>
                                                <p className="text-sm text-ink/80 italic">
                                                    "{activeTransitData.interpretation.affect}"
                                                </p>
                                            </div>

                                            {/* Do's and Don'ts */}
                                            <div className="grid grid-cols-2 gap-6">
                                                <div>
                                                    <h4 className="text-[10px] uppercase tracking-widest text-green-600 font-bold mb-3 flex items-center gap-1">
                                                        <CheckCircle2 size={10} /> Navigate With
                                                    </h4>
                                                    <ul className="space-y-2">
                                                        {activeTransitData.interpretation.guidance.do.map((item, i) => (
                                                            <li key={i} className="text-xs text-ink/70 leading-relaxed list-disc list-inside marker:text-green-300">
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h4 className="text-[10px] uppercase tracking-widest text-red-500 font-bold mb-3 flex items-center gap-1">
                                                        <AlertTriangle size={10} /> Avoid
                                                    </h4>
                                                    <ul className="space-y-2">
                                                        {activeTransitData.interpretation.guidance.avoid.map((item, i) => (
                                                            <li key={i} className="text-xs text-ink/70 leading-relaxed list-disc list-inside marker:text-red-300">
                                                                {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>

                                            {/* Timing */}
                                            <div className="pt-6 border-t border-ink/5">
                                                <h3 className="text-xs font-bold uppercase tracking-widest text-ink mb-4 flex items-center gap-2">
                                                    <Clock size={12} /> Temporal Windows
                                                </h3>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between items-center bg-green-50 p-3 rounded-sm border border-green-100">
                                                        <span className="text-[10px] uppercase tracking-widest text-green-800">Best Action</span>
                                                        <span className="text-xs font-mono text-green-700">{activeTransitData.interpretation.timing.best}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center bg-red-50 p-3 rounded-sm border border-red-100">
                                                        <span className="text-[10px] uppercase tracking-widest text-red-800">Caution Zone</span>
                                                        <span className="text-xs font-mono text-red-700">{activeTransitData.interpretation.timing.caution}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="pt-4 grid grid-cols-2 gap-3">
                                                <button className="flex items-center justify-center gap-2 px-4 py-3 bg-ink text-paper text-[10px] uppercase tracking-widest hover:bg-gold transition-colors">
                                                    <Zap size={12} /> Action Plan
                                                </button>
                                                <button 
                                                    onClick={() => onNavigate('guides-chat')}
                                                    className="flex items-center justify-center gap-2 px-4 py-3 border border-ink/10 text-ink text-[10px] uppercase tracking-widest hover:border-ink transition-colors"
                                                >
                                                    <Eye size={12} /> Ask Guide
                                                </button>
                                            </div>

                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="h-full flex items-center justify-center text-ink/30 text-xs uppercase tracking-widest">
                                        Select a transit to decode
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