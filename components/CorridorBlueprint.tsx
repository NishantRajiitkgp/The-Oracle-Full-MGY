import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Edit2, Users, Heart, Zap, 
  MessageCircle, Shield, Activity, Calendar, 
  Star, AlertTriangle, CheckCircle2, ArrowRight,
  Brain, Lock, RefreshCw, ChevronRight
} from 'lucide-react';

interface CorridorBlueprintProps {
    onNavigate: (view: any) => void;
}

// --- MOCK DATA ---

const SCORES = [
    { label: 'Emotional Safety', value: 85, desc: 'High resonance. You naturally soothe each other.' },
    { label: 'Attraction Arc', value: 92, desc: 'Magnetic. High intensity start.' },
    { label: 'Communication', value: 64, desc: 'Requires translation tools.' },
    { label: 'Growth Vector', value: 88, desc: 'Catalytic for personal evolution.' }
];

const STRENGTHS = [
    { title: 'The Anchor', desc: 'You provide stabilizing energy in chaos.', action: 'Use this when your partner spirals.' },
    { title: 'Deep Listener', desc: 'You hear what is not being said.', action: 'Trust your intuition in arguments.' },
    { title: 'Visionary', desc: 'You hold the long-term map of the relationship.', action: 'Remind the partnership of the destination.' },
    { title: 'Protector', desc: 'Fierce loyalty to the "us" entity.', action: 'Ensure boundaries with outsiders are clear.' }
];

const FRICTIONS = [
    { title: 'The Silent Wall', trigger: 'Feeling criticized or misunderstood.', action: 'Force yourself to say "I need a moment" instead of vanishing.' },
    { title: 'Control Loop', trigger: 'Unpredictability in finances.', action: 'Schedule regular syncs to reduce anxiety.' },
    { title: 'Intensity Addiction', trigger: 'Boredom or routine.', action: 'Create healthy excitement (travel) rather than conflict.' }
];

const ATTACHMENT = {
    style: 'Anxious-Preoccupied (Leaning Secure)',
    safe: ['Consistent communication', 'Physical touch', 'Future planning'],
    avoid: ['Ambiguity', 'Long periods of silence', 'Dismissiveness']
};

const ASTRO_MECHANICS = [
    { planet: 'Venus', sign: 'Scorpio', house: '4th', desc: 'Love is private, intense, and transformative. You crave soul-merging.' },
    { planet: 'Mars', sign: 'Capricorn', house: '6th', desc: 'Conflict is strategic. You play the long game. You value endurance.' },
    { planet: 'Moon', sign: 'Pisces', house: '8th', desc: 'Needs deep psychic bond. Highly sensitive to environments.' },
    { planet: '7th House', sign: 'Aquarius', ruler: 'Saturn', desc: 'You attract intellectuals and rebels. Partnership must have freedom.' }
];

const TIMING = [
    { range: 'Oct 28 - Nov 15', type: 'Favorable', reason: 'Venus Trine Jupiter. Expansion of love.' },
    { range: 'Dec 01 - Dec 14', type: 'Caution', reason: 'Mercury Retrograde in relationship sector.' },
    { range: 'Jan 10 - Feb 02', type: 'Favorable', reason: 'Sun enters 7th House. Partnership focus.' }
];

export const CorridorBlueprint: React.FC<CorridorBlueprintProps> = ({ onNavigate }) => {
    return (
        <div className="min-h-screen bg-paper pt-28 pb-20 relative overflow-hidden">
             {/* Background Grid */}
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none grid-bg" />

             <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
                
                {/* 1. TOP HEADER */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-ink/5 pb-8 mb-12"
                >
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 mb-4 text-[10px] uppercase tracking-widest text-ink/40">
                            <button onClick={() => onNavigate('corridor')} className="hover:text-ink transition-colors">Corridor</button>
                            <ChevronRight size={10} />
                            <span className="text-ink">Blueprint</span>
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-display text-ink mb-4">Compatibility Blueprint</h1>
                        <p className="text-lg text-ink/60 font-serif max-w-xl">
                            The architectural schematic of your relating self. Your patterns, your gravity, and your friction points.
                        </p>
                    </div>

                    <div className="flex gap-4 mt-6 md:mt-0">
                        <button 
                            onClick={() => onNavigate('corridor-profile')}
                            className="flex items-center gap-2 px-6 py-3 border border-ink/10 bg-white hover:border-ink transition-colors text-xs uppercase tracking-widest"
                        >
                            <Edit2 size={14} /> Edit Profile
                        </button>
                        <button 
                            onClick={() => onNavigate('corridor-matches')}
                            className="flex items-center gap-2 px-6 py-3 bg-ink text-paper hover:bg-gold transition-colors text-xs uppercase tracking-widest"
                        >
                            <Users size={14} /> View Matches
                        </button>
                    </div>
                </motion.div>


                {/* 2. SUMMARY DASHBOARD */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
                    
                    {/* A. Overview Card */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="lg:col-span-7 bg-[#FDFBF7] border border-ink/10 p-8 lg:p-12 relative overflow-hidden flex flex-col justify-center"
                    >
                        <div className="absolute top-0 right-0 p-12 text-[200px] leading-none font-serif text-ink/[0.02] pointer-events-none select-none">
                            &
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-xs font-mono uppercase tracking-widest text-ink/40 mb-6">Primary Mode</h3>
                            <h2 className="text-3xl lg:text-5xl font-serif text-ink mb-6 leading-tight">
                                "High-Intensity Growth Container"
                            </h2>
                            <p className="text-ink/60 leading-relaxed font-light mb-8 max-w-lg">
                                You do not seek comfort; you seek evolution. Your blueprint is designed for relationships that challenge, expand, and transform you. Stability is secondary to truth.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {['Deep Bonding', 'Radical Honesty', 'Spiritual Ally'].map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-ink/5 border border-ink/5 text-[10px] uppercase tracking-widest text-ink/60">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* B. Score Cluster */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-5 bg-white border border-ink/10 p-8 lg:p-12 flex flex-col justify-between"
                    >
                        <h3 className="text-xs font-mono uppercase tracking-widest text-ink/40 mb-6">Core Vitals</h3>
                        <div className="space-y-6">
                            {SCORES.map((score, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-sm font-serif">{score.label}</span>
                                        <span className="text-lg font-display">{score.value}%</span>
                                    </div>
                                    <div className="w-full h-1 bg-ink/5 rounded-full overflow-hidden mb-2">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${score.value}%` }}
                                            transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                                            className="h-full bg-gold"
                                        />
                                    </div>
                                    <p className="text-[10px] text-ink/40">{score.desc}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>


                {/* 3. DEEP BLUEPRINT (2 Columns) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                    
                    {/* --- LEFT COLUMN: PSYCHOLOGY & PATTERNS --- */}
                    <div className="lg:col-span-7 space-y-16">
                        
                        {/* C. Strengths */}
                        <section>
                            <div className="flex items-center gap-3 mb-8 border-b border-ink/5 pb-4">
                                <Star size={18} className="text-gold" />
                                <h2 className="text-2xl font-display text-ink">Superpowers</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {STRENGTHS.map((s, i) => (
                                    <div key={i} className="bg-white p-6 border border-ink/5 shadow-sm hover:border-ink/20 transition-colors">
                                        <h4 className="font-serif text-lg mb-2">{s.title}</h4>
                                        <p className="text-xs text-ink/60 mb-4 leading-relaxed">{s.desc}</p>
                                        <div className="text-[10px] uppercase tracking-wider text-ink/40 border-t border-ink/5 pt-3">
                                            <span className="font-bold text-ink/60">Use:</span> {s.action}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* D. Friction Zones */}
                        <section>
                            <div className="flex items-center gap-3 mb-8 border-b border-ink/5 pb-4">
                                <AlertTriangle size={18} className="text-red-500" />
                                <h2 className="text-2xl font-display text-ink">Friction Zones</h2>
                            </div>
                            <div className="space-y-4">
                                {FRICTIONS.map((f, i) => (
                                    <div key={i} className="flex gap-6 p-6 bg-paper-light border-l-2 border-red-400">
                                        <div className="flex-1">
                                            <h4 className="font-serif text-lg text-ink mb-1">{f.title}</h4>
                                            <p className="text-xs text-ink/50 italic mb-3">Trigger: {f.trigger}</p>
                                            <p className="text-sm text-ink/80 leading-relaxed">{f.action}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* E. Attachment */}
                        <section>
                            <div className="flex items-center gap-3 mb-8 border-b border-ink/5 pb-4">
                                <Shield size={18} className="text-blue-500" />
                                <h2 className="text-2xl font-display text-ink">Attachment Architecture</h2>
                            </div>
                            <div className="bg-white border border-ink/10 p-8">
                                <div className="mb-8 text-center">
                                    <span className="text-[10px] uppercase tracking-widest text-ink/40">Primary Style</span>
                                    <div className="text-3xl font-serif text-ink mt-2">{ATTACHMENT.style}</div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <h4 className="text-[10px] uppercase tracking-widest text-green-600 font-bold mb-4 flex items-center gap-2">
                                            <CheckCircle2 size={12} /> Safety Signals
                                        </h4>
                                        <ul className="space-y-2">
                                            {ATTACHMENT.safe.map((item, i) => (
                                                <li key={i} className="text-sm text-ink/70 flex items-start gap-2">
                                                    <span className="w-1 h-1 rounded-full bg-ink/20 mt-2"></span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] uppercase tracking-widest text-red-500 font-bold mb-4 flex items-center gap-2">
                                            <AlertTriangle size={12} /> Threat Triggers
                                        </h4>
                                        <ul className="space-y-2">
                                            {ATTACHMENT.avoid.map((item, i) => (
                                                <li key={i} className="text-sm text-ink/70 flex items-start gap-2">
                                                    <span className="w-1 h-1 rounded-full bg-ink/20 mt-2"></span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* F. Ideal Partner */}
                        <section>
                            <div className="flex items-center gap-3 mb-8 border-b border-ink/5 pb-4">
                                <Heart size={18} className="text-pink-500" />
                                <h2 className="text-2xl font-display text-ink">Ideal Resonance</h2>
                            </div>
                            <div className="bg-ink text-paper p-8">
                                <p className="text-lg font-serif italic leading-relaxed text-center text-white/80 mb-8">
                                    "You require a partner who is grounded enough to hold your intensity, but open enough to travel with you into the depths."
                                </p>
                                <div className="flex flex-wrap justify-center gap-3">
                                    {['Emotional Courage', 'Intellectual Rigor', 'High Integrity', 'Playful Spirit'].map(trait => (
                                        <span key={trait} className="px-4 py-2 border border-white/20 text-xs uppercase tracking-widest hover:bg-white hover:text-ink transition-colors cursor-default">
                                            {trait}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </section>

                    </div>


                    {/* --- RIGHT COLUMN: ASTRO & ACTIONS --- */}
                    <div className="lg:col-span-5 space-y-12">
                        
                        {/* G. Astro Mechanics */}
                        <div className="bg-[#1a1a1a] text-[#F2F0E9] p-8 shadow-xl relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-8 text-gold">
                                    <Activity size={16} />
                                    <h3 className="text-xs uppercase tracking-[0.2em] font-bold">Astro Mechanics</h3>
                                </div>
                                
                                <div className="space-y-6">
                                    {ASTRO_MECHANICS.map((placement, i) => (
                                        <div key={i} className="group border-b border-white/10 pb-4 last:border-0 last:pb-0">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-sm font-bold text-gold group-hover:text-white transition-colors">{placement.planet}</span>
                                                <span className="text-[10px] uppercase tracking-widest opacity-50">{placement.sign} • {placement.house}</span>
                                            </div>
                                            <p className="text-xs opacity-60 leading-relaxed font-light">
                                                {placement.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Abstract Texture */}
                            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none"></div>
                        </div>

                        {/* H. Timing Windows */}
                        <div className="bg-white border border-ink/10 p-8">
                            <div className="flex items-center gap-3 mb-6 text-ink/40">
                                <Calendar size={16} />
                                <h3 className="text-xs uppercase tracking-[0.2em] font-bold">Timing Windows</h3>
                            </div>
                            <div className="space-y-4">
                                {TIMING.map((t, i) => (
                                    <div key={i} className="flex gap-4 items-start">
                                        <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${t.type === 'Favorable' ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                                        <div>
                                            <div className="text-xs font-mono text-ink/40 mb-1">{t.range}</div>
                                            <div className="text-sm font-serif text-ink">{t.reason}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* I. Actions Panel */}
                        <div className="space-y-3 sticky top-24">
                            <button 
                                onClick={() => onNavigate('corridor-matches')}
                                className="w-full py-4 bg-ink text-paper text-xs uppercase tracking-[0.25em] hover:bg-gold hover:text-white transition-colors shadow-lg flex items-center justify-center gap-3"
                            >
                                <Users size={14} /> Enter Match Feed
                            </button>
                            <button className="w-full py-4 bg-white border border-ink/10 text-ink text-xs uppercase tracking-[0.25em] hover:border-ink transition-colors flex items-center justify-center gap-3">
                                <MessageCircle size={14} /> Ask The Oracle
                            </button>
                            <button className="w-full py-4 bg-white border border-ink/10 text-ink text-xs uppercase tracking-[0.25em] hover:border-ink transition-colors flex items-center justify-center gap-3">
                                <Brain size={14} /> Talk to The Lover
                            </button>
                        </div>

                    </div>

                </div>


                {/* 4. BOTTOM: USAGE CHECKLIST */}
                <div className="border-t border-ink/10 mt-20 pt-16 pb-20 text-center max-w-2xl mx-auto">
                    <h3 className="text-2xl font-display mb-8">How to use this blueprint</h3>
                    <div className="flex flex-col sm:flex-row justify-center gap-8 mb-12 text-left">
                        {[
                            'Set your intention before swiping.',
                            'Filter matches by your non-negotiables.',
                            'Pause when you feel a friction trigger.'
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full border border-ink/20 flex items-center justify-center text-xs font-mono text-ink/40 flex-shrink-0">{i+1}</div>
                                <p className="text-sm text-ink/70 leading-relaxed font-serif">{item}</p>
                            </div>
                        ))}
                    </div>
                    <button 
                        onClick={() => onNavigate('corridor-matches')}
                        className="px-10 py-4 bg-gold text-ink font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors"
                    >
                        Enter Match Feed
                    </button>
                </div>

             </div>
        </div>
    );
};