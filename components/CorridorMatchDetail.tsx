import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Heart, MessageCircle, MoreHorizontal, 
  MapPin, Star, Shield, Zap, Activity, Calendar, 
  CheckCircle2, AlertTriangle, ArrowRight, User, 
  Lock, Mic, Play, Pause, ChevronRight, Sparkles,
  Download, Brain
} from 'lucide-react';

interface CorridorMatchDetailProps {
    onNavigate: (view: any) => void;
    onBack: () => void;
}

// --- MOCK DATA ---

const PROFILE = {
    id: 1,
    name: 'Elena R.',
    age: 28,
    city: 'London',
    distance: '4 km',
    intent: 'Soul Union',
    bio: "Architect by day, mystic by night. Seeking someone who can hold space for high intensity and deep silence. I value radical honesty over polite comfort.",
    values: ['Authenticity', 'Growth', 'Spirituality', 'Creativity'],
    lifestyle: ['Sober Curious', 'Early Riser', 'Art Collector'],
    lookingFor: "A partner who has done their shadow work.",
    voiceIntro: true
};

const COMPATIBILITY = {
    score: 98,
    breakdown: { safety: 85, attraction: 99, growth: 92 },
    oracleLine: "Her Pluto sits exactly on your Ascendant. This is not a casual meeting; it is a transformation event.",
    strengths: [
        { title: 'Psychic Tether', desc: 'You communicate without words. Highly intuitive link.', action: 'Trust your gut feelings about her; they are accurate.' },
        { title: 'Creative Fuel', desc: 'Her fire fuels your air. You inspire each other endlessly.', action: 'Collaborate on a project early on.' },
        { title: 'Karmic Recognition', desc: 'A sense of "I know you" from the first moment.', action: 'Skip the small talk. Go deep immediately.' }
    ],
    frictions: [
        { title: 'Power Struggles', trigger: 'Both desiring control.', why: 'Fixed sign clash (Leo vs Scorpio).', action: 'Practice yielding when it does not matter.' },
        { title: 'Emotional Volatility', trigger: 'Unspoken resentments.', why: 'Water moon amplifies feelings.', action: 'Establish a "safe word" for timeouts.' }
    ],
    communication: {
        style: 'Intense & Direct',
        do: ['Speak your full truth', 'Maintain eye contact', 'Ask "why"'],
        dont: ['Hide your feelings', 'Use passive aggression', 'Ghost'],
        repair: "I feel disconnected right now. Can we reset?"
    },
    safety: {
        them: 'Consistency and emotional transparency.',
        you: 'Physical touch and verbal affirmation.',
        summary: 'High resonance, but requires vulnerability.'
    }
};

const ASTRO = [
    { label: 'Moon ☌ Moon', desc: 'Emotional telepathy. You feel what she feels.', type: 'strength' },
    { label: 'Venus □ Mars', desc: 'High sexual tension, but potential conflict.', type: 'friction' },
    { label: 'Sun △ Jupiter', desc: 'Growth, optimism, and shared philosophy.', type: 'strength' },
    { label: 'Saturn ☍ Mercury', desc: 'Communication blocks if not careful.', type: 'friction' }
];

const TIMING = [
    { range: 'Oct 28 - Nov 02', type: 'Golden', reason: 'Venus trine Natal Sun. Magnetic attraction peak.' },
    { range: 'Nov 14 - Nov 16', type: 'Caution', reason: 'Mars square Pluto. potential for power plays.' }
];

const STARTERS = [
    "I see you're into 'Radical Honesty'. What's a hard truth you've learned recently?",
    "Your chart suggests a Scorpio Moon. How do you handle emotional intensity?",
    "Our synastry shows a 'Psychic Tether'. Have you felt that with anyone before?"
];

export const CorridorMatchDetail: React.FC<CorridorMatchDetailProps> = ({ onNavigate, onBack }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="min-h-screen bg-paper pt-28 pb-20 relative overflow-hidden">
             {/* Background Grid */}
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none grid-bg" />

             <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 space-y-12">
                
                {/* 1. BREADCRUMB & HEADER */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end border-b border-ink/5 pb-8 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-ink/40">
                            <button onClick={() => onNavigate('corridor')} className="hover:text-ink transition-colors">Corridor</button>
                            <ChevronRight size={10} />
                            <button onClick={onBack} className="hover:text-ink transition-colors">Matches</button>
                            <ChevronRight size={10} />
                            <span className="text-ink font-bold">Dossier: {PROFILE.name}</span>
                        </div>
                        
                        <div>
                            <div className="flex items-center gap-4 mb-2">
                                <h1 className="text-5xl font-display text-ink">{PROFILE.name}</h1>
                                <span className="px-3 py-1 bg-ink text-paper text-[10px] uppercase tracking-widest rounded-full">{PROFILE.intent}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm font-serif text-ink/60">
                                <span>{PROFILE.age} Cycles</span>
                                <span className="w-1 h-1 bg-ink/20 rounded-full"></span>
                                <span className="flex items-center gap-1"><MapPin size={12} /> {PROFILE.city} ({PROFILE.distance})</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="w-12 h-12 border border-ink/10 flex items-center justify-center hover:bg-ink hover:text-gold transition-colors bg-white rounded-full group">
                            <Heart size={18} className="group-hover:fill-current" />
                        </button>
                        <button 
                            onClick={() => onNavigate('corridor-chat')}
                            className="px-8 py-4 bg-ink text-paper text-xs uppercase tracking-[0.25em] hover:bg-gold hover:text-white transition-all shadow-lg flex items-center gap-3"
                        >
                            <MessageCircle size={16} /> Initiate Signal
                        </button>
                        <button className="w-12 h-12 border border-ink/10 flex items-center justify-center hover:bg-ink hover:text-paper transition-colors bg-white rounded-full">
                            <Sparkles size={18} />
                        </button>
                    </div>
                </div>


                {/* 2. PROFILE HERO */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* Left: Media */}
                    <div className="lg:col-span-5 space-y-4">
                        <div className="relative aspect-[3/4] bg-gradient-to-br from-purple-100 to-indigo-50 border border-ink/10 overflow-hidden">
                            {/* Abstract Persona Representation */}
                            <div className="absolute inset-0 flex items-center justify-center text-ink/10">
                                <User size={120} strokeWidth={0.5} />
                            </div>
                            <div className="absolute bottom-6 left-6 right-6">
                                {PROFILE.voiceIntro && (
                                    <div className="bg-white/90 backdrop-blur-md p-3 flex items-center gap-3 rounded-sm shadow-sm border border-ink/5">
                                        <button 
                                            onClick={() => setIsPlaying(!isPlaying)}
                                            className="w-8 h-8 bg-ink text-paper flex items-center justify-center hover:bg-gold transition-colors rounded-full"
                                        >
                                            {isPlaying ? <Pause size={12} /> : <Play size={12} />}
                                        </button>
                                        <div className="flex-1">
                                            <div className="h-6 flex items-center gap-0.5">
                                                {[...Array(20)].map((_, i) => (
                                                    <motion.div 
                                                        key={i}
                                                        className="w-1 bg-ink/20 rounded-full"
                                                        animate={{ height: isPlaying ? [4, 12, 4] : 4 }}
                                                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05 }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-mono text-ink/40">0:15</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {[1,2,3,4].map(i => (
                                <div key={i} className="aspect-square bg-ink/5 border border-ink/10 cursor-pointer hover:border-ink/40 transition-colors"></div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Snapshot */}
                    <div className="lg:col-span-7 flex flex-col justify-center">
                        <div className="mb-10">
                            <h3 className="text-xs font-mono uppercase tracking-widest text-ink/40 mb-4">Bio-Frequency</h3>
                            <p className="text-2xl font-serif text-ink leading-relaxed">
                                "{PROFILE.bio}"
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xs font-mono uppercase tracking-widest text-ink/40 mb-3">Core Values</h3>
                                <div className="flex flex-wrap gap-2">
                                    {PROFILE.values.map(val => (
                                        <span key={val} className="px-4 py-2 border border-ink/10 bg-white text-xs uppercase tracking-widest">
                                            {val}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xs font-mono uppercase tracking-widest text-ink/40 mb-3">Lifestyle Protocols</h3>
                                <div className="flex flex-wrap gap-2">
                                    {PROFILE.lifestyle.map(val => (
                                        <span key={val} className="px-4 py-2 bg-ink/5 text-ink/60 text-xs uppercase tracking-widest">
                                            {val}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 bg-[#FDFBF7] border border-ink/10 border-l-2 border-l-gold">
                                <h3 className="text-[10px] font-bold uppercase tracking-widest text-gold mb-2">The Ask</h3>
                                <p className="font-serif italic text-ink/80 text-lg">
                                    "{PROFILE.lookingFor}"
                                </p>
                            </div>
                        </div>
                    </div>

                </div>


                {/* 3. COMPATIBILITY PANEL */}
                <div className="border-t border-ink/5 pt-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                        
                        {/* Overall Score */}
                        <div className="lg:col-span-4 bg-ink text-paper p-8 flex flex-col justify-between relative overflow-hidden shadow-xl">
                            <div className="relative z-10">
                                <h3 className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Overall Resonance</h3>
                                <div className="text-7xl font-display text-white mb-2">{COMPATIBILITY.score}%</div>
                                <div className="text-sm text-gold font-serif italic">"Soul Contract"</div>
                            </div>
                            
                            <div className="relative z-10 mt-8 space-y-4">
                                <div>
                                    <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/40 mb-1">
                                        <span>Safety</span> <span>{COMPATIBILITY.breakdown.safety}%</span>
                                    </div>
                                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div style={{ width: `${COMPATIBILITY.breakdown.safety}%` }} className="h-full bg-blue-400"></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/40 mb-1">
                                        <span>Attraction</span> <span>{COMPATIBILITY.breakdown.attraction}%</span>
                                    </div>
                                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div style={{ width: `${COMPATIBILITY.breakdown.attraction}%` }} className="h-full bg-red-400"></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/40 mb-1">
                                        <span>Growth</span> <span>{COMPATIBILITY.breakdown.growth}%</span>
                                    </div>
                                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div style={{ width: `${COMPATIBILITY.breakdown.growth}%` }} className="h-full bg-gold"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Abstract BG */}
                            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
                        </div>

                        {/* Oracle Insight */}
                        <div className="lg:col-span-8 bg-white border border-ink/10 p-10 flex flex-col justify-center items-center text-center relative overflow-hidden">
                            <Sparkles className="text-gold mb-6" size={24} />
                            <h3 className="text-3xl lg:text-4xl font-serif text-ink leading-tight mb-6 relative z-10">
                                "{COMPATIBILITY.oracleLine}"
                            </h3>
                            <button className="text-[10px] uppercase tracking-widest text-ink/40 hover:text-ink border-b border-transparent hover:border-ink transition-all">
                                View Full Synastry Report
                            </button>
                            {/* Texture */}
                            <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none"></div>
                        </div>

                    </div>
                </div>


                {/* 4. MAIN ANALYSIS (2 Columns) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
                    
                    {/* --- LEFT: PSYCHOLOGY & DYNAMICS --- */}
                    <div className="lg:col-span-7 space-y-12">
                        
                        {/* Strengths */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <Star size={16} className="text-gold" />
                                <h3 className="text-lg font-serif text-ink">Points of Flow</h3>
                            </div>
                            <div className="space-y-4">
                                {COMPATIBILITY.strengths.map((item, i) => (
                                    <div key={i} className="bg-white border border-ink/10 p-6 hover:shadow-sm transition-shadow">
                                        <h4 className="font-bold text-sm uppercase tracking-wider mb-2 text-ink">{item.title}</h4>
                                        <p className="text-sm text-ink/70 mb-4">{item.desc}</p>
                                        <div className="text-[10px] uppercase tracking-widest text-gold font-bold flex items-center gap-2">
                                            <ArrowRight size={10} /> {item.action}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Frictions */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <AlertTriangle size={16} className="text-red-500" />
                                <h3 className="text-lg font-serif text-ink">Friction Zones</h3>
                            </div>
                            <div className="space-y-4">
                                {COMPATIBILITY.frictions.map((item, i) => (
                                    <div key={i} className="bg-paper-light border-l-2 border-red-400 p-6">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-bold text-sm uppercase tracking-wider text-ink">{item.title}</h4>
                                            <span className="text-[9px] text-red-500 uppercase tracking-widest">Trigger: {item.trigger}</span>
                                        </div>
                                        <p className="text-sm text-ink/70 mb-4 italic">"{item.why}"</p>
                                        <div className="text-[10px] uppercase tracking-widest text-ink/40 font-bold flex items-center gap-2">
                                            <Shield size={10} /> Mitigation: {item.action}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Communication */}
                        <section className="bg-ink text-paper p-8">
                            <h3 className="text-lg font-serif text-white mb-6 flex items-center gap-2">
                                <MessageCircle size={16} /> Communication Architecture
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <div>
                                    <span className="text-[10px] uppercase tracking-widest text-green-400 mb-3 block font-bold">Do This</span>
                                    <ul className="space-y-2">
                                        {COMPATIBILITY.communication.do.map((d, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm text-white/80">
                                                <CheckCircle2 size={12} className="text-green-400" /> {d}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <span className="text-[10px] uppercase tracking-widest text-red-400 mb-3 block font-bold">Avoid This</span>
                                    <ul className="space-y-2">
                                        {COMPATIBILITY.communication.dont.map((d, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm text-white/80">
                                                <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div> {d}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="p-4 bg-white/10 border border-white/10 rounded-sm">
                                <span className="text-[9px] uppercase tracking-widest text-white/40 block mb-2">Repair Phrase</span>
                                <p className="font-serif italic text-lg text-white">"{COMPATIBILITY.communication.repair}"</p>
                            </div>
                        </section>

                    </div>


                    {/* --- RIGHT: ASTRO & ACTIONS --- */}
                    <div className="lg:col-span-5 space-y-12">
                        
                        {/* Synastry Matrix */}
                        <div className="bg-white border border-ink/10 p-8">
                            <div className="flex items-center gap-3 mb-6 text-ink/40">
                                <Activity size={16} />
                                <h3 className="text-xs uppercase tracking-[0.2em] font-bold">Astro-Mechanics</h3>
                            </div>
                            
                            <div className="space-y-6">
                                {ASTRO.map((aspect, i) => (
                                    <div key={i} className="group border-b border-ink/5 pb-4 last:border-0 last:pb-0">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-sm font-serif font-bold text-ink">{aspect.label}</span>
                                            <span className={`text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-sm ${aspect.type === 'strength' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                                {aspect.type}
                                            </span>
                                        </div>
                                        <p className="text-xs text-ink/60 leading-relaxed">
                                            {aspect.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Timing Windows */}
                        <div className="bg-[#FDFBF7] border border-ink/10 p-8">
                            <div className="flex items-center gap-3 mb-6 text-ink/40">
                                <Calendar size={16} />
                                <h3 className="text-xs uppercase tracking-[0.2em] font-bold">Timing Windows</h3>
                            </div>
                            <div className="space-y-4">
                                {TIMING.map((t, i) => (
                                    <div key={i} className="flex gap-4 items-start">
                                        <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${t.type === 'Golden' ? 'bg-gold animate-pulse' : 'bg-red-400'}`}></div>
                                        <div>
                                            <div className="text-xs font-mono text-ink/40 mb-1">{t.range}</div>
                                            <div className="text-sm font-serif text-ink">{t.reason}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Conversation Starters */}
                        <div className="bg-white border border-ink/10 p-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-6 text-ink/40">
                                <MessageCircle size={16} />
                                <h3 className="text-xs uppercase tracking-[0.2em] font-bold">Icebreakers</h3>
                            </div>
                            <div className="space-y-3">
                                {STARTERS.map((s, i) => (
                                    <button key={i} className="w-full text-left p-3 border border-ink/10 hover:border-gold hover:bg-paper-light transition-all text-sm font-serif text-ink/80 italic leading-relaxed">
                                        "{s}"
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Action Stack */}
                        <div className="space-y-3 sticky top-32">
                            <button 
                                onClick={() => onNavigate('corridor-chat')}
                                className="w-full py-4 bg-ink text-paper text-xs uppercase tracking-[0.25em] hover:bg-gold hover:text-white transition-colors shadow-lg flex items-center justify-center gap-3"
                            >
                                <MessageCircle size={14} /> Start Conversation
                            </button>
                            <button className="w-full py-4 bg-white border border-ink/10 text-ink text-xs uppercase tracking-[0.25em] hover:border-ink transition-colors flex items-center justify-center gap-3">
                                <Download size={14} /> Full Relationship Report
                            </button>
                            <button className="w-full py-4 bg-white border border-ink/10 text-ink text-xs uppercase tracking-[0.25em] hover:border-ink transition-colors flex items-center justify-center gap-3">
                                <Brain size={14} /> Consult The Lover Guide
                            </button>
                        </div>

                    </div>

                </div>

             </div>
        </div>
    );
};