import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, MessageCircle, Sparkles, Brain, Heart, 
  Briefcase, Users, Eye, Zap, ChevronRight, Play, 
  Settings, Clock, FileText, CheckCircle2, XCircle,
  ArrowRight, Activity, Database
} from 'lucide-react';

interface GuideDetailProps {
    guideId: string | null;
    onNavigate: (view: any) => void;
    onBack: () => void;
}

// --- MOCK DATA ---

const GUIDE_DATA = {
    id: 'mystic',
    name: 'The Mystic',
    domain: 'Self & Psychology',
    promise: 'Reveals the hidden architecture of your subconscious.',
    icon: Eye,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    identity: "An archetype forged from Jungian psychology and ancient esoteric traditions. The Mystic does not predict the future; it reveals the present patterns you are refusing to see. It speaks the language of symbols, dreams, and shadow.",
    expertise: ['Shadow Work', 'Dream Analysis', 'Spiritual Crisis', 'Intuition'],
    bestFor: [
        'Understanding recurring emotional patterns.',
        'Decoding dreams and symbols.',
        'Navigating "Dark Night of the Soul".',
        'Integrating suppressed parts of the self.'
    ],
    avoids: [
        'Simple "Yes/No" predictions.',
        'Financial investment advice.',
        'Surface-level affirmation.'
    ],
    outcomes: [
        'Clarity on subconscious blocks.',
        'Reduced anxiety through understanding.',
        'Actionable integration practices.'
    ]
};

const PROMPTS = [
    { text: "Why do I feel stuck lately?", category: 'Clarity' },
    { text: "What is my next step in life?", category: 'Purpose' },
    { text: "What am I avoiding emotionally?", category: 'Shadow' },
    { text: "What cycle am I in right now?", category: 'Timing' },
    { text: "What should I focus on this month?", category: 'Focus' },
    { text: "What truth do I need to accept?", category: 'Truth' },
    { text: "Interpret my recurring dream.", category: 'Dreams' },
    { text: "How do I find balance?", category: 'Healing' }
];

const REPORTS = [
    { title: 'The Shadow Work Guide', reason: 'Matches Mystic\'s expertise in subconscious integration.' },
    { title: 'Emotional Architecture', reason: 'Provides the baseline data for The Mystic\'s analysis.' },
    { title: 'Karmic Trajectory', reason: 'Aligns with the spiritual domain.' }
];

const SESSIONS = [
    { title: 'Recurring Dream Analysis', time: 'Yesterday', snippet: 'The water represents...' },
    { title: 'Anxiety about Future', time: 'Oct 12', snippet: 'Saturn is demanding...' },
    { title: 'Relationship Patterns', time: 'Sep 28', snippet: 'The mirror effect is...' }
];

export const GuideDetail: React.FC<GuideDetailProps> = ({ guideId, onNavigate, onBack }) => {
    // In a real app, use guideId to fetch data. Defaulting to Mystic for demo.
    const guide = GUIDE_DATA; 
    
    const [mode, setMode] = useState('Clarity');
    const [tone, setTone] = useState('Direct');
    const [context, setContext] = useState({
        chart: true,
        transits: true,
        notes: false
    });

    const toggleContext = (key: keyof typeof context) => {
        setContext(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="min-h-screen bg-paper pt-32 pb-20 relative overflow-hidden">
             {/* Background Grid */}
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none grid-bg" />

             <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 space-y-12">
                
                {/* 1. HEADER & BREADCRUMB */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-ink/5 pb-8 gap-8"
                >
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-ink/40">
                            <button onClick={onBack} className="hover:text-ink transition-colors">The Guides</button>
                            <ChevronRight size={10} />
                            <span className="text-ink font-bold">{guide.name}</span>
                        </div>
                        
                        <div>
                            <div className="flex items-center gap-4 mb-2">
                                <h1 className="text-5xl font-display text-ink">{guide.name}</h1>
                                <span className={`px-3 py-1 text-[10px] uppercase tracking-widest rounded-full ${guide.bg} ${guide.color}`}>
                                    {guide.domain}
                                </span>
                            </div>
                            <p className="text-lg text-ink/60 font-serif italic max-w-2xl">
                                "{guide.promise}"
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => onNavigate('guides-chat')}
                            className="px-8 py-4 bg-ink text-paper text-xs uppercase tracking-[0.25em] hover:bg-gold hover:text-white transition-all shadow-lg flex items-center gap-3"
                        >
                            <MessageCircle size={16} /> Start Session
                        </button>
                        <button className="w-12 h-12 border border-ink/10 flex items-center justify-center hover:bg-ink hover:text-paper transition-colors bg-white rounded-full">
                            <Play size={16} />
                        </button>
                    </div>
                </motion.div>


                {/* 2. PROFILE HERO */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* Left: Identity Card */}
                    <div className="lg:col-span-5 bg-white border border-ink/10 p-10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none">
                            <guide.icon size={200} strokeWidth={0.5} />
                        </div>
                        
                        <div className="relative z-10">
                            <div className={`w-16 h-16 rounded-full ${guide.bg} ${guide.color} flex items-center justify-center mb-8`}>
                                <guide.icon size={32} />
                            </div>
                            
                            <h3 className="text-xs font-mono uppercase tracking-widest text-ink/40 mb-4">Archetype Identity</h3>
                            <p className="text-ink/80 font-serif leading-relaxed mb-8">
                                {guide.identity}
                            </p>

                            <div className="space-y-3">
                                <h4 className="text-[10px] uppercase tracking-widest text-ink/40">Core Expertise</h4>
                                <div className="flex flex-wrap gap-2">
                                    {guide.expertise.map(exp => (
                                        <span key={exp} className="px-3 py-1 border border-ink/10 text-[10px] uppercase tracking-widest bg-paper-light">
                                            {exp}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Capabilities */}
                    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-[#FDFBF7] p-8 border border-ink/10">
                            <h3 className="text-xs font-mono uppercase tracking-widest text-ink/40 mb-6 flex items-center gap-2">
                                <CheckCircle2 size={12} className="text-green-600" /> Best For
                            </h3>
                            <ul className="space-y-3">
                                {guide.bestFor.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-ink/70 leading-relaxed">
                                        <div className="w-1 h-1 bg-ink/20 rounded-full mt-2"></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-8">
                            <div className="bg-white p-8 border border-ink/10">
                                <h3 className="text-xs font-mono uppercase tracking-widest text-ink/40 mb-6 flex items-center gap-2">
                                    <XCircle size={12} className="text-red-500" /> Out of Scope
                                </h3>
                                <ul className="space-y-3">
                                    {guide.avoids.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-ink/70 leading-relaxed">
                                            <div className="w-1 h-1 bg-red-200 rounded-full mt-2"></div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-ink text-paper p-8 shadow-lg">
                                <h3 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-4">Expected Outcome</h3>
                                <div className="space-y-2">
                                    {guide.outcomes.map((item, i) => (
                                        <div key={i} className="flex items-center gap-2 text-sm">
                                            <ArrowRight size={12} className="text-gold" />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


                {/* 3. PROMPTS & CALIBRATION */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
                    
                    {/* Left: Prompts Grid */}
                    <div className="lg:col-span-8">
                        <div className="flex items-center gap-3 mb-8">
                            <Sparkles size={16} className="text-gold" />
                            <h2 className="text-2xl font-display text-ink">Activation Keys</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {PROMPTS.map((prompt, i) => (
                                <button 
                                    key={i}
                                    onClick={() => onNavigate('guides-chat')}
                                    className="group text-left p-5 border border-ink/10 bg-white hover:border-gold hover:shadow-sm transition-all relative overflow-hidden"
                                >
                                    <div className="relative z-10">
                                        <span className="text-[9px] uppercase tracking-widest text-ink/30 mb-2 block group-hover:text-gold transition-colors">{prompt.category}</span>
                                        <p className="font-serif text-lg text-ink/80 group-hover:text-ink transition-colors">"{prompt.text}"</p>
                                    </div>
                                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                        <ArrowRight size={16} className="text-gold" />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Calibration Settings */}
                    <div className="lg:col-span-4 space-y-8">
                        
                        <div className="bg-white border border-ink/10 p-6 sticky top-32">
                            <div className="flex items-center gap-2 mb-6 text-ink/40">
                                <Settings size={14} />
                                <span className="text-xs font-mono uppercase tracking-widest">Session Calibration</span>
                            </div>

                            <div className="space-y-6">
                                {/* Mode */}
                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest text-ink/60 mb-3">Mode</label>
                                    <div className="flex gap-2">
                                        {['Clarity', 'Deep Dive', 'Action'].map(m => (
                                            <button 
                                                key={m}
                                                onClick={() => setMode(m)}
                                                className={`flex-1 py-2 text-[10px] uppercase tracking-widest border transition-colors ${mode === m ? 'bg-ink text-paper border-ink' : 'bg-transparent border-ink/10 text-ink/50 hover:border-ink/30'}`}
                                            >
                                                {m}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Tone */}
                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest text-ink/60 mb-3">Tone</label>
                                    <div className="flex gap-2">
                                        {['Direct', 'Gentle', 'Cryptic'].map(t => (
                                            <button 
                                                key={t}
                                                onClick={() => setTone(t)}
                                                className={`flex-1 py-2 text-[10px] uppercase tracking-widest border transition-colors ${tone === t ? 'bg-ink text-paper border-ink' : 'bg-transparent border-ink/10 text-ink/50 hover:border-ink/30'}`}
                                            >
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Context Toggles */}
                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest text-ink/60 mb-3">Context Data</label>
                                    <div className="space-y-2">
                                        <button onClick={() => toggleContext('chart')} className="w-full flex items-center justify-between p-3 border border-ink/5 hover:bg-ink/5 transition-colors">
                                            <div className="flex items-center gap-2">
                                                <Activity size={12} className={context.chart ? "text-gold" : "text-ink/20"} />
                                                <span className="text-xs text-ink/70">Birth Chart</span>
                                            </div>
                                            <div className={`w-2 h-2 rounded-full ${context.chart ? 'bg-green-500' : 'bg-ink/10'}`}></div>
                                        </button>
                                        <button onClick={() => toggleContext('transits')} className="w-full flex items-center justify-between p-3 border border-ink/5 hover:bg-ink/5 transition-colors">
                                            <div className="flex items-center gap-2">
                                                <Clock size={12} className={context.transits ? "text-gold" : "text-ink/20"} />
                                                <span className="text-xs text-ink/70">Live Transits</span>
                                            </div>
                                            <div className={`w-2 h-2 rounded-full ${context.transits ? 'bg-green-500' : 'bg-ink/10'}`}></div>
                                        </button>
                                    </div>
                                </div>

                                <button 
                                    onClick={() => onNavigate('guides-chat')}
                                    className="w-full py-4 bg-ink text-paper text-xs uppercase tracking-widest hover:bg-gold hover:text-white transition-colors flex items-center justify-center gap-2 shadow-md"
                                >
                                    Start Session <ArrowRight size={12} />
                                </button>
                            </div>
                        </div>

                    </div>

                </div>


                {/* 4. BOTTOM: REPORTS & HISTORY */}
                <div className="border-t border-ink/5 pt-12 pb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        
                        {/* Suggested Reports */}
                        <div>
                            <h3 className="text-xs font-mono uppercase tracking-widest text-ink/40 mb-6 flex items-center gap-2">
                                <FileText size={12} /> Suggested Reading
                            </h3>
                            <div className="space-y-4">
                                {REPORTS.map((report, i) => (
                                    <div key={i} className="flex items-start gap-4 p-4 bg-white border border-ink/10 hover:border-gold/30 transition-colors cursor-pointer group">
                                        <div className="mt-1 w-8 h-8 bg-ink/5 flex items-center justify-center text-ink/40 group-hover:text-gold transition-colors">
                                            <Database size={14} />
                                        </div>
                                        <div>
                                            <h4 className="font-serif text-sm font-bold text-ink mb-1 group-hover:text-gold transition-colors">{report.title}</h4>
                                            <p className="text-xs text-ink/50">{report.reason}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Past Sessions */}
                        <div>
                            <h3 className="text-xs font-mono uppercase tracking-widest text-ink/40 mb-6 flex items-center gap-2">
                                <Clock size={12} /> Recent Dialogues
                            </h3>
                            <div className="space-y-4">
                                {SESSIONS.map((session, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-white border border-ink/10 hover:border-ink/30 transition-colors cursor-pointer">
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <h4 className="font-serif text-sm font-bold text-ink">{session.title}</h4>
                                                <span className="text-[9px] text-ink/30 bg-ink/5 px-2 py-0.5 rounded-full">{session.time}</span>
                                            </div>
                                            <p className="text-xs text-ink/50 italic">"{session.snippet}"</p>
                                        </div>
                                        <ChevronRight size={14} className="text-ink/20" />
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

             </div>
        </div>
    );
};