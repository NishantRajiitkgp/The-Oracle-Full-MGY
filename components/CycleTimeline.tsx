import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Calendar, Clock, Activity, 
  CheckCircle2, XCircle, AlertTriangle, 
  ChevronDown, ChevronUp, ChevronRight,
  Sparkles, FileText, Download, Share2,
  Briefcase, Heart, Brain, Zap, Send,
  ArrowRight, Star, Shield, Filter, Save
} from 'lucide-react';

interface CycleTimelineProps {
    onNavigate: (view: any) => void;
    onBack: () => void;
}

// --- MOCK DATA ---

const CYCLE_DATA = {
    name: "The Saturn Return",
    theme: "Structural Maturity",
    impact: "Career & Authority",
    intensity: 94,
    startDate: "Jan 15, 2026",
    endDate: "Nov 20, 2026",
    daysRemaining: 142,
    progress: 65, // Percentage
    summary: "A defining threshold of adulthood. The dismantling of false structures to build a foundation that can hold your true weight."
};

const PHASES = [
    {
        id: 1,
        title: "The Awakening",
        dates: "Jan 15 - Mar 30",
        status: 'completed',
        theme: "Awareness of Limitation",
        desc: "You realized that old methods were no longer yielding results. A sense of heaviness and restriction initiated the process."
    },
    {
        id: 2,
        title: "The Pressurization",
        dates: "Apr 01 - Jul 15",
        status: 'completed',
        theme: "Decision & Conflict",
        desc: "External pressures forced a choice. You likely had to cut ties, quit a role, or set a hard boundary."
    },
    {
        id: 3,
        title: "The Stabilization",
        dates: "Jul 16 - Sep 30",
        status: 'active',
        theme: "Building the New",
        desc: "The dust settles. You are now laying the first bricks of the new structure. Routine and discipline are your gods now."
    },
    {
        id: 4,
        title: "The Integration",
        dates: "Oct 01 - Nov 20",
        status: 'upcoming',
        theme: "Embodiment",
        desc: "The lessons become muscle memory. You step into a new level of authority without imposter syndrome."
    }
];

const IMPACT_AREAS = [
    { label: 'Career / Reputation', level: 'High', note: 'Expect a title change or role shift.' },
    { label: 'Authority Figures', level: 'Med', note: 'Friction with older mentors or bosses.' },
    { label: 'Long-term Vision', level: 'High', note: 'Complete rewrite of the 10-year plan.' },
    { label: 'Physical Vitality', level: 'Low', note: 'Bones/teeth sensitivity possible.' }
];

const GUIDANCE = {
    do: [
        "Commit to one difficult project and finish it.",
        "Take responsibility for past failures without shame.",
        "Seek mentorship from someone 20 years older.",
        "Automate your finances and savings."
    ],
    avoid: [
        "Blaming external circumstances for delays.",
        "Quitting when the resistance feels highest.",
        "Seeking validation from peers instead of results.",
        "Starting entirely new ventures without planning."
    ]
};

const TRANSITS = [
    { name: "Saturn Conjunct Sun", type: 'challenging', intensity: 95, date: "Feb 20 - Nov 15", desc: "The core pressure driver. Testing your ego and vitality." },
    { name: "Pluto Trine Mars", type: 'supportive', intensity: 80, date: "Aug 10 - Sep 05", desc: "Provides the deep energy reserves needed to build." },
    { name: "Jupiter Square Saturn", type: 'challenging', intensity: 60, date: "May 12 - Jun 30", desc: "The tension between expansion and restriction." }
];

const TIMING_WINDOWS = [
    { type: 'favorable', dates: "Aug 15 - Sep 01", reason: "Grand Earth Trine supports materialization." },
    { type: 'caution', dates: "Sep 15 - Sep 22", reason: "Mercury Retrograde conjunct Saturn. Delays likely." },
    { type: 'favorable', dates: "Nov 01 - Nov 10", reason: "Sun enters Scorpio. Power moves favored." }
];

const ACTION_PLAN = [
    { id: 1, text: "Define the 'Magnum Opus' project", checked: true },
    { id: 2, text: "Audit all recurring expenses", checked: true },
    { id: 3, text: "Establish a 6:00 AM protocol", checked: false },
    { id: 4, text: "Repair relationship with father figure", checked: false },
    { id: 5, text: "Update professional portfolio", checked: false }
];

const SUGGESTED_REPORTS = [
    { title: "Career & Vocation", category: "Work" },
    { title: "The Saturn Return Guide", category: "Midlife" },
    { title: "Authority Dynamics", category: "Psychology" }
];

export const CycleTimeline: React.FC<CycleTimelineProps> = ({ onNavigate, onBack }) => {
    const [timeView, setTimeView] = useState('Current');
    const [actionList, setActionList] = useState(ACTION_PLAN);
    const [activeWeek, setActiveWeek] = useState<number | null>(null);

    const toggleAction = (id: number) => {
        setActionList(prev => prev.map(item => 
            item.id === id ? { ...item, checked: !item.checked } : item
        ));
    };

    return (
        <div className="min-h-screen bg-paper pt-32 pb-20 relative overflow-hidden">
             {/* Background Grid */}
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none grid-bg" />

             <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 space-y-12">
                
                {/* 1. HEADER & BREADCRUMB */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-ink/5 pb-8 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-ink/40">
                            <button onClick={onBack} className="hover:text-ink transition-colors">Observatory</button>
                            <ChevronRight size={10} />
                            <span className="text-ink font-bold">Current Cycle</span>
                        </div>
                        
                        <div>
                            <h1 className="text-4xl lg:text-5xl font-display text-ink mb-2">Cycle Architecture</h1>
                            <p className="text-lg text-ink/60 font-serif max-w-xl">
                                Your active phase, its themes, and how to navigate the current weather.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-4 w-full md:w-auto">
                        <div className="flex bg-white border border-ink/10 rounded-sm p-1">
                            {['Current', 'Next 30 Days', 'Full Cycle'].map(view => (
                                <button 
                                    key={view}
                                    onClick={() => setTimeView(view)}
                                    className={`px-4 py-2 text-[10px] uppercase tracking-widest transition-all ${timeView === view ? 'bg-ink text-paper' : 'text-ink/40 hover:text-ink'}`}
                                >
                                    {view}
                                </button>
                            ))}
                        </div>
                        <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-ink/40 hover:text-ink transition-colors">
                            <Download size={14} /> Export Summary
                        </button>
                    </div>
                </div>


                {/* 2. HERO SUMMARY CARD */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-ink text-paper p-8 lg:p-12 relative overflow-hidden shadow-2xl rounded-sm"
                >
                    {/* Abstract BG */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
                    
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-8 space-y-6">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-white/10 border border-white/10 text-[10px] uppercase tracking-widest rounded-full text-gold">
                                    {CYCLE_DATA.impact}
                                </span>
                                <span className="text-[10px] uppercase tracking-widest text-white/40 flex items-center gap-2">
                                    <Activity size={12} /> Intensity: {CYCLE_DATA.intensity}%
                                </span>
                            </div>
                            
                            <div>
                                <h2 className="text-5xl lg:text-6xl font-display mb-4">{CYCLE_DATA.name}</h2>
                                <p className="text-xl font-serif text-white/60 leading-relaxed max-w-2xl">
                                    "{CYCLE_DATA.summary}"
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <button 
                                    onClick={() => onNavigate('guides-chat')}
                                    className="px-8 py-3 bg-gold text-ink font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2"
                                >
                                    <Sparkles size={14} /> Ask The Strategist
                                </button>
                                <button 
                                    onClick={() => onNavigate('report-detail')}
                                    className="px-8 py-3 border border-white/20 text-white text-xs uppercase tracking-widest hover:bg-white hover:text-ink transition-colors flex items-center gap-2"
                                >
                                    <FileText size={14} /> Full Cycle Report
                                </button>
                            </div>
                        </div>

                        <div className="lg:col-span-4 flex flex-col justify-center items-center lg:items-end">
                            {/* Circular Progress (Simplified Visual) */}
                            <div className="relative w-48 h-48 flex items-center justify-center mb-6 flex-shrink-0">
                                <svg className="w-full h-full -rotate-90" viewBox="0 0 192 192">
                                    {/* Track */}
                                    <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="2" className="text-white/10" fill="none" />
                                    {/* Progress */}
                                    <circle 
                                        cx="96" cy="96" r="88" 
                                        stroke="currentColor" strokeWidth="4" 
                                        className="text-gold" 
                                        fill="none" 
                                        strokeDasharray={552} 
                                        strokeDashoffset={552 - (552 * CYCLE_DATA.progress) / 100}
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                    <span className="text-4xl font-display">{CYCLE_DATA.daysRemaining}</span>
                                    <span className="text-[9px] uppercase tracking-widest text-white/40">Days Left</span>
                                </div>
                            </div>
                            
                            <div className="text-right space-y-1">
                                <div className="text-xs font-mono text-white/40 uppercase tracking-widest">Duration</div>
                                <div className="text-sm font-serif">{CYCLE_DATA.startDate} — {CYCLE_DATA.endDate}</div>
                            </div>
                        </div>
                    </div>
                </motion.div>


                {/* 3. MAIN CONTENT GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
                    
                    {/* --- LEFT COLUMN: TIMELINE & GUIDANCE --- */}
                    <div className="lg:col-span-7 space-y-16">
                        
                        {/* A. Phases Timeline */}
                        <section>
                            <div className="flex items-center gap-3 mb-8">
                                <Clock size={18} className="text-ink/40" />
                                <h3 className="text-xl font-display text-ink">Chronology</h3>
                            </div>
                            
                            <div className="space-y-0 relative border-l border-ink/10 ml-3">
                                {PHASES.map((phase, i) => (
                                    <div key={i} className="relative pl-12 pb-12 last:pb-0 group">
                                        {/* Node */}
                                        <div className={`absolute -left-[5px] top-2 w-[11px] h-[11px] rounded-full border-2 transition-colors z-10 ${
                                            phase.status === 'completed' ? 'bg-ink border-ink' : 
                                            phase.status === 'active' ? 'bg-gold border-gold scale-125 shadow-[0_0_0_4px_rgba(212,175,55,0.2)]' : 
                                            'bg-paper border-ink/20'
                                        }`}></div>
                                        
                                        <div className={`transition-opacity ${phase.status === 'upcoming' ? 'opacity-50' : 'opacity-100'}`}>
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                                                <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-sm w-fit ${
                                                    phase.status === 'active' ? 'bg-gold text-ink font-bold' : 'bg-ink/5 text-ink/40'
                                                }`}>
                                                    Phase 0{phase.id}
                                                </span>
                                                <span className="text-xs font-mono text-ink/40">{phase.dates}</span>
                                            </div>
                                            
                                            <h4 className={`text-xl font-serif mb-2 ${phase.status === 'active' ? 'text-ink' : 'text-ink/70'}`}>
                                                {phase.title}: {phase.theme}
                                            </h4>
                                            
                                            <p className="text-sm text-ink/60 font-light leading-relaxed max-w-lg">
                                                {phase.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* B. Impact Areas */}
                        <section>
                            <div className="flex items-center gap-3 mb-8">
                                <Activity size={18} className="text-ink/40" />
                                <h3 className="text-xl font-display text-ink">Impact Zones</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {IMPACT_AREAS.map((area, i) => (
                                    <div key={i} className="bg-white border border-ink/10 p-5 hover:shadow-sm transition-shadow">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="font-bold text-sm text-ink">{area.label}</span>
                                            <span className={`text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full ${
                                                area.level === 'High' ? 'bg-red-50 text-red-600' : 
                                                area.level === 'Med' ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'
                                            }`}>
                                                {area.level} Impact
                                            </span>
                                        </div>
                                        <p className="text-xs text-ink/60 leading-relaxed">
                                            {area.note}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* C. Do's and Don'ts */}
                        <section>
                            <div className="flex items-center gap-3 mb-8">
                                <Shield size={18} className="text-ink/40" />
                                <h3 className="text-xl font-display text-ink">Protocols</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-green-50/50 border border-green-100 p-6 rounded-sm">
                                    <h4 className="flex items-center gap-2 text-green-700 font-bold text-xs uppercase tracking-widest mb-4">
                                        <CheckCircle2 size={14} /> Recommended
                                    </h4>
                                    <ul className="space-y-3">
                                        {GUIDANCE.do.map((item, i) => (
                                            <li key={i} className="text-sm text-ink/70 flex items-start gap-2 leading-relaxed">
                                                <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-red-50/50 border border-red-100 p-6 rounded-sm">
                                    <h4 className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-widest mb-4">
                                        <XCircle size={14} /> Avoid
                                    </h4>
                                    <ul className="space-y-3">
                                        {GUIDANCE.avoid.map((item, i) => (
                                            <li key={i} className="text-sm text-ink/70 flex items-start gap-2 leading-relaxed">
                                                <div className="w-1 h-1 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </section>

                    </div>


                    {/* --- RIGHT COLUMN: TOOLS & CONTEXT --- */}
                    <div className="lg:col-span-5 space-y-12">
                        
                        {/* D. Key Transits (Drivers) */}
                        <div className="bg-white border border-ink/10 p-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-6 text-ink/40">
                                <Sparkles size={16} />
                                <h3 className="text-xs uppercase tracking-[0.2em] font-bold">Transit Drivers</h3>
                            </div>
                            <div className="space-y-6">
                                {TRANSITS.map((transit, i) => (
                                    <div key={i} className="group border-b border-ink/5 pb-4 last:border-0 last:pb-0">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-serif text-ink font-bold group-hover:text-gold transition-colors">{transit.name}</span>
                                            <span className={`text-[9px] uppercase tracking-widest ${transit.type === 'challenging' ? 'text-red-500' : 'text-green-500'}`}>
                                                {transit.type}
                                            </span>
                                        </div>
                                        <div className="text-[10px] font-mono text-ink/30 mb-2">{transit.date} • Intensity {transit.intensity}%</div>
                                        <p className="text-xs text-ink/60 leading-relaxed">
                                            {transit.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* E. Timing Windows */}
                        <div className="bg-paper-light border border-ink/10 p-8">
                            <div className="flex items-center gap-3 mb-6 text-ink/40">
                                <Calendar size={16} />
                                <h3 className="text-xs uppercase tracking-[0.2em] font-bold">Timing Windows</h3>
                            </div>
                            <div className="space-y-4">
                                {TIMING_WINDOWS.map((window, i) => (
                                    <div key={i} className="flex gap-4 items-start">
                                        <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${window.type === 'favorable' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                        <div>
                                            <div className="text-xs font-mono text-ink/40 mb-1">{window.dates}</div>
                                            <div className="text-sm font-serif text-ink">{window.reason}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* F. Action Plan */}
                        <div className="bg-ink text-paper p-8 shadow-xl relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-2 text-gold">
                                        <CheckCircle2 size={16} />
                                        <h3 className="text-xs uppercase tracking-[0.2em] font-bold">Action Plan</h3>
                                    </div>
                                    <span className="text-[10px] text-white/40">{actionList.filter(a => a.checked).length}/{actionList.length} Done</span>
                                </div>
                                
                                <div className="space-y-3">
                                    {actionList.map((action) => (
                                        <div 
                                            key={action.id}
                                            onClick={() => toggleAction(action.id)}
                                            className={`flex items-start gap-3 cursor-pointer group p-2 rounded-sm transition-colors ${action.checked ? 'bg-white/5' : 'hover:bg-white/5'}`}
                                        >
                                            <div className={`mt-0.5 w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${action.checked ? 'bg-gold border-gold text-ink' : 'border-white/20 group-hover:border-white/40'}`}>
                                                {action.checked && <CheckCircle2 size={12} />}
                                            </div>
                                            <span className={`text-sm font-light transition-opacity ${action.checked ? 'opacity-40 line-through' : 'opacity-90'}`}>
                                                {action.text}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <button className="w-full mt-8 py-3 border border-white/20 text-xs uppercase tracking-widest hover:bg-white hover:text-ink transition-colors flex items-center justify-center gap-2">
                                    <Save size={12} /> Save to Path Notes
                                </button>
                            </div>
                        </div>

                        {/* G. Quick Ask */}
                        <div className="bg-white border border-ink/10 p-6 shadow-sm">
                            <label className="text-[10px] uppercase tracking-widest text-ink/40 mb-3 block">Query the Field</label>
                            <div className="relative mb-3">
                                <input 
                                    type="text" 
                                    placeholder="Ask about this cycle..." 
                                    className="w-full bg-paper-light border border-ink/10 py-3 pl-4 pr-12 text-sm font-serif focus:outline-none focus:border-gold transition-colors"
                                />
                                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-ink text-paper rounded-sm hover:bg-gold transition-colors">
                                    <Send size={12} />
                                </button>
                            </div>
                            <div className="flex gap-2">
                                <button className="px-2 py-1 border border-ink/10 text-[9px] uppercase tracking-widest text-ink/50 hover:border-ink hover:text-ink">Strategist</button>
                                <button className="px-2 py-1 border border-ink/10 text-[9px] uppercase tracking-widest text-ink/50 hover:border-ink hover:text-ink">Mystic</button>
                            </div>
                        </div>

                    </div>

                </div>


                {/* 4. BOTTOM: RELATED ASSETS */}
                <div className="border-t border-ink/5 pt-12 pb-20">
                    <h3 className="text-xs font-mono uppercase tracking-widest text-ink/40 mb-6 flex items-center gap-2">
                        <FileText size={12} /> Supporting Documents
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {SUGGESTED_REPORTS.map((report, i) => (
                            <div 
                                key={i} 
                                onClick={() => onNavigate('report-detail')}
                                className="bg-white border border-ink/10 p-6 hover:shadow-md transition-shadow cursor-pointer group"
                            >
                                <div className="text-[9px] uppercase tracking-widest text-ink/40 mb-2">{report.category}</div>
                                <h4 className="font-serif text-lg text-ink group-hover:text-gold transition-colors">{report.title}</h4>
                                <div className="mt-4 flex justify-end">
                                    <ArrowRight size={14} className="text-ink/20 group-hover:text-ink transition-colors" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

             </div>
        </div>
    );
};