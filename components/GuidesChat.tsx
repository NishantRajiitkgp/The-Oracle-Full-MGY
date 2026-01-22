import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Plus, MoreHorizontal, Paperclip, Send, 
  Sparkles, Brain, Heart, Briefcase, Users, Eye, 
  Clock, ArrowUpRight, Save, FileText, CheckCircle2,
  Calendar, RotateCcw, ChevronDown, ChevronRight,
  Zap, Lock, ArrowRight, Download, Activity, X
} from 'lucide-react';

interface GuidesChatProps {
    onNavigate: (view: any) => void;
    onBack: () => void;
}

// --- MOCK DATA ---

const SESSIONS = [
    { id: 1, title: 'Recurring Dream Analysis', guide: 'The Mystic', room: 'Self', time: 'Just now', preview: 'The water represents the emotional body...' },
    { id: 2, title: 'Career Pivot Strategy', guide: 'The Strategist', room: 'Work', time: 'Yesterday', preview: 'Leverage the Mars transit to push...' },
    { id: 3, title: 'Relationship Patterns', guide: 'The Lover', room: 'Love', time: 'Oct 20', preview: 'Venus retrograde is highlighting...' },
    { id: 4, title: 'Financial Blockages', guide: 'The Strategist', room: 'Wealth', time: 'Oct 15', preview: 'Scarcity mindset is rooted in...' }
];

const MESSAGES = [
    {
        id: 'msg-1',
        sender: 'user',
        content: "I keep having this dream where my childhood home is flooding, but the water is clear, not muddy. I'm not scared in the dream, just observing. What does this mean for my current transit?",
        timestamp: '10:23 AM'
    },
    {
        id: 'msg-2',
        sender: 'guide',
        guideId: 'mystic',
        content: [
            { type: 'text', value: "Water represents the emotional body, and the house is the architecture of the Self. That the water is clear suggests this is not a trauma response, but a <span class='text-gold italic font-medium'>cleansing</span>." },
            { type: 'insight', label: 'Pattern Recognition', value: "Your Moon in Scorpio is currently being aspected by Neptune. This dissolves boundaries between the conscious and subconscious." },
            { type: 'meaning', value: "The flood is not destruction; it is the rising tide of intuition that you have been suppressing in your waking life." },
            { type: 'action', value: "For the next 3 days, write down your first thought upon waking. Do not filter it." },
            { type: 'citation', source: 'Transit: Neptune Trine Moon', link: 'transit-123' }
        ],
        timestamp: '10:24 AM'
    }
];

const CONTEXT_DATA = {
    today: {
        alignment: 'High',
        window: '09:00 - 11:30',
        insight: 'Mercury trine Saturn favors structural analysis.'
    },
    cycle: {
        name: 'Saturn Return',
        progress: 65,
        phase: 'Integration',
        desc: 'Structuring the long-term self.'
    },
    archive: [
        { title: 'Emotional Architecture', type: 'Report' },
        { title: 'Moon in Scorpio', type: 'Concept' }
    ],
    notes: [
        { title: 'Dream Journal 01', date: 'Oct 22' },
        { title: 'Fear of drowning', date: 'Sep 15' }
    ]
};

export const GuidesChat: React.FC<GuidesChatProps> = ({ onNavigate, onBack }) => {
    const [activeTab, setActiveTab] = useState<'today' | 'cycle' | 'archive' | 'notes'>('today');
    const [input, setInput] = useState('');
    const [useChart, setUseChart] = useState(true);
    const [useTransits, setUseTransits] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

    const getGuideIcon = (name: string) => {
        if (name === 'The Mystic') return <Eye size={16} />;
        if (name === 'The Strategist') return <Briefcase size={16} />;
        if (name === 'The Lover') return <Heart size={16} />;
        return <Sparkles size={16} />;
    };

    const getRoomColor = (room: string) => {
        if (room === 'Self') return 'text-purple-600 bg-purple-50 border-purple-100';
        if (room === 'Work') return 'text-blue-600 bg-blue-50 border-blue-100';
        if (room === 'Love') return 'text-red-600 bg-red-50 border-red-100';
        return 'text-ink bg-gray-50 border-gray-200';
    };

    return (
        <div className="fixed inset-x-0 bottom-0 top-[88px] bg-[#FAF9F6] flex overflow-hidden border-t border-ink/5">
             
             {/* --- LEFT SIDEBAR (Sessions) --- */}
             <div className="hidden lg:flex w-80 flex-col border-r border-ink/5 bg-[#FAF9F6]">
                
                {/* Header */}
                <div className="h-16 px-5 flex justify-between items-center border-b border-ink/5">
                    <h2 className="font-sans text-sm font-medium text-ink tracking-wide">Recent Sessions</h2>
                    <button className="w-7 h-7 rounded-full border border-ink/10 flex items-center justify-center text-ink/40 hover:bg-ink hover:text-paper hover:border-ink transition-all">
                        <Plus size={14} />
                    </button>
                </div>

                {/* Search */}
                <div className="px-4 py-4">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/20 group-focus-within:text-gold transition-colors" size={14} />
                        <input 
                            type="text" 
                            placeholder="Filter conversations..." 
                            className="w-full bg-white border border-ink/5 rounded-md py-2 pl-9 pr-3 text-xs font-sans placeholder:text-ink/20 focus:outline-none focus:border-gold/30 transition-all shadow-sm"
                        />
                    </div>
                </div>

                {/* Session List */}
                <div className="flex-1 overflow-y-auto px-3 space-y-1 pb-4">
                    {SESSIONS.map((session) => (
                        <div 
                            key={session.id} 
                            className={`p-3 rounded-lg cursor-pointer transition-all group border ${session.id === 1 ? 'bg-white shadow-sm border-ink/5' : 'border-transparent hover:bg-white hover:shadow-sm hover:border-ink/5'}`}
                        >
                            <div className="flex justify-between items-start mb-1.5">
                                <div className="flex items-center gap-2">
                                    <div className={`text-[10px] uppercase tracking-wider font-semibold ${session.id === 1 ? 'text-ink' : 'text-ink/50'}`}>
                                        {session.guide}
                                    </div>
                                    <span className="w-1 h-1 rounded-full bg-ink/10"></span>
                                    <span className="text-[9px] text-ink/40">{session.time}</span>
                                </div>
                            </div>
                            <h3 className={`font-serif text-sm mb-1 leading-tight ${session.id === 1 ? 'text-ink font-medium' : 'text-ink/70'}`}>{session.title}</h3>
                            <p className="text-xs text-ink/40 truncate font-light">{session.preview}</p>
                        </div>
                    ))}
                </div>

                {/* Bottom Action */}
                <div className="p-4 border-t border-ink/5 bg-white/50 backdrop-blur-sm">
                    <button onClick={() => onNavigate('guides')} className="w-full py-2.5 flex items-center justify-center gap-2 text-xs font-medium text-ink/60 hover:text-ink transition-colors border border-ink/5 rounded-md hover:bg-white">
                        <ArrowRight size={14} /> View All Guides
                    </button>
                </div>
             </div>


             {/* --- CENTER COLUMN (Chat Interface) --- */}
             <div className="flex-1 flex flex-col bg-white relative z-0">
                
                {/* Chat Header */}
                <div className="h-16 px-6 lg:px-8 border-b border-ink/5 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-20">
                    <div className="flex items-center gap-4">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-50 to-white text-purple-600 flex items-center justify-center border border-purple-100 shadow-sm">
                            <Eye size={16} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="font-serif text-lg text-ink">Recurring Dream Analysis</h2>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-ink/40">
                                <span>The Mystic</span>
                                <span className="w-1 h-1 bg-ink/20 rounded-full"></span>
                                <span className="text-green-600 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>Active</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <button className="p-2 text-ink/20 hover:text-ink hover:bg-ink/5 rounded-full transition-colors"><Search size={18} /></button>
                        <button className="p-2 text-ink/20 hover:text-ink hover:bg-ink/5 rounded-full transition-colors"><MoreHorizontal size={18} /></button>
                    </div>
                </div>

                {/* Chat Thread */}
                <div className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-10 scroll-smooth bg-white" ref={scrollRef}>
                    <div className="text-center">
                        <span className="text-[10px] font-mono text-ink/30 uppercase bg-ink/5 px-3 py-1 rounded-full">Today, Oct 24</span>
                    </div>

                    {MESSAGES.map((msg) => (
                        <motion.div 
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} group`}
                        >
                            <div className={`max-w-2xl flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                                
                                {/* Avatar (Guide Only) */}
                                {msg.sender === 'guide' && (
                                    <div className="text-[10px] uppercase tracking-widest text-ink/30 mb-2 ml-1">The Mystic</div>
                                )}

                                {/* Message Bubble */}
                                <div className={`
                                    rounded-2xl px-6 py-5 text-sm leading-relaxed shadow-sm transition-all
                                    ${msg.sender === 'user' 
                                        ? 'bg-[#1a1a1a] text-[#F2F0E9] rounded-tr-sm' 
                                        : 'bg-[#FAF9F6] border border-ink/5 text-ink rounded-tl-sm'}
                                `}>
                                    {msg.sender === 'user' ? (
                                        <p className="font-serif text-[15px]">{msg.content as string}</p>
                                    ) : (
                                        <div className="space-y-6">
                                            {(msg.content as any[]).map((block, i) => (
                                                <div key={i}>
                                                    {/* Text Block */}
                                                    {block.type === 'text' && (
                                                        <p className="font-serif text-[16px] leading-loose text-ink/90" dangerouslySetInnerHTML={{ __html: block.value }} />
                                                    )}

                                                    {/* Insight Card */}
                                                    {block.type === 'insight' && (
                                                        <div className="mt-4 bg-white rounded-lg border border-purple-100 p-4 shadow-sm flex gap-4">
                                                            <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 flex-shrink-0">
                                                                <Sparkles size={14} />
                                                            </div>
                                                            <div>
                                                                <div className="text-[10px] uppercase tracking-widest text-purple-600 font-bold mb-1">{block.label}</div>
                                                                <p className="text-ink/70 text-xs leading-relaxed">{block.value}</p>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Meaning Block */}
                                                    {block.type === 'meaning' && (
                                                        <div className="pl-4 border-l-2 border-gold/30 italic text-ink/60 my-4">
                                                            "{block.value}"
                                                        </div>
                                                    )}

                                                    {/* Action Card */}
                                                    {block.type === 'action' && (
                                                        <div className="mt-4 flex items-start gap-3 bg-white border border-ink/5 p-4 rounded-lg shadow-sm group/action cursor-pointer hover:border-green-200 transition-colors">
                                                            <div className="mt-0.5 w-4 h-4 rounded-full border border-ink/20 group-hover/action:border-green-500 group-hover/action:bg-green-50 transition-colors flex items-center justify-center">
                                                                <CheckCircle2 size={10} className="text-transparent group-hover/action:text-green-600" />
                                                            </div>
                                                            <div className="flex-1">
                                                                <div className="text-[9px] uppercase tracking-widest text-ink/40 mb-1 group-hover/action:text-green-600 transition-colors">Integration Task</div>
                                                                <p className="font-medium text-ink/90 text-sm">{block.value}</p>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Citation Pill */}
                                                    {block.type === 'citation' && (
                                                        <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-ink/40 border border-ink/10 bg-white px-3 py-1.5 rounded-full cursor-pointer hover:border-gold hover:text-gold transition-colors mt-2 shadow-sm">
                                                            <ArrowUpRight size={10} /> {block.source}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Post-Message Actions */}
                                <div className={`flex items-center gap-3 mt-2 opacity-0 group-hover:opacity-100 transition-opacity ${msg.sender === 'user' ? 'mr-1' : 'ml-1'}`}>
                                    <span className="text-[9px] text-ink/20 font-mono">{msg.timestamp}</span>
                                    {msg.sender === 'guide' && (
                                        <>
                                            <button className="text-ink/20 hover:text-gold transition-colors" title="Save to Path"><Save size={12} /></button>
                                            <button className="text-ink/20 hover:text-ink transition-colors" title="Copy"><FileText size={12} /></button>
                                        </>
                                    )}
                                </div>

                            </div>
                        </motion.div>
                    ))}
                    <div className="h-4"></div>
                </div>

                {/* Input Area */}
                <div className="p-6 lg:px-10 bg-white/50 backdrop-blur-sm border-t border-ink/5">
                    <div className="max-w-4xl mx-auto space-y-3">
                        
                        {/* Context Toggles */}
                        <div className="flex gap-2 pl-1">
                            <button 
                                onClick={() => setUseChart(!useChart)}
                                className={`flex items-center gap-1.5 px-3 py-1 text-[10px] uppercase tracking-widest border rounded-full transition-all ${useChart ? 'bg-ink text-paper border-ink' : 'bg-white border-ink/10 text-ink/40 hover:border-ink/30'}`}
                            >
                                <Sparkles size={10} /> Chart Context
                            </button>
                            <button 
                                onClick={() => setUseTransits(!useTransits)}
                                className={`flex items-center gap-1.5 px-3 py-1 text-[10px] uppercase tracking-widest border rounded-full transition-all ${useTransits ? 'bg-ink text-paper border-ink' : 'bg-white border-ink/10 text-ink/40 hover:border-ink/30'}`}
                            >
                                <Activity size={10} /> Live Transits
                            </button>
                        </div>

                        {/* Input Box */}
                        <div className="bg-white border border-ink/10 rounded-2xl p-2 flex gap-2 shadow-lg shadow-ink/5 focus-within:border-gold/50 focus-within:ring-4 focus-within:ring-gold/5 transition-all">
                            <button className="p-3 text-ink/20 hover:text-ink transition-colors rounded-xl hover:bg-ink/5">
                                <Paperclip size={18} />
                            </button>
                            <textarea 
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Message The Mystic..."
                                className="flex-1 bg-transparent border-none focus:ring-0 resize-none h-[48px] py-3 font-serif placeholder:font-sans placeholder:text-ink/20 text-sm leading-relaxed"
                            />
                            <button 
                                disabled={!input}
                                className="p-3 bg-ink text-paper rounded-xl hover:bg-gold transition-all disabled:opacity-50 disabled:hover:bg-ink"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                        
                        <div className="text-center text-[9px] text-ink/20 font-sans">
                            The Council generates responses based on your astrological data.
                        </div>
                    </div>
                </div>
             </div>


             {/* --- RIGHT SIDEBAR (Context Engine) --- */}
             <div className="hidden xl:flex w-96 flex-col border-l border-ink/5 bg-[#FAF9F6]">
                 
                 {/* Tabs */}
                 <div className="flex border-b border-ink/5 bg-white">
                    {['today', 'cycle', 'archive', 'notes'].map((tab) => (
                        <button 
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`flex-1 py-4 text-[10px] uppercase tracking-widest text-center transition-all relative ${activeTab === tab ? 'text-ink font-bold' : 'text-ink/40 hover:text-ink'}`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold" />
                            )}
                        </button>
                    ))}
                 </div>

                 {/* Content */}
                 <div className="flex-1 overflow-y-auto p-6 space-y-8">
                     
                     {/* TODAY TAB */}
                     {activeTab === 'today' && (
                         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                             
                             {/* Alignment Widget */}
                             <div className="space-y-3">
                                 <div className="flex justify-between items-baseline">
                                     <h3 className="text-[10px] uppercase tracking-widest text-ink/40">Alignment Score</h3>
                                     <span className="text-2xl font-display text-ink">{CONTEXT_DATA.today.alignment}</span>
                                 </div>
                                 <div className="h-1.5 w-full bg-ink/5 rounded-full overflow-hidden">
                                     <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} transition={{ duration: 1 }} className="h-full bg-gradient-to-r from-gold to-yellow-300 rounded-full" />
                                 </div>
                             </div>

                             {/* Active Window Widget */}
                             <div className="bg-white rounded-xl border border-ink/5 p-5 shadow-sm space-y-4">
                                 <div className="flex items-center gap-2 text-green-600">
                                     <Clock size={14} />
                                     <span className="text-[10px] uppercase tracking-widest font-bold">Active Window</span>
                                 </div>
                                 <div>
                                     <div className="text-2xl font-mono text-ink mb-1">{CONTEXT_DATA.today.window}</div>
                                     <div className="text-[10px] uppercase tracking-wider text-ink/40">Power Phase</div>
                                 </div>
                                 <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                                     <p className="text-xs text-green-800 leading-relaxed">
                                         {CONTEXT_DATA.today.insight}
                                     </p>
                                 </div>
                             </div>

                             {/* Quick Actions */}
                             <div className="space-y-2">
                                 <button className="w-full py-3 border border-ink/10 rounded-lg bg-white text-xs text-ink/60 hover:text-ink hover:border-ink/30 transition-colors flex items-center justify-center gap-2">
                                     <FileText size={14} /> View Full Transit Log
                                 </button>
                             </div>

                         </motion.div>
                     )}

                     {/* CYCLE TAB */}
                     {activeTab === 'cycle' && (
                         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                             <div className="bg-[#1a1a1a] text-[#F2F0E9] p-6 rounded-xl relative overflow-hidden shadow-lg">
                                 <div className="relative z-10">
                                     <span className="text-[10px] uppercase tracking-widest opacity-50 block mb-2">Current Cycle</span>
                                     <h3 className="font-serif text-2xl mb-6">{CONTEXT_DATA.cycle.name}</h3>
                                     
                                     <div className="flex justify-between text-[10px] font-mono opacity-60 mb-2">
                                         <span>Progress</span>
                                         <span>{CONTEXT_DATA.cycle.progress}%</span>
                                     </div>
                                     <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden mb-6">
                                         <div className="w-[65%] h-full bg-gold rounded-full"></div>
                                     </div>

                                     <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm border border-white/5">
                                         <p className="text-xs opacity-80 leading-relaxed font-light">
                                             {CONTEXT_DATA.cycle.desc}
                                         </p>
                                     </div>
                                 </div>
                                 
                                 {/* Decorative Circles */}
                                 <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold/20 rounded-full blur-3xl"></div>
                             </div>
                         </motion.div>
                     )}

                     {/* ARCHIVE TAB */}
                     {activeTab === 'archive' && (
                         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                             <h3 className="text-[10px] uppercase tracking-widest text-ink/40 mb-2">Reference Material</h3>
                             {CONTEXT_DATA.archive.map((item, i) => (
                                 <div key={i} className="group flex items-start gap-3 p-3 rounded-lg hover:bg-white hover:shadow-sm hover:border-ink/5 border border-transparent transition-all cursor-pointer">
                                     <div className="mt-1 w-8 h-8 rounded-md bg-ink/5 text-ink/40 group-hover:bg-gold/10 group-hover:text-gold flex items-center justify-center transition-colors">
                                         <FileText size={14} />
                                     </div>
                                     <div className="flex-1">
                                         <div className="text-xs font-serif text-ink group-hover:text-ink font-medium mb-0.5">{item.title}</div>
                                         <div className="text-[10px] uppercase tracking-widest text-ink/40">{item.type}</div>
                                     </div>
                                     <ArrowRight size={12} className="text-ink/20 group-hover:text-ink opacity-0 group-hover:opacity-100 transition-all mt-2" />
                                 </div>
                             ))}
                         </motion.div>
                     )}

                      {/* NOTES TAB */}
                     {activeTab === 'notes' && (
                         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                             <h3 className="text-[10px] uppercase tracking-widest text-ink/40 mb-2">Path Notes</h3>
                             {CONTEXT_DATA.notes.map((note, i) => (
                                 <div key={i} className="p-4 bg-white border border-ink/5 rounded-lg hover:border-gold/30 transition-colors cursor-pointer shadow-sm group">
                                     <div className="flex justify-between items-start mb-2">
                                         <div className="text-[10px] font-mono text-ink/30 bg-ink/5 px-2 py-0.5 rounded-sm">{note.date}</div>
                                         <MoreHorizontal size={12} className="text-ink/20 group-hover:text-ink transition-colors" />
                                     </div>
                                     <div className="text-xs font-serif text-ink/80 leading-relaxed italic">"{note.title}"</div>
                                 </div>
                             ))}
                             <button className="w-full py-3 text-[10px] uppercase tracking-widest text-ink/40 hover:text-ink border border-dashed border-ink/20 rounded-lg hover:border-ink/40 hover:bg-white transition-all">
                                 + Add Context Note
                             </button>
                         </motion.div>
                     )}

                 </div>

                 {/* Status Bar */}
                 <div className="p-3 border-t border-ink/5 bg-white flex justify-between items-center text-[9px] uppercase tracking-widest text-ink/30">
                     <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div> Engine Online</span>
                     <span>v2.4.0</span>
                 </div>
             </div>

        </div>
    );
};