import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Search, MoreHorizontal, Paperclip, Send, 
  Sparkles, Brain, Heart, Briefcase, Users, Eye, 
  Clock, ArrowUpRight, Save, FileText, CheckCircle2,
  Calendar, RotateCcw, ChevronDown, ChevronRight,
  Zap, Lock, ArrowRight, Download, Activity, X,
  MessageCircle, Shield, AlertTriangle, Star, Book
} from 'lucide-react';

interface CorridorChatProps {
    onNavigate: (view: any) => void;
    onBack: () => void;
}

// --- MOCK DATA ---

const CONVERSATIONS = [
    { 
        id: 1, 
        name: 'Elena R.', 
        image: null, // Placeholder logic used
        score: 98, 
        lastMsg: 'The dream about the water... that resonates.', 
        time: '10 min ago', 
        unread: true,
        status: 'online'
    },
    { 
        id: 2, 
        name: 'Julian B.', 
        image: null, 
        score: 94, 
        lastMsg: 'When are you free to sync?', 
        time: 'Yesterday', 
        unread: false,
        status: 'offline'
    },
    { 
        id: 3, 
        name: 'Marcus T.', 
        image: null, 
        score: 88, 
        lastMsg: 'Saturn is heavy today.', 
        time: 'Oct 22', 
        unread: false,
        status: 'offline'
    }
];

const MESSAGES = [
    {
        id: 'm1',
        sender: 'them',
        text: "I read your bio. 'Architect by day, mystic by night.' That's a rare combination.",
        time: 'Yesterday 8:30 PM'
    },
    {
        id: 'm2',
        sender: 'me',
        text: "It keeps the balance. Structure needs chaos, and chaos needs a container. What's your balance?",
        time: 'Yesterday 8:45 PM'
    },
    {
        id: 'm3',
        sender: 'them',
        text: "I lean heavily into the chaos, honestly. My Scorpio placements don't like boundaries much. But I'm learning.",
        time: 'Yesterday 9:15 PM'
    },
    {
        id: 'm4',
        sender: 'them',
        text: "The dream about the water... that resonates. I had a similar one during the last full moon.",
        time: '10:23 AM'
    }
];

const STARTERS = [
    "Ask: 'How does your Scorpio moon handle conflict?'",
    "Observation: 'We both have strong Saturn placements.'",
    "Playful: 'If we were to build a world, what's the first law?'",
    "Deep: 'What is the one truth you are afraid to speak?'",
    "Casual: 'How is the transit impacting your work week?'"
];

const GUIDANCE = {
    tone: "Direct & Deep",
    avoid: ["Small talk", "Passive aggression", "Surface-level flattery"],
    respond: ["Vulnerability", "Intellectual challenges", "Space holding"],
    nextMove: "She opened a door with the dream mention. Walk through it. Ask for details."
};

const BLUEPRINT_SNAPSHOT = {
    safety: 85,
    attraction: 99,
    growth: 92,
    strength: "Psychic Tether",
    friction: "Power Struggles",
    repair: "When tension rises, pause and validate her feeling before explaining your logic."
};

export const CorridorChat: React.FC<CorridorChatProps> = ({ onNavigate, onBack }) => {
    const [activeTab, setActiveTab] = useState<'starters' | 'guidance' | 'blueprint' | 'notes'>('starters');
    const [inputText, setInputText] = useState('');
    const [isOracleModalOpen, setIsOracleModalOpen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [MESSAGES]);

    const handleInsertStarter = (text: string) => {
        // Strip the label (e.g., "Ask: ")
        const cleanText = text.split(": '")[1]?.replace("'", "") || text;
        setInputText(cleanText);
    };

    return (
        <div className="fixed inset-x-0 bottom-0 top-[88px] bg-paper flex overflow-hidden border-t border-ink/5">
             
             {/* --- LEFT SIDEBAR: CONVERSATIONS --- */}
             <div className="hidden lg:flex w-80 flex-col border-r border-ink/5 bg-[#FAF9F6]">
                
                {/* Header */}
                <div className="h-16 px-5 flex justify-between items-center border-b border-ink/5 bg-white/50">
                    <button onClick={onBack} className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-ink/40 hover:text-ink transition-colors">
                        <ArrowLeft size={12} /> Matches
                    </button>
                    <div className="flex gap-2">
                        <button className="w-7 h-7 rounded-full border border-ink/10 flex items-center justify-center text-ink/40 hover:bg-ink hover:text-paper transition-all">
                            <Search size={12} />
                        </button>
                    </div>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto">
                    {CONVERSATIONS.map((chat) => (
                        <div 
                            key={chat.id} 
                            className={`p-4 border-b border-ink/5 cursor-pointer hover:bg-white transition-colors group ${chat.id === 1 ? 'bg-white' : ''}`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-ink/5 rounded-full flex items-center justify-center text-ink font-display relative">
                                        {chat.name.charAt(0)}
                                        {chat.status === 'online' && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>}
                                    </div>
                                    <div>
                                        <div className="font-serif text-ink text-sm font-bold">{chat.name}</div>
                                        <div className="text-[9px] uppercase tracking-widest text-ink/40 font-bold">{chat.score}% Resonance</div>
                                    </div>
                                </div>
                                <span className="text-[9px] text-ink/30 font-mono">{chat.time}</span>
                            </div>
                            <div className="flex justify-between items-center pl-[52px]">
                                <p className={`text-xs truncate max-w-[160px] ${chat.unread ? 'text-ink font-medium' : 'text-ink/50 font-light'}`}>
                                    {chat.lastMsg}
                                </p>
                                {chat.unread && <div className="w-2 h-2 bg-gold rounded-full"></div>}
                            </div>
                        </div>
                    ))}
                </div>
             </div>


             {/* --- CENTER COLUMN: CHAT THREAD --- */}
             <div className="flex-1 flex flex-col bg-white relative z-0">
                
                {/* Chat Header */}
                <div className="h-16 px-6 lg:px-8 border-b border-ink/5 flex justify-between items-center bg-white/90 backdrop-blur-md sticky top-0 z-20">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-blue-50 rounded-full flex items-center justify-center text-ink/40 border border-ink/5">
                            <Users size={16} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="font-serif text-lg text-ink">Elena R.</h2>
                                <span className="px-1.5 py-0.5 bg-ink text-paper text-[9px] font-bold rounded-sm">98%</span>
                            </div>
                            <div className="text-[10px] uppercase tracking-widest text-ink/40 flex items-center gap-2">
                                <span>Soul Contract</span>
                                <span className="w-1 h-1 bg-ink/20 rounded-full"></span>
                                <span>London</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => onNavigate('corridor-match-detail')}
                            className="hidden sm:flex items-center gap-2 px-3 py-1.5 border border-ink/10 rounded-full text-[10px] uppercase tracking-widest hover:border-ink transition-colors"
                        >
                            <FileText size={12} /> Dossier
                        </button>
                        <button 
                            onClick={() => setIsOracleModalOpen(true)}
                            className="flex items-center gap-2 px-3 py-1.5 bg-ink/5 rounded-full text-[10px] uppercase tracking-widest hover:bg-gold hover:text-white transition-colors"
                        >
                            <Sparkles size={12} /> Ask Oracle
                        </button>
                        <button className="p-2 text-ink/20 hover:text-ink transition-colors"><MoreHorizontal size={18} /></button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-8 bg-[#FDFBF7]">
                    <div className="text-center">
                        <span className="text-[10px] font-mono text-ink/30 uppercase bg-ink/5 px-3 py-1 rounded-full">Yesterday</span>
                    </div>

                    {MESSAGES.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[75%] ${msg.sender === 'me' ? 'items-end' : 'items-start'} flex flex-col`}>
                                <div className={`
                                    p-4 rounded-2xl text-sm leading-relaxed shadow-sm
                                    ${msg.sender === 'me' 
                                        ? 'bg-ink text-paper rounded-tr-sm' 
                                        : 'bg-white border border-ink/5 text-ink rounded-tl-sm'}
                                `}>
                                    {msg.text}
                                </div>
                                <span className="text-[9px] text-ink/20 mt-1 font-mono">{msg.time}</span>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Composer */}
                <div className="p-6 bg-white border-t border-ink/5">
                    <div className="relative">
                        <textarea 
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Type a message..."
                            className="w-full bg-paper-light border border-ink/10 rounded-xl p-4 pr-12 text-sm font-serif focus:outline-none focus:border-gold transition-colors resize-none h-24"
                        />
                        <div className="absolute bottom-3 right-3 flex items-center gap-2">
                            <button className="p-2 text-ink/20 hover:text-ink transition-colors">
                                <Paperclip size={16} />
                            </button>
                            <button className="p-2 bg-ink text-paper rounded-lg hover:bg-gold transition-colors shadow-md">
                                <Send size={16} />
                            </button>
                        </div>
                    </div>
                </div>

             </div>


             {/* --- RIGHT SIDEBAR: ORACLE ASSIST --- */}
             <div className="hidden xl:flex w-80 flex-col border-l border-ink/5 bg-white">
                 
                 {/* Tabs */}
                 <div className="flex border-b border-ink/5">
                    {['starters', 'guidance', 'blueprint', 'notes'].map((tab) => (
                        <button 
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`flex-1 py-4 text-[9px] uppercase tracking-widest text-center transition-all relative ${activeTab === tab ? 'text-ink font-bold bg-paper-light' : 'text-ink/40 hover:text-ink'}`}
                        >
                            {tab}
                            {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold"></div>}
                        </button>
                    ))}
                 </div>

                 <div className="flex-1 overflow-y-auto p-6 bg-[#FAF9F6]">
                     
                     {/* TAB: STARTERS */}
                     {activeTab === 'starters' && (
                         <div className="space-y-6">
                             <div className="flex items-center gap-2 text-ink/40 mb-2">
                                 <MessageCircle size={14} />
                                 <span className="text-[10px] uppercase tracking-widest">Icebreakers</span>
                             </div>
                             <div className="space-y-3">
                                 {STARTERS.map((s, i) => (
                                     <button 
                                        key={i}
                                        onClick={() => handleInsertStarter(s)}
                                        className="w-full text-left p-3 bg-white border border-ink/5 hover:border-gold hover:shadow-sm transition-all rounded-sm group"
                                     >
                                         <p className="text-xs text-ink/70 leading-relaxed font-serif group-hover:text-ink">"{s}"</p>
                                         <div className="mt-2 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                             <span className="text-[9px] uppercase tracking-widest text-gold flex items-center gap-1">Insert <ArrowRight size={10} /></span>
                                         </div>
                                     </button>
                                 ))}
                             </div>
                             <button className="w-full py-3 border border-dashed border-ink/20 text-[10px] uppercase tracking-widest text-ink/40 hover:text-ink hover:bg-white transition-colors">
                                 Generate More
                             </button>
                         </div>
                     )}

                     {/* TAB: GUIDANCE */}
                     {activeTab === 'guidance' && (
                         <div className="space-y-6">
                             <div className="bg-white p-4 border border-ink/5 shadow-sm">
                                 <h4 className="text-[10px] uppercase tracking-widest text-ink/40 mb-2">Recommended Tone</h4>
                                 <div className="text-lg font-serif text-ink">{GUIDANCE.tone}</div>
                             </div>

                             <div>
                                 <h4 className="text-[10px] uppercase tracking-widest text-green-600 mb-2 flex items-center gap-1"><CheckCircle2 size={12} /> Do This</h4>
                                 <ul className="space-y-2">
                                     {GUIDANCE.respond.map((item, i) => (
                                         <li key={i} className="text-xs text-ink/70 bg-green-50 px-3 py-2 rounded-sm border border-green-100">{item}</li>
                                     ))}
                                 </ul>
                             </div>

                             <div>
                                 <h4 className="text-[10px] uppercase tracking-widest text-red-500 mb-2 flex items-center gap-1"><AlertTriangle size={12} /> Avoid This</h4>
                                 <ul className="space-y-2">
                                     {GUIDANCE.avoid.map((item, i) => (
                                         <li key={i} className="text-xs text-ink/70 bg-red-50 px-3 py-2 rounded-sm border border-red-100">{item}</li>
                                     ))}
                                 </ul>
                             </div>

                             <div className="bg-ink text-paper p-4 shadow-md">
                                 <h4 className="text-[10px] uppercase tracking-widest text-gold mb-2">Oracle Insight</h4>
                                 <p className="text-xs font-light leading-relaxed opacity-90">
                                     {GUIDANCE.nextMove}
                                 </p>
                             </div>
                         </div>
                     )}

                     {/* TAB: BLUEPRINT */}
                     {activeTab === 'blueprint' && (
                         <div className="space-y-6">
                             <div className="space-y-4">
                                 <div>
                                     <div className="flex justify-between text-[10px] uppercase tracking-widest text-ink/40 mb-1">
                                         <span>Safety</span> <span>{BLUEPRINT_SNAPSHOT.safety}%</span>
                                     </div>
                                     <div className="w-full h-1 bg-ink/5 rounded-full overflow-hidden">
                                         <div style={{ width: `${BLUEPRINT_SNAPSHOT.safety}%` }} className="h-full bg-blue-400"></div>
                                     </div>
                                 </div>
                                 <div>
                                     <div className="flex justify-between text-[10px] uppercase tracking-widest text-ink/40 mb-1">
                                         <span>Attraction</span> <span>{BLUEPRINT_SNAPSHOT.attraction}%</span>
                                     </div>
                                     <div className="w-full h-1 bg-ink/5 rounded-full overflow-hidden">
                                         <div style={{ width: `${BLUEPRINT_SNAPSHOT.attraction}%` }} className="h-full bg-red-400"></div>
                                     </div>
                                 </div>
                                 <div>
                                     <div className="flex justify-between text-[10px] uppercase tracking-widest text-ink/40 mb-1">
                                         <span>Growth</span> <span>{BLUEPRINT_SNAPSHOT.growth}%</span>
                                     </div>
                                     <div className="w-full h-1 bg-ink/5 rounded-full overflow-hidden">
                                         <div style={{ width: `${BLUEPRINT_SNAPSHOT.growth}%` }} className="h-full bg-gold"></div>
                                     </div>
                                 </div>
                             </div>

                             <div className="bg-white p-4 border border-ink/5">
                                 <div className="flex items-center gap-2 mb-2">
                                     <Star size={12} className="text-gold" />
                                     <span className="text-[10px] uppercase tracking-widest text-ink/40">Top Strength</span>
                                 </div>
                                 <p className="text-sm font-serif">{BLUEPRINT_SNAPSHOT.strength}</p>
                             </div>

                             <div className="bg-white p-4 border border-ink/5">
                                 <div className="flex items-center gap-2 mb-2">
                                     <Shield size={12} className="text-red-400" />
                                     <span className="text-[10px] uppercase tracking-widest text-ink/40">Friction Zone</span>
                                 </div>
                                 <p className="text-sm font-serif">{BLUEPRINT_SNAPSHOT.friction}</p>
                             </div>

                             <button 
                                onClick={() => onNavigate('corridor-match-detail')}
                                className="w-full py-3 bg-ink text-paper text-[10px] uppercase tracking-widest hover:bg-gold transition-colors"
                             >
                                 View Full Blueprint
                             </button>
                         </div>
                     )}

                     {/* TAB: NOTES */}
                     {activeTab === 'notes' && (
                         <div className="h-full flex flex-col">
                             <textarea 
                                className="flex-1 w-full bg-white border border-ink/10 p-4 text-xs font-serif leading-relaxed focus:outline-none focus:border-gold resize-none mb-4"
                                placeholder="Add private notes about this connection..."
                             />
                             <div className="space-y-2">
                                 <label className="flex items-center gap-3 text-xs text-ink/70 cursor-pointer">
                                     <input type="checkbox" className="rounded-sm border-ink/20 text-gold focus:ring-gold" />
                                     <span>Mentioned childhood trauma</span>
                                 </label>
                                 <label className="flex items-center gap-3 text-xs text-ink/70 cursor-pointer">
                                     <input type="checkbox" className="rounded-sm border-ink/20 text-gold focus:ring-gold" />
                                     <span>Available on weekends only</span>
                                 </label>
                             </div>
                             <button className="w-full py-3 mt-4 bg-white border border-ink/10 text-[10px] uppercase tracking-widest hover:border-ink transition-colors">
                                 Save Notes
                             </button>
                         </div>
                     )}

                 </div>
             </div>

             {/* ORACLE MODAL */}
             <AnimatePresence>
                 {isOracleModalOpen && (
                     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                         <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOracleModalOpen(false)}
                            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
                         />
                         <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }} 
                            animate={{ scale: 1, opacity: 1 }} 
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-paper w-full max-w-lg shadow-2xl relative overflow-hidden"
                         >
                             <div className="p-8">
                                 <div className="flex justify-between items-start mb-6">
                                     <div>
                                         <div className="flex items-center gap-2 text-gold mb-2">
                                             <Sparkles size={16} />
                                             <span className="text-[10px] uppercase tracking-widest">Oracle Query</span>
                                         </div>
                                         <h3 className="font-serif text-2xl text-ink">Ask about Elena</h3>
                                     </div>
                                     <button onClick={() => setIsOracleModalOpen(false)} className="text-ink/30 hover:text-ink"><X size={20} /></button>
                                 </div>
                                 
                                 <textarea 
                                    className="w-full h-32 bg-white border border-ink/10 p-4 text-lg font-serif focus:outline-none focus:border-gold transition-colors resize-none placeholder:text-ink/20 mb-6"
                                    placeholder="e.g., Is she losing interest? Why did she bring up the dream?"
                                 />
                                 
                                 <div className="flex justify-end gap-4">
                                     <button onClick={() => setIsOracleModalOpen(false)} className="px-6 py-3 text-xs uppercase tracking-widest text-ink/40 hover:text-ink">Cancel</button>
                                     <button className="px-8 py-3 bg-ink text-paper text-xs uppercase tracking-[0.25em] hover:bg-gold hover:text-white transition-colors">
                                         Consult
                                     </button>
                                 </div>
                             </div>
                             <div className="h-1 bg-gradient-to-r from-purple-500 via-gold to-blue-500 w-full"></div>
                         </motion.div>
                     </div>
                 )}
             </AnimatePresence>

        </div>
    );
};