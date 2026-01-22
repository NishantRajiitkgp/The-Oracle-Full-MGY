import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, ArrowRight, Lock, Activity, 
  Sparkles, Radio, Infinity as InfinityIcon, Flame, 
  Droplets, Mountain, Wind, Star,
  MoveRight, Disc, Sliders
} from 'lucide-react';

interface CorridorProps {
    onNavigate: (view: any) => void;
}

// --- MOCK DATA ---

const MATCHES = [
    { 
        id: 1, 
        name: 'Elena R.', 
        info: '28 • London', 
        score: 98, 
        aspect: 'Soul Contract',
        archetype: 'The Mirror',
        glyph: '☿',
        insight: 'Her Pluto sits exactly on your Ascendant. This is not a casual meeting; it is a transformation event.',
        vibe: 'Intense',
        element: 'water'
    },
    { 
        id: 2, 
        name: 'Marcus T.', 
        info: '31 • Berlin', 
        score: 88, 
        aspect: 'Magnetic',
        archetype: 'The Anchor',
        glyph: '♄',
        insight: 'His Saturn stabilizes your volatile Moon. He offers the container for your emotional storm.',
        vibe: 'Stable',
        element: 'earth'
    },
    { 
        id: 3, 
        name: 'Sarah K.', 
        info: '29 • New York', 
        score: 76, 
        aspect: 'Karmic Teacher',
        archetype: 'The Catalyst',
        glyph: '♃',
        insight: 'High friction in communication sectors suggests she enters your life to teach you how to speak your truth.',
        vibe: 'Dynamic',
        element: 'fire'
    },
    { 
        id: 4, 
        name: 'Julian B.', 
        info: '33 • Tokyo', 
        score: 94, 
        aspect: 'Twin Flame',
        archetype: 'The Echo',
        glyph: '☉',
        insight: 'Sun conjunct Sun. You shine in the same spectrum. A partnership of creative explosion.',
        vibe: 'Radiant',
        element: 'fire'
    }
];

const FORECAST = [
    { date: 'Oct 28', event: 'Venus Trine Mars', probability: 'High', desc: 'Sudden romantic encounter in public spaces.' },
    { date: 'Nov 04', event: 'New Moon in Scorpio', probability: 'Critical', desc: 'Deep emotional bonding or revelation.' },
    { date: 'Nov 12', event: 'Mercury Direct', probability: 'Med', desc: 'Clear communication with a past connection.' },
    { date: 'Nov 24', event: 'Sun enters 7th House', probability: 'Peak', desc: 'The golden window for partnership begins.' },
];

// --- VISUAL COMPONENTS ---

const FateLoom = () => {
    return (
        <div className="relative w-full h-[500px] flex items-center justify-center perspective-1000 overflow-hidden">
            {/* Ambient Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent opacity-50 blur-3xl"></div>

            {/* The Threads (Sine Waves) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
                {[...Array(3)].map((_, i) => (
                    <motion.svg 
                        key={i}
                        className="absolute w-full h-full"
                        viewBox="0 0 1000 400"
                        preserveAspectRatio="none"
                        style={{ top: i * 20 - 20 }}
                    >
                        <motion.path
                            d="M0 200 Q 250 100 500 200 T 1000 200"
                            fill="none"
                            stroke="#111"
                            strokeWidth="0.5"
                            strokeDasharray="5 5"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ 
                                pathLength: 1, 
                                opacity: 1,
                                d: [
                                    "M0 200 Q 250 100 500 200 T 1000 200",
                                    "M0 200 Q 250 300 500 200 T 1000 200",
                                    "M0 200 Q 250 100 500 200 T 1000 200"
                                ]
                            }}
                            transition={{
                                default: { duration: 2, ease: "easeInOut" },
                                d: { 
                                    duration: 10 + i * 2, 
                                    repeat: Infinity, 
                                    ease: "easeInOut",
                                    delay: i
                                }
                            }}
                        />
                    </motion.svg>
                ))}
            </div>

            {/* The Central Mechanism */}
            <motion.div 
                className="relative w-80 h-80 flex items-center justify-center"
                initial={{ rotateX: 60, rotateZ: 0 }}
                animate={{ rotateZ: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
                {/* Ring 1 */}
                <div className="absolute inset-0 border border-ink/10 rounded-full"></div>
                {/* Ring 2 (Dashed) */}
                <div className="absolute inset-4 border border-ink/20 rounded-full border-dashed"></div>
                {/* Ring 3 (Gold Accent) */}
                <div className="absolute inset-10 border border-gold/30 rounded-full"></div>
                
                {/* Orbiting Particles */}
                <motion.div 
                    className="absolute top-0 left-1/2 w-3 h-3 bg-ink rounded-full -translate-x-1/2 -translate-y-1/2 shadow-lg"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div 
                    className="absolute bottom-0 left-1/2 w-2 h-2 bg-gold rounded-full -translate-x-1/2 translate-y-1/2"
                />
            </motion.div>

            {/* Vertical Scanning Beam */}
            <motion.div 
                className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-gold to-transparent z-10"
                animate={{ x: [-200, 200, -200], opacity: [0, 1, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />

            {/* Floating Data Points */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute flex items-center gap-2"
                    initial={{ x: Math.random() * 400 - 200, y: Math.random() * 400 - 200, opacity: 0 }}
                    animate={{ 
                        opacity: [0, 1, 0],
                        y: [0, -50]
                    }}
                    transition={{ 
                        duration: 4, 
                        repeat: Infinity, 
                        delay: i * 0.8,
                        ease: "easeOut"
                    }}
                >
                    <div className="w-1 h-1 bg-ink rounded-full"></div>
                    <div className="h-[1px] w-8 bg-ink/20"></div>
                    <span className="text-[8px] font-mono text-ink/40 uppercase">Match {90 + i}%</span>
                </motion.div>
            ))}
        </div>
    );
};

const ResonanceWave = ({ score, isHovered }: { score: number, isHovered: boolean }) => {
    // Generative wave bars
    return (
        <div className="flex items-center justify-center gap-[2px] h-16 w-full opacity-50 mix-blend-multiply">
            {[...Array(24)].map((_, i) => {
                // Pseudo-random height based on score
                const baseHeight = 10 + Math.sin(i) * 10 + (score / 100) * 20;
                return (
                    <motion.div
                        key={i}
                        initial={{ height: baseHeight, backgroundColor: '#111' }}
                        animate={{ 
                            height: isHovered ? [baseHeight, baseHeight * 1.5, baseHeight] : baseHeight,
                            backgroundColor: isHovered ? '#D4AF37' : '#111'
                        }}
                        transition={{ 
                            duration: 0.8, 
                            repeat: isHovered ? Infinity : 0, 
                            delay: i * 0.05, 
                            ease: "easeInOut" 
                        }}
                        className="w-[2px] rounded-full"
                    />
                )
            })}
        </div>
    );
};

const ElementIcon = ({ type }: { type: string }) => {
    switch(type) {
        case 'fire': return <Flame size={12} className="text-orange-600" />;
        case 'water': return <Droplets size={12} className="text-blue-600" />;
        case 'earth': return <Mountain size={12} className="text-green-600" />;
        default: return <Wind size={12} className="text-yellow-600" />;
    }
};

const Card: React.FC<{ match: typeof MATCHES[0], index: number }> = ({ match, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: index * 0.15, ease: [0.23, 1, 0.32, 1] }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative h-[640px] w-full perspective-1000 cursor-pointer"
        >
            {/* THE MONOLITH (Main Card Body) */}
            <motion.div 
                className="relative h-full bg-[#FDFBF7] overflow-hidden transition-all duration-700 ease-out border border-ink/5"
                animate={{ 
                    y: isHovered ? -12 : 0,
                    boxShadow: isHovered ? "0 30px 60px -12px rgba(0,0,0,0.15)" : "0 10px 30px -10px rgba(0,0,0,0.05)"
                }}
            >
                {/* 1. Texture Layer */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-multiply"></div>
                
                {/* 2. Top Section: Identity */}
                <div className="relative z-10 p-8 border-b border-ink/5">
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2 border border-ink/10 px-2 py-1 rounded-full bg-white">
                            <ElementIcon type={match.element} />
                            <span className="text-[9px] uppercase tracking-widest text-ink/60">{match.vibe} Signal</span>
                        </div>
                        <span className="font-serif italic text-ink/30 text-lg">No. 0{match.id}</span>
                    </div>
                    
                    <div className="mt-8">
                        <h3 className="text-4xl font-display text-ink mb-2 leading-none group-hover:text-red-900 transition-colors duration-500">
                            {match.name}
                        </h3>
                        <p className="text-xs font-mono uppercase tracking-widest text-ink/40">
                            {match.info}
                        </p>
                    </div>
                </div>

                {/* 3. Middle Section: The Resonance Chamber */}
                <div className="relative flex-1 h-[280px] flex items-center justify-center bg-[#F9F8F4] overflow-hidden">
                    {/* Background Glyph Watermark */}
                    <div className="absolute text-[200px] text-ink/[0.02] font-serif select-none pointer-events-none transform rotate-12 group-hover:rotate-0 transition-transform duration-1000 ease-out">
                        {match.glyph}
                    </div>
                    
                    {/* The Connecting Thread (Red Line) */}
                    <motion.div 
                        className="absolute top-0 bottom-0 w-[1px] bg-red-600/40 z-0"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: isHovered ? '100%' : '0%', opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                    />

                    {/* Central Score Display */}
                    <div className="relative z-10 text-center">
                        <motion.div 
                            className="text-7xl font-display text-ink mix-blend-darken"
                            animate={{ scale: isHovered ? 1.1 : 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {match.score}
                        </motion.div>
                        <div className="text-[9px] uppercase tracking-[0.4em] text-ink/40 mt-2">Resonance</div>
                    </div>

                    {/* Waveform Overlay at Bottom of Section */}
                    <div className="absolute bottom-8 w-full px-12">
                         <ResonanceWave score={match.score} isHovered={isHovered} />
                    </div>
                </div>

                {/* 4. Bottom Section: The Reveal */}
                <div className="relative z-10 bg-white border-t border-ink/5 p-8 h-[180px] flex flex-col justify-between">
                     {/* Locked State */}
                     <div className={`absolute inset-0 bg-white/60 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center transition-opacity duration-500 ${isHovered ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                         <Lock size={16} className="text-ink/30 mb-3" />
                         <span className="text-[9px] uppercase tracking-widest text-ink/40">Hover to Decrypt Contract</span>
                     </div>

                     {/* Unlocked Content */}
                     <div className="relative z-10">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xs font-bold uppercase tracking-widest text-ink">{match.aspect}</span>
                            <span className="text-[10px] text-ink/40 font-mono">{match.archetype}</span>
                        </div>
                        <p className="font-serif text-lg text-ink/80 italic leading-relaxed line-clamp-3">
                            "{match.insight}"
                        </p>
                     </div>

                     {/* Action Line */}
                     <div className="w-full h-[1px] bg-ink/10 mt-auto relative overflow-hidden">
                        <motion.div 
                            className="absolute inset-0 bg-red-900" 
                            initial={{ x: '-100%' }}
                            animate={{ x: isHovered ? '0%' : '-100%' }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                        />
                     </div>
                </div>
            </motion.div>

            {/* Backing Card (Stacked Effect) */}
            <div className="absolute top-3 left-3 w-full h-full border border-ink/5 bg-[#F0EEE6] -z-10 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"></div>
        </motion.div>
    );
};

export const Corridor: React.FC<CorridorProps> = ({ onNavigate }) => {
    const [filter, setFilter] = useState('All');

    return (
        <div className="min-h-screen bg-[#F5F2EB] relative overflow-hidden">
             
             {/* ATMOSPHERE */}
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none grid-bg mix-blend-multiply" />
             <div className="absolute left-12 top-0 bottom-0 w-[1px] bg-ink/5 hidden lg:block"></div>
             <div className="absolute right-12 top-0 bottom-0 w-[1px] bg-ink/5 hidden lg:block"></div>

             <div className="max-w-[1800px] mx-auto relative z-10 pt-32 pb-20 px-6 lg:px-24">

                {/* 1. HERO SECTION: FATE ARCHITECTURE & LOOM */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-32 border-b border-ink/5 pb-16">
                    
                    {/* Left: Typography & Story */}
                    <div className="lg:col-span-5 relative z-10">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></div>
                            <span className="text-[10px] uppercase tracking-[0.4em] text-red-700 font-bold">Live Feed</span>
                        </div>
                        <h1 className="text-7xl lg:text-9xl font-display text-ink leading-[0.8] mb-8 tracking-tight">
                            Fate <br/> <span className="italic font-serif opacity-40 ml-4 lg:ml-12 block lg:inline">Architecture</span>
                        </h1>
                        <p className="max-w-md text-ink/60 font-serif text-xl leading-relaxed border-l border-ink/10 pl-6 ml-2">
                            We do not find love; we calibrate to it. Adjust your frequency below to reveal the souls currently vibrating in your sector.
                        </p>
                    </div>

                    {/* Right: The Fate Loom & Tuner */}
                    <div className="lg:col-span-7 relative h-[500px] flex items-center justify-center">
                        {/* The Animation */}
                        <div className="absolute inset-0">
                            <FateLoom />
                        </div>

                        {/* Floating Tuner Control */}
                        <div className="absolute bottom-0 right-0 lg:bottom-12 lg:right-12 z-20">
                             <div className="flex items-center gap-2 mb-4 text-[10px] uppercase tracking-widest text-ink/40 justify-end">
                                 <Radio size={14} /> Frequency Tuner
                             </div>
                             <div className="bg-white/80 backdrop-blur-md p-1.5 border border-ink/10 shadow-xl flex gap-1 rounded-sm">
                                 {['All', 'Soul Contract', 'Twin Flame', 'Karmic'].map((mode) => (
                                     <button
                                         key={mode}
                                         onClick={() => setFilter(mode)}
                                         className={`
                                             px-5 py-3 text-[9px] uppercase tracking-[0.2em] transition-all relative overflow-hidden group rounded-sm
                                             ${filter === mode ? 'bg-ink text-paper shadow-md' : 'bg-transparent text-ink/50 hover:bg-ink/5 hover:text-ink'}
                                         `}
                                     >
                                         {mode}
                                     </button>
                                 ))}
                             </div>
                        </div>
                    </div>
                </div>


                {/* 2. THE LOOM (Card Grid) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-40">
                    {MATCHES.map((match, i) => (
                        <Card key={match.id} match={match} index={i} />
                    ))}
                </div>


                {/* 3. CHRONO-SYNASTRY (Timeline) */}
                <div className="border-t border-ink/10 pt-20">
                    <div className="flex flex-col lg:flex-row gap-16">
                        {/* Title Block */}
                        <div className="lg:w-1/4">
                            <div className="flex items-center gap-3 mb-6">
                                <Activity size={18} className="text-ink/40" />
                                <h2 className="text-3xl font-display text-ink">Incoming<br/>Trajectories</h2>
                            </div>
                            <p className="text-ink/60 font-serif leading-relaxed mb-8 text-sm">
                                Your chart indicates specific windows of time where karmic intersections are statistically probable. These are your "Golden Gates."
                            </p>
                            <button className="flex items-center gap-3 px-6 py-3 border border-ink text-xs uppercase tracking-widest hover:bg-ink hover:text-paper transition-colors group">
                                Sync Calendar <MoveRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        {/* The Timeline */}
                        <div className="lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {FORECAST.map((event, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="relative bg-white border border-ink/10 p-8 hover:border-red-600/30 transition-all group min-h-[220px] flex flex-col justify-between"
                                >
                                    {/* Top Marker */}
                                    <div className="flex justify-between items-start">
                                        <div className="text-xs font-mono uppercase tracking-widest text-ink/40">{event.date}</div>
                                        <div className={`w-2 h-2 rounded-full ${event.probability === 'Peak' || event.probability === 'Critical' ? 'bg-red-500 animate-pulse' : 'bg-ink/20'}`}></div>
                                    </div>

                                    {/* Center Content */}
                                    <div className="relative z-10">
                                        <h4 className="font-serif text-xl mb-2 leading-tight group-hover:text-red-900 transition-colors">{event.event}</h4>
                                        <div className="h-[1px] w-8 bg-ink/10 mb-4 group-hover:w-16 group-hover:bg-red-600/50 transition-all"></div>
                                        <p className="text-xs text-ink/60 leading-relaxed">
                                            {event.desc}
                                        </p>
                                    </div>
                                    
                                    {/* Hover Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-ink/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 4. FOOTER CALL TO ACTION */}
                <div className="mt-40 bg-ink text-paper p-16 relative overflow-hidden text-center shadow-2xl">
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <Disc size={40} className="mx-auto text-gold mb-8 animate-spin-slow" />
                        <h2 className="text-5xl lg:text-6xl font-display mb-6">Calibrate Your Signal</h2>
                        <p className="text-white/60 font-serif text-xl mb-10">
                            The quality of your matches is directly proportional to the clarity of your profile. You are currently broadcasting at 65% fidelity.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                            <button 
                                onClick={() => onNavigate('corridor-profile')}
                                className="px-10 py-4 bg-gold text-ink font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors"
                            >
                                Complete Blueprint
                            </button>
                            <button className="px-10 py-4 border border-white/20 text-white text-xs uppercase tracking-widest hover:bg-white hover:text-ink transition-colors">
                                Dismiss Notification
                            </button>
                        </div>
                    </div>
                    {/* Abstract Noise Texture */}
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none"></div>
                </div>

             </div>
        </div>
    );
};