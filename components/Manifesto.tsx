import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Brain, Heart, Briefcase, 
  Activity, Shield, Eye
} from 'lucide-react';

interface ManifestoProps {
    onNavigate: (view: any) => void;
}

export const Manifesto: React.FC<ManifestoProps> = ({ onNavigate }) => {
    return (
        <div className="min-h-screen bg-paper pt-32 pb-20 relative overflow-hidden">
             {/* Background Grid */}
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none grid-bg" />

             <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10 space-y-24">
                
                {/* 1. HEADER */}
                <div className="text-center space-y-6">
                    <div className="flex items-center justify-center gap-3 text-ink/40 mb-2">
                        <div className="h-[1px] w-12 bg-ink/20"></div>
                        <span className="text-[10px] uppercase tracking-[0.3em]">The Philosophy</span>
                        <div className="h-[1px] w-12 bg-ink/20"></div>
                    </div>
                    <h1 className="text-6xl lg:text-8xl font-display text-ink leading-none">The<br/>Manifesto</h1>
                    <p className="text-xl font-serif text-ink/60 italic max-w-xl mx-auto">
                        What Mind Guru Yoga is. And what it refuses to be.
                    </p>
                </div>

                {/* 2. SECTION A: WHAT MGY IS */}
                <div className="prose prose-lg prose-p:font-serif prose-p:text-ink/80 prose-p:leading-loose mx-auto">
                    <p>
                        <span className="float-left text-7xl font-display text-ink mr-4 mt-[-18px] leading-none">W</span>
                        e believe that the self is not a static entity to be discovered, but an architecture to be built. MGY is not a fortune-telling machine; it is a personal navigation system designed for high-agency individuals who understand that fate is a collaboration between the cosmos and the will.
                    </p>
                    <p>
                        In a world drowning in noise, we provide signal. We use the ancient language of astrology not as a parlor trick, but as a precise clock for your psychological evolution. We do not predict what will happen to you; we reveal who you must become to meet it.
                    </p>
                </div>

                {/* 3. SECTION B: THE SYSTEM */}
                <div>
                    <h2 className="text-3xl font-display text-ink text-center mb-12">The Four Pillars</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div 
                            onClick={() => onNavigate('observatory')}
                            className="bg-white border border-ink/10 p-8 hover:shadow-lg transition-all cursor-pointer group"
                        >
                            <Activity size={24} className="text-ink/40 mb-6 group-hover:text-gold transition-colors" />
                            <h3 className="font-serif text-2xl mb-3">Observatory</h3>
                            <p className="text-sm text-ink/60 font-light leading-relaxed mb-6">
                                Daily alignment and transit tracking. Knowing the "weather" before you step outside.
                            </p>
                            <span className="text-[10px] uppercase tracking-widest text-ink/40 group-hover:text-ink flex items-center gap-2">
                                Enter <ArrowRight size={10} />
                            </span>
                        </div>
                        <div 
                            onClick={() => onNavigate('archives')}
                            className="bg-white border border-ink/10 p-8 hover:shadow-lg transition-all cursor-pointer group"
                        >
                            <Brain size={24} className="text-ink/40 mb-6 group-hover:text-gold transition-colors" />
                            <h3 className="font-serif text-2xl mb-3">Archives</h3>
                            <p className="text-sm text-ink/60 font-light leading-relaxed mb-6">
                                Deep-dive reports and psychological manuscripts. The operating manual for your psyche.
                            </p>
                            <span className="text-[10px] uppercase tracking-widest text-ink/40 group-hover:text-ink flex items-center gap-2">
                                Enter <ArrowRight size={10} />
                            </span>
                        </div>
                        <div 
                            onClick={() => onNavigate('guides')}
                            className="bg-white border border-ink/10 p-8 hover:shadow-lg transition-all cursor-pointer group"
                        >
                            <Eye size={24} className="text-ink/40 mb-6 group-hover:text-gold transition-colors" />
                            <h3 className="font-serif text-2xl mb-3">The Council</h3>
                            <p className="text-sm text-ink/60 font-light leading-relaxed mb-6">
                                Specialized AI personas for non-linear dialogue. Wisdom synthesized from the ancients.
                            </p>
                            <span className="text-[10px] uppercase tracking-widest text-ink/40 group-hover:text-ink flex items-center gap-2">
                                Enter <ArrowRight size={10} />
                            </span>
                        </div>
                        <div 
                            onClick={() => onNavigate('corridor')}
                            className="bg-white border border-ink/10 p-8 hover:shadow-lg transition-all cursor-pointer group"
                        >
                            <Heart size={24} className="text-ink/40 mb-6 group-hover:text-gold transition-colors" />
                            <h3 className="font-serif text-2xl mb-3">Corridor</h3>
                            <p className="text-sm text-ink/60 font-light leading-relaxed mb-6">
                                Resonance-based matchmaking. Finding the others who are vibrating at your frequency.
                            </p>
                            <span className="text-[10px] uppercase tracking-widest text-ink/40 group-hover:text-ink flex items-center gap-2">
                                Enter <ArrowRight size={10} />
                            </span>
                        </div>
                    </div>
                </div>

                {/* 4. SECTION C: WHAT WE ARE NOT */}
                <div className="bg-ink text-paper p-12 lg:p-20 relative overflow-hidden">
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-3xl font-display text-white mb-12 text-center">Refusals</h2>
                        <ul className="space-y-6">
                            {[
                                "We are not a horoscope app. We do not offer vague platitudes to make you feel comfortable.",
                                "We are not 'fate worship'. We believe awareness changes the outcome.",
                                "We are not a substitute for mental health care. We are a spiritual supplement.",
                                "We do not sell fear. Challenges are reframed as structural tests.",
                                "We do not prioritize engagement over truth. Silence is often the answer."
                            ].map((item, i) => (
                                <li key={i} className="flex gap-6 items-start opacity-80 font-light leading-relaxed group">
                                    <span className="text-gold font-mono text-xs mt-1">0{i+1}</span>
                                    <span className="group-hover:text-white transition-colors">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Texture */}
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none"></div>
                </div>

                {/* 5. SECTION D: PRINCIPLES */}
                <div className="border-t border-ink/10 pt-16">
                    <h2 className="text-3xl font-display text-ink text-center mb-12">Core Principles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                        {[
                            { label: "Clarity over Comfort", desc: "The truth often stings before it heals." },
                            { label: "Action over Obsession", desc: "Analysis without movement is paralysis." },
                            { label: "Patterns over Personalities", desc: "See the mechanism, not just the face." },
                            { label: "Timing over Impulse", desc: "Wait for the gate to open." },
                            { label: "Responsibility over Blame", desc: "You are the architect of your own house." },
                            { label: "Integration over Escape", desc: "The only way out is through." }
                        ].map((p, i) => (
                            <div key={i} className="border-b border-ink/5 pb-4 last:border-0 md:last:border-b">
                                <h4 className="font-serif text-lg text-ink mb-1">{p.label}</h4>
                                <p className="text-xs text-ink/50 uppercase tracking-widest">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. SECTION E: DATA & PRIVACY */}
                <div className="bg-paper-light border border-ink/5 p-8 text-center max-w-2xl mx-auto">
                    <Shield size={24} className="mx-auto text-ink/20 mb-4" />
                    <h3 className="font-serif text-xl mb-4">Data Sovereignty</h3>
                    <p className="text-sm text-ink/60 leading-relaxed mb-6">
                        Your chart data is the blueprint of your soul. We treat it with the reverence of a sacred text. 
                        We do not sell your data. You can export or incinerate your archive at any time.
                    </p>
                    <button className="text-[10px] uppercase tracking-widest text-ink border-b border-ink/20 hover:border-ink transition-colors pb-1">
                        View Full Privacy Policy
                    </button>
                </div>

                {/* 7. FINAL CTA */}
                <div className="text-center pt-12 pb-20">
                    <div className="mb-8">
                        <textarea 
                            className="w-full max-w-lg mx-auto bg-transparent border-b border-ink/10 text-center font-serif text-xl p-4 focus:outline-none focus:border-gold transition-colors placeholder:text-ink/20 resize-none h-20"
                            placeholder="Ask the Oracle..."
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <button 
                            onClick={() => onNavigate('today')}
                            className="px-10 py-4 bg-ink text-paper text-xs uppercase tracking-[0.25em] hover:bg-gold hover:text-white transition-colors shadow-xl"
                        >
                            Start Reading
                        </button>
                        <button 
                            onClick={() => onNavigate('pricing')}
                            className="text-xs uppercase tracking-widest text-ink/60 hover:text-ink transition-colors"
                        >
                            View Membership
                        </button>
                    </div>
                </div>

             </div>
        </div>
    );
};