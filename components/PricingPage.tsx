import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, X, ChevronDown, ChevronUp, Star, 
  Sparkles, Activity, FileText, Users, ArrowRight
} from 'lucide-react';

interface PricingPageProps {
    onNavigate: (view: any) => void;
}

const COMPARISON = [
    { feature: "Daily Guidance", explorer: "Basic (General)", oracle: "Personalized (Transits)" },
    { feature: "Guide Sessions", explorer: "1 / Day", oracle: "Unlimited" },
    { feature: "Birth Chart", explorer: "Placements Only", oracle: "Full Analysis" },
    { feature: "Archives", explorer: "Previews", oracle: "Full Reports" },
    { feature: "Transits Dashboard", explorer: false, oracle: true },
    { feature: "Compatibility Blueprint", explorer: false, oracle: true },
    { feature: "Match Feed Access", explorer: false, oracle: true },
    { feature: "Export PDF", explorer: false, oracle: true },
    { feature: "Priority Generation", explorer: false, oracle: true },
];

const FAQS = [
    { q: "What data do you need?", a: "We require your exact date, time, and place of birth to calculate your chart. This data is encrypted and never sold." },
    { q: "Can I cancel anytime?", a: "Yes. You can manage your subscription in Account Settings and cancel instantly. You will retain access until the end of your billing cycle." },
    { q: "Are reports personalized?", a: "Yes. Every report is generated uniquely for your specific astrological configuration using our specialized AI personas." },
    { q: "How does matchmaking work?", a: "We match based on synastry aspects (astrological compatibility), not just swiping. It is designed for deep resonance, not casual encounters." }
];

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate }) => {
    const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="min-h-screen bg-paper pt-32 pb-20 relative overflow-hidden">
             {/* Background Grid */}
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none grid-bg" />

             <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 space-y-20">
                
                {/* 1. HEADER & TOGGLE */}
                <div className="text-center max-w-3xl mx-auto space-y-8">
                    <div>
                        <h1 className="text-5xl lg:text-7xl font-display text-ink mb-4">Choose Your Pass</h1>
                        <p className="text-lg text-ink/60 font-serif">Unlock reports, guides, and compatibility tools.</p>
                    </div>

                    <div className="flex items-center justify-center gap-4">
                        <span className={`text-xs uppercase tracking-widest transition-colors ${billing === 'monthly' ? 'text-ink font-bold' : 'text-ink/40'}`}>Monthly</span>
                        <button 
                            onClick={() => setBilling(billing === 'monthly' ? 'yearly' : 'monthly')}
                            className="w-16 h-8 bg-ink rounded-full relative px-1 transition-colors"
                        >
                            <motion.div 
                                layout
                                className="w-6 h-6 bg-paper rounded-full absolute top-1"
                                animate={{ left: billing === 'monthly' ? 4 : 36 }}
                            />
                        </button>
                        <span className={`text-xs uppercase tracking-widest transition-colors ${billing === 'yearly' ? 'text-ink font-bold' : 'text-ink/40'}`}>
                            Yearly <span className="text-gold text-[10px] ml-1">(Save 20%)</span>
                        </span>
                    </div>
                </div>

                {/* 2. PRICING CARDS */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 max-w-5xl mx-auto">
                    
                    {/* EXPLORER (Free) */}
                    <div className="bg-white border border-ink/10 p-8 lg:p-12 flex flex-col items-center text-center relative hover:shadow-lg transition-shadow">
                        <div className="mb-8">
                            <span className="text-xs uppercase tracking-[0.2em] text-ink/40 block mb-4">Explorer Pass</span>
                            <div className="text-5xl font-display text-ink">Free</div>
                            <p className="text-sm text-ink/60 mt-4 font-light">Essential alignment tools.</p>
                        </div>

                        <ul className="space-y-4 mb-12 text-sm text-ink/70 font-light w-full">
                            <li className="flex items-center justify-center gap-2"><Check size={14} className="text-green-600"/> Daily Guidance (Summary)</li>
                            <li className="flex items-center justify-center gap-2"><Check size={14} className="text-green-600"/> Basic Birth Chart</li>
                            <li className="flex items-center justify-center gap-2"><Check size={14} className="text-green-600"/> 1 Guide Session / Day</li>
                            <li className="flex items-center justify-center gap-2"><Check size={14} className="text-green-600"/> Archive Previews</li>
                        </ul>

                        <button 
                            onClick={() => onNavigate('observatory')}
                            className="w-full mt-auto py-4 border border-ink/10 bg-paper-light text-ink text-xs uppercase tracking-[0.25em] hover:bg-ink hover:text-paper transition-colors"
                        >
                            Continue Free
                        </button>
                    </div>

                    {/* ORACLE (Premium) */}
                    <div className="bg-ink text-paper border border-ink p-8 lg:p-12 flex flex-col items-center text-center relative shadow-2xl overflow-hidden group">
                        {/* Glow Effect */}
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-gold/10 rounded-full blur-3xl group-hover:bg-gold/20 transition-colors"></div>
                        
                        <div className="relative z-10 mb-8 w-full">
                            <div className="flex justify-center mb-4">
                                <span className="bg-gold text-ink text-[9px] uppercase tracking-widest px-3 py-1 rounded-full font-bold">Recommended</span>
                            </div>
                            <span className="text-xs uppercase tracking-[0.2em] text-gold block mb-4">Oracle Pass</span>
                            <div className="text-5xl font-display text-white">
                                {billing === 'monthly' ? '$12' : '$115'}
                                <span className="text-lg text-white/40 font-sans ml-1">{billing === 'monthly' ? '/mo' : '/yr'}</span>
                            </div>
                            <p className="text-sm text-white/60 mt-4 font-light">Full access to the museum.</p>
                        </div>

                        <ul className="relative z-10 space-y-4 mb-12 text-sm text-white/80 font-light w-full">
                            <li className="flex items-center justify-center gap-2"><Star size={14} className="text-gold"/> Unlimited Guide Chat</li>
                            <li className="flex items-center justify-center gap-2"><Star size={14} className="text-gold"/> Full Archive Access</li>
                            <li className="flex items-center justify-center gap-2"><Star size={14} className="text-gold"/> Compatibility Blueprint</li>
                            <li className="flex items-center justify-center gap-2"><Star size={14} className="text-gold"/> Match Feed & Dossiers</li>
                            <li className="flex items-center justify-center gap-2"><Star size={14} className="text-gold"/> Full Transit Timeline</li>
                        </ul>

                        <button 
                            onClick={() => onNavigate('account')} // Assuming upgrade flow is in account or direct checkout
                            className="relative z-10 w-full mt-auto py-4 bg-gold text-ink text-xs uppercase tracking-[0.25em] font-bold hover:bg-white transition-colors"
                        >
                            Unlock Oracle Pass
                        </button>
                    </div>
                </div>

                {/* 3. COMPARISON TABLE */}
                <div className="max-w-4xl mx-auto pt-12">
                    <h3 className="text-center text-2xl font-serif text-ink mb-12">System Comparison</h3>
                    <div className="border border-ink/10 bg-white">
                        <div className="grid grid-cols-12 p-4 border-b border-ink/10 bg-paper-light text-[10px] uppercase tracking-widest text-ink/40 font-bold">
                            <div className="col-span-6">Feature</div>
                            <div className="col-span-3 text-center">Explorer</div>
                            <div className="col-span-3 text-center text-gold">Oracle</div>
                        </div>
                        {COMPARISON.map((row, i) => (
                            <div key={i} className="grid grid-cols-12 p-4 border-b border-ink/5 last:border-0 items-center hover:bg-paper-light transition-colors">
                                <div className="col-span-6 text-sm font-serif text-ink/80">{row.feature}</div>
                                <div className="col-span-3 text-center text-xs text-ink/60 font-light">
                                    {typeof row.explorer === 'boolean' 
                                        ? (row.explorer ? <Check size={14} className="mx-auto text-green-600"/> : <div className="w-1.5 h-1.5 bg-ink/10 rounded-full mx-auto"></div>)
                                        : row.explorer}
                                </div>
                                <div className="col-span-3 text-center text-xs text-ink font-medium">
                                    {typeof row.oracle === 'boolean' 
                                        ? (row.oracle ? <Check size={14} className="mx-auto text-gold"/> : <div className="w-1.5 h-1.5 bg-ink/10 rounded-full mx-auto"></div>)
                                        : row.oracle}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 4. FEATURE BREAKDOWN */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-12 border-t border-ink/5">
                    {[
                        { title: 'The Archives', icon: FileText, items: ['Deep-dive reports', 'Psychological profiles', 'Exportable PDFs'], link: 'archives' },
                        { title: 'The Council', icon: Users, items: ['Unlimited chat', '5 Specialized Guides', 'Context-aware advice'], link: 'guides' },
                        { title: 'Observatory', icon: Activity, items: ['Real-time transits', 'Cycle tracking', 'Daily alignment'], link: 'observatory' },
                        { title: 'Corridor', icon: Sparkles, items: ['Soul-contract matching', 'Synastry blueprints', 'Private dossiers'], link: 'corridor' },
                    ].map((feature, i) => (
                        <div key={i} className="p-6 border border-ink/10 bg-white hover:shadow-lg transition-all group cursor-pointer" onClick={() => onNavigate(feature.link)}>
                            <feature.icon size={24} className="text-ink/40 mb-6 group-hover:text-gold transition-colors" />
                            <h4 className="font-serif text-xl mb-4">{feature.title}</h4>
                            <ul className="space-y-2 mb-6">
                                {feature.items.map((item, idx) => (
                                    <li key={idx} className="text-xs text-ink/60 flex items-center gap-2">
                                        <div className="w-1 h-1 bg-ink/20 rounded-full"></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="text-[10px] uppercase tracking-widest text-ink/40 group-hover:text-ink flex items-center gap-2">
                                Explore <ArrowRight size={10} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* 5. FAQ */}
                <div className="max-w-2xl mx-auto pt-12 border-t border-ink/5">
                    <h3 className="text-center text-2xl font-serif text-ink mb-12">Common Queries</h3>
                    <div className="space-y-4">
                        {FAQS.map((faq, i) => (
                            <div key={i} className="border border-ink/10 bg-white">
                                <button 
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full flex items-center justify-between p-6 text-left hover:bg-paper-light transition-colors"
                                >
                                    <span className="text-sm font-serif text-ink">{faq.q}</span>
                                    {openFaq === i ? <ChevronUp size={14} className="text-ink/40"/> : <ChevronDown size={14} className="text-ink/40"/>}
                                </button>
                                <AnimatePresence>
                                    {openFaq === i && (
                                        <motion.div 
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-6 pt-0 text-xs text-ink/60 leading-relaxed font-light border-t border-ink/5">
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. FINAL CTA */}
                <div className="text-center pt-12 pb-20">
                    <h2 className="text-4xl lg:text-6xl font-display text-ink mb-8">Enter the museum.</h2>
                    <button className="px-10 py-4 bg-ink text-paper text-xs uppercase tracking-[0.25em] hover:bg-gold hover:text-white transition-colors shadow-2xl">
                        Unlock Oracle Pass
                    </button>
                </div>

             </div>
        </div>
    );
};