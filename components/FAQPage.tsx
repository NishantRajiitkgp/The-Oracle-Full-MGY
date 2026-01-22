import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, ChevronDown, ChevronUp, HelpCircle, 
  MessageCircle, Shield, CreditCard, Activity, 
  Database, User, ArrowRight, ArrowLeft, ChevronRight,
  Sparkles, MapPin, FileText
} from 'lucide-react';

interface FAQPageProps {
    onNavigate: (view: any) => void;
    onBack: () => void;
}

const CATEGORIES = [
    { id: 'all', label: 'All Questions' },
    { id: 'start', label: 'Getting Started' },
    { id: 'birth', label: 'Birth Data' },
    { id: 'reports', label: 'Reports & Archives' },
    { id: 'guides', label: 'The Council (Guides)' },
    { id: 'observatory', label: 'Observatory' },
    { id: 'corridor', label: 'Corridor (Match)' },
    { id: 'billing', label: 'Billing' },
    { id: 'privacy', label: 'Privacy & Safety' }
];

const FAQS = [
    {
        id: 'q1',
        category: 'start',
        q: "What is Mind Guru Yoga (MGY)?",
        a: "MGY is a personal navigation system that combines high-precision astrology with Jungian psychology. Unlike generic horoscope apps, we calculate a unique 'cosmic architecture' based on your exact birth data to provide hyper-personalized guidance on career, love, and self-evolution."
    },
    {
        id: 'q2',
        category: 'start',
        q: "Is MGY free to use?",
        a: "We offer an 'Explorer Pass' which is free forever. It includes your basic birth chart, daily guidance summaries, and limited access to The Council. For deep-dive reports, unlimited chat, and matchmaking features, you will need the 'Oracle Pass'."
    },
    {
        id: 'q3',
        category: 'birth',
        q: "Why do you need my exact birth time?",
        a: "Astrology is geometry. Without an accurate birth time, we cannot calculate your Rising Sign (Ascendant) or the House placement of your planets. A discrepancy of just 4 minutes moves the chart by 1 degree. For the precision we promise, exact time is non-negotiable."
    },
    {
        id: 'q4',
        category: 'birth',
        q: "What if I don't know my birth time?",
        a: "If your time is unknown, we default to a 'Noon Chart' or allow you to proceed without House calculations. However, specific features like 'Life Rooms' and 'Transits' will be less accurate or unavailable."
    },
    {
        id: 'q5',
        category: 'reports',
        q: "How often are reports updated?",
        a: "Daily Guidance is refreshed every morning at 00:00 local time. Transit reports update whenever a planetary aspect enters a 3-degree orb of your natal placements. Deep-dive manuscripts (like the Annual Forecast) are generated once per year or upon request."
    },
    {
        id: 'q6',
        category: 'guides',
        q: "Are the Guides AI or real people?",
        a: "The Guides (The Mystic, The Strategist, etc.) are specialized AI personas trained on specific philosophical and astrological datasets. They are designed to simulate a dialogue with an expert in that field, filtered through your specific chart data."
    },
    {
        id: 'q7',
        category: 'observatory',
        q: "What is a 'Cycle'?",
        a: "A Cycle is a major long-term transit, such as a Saturn Return (age 29) or Uranus Opposition (age 42). These periods last 1-3 years and represent fundamental structural shifts in your life architecture."
    },
    {
        id: 'q8',
        category: 'corridor',
        q: "How does compatibility work?",
        a: "We do not use random swiping. Matches are surfaced based on 'Synastry'—the geometric relationship between your planets and theirs. We look for specific aspects (like Sun conjunct Moon) that indicate high resonance, karmic lessons, or long-term stability."
    },
    {
        id: 'q9',
        category: 'corridor',
        q: "Can I hide my profile?",
        a: "Yes. In Corridor Settings, you can toggle 'Public Profile' to off. You will not be visible to others, but you also will not be able to see new matches until you reactivate."
    },
    {
        id: 'q10',
        category: 'billing',
        q: "How do I cancel my subscription?",
        a: "Go to Account Settings > Access Pass. You can cancel instantly. You will retain access to Oracle features until the end of your current billing period."
    },
    {
        id: 'q11',
        category: 'privacy',
        q: "Is my data sold?",
        a: "Never. Your birth data is encrypted and used solely to generate your chart calculations. We do not sell user data to third parties. We are a subscription-based service, not an ad-based one."
    },
    {
        id: 'q12',
        category: 'privacy',
        q: "How do I report a user?",
        a: "If you encounter unsafe behavior in the Corridor, navigate to the user's dossier or chat, tap the 'More' icon, and select 'Report'. You can also use the Safety Protocol on our Contact page for immediate escalation."
    }
];

export const FAQPage: React.FC<FAQPageProps> = ({ onNavigate, onBack }) => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [openItem, setOpenItem] = useState<string | null>(null);

    const filteredFAQs = FAQS.filter(item => {
        const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
        const matchesSearch = item.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              item.a.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-paper pt-32 pb-20 relative overflow-hidden">
             {/* Background Grid */}
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none grid-bg" />

             <div className="max-w-[1200px] mx-auto px-6 lg:px-12 relative z-10 space-y-12">
                
                {/* 1. HEADER */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-ink/5 pb-8 gap-8"
                >
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-ink/40">
                            <button onClick={onBack} className="hover:text-ink transition-colors">Home</button>
                            <ChevronRight size={10} />
                            <span className="text-ink font-bold">Knowledge Base</span>
                        </div>
                        
                        <div>
                            <h1 className="text-4xl lg:text-5xl font-display text-ink mb-2">Frequency & Questions</h1>
                            <p className="text-lg text-ink/60 font-serif max-w-xl">
                                Decoding the system mechanics.
                            </p>
                        </div>
                    </div>

                    <div className="w-full md:w-auto relative group min-w-[300px]">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/20 group-focus-within:text-gold transition-colors" size={16} />
                        <input 
                            type="text" 
                            placeholder="Search help topics..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border border-ink/10 py-3 pl-12 pr-4 text-sm font-serif placeholder:font-sans placeholder:text-ink/20 focus:outline-none focus:border-gold transition-colors shadow-sm"
                        />
                    </div>
                </motion.div>

                {/* 2. CATEGORIES */}
                <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-2">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`
                                px-4 py-2 text-[10px] uppercase tracking-widest border transition-all whitespace-nowrap rounded-sm
                                ${activeCategory === cat.id 
                                    ? 'bg-ink text-paper border-ink shadow-md' 
                                    : 'bg-white border-ink/10 text-ink/60 hover:border-ink/40 hover:text-ink'}
                            `}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* 3. ACCORDION LIST */}
                <div className="min-h-[400px]">
                    {filteredFAQs.length > 0 ? (
                        <div className="space-y-4">
                            {filteredFAQs.map((item) => (
                                <motion.div 
                                    key={item.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`bg-white border transition-all duration-300 ${openItem === item.id ? 'border-ink shadow-md' : 'border-ink/10 hover:border-ink/30'}`}
                                >
                                    <button 
                                        onClick={() => setOpenItem(openItem === item.id ? null : item.id)}
                                        className="w-full flex items-center justify-between p-6 text-left"
                                    >
                                        <span className="font-serif text-lg text-ink pr-8">{item.q}</span>
                                        {openItem === item.id ? <ChevronUp size={16} className="text-ink flex-shrink-0" /> : <ChevronDown size={16} className="text-ink/30 flex-shrink-0" />}
                                    </button>
                                    <AnimatePresence>
                                        {openItem === item.id && (
                                            <motion.div 
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="p-6 pt-0 text-sm text-ink/70 font-light leading-relaxed border-t border-ink/5 max-w-3xl">
                                                    {item.a}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 border border-dashed border-ink/10 text-ink/40">
                            <HelpCircle size={32} className="mx-auto mb-4 opacity-50" />
                            <p className="text-xs uppercase tracking-widest">No answers found for "{searchQuery}"</p>
                            <button 
                                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                                className="mt-4 text-ink font-bold hover:underline"
                            >
                                Clear Search
                            </button>
                        </div>
                    )}
                </div>

                {/* 4. SUPPORT CTA */}
                <div className="bg-ink text-paper p-12 relative overflow-hidden shadow-xl mt-12 rounded-sm">
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h3 className="text-3xl font-display text-white mb-2">Still need guidance?</h3>
                            <p className="text-white/60 font-serif text-lg">
                                Our support team is available for system issues and safety reports.
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <button 
                                onClick={() => onNavigate('contact')}
                                className="px-8 py-3 bg-gold text-ink font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors border border-gold"
                            >
                                Contact Support
                            </button>
                            <button 
                                onClick={() => onNavigate('account')}
                                className="px-8 py-3 border border-white/20 text-white text-xs uppercase tracking-widest hover:bg-white hover:text-ink transition-colors"
                            >
                                Manage Account
                            </button>
                        </div>
                    </div>
                    {/* Abstract Texture */}
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none"></div>
                </div>

             </div>
        </div>
    );
};