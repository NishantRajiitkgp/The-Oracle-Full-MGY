import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Save, Eye, EyeOff, MessageCircle, 
  MapPin, Activity, Heart, Shield, AlertTriangle, 
  Trash2, UserX, Check, Lock, ChevronRight,
  SlidersHorizontal, RefreshCw, AlertCircle, Ban, X
} from 'lucide-react';

interface CorridorSettingsProps {
    onNavigate: (view: any) => void;
    onBack: () => void;
}

const SECTIONS = [
    { id: 'visibility', label: 'Visibility', icon: Eye },
    { id: 'preferences', label: 'Preferences', icon: Heart },
    { id: 'discovery', label: 'Discovery Filters', icon: SlidersHorizontal },
    { id: 'safety', label: 'Safety & Blocking', icon: Shield }
];

const INTENTIONS = [
    'Soul Union', 'Legacy Building', 'Orbiting (Casual)', 'Discovery'
];

const LOOKING_FOR = [
    'Emotional Depth', 'Intellectual Rigor', 'Creative Partner', 'Travel Companion', 'Spiritual Ally'
];

const BLOCKED_USERS = [
    { id: 1, name: 'Alex M.', reason: 'Harassment', date: 'Oct 10, 2026' },
    { id: 2, name: 'Sarah K.', reason: 'Mismatched Vibe', date: 'Sep 22, 2026' }
];

export const CorridorSettings: React.FC<CorridorSettingsProps> = ({ onNavigate, onBack }) => {
    const [activeSection, setActiveSection] = useState('visibility');
    const [hasChanges, setHasChanges] = useState(false);
    
    // State Mock
    const [settings, setSettings] = useState({
        visibility: {
            publicProfile: true,
            allowMessages: true,
            showScore: true,
            hideCity: false,
            paused: false
        },
        preferences: {
            intention: 'Soul Union',
            lookingFor: ['Emotional Depth', 'Spiritual Ally'],
            dealbreakers: ['Smoking', 'Closed Mindedness'],
            note: ''
        },
        discovery: {
            ageRange: [28, 42],
            distance: 50,
            strictness: 'High',
            minSafety: 70,
            minAttraction: 60,
            verifiedOnly: true
        }
    });

    const [dealbreakerInput, setDealbreakerInput] = useState('');

    const toggleSetting = (section: string, key: string) => {
        setSettings(prev => ({
            ...prev,
            [section]: {
                // @ts-ignore
                ...prev[section],
                // @ts-ignore
                [key]: !prev[section][key]
            }
        }));
        setHasChanges(true);
    };

    const updatePreference = (key: string, value: any) => {
        setSettings(prev => ({
            ...prev,
            preferences: {
                ...prev.preferences,
                [key]: value
            }
        }));
        setHasChanges(true);
    };

    const addDealbreaker = (e: React.FormEvent) => {
        e.preventDefault();
        if (dealbreakerInput && !settings.preferences.dealbreakers.includes(dealbreakerInput)) {
            updatePreference('dealbreakers', [...settings.preferences.dealbreakers, dealbreakerInput]);
            setDealbreakerInput('');
        }
    };

    const removeDealbreaker = (tag: string) => {
        updatePreference('dealbreakers', settings.preferences.dealbreakers.filter(t => t !== tag));
    };

    const renderContent = () => {
        switch (activeSection) {
            case 'visibility':
                return (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div>
                            <h3 className="text-2xl font-serif text-ink mb-2">Profile Visibility</h3>
                            <p className="text-ink/60 text-sm">Control how you appear in the resonance field.</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-6 bg-white border border-ink/10 shadow-sm">
                                <div>
                                    <div className="text-sm font-bold text-ink mb-1">Show Profile in Corridor</div>
                                    <div className="text-xs text-ink/50">Your card will be visible to compatible matches.</div>
                                </div>
                                <button 
                                    onClick={() => toggleSetting('visibility', 'publicProfile')}
                                    className={`w-12 h-6 rounded-full relative transition-colors ${settings.visibility.publicProfile ? 'bg-ink' : 'bg-ink/10'}`}
                                >
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.visibility.publicProfile ? 'left-7' : 'left-1'}`}></div>
                                </button>
                            </div>

                            <div className="flex items-center justify-between p-6 bg-white border border-ink/10 shadow-sm">
                                <div>
                                    <div className="text-sm font-bold text-ink mb-1">Allow Incoming Signals</div>
                                    <div className="text-xs text-ink/50">Let others initiate conversation before you match.</div>
                                </div>
                                <button 
                                    onClick={() => toggleSetting('visibility', 'allowMessages')}
                                    className={`w-12 h-6 rounded-full relative transition-colors ${settings.visibility.allowMessages ? 'bg-ink' : 'bg-ink/10'}`}
                                >
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.visibility.allowMessages ? 'left-7' : 'left-1'}`}></div>
                                </button>
                            </div>

                            <div className="flex items-center justify-between p-6 bg-white border border-ink/10 shadow-sm">
                                <div>
                                    <div className="text-sm font-bold text-ink mb-1">Display Compatibility Score</div>
                                    <div className="text-xs text-ink/50">Show the calculated resonance percentage on your card.</div>
                                </div>
                                <button 
                                    onClick={() => toggleSetting('visibility', 'showScore')}
                                    className={`w-12 h-6 rounded-full relative transition-colors ${settings.visibility.showScore ? 'bg-ink' : 'bg-ink/10'}`}
                                >
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.visibility.showScore ? 'left-7' : 'left-1'}`}></div>
                                </button>
                            </div>

                            <div className="flex items-center justify-between p-6 bg-white border border-ink/10 shadow-sm">
                                <div>
                                    <div className="text-sm font-bold text-ink mb-1">Mask Exact Location</div>
                                    <div className="text-xs text-ink/50">Show only region (e.g. "London Area") instead of distance.</div>
                                </div>
                                <button 
                                    onClick={() => toggleSetting('visibility', 'hideCity')}
                                    className={`w-12 h-6 rounded-full relative transition-colors ${settings.visibility.hideCity ? 'bg-ink' : 'bg-ink/10'}`}
                                >
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.visibility.hideCity ? 'left-7' : 'left-1'}`}></div>
                                </button>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-ink/10">
                            <div className="bg-ink/5 p-6 border border-ink/10 flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-bold text-ink mb-1">Pause Matchmaking</div>
                                    <div className="text-xs text-ink/50">Hide your profile temporarily without deleting data.</div>
                                </div>
                                <button 
                                    onClick={() => toggleSetting('visibility', 'paused')}
                                    className={`px-4 py-2 text-[10px] uppercase tracking-widest border transition-colors ${settings.visibility.paused ? 'bg-ink text-paper border-ink' : 'bg-white text-ink border-ink/20 hover:border-ink'}`}
                                >
                                    {settings.visibility.paused ? 'Resumé' : 'Pause'}
                                </button>
                            </div>
                        </div>
                    </div>
                );

            case 'preferences':
                return (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div>
                            <h3 className="text-2xl font-serif text-ink mb-2">Matching Preferences</h3>
                            <p className="text-ink/60 text-sm">Calibrate the algorithm to your desires.</p>
                        </div>

                        <div className="space-y-8">
                            {/* Intention */}
                            <div>
                                <label className="text-[10px] uppercase tracking-widest text-ink/40 mb-3 block">Primary Intention</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {INTENTIONS.map(intent => (
                                        <button
                                            key={intent}
                                            onClick={() => updatePreference('intention', intent)}
                                            className={`p-3 text-left border transition-all ${settings.preferences.intention === intent ? 'bg-ink text-paper border-ink' : 'bg-white border-ink/10 hover:border-ink/30'}`}
                                        >
                                            <span className="text-sm font-serif">{intent}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Looking For */}
                            <div>
                                <label className="text-[10px] uppercase tracking-widest text-ink/40 mb-3 block">Looking For</label>
                                <div className="flex flex-wrap gap-2">
                                    {LOOKING_FOR.map(item => {
                                        const active = settings.preferences.lookingFor.includes(item);
                                        return (
                                            <button
                                                key={item}
                                                onClick={() => {
                                                    const newArr = active 
                                                        ? settings.preferences.lookingFor.filter(i => i !== item)
                                                        : [...settings.preferences.lookingFor, item];
                                                    updatePreference('lookingFor', newArr);
                                                }}
                                                className={`px-4 py-2 text-xs uppercase tracking-widest border transition-all rounded-sm ${active ? 'bg-ink text-paper border-ink' : 'bg-white border-ink/10 text-ink/60 hover:border-ink/30'}`}
                                            >
                                                {item}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Dealbreakers */}
                            <div>
                                <label className="text-[10px] uppercase tracking-widest text-ink/40 mb-3 block">Dealbreakers</label>
                                <form onSubmit={addDealbreaker} className="relative mb-3">
                                    <input 
                                        type="text" 
                                        value={dealbreakerInput}
                                        onChange={(e) => setDealbreakerInput(e.target.value)}
                                        placeholder="Add a dealbreaker (e.g. 'Smoking')..."
                                        className="w-full bg-white border border-ink/10 p-3 text-sm font-serif focus:outline-none focus:border-gold transition-colors"
                                    />
                                    <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink">
                                        <Check size={16} />
                                    </button>
                                </form>
                                <div className="flex flex-wrap gap-2">
                                    {settings.preferences.dealbreakers.map(tag => (
                                        <span key={tag} className="flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 border border-red-100 text-xs rounded-sm">
                                            {tag}
                                            <button onClick={() => removeDealbreaker(tag)} className="hover:text-red-800"><X size={12} /></button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'discovery':
                return (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div>
                            <h3 className="text-2xl font-serif text-ink mb-2">Discovery Filters</h3>
                            <p className="text-ink/60 text-sm">Set the boundary conditions for the search engine.</p>
                        </div>

                        <div className="bg-white border border-ink/10 p-6 space-y-8 shadow-sm">
                            {/* Age Range */}
                            <div>
                                <div className="flex justify-between mb-4">
                                    <label className="text-[10px] uppercase tracking-widest text-ink/60">Age Range</label>
                                    <span className="font-mono text-xs">{settings.discovery.ageRange[0]} - {settings.discovery.ageRange[1]}</span>
                                </div>
                                <div className="h-1 bg-ink/10 rounded-full relative">
                                    <div className="absolute left-[20%] right-[30%] top-0 bottom-0 bg-ink rounded-full"></div>
                                    <div className="absolute left-[20%] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border border-ink rounded-full shadow-sm cursor-pointer hover:scale-110 transition-transform"></div>
                                    <div className="absolute right-[30%] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border border-ink rounded-full shadow-sm cursor-pointer hover:scale-110 transition-transform"></div>
                                </div>
                            </div>

                            {/* Distance */}
                            <div>
                                <div className="flex justify-between mb-4">
                                    <label className="text-[10px] uppercase tracking-widest text-ink/60">Max Distance</label>
                                    <span className="font-mono text-xs">{settings.discovery.distance} km</span>
                                </div>
                                <div className="h-1 bg-ink/10 rounded-full relative">
                                    <div className="absolute left-0 w-[40%] top-0 bottom-0 bg-ink rounded-full"></div>
                                    <div className="absolute left-[40%] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border border-ink rounded-full shadow-sm cursor-pointer hover:scale-110 transition-transform"></div>
                                </div>
                            </div>

                            {/* Thresholds */}
                            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-ink/5">
                                <div>
                                    <div className="flex justify-between mb-3">
                                        <label className="text-[10px] uppercase tracking-widest text-ink/60">Min. Emotional Safety</label>
                                        <span className="font-mono text-xs">{settings.discovery.minSafety}%</span>
                                    </div>
                                    <div className="h-1 bg-ink/10 rounded-full relative">
                                        <div className="absolute left-0 w-[70%] top-0 bottom-0 bg-blue-400 rounded-full"></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-3">
                                        <label className="text-[10px] uppercase tracking-widest text-ink/60">Min. Attraction</label>
                                        <span className="font-mono text-xs">{settings.discovery.minAttraction}%</span>
                                    </div>
                                    <div className="h-1 bg-ink/10 rounded-full relative">
                                        <div className="absolute left-0 w-[60%] top-0 bottom-0 bg-red-400 rounded-full"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Verified Toggle */}
                            <div className="flex items-center justify-between pt-4 border-t border-ink/5">
                                <div>
                                    <div className="text-sm font-bold text-ink">Verified Profiles Only</div>
                                    <div className="text-xs text-ink/50">Filter out unverified accounts.</div>
                                </div>
                                <button className="w-10 h-6 bg-ink rounded-full relative">
                                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                                </button>
                            </div>
                        </div>
                    </div>
                );

            case 'safety':
                return (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div>
                            <h3 className="text-2xl font-serif text-ink mb-2">Safety & Blocking</h3>
                            <p className="text-ink/60 text-sm">Manage your boundaries and restrictions.</p>
                        </div>

                        {/* Blocked Users */}
                        <div className="bg-white border border-ink/10 shadow-sm">
                            <div className="p-4 border-b border-ink/5 flex justify-between items-center bg-paper-light">
                                <span className="text-[10px] uppercase tracking-widest text-ink/40 font-bold">Blocked Users</span>
                                <span className="text-[10px] text-ink/40">{BLOCKED_USERS.length} Total</span>
                            </div>
                            <div>
                                {BLOCKED_USERS.map((user) => (
                                    <div key={user.id} className="flex items-center justify-between p-4 border-b border-ink/5 last:border-0 hover:bg-paper-light transition-colors">
                                        <div>
                                            <div className="text-sm font-bold text-ink">{user.name}</div>
                                            <div className="text-[10px] text-ink/40 uppercase tracking-wider">{user.reason} • {user.date}</div>
                                        </div>
                                        <button className="text-[10px] uppercase tracking-widest text-ink/40 hover:text-ink border border-ink/10 px-3 py-1 rounded-sm hover:border-ink transition-colors">
                                            Unblock
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Additional Options */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-white border border-ink/10">
                                <div>
                                    <div className="text-sm font-bold text-ink">Hide from Contacts</div>
                                    <div className="text-xs text-ink/50">Prevent people in your phone book from seeing you.</div>
                                </div>
                                <button className="w-10 h-6 bg-ink/10 rounded-full relative">
                                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full border border-ink/10"></div>
                                </button>
                            </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-100 p-6 flex gap-4 items-start rounded-sm">
                            <AlertCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <h4 className="text-sm font-bold text-blue-800 mb-1">Safety Center</h4>
                                <p className="text-xs text-blue-600 mb-4 leading-relaxed">
                                    If you feel unsafe or have experienced harassment, please review our safety resources or contact support immediately.
                                </p>
                                <button className="text-[10px] uppercase tracking-widest font-bold text-blue-700 hover:underline">
                                    View Resources
                                </button>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-paper pt-32 pb-20 relative overflow-hidden">
             {/* Background Grid */}
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none grid-bg" />

             <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 space-y-12">
                
                {/* 1. HEADER */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-ink/5 pb-8 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-ink/40">
                            <button onClick={onBack} className="hover:text-ink transition-colors">Corridor</button>
                            <ChevronRight size={10} />
                            <span className="text-ink font-bold">Settings</span>
                        </div>
                        
                        <div>
                            <h1 className="text-4xl lg:text-5xl font-display text-ink mb-2">Corridor Settings</h1>
                            <p className="text-lg text-ink/60 font-serif max-w-xl">
                                Control visibility, preferences, and matching filters.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <AnimatePresence>
                            {hasChanges && (
                                <motion.button 
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    onClick={() => setHasChanges(false)}
                                    className="flex items-center gap-2 px-8 py-3 bg-ink text-paper text-xs uppercase tracking-[0.2em] hover:bg-gold hover:text-white transition-colors shadow-lg"
                                >
                                    <Save size={14} /> Save Changes
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* 2. LAYOUT */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 min-h-[600px]">
                    
                    {/* --- LEFT: SIDEBAR NAVIGATION --- */}
                    <div className="lg:col-span-3 border-r border-ink/5 pr-6">
                        <div className="space-y-1 sticky top-32">
                            {SECTIONS.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id)}
                                    className={`w-full flex items-center justify-between px-4 py-4 text-xs uppercase tracking-widest transition-all rounded-sm group ${
                                        activeSection === section.id 
                                        ? 'bg-ink text-paper font-bold shadow-md' 
                                        : 'text-ink/60 hover:bg-ink/5 hover:text-ink'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <section.icon size={14} className={activeSection === section.id ? 'text-gold' : 'text-ink/30 group-hover:text-ink/60'} />
                                        {section.label}
                                    </div>
                                    {activeSection === section.id && <ChevronRight size={12} />}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* --- RIGHT: CONTENT PANELS --- */}
                    <div className="lg:col-span-9 pl-0 lg:pl-6 pb-20">
                        {renderContent()}

                        {/* Danger Zone */}
                        <div className="mt-20 pt-12 border-t border-ink/5">
                            <h3 className="text-lg font-serif text-red-600 mb-4 flex items-center gap-2">
                                <AlertTriangle size={18} /> Danger Zone
                            </h3>
                            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-red-50/50 p-6 border border-red-100 rounded-sm">
                                <div>
                                    <div className="text-sm font-bold text-red-800">Delete Corridor Profile</div>
                                    <div className="text-xs text-red-600/70 mt-1">
                                        This will permanently remove you from the match feed and delete all message history.
                                    </div>
                                </div>
                                <button className="px-6 py-3 border border-red-200 text-red-600 text-[10px] uppercase tracking-widest hover:bg-red-600 hover:text-white transition-colors whitespace-nowrap">
                                    Delete Profile
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

             </div>
        </div>
    );
};