import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Calendar, CreditCard, Bell, Shield, 
  Database, LogOut, Camera, Save, MapPin, 
  Clock, Check, AlertTriangle, Download, Trash2,
  ChevronRight, ArrowRight, Star, FileText
} from 'lucide-react';

interface AccountSettingsProps {
    onNavigate: (view: any) => void;
    onLogout: () => void;
}

// --- MOCK DATA ---

const USER_DATA = {
    name: 'Marcus G. Y.',
    email: 'marcus@mindguruyoga.com',
    username: '@marcus_gy',
    photo: null,
    birthDate: '1988-10-24',
    birthTime: '08:30',
    birthPlace: 'London, UK',
    plan: 'Oracle Pass',
    renewal: 'Nov 24, 2026',
    notifications: {
        daily: true,
        cycle: true,
        reports: false,
        matches: true
    },
    privacy: {
        publicProfile: true,
        showDistance: false
    }
};

const TABS = [
    { id: 'profile', label: 'Identity', icon: User },
    { id: 'birth', label: 'Birth Data', icon: Calendar },
    { id: 'sub', label: 'Access Pass', icon: CreditCard },
    { id: 'notify', label: 'Signals', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'data', label: 'Data & Export', icon: Database },
];

export const AccountSettings: React.FC<AccountSettingsProps> = ({ onNavigate, onLogout }) => {
    const [activeTab, setActiveTab] = useState('profile');
    const [hasChanges, setHasChanges] = useState(false);
    const [formData, setFormData] = useState(USER_DATA);

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setHasChanges(true);
    };

    const handleToggle = (category: 'notifications' | 'privacy', field: string) => {
        setFormData(prev => ({
            ...prev,
            [category]: {
                ...prev[category as keyof typeof prev],
                // @ts-ignore
                [field]: !prev[category][field]
            }
        }));
        setHasChanges(true);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 max-w-2xl">
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 bg-ink/5 border border-ink/10 rounded-full flex items-center justify-center relative group cursor-pointer overflow-hidden">
                                {formData.photo ? (
                                    <div className="w-full h-full bg-gray-300"></div> // Mock image
                                ) : (
                                    <User size={32} className="text-ink/20" />
                                )}
                                <div className="absolute inset-0 bg-ink/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-paper">
                                    <Camera size={20} />
                                </div>
                            </div>
                            <div>
                                <h3 className="font-serif text-xl text-ink">Profile Image</h3>
                                <p className="text-xs text-ink/40 mb-3">Visible to matches in the Corridor.</p>
                                <div className="flex gap-3">
                                    <button className="text-[10px] uppercase tracking-widest border border-ink/10 px-3 py-1.5 hover:bg-ink hover:text-paper transition-colors">Upload</button>
                                    <button className="text-[10px] uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors">Remove</button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-ink/40">Full Name</label>
                                    <input 
                                        value={formData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        className="w-full bg-white border border-ink/10 p-3 text-sm font-serif focus:outline-none focus:border-gold transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-ink/40">Public Handle</label>
                                    <input 
                                        value={formData.username}
                                        onChange={(e) => handleInputChange('username', e.target.value)}
                                        className="w-full bg-white border border-ink/10 p-3 text-sm font-serif focus:outline-none focus:border-gold transition-colors"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-ink/40">Email Address</label>
                                <input 
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    className="w-full bg-white border border-ink/10 p-3 text-sm font-serif focus:outline-none focus:border-gold transition-colors"
                                />
                            </div>
                        </div>
                    </motion.div>
                );

            case 'birth':
                return (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 max-w-2xl">
                        <div className="bg-[#FDFBF7] p-6 border border-ink/10 flex items-start gap-4">
                            <AlertTriangle size={20} className="text-gold mt-1" />
                            <div>
                                <h4 className="text-sm font-bold text-ink mb-1">Calibration Data</h4>
                                <p className="text-xs text-ink/60 leading-relaxed">
                                    Changing these details will trigger a full system recalibration. Your charts, reports, and compatibility scores will be regenerated.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-ink/40 flex items-center gap-2">
                                    <Calendar size={12} /> Date of Birth
                                </label>
                                <input 
                                    type="date"
                                    value={formData.birthDate}
                                    onChange={(e) => handleInputChange('birthDate', e.target.value)}
                                    className="w-full bg-white border border-ink/10 p-3 text-sm font-mono focus:outline-none focus:border-gold transition-colors"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-ink/40 flex items-center gap-2">
                                    <Clock size={12} /> Time of Birth
                                </label>
                                <input 
                                    type="time"
                                    value={formData.birthTime}
                                    onChange={(e) => handleInputChange('birthTime', e.target.value)}
                                    className="w-full bg-white border border-ink/10 p-3 text-sm font-mono focus:outline-none focus:border-gold transition-colors"
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-[10px] uppercase tracking-widest text-ink/40 flex items-center gap-2">
                                    <MapPin size={12} /> Place of Birth
                                </label>
                                <input 
                                    type="text"
                                    value={formData.birthPlace}
                                    onChange={(e) => handleInputChange('birthPlace', e.target.value)}
                                    className="w-full bg-white border border-ink/10 p-3 text-sm font-serif focus:outline-none focus:border-gold transition-colors"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-ink/5">
                            <div className="flex items-center gap-2 text-xs text-green-600">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                High Accuracy
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 border border-ink/10 text-[10px] uppercase tracking-widest hover:bg-ink hover:text-paper transition-colors">
                                Recalculate Chart <ArrowRight size={12} />
                            </button>
                        </div>
                    </motion.div>
                );

            case 'sub':
                return (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 max-w-2xl">
                        <div className="bg-ink text-paper p-8 relative overflow-hidden shadow-lg">
                            <div className="relative z-10 flex justify-between items-start">
                                <div>
                                    <div className="text-[10px] uppercase tracking-widest text-gold mb-2">Current Plan</div>
                                    <h3 className="text-3xl font-display text-white mb-4">Oracle Pass</h3>
                                    <p className="text-xs text-white/60 mb-6">Full access to all rooms, archives, and corridor features.</p>
                                    <div className="flex items-center gap-2 text-xs font-mono text-white/40">
                                        <span>Next Billing: {formData.renewal}</span>
                                        <span>•</span>
                                        <span>$12.00/mo</span>
                                    </div>
                                </div>
                                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold border border-gold/20">
                                    <Star size={20} fill="currentColor" />
                                </div>
                            </div>
                            {/* Abstract BG */}
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gold/5 rounded-full blur-2xl"></div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <button className="flex-1 py-3 border border-ink/10 bg-white text-xs uppercase tracking-widest hover:border-ink transition-colors">
                                    Manage Payment
                                </button>
                                <button className="flex-1 py-3 border border-ink/10 bg-white text-xs uppercase tracking-widest hover:border-ink transition-colors">
                                    View Invoices
                                </button>
                            </div>
                            <button className="w-full py-3 text-[10px] uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors">
                                Cancel Subscription
                            </button>
                        </div>
                    </motion.div>
                );

            case 'notify':
                return (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-2xl">
                        <h3 className="text-lg font-serif text-ink mb-4">Email & Push Signals</h3>
                        
                        {[
                            { id: 'daily', label: 'Daily Alignment', desc: 'Morning briefing on planetary weather.' },
                            { id: 'cycle', label: 'Cycle Shifts', desc: 'Alerts when major planets change houses.' },
                            { id: 'reports', label: 'Report Readiness', desc: 'Notifications when deep-dive reports are generated.' },
                            { id: 'matches', label: 'Corridor Activity', desc: 'New matches and messages from connections.' }
                        ].map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-4 bg-white border border-ink/10">
                                <div>
                                    <div className="text-sm font-bold text-ink">{item.label}</div>
                                    <div className="text-xs text-ink/50">{item.desc}</div>
                                </div>
                                <button 
                                    onClick={() => handleToggle('notifications', item.id)}
                                    className={`w-10 h-5 rounded-full relative transition-colors ${formData.notifications[item.id as keyof typeof formData.notifications] ? 'bg-ink' : 'bg-ink/10'}`}
                                >
                                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${formData.notifications[item.id as keyof typeof formData.notifications] ? 'left-6' : 'left-1'}`}></div>
                                </button>
                            </div>
                        ))}
                    </motion.div>
                );

            case 'privacy':
                return (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 max-w-2xl">
                        <div className="space-y-6">
                            <h3 className="text-lg font-serif text-ink">Corridor Visibility</h3>
                            <div className="flex items-center justify-between p-4 bg-white border border-ink/10">
                                <div>
                                    <div className="text-sm font-bold text-ink">Public Profile</div>
                                    <div className="text-xs text-ink/50">Allow other users to find you in the Match Feed.</div>
                                </div>
                                <button 
                                    onClick={() => handleToggle('privacy', 'publicProfile')}
                                    className={`w-10 h-5 rounded-full relative transition-colors ${formData.privacy.publicProfile ? 'bg-ink' : 'bg-ink/10'}`}
                                >
                                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${formData.privacy.publicProfile ? 'left-6' : 'left-1'}`}></div>
                                </button>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-white border border-ink/10">
                                <div>
                                    <div className="text-sm font-bold text-ink">Show Distance</div>
                                    <div className="text-xs text-ink/50">Display your approximate location radius.</div>
                                </div>
                                <button 
                                    onClick={() => handleToggle('privacy', 'showDistance')}
                                    className={`w-10 h-5 rounded-full relative transition-colors ${formData.privacy.showDistance ? 'bg-ink' : 'bg-ink/10'}`}
                                >
                                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${formData.privacy.showDistance ? 'left-6' : 'left-1'}`}></div>
                                </button>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-ink/5">
                            <h3 className="text-lg font-serif text-ink mb-4">Blocked Users</h3>
                            <p className="text-xs text-ink/40 mb-4">You have no blocked users.</p>
                            <button className="text-[10px] uppercase tracking-widest text-ink/60 hover:text-ink border border-ink/10 px-4 py-2 bg-white">
                                Manage Block List
                            </button>
                        </div>
                    </motion.div>
                );

            case 'data':
                return (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 max-w-2xl">
                        <div className="space-y-4">
                            <h3 className="text-lg font-serif text-ink">Export Data</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button className="p-4 bg-white border border-ink/10 hover:border-ink/30 transition-colors text-left group">
                                    <div className="flex justify-between items-start mb-2">
                                        <FileText size={20} className="text-ink/40 group-hover:text-ink transition-colors" />
                                        <Download size={14} className="text-ink/20 group-hover:text-ink" />
                                    </div>
                                    <div className="text-sm font-bold text-ink">Path Notes</div>
                                    <div className="text-[10px] text-ink/40">JSON format</div>
                                </button>
                                <button className="p-4 bg-white border border-ink/10 hover:border-ink/30 transition-colors text-left group">
                                    <div className="flex justify-between items-start mb-2">
                                        <Database size={20} className="text-ink/40 group-hover:text-ink transition-colors" />
                                        <Download size={14} className="text-ink/20 group-hover:text-ink" />
                                    </div>
                                    <div className="text-sm font-bold text-ink">Full Archive</div>
                                    <div className="text-[10px] text-ink/40">Zip bundle (PDFs)</div>
                                </button>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-ink/5">
                            <h3 className="text-lg font-serif text-red-600 mb-4">Danger Zone</h3>
                            <p className="text-xs text-ink/60 mb-6">
                                Deleting your account is permanent. All charts, reports, and messages will be erased from the singularity.
                            </p>
                            <button className="flex items-center gap-2 px-6 py-3 border border-red-200 bg-red-50 text-red-600 text-xs uppercase tracking-widest hover:bg-red-100 transition-colors">
                                <Trash2 size={14} /> Delete Account
                            </button>
                        </div>
                    </motion.div>
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
                
                {/* 1. HEADER BLOCK */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-ink/5 pb-8">
                    <div>
                        <h1 className="text-4xl lg:text-5xl font-display text-ink mb-2">Account Settings</h1>
                        <p className="text-ink/60 font-serif text-lg">
                            Manage your identity, birth data, access, and privacy.
                        </p>
                    </div>
                    
                    <AnimatePresence>
                        {hasChanges && (
                            <motion.button 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="mt-6 md:mt-0 flex items-center gap-2 px-8 py-3 bg-ink text-paper text-xs uppercase tracking-[0.2em] hover:bg-gold hover:text-white transition-colors shadow-lg"
                                onClick={() => setHasChanges(false)}
                            >
                                <Save size={14} /> Save Changes
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>

                {/* 2. LAYOUT */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 min-h-[600px]">
                    
                    {/* --- LEFT: SIDEBAR NAVIGATION --- */}
                    <div className="lg:col-span-3 border-r border-ink/5 pr-6">
                        <div className="space-y-1 sticky top-32">
                            {TABS.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center justify-between px-4 py-3 text-xs uppercase tracking-widest transition-all rounded-sm group ${
                                        activeTab === tab.id 
                                        ? 'bg-ink text-paper font-bold shadow-md' 
                                        : 'text-ink/60 hover:bg-ink/5 hover:text-ink'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <tab.icon size={14} className={activeTab === tab.id ? 'text-gold' : 'text-ink/30 group-hover:text-ink/60'} />
                                        {tab.label}
                                    </div>
                                    {activeTab === tab.id && <ChevronRight size={12} />}
                                </button>
                            ))}

                            <div className="pt-8 mt-8 border-t border-ink/5">
                                <button 
                                    onClick={onLogout}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-widest text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors rounded-sm"
                                >
                                    <LogOut size={14} /> Logout
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* --- RIGHT: CONTENT PANELS --- */}
                    <div className="lg:col-span-9 pl-0 lg:pl-6">
                        {renderContent()}
                    </div>

                </div>

             </div>
        </div>
    );
};