import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Send, Upload, HelpCircle, 
  AlertCircle, CheckCircle2, Shield, 
  CreditCard, FileText, MessageSquare, 
  Users, Activity, ChevronRight, Mail,
  ExternalLink, AlertTriangle
} from 'lucide-react';

interface ContactSupportProps {
    onNavigate: (view: any, data?: any) => void;
    onBack: () => void;
}

const TOPICS = [
    { id: 'billing', label: 'Billing / Subscription' },
    { id: 'reports', label: 'Reports Issue' },
    { id: 'guides', label: 'Guides Chat Issue' },
    { id: 'corridor', label: 'Corridor / Matchmaking' },
    { id: 'privacy', label: 'Privacy / Safety' },
    { id: 'feature', label: 'Feature Request' },
    { id: 'other', label: 'Other' }
];

const HELP_LINKS = [
    { label: 'Manage Subscription', icon: CreditCard, target: 'account', tab: 'sub' },
    { label: 'Edit Birth Details', icon: Activity, target: 'account', tab: 'birth' },
    { label: 'Export Data', icon: FileText, target: 'account', tab: 'data' },
    { label: 'Corridor Settings', icon: Users, target: 'corridor-settings' },
    { label: 'Safety Center', icon: Shield, target: 'corridor-settings', tab: 'safety' }
];

export const ContactSupport: React.FC<ContactSupportProps> = ({ onNavigate, onBack }) => {
    const [formData, setFormData] = useState({
        name: 'Marcus G. Y.', // Prefilled mock
        email: 'marcus@mindguruyoga.com',
        topic: '',
        message: '',
        safetyIssues: [] as string[]
    });
    const [submitted, setSubmitted] = useState(false);

    const handleInput = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const toggleSafetyIssue = (issue: string) => {
        setFormData(prev => {
            const current = prev.safetyIssues;
            return {
                ...prev,
                safetyIssues: current.includes(issue) 
                    ? current.filter(i => i !== issue) 
                    : [...current, issue]
            };
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        // Reset after delay or keep success state
    };

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
                            <span className="text-ink font-bold">Contact</span>
                        </div>
                        
                        <div>
                            <h1 className="text-4xl lg:text-5xl font-display text-ink mb-2">Support & Feedback</h1>
                            <p className="text-lg text-ink/60 font-serif max-w-xl">
                                System issues, inquiries, and safety reporting.
                            </p>
                        </div>
                    </div>

                    <div className="w-full md:w-auto">
                        <button 
                            onClick={() => onNavigate('faq')}
                            className="flex items-center gap-2 px-6 py-3 border border-ink/10 bg-white hover:border-ink transition-colors text-xs uppercase tracking-widest"
                        >
                            <HelpCircle size={14} /> View FAQ
                        </button>
                    </div>
                </motion.div>


                {/* 2. MAIN GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* --- LEFT: CONTACT FORM (7 Cols) --- */}
                    <div className="lg:col-span-7">
                        <AnimatePresence mode="wait">
                            {submitted ? (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-white border border-ink/10 p-12 text-center shadow-sm"
                                >
                                    <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle2 size={32} />
                                    </div>
                                    <h3 className="font-serif text-2xl text-ink mb-4">Transmission Received</h3>
                                    <p className="text-ink/60 max-w-md mx-auto mb-8 leading-relaxed">
                                        Your message has been logged in the support queue. <br/>
                                        Ticket ID: <span className="font-mono text-ink">#8X29-L</span>
                                    </p>
                                    <button 
                                        onClick={() => setSubmitted(false)}
                                        className="text-xs uppercase tracking-widest text-ink border-b border-ink/20 hover:border-ink pb-1"
                                    >
                                        Send Another Message
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={handleSubmit}
                                    className="bg-white border border-ink/10 p-8 shadow-sm space-y-6"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest text-ink/40">Name</label>
                                            <input 
                                                value={formData.name}
                                                readOnly
                                                className="w-full bg-paper-light border border-ink/10 p-3 text-sm font-serif text-ink/60 cursor-not-allowed"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest text-ink/40">Email</label>
                                            <input 
                                                value={formData.email}
                                                readOnly
                                                className="w-full bg-paper-light border border-ink/10 p-3 text-sm font-serif text-ink/60 cursor-not-allowed"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-ink/40">Topic</label>
                                        <div className="relative">
                                            <select 
                                                value={formData.topic}
                                                onChange={(e) => handleInput('topic', e.target.value)}
                                                className="w-full bg-white border border-ink/10 p-3 text-sm font-serif appearance-none focus:outline-none focus:border-gold transition-colors"
                                                required
                                            >
                                                <option value="" disabled>Select a topic...</option>
                                                {TOPICS.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                                            </select>
                                            <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-ink/30 pointer-events-none" size={14} />
                                        </div>
                                    </div>

                                    {/* CONDITIONAL SAFETY SECTION */}
                                    <AnimatePresence>
                                        {formData.topic === 'privacy' && (
                                            <motion.div 
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="bg-red-50/50 border border-red-100 p-6 space-y-4 overflow-hidden"
                                            >
                                                <div className="flex items-center gap-2 text-red-600 mb-2">
                                                    <AlertTriangle size={16} />
                                                    <span className="text-xs font-bold uppercase tracking-widest">Safety Protocol</span>
                                                </div>
                                                <p className="text-xs text-ink/60 mb-4">Please specify the nature of the issue so we can prioritize your request.</p>
                                                
                                                <div className="space-y-2">
                                                    {['I want to report a profile', 'I want to block a user', 'I feel unsafe'].map(issue => (
                                                        <label key={issue} className="flex items-center gap-3 cursor-pointer group">
                                                            <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${formData.safetyIssues.includes(issue) ? 'bg-red-500 border-red-500' : 'border-red-200 bg-white'}`}>
                                                                {formData.safetyIssues.includes(issue) && <CheckCircle2 size={10} className="text-white" />}
                                                            </div>
                                                            <input 
                                                                type="checkbox" 
                                                                className="hidden" 
                                                                checked={formData.safetyIssues.includes(issue)}
                                                                onChange={() => toggleSafetyIssue(issue)}
                                                            />
                                                            <span className="text-sm text-ink/80">{issue}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-ink/40">Message</label>
                                        <textarea 
                                            value={formData.message}
                                            onChange={(e) => handleInput('message', e.target.value)}
                                            className="w-full bg-white border border-ink/10 p-4 text-sm font-serif min-h-[160px] focus:outline-none focus:border-gold transition-colors placeholder:text-ink/20 resize-none"
                                            placeholder="Describe your issue or feedback..."
                                            required
                                        />
                                    </div>

                                    {/* File Upload Mock */}
                                    <div className="border border-dashed border-ink/20 p-4 flex flex-col items-center justify-center text-ink/40 hover:text-ink hover:border-ink/40 transition-colors cursor-pointer bg-paper-light">
                                        <Upload size={16} className="mb-2" />
                                        <span className="text-[10px] uppercase tracking-widest">Attach Screenshot (Optional)</span>
                                    </div>

                                    <div className="flex justify-end gap-4 pt-4">
                                        <button 
                                            type="button" 
                                            onClick={() => setFormData(prev => ({ ...prev, topic: '', message: '', safetyIssues: [] }))}
                                            className="px-6 py-3 text-xs uppercase tracking-widest text-ink/40 hover:text-ink transition-colors"
                                        >
                                            Clear
                                        </button>
                                        <button 
                                            type="submit" 
                                            className="px-8 py-3 bg-ink text-paper text-xs uppercase tracking-[0.25em] hover:bg-gold hover:text-white transition-colors shadow-lg flex items-center gap-2"
                                        >
                                            <Send size={12} /> Submit
                                        </button>
                                    </div>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>


                    {/* --- RIGHT: SUPPORT BLOCKS (5 Cols) --- */}
                    <div className="lg:col-span-5 space-y-8 sticky top-32 h-fit">
                        
                        {/* A. System Status */}
                        <div 
                            onClick={() => onNavigate('status')}
                            className="bg-ink text-paper p-6 shadow-xl relative overflow-hidden cursor-pointer group"
                        >
                            <div className="relative z-10 flex justify-between items-center">
                                <div>
                                    <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1 group-hover:text-gold transition-colors">System Status</div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="font-mono text-sm">Operational</span>
                                    </div>
                                </div>
                                <Activity size={20} className="text-white/20 group-hover:text-white transition-colors" />
                            </div>
                            <div className="mt-4 pt-4 border-t border-white/10 text-[9px] uppercase tracking-widest text-white/40 flex justify-between">
                                <span>v2.4.0</span>
                                <span className="flex items-center gap-1 group-hover:underline">View Details <ExternalLink size={8} /></span>
                            </div>
                        </div>

                        {/* B. Help Topics */}
                        <div className="bg-white border border-ink/10 p-6">
                            <h3 className="text-xs font-mono uppercase tracking-widest text-ink/40 mb-6 flex items-center gap-2">
                                <HelpCircle size={12} /> Quick Actions
                            </h3>
                            <div className="space-y-1">
                                {HELP_LINKS.map((link, i) => (
                                    <button 
                                        key={i}
                                        onClick={() => onNavigate(link.target)}
                                        className="w-full flex items-center justify-between p-3 hover:bg-paper-light transition-colors group border border-transparent hover:border-ink/5 rounded-sm"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-ink/5 rounded-full flex items-center justify-center text-ink/40 group-hover:text-ink transition-colors">
                                                <link.icon size={14} />
                                            </div>
                                            <span className="text-sm text-ink/70 group-hover:text-ink">{link.label}</span>
                                        </div>
                                        <ExternalLink size={12} className="text-ink/20 group-hover:text-ink transition-colors" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* C. Expectations */}
                        <div className="bg-paper-light border border-ink/10 p-6">
                            <div className="flex items-start gap-3">
                                <Mail size={16} className="text-ink/40 mt-1" />
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-ink mb-2">Response Time</h4>
                                    <p className="text-xs text-ink/60 leading-relaxed mb-4">
                                        Our support team (human, not AI) typically responds within 24-48 hours. 
                                        For urgent safety issues, please use the Safety Protocol in the form.
                                    </p>
                                    <a href="mailto:support@mgy.com" className="text-xs text-ink border-b border-ink/20 hover:border-ink pb-0.5 transition-colors">
                                        support@mindguruyoga.com
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

             </div>
        </div>
    );
};