import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, Upload, X, Check, 
  Sparkles, Heart, Globe, Star, Shield, 
  MapPin, User, Camera, Lock, RefreshCw
} from 'lucide-react';

interface CorridorProfileProps {
    onNavigate: (view: any) => void;
    onBack: () => void;
}

// --- CONSTANTS ---

const INTENTIONS = [
    { id: 'serious', label: 'Soul Union', desc: 'Seeking deep, long-term alignment.' },
    { id: 'marriage', label: 'Legacy', desc: 'Ready for marriage & family building.' },
    { id: 'casual', label: 'Orbiting', desc: 'Open to connection without heavy gravity.' },
    { id: 'explore', label: 'Discovery', desc: 'Exploring the field of possibilities.' }
];

const VALUES = [
    'Authenticity', 'Ambition', 'Creativity', 'Spirituality', 
    'Intellect', 'Adventure', 'Stability', 'Empathy', 
    'Growth', 'Loyalty', 'Freedom', 'Impact'
];

const LOVE_LANGUAGES = ['Words of Affirmation', 'Acts of Service', 'Receiving Gifts', 'Quality Time', 'Physical Touch'];

// --- SUB-COMPONENTS ---

// 1. The Resonance Artifact Preview (Live Card)
const ProfilePreview = ({ data, step }: { data: any, step: number }) => {
    return (
        <div className="sticky top-32 w-full max-w-md mx-auto">
            <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] uppercase tracking-widest text-ink/40">Artifact Preview</span>
                <span className="text-[10px] uppercase tracking-widest text-gold animate-pulse">Live Signal</span>
            </div>

            {/* THE CARD */}
            <motion.div 
                layout
                className="relative h-[600px] bg-[#FDFBF7] border border-ink/10 shadow-2xl overflow-hidden flex flex-col"
            >
                {/* Texture */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none mix-blend-multiply"></div>
                
                {/* Top: Identity */}
                <div className="relative z-10 p-8 border-b border-ink/5 bg-white/50">
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2 border border-ink/10 px-2 py-1 rounded-full bg-white">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-[9px] uppercase tracking-widest text-ink/60">Broadcast Active</span>
                        </div>
                        <span className="font-serif italic text-ink/30 text-lg">No. 001</span>
                    </div>
                    
                    <div className="mt-8 space-y-1">
                        <h3 className="text-4xl font-display text-ink leading-none break-words">
                            {data.name || "Unknown Soul"}
                        </h3>
                        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-ink/40">
                             {data.city && <><MapPin size={10} /> {data.city}</>}
                             {data.age && <span>• {data.age} Cycles</span>}
                        </div>
                    </div>
                </div>

                {/* Middle: Visuals / Values */}
                <div className="relative flex-1 bg-[#F9F8F4] p-8 flex flex-col justify-center items-center text-center">
                    {/* Placeholder for Photo */}
                    {data.photos.length > 0 ? (
                        <div className="absolute inset-0 bg-ink/5">
                            {/* In a real app, this would be the image. For now, a pattern */}
                             <div className="w-full h-full flex items-center justify-center text-ink/20">
                                 <span className="font-display text-8xl opacity-20">{data.name.charAt(0)}</span>
                             </div>
                             <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1 text-[10px] uppercase tracking-widest border border-ink/10">
                                 {data.photos.length} Artifacts
                             </div>
                        </div>
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                             <div className="text-[200px] text-ink/[0.03] font-serif select-none">?</div>
                        </div>
                    )}

                    {/* Overlay Info (Only if step > 2) */}
                    <div className="relative z-10">
                         {data.intention && (
                             <div className="mb-4">
                                 <span className="px-3 py-1 bg-ink text-paper text-[10px] uppercase tracking-widest">
                                     {INTENTIONS.find(i => i.id === data.intention)?.label}
                                 </span>
                             </div>
                         )}
                         {data.values.length > 0 && (
                             <div className="flex flex-wrap justify-center gap-2 max-w-[200px]">
                                 {data.values.slice(0, 3).map((v: string) => (
                                     <span key={v} className="text-[9px] uppercase tracking-widest border border-ink/10 bg-white/80 px-2 py-1">
                                         {v}
                                     </span>
                                 ))}
                             </div>
                         )}
                    </div>
                </div>

                {/* Bottom: Astro Data (Simulated) */}
                <div className="relative z-10 bg-white border-t border-ink/5 p-8 h-[160px]">
                     <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-bold uppercase tracking-widest text-ink">Astro Signature</span>
                        <Lock size={12} className="text-ink/20" />
                     </div>
                     
                     <div className="grid grid-cols-3 gap-2 text-center">
                         <div className="p-2 border border-ink/5 bg-ink/5">
                             <div className="text-xl">☉</div>
                             <div className="text-[8px] uppercase tracking-widest mt-1">Leo</div>
                         </div>
                         <div className="p-2 border border-ink/5 bg-ink/5">
                             <div className="text-xl">☾</div>
                             <div className="text-[8px] uppercase tracking-widest mt-1">Sco</div>
                         </div>
                         <div className="p-2 border border-ink/5 bg-ink/5">
                             <div className="text-xl">↑</div>
                             <div className="text-[8px] uppercase tracking-widest mt-1">Lib</div>
                         </div>
                     </div>
                </div>
            </motion.div>

            {/* Backdrop Stack */}
            <div className="absolute top-2 left-2 w-full h-[600px] bg-ink/5 -z-10 border border-ink/5"></div>
        </div>
    );
};

// 2. The Stepper
const StepIndicator = ({ current, total }: { current: number, total: number }) => (
    <div className="flex items-center gap-4 mb-12">
        {[...Array(total)].map((_, i) => (
            <div key={i} className="flex-1 h-[2px] bg-ink/10 relative overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: i < current ? '100%' : '0%' }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-gold"
                />
            </div>
        ))}
        <div className="font-mono text-xs text-ink/40">
            0{current} / 0{total}
        </div>
    </div>
);


export const CorridorProfile: React.FC<CorridorProfileProps> = ({ onNavigate, onBack }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        city: '',
        intention: '',
        photos: [] as number[],
        values: [] as string[],
        bio: '',
        minAge: 25,
        maxAge: 45,
        distance: 50
    });

    const updateField = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const toggleValue = (val: string) => {
        setFormData(prev => {
            const exists = prev.values.includes(val);
            if (exists) return { ...prev, values: prev.values.filter(v => v !== val) };
            if (prev.values.length >= 5) return prev;
            return { ...prev, values: [...prev.values, val] };
        });
    };

    const nextStep = () => setStep(prev => Math.min(prev + 1, 5));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    // --- STEP 1: IDENTITY ---
    const renderStep1 = () => (
        <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="space-y-12"
        >
            <div>
                <h2 className="text-4xl font-display mb-4">Core Identity</h2>
                <p className="text-ink/60 font-serif">Establish your coordinates in the physical realm.</p>
            </div>

            <div className="space-y-8">
                {/* Inputs */}
                <div className="space-y-6">
                    <div className="group">
                        <label className="block text-[10px] uppercase tracking-widest text-ink/40 mb-2">Display Name</label>
                        <input 
                            value={formData.name} onChange={(e) => updateField('name', e.target.value)}
                            className="w-full bg-transparent border-b border-ink/20 py-3 text-2xl font-serif focus:outline-none focus:border-gold transition-colors placeholder:text-ink/10"
                            placeholder="Enter name..."
                        />
                    </div>
                    <div className="flex gap-6">
                        <div className="group flex-1">
                            <label className="block text-[10px] uppercase tracking-widest text-ink/40 mb-2">Age</label>
                            <input 
                                value={formData.age} onChange={(e) => updateField('age', e.target.value)}
                                className="w-full bg-transparent border-b border-ink/20 py-3 text-xl font-mono focus:outline-none focus:border-gold transition-colors placeholder:text-ink/10"
                                placeholder="00"
                            />
                        </div>
                        <div className="group flex-[2]">
                            <label className="block text-[10px] uppercase tracking-widest text-ink/40 mb-2">Current City</label>
                            <input 
                                value={formData.city} onChange={(e) => updateField('city', e.target.value)}
                                className="w-full bg-transparent border-b border-ink/20 py-3 text-xl font-serif focus:outline-none focus:border-gold transition-colors placeholder:text-ink/10"
                                placeholder="Location..."
                            />
                        </div>
                    </div>
                </div>

                {/* Intentions */}
                <div>
                    <label className="block text-[10px] uppercase tracking-widest text-ink/40 mb-4">Resonance Intention</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {INTENTIONS.map((intent) => (
                            <button
                                key={intent.id}
                                onClick={() => updateField('intention', intent.id)}
                                className={`text-left p-6 border transition-all duration-300 group ${formData.intention === intent.id ? 'border-ink bg-ink text-paper' : 'border-ink/10 hover:border-ink/30 bg-white'}`}
                            >
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-serif italic text-lg">{intent.label}</span>
                                    {formData.intention === intent.id && <div className="w-2 h-2 bg-gold rounded-full shadow-[0_0_10px_#D4AF37]"></div>}
                                </div>
                                <p className={`text-xs ${formData.intention === intent.id ? 'text-paper/60' : 'text-ink/40'}`}>
                                    {intent.desc}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );

    // --- STEP 2: MEDIA ---
    const renderStep2 = () => (
        <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="space-y-12"
        >
            <div>
                <h2 className="text-4xl font-display mb-4">Visual Artifacts</h2>
                <p className="text-ink/60 font-serif">Upload 1-6 images that capture your essence frequency.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => {
                    const hasPhoto = formData.photos.includes(i);
                    return (
                        <button
                            key={i}
                            onClick={() => {
                                const newPhotos = hasPhoto ? formData.photos.filter(p => p !== i) : [...formData.photos, i];
                                updateField('photos', newPhotos);
                            }}
                            className={`aspect-[3/4] border border-dashed flex items-center justify-center transition-all relative overflow-hidden group ${hasPhoto ? 'border-ink bg-ink/5' : 'border-ink/20 hover:border-ink/40'}`}
                        >
                            {hasPhoto ? (
                                <>
                                    <span className="text-4xl opacity-20 font-display">{i + 1}</span>
                                    <div className="absolute inset-0 bg-ink/10 group-hover:bg-ink/20 transition-colors"></div>
                                    <div className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow-sm">
                                        <X size={12} className="text-ink" />
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col items-center gap-2 text-ink/30 group-hover:text-ink/60 transition-colors">
                                    <Camera size={24} strokeWidth={1} />
                                    <span className="text-[9px] uppercase tracking-widest">Upload</span>
                                </div>
                            )}
                        </button>
                    )
                })}
            </div>
            
            <div className="bg-ink/5 p-4 flex items-start gap-3 border border-ink/5">
                <Sparkles size={16} className="text-gold mt-1" />
                <p className="text-xs text-ink/60 leading-relaxed">
                    <span className="font-bold uppercase tracking-wider text-xs block mb-1">Oracle Tip</span>
                    Avoid group photos. The algorithm analyzes facial micro-expressions to determine energetic compatibility. Clarity is key.
                </p>
            </div>
        </motion.div>
    );

    // --- STEP 3: VALUES ---
    const renderStep3 = () => (
        <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="space-y-12"
        >
            <div>
                <h2 className="text-4xl font-display mb-4">Internal Architecture</h2>
                <p className="text-ink/60 font-serif">Select the pillars that hold up your reality (Max 5).</p>
            </div>

            <div>
                <div className="flex flex-wrap gap-3">
                    {VALUES.map(val => (
                        <button
                            key={val}
                            onClick={() => toggleValue(val)}
                            className={`
                                px-6 py-3 border text-xs uppercase tracking-widest transition-all
                                ${formData.values.includes(val) 
                                    ? 'bg-ink text-paper border-ink shadow-lg scale-105' 
                                    : 'bg-white border-ink/10 text-ink/60 hover:border-ink/30'}
                            `}
                        >
                            {val}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-6 pt-8 border-t border-ink/5">
                 <div className="group">
                    <label className="block text-[10px] uppercase tracking-widest text-ink/40 mb-2">Love Language</label>
                    <select className="w-full bg-transparent border-b border-ink/20 py-3 text-lg font-serif focus:outline-none focus:border-gold transition-colors text-ink">
                        <option value="">Select Primary...</option>
                        {LOVE_LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                </div>
                
                <div className="group">
                    <label className="block text-[10px] uppercase tracking-widest text-ink/40 mb-2">The Ask</label>
                    <textarea 
                        className="w-full bg-transparent border border-ink/10 p-4 text-lg font-serif focus:outline-none focus:border-gold transition-colors placeholder:text-ink/10 min-h-[120px]"
                        placeholder="What are you truly looking for in a partner? Be specific."
                    />
                </div>
            </div>
        </motion.div>
    );

    // --- STEP 4: ASTRO CALIBRATION ---
    const renderStep4 = () => (
        <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="space-y-12"
        >
            <div>
                <h2 className="text-4xl font-display mb-4">Signal Calibration</h2>
                <p className="text-ink/60 font-serif">Fine-tune the range of your broadcast.</p>
            </div>

            {/* Astro Data (Read Only) */}
            <div className="bg-ink text-paper p-8 relative overflow-hidden">
                <div className="relative z-10 flex justify-between items-center">
                     <div>
                         <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Your Signature</div>
                         <div className="text-2xl font-display">Sun Leo • Moon Sco • Asc Lib</div>
                     </div>
                     <div className="text-gold animate-pulse">
                         <RefreshCw size={20} />
                     </div>
                </div>
                {/* BG Effect */}
                <div className="absolute -right-10 -bottom-20 w-48 h-48 border-[20px] border-white/5 rounded-full blur-xl"></div>
            </div>

            {/* Preferences */}
            <div className="space-y-8">
                 <div>
                     <div className="flex justify-between mb-4">
                         <label className="text-xs uppercase tracking-widest text-ink/60">Age Range</label>
                         <span className="font-mono text-xs">{formData.minAge} - {formData.maxAge}</span>
                     </div>
                     <div className="h-1 bg-ink/10 rounded-full relative">
                         {/* Mock slider visuals */}
                         <div className="absolute left-[20%] right-[30%] top-0 bottom-0 bg-ink"></div>
                         <div className="absolute left-[20%] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border border-ink rounded-full shadow-sm cursor-pointer"></div>
                         <div className="absolute right-[30%] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border border-ink rounded-full shadow-sm cursor-pointer"></div>
                     </div>
                 </div>

                 <div>
                     <div className="flex justify-between mb-4">
                         <label className="text-xs uppercase tracking-widest text-ink/60">Distance Radius</label>
                         <span className="font-mono text-xs">{formData.distance} KM</span>
                     </div>
                     <div className="h-1 bg-ink/10 rounded-full relative">
                         <div className="absolute left-0 w-[40%] top-0 bottom-0 bg-ink"></div>
                         <div className="absolute left-[40%] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border border-ink rounded-full shadow-sm cursor-pointer"></div>
                     </div>
                 </div>

                 <div className="flex items-center justify-between p-4 border border-ink/10 bg-white">
                     <div>
                         <div className="text-sm font-bold text-ink">Astro-Compatible Only</div>
                         <div className="text-xs text-ink/50">Filter out discordant moon signs automatically.</div>
                     </div>
                     <div className="w-10 h-6 bg-ink rounded-full relative cursor-pointer">
                         <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                     </div>
                 </div>
            </div>
        </motion.div>
    );

    // --- STEP 5: COMPLETION ---
    const renderCompletion = () => (
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
        >
            <div className="w-24 h-24 mx-auto bg-ink text-gold rounded-full flex items-center justify-center mb-8 shadow-2xl relative">
                <Sparkles size={40} strokeWidth={1} />
                <div className="absolute inset-0 border border-ink/10 rounded-full animate-ping opacity-20"></div>
            </div>
            <h2 className="text-5xl lg:text-7xl font-display mb-6">Broadcast<br/>Initiated</h2>
            <p className="text-xl font-serif text-ink/60 mb-12 max-w-lg mx-auto">
                Your resonance artifact has been encoded into the corridor. The matching algorithm is now active.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                    onClick={() => onNavigate('corridor-blueprint')}
                    className="px-10 py-4 bg-ink text-paper text-xs uppercase tracking-[0.25em] hover:bg-gold hover:text-white transition-all shadow-xl"
                >
                    Generate Blueprint
                </button>
            </div>
        </motion.div>
    );

    return (
        <div className="min-h-screen bg-paper pt-28 pb-20 relative overflow-hidden">
             
             {/* 1. BACKGROUND */}
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none grid-bg" />
             
             {/* 2. TOP NAV */}
             <div className="fixed top-0 left-0 right-0 h-20 bg-paper/90 backdrop-blur-md z-40 border-b border-ink/5 px-6 lg:px-12 flex items-center justify-between">
                 <button onClick={onBack} className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-ink/40 hover:text-ink transition-colors">
                     <ArrowLeft size={14} /> Back
                 </button>
                 <div className="font-display text-lg tracking-widest">Calibration Sequence</div>
                 <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-ink/40 hover:text-ink transition-colors">
                     Save Draft <Shield size={14} />
                 </button>
             </div>

             <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10 pt-10">
                
                {step < 5 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                        
                        {/* --- LEFT: FORM WIZARD --- */}
                        <div className="lg:col-span-7">
                            <StepIndicator current={step} total={4} />
                            
                            <AnimatePresence mode="wait">
                                {step === 1 && renderStep1()}
                                {step === 2 && renderStep2()}
                                {step === 3 && renderStep3()}
                                {step === 4 && renderStep4()}
                            </AnimatePresence>

                            {/* Actions */}
                            <div className="mt-16 pt-8 border-t border-ink/5 flex justify-between items-center">
                                <button 
                                    onClick={prevStep} 
                                    disabled={step === 1}
                                    className="text-xs uppercase tracking-widest text-ink/40 hover:text-ink disabled:opacity-0 transition-colors"
                                >
                                    Previous Step
                                </button>
                                <button 
                                    onClick={nextStep}
                                    className="px-10 py-4 bg-ink text-paper text-xs uppercase tracking-[0.25em] hover:bg-gold hover:text-white transition-all shadow-lg flex items-center gap-3"
                                >
                                    {step === 4 ? 'Initiate' : 'Next Sector'} <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>


                        {/* --- RIGHT: PREVIEW & CHECKLIST --- */}
                        <div className="hidden lg:block lg:col-span-5 relative">
                             <ProfilePreview data={formData} step={step} />
                             
                             {/* Checklist Widget */}
                             <div className="mt-12 p-6 bg-white border border-ink/10 max-w-md mx-auto">
                                 <h4 className="text-[10px] uppercase tracking-widest text-ink/40 mb-4">Blueprint Status</h4>
                                 <div className="space-y-3">
                                     <div className="flex items-center gap-3 text-xs text-ink/60">
                                         <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.name ? 'bg-ink border-ink text-paper' : 'border-ink/20'}`}>
                                             {formData.name && <Check size={10} />}
                                         </div>
                                         Identity Core
                                     </div>
                                     <div className="flex items-center gap-3 text-xs text-ink/60">
                                         <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.photos.length > 0 ? 'bg-ink border-ink text-paper' : 'border-ink/20'}`}>
                                             {formData.photos.length > 0 && <Check size={10} />}
                                         </div>
                                         Visual Artifacts ({formData.photos.length}/6)
                                     </div>
                                     <div className="flex items-center gap-3 text-xs text-ink/60">
                                         <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.values.length > 0 ? 'bg-ink border-ink text-paper' : 'border-ink/20'}`}>
                                             {formData.values.length > 0 && <Check size={10} />}
                                         </div>
                                         Value Pillars
                                     </div>
                                      <div className="flex items-center gap-3 text-xs text-ink/60">
                                         <div className={`w-4 h-4 rounded-full border flex items-center justify-center bg-ink border-ink text-paper`}>
                                             <Check size={10} />
                                         </div>
                                         Astro Signature (Auto-Pulled)
                                     </div>
                                 </div>
                             </div>
                        </div>

                    </div>
                ) : (
                    renderCompletion()
                )}

             </div>
        </div>
    );
};