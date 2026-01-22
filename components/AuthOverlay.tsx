import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Lock, Mail, User, Fingerprint } from 'lucide-react';

interface AuthOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'signin' | 'signup';
  onLoginSuccess?: () => void;
}

export const AuthOverlay: React.FC<AuthOverlayProps> = ({ isOpen, onClose, defaultMode = 'signin', onLoginSuccess }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(defaultMode);
  const [typing, setTyping] = useState(false);
  const [inputLength, setInputLength] = useState(0);

  // Sync internal mode when prop changes or overlay opens
  useEffect(() => {
    if (isOpen) {
        setMode(defaultMode);
    }
  }, [isOpen, defaultMode]);

  // Simulate "Soul Signature" generation based on input
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputLength(prev => prev + 1);
    setTyping(true);
    setTimeout(() => setTyping(false), 200);
  };

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Simulate API delay
      setTimeout(() => {
          if (onLoginSuccess) onLoginSuccess();
          onClose();
      }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-0">
      
      {/* 1. Backdrop Blur & Darken */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-ink/80 backdrop-blur-xl"
      />

      {/* 2. The Monolith (Main Container) */}
      <motion.div 
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-[1100px] h-[650px] bg-paper shadow-2xl flex overflow-hidden rounded-sm ring-1 ring-white/10"
      >
        
        {/* CLOSE BUTTON */}
        <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-50 p-2 text-ink/40 hover:text-ink transition-colors"
        >
            <X size={24} strokeWidth={1} />
        </button>

        {/* --- LEFT PANEL: THE VOID (Generative Art) --- */}
        <div className="hidden lg:flex w-5/12 bg-[#080808] relative items-center justify-center overflow-hidden">
            
            {/* Background Noise & Grid */}
            <div className="absolute inset-0 opacity-20" 
                style={{ 
                    backgroundImage: 'linear-gradient(#222 1px, transparent 1px), linear-gradient(90deg, #222 1px, transparent 1px)', 
                    backgroundSize: '40px 40px' 
                }}
            />
            
            <div className="relative z-10 text-center">
                {/* THE SOUL SIGIL */}
                <div className="relative w-64 h-64 mx-auto mb-12 flex items-center justify-center">
                    
                    {/* Ring 1: Base */}
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border border-white/10 rounded-full"
                    />

                    {/* Ring 2: Reactive Input Ring */}
                    <motion.div 
                        animate={{ 
                            rotate: -360,
                            scale: typing ? 1.05 : 1,
                            borderColor: typing ? 'rgba(212, 175, 55, 0.5)' : 'rgba(255, 255, 255, 0.1)'
                        }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-8 border border-white/10 rounded-full border-dashed transition-colors duration-300"
                    />

                    {/* Core: The Identity Spark */}
                    <div className="relative flex items-center justify-center">
                         <motion.div 
                            animate={{ 
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 0.8, 0.5],
                                filter: typing ? "blur(2px) brightness(1.5)" : "blur(0px) brightness(1)"
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="w-20 h-20 bg-gradient-to-tr from-gold via-orange-500 to-purple-600 rounded-full blur-xl opacity-50"
                         />
                         <div className="absolute">
                             <Fingerprint className="text-white/80 opacity-80" size={48} strokeWidth={1} />
                         </div>
                    </div>
                </div>

                <motion.div
                    key={mode}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h3 className="text-2xl font-serif text-white mb-2">
                        {mode === 'signin' ? 'Welcome Back' : 'Begin the Work'}
                    </h3>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/40 max-w-[200px] mx-auto leading-relaxed">
                        {mode === 'signin' ? 'Your chart is waiting to be unfolded.' : 'Create your celestial archive.'}
                    </p>
                </motion.div>
            </div>

            {/* Bottom Tech Detail */}
            <div className="absolute bottom-8 left-8 text-[10px] font-mono text-white/20">
                SYS.ID: {Math.random().toString(36).substring(7).toUpperCase()}
            </div>
        </div>

        {/* --- RIGHT PANEL: THE INTERFACE (Forms) --- */}
        <div className="w-full lg:w-7/12 bg-paper relative flex flex-col justify-center px-12 lg:px-24">
            
            <div className="max-w-md w-full mx-auto relative">
                
                {/* TAB SWITCHER */}
                <div className="absolute -top-16 right-0 lg:top-0 flex gap-6 z-20">
                    <button 
                        onClick={() => setMode('signin')} 
                        className={`text-xs uppercase tracking-widest pb-2 transition-all ${mode === 'signin' ? 'text-ink font-bold border-b border-ink' : 'text-ink/40 hover:text-ink'}`}
                    >
                        Sign In
                    </button>
                    <button 
                        onClick={() => setMode('signup')} 
                        className={`text-xs uppercase tracking-widest pb-2 transition-all ${mode === 'signup' ? 'text-ink font-bold border-b border-ink' : 'text-ink/40 hover:text-ink'}`}
                    >
                        Sign Up
                    </button>
                </div>

                <div className="mb-12">
                    <span className="text-xs font-mono uppercase tracking-widest text-ink/40 block mb-4">
                        {mode === 'signin' ? 'Access Portal' : 'Initiation Sequence'}
                    </span>
                    <h2 className="text-5xl font-display text-ink leading-none">
                        {mode === 'signin' ? 'Enter' : 'Join'} <br/>The Museum
                    </h2>
                </div>

                <AnimatePresence mode="wait">
                    {mode === 'signin' ? (
                        <motion.form 
                            key="signin"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                            onSubmit={handleSubmit}
                        >
                            <div className="group relative">
                                <Mail className="absolute left-0 top-1/2 -translate-y-1/2 text-ink/20 group-focus-within:text-gold transition-colors" size={20} />
                                <input 
                                    type="email" 
                                    placeholder="Email Address" 
                                    className="w-full bg-transparent border-b border-ink/10 py-4 pl-10 text-lg font-serif placeholder:font-sans placeholder:text-ink/20 focus:outline-none focus:border-gold transition-colors"
                                    onChange={handleInput}
                                    required
                                />
                            </div>
                            <div className="group relative">
                                <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-ink/20 group-focus-within:text-gold transition-colors" size={20} />
                                <input 
                                    type="password" 
                                    placeholder="Password" 
                                    className="w-full bg-transparent border-b border-ink/10 py-4 pl-10 text-lg font-serif placeholder:font-sans placeholder:text-ink/20 focus:outline-none focus:border-gold transition-colors"
                                    onChange={handleInput}
                                    required
                                />
                            </div>

                            <div className="flex items-center justify-between pt-4">
                                <button type="button" className="text-xs uppercase tracking-widest text-ink/40 hover:text-ink transition-colors">
                                    Forgot Key?
                                </button>
                                <button type="submit" className="px-8 py-3 bg-ink text-paper text-xs uppercase tracking-[0.25em] hover:bg-gold hover:text-white transition-all flex items-center gap-3 shadow-xl hover:shadow-2xl hover:-translate-y-1">
                                    Decrypt <ArrowRight size={14} />
                                </button>
                            </div>
                        </motion.form>
                    ) : (
                        <motion.form 
                            key="signup"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                            onSubmit={handleSubmit}
                        >
                            <div className="group relative">
                                <User className="absolute left-0 top-1/2 -translate-y-1/2 text-ink/20 group-focus-within:text-gold transition-colors" size={20} />
                                <input 
                                    type="text" 
                                    placeholder="Full Name" 
                                    className="w-full bg-transparent border-b border-ink/10 py-4 pl-10 text-lg font-serif placeholder:font-sans placeholder:text-ink/20 focus:outline-none focus:border-gold transition-colors"
                                    onChange={handleInput}
                                    required
                                />
                            </div>
                            <div className="group relative">
                                <Mail className="absolute left-0 top-1/2 -translate-y-1/2 text-ink/20 group-focus-within:text-gold transition-colors" size={20} />
                                <input 
                                    type="email" 
                                    placeholder="Email Address" 
                                    className="w-full bg-transparent border-b border-ink/10 py-4 pl-10 text-lg font-serif placeholder:font-sans placeholder:text-ink/20 focus:outline-none focus:border-gold transition-colors"
                                    onChange={handleInput}
                                    required
                                />
                            </div>
                            <div className="group relative">
                                <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-ink/20 group-focus-within:text-gold transition-colors" size={20} />
                                <input 
                                    type="password" 
                                    placeholder="Create Key" 
                                    className="w-full bg-transparent border-b border-ink/10 py-4 pl-10 text-lg font-serif placeholder:font-sans placeholder:text-ink/20 focus:outline-none focus:border-gold transition-colors"
                                    onChange={handleInput}
                                    required
                                />
                            </div>

                            <div className="flex items-center justify-end pt-4">
                                <button type="submit" className="px-8 py-3 bg-ink text-paper text-xs uppercase tracking-[0.25em] hover:bg-gold hover:text-white transition-all flex items-center gap-3 shadow-xl hover:shadow-2xl hover:-translate-y-1">
                                    Forge Identity <ArrowRight size={14} />
                                </button>
                            </div>
                        </motion.form>
                    )}
                </AnimatePresence>

                {/* Social Login Section */}
                <div className="mt-8 space-y-4">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-ink/10"></span>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-paper px-2 text-ink/40 tracking-widest">Or initiate via</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-2 px-4 py-3 border border-ink/10 hover:border-ink hover:bg-ink/5 transition-all group">
                           {/* Google SVG */}
                           <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                           </svg>
                           <span className="text-xs font-serif text-ink/80">Google</span>
                        </button>

                         <button className="flex items-center justify-center gap-2 px-4 py-3 border border-ink/10 hover:border-ink hover:bg-ink/5 transition-all group">
                           {/* Apple SVG */}
                           <svg className="w-5 h-5 text-ink group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74s2.29-.83 3.46-.74c.98.05 2.15.35 3.03 1.25-2.73 1.66-2.25 5.92.53 7.1-.55 1.55-1.32 3.08-2.1 4.62zM12.03 5.39c-.58-1.52 1.35-2.83 2.58-2.88.58 1.69-1.48 2.94-2.58 2.88z"/>
                           </svg>
                           <span className="text-xs font-serif text-ink/80">Apple</span>
                        </button>
                    </div>
                </div>

                {/* Footer Switcher */}
                <div className="mt-8 pt-8 border-t border-ink/5 flex justify-center">
                    <p className="text-xs text-ink/40 uppercase tracking-widest">
                        {mode === 'signin' ? "New to the order? " : "Already initiated? "}
                        <button 
                            onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                            className="text-ink font-bold border-b border-ink/20 hover:border-ink ml-2 transition-all"
                        >
                            {mode === 'signin' ? "Request Access" : "Enter Portal"}
                        </button>
                    </p>
                </div>

            </div>
        </div>

      </motion.div>
    </div>
  );
};