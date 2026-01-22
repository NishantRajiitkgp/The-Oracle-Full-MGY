import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OracleSphere } from './OracleSphere';
import { StarGate } from './StarGate';
import { X } from 'lucide-react';

export const Hero: React.FC = () => {
  const [viewState, setViewState] = useState<'idle' | 'input' | 'calculating' | 'result'>('idle');
  
  // Handlers
  const openRitual = () => setViewState('input');
  const closeRitual = () => setViewState('idle');
  
  const performCalculation = (e: React.FormEvent) => {
    e.preventDefault();
    setViewState('calculating');
    
    // Sequence: 2.5s calculation -> Result
    setTimeout(() => {
        setViewState('result');
    }, 2500);
  };

  const getSphereMode = () => {
      if (viewState === 'calculating') return 'aligning';
      if (viewState === 'result') return 'aligned';
      return 'idle';
  };

  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col justify-center bg-[#F2F0E9] transition-colors duration-1000">
      
      {/* --- PHASE SHIFT BACKGROUND --- 
          Inverts colors during the ritual (input) phase for a dramatic shift.
      */}
      <motion.div 
        className="absolute inset-0 bg-ink z-0 pointer-events-none"
        initial={{ clipPath: "circle(0% at 50% 50%)" }}
        animate={{ 
            clipPath: viewState === 'input' ? "circle(150% at 75% 50%)" : "circle(0% at 75% 50%)" 
        }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />
      
      {/* Background Ambience (Grid) */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none z-0 mix-blend-multiply"></div>


      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-6 lg:px-20 h-screen flex flex-col lg:flex-row items-center">
        
        {/* --- LEFT: TEXT CONTENT (Fades out during Ritual) --- */}
        <motion.div 
            className="w-full lg:w-1/2 space-y-16 lg:pr-20 pointer-events-none lg:pointer-events-auto"
            animate={{ 
                opacity: viewState === 'idle' ? 1 : 0, 
                x: viewState === 'idle' ? 0 : -100,
                filter: viewState === 'idle' ? "blur(0px)" : "blur(10px)"
            }}
            transition={{ duration: 0.8 }}
        >
          <div>
            <div className="flex items-center gap-6 mb-8">
                <div className="h-[2px] w-24 bg-ink"></div>
                <span className="text-xs font-mono uppercase tracking-widest text-ink">Artifact No. 001</span>
            </div>
            
            {/* MASSIVE HEADLINE */}
            <h1 className="text-[14vw] lg:text-[10rem] font-display leading-[0.8] text-ink mix-blend-difference tracking-tighter">
                THE<br/>ORACLE
            </h1>
          </div>

          <div className="flex flex-col md:flex-row gap-12 items-start max-w-2xl">
              <p className="text-lg text-ink/70 font-light leading-relaxed max-w-xs">
                A chrono-spatial interface for your consciousness. Consult the singularity to reveal your cosmic blueprint.
              </p>
              
              <button 
                onClick={openRitual}
                className="group flex items-center gap-4 pointer-events-auto"
              >
                  <div className="relative w-16 h-16 border border-ink/30 rounded-full flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:scale-110 group-hover:border-ink">
                      <div className="absolute inset-0 bg-ink translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                      <span className="relative z-10 text-xl group-hover:text-paper transition-colors duration-500">→</span>
                  </div>
                  <span className="text-xs uppercase tracking-[0.25em] font-medium group-hover:translate-x-2 transition-transform duration-500">Initiate</span>
              </button>
          </div>
        </motion.div>


        {/* --- RIGHT: THE CHRONO ENGINE --- */}
        <motion.div 
            className="absolute lg:relative w-full lg:w-1/2 h-full flex items-center justify-center perspective-2000"
            animate={{
                // Moves to center screen during ritual
                left: viewState !== 'idle' ? (window.innerWidth < 1024 ? '0%' : '-25%') : '0%',
                scale: viewState !== 'idle' ? 1.2 : 1
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
        >
            <OracleSphere mode={getSphereMode()} onClick={viewState === 'idle' ? openRitual : () => {}} />

            {/* --- RESULT REVEAL: PLANETARY EJECTION --- */}
            <AnimatePresence>
                {viewState === 'result' && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        
                        {/* Sun - Orbit 1 */}
                        <motion.div
                             initial={{ scale: 0 }}
                             animate={{ scale: 1 }}
                             transition={{ duration: 1, ease: "easeOut" }}
                             className="absolute w-[400px] h-[400px]"
                        >
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                                className="w-full h-full"
                            >
                                <motion.div 
                                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}
                                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
                                >
                                    <div className="w-16 h-16 bg-[#FDFBF7] rounded-full flex items-center justify-center shadow-xl text-2xl font-serif text-ink border border-ink">☉</div>
                                    <span className="bg-ink text-paper text-[10px] uppercase tracking-widest px-2 py-1">Sun in Leo</span>
                                </motion.div>
                            </motion.div>
                        </motion.div>

                        {/* Moon - Orbit 2 */}
                        <motion.div
                             initial={{ scale: 0 }}
                             animate={{ scale: 1 }}
                             transition={{ duration: 1, ease: "easeOut" }}
                             className="absolute w-[600px] h-[600px]"
                        >
                            <motion.div 
                                initial={{ rotate: 180 }}
                                animate={{ rotate: 540 }}
                                transition={{ duration: 25, ease: "linear", repeat: Infinity }}
                                className="w-full h-full"
                            >
                                <motion.div 
                                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4, type: 'spring' }}
                                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
                                >
                                    <div className="w-12 h-12 bg-ink text-paper rounded-full flex items-center justify-center shadow-xl text-xl font-serif border border-ink/20">☾</div>
                                    <span className="bg-paper text-ink border border-ink/10 text-[10px] uppercase tracking-widest px-2 py-1">Moon in Sco</span>
                                </motion.div>
                            </motion.div>
                        </motion.div>

                        {/* Rising - Orbit 3 */}
                        <motion.div
                             initial={{ scale: 0 }}
                             animate={{ scale: 1 }}
                             transition={{ duration: 1, ease: "easeOut" }}
                             className="absolute w-[800px] h-[800px]"
                        >
                             <motion.div 
                                initial={{ rotate: 90 }}
                                animate={{ rotate: 450 }}
                                transition={{ duration: 30, ease: "linear", repeat: Infinity }}
                                className="w-full h-full"
                            >
                                <motion.div 
                                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6, type: 'spring' }}
                                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
                                >
                                    <div className="w-10 h-10 bg-white border border-ink rounded-full flex items-center justify-center shadow-xl text-lg font-serif">↑</div>
                                    <span className="text-ink/60 text-[10px] uppercase tracking-widest font-bold">Asc Libra</span>
                                </motion.div>
                             </motion.div>
                        </motion.div>

                        {/* The Prophecy Caption */}
                        <motion.div 
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 300 }}
                            transition={{ delay: 1, duration: 1 }}
                            className="absolute z-30 text-center"
                        >
                            <h3 className="text-3xl font-serif italic text-ink mb-2">"Chaos is merely order you cannot yet see."</h3>
                            <button onClick={closeRitual} className="text-[10px] uppercase tracking-[0.2em] text-ink/40 hover:text-ink transition-colors border-b border-transparent hover:border-ink">Reset Engine</button>
                        </motion.div>

                    </div>
                )}
            </AnimatePresence>
        </motion.div>
      </div>

      {/* --- THE RITUAL MODAL (Phase Shifted) --- 
          Appears on top of the inverted background
      */}
      <AnimatePresence>
        {viewState === 'input' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 flex items-center justify-center lg:justify-end lg:pr-32"
          >
            {/* NEW: Left Side Cosmic Animation */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="absolute left-0 top-0 bottom-0 w-full lg:w-[60%] flex items-center justify-center pointer-events-none overflow-hidden"
            >
                <StarGate />
            </motion.div>

            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ delay: 0.3, type: "spring", damping: 20 }}
              className="w-full max-w-md text-paper relative z-10"
            >
                <div className="absolute -left-12 top-0 bottom-0 w-[1px] bg-paper/20"></div>
                
                <div className="mb-12">
                    <span className="text-gold text-[10px] uppercase tracking-[0.4em] mb-4 block">Sequence Initiation</span>
                    <h2 className="text-5xl font-display text-paper leading-none">Enter The<br/>Coordinates</h2>
                </div>

                <form onSubmit={performCalculation} className="space-y-10">
                    <div className="relative group">
                         <input className="w-full bg-transparent border-b border-paper/20 py-4 text-2xl font-serif text-paper placeholder-transparent focus:outline-none focus:border-gold transition-colors" placeholder="Name" required />
                         <label className="absolute left-0 top-4 text-paper/40 text-xs uppercase tracking-widest pointer-events-none group-focus-within:-top-2 group-focus-within:text-[10px] group-focus-within:text-gold transition-all">Identity</label>
                    </div>

                    <div className="flex gap-8">
                        <div className="relative group flex-1">
                            <input className="w-full bg-transparent border-b border-paper/20 py-4 text-xl font-sans text-paper focus:outline-none focus:border-gold transition-colors" type="text" onFocus={(e) => e.target.type='date'} onBlur={(e) => !e.target.value && (e.target.type='text')} required />
                            <label className="absolute left-0 top-4 text-paper/40 text-xs uppercase tracking-widest pointer-events-none group-focus-within:-top-2 group-focus-within:text-[10px] group-focus-within:text-gold transition-all">Date</label>
                        </div>
                        <div className="relative group flex-1">
                            <input className="w-full bg-transparent border-b border-paper/20 py-4 text-xl font-sans text-paper focus:outline-none focus:border-gold transition-colors" type="text" onFocus={(e) => e.target.type='time'} onBlur={(e) => !e.target.value && (e.target.type='text')} required />
                            <label className="absolute left-0 top-4 text-paper/40 text-xs uppercase tracking-widest pointer-events-none group-focus-within:-top-2 group-focus-within:text-[10px] group-focus-within:text-gold transition-all">Time</label>
                        </div>
                    </div>

                    <div className="pt-8 flex items-center justify-between">
                        <button type="button" onClick={closeRitual} className="text-paper/40 hover:text-paper text-xs uppercase tracking-widest transition-colors">Abort</button>
                        <button type="submit" className="bg-paper text-ink px-10 py-4 text-xs font-bold uppercase tracking-[0.25em] hover:bg-gold hover:text-white transition-colors">
                            Engage
                        </button>
                    </div>
                </form>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};