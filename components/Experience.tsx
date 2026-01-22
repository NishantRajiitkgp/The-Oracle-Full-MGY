import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Sparkles, Activity, FileText, Send, User } from 'lucide-react';

const FEATURES = [
  {
    id: 'chat',
    title: 'Communion',
    subtitle: 'Synthesized Consciousness',
    description: 'Engage in non-linear dialogue with specialized personas. From Osho to Stoic philosophers, receive guidance filtered through the lens of your unique cosmic architecture.',
    icon: Sparkles
  },
  {
    id: 'astro',
    title: 'Calibration',
    subtitle: 'Predictive Analytics',
    description: 'Our engine cross-references your birth data with real-time planetary transits. We don’t just say "Mercury Retrograde"; we predict exactly how it impacts your career sector.',
    icon: Activity
  },
  {
    id: 'report',
    title: 'Revelation',
    subtitle: 'Deep-Dive Intelligence',
    description: 'Beyond snippets. Receive 12-month forecasts and category-specific manuscripts (Finance, Love, Mind) that read like a biography written by the universe.',
    icon: FileText
  }
];

export const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFeature, setActiveFeature] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Update active feature based on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest < 0.33) setActiveFeature(0);
      else if (latest < 0.66) setActiveFeature(1);
      else setActiveFeature(2);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-paper">
      
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex flex-col lg:flex-row overflow-hidden">
        
        {/* LEFT: Content Panel */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 lg:px-20 py-20 bg-paper relative z-10">
          <div className="mb-12">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-ink/40">The Experience</span>
            <h2 className="text-5xl lg:text-7xl font-display text-ink mt-4 leading-[0.9]">
                Sacred <br/><span className="italic font-serif opacity-60">Technology</span>
            </h2>
          </div>

          <div className="relative h-[300px]">
             <AnimatePresence mode="wait">
                <motion.div
                    key={activeFeature}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                >
                    <div className="flex items-center gap-4 mb-6 text-gold">
                        <div className="p-3 bg-gold/10 rounded-full">
                            {React.createElement(FEATURES[activeFeature].icon, { size: 24 })}
                        </div>
                        <span className="text-xs uppercase tracking-widest font-bold">0{activeFeature + 1} — {FEATURES[activeFeature].subtitle}</span>
                    </div>
                    
                    <h3 className="text-4xl font-serif text-ink mb-6">{FEATURES[activeFeature].title}</h3>
                    <p className="text-lg text-ink/60 font-light leading-relaxed max-w-md">
                        {FEATURES[activeFeature].description}
                    </p>
                </motion.div>
             </AnimatePresence>
          </div>

          {/* Progress Indicators */}
          <div className="flex gap-2 mt-8">
            {FEATURES.map((_, idx) => (
                <div 
                    key={idx} 
                    className={`h-1 flex-1 transition-colors duration-500 ${idx === activeFeature ? 'bg-ink' : 'bg-ink/10'}`}
                />
            ))}
          </div>
        </div>


        {/* RIGHT: The Interface Visualization */}
        <div className="w-full lg:w-1/2 bg-[#F5F2EB] relative flex items-center justify-center overflow-hidden">
             
             {/* Background Gradients */}
             <div className="absolute inset-0 opacity-30">
                <motion.div 
                    animate={{ 
                        background: activeFeature === 0 ? 'radial-gradient(circle at 50% 50%, rgba(212,175,55,0.2), transparent)' : 
                                   activeFeature === 1 ? 'radial-gradient(circle at 50% 50%, rgba(100,100,255,0.1), transparent)' :
                                   'radial-gradient(circle at 50% 50%, rgba(50,50,50,0.1), transparent)'
                    }}
                    className="absolute inset-0 transition-all duration-1000"
                />
                {/* Noise */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
             </div>

             {/* THE DEVICE MOCKUP */}
             <div className="relative w-[360px] h-[700px] bg-paper-light rounded-[3rem] shadow-[0_40px_80px_rgba(0,0,0,0.1)] border-[8px] border-ink/5 overflow-hidden ring-1 ring-ink/10 transform transition-transform duration-700 hover:scale-[1.02]">
                
                {/* Notch/Top Bar */}
                <div className="absolute top-0 left-0 w-full h-12 bg-white/50 backdrop-blur-md z-20 border-b border-ink/5 flex items-center justify-between px-6">
                    <span className="text-[10px] font-mono text-ink/40">11:11</span>
                    <div className="w-12 h-4 bg-ink/10 rounded-full"></div>
                </div>

                {/* --- CONTENT AREA: MORPHING UI --- */}
                <div className="relative w-full h-full pt-20 px-6 pb-8 flex flex-col">
                    
                    {/* MODE 1: CHAT INTERFACE */}
                    <AnimatePresence>
                        {activeFeature === 0 && (
                            <motion.div
                                key="chat-ui"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col h-full"
                            >
                                <div className="text-center mb-8">
                                    <div className="w-16 h-16 mx-auto bg-ink/5 rounded-full flex items-center justify-center mb-3 border border-ink/10">
                                        <span className="text-2xl">👁️</span>
                                    </div>
                                    <div className="text-xs uppercase tracking-widest text-ink/40">The Mystic</div>
                                </div>

                                <div className="space-y-6 flex-1">
                                    {/* User Message */}
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="flex justify-end"
                                    >
                                        <div className="bg-ink/5 text-ink text-sm p-4 rounded-2xl rounded-tr-sm max-w-[80%]">
                                            I feel anxious about the future. My mind won't stop racing.
                                        </div>
                                    </motion.div>

                                    {/* System Typing Indicator */}
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.8 }}
                                        className="text-[10px] uppercase tracking-widest text-ink/30 pl-4"
                                    >
                                        Analyzing Transit: Mercury Sq Saturn...
                                    </motion.div>

                                    {/* Persona Response */}
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.5 }}
                                        className="flex justify-start"
                                    >
                                        <div className="bg-ink text-paper text-sm p-4 rounded-2xl rounded-tl-sm max-w-[90%] shadow-xl">
                                            <p className="leading-relaxed">
                                                "The mind races because it believes it is in control. Your chart shows Saturn pressing on your thoughts right now—this is not danger, it is a demand for structure. Breathe into the restriction."
                                            </p>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Input Bar */}
                                <div className="mt-auto h-12 rounded-full border border-ink/10 flex items-center px-4 justify-between text-ink/30">
                                    <span className="text-xs">Type your response...</span>
                                    <Send size={14} />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>


                    {/* MODE 2: ASTRO CALIBRATION */}
                    <AnimatePresence>
                        {activeFeature === 1 && (
                            <motion.div
                                key="astro-ui"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 pt-20 px-6"
                            >
                                <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                                    {/* Radar Ripple */}
                                    <div className="w-[400px] h-[400px] border border-ink rounded-full animate-ping"></div>
                                </div>

                                <h3 className="text-xl font-display text-center mb-12">Transit Scan</h3>

                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-ink/5">
                                        <div className="text-[10px] uppercase text-ink/40 mb-1">Career</div>
                                        <div className="text-2xl font-serif text-green-600">High</div>
                                        <div className="h-1 w-full bg-green-100 mt-2 rounded-full overflow-hidden">
                                            <motion.div initial={{ width: 0 }} animate={{ width: '80%' }} transition={{ delay: 0.5, duration: 1 }} className="h-full bg-green-500" />
                                        </div>
                                    </div>
                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-ink/5">
                                        <div className="text-[10px] uppercase text-ink/40 mb-1">Love</div>
                                        <div className="text-2xl font-serif text-yellow-600">Wait</div>
                                        <div className="h-1 w-full bg-yellow-100 mt-2 rounded-full overflow-hidden">
                                            <motion.div initial={{ width: 0 }} animate={{ width: '40%' }} transition={{ delay: 0.5, duration: 1 }} className="h-full bg-yellow-500" />
                                        </div>
                                    </div>
                                </div>

                                <motion.div 
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="bg-ink/5 p-6 rounded-2xl border border-ink/10"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                        <span className="text-xs font-bold uppercase tracking-widest">Alert Detected</span>
                                    </div>
                                    <p className="text-sm leading-relaxed">
                                        Mars enters your 10th House tomorrow. Expect a sudden burst of professional visibility. Prepare your pitch now.
                                    </p>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>


                    {/* MODE 3: REPORTS (MANUSCRIPT) */}
                    <AnimatePresence>
                        {activeFeature === 2 && (
                            <motion.div
                                key="report-ui"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-[#FDFBF7] pt-20 px-8 overflow-hidden"
                            >
                                <motion.div 
                                    initial={{ y: 0 }}
                                    animate={{ y: -100 }}
                                    transition={{ duration: 10, ease: "linear" }}
                                    className="space-y-6"
                                >
                                    <div className="border-b border-ink/10 pb-4">
                                        <span className="text-[10px] uppercase tracking-[0.3em] text-gold">Confidential</span>
                                        <h2 className="text-3xl font-display mt-2">The Annual<br/>Forecast</h2>
                                    </div>

                                    <div className="prose prose-sm font-serif text-ink/80 leading-relaxed">
                                        <p>
                                            <span className="text-3xl float-left mr-2 mt-[-6px] font-display">T</span>
                                            he coming year represents a foundational shift in your identity. With Pluto exiting your 1st House, the pressure to constantly reinvent yourself will subside, replaced by a need to consolidate resources.
                                        </p>
                                        <p>
                                            <strong>Financial Outlook:</strong> Q2 brings a trine that supports long-term investment. Avoid impulsive spending in March.
                                        </p>
                                        <p>
                                            <strong>Relationship Dynamics:</strong> You are entering a cycle of 'sovereignty'. Partnerships that drain your energy will naturally dissolve by August.
                                        </p>
                                        <p>
                                            <strong>Mental Wellness:</strong> Meditation is no longer optional; it is structural maintenance for your psyche during this transit.
                                        </p>
                                        <div className="h-px w-full bg-ink/10 my-4"></div>
                                        <p className="text-xs font-sans text-ink/40 uppercase tracking-widest text-center">End of Preview</p>
                                    </div>
                                </motion.div>
                                
                                {/* Overlay Fade */}
                                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#FDFBF7] to-transparent z-10"></div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>

                {/* Bottom Bar */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-ink/20 rounded-full"></div>
             </div>

        </div>

      </div>
    </section>
  );
};
