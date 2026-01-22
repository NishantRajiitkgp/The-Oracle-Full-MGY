import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Sparkles, Eye, Landmark, DraftingCompass } from 'lucide-react';

const PROMPTS = [
  { id: 1, text: "Why do I feel so stuck right now?", persona: "The Stoic" },
  { id: 2, text: "Is this relationship right for me?", persona: "The Mystic" },
  { id: 3, text: "How do I find my purpose?", persona: "The Architect" }
];

const RESPONSES = {
  1: "The obstacle is the way. You feel stuck because you are pushing against a wall that is meant to be climbed. Stop acting; start observing.",
  2: "Relationships are mirrors. What you see in them is a reflection of what you are refusing to see in yourself. Look closer at the glass.",
  3: "Purpose is not found; it is built. You are waiting for a map, but you are holding the pen. Draw the first line."
};

export const Communion: React.FC = () => {
  const [activePrompt, setActivePrompt] = useState<number | null>(null);

  const getIcon = (id: number) => {
    switch (id) {
      case 1: return <Landmark size={32} strokeWidth={1} />; // Stoic
      case 2: return <Eye size={32} strokeWidth={1} />; // Mystic
      case 3: return <DraftingCompass size={32} strokeWidth={1} />; // Architect
      default: return <Sparkles size={32} strokeWidth={1} />;
    }
  };

  return (
    <section className="min-h-screen bg-[#FDFBF7] relative flex flex-col items-center justify-center py-32 overflow-hidden border-b border-ink/5">
       {/* Background Aura */}
       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div 
            animate={{ 
                scale: activePrompt ? [1, 1.2, 1] : 1,
                opacity: activePrompt ? 0.1 : 0.05
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-[800px] h-[800px] rounded-full bg-gradient-to-r from-purple-200 to-blue-200 blur-3xl"
          />
       </div>

       <div className="max-w-7xl w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          
          {/* LEFT: THE INTERFACE */}
          <div className="space-y-12">
              <div>
                  <div className="flex items-center gap-3 mb-4">
                      <Sparkles size={16} className="text-gold" />
                      <span className="text-xs uppercase tracking-[0.3em] text-ink/40">USP 01 — Communion</span>
                  </div>
                  <h2 className="text-6xl lg:text-8xl font-display text-ink leading-[0.85]">
                      Synthesized <br/><span className="italic font-serif opacity-60">Wisdom</span>
                  </h2>
                  <p className="mt-8 text-lg font-light text-ink/60 leading-relaxed max-w-md">
                      Engage in non-linear dialogue with specialized personas. Receive guidance filtered through the lens of your unique cosmic architecture.
                  </p>
              </div>

              <div className="space-y-4">
                  <p className="text-xs uppercase tracking-widest text-ink/40 mb-4">Select a prompt:</p>
                  {PROMPTS.map((prompt) => (
                      <button
                        key={prompt.id}
                        onClick={() => setActivePrompt(prompt.id)}
                        className={`w-full text-left p-6 border transition-all duration-500 group relative overflow-hidden ${activePrompt === prompt.id ? 'border-ink bg-ink text-paper' : 'border-ink/10 hover:border-ink/40 bg-white'}`}
                      >
                          <div className="relative z-10 flex justify-between items-center">
                              <span className="font-serif italic text-lg">"{prompt.text}"</span>
                              <span className={`text-[10px] uppercase tracking-widest ${activePrompt === prompt.id ? 'text-gold' : 'text-ink/30'}`}>{prompt.persona}</span>
                          </div>
                      </button>
                  ))}
              </div>
          </div>

          {/* RIGHT: THE VISUALIZATION */}
          <div className="relative h-[600px] flex items-center justify-center">
              
              {/* Abstract Sigil Container */}
              <div className="relative w-[500px] h-[500px]">
                  {/* Rotating Rings */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border border-ink/5 rounded-full"
                  />
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-4 border border-ink/5 rounded-full border-dashed"
                  />

                  {/* Central Orb / Response Area */}
                  <div className="absolute inset-0 flex items-center justify-center">
                      <AnimatePresence mode="wait">
                          {activePrompt ? (
                              <motion.div 
                                key={activePrompt}
                                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                                transition={{ duration: 0.8 }}
                                className="text-center max-w-sm p-8"
                              >
                                  <div className="w-20 h-20 mx-auto bg-ink text-paper rounded-full flex items-center justify-center mb-8 shadow-2xl">
                                      {getIcon(activePrompt)}
                                  </div>
                                  <p className="font-serif text-2xl leading-relaxed text-ink">
                                      "{RESPONSES[activePrompt as keyof typeof RESPONSES]}"
                                  </p>
                              </motion.div>
                          ) : (
                              <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center"
                              >
                                  <MessageSquare size={48} strokeWidth={1} className="mx-auto text-ink/20 mb-4" />
                                  <p className="text-ink/30 text-xs uppercase tracking-[0.2em]">Awaiting Input</p>
                              </motion.div>
                          )}
                      </AnimatePresence>
                  </div>
              </div>
          </div>

       </div>
    </section>
  );
};
