import React from 'react';
import { Check } from 'lucide-react';

export const Pricing: React.FC = () => {
  return (
    <section className="py-32 px-6 lg:px-12 bg-paper-light">
      <div className="text-center mb-16">
        <h2 className="text-4xl lg:text-5xl font-serif mb-2">Choose Your Pass</h2>
        <p className="text-ink/50 text-xs tracking-[0.2em] uppercase">Enter the museum</p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
        
        {/* Explorer Pass */}
        <div className="relative border border-ink/20 bg-paper p-8 flex flex-col items-center text-center shadow-lg group hover:-translate-y-2 transition-transform duration-300">
           {/* Cutout effect */}
           <div className="absolute -left-3 top-1/2 w-6 h-6 bg-paper-light rounded-full border-r border-ink/20 transform -translate-y-1/2"></div>
           <div className="absolute -right-3 top-1/2 w-6 h-6 bg-paper-light rounded-full border-l border-ink/20 transform -translate-y-1/2"></div>
           <div className="absolute top-1/2 left-4 right-4 border-t border-dashed border-ink/10"></div>
           
           <div className="space-y-4 mb-12 relative z-10 w-full">
              <span className="text-xs uppercase tracking-widest text-ink/50">Basic Entry</span>
              <h3 className="font-serif text-3xl">Explorer Pass</h3>
              <div className="text-4xl font-display mt-4">Free</div>
              <p className="text-sm text-ink/60 font-light">Daily insights & basic chart.</p>
           </div>

           <ul className="space-y-4 mb-8 text-sm text-ink/80 font-light w-full relative z-10 bg-paper pt-4">
              <li className="flex items-center justify-center gap-2"><Check size={14} className="text-green-600"/> Daily horoscope</li>
              <li className="flex items-center justify-center gap-2"><Check size={14} className="text-green-600"/> Basic Birth Chart</li>
              <li className="flex items-center justify-center gap-2"><Check size={14} className="text-green-600"/> 1 Persona Guide</li>
           </ul>

           <button className="mt-auto px-8 py-3 border border-ink text-xs uppercase tracking-widest hover:bg-ink hover:text-paper transition-colors w-full">
             Claim Ticket
           </button>
        </div>

        {/* Oracle Pass */}
        <div className="relative border border-ink bg-ink text-paper p-8 flex flex-col items-center text-center shadow-2xl group hover:-translate-y-2 transition-transform duration-300">
           {/* Cutout effect */}
           <div className="absolute -left-3 top-1/2 w-6 h-6 bg-paper-light rounded-full border-r border-ink transform -translate-y-1/2"></div>
           <div className="absolute -right-3 top-1/2 w-6 h-6 bg-paper-light rounded-full border-l border-ink transform -translate-y-1/2"></div>
           <div className="absolute top-1/2 left-4 right-4 border-t border-dashed border-paper/20"></div>
           
           <div className="space-y-4 mb-12 relative z-10 w-full">
              <span className="text-xs uppercase tracking-widest text-gold">Full Access</span>
              <h3 className="font-serif text-3xl text-gold">Oracle Pass</h3>
              <div className="text-4xl font-display mt-4 text-white">$12<span className="text-sm text-white/50">/mo</span></div>
              <p className="text-sm text-paper/60 font-light">All rooms, all guides, deep time.</p>
           </div>

           <ul className="space-y-4 mb-8 text-sm text-paper/80 font-light w-full relative z-10 bg-ink pt-4">
              <li className="flex items-center justify-center gap-2"><Check size={14} className="text-gold"/> Unlimited Chats</li>
              <li className="flex items-center justify-center gap-2"><Check size={14} className="text-gold"/> Full Transit Timeline</li>
              <li className="flex items-center justify-center gap-2"><Check size={14} className="text-gold"/> Relationship Synastry</li>
              <li className="flex items-center justify-center gap-2"><Check size={14} className="text-gold"/> All Life Rooms</li>
           </ul>

           <button className="mt-auto px-8 py-3 bg-gold text-ink font-semibold text-xs uppercase tracking-widest hover:bg-white transition-colors w-full border border-gold hover:border-white">
             Purchase Access
           </button>
        </div>

      </div>
    </section>
  );
};