import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ROOMS, Room } from '../constants';
import { ArrowUpRight, X, MessageCircle } from 'lucide-react';

export const Rooms: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  // Roman numerals helper
  const roman = ['I', 'II', 'III', 'IV', 'V', 'VI'];

  return (
    <section className="py-32 px-4 lg:px-12 max-w-[1600px] mx-auto">
      <div className="mb-20 flex flex-col items-center text-center">
         <span className="text-ink/40 text-[10px] tracking-[0.4em] uppercase mb-4">The Architecture of You</span>
         <h2 className="text-5xl lg:text-7xl font-display text-ink">Life Rooms</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {ROOMS.map((room, index) => (
          <motion.div
            layoutId={`room-card-${room.id}`}
            key={room.id}
            onClick={() => setSelectedRoom(room)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="group relative h-[550px] border border-ink/10 bg-paper-light hover:border-ink cursor-pointer overflow-hidden transition-all duration-500 flex flex-col justify-between"
          >
            {/* Inverse Hover Background */}
            <div className="absolute inset-0 bg-ink translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-y-0" />
            
            {/* Top Section */}
            <div className="relative z-10 p-8 flex justify-between items-start group-hover:text-paper transition-colors duration-500">
                <span className="font-display text-xl opacity-40 group-hover:opacity-60">{roman[index]}</span>
                <room.icon strokeWidth={1} size={28} className="opacity-60 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Middle Section: Title */}
            <div className="relative z-10 px-8 text-center group-hover:text-paper transition-colors duration-500">
                <h3 className="font-serif text-3xl lg:text-4xl italic mb-6 leading-tight">{room.title}</h3>
                <div className="w-[1px] h-12 bg-current mx-auto opacity-20 group-hover:h-24 group-hover:opacity-40 transition-all duration-700"></div>
            </div>

            {/* Bottom Section */}
            <div className="relative z-10 p-8 flex items-end justify-between group-hover:text-paper transition-colors duration-500">
                <p className="text-[10px] uppercase tracking-[0.2em] opacity-60 max-w-[140px] leading-relaxed">
                    {room.description}
                </p>
                
                <div className="w-12 h-12 border border-current rounded-full flex items-center justify-center group-hover:bg-paper group-hover:text-ink group-hover:border-transparent transition-all duration-500">
                    <ArrowUpRight size={18} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
            </div>

            {/* Subtle Texture Overlay (Visible on Dark Hover) */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay"></div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedRoom && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
             <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedRoom(null)}
                className="absolute inset-0 bg-[#F2F0E9]/95 backdrop-blur-md"
             />
             <motion.div 
                layoutId={`room-card-${selectedRoom.id}`}
                className="relative bg-paper-light border border-ink w-full max-w-5xl h-[85vh] shadow-2xl flex flex-col md:flex-row overflow-hidden"
             >
                <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedRoom(null); }}
                    className="absolute top-8 right-8 z-30 p-3 bg-transparent rounded-full border border-ink/20 hover:bg-ink hover:text-paper hover:border-ink transition-colors"
                >
                    <X size={24} strokeWidth={1.5} />
                </button>

                {/* Left: Content Area */}
                <div className="w-full md:w-7/12 p-12 lg:p-16 overflow-y-auto flex flex-col relative">
                    <div className="absolute top-0 left-0 w-full h-2 bg-ink"></div>
                    
                    <div className="mb-12">
                         <div className="flex items-center gap-4 mb-8 text-ink/40">
                             <selectedRoom.icon size={32} strokeWidth={1} />
                             <span className="text-xs tracking-[0.3em] uppercase">Room No. {roman[ROOMS.indexOf(selectedRoom)]}</span>
                         </div>
                         <h2 className="text-6xl lg:text-7xl font-serif mb-8 leading-[0.9]">{selectedRoom.title}</h2>
                         <p className="font-serif italic text-2xl text-ink/60 leading-relaxed">
                             {selectedRoom.description}
                         </p>
                    </div>

                    <div className="prose prose-lg prose-p:font-light prose-p:text-ink/80 prose-headings:font-serif">
                        <div className="w-12 h-[1px] bg-ink/20 mb-8"></div>
                        <p className="text-xl leading-relaxed mb-6">{selectedRoom.excerpt}</p>
                        <p>
                            The alignment suggests a need for pause. As Saturn transits your sector of responsibility, the weight may feel heavier, but the structure being built now will last for decades.
                        </p>
                        <blockquote className="border-l-2 border-ink pl-6 italic text-ink/60 my-8">
                            "Where are you sacrificing authenticity for security?"
                        </blockquote>
                        <p>
                            This room is currently active. The planetary transits indicate a significant shift in how you perceive value in this area.
                        </p>
                    </div>
                </div>

                {/* Right: Interaction Area */}
                <div className="w-full md:w-5/12 bg-ink text-paper p-12 flex flex-col justify-center items-center text-center relative overflow-hidden">
                    {/* Abstract Background Element */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-[40px] border-paper/5 rounded-full blur-3xl"></div>
                    
                    <div className="relative z-10 max-w-xs">
                        <div className="w-20 h-20 border border-paper/20 rounded-full flex items-center justify-center mx-auto mb-8 bg-paper/5 backdrop-blur-sm">
                            <MessageCircle size={32} strokeWidth={1} className="text-paper" />
                        </div>
                        
                        <h4 className="font-serif text-3xl mb-4">Consult the Oracle</h4>
                        <p className="text-sm text-paper/60 leading-relaxed mb-10 font-light">
                            The guide for {selectedRoom.title.split('&')[0]} is present. 
                            Ask about transits, blockages, or hidden opportunities within this room.
                        </p>
                        
                        <button className="w-full py-4 bg-paper text-ink text-xs uppercase tracking-[0.25em] hover:bg-gold hover:text-white transition-colors duration-300 font-medium">
                            Enter Dialogue
                        </button>
                    </div>
                </div>

             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
