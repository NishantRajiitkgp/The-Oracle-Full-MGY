import React from 'react';
import { motion } from 'framer-motion';

export const StarGate: React.FC = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center perspective-[1000px] overflow-hidden">
        
        {/* --- DEEP SPACE FOG --- */}
        <motion.div 
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent opacity-50"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* --- THE HYPER-TUNNEL (Perspective Lines) --- */}
        <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={`ray-${i}`}
                    className="absolute h-[2px] w-[50vw] bg-gradient-to-r from-transparent via-gold/20 to-transparent origin-left"
                    style={{ rotate: i * 30 }}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: [0, 1.5, 0], opacity: [0, 0.5, 0], x: [0, 200, 0] }}
                    transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        delay: i * 0.1,
                        ease: "easeInOut" 
                    }}
                />
            ))}
        </div>

        {/* --- THE MAIN MACHINE (SVG) --- */}
        <div className="relative w-[800px] h-[800px] flex items-center justify-center scale-75 md:scale-100">
            <svg viewBox="0 0 800 800" className="w-full h-full overflow-visible">
                <defs>
                    <filter id="glow-sg" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#D4AF37" stopOpacity="0" />
                        <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Layer 1: The Outer Data Ring (Counter-Clockwise) */}
                <motion.g 
                    style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                >
                    <circle cx="400" cy="400" r="380" fill="none" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.1" strokeDasharray="4 8" />
                    <circle cx="400" cy="400" r="360" fill="none" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.2" />
                    {[...Array(8)].map((_, i) => (
                         <circle key={i} cx={400 + 380 * Math.cos(i * 45 * Math.PI / 180)} cy={400 + 380 * Math.sin(i * 45 * Math.PI / 180)} r="4" fill="#D4AF37" fillOpacity="0.6" />
                    ))}
                </motion.g>

                {/* Layer 2: The Structural Hexagon (Breathing) */}
                <motion.g
                    style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                    animate={{ scale: [0.9, 1, 0.9], rotate: 360 }}
                    transition={{ scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 120, repeat: Infinity, ease: "linear" }}}
                >
                     <path d="M400 100 L660 250 L660 550 L400 700 L140 550 L140 250 Z" fill="none" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.15" />
                     <path d="M400 120 L640 260 L640 540 L400 680 L160 540 L160 260 Z" fill="none" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.1" strokeDasharray="10 5" />
                </motion.g>

                {/* Layer 3: High Speed Inner Rings (Clockwise) */}
                <motion.g
                    style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                    <circle cx="400" cy="400" r="200" fill="none" stroke="url(#gold-grad)" strokeWidth="2" strokeDasharray="100 200" strokeLinecap="round" filter="url(#glow-sg)" />
                    <circle cx="400" cy="400" r="180" fill="none" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="2 10" />
                </motion.g>
                
                {/* Layer 4: The Core Scanner */}
                <motion.g
                     style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                >
                    <circle cx="400" cy="400" r="100" fill="none" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.5" />
                    
                    {/* Scanning Beam */}
                    <motion.path 
                        d="M400 400 L400 50" 
                        stroke="url(#gold-grad)" 
                        strokeWidth="4" 
                        strokeLinecap="round"
                        filter="url(#glow-sg)"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                    />
                    
                    {/* Pulsing Center */}
                    <motion.circle 
                        cx="400" cy="400" r="10" 
                        fill="#D4AF37"
                        animate={{ r: [10, 20, 10], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        filter="url(#glow-sg)"
                    />
                </motion.g>

                {/* Layer 5: Random Glitch Runes */}
                <g>
                    {[...Array(6)].map((_, i) => (
                        <motion.text
                            key={i}
                            x={400 + 250 * Math.cos(i * 60 * Math.PI / 180)}
                            y={400 + 250 * Math.sin(i * 60 * Math.PI / 180)}
                            fill="#D4AF37"
                            fontSize="14"
                            fontFamily="monospace"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            opacity="0.6"
                            animate={{ opacity: [0.2, 1, 0.2] }}
                            transition={{ duration: 1 + Math.random(), repeat: Infinity }}
                        >
                            {["Ω", "∆", "∑", "∏", "Ψ", "Φ"][i]}
                        </motion.text>
                    ))}
                </g>
            </svg>
        </div>

        {/* --- FLOATING PARTICLES --- */}
        <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-gold rounded-full"
                    initial={{ 
                        x: Math.random() * 1000 - 500, 
                        y: Math.random() * 1000 - 500, 
                        z: 0, 
                        opacity: 0 
                    }}
                    animate={{ 
                        z: [0, 500], 
                        opacity: [0, 1, 0],
                        scale: [0, 2] 
                    }}
                    transition={{ 
                        duration: 3 + Math.random() * 2, 
                        repeat: Infinity, 
                        delay: Math.random() * 2,
                        ease: "linear" 
                    }}
                    style={{ 
                        left: '50%', 
                        top: '50%' 
                    }}
                />
            ))}
        </div>
        
    </div>
  );
};
