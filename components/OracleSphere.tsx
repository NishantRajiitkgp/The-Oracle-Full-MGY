import React, { useRef, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';

interface OracleSphereProps {
  mode: 'idle' | 'aligning' | 'aligned';
  onClick: () => void;
}

export const OracleSphere: React.FC<OracleSphereProps> = ({ mode, onClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Physics: Magnetic Cursor Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Heavy, industrial spring physics for the "Engine" feel
  const springConfig = { damping: 40, stiffness: 200, mass: 1.5 };
  const rotateX = useSpring(useTransform(mouseY, [-500, 500], [35, -35]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-500, 500], [-35, 35]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // --- ANIMATION VARIANTS ---

  // The Gyroscope Rings (The Machine)
  const gyroVariants = {
    idle: { scale: 1, filter: "brightness(1)" },
    aligning: { 
        scale: 1.5, 
        filter: "brightness(1.5) blur(1px)",
        transition: { duration: 0.8, ease: "easeInOut" }
    },
    aligned: { 
        scale: 1.1, 
        filter: "brightness(1)",
        rotateX: 60, // Flatten out
        rotateY: 0,
        transition: { type: "spring", damping: 20 } 
    }
  };

  // Ring 1: The Outer Casing (Slow, Heavy)
  const outerRingVariants = {
    idle: { rotateX: 0, rotateY: 0, rotateZ: 360, transition: { duration: 60, ease: "linear", repeat: Infinity } },
    aligning: { rotateZ: 0, rotateX: 90, scale: 0.8, opacity: 0, transition: { duration: 0.5 } }, // Collapses in
    aligned: { rotateX: 90, rotateZ: 0, scale: 1, opacity: 0.1, transition: { duration: 1 } }
  };

  // Ring 2: The Vertical stabilizer (Medium Speed)
  const midRingVariants = {
    idle: { rotateX: 360, rotateY: 360, rotateZ: 0, transition: { duration: 30, ease: "linear", repeat: Infinity } },
    aligning: { rotateX: 0, rotateY: 0, rotateZ: 720, scale: 1.2, border: "2px solid #D4AF37", opacity: 1, transition: { duration: 2, ease: "circIn" } },
    aligned: { rotateX: 0, rotateY: 0, rotateZ: [0, 360], scale: 1, border: "1px solid #111", opacity: 0.2, transition: { rotateZ: { duration: 60, repeat: Infinity, ease: "linear" } } }
  };

  // Ring 3: The Inner Reactor (Fast, Chaotic)
  const innerRingVariants = {
    idle: { rotateX: -360, rotateY: 180, rotateZ: -180, transition: { duration: 15, ease: "linear", repeat: Infinity } },
    aligning: { rotateX: 0, rotateY: 0, rotateZ: 1440, scale: 0.1, opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }, // Sucked into void
    aligned: { rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1.4, opacity: 0.1, transition: { duration: 1, delay: 0.5 } } // Re-emerges as orbit
  };

  // The Singularity (Black Hole)
  const singularityVariants = {
    idle: { scale: 1, background: "#111" },
    aligning: { 
        scale: [1, 1.5, 0.1, 1], // Heartbeat implosion
        background: ["#111", "#D4AF37", "#000", "#111"],
        transition: { duration: 2, times: [0, 0.4, 0.9, 1], ease: "easeInOut" }
    },
    aligned: { scale: 1, background: "#111" }
  };

  return (
    <div 
        ref={containerRef}
        className="relative w-[600px] h-[600px] flex items-center justify-center cursor-pointer z-10"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={{ perspective: "1200px" }} // Deep perspective
    >
      {/* 3D GYROSCOPE CONTAINER */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center preserve-3d"
        style={{ rotateX: mode === 'aligned' ? 60 : rotateX, rotateY: mode === 'aligned' ? 0 : rotateY }} // Lock orientation when aligned
        animate={mode}
        variants={gyroVariants}
      >
         
         {/* THE SINGULARITY (Backdrop Filter Distortion) */}
         <motion.div 
            variants={singularityVariants}
            className="absolute w-32 h-32 rounded-full z-20 overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.5)]"
         >
             {/* The "Void" Gradient */}
             <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1a1a1a] to-black opacity-100"></div>
             {/* Distortion Lens (Simulated with blur/opacity) */}
             <div className="absolute inset-0 bg-ink/10 backdrop-blur-sm"></div>
             {/* Inner Glow Pulse */}
             <motion.div 
                animate={{ opacity: [0.2, 0.5, 0.2] }} 
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-gold/20 rounded-full blur-xl" 
             />
         </motion.div>

         {/* RING 1: Outer Casing */}
         <motion.div 
            variants={outerRingVariants}
            className="absolute w-[400px] h-[400px] rounded-full border border-ink/20 preserve-3d"
            style={{ borderStyle: 'solid' }}
         >
            {/* Detail Markers */}
            <div className="absolute top-0 left-1/2 w-2 h-2 bg-ink/40 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-ink/40 -translate-x-1/2 translate-y-1/2"></div>
         </motion.div>

         {/* RING 2: Vertical Stabilizer */}
         <motion.div 
            variants={midRingVariants}
            className="absolute w-[320px] h-[320px] rounded-full border border-ink/60 preserve-3d shadow-[0_0_30px_rgba(0,0,0,0.05)]"
         >
             {/* Tech markings */}
             <div className="absolute inset-0 border-[1px] border-ink/10 rounded-full scale-90 border-dashed"></div>
         </motion.div>

         {/* RING 3: Inner Reactor */}
         <motion.div 
            variants={innerRingVariants}
            className="absolute w-[240px] h-[240px] rounded-full border-[2px] border-ink preserve-3d"
         >
             {/* Orbiting Satellite */}
             <div className="absolute top-1/2 -right-2 w-4 h-4 bg-gold rounded-full shadow-[0_0_10px_#D4AF37]"></div>
         </motion.div>


         {/* --- ALIGNMENT EFFECTS --- */}
         
         {/* The "Event Horizon" - Only visible during alignment */}
         <AnimatePresence>
            {mode === 'aligning' && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 2.5], opacity: [0.8, 0] }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute w-[200px] h-[200px] rounded-full border-[1px] border-gold z-10"
                />
            )}
         </AnimatePresence>

         {/* The "Orbit Lines" - Visible when aligned */}
         <AnimatePresence>
            {mode === 'aligned' && (
                <motion.div
                     initial={{ opacity: 0, scale: 0.5 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ duration: 1 }}
                     className="absolute w-[600px] h-[600px] rounded-full border border-ink/5 z-0 pointer-events-none"
                >
                     <div className="absolute inset-0 border border-ink/5 rounded-full scale-75"></div>
                     <div className="absolute inset-0 border border-ink/5 rounded-full scale-50"></div>
                </motion.div>
            )}
         </AnimatePresence>

      </motion.div>
      
      {/* TEXT LABEL FLOATING IN 3D SPACE */}
      <motion.div 
        className="absolute bottom-[-60px] flex flex-col items-center gap-2 pointer-events-none"
        animate={{ 
            opacity: mode === 'idle' ? 1 : 0,
            y: mode === 'idle' ? 0 : 20
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="h-8 w-[1px] bg-ink/20"></div>
        <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-ink/60">System Idle</span>
      </motion.div>

      {/* CLICK HIT AREA - Invisible but ensures easy clicking */}
      <div className="absolute inset-0 z-50 rounded-full" />
    </div>
  );
};
