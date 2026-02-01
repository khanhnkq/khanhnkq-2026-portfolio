
"use client";

import React from "react";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";

import { GlitchText } from "@/components/ui/glitch-text";
import { Iphone } from "@/registry/magicui/iphone";
import { AlertTriangle, AlertOctagon } from "lucide-react";

export const Hero = () => {
  // Motion values for tilt effect, moved from FloatingPhone
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);

  const scale = useSpring(1, { stiffness: 150, damping: 20 });
  
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isBooting, setIsBooting] = React.useState(true);
  const [showWarning, setShowWarning] = React.useState(false);

  React.useEffect(() => {
      // Loop: Show 8s, Hide 10s (Total 18s)
      const runCycle = () => {
          setShowWarning(true);
          setTimeout(() => setShowWarning(false), 10000); 
      };

      // Start after boot (3s delay)
      const initialDelay = setTimeout(runCycle, 3000);
      const interval = setInterval(runCycle, 18000);

      return () => {
          clearTimeout(initialDelay);
          clearInterval(interval);
      };
  }, []);

  React.useEffect(() => {
      if (videoRef.current) {
          videoRef.current.playbackRate = 1.0;
      }
      
      // Artificial Boot Delay
      const bootTimer = setTimeout(() => {
          setIsBooting(false);
      }, 2000);

      return () => clearTimeout(bootTimer);
  }, []);

  // Play video when visible in viewport (avoids Chrome power-saving pause)
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video || isBooting) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Silent fail - Chrome may block autoplay, user interaction will resume it
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [isBooting]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => {
    scale.set(1.05);
  };

  const handleMouseLeave = () => {
    x.set(0.3); // Default tilt right
    y.set(-0.05); // Reset to default tilt
    scale.set(1);
  };

  // Initialize to default state
  React.useEffect(() => {
    x.set(0.3);
    y.set(-0.05);
  }, [x, y]);

  return (
    <section className="h-screen relative font-rajdhani overflow-hidden flex items-center">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 px-12 relative z-10">
            
            {/* LEFT/MIDDLE: FLOATING PHONE AVATAR */}
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              style={{
                rotateX,
                rotateY,
                scale,
                transformStyle: "preserve-3d",
              }}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="md:col-span-7 flex items-center justify-center relative z-10 py-20 order-2 md:order-1 translate-x-36"
            >
               {/* Replaced FloatingPhone with Iphone component */}
               <motion.div 
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="relative group select-none cursor-pointer perspective-1000"
               >
                    <div className="w-[380px] md:w-[434px]"> {/* Wrapper as requested, responsive */}
                        <Iphone>
                             {/* BOOT SEQUENCE OVERLAY */}
                             <AnimatePresence mode="wait">
                                {isBooting && (
                                    <motion.div 
                                      key="boot-screen"
                                      className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center font-orbitron text-cyan-500"
                                      exit={{ opacity: 0, filter: "brightness(2) blur(20px)" }}
                                      transition={{ duration: 0.5, ease: "easeInOut" }}
                                    >
                                        <div className="relative mb-8">
                                            <GlitchText text="Welcome" className="text-2xl font-bold tracking-[0.2em]" />
                                        </div>
                                        
                                        {/* Bar Loader */}
                                        <motion.div 
                                          transition={{ staggerChildren: 0.1 }}
                                          initial="initial"
                                          animate="animate"
                                          className="flex gap-1"
                                        >
                                          {[...Array(5)].map((_, i) => (
                                            <motion.div 
                                              key={i} 
                                              variants={{
                                                initial: { scaleY: 0.5, opacity: 0 },
                                                animate: { 
                                                  scaleY: 1, 
                                                  opacity: 1, 
                                                  transition: { repeat: Infinity, repeatType: "mirror", duration: 0.4, ease: "circIn" }
                                                }
                                              }} 
                                              className="h-12 w-2 bg-cyan-400" 
                                            />
                                          ))}
                                        </motion.div>
                                        
                                        <div className="mt-8 flex flex-col items-center gap-1">
                                            <span className="text-[10px] text-cyan-500/50 tracking-widest animate-pulse">LOADING_MEMORY...</span>
                                            <span className="text-[10px] text-cyan-500/30 tracking-widest">SHADOW_MONARCH_OS</span>
                                        </div>
                                    </motion.div>
                                )}
                             </AnimatePresence>

                            {/* Main Visual */}
                             <div className="h-full w-full bg-[#0a0a0a] relative overflow-hidden">
                                  {/* Video Avatar */}
                                  <video 
                                    ref={videoRef}
                                    src="https://res.cloudinary.com/dgk3boljk/video/upload/q_auto,f_auto,w_1920/v1769242579/lucy-blue-glitch.3840x2160_osooxk.mp4" 
                                    loop
                                    muted
                                    playsInline
                                    preload="none"
                                    poster="/images/hero-poster.webp"
                                    className="w-full h-full object-cover transition-transform duration-700 pointer-events-none" 
                                  />
                                  
                                  {/* Glitch Overlay Effect */}
                                  <div className="absolute inset-0 bg-scanline opacity-10 pointer-events-none mix-blend-overlay"></div>
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>

            
                             </div>
                        </Iphone>
                     </div>
                </motion.div>
            </motion.div>

            {/* RIGHT: CHARACTER STATS (SYSTEM INTERFACE) */}
            <motion.div 
              className="md:col-span-5 flex flex-col justify-center items-end text-right relative z-30 order-1 md:order-2 pl-4"
            >
               {/* 1. SYSTEM HEADER */}
               <motion.div 
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.2 }}
                 className="flex items-center gap-3 mb-6 opacity-60"
               >
                  <div className="h-[1px] w-24 bg-gradient-to-l from-white to-transparent"></div>
                  <GlitchText text="System.Player_ID: 2026" className="text-[10px] tracking-[0.3em] uppercase font-orbitron text-cyan-400" />
               </motion.div>

               {/* 2. NAME & TITLE */}
               <motion.div
                 initial={{ opacity: 0, x: 30 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.3 }}
                 className="relative mb-8"
               >
                 <GlitchText as="h2" text="Shadow Monarch" className="text-sm md:text-base text-cyan-400 font-bold tracking-[0.5em] uppercase mb-2 mr-1 font-orbitron" />
                 <GlitchText as="h1" text="KHANHNKQ" className="text-7xl md:text-8xl font-black text-white leading-[0.85] tracking-tighter uppercase drop-shadow-2xl" />
                 {/* Job Class Label */}
                 <div className="flex items-center justify-end gap-3 mt-4">
                    <div className="px-3 py-1 border border-white/20 rounded-full bg-zinc-950/80">
                        <GlitchText text="Class: Fullstack Dev" className="text-white/60 font-orbitron text-[10px] tracking-widest uppercase" />
                    </div>
                    <div className="px-3 py-1 border border-yellow-500/30 rounded-full bg-yellow-950/30">
                        <GlitchText text="Lvl. 99" className="text-yellow-500 font-mono text-[10px] tracking-widest uppercase" />
                    </div>
                 </div>
               </motion.div>

               {/* 3. RANK BADGE (Integrated Bar) */}
               <motion.div 
                 initial={{ scale: 0.9, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 transition={{ delay: 0.4 }}
                 className="flex flex-col items-end mb-8 w-full"
               >
                 <div className="flex items-center gap-6 border-r-2 border-yellow-500 pr-6 py-4 bg-gradient-to-l from-yellow-500/5 to-transparent w-full justify-end relative overflow-hidden group">
                    {/* Background Scanline */}
                    <div className="absolute inset-0 bg-yellow-400/5 translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                    
                    <div className="text-right z-10">
                        <div className="text-[10px] text-yellow-500/60 tracking-[0.3em] uppercase font-bold mb-1">Current Evaluation</div>
                        <GlitchText text="NATIONAL LEVEL" className="text-2xl font-pirata text-white tracking-widest leading-none" />
                    </div>
                    <div className="relative z-10">
                        <div className="text-8xl font-pirata italic text-yellow-500 drop-shadow-[0_0_20px_rgba(234,179,8,0.6)] animate-pulse leading-none pt-2 pr-2">S</div>
                    </div>
                 </div>
               </motion.div>

               {/* 4. BIO / QUEST LOG */}
               <motion.div 
                 className="space-y-6 max-w-lg w-full"
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.5 }}
               >
                  <div className="bg-zinc-950/90 border-t border-b border-white/10 p-6 relative">
                     <div className="text-[10px] text-white/30 tracking-widest uppercase mb-3 text-left">{"/// System_Log_Entry"}</div>
                     <p className="text-white/70 text-sm leading-relaxed font-rajdhani text-right">
                       "A developer who has exceeded the system limits. Specializes in building <span className="text-cyan-400 font-bold">Next.js</span> architectures and summoning <span className="text-cyan-400 font-bold">Interactive Interfaces</span> from the void. seeks to complete the <span className="text-white font-bold">Ultimate Quest</span>."
                     </p>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex justify-end gap-4">
                     <button className="group px-8 py-3 bg-transparent border border-white/20 text-white/60 hover:text-white hover:border-cyan-400 hover:bg-cyan-950/30 transition-all uppercase text-xs tracking-[0.2em] relative overflow-hidden">
                        <span className="relative z-10">View Stats</span>
                     </button>
                     <button className="px-8 py-3 bg-white text-black font-bold uppercase text-xs tracking-[0.2em] hover:bg-cyan-400 hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                        Initiate
                     </button>
                  </div>
               </motion.div>
            </motion.div>
          </div>
          
          {/* Scroll Indicator */}
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-12 left-12 text-white/30 text-[10px] font-mono tracking-[0.4em] transform -rotate-90 origin-left"
          >
            SCROLL TO EXPLORE
          </motion.div>

          {/* Bottom Warning Ribbon (Periodic) - Hero Section Only */}
            <AnimatePresence>
                {showWarning && (
                    <motion.div 
                        key="warning-ribbon"
                        initial={{ scaleX: 0, scaleY: 0.05, opacity: 0, filter: "brightness(20)" }}
                        animate={{ 
                            scaleX: [0, 1, 1],
                            scaleY: [0.05, 0.05, 1],
                            opacity: [0, 1, 1],
                            filter: ["brightness(20)", "brightness(5)", "brightness(1)"]
                        }}
                        exit={{ 
                            scaleX: [1, 1, 0],
                            scaleY: [1, 0.05, 0.05],
                            opacity: [1, 1, 0],
                            filter: "brightness(10)"
                        }}
                        transition={{ duration: 0.4, times: [0, 0.6, 1], ease: "circOut" }}
                        className="absolute bottom-18 left-12 right-12 bg-yellow-950/80 border-y border-yellow-500/50 z-30 overflow-hidden origin-center rounded-sm shadow-[0_0_20px_rgba(234,179,8,0.2)]"
                    >
                        <motion.div 
                            className="flex whitespace-nowrap min-w-full py-1"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                            >
                             {[0, 1].map((part) => (
                               <div key={part} className="flex gap-8 font-bold text-xs tracking-[0.3em] text-yellow-400 font-orbitron px-4 items-center drop-shadow-[0_0_5px_rgba(234,179,8,0.8)]">
                                  {[...Array(3)].map((_, i) => (
                                     <div key={i} className="flex gap-12 items-center">
                                       <span className="flex items-center gap-3 text-yellow-400"><AlertTriangle className="w-3 h-3" /> WARNING: SYSTEM_CRITICAL</span>
                                       <span className="flex items-center gap-3 text-yellow-400"><AlertOctagon className="w-3 h-3" /> CAUTION: HIGH_VOLTAGE</span>
                                       <span className="flex items-center gap-3 text-yellow-400"><AlertTriangle className="w-3 h-3" /> WARNING: SECURITY_BREACH</span>
                                       <span className="flex items-center gap-3 text-yellow-400"><AlertOctagon className="w-3 h-3" /> CAUTION: UNSTABLE_CORE</span>
                                     </div>
                                  ))}
                               </div>
                             ))}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
    </section>
  );
};
