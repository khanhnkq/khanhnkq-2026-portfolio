"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";
import { GlitchText } from "@/components/ui/glitch-text";

interface RuneStoneProps {
  name: string;
  icon: React.ElementType;
  level: string; // e.g. "Master", "Expert", "Lvl. 99"
  category: "frontend" | "backend" | "tool" | "language";
  delay?: number;
}

const categoryColorMap = {
  frontend: "text-cyan-400 border-cyan-500/50 shadow-cyan-500/20",
  backend: "text-violet-500 border-violet-500/50 shadow-violet-500/20",
  tool: "text-yellow-500 border-yellow-500/50 shadow-yellow-500/20",
  language: "text-emerald-400 border-emerald-500/50 shadow-emerald-500/20",
};

const categoryBgMap = {
  frontend: "bg-cyan-500/10 group-hover:bg-cyan-500/20",
  backend: "bg-violet-500/10 group-hover:bg-violet-500/20",
  tool: "bg-yellow-500/10 group-hover:bg-yellow-500/20",
  language: "bg-emerald-500/10 group-hover:bg-emerald-500/20",
};

export const RuneStone = ({ name, icon: Icon, level, category, delay = 0 }: RuneStoneProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="relative group cursor-pointer"
    >
      {/* Floating Animation Wrapper */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: Math.random() * 2 // Randomize float start
        }}
        className={cn(
            "relative w-24 h-24 md:w-28 md:h-28 flex items-center justify-center rounded-xl border bg-black/40 transition-all duration-300",
            categoryColorMap[category],
            categoryBgMap[category],
            "hover:scale-110 hover:shadow-[0_0_30px_currentColor] hover:border-opacity-100 border-opacity-30"
        )}
      >
        {/* Glow Effect Layer */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,currentColor_0%,transparent_70%)] opacity-20" />

        {/* Inner Icon */}
        <div className="relative z-10 flex flex-col items-center gap-2">
            <Icon className="w-8 h-8 md:w-10 md:h-10 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
            
            {/* Level Badge (Hidden by default, shown on hover?) -> Let's show simplified on hover */}
        </div>

        {/* Corner Decors */}
        <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-current opacity-50" />
        <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-current opacity-50" />
        <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-current opacity-50" />
        <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-current opacity-50" />
      </motion.div>
      
      {/* Tooltip / Name Label */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 pointer-events-none whitespace-nowrap z-20">
          <div className="flex flex-col items-center">
              <span className={cn("text-sm font-bold tracking-widest uppercase font-orbitron", categoryColorMap[category].split(" ")[0])}>
                  {name}
              </span>
              <span className="text-[10px] text-white/50 tracking-wider font-rajdhani uppercase">
                  [{level}]
              </span>
          </div>
      </div>
    </motion.div>
  );
};
