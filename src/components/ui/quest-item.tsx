"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronRight, CheckCircle2, Circle } from "lucide-react";

interface QuestItemProps {
  title: string;
  active?: boolean;
  completed?: boolean;
  difficulty?: string;
  onClick?: () => void;
  index: number;
}

export const QuestItem = ({
  title,
  active,
  completed,
  difficulty = "B-RANK",
  onClick,
  index
}: QuestItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className={cn(
        "group relative flex items-center justify-end gap-4 w-full p-4 cursor-pointer transition-all duration-300 border-r-2",
        active 
          ? "bg-cyan-950/20 border-cyan-400" 
          : "bg-transparent border-white/10 hover:bg-white/5 hover:border-white/30"
      )}
    >
      {/* Content */}
      <div className="flex-1 flex flex-col items-end">
        <span className={cn(
          "font-orbitron tracking-wider text-lg transition-all duration-300 text-right",
          active 
            ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] -translate-x-2" 
            : "text-gray-400 group-hover:text-white"
        )}>
          {title}
        </span>
        
        {/* Sub-info */}
        <div className="flex items-center gap-2 text-[10px] font-mono text-gray-600 mt-1 justify-end">
           {active && (
             <span className="text-cyan-600 animate-pulse">Running...</span>
           )}
           <span className={cn(
             "px-1 border rounded",
             difficulty === "S-RANK" ? "border-amber-500/50 text-amber-500" :
             difficulty === "A-RANK" ? "border-violet-500/50 text-violet-500" :
             "border-gray-700 text-gray-500"
           )}>
             {difficulty}
           </span>
        </div>
      </div>

      {/* Status Icon */}
      <div className={cn(
        "transition-colors duration-300 order-last",
        active ? "text-cyan-400" : "text-gray-600 group-hover:text-gray-400"
      )}>
        {active ? (
          <ChevronRight className="animate-pulse rotate-180" />
        ) : completed ? (
          <CheckCircle2 size={18} />
        ) : (
          <Circle size={12} />
        )}
      </div>
      
      {/* Active Indicator Background */}
      {active && (
        <motion.div
          layoutId="activeQuest"
          className="absolute inset-0 bg-gradient-to-l from-cyan-500/10 to-transparent pointer-events-none"
        />
      )}
    </motion.div>
  );
};
