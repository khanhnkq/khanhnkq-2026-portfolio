"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: any; // Component type: h1, h2, p, span, etc.
}

export const GlitchText = ({ text, className, as: Component = "span" }: GlitchTextProps) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const triggerGlitch = () => {
      // Random duration for the glitching state (150ms to 400ms)
      const glitchDuration = Math.random() * 250 + 150;
      setIsGlitching(true);
      
      setTimeout(() => {
        setIsGlitching(false);
        // Schedule next glitch: wait between 3s and 8s
        const nextDelay = Math.random() * 5000 + 3000;
        timeoutId = setTimeout(triggerGlitch, nextDelay);
      }, glitchDuration);
    };

    // Initial delay
    let timeoutId = setTimeout(triggerGlitch, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <Component className={cn("relative inline-block", className)}>
      <span className="relative z-10">{text}</span>
      {isGlitching && (
        <>
          <span 
            className="absolute top-0 left-0 -translate-x-[2px] opacity-100 text-red-500 pointer-events-none z-0 mix-blend-screen animate-pulse"
            aria-hidden="true"
          >
            {text}
          </span>
          <span 
            className="absolute top-0 left-0 translate-x-[2px] opacity-100 text-cyan-500 pointer-events-none z-0 mix-blend-screen animate-pulse"
            aria-hidden="true"
          >
            {text}
          </span>
        </>
      )}
    </Component>
  );
};
