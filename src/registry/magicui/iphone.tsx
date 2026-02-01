"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Battery, Wifi } from "lucide-react";

export interface IphoneProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const Iphone = React.forwardRef<HTMLDivElement, IphoneProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative z-0 aspect-[366/729] w-full max-w-[360px] rounded-[3rem] border-[8px] border-zinc-900 bg-zinc-950 shadow-2xl overflow-hidden",
          className
        )}
        {...props}
      >
        {/* Notch */}
        <div className="absolute left-1/2 top-4 h-7 w-32 -translate-x-1/2 rounded-full bg-black z-20"></div>

        {/* Status Bar - Left (Time) */}
        <div className="absolute top-5 left-10 z-20 flex items-center">
            <span className="text-white text-[12px] font-bold font-sans tracking-wide">9:41</span>
        </div>

        {/* Status Bar - Right (Icons) */}
        <div className="absolute top-5 right-10 z-20 flex items-center gap-1.5 text-white text-[12px]">
           <Wifi className="w-3.5 h-3.5" />
           <Battery className="w-4 h-4" />
        </div>

        {/* Screen Content */}
        <div className="relative h-full w-full bg-background overflow-hidden rounded-[2.5rem]">
           {children || (
             <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-500/20 to-cyan-500/20">
               <span className="text-white/20 font-orbitron tracking-widest text-xs">NO_SIGNAL</span>
             </div>
           )}
        </div>
        
        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 w-28 h-1 bg-white rounded-full opacity-80 backdrop-blur-sm"></div>

        {/* Button overlays (optional aesthetic) */}
        <div className="absolute -left-[10px] top-24 h-10 w-[2px] bg-zinc-800 rounded-l-md"></div>
        <div className="absolute -left-[10px] top-40 h-16 w-[2px] bg-zinc-800 rounded-l-md"></div>
        <div className="absolute -right-[10px] top-32 h-24 w-[2px] bg-zinc-800 rounded-r-md"></div>
      </div>
    );
  }
);
Iphone.displayName = "Iphone";
