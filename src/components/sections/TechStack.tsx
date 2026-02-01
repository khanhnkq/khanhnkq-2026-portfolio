"use client";

import React from "react";
import { RuneStone } from "@/components/ui/rune-stone";
import { GlitchText } from "@/components/ui/glitch-text";
import { 
  SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, SiNodedotjs, 
  SiPostgresql, SiSupabase, SiFigma, SiDocker, 
  SiFramer, SiThreedotjs, SiGit, SiMysql, SiSpringboot, SiLinux
} from "react-icons/si";

const skills = [
  // Frontend (Cyan)
  { name: "Next.js", icon: SiNextdotjs, level: "Master", category: "frontend" },
  { name: "React", icon: SiReact, level: "Master", category: "frontend" },
  { name: "TypeScript", icon: SiTypescript, level: "Expert", category: "frontend" },
  { name: "Tailwind", icon: SiTailwindcss, level: "Master", category: "frontend" },
  { name: "Framer", icon: SiFramer, level: "Expert", category: "frontend" },
  { name: "Three.js", icon: SiThreedotjs, level: "Advanced", category: "frontend" },

  // Backend (Violet)
  { name: "Node.js", icon: SiNodedotjs, level: "Advanced", category: "backend" },
  { name: "Java", icon: SiSpringboot, level: "Advanced", category: "backend" },
  { name: "Spring Boot", icon: SiSpringboot, level: "Advanced", category: "backend" }, 
  { name: "Postgres", icon: SiPostgresql, level: "Advanced", category: "backend" },
  { name: "MySQL", icon: SiMysql, level: "Advanced", category: "backend" },
  { name: "Supabase", icon: SiSupabase, level: "Expert", category: "backend" },

  // Tools (Yellow/Emerald)
  { name: "Linux", icon: SiLinux, level: "Advanced", category: "tool" },
  { name: "Docker", icon: SiDocker, level: "Intermediate", category: "tool" },
  { name: "Git", icon: SiGit, level: "Expert", category: "tool" },
  { name: "Figma", icon: SiFigma, level: "Expert", category: "tool" },
] as const;

export const TechStack = () => {
  return (
    <section className="min-h-screen relative flex flex-col items-center md:items-end justify-center pt-32 pb-20 overflow-hidden font-rajdhani md:pr-10 lg:pr-24">
       {/* Background Aesthetics */}
       <div className="absolute inset-0 z-0 pointer-events-none">
           {/* Nebula Effect - Adjusted to avoid white haze */}
           <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-600/20 blur-[150px] rounded-full mix-blend-overlay opacity-50" />
           <div className="absolute top-1/3 left-1/2 w-[600px] h-[600px] bg-cyan-600/10 blur-[120px] rounded-full mix-blend-overlay opacity-50" />
       </div>

       {/* Header */}
       <div className="relative z-10 mb-20 text-center md:text-right w-full max-w-5xl">
            <div className="flex items-center justify-center md:justify-end gap-4 mb-4">
                 <div className="hidden md:block h-[1px] w-24 bg-gradient-to-l from-cyan-500 to-transparent"></div>
                 <GlitchText text="SYSTEM_MODULES" className="text-cyan-400 tracking-[0.3em] text-sm font-orbitron" />
                 <div className="h-[1px] w-12 bg-gradient-to-r from-cyan-500 to-transparent"></div>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white/90 tracking-tighter uppercase mb-4 drop-shadow-2xl">
                Skill <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-cyan-500">Matrix</span>
            </h2>
            <p className="text-white/40 max-w-lg mx-auto md:mx-0 md:ml-auto leading-relaxed tracking-wide text-sm font-mono">
                /// ACTIVE_ARSENAL: DETECTING 14 MASTERED TECHNOLOGIES
            </p>
       </div>

       {/* Grid Container */}
       <div className="relative z-10 w-full md:w-[75%] lg:w-[65%] px-6 md:px-0">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-x-8 md:gap-y-12 justify-items-center perspective-1000">
                {skills.map((skill, index) => (
                    <RuneStone 
                       key={skill.name}
                       name={skill.name}
                       icon={skill.icon}
                       level={skill.level}
                       category={skill.category}
                       delay={index * 0.1}
                    />
                ))}
            </div>
       </div>
    </section>
  );
};
