"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Cpu, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuestDetailProps {
  project: {
    title: string;
    description: string;
    image: string;
    tech: string[];
    link?: string;
    github?: string;
    type?: string;
    status?: string;
  };
}

export const QuestDetail = ({ project }: QuestDetailProps) => {
  const [key, setKey] = useState(0);
  const [commandLog, setCommandLog] = useState<string[]>([]);
  const [pid, setPid] = useState(0);
  const [diagnosticStats, setDiagnosticStats] = useState({
    linesOfCode: 0,
    deployDay: 0,
    performance: 0
  });

  // Reset typing effect on project change
  useEffect(() => {
    setCommandLog([]); // Reset logs
    setKey(prev => prev + 1);
    setPid(Math.floor(Math.random() * 9000) + 1000);
    setDiagnosticStats({
      linesOfCode: Math.floor(2000 + Math.random() * 3000),
      deployDay: Math.floor(10 + Math.random() * 20),
      performance: Math.floor(85 + Math.random() * 15)
    });
  }, [project]);

  const handleCommand = (cmd: string, url?: string) => {
     setCommandLog(prev => [...prev, `root@SHADOW:~$ ${cmd}`, `> EXEC_PROCESS: [${cmd.toUpperCase()}] STARTED...`]);
     
     if (url) {
       setTimeout(() => {
         window.open(url, "_blank");
         setCommandLog(prev => [...prev, `> PROCESS_COMPLETE: Redirecting to external connection...`]);
       }, 800);
     }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project.title}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative h-full flex flex-col bg-black/90 border-2 border-white/20 rounded-sm overflow-hidden font-mono shadow-[0_0_20px_rgba(0,0,0,0.8)]"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between bg-zinc-900 border-b border-white/10 px-4 py-2 text-[10px] text-gray-500 uppercase tracking-widest select-none">
           <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                 <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
                 <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                 <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
              </div>
              <span className="ml-2 text-white/40">root@SHADOW_MONARCH:~</span>
           </div>
           <div className="flex items-center gap-4">
               <span>PID: {pid}</span>
               <span>{project.type || "PROCESS"}</span>
           </div>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar flex flex-col gap-6">
           
           {/* Command Input Simulation */}
           <div className="text-sm text-cyan-400 font-bold mb-4">
              <span className="text-green-500">root@SHADOW_MONARCH:~$</span> 
              <span className="text-white ml-2">execute_protocol --target &quot;{project.title}&quot; --verbose</span>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               
               {/* Left: Visual Output */}
               <div className="space-y-2">
                  <div className="text-[10px] text-gray-500 mb-1">
                     [RENDER_PREVIEW] :: {project.status || "ACTIVE"}
                  </div>
                  <div className="relative aspect-video w-full border border-white/20 bg-black overflow-hidden group">
                     {/* Corner Brackets */}
                     <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-500"></div>
                     <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-500"></div>
                     <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyan-500"></div>
                     <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-500"></div>
                     
                     {/* Image */}
                     <img 
                       src={project.image} 
                       alt="render_output" 
                       className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity filter sepia-[50%] hue-rotate-180 group-hover:filter-none"
                     />
                     
                     {/* Scanline Overlay */}
                     <div className="absolute inset-0 bg-scanline opacity-20 pointer-events-none"></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-600 font-mono">
                     <span>RES: 1920x1080</span>
                     <span>FPS: 60.0</span>
                  </div>
                  
                  {/* Diagnostics Section */}
                  <div className="mt-4 pt-4 border-t border-white/10 space-y-1">
                     <div className="text-[10px] text-violet-400 mb-2 uppercase tracking-wider">[DIAGNOSTICS]</div>
                     <div className="space-y-1 text-[10px] text-gray-500 font-mono">
                        <div className="flex justify-between">
                           <span className="text-gray-600">&gt; BUILD_STATUS:</span>
                           <span className="text-green-500">STABLE</span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-gray-600">&gt; LINES_OF_CODE:</span>
                           <span className="text-cyan-400">~{diagnosticStats.linesOfCode}</span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-gray-600">&gt; LAST_DEPLOY:</span>
                           <span className="text-gray-400">2026.01.{diagnosticStats.deployDay}</span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-gray-600">&gt; PERFORMANCE:</span>
                           <span className="text-yellow-500">{diagnosticStats.performance}/100</span>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Right: System Logs */}
               <div className="font-mono text-xs leading-relaxed space-y-4">
                  <div>
                    <div className="text-yellow-500 mb-1 flex items-center gap-2">
                      <AlertTriangle size={12} />
                      <span className="uppercase tracking-wider">System_Log_Entry:</span>
                    </div>
                    <div className="text-gray-300 border-l border-white/20 pl-3">
                       <TypewriterText text={project.description} resetKey={key} />
                    </div>
                  </div>

                  <div>
                    <div className="text-violet-400 mb-2 flex items-center gap-2">
                      <Cpu size={12} />
                      <span className="uppercase tracking-wider">Dependencies_Loaded:</span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                       {project.tech.map((t) => (
                          <div key={t} className="flex items-center gap-2 text-gray-400">
                             <span className="text-green-500">[OK]</span> {t}
                          </div>
                       ))}
                    </div>
                  </div>
                  
                  {/* Dynamic Command Log */}
                  {commandLog.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/10 space-y-1">
                        {commandLog.map((log, i) => (
                           <div key={i} className={cn("text-[10px]", log.startsWith("root") ? "text-green-500" : "text-cyan-400/80")}>
                              {log}
                           </div>
                        ))}
                    </div>
                  )}
               </div>
           </div>

           {/* Command Footer Actions */}
           <div className="mt-auto border-t border-white/10 pt-4">
              <div className="text-[10px] text-gray-500 mb-3">AVAILABLE_COMMANDS:</div>
              <div className="flex gap-4">
                {project.link && (
                  <button 
                    onClick={() => handleCommand(`launch_demo --url "${project.link}"`, project.link)}
                    className="group flex items-center gap-2 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/30 px-3 py-1.5 transition-colors border border-transparent hover:border-cyan-500/50"
                  >
                     <span className="text-green-500 font-bold">{">"}</span> 
                     <span className="uppercase tracking-wider font-bold">EXECUTE_DEMO</span>
                     <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                )}
                {project.github && (
                  <button 
                    onClick={() => handleCommand(`git_clone --repo "${project.github}"`, project.github)}
                    className="group flex items-center gap-2 text-gray-400 hover:text-white hover:bg-white/10 px-3 py-1.5 transition-colors border border-transparent hover:border-white/20"
                  >
                     <span className="text-gray-600 font-bold">{">"}</span>
                     <span className="uppercase tracking-wider font-bold">VIEW_SOURCE</span>
                     <Github size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                )}
              </div>
           </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// Simple Typewriter Effect Component
const TypewriterText = ({ text, resetKey }: { text: string, resetKey: number }) => {
  const [displayedText, setDisplayedText] = useState("");
  
  useEffect(() => {
    setDisplayedText(""); 
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 10); // Typing speed
    
    return () => clearInterval(interval);
  }, [text, resetKey]);

  return <span>{displayedText}<span className="animate-pulse">_</span></span>;
};
