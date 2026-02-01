"use client";

import { useEffect, useState } from "react";
import { Tree, Folder, File as TreeFile } from "@/components/ui/file-tree";
import { cn } from "@/lib/utils";

const menuItems = [
  { id: "hero", label: "STATUS" }, // Mapping to Status as it's the main character info
  { id: "tech-stack", label: "SKILLS" },
  { id: "projects", label: "QUESTS" },
  { id: "contact", label: "GUILD" },
];

export const GameHUD = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [expandedFolders, setExpandedFolders] = useState(["root", "src", "sections"]);

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = "hero";
      menuItems.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) {
            currentSection = item.id;
          }
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-expand folders based on active section
  useEffect(() => {
    const sectionToFolders: Record<string, string[]> = {
      "hero": ["root", "src", "sections"],
      "tech-stack": ["root", "src", "sections"],
      "projects": ["root", "src", "sections"],
      "contact": ["root", "src", "sections"],
    };
    
    if (sectionToFolders[activeSection]) {
      setExpandedFolders(sectionToFolders[activeSection]);
    }
  }, [activeSection]);

  const scrollToSection = (id: string) => {
    // Special handling for Hero section to ensure it goes to the very top
    if (id === "hero") {
      // @ts-expect-error - lenis is added to window
      if (window.lenis) {
        // @ts-expect-error - lenis is added to window
        window.lenis.scrollTo(0);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    // Calculate position based on section index (sticky elements report same offsetTop)
    const sectionIndex = menuItems.findIndex(item => item.id === id);
    if (sectionIndex === -1) return;
    
    // Each section is 100vh, so target = index × viewport height
    const targetPosition = sectionIndex * window.innerHeight;
    
    // @ts-expect-error - lenis is added to window
    if (window.lenis) {
      // @ts-expect-error - lenis is added to window  
      window.lenis.scrollTo(targetPosition);
    } else {
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-none font-rajdhani">
      {/* 2. DIGITAL SCREEN OVERLAY (MONITOR HUD) */}
      <div className="fixed inset-0 z-40 pointer-events-none flex flex-col justify-between overflow-hidden">
            {/* Screen Effects Layer */}
            <div className="absolute inset-0 pointer-events-none">
                 {/* Scanlines - subtle */}
                 <div className="absolute inset-0 bg-scanline opacity-[0.03] pointer-events-none"></div>
                 {/* Vignette - subtle corners only */}
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]"></div>
            </div>

            {/* Hardware Corners (Minimal Tech) */}
            <div className="absolute top-4 left-4 w-24 h-24 border-t border-l border-cyan-500/30 rounded-tl-3xl opacity-50"></div>
            <div className="absolute top-4 right-4 w-24 h-24 border-t border-r border-cyan-500/30 rounded-tr-3xl opacity-50"></div>
            <div className="absolute bottom-4 left-4 w-24 h-24 border-b border-l border-cyan-500/30 rounded-bl-3xl opacity-50"></div>
            <div className="absolute bottom-4 right-4 w-24 h-24 border-b border-r border-cyan-500/30 rounded-br-3xl opacity-50"></div>
            
            {/* Decorative Tech Lines */}
            <div className="absolute top-8 left-8 w-2 h-2 bg-cyan-500/50"></div>
            <div className="absolute top-8 right-8 w-2 h-2 bg-cyan-500/50"></div>
            <div className="absolute bottom-8 left-8 w-2 h-2 bg-cyan-500/50"></div>
            <div className="absolute bottom-8 right-8 w-2 h-2 bg-cyan-500/50"></div>

            {/* Top Status Bar */}
            <div className="absolute top-8 left-12 right-12 flex justify-between items-start">
                  <div className="flex gap-6 items-center">
                      <div className="flex items-center gap-3 text-red-500 font-bold tracking-widest text-xs animate-pulse font-orbitron">
                          <span className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.8)]"></span>
                          REC
                      </div>
                      <div className="h-4 w-[1px] bg-white/10"></div>
                      <div className="text-[10px] text-cyan-500/50 tracking-[0.2em] font-orbitron">CAM_01: HERO_VIEW</div>
                  </div>
                  <div className="text-[10px] text-violet-400/60 font-orbitron tracking-widest flex items-center gap-3">
                      <span className="w-1.5 h-4 bg-violet-500/50"></span>
                      SYS.OS: SHADOW_MONARCH_V9
                  </div>
            </div>

            {/* Bottom Status Bar */}
            <div className="absolute bottom-8 left-12 right-12 flex justify-between items-end">
                  <div className="text-[10px] text-cyan-500/30 tracking-widest uppercase font-orbitron flex items-center gap-2">
                      <span className="text-xl leading-none font-bold text-cyan-500/20">+</span>
                      COORD: 10.24.88.92
                  </div>
                  <div className="flex items-center gap-6">
                      <div className="flex gap-1 h-3 items-end">
                          {[1,2,3,4,5].map(i => (
                            <div key={i} className={`w-1 bg-cyan-500/40 ${i > 3 ? 'h-full bg-cyan-400/80 shadow-[0_0_10px_cyan]' : 'h-1/3'}`}></div>
                          ))}
                      </div>
                      <div className="text-[10px] text-cyan-500/40 tracking-[0.2em] font-orbitron">SIGNAL: STABLE</div>
                  </div>
            </div>
      </div>

      {/* 3. LEFT SIDEBAR NAVIGATION (FILE TREE STYLE - MINIMAL) */}
      <div className="absolute left-12 top-1/2 -translate-y-1/2 flex flex-col items-start pointer-events-auto min-w-[280px]">
        <Tree 
          selectedId={activeSection} 
          onSelect={scrollToSection}
          expandedItems={expandedFolders}
          onExpandChange={setExpandedFolders}
          className="w-full"
        >
          <Folder element="portfolio-2026" value="root">
            <Folder element="src" value="src">
              <Folder element="sections" value="sections">
                <TreeFile value="hero">
                  <span className={cn(activeSection === "hero" && "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]")}>
                    status.hero
                  </span>
                </TreeFile>
                <TreeFile value="tech-stack">
                  <span className={cn(activeSection === "tech-stack" && "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]")}>
                    skill-tree.tech
                  </span>
                </TreeFile>
                <TreeFile value="projects">
                  <span className={cn(activeSection === "projects" && "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]")}>
                    quests.projects
                  </span>
                </TreeFile>
                <TreeFile value="contact">
                  <span className={cn(activeSection === "contact" && "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]")}>
                    party.contact
                  </span>
                </TreeFile>
              </Folder>
              <Folder element="components" value="components">
                <TreeFile value="hud"><span className="text-gray-600">hud-v2.tsx</span></TreeFile>
              </Folder>
            </Folder>
            <Folder element="public" value="public">
              <TreeFile value="avatar"><span className="text-gray-600">monarch.vfx</span></TreeFile>
            </Folder>
          </Folder>
        </Tree>
      </div>
    </div>
  );
};
