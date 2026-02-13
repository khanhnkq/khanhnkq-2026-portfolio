"use client";

import React, { useState } from "react";
import { GlitchText } from "@/components/ui/glitch-text";
import { QuestItem } from "@/components/ui/quest-item";
import { QuestDetail } from "@/components/ui/quest-detail";

interface Project {
  id: number;
  title: string;
  type: string;
  difficulty: string;
  status: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  github?: string;
  github_be?: string;
  completed: boolean;
}

// Enhanced Mock Data for RPG theme
const projects: Project[] = [
  {
    id: 0,
    title: "Connect",
    type: "SOCIAL_NET",
    difficulty: "S-RANK",
    status: "LIVE",
    description: "A comprehensive social platform designed for the CodeGym community. Features real-time interactions, networking, and content sharing.",
    tags: ["React 19", "Spring Boot", "Microservices", "Kafka", "WebSocket", "Firebase", "Flyway", "MySQL"],
    image: "/connect-preview.png",
    link: "https://connect-cg.vercel.app",
    github: "https://github.com/khanhnkq/connectCG",
    github_be: "https://github.com/HoangLeoO/connectCG_BE",
    completed: true
  },
  {
    id: 1,
    title: "E-Gov Portal",
    type: "GOV_PORTAL",
    difficulty: "B-RANK",
    status: "STABLE",
    description: "A modern public service portal designed for Đà Nẵng City. Streamlines administrative procedures, allows online document submission, and provides real-time status tracking.",
    tags: ["Java 17", "Spring Boot", "Thymeleaf", "MySQL", "WebSocket", "MapStruct", "VNPay"],
    image: "/egov-preview.png",
    link: "https://egov-cg.duckdns.org/",
    github: "https://github.com/HoangLeoO/project_module4_dvc",
    completed: true
  }
];

export const Projects = () => {
  const [selectedId, setSelectedId] = useState<number>(0);
  const selectedProject: Project = projects.find(p => p.id === selectedId) || projects[0];

  return (
    <section className="h-screen relative flex flex-col pt-24 pb-4 overflow-hidden font-rajdhani">
      
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.05)_0%,transparent_50%)]" />
      </div>

      <div className="container mx-auto px-4 pl-40 lg:pl-64 relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="shrink-0 mb-8 flex items-end gap-4 border-b border-white/10 pb-4 justify-between">
           {/* Left: Meta Data */}
           <div className="hidden md:block text-left font-mono text-xs text-gray-500">
              <p>TOTAL_ENTRIES: {projects.length}</p>
              <p>SERVER_TIME: {new Date().getFullYear()}.{new Date().getMonth() + 1}.{new Date().getDate()}</p>
           </div>

           {/* Right: Title */}
           <div className="flex-1 text-right flex flex-col items-end">
              <div className="flex items-center gap-2 mb-2">
                   <GlitchText text="QUEST_LOG // ACTIVE_MISSIONS" className="text-cyan-500 tracking-[0.2em] text-xs font-orbitron" />
                   <div className="h-1 w-1 bg-cyan-500 rounded-full"></div>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                  Available <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">Quests</span>
              </h2>
           </div>
        </div>

        {/* Master-Detail Grid */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: Quest Detail (Now on Left) - Spans 8 */}
          <div className="lg:col-span-8 relative h-full order-2 lg:order-1">
             <QuestDetail 
               project={{
                 title: selectedProject.title,
                 description: selectedProject.description,
                 image: selectedProject.image,
                 tech: selectedProject.tags,
                 link: selectedProject.link,
                 github: selectedProject.github,
                 github_be: selectedProject.github_be,
                 type: selectedProject.type,
                 status: selectedProject.status
               }} 
             />
             
             {/* Decorative Background for Detail */}
             <div className="absolute -z-10 -right-20 -bottom-20 w-96 h-96 bg-violet-500/5 blur-[100px] rounded-full pointer-events-none" />
          </div>

          {/* RIGHT: Quest List (Now on Right) - Spans 4 */}
          <div className="lg:col-span-4 flex flex-col gap-2 overflow-y-auto pl-2 custom-scrollbar border-l border-white/5 order-1 lg:order-2">
             {projects.map((project, index) => (
                <QuestItem 
                  key={project.id}
                  index={index}
                  title={project.title}
                  difficulty={project.difficulty}
                  active={selectedId === project.id}
                  completed={project.completed}
                  onClick={() => setSelectedId(project.id)}
                />
             ))}
          </div>
          
        </div>
      </div>
    </section>
  );
};
