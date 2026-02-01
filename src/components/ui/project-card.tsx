"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image: string;
  link?: string;
  github?: string;
}

export const ProjectCard = ({
  title,
  description,
  tags,
  image,
  link,
  github,
}: ProjectCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl bg-black/40 backdrop-blur-sm border border-white/10",
        "aspect-[4/3] w-[400px] max-w-full",
        "hover:border-cyan-500/50 hover:shadow-[0_0_30px_-10px_rgba(6,182,212,0.5)] transition-all duration-500"
      )}
    >
      {/* Image Section */}
      <div className="relative h-[60%] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-4 bg-black/40 backdrop-blur-[2px]">
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-full bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all"
            >
              <ExternalLink size={20} />
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-full bg-violet-500/10 border border-violet-500/50 text-violet-400 hover:bg-violet-500 hover:text-black transition-all"
            >
              <Github size={20} />
            </a>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-between flex-1 p-5">
        <div>
          <h3 className="text-xl font-bold text-white font-orbitron tracking-wide group-hover:text-cyan-400 transition-colors">
            {title}
          </h3>
          <p className="mt-2 text-sm text-gray-400 line-clamp-2 font-mono">
            {description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="px-2 py-1 text-[10px] uppercase tracking-wider text-cyan-500 bg-cyan-950/30 border border-cyan-900/50 rounded font-rajdhani font-semibold"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="px-2 py-1 text-[10px] text-gray-500 bg-gray-900/50 border border-gray-800 rounded font-rajdhani">
              +{tags.length - 3}
            </span>
          )}
        </div>
      </div>
      
      {/* Decorative Corners */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/0 group-hover:border-cyan-500/50 transition-all duration-500 rounded-tl-xl" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-violet-500/0 group-hover:border-violet-500/50 transition-all duration-500 rounded-br-xl" />
    </motion.div>
  );
};
