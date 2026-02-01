"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, X, ExternalLink, Calendar, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlitchText } from "@/components/ui/glitch-text";

// Mock certificates - Replace with real data later
const certificates = [
  {
    id: 1,
    title: "AWS Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2024",
    image: "/certificates/aws-sa.png",
    credlyUrl: "#",
    description: "Professional certification for designing distributed systems on AWS",
  },
  {
    id: 2,
    title: "Oracle Certified Java SE 17",
    issuer: "Oracle",
    date: "2024",
    image: "/certificates/oracle-java.png",
    credlyUrl: "#",
    description: "Professional Java developer certification",
  },
  {
    id: 3,
    title: "Spring Professional",
    issuer: "VMware",
    date: "2023",
    image: "/certificates/spring-pro.png",
    credlyUrl: "#",
    description: "Spring Framework expertise certification",
  },
  {
    id: 4,
    title: "Docker Certified Associate",
    issuer: "Docker Inc.",
    date: "2023",
    image: "/certificates/docker-dca.png",
    credlyUrl: "#",
    description: "Container orchestration and deployment",
  },
  {
    id: 5,
    title: "Kubernetes Administrator",
    issuer: "CNCF",
    date: "2023",
    image: "/certificates/cka.png",
    credlyUrl: "#",
    description: "Certified Kubernetes Administrator",
  },
  {
    id: 6,
    title: "Linux Professional LPIC-1",
    issuer: "LPI",
    date: "2022",
    image: "/certificates/lpic-1.png",
    credlyUrl: "#",
    description: "Linux system administration",
  },
  {
    id: 7,
    title: "PostgreSQL Associate",
    issuer: "EDB",
    date: "2023",
    image: "/certificates/postgres.png",
    credlyUrl: "#",
    description: "Database administration and optimization",
  },
  {
    id: 8,
    title: "Meta Frontend Developer",
    issuer: "Meta",
    date: "2023",
    image: "/certificates/meta-frontend.png",
    credlyUrl: "#",
    description: "React and frontend development mastery",
  },
  {
    id: 9,
    title: "Google Cloud Associate",
    issuer: "Google",
    date: "2024",
    image: "/certificates/gcp-ace.png",
    credlyUrl: "#",
    description: "Cloud engineering on Google Cloud Platform",
  },
  {
    id: 10,
    title: "CompTIA Security+",
    issuer: "CompTIA",
    date: "2022",
    image: "/certificates/security-plus.png",
    credlyUrl: "#",
    description: "Cybersecurity fundamentals certification",
  },
];

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image: string;
  credlyUrl: string;
  description: string;
}

export const Achievements = () => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center py-20 px-4 md:px-12 lg:px-24 relative">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
      
      <div className="w-full max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="mb-12 text-right">
          <div className="flex items-center gap-2 justify-end mb-2">
            <GlitchText text="TROPHY_HALL // UNLOCKED_ACHIEVEMENTS" className="text-violet-500 tracking-[0.2em] text-xs font-orbitron" />
            <div className="h-1 w-1 bg-violet-500 rounded-full"></div>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase drop-shadow-[0_0_10px_rgba(168,85,247,0.3)]">
            Certifi<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-500">cations</span>
          </h2>
        </div>

        {/* Stats Bar */}
        <div className="mb-8 flex flex-wrap gap-4 justify-center md:justify-end">
          <div className="flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/30 text-violet-400 text-sm font-mono">
            <Award size={16} />
            <span>{certificates.length} UNLOCKED</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-mono">
            <Calendar size={16} />
            <span>2022-2024</span>
          </div>
        </div>

        {/* Certificate Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => setSelectedCert(cert)}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] bg-black/60 border border-white/10 overflow-hidden transition-all duration-300 hover:border-violet-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                {/* Corner Brackets */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-violet-500/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-violet-500/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-violet-500/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-violet-500/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                {/* Placeholder Image */}
                <div className="w-full h-full bg-gradient-to-br from-zinc-900 to-zinc-800 flex items-center justify-center">
                  <Award className="w-12 h-12 text-violet-500/30 group-hover:text-violet-400/50 transition-colors" />
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                  <p className="text-[10px] text-violet-400 font-mono uppercase tracking-wider">{cert.issuer}</p>
                  <p className="text-xs text-white font-bold truncate">{cert.title}</p>
                </div>

                {/* Year Badge */}
                <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/80 border border-white/10 text-[10px] text-gray-400 font-mono">
                  {cert.date}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-600 font-mono">
            CLICK TO VIEW DETAILS • VERIFIED ON CREDLY
          </p>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-zinc-900 border-2 border-violet-500/30 overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between bg-black border-b border-white/10 px-4 py-3">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-violet-400" />
                  <span className="text-sm text-white font-mono">{selectedCert.title}</span>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                {/* Certificate Image Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 flex items-center justify-center mb-6">
                  <div className="text-center">
                    <Award className="w-16 h-16 text-violet-500/30 mx-auto mb-2" />
                    <p className="text-xs text-gray-500 font-mono">CERTIFICATE_IMAGE</p>
                    <p className="text-[10px] text-gray-600">Replace with: {selectedCert.image}</p>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-4 font-mono">
                  <div className="flex items-center gap-3 text-sm">
                    <Building2 size={14} className="text-violet-400" />
                    <span className="text-gray-400">ISSUER:</span>
                    <span className="text-white">{selectedCert.issuer}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar size={14} className="text-violet-400" />
                    <span className="text-gray-400">OBTAINED:</span>
                    <span className="text-white">{selectedCert.date}</span>
                  </div>
                  <p className="text-sm text-gray-400 border-l-2 border-violet-500/30 pl-4">
                    {selectedCert.description}
                  </p>
                </div>

                {/* Action Button */}
                <div className="mt-6">
                  <a
                    href={selectedCert.credlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/20 border border-violet-500/50 text-violet-400 hover:bg-violet-500/30 transition-colors text-sm"
                  >
                    <ExternalLink size={14} />
                    VERIFY ON CREDLY
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
