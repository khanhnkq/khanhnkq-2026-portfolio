"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MessageCircle, Send, Terminal, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlitchText } from "@/components/ui/glitch-text";

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/khanhnkq", color: "hover:text-white" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/khanhnkq", color: "hover:text-blue-400" },
  { icon: Mail, label: "Email", href: "mailto:contact@khanhnkq.dev", color: "hover:text-cyan-400" },
  { icon: MessageCircle, label: "Discord", href: "#", color: "hover:text-violet-400" },
];

export const Contact = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate sending
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setEmail("");
      setMessage("");
      
      // Reset after 3s
      setTimeout(() => setSubmitted(false), 3000);
    }, 1500);
  };

  const handleClear = () => {
    setEmail("");
    setMessage("");
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center py-20 px-4 md:px-12 lg:px-24 relative">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
      
      <div className="w-full max-w-4xl relative z-10">
        {/* Section Header */}
        <div className="mb-8 text-right">
          <div className="flex items-center gap-2 justify-end mb-2">
            <GlitchText text="GUILD_HALL // TRANSMISSION_TERMINAL" className="text-cyan-500 tracking-[0.2em] text-xs font-orbitron" />
            <div className="h-1 w-1 bg-cyan-500 rounded-full"></div>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]">
            Establish <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">Link</span>
          </h2>
        </div>

        {/* Terminal Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-black/80 border-2 border-white/20 rounded-sm overflow-hidden font-mono shadow-[0_0_30px_rgba(0,0,0,0.8)]"
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between bg-zinc-900 border-b border-white/10 px-4 py-2 text-[10px] text-gray-500 uppercase tracking-widest select-none">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
              </div>
              <Terminal size={12} className="ml-2 text-cyan-500/50" />
              <span className="text-white/40">transmission_terminal.exe</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-green-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
                ONLINE
              </span>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 md:p-8">
            {/* Command Header */}
            <div className="text-sm text-cyan-400 font-bold mb-6">
              <span className="text-green-500">root@GUILD_HALL:~$</span> 
              <span className="text-white ml-2">establish_link --recipient &quot;SHADOW_MONARCH&quot;</span>
            </div>

            {/* Status */}
            <div className="mb-6 text-xs text-gray-500 border-l-2 border-cyan-500/30 pl-4">
              <p>&gt; RECIPIENT: <span className="text-cyan-400">SHADOW_MONARCH</span></p>
              <p>&gt; CHANNEL: <span className="text-green-400">SECURE_TRANSMISSION</span></p>
              <p>&gt; ENCRYPTION: <span className="text-violet-400">AES-256-GCM</span></p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-[10px] text-gray-500 uppercase tracking-widest">
                  SENDER_ID:
                </label>
                <div className={cn(
                  "relative border transition-all duration-300",
                  isFocused === "email" 
                    ? "border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]" 
                    : "border-white/20 hover:border-white/40"
                )}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setIsFocused("email")}
                    onBlur={() => setIsFocused(null)}
                    placeholder="your.id@domain.com"
                    className="w-full bg-transparent px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none"
                    required
                  />
                  {/* Corner Brackets */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500/50"></div>
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500/50"></div>
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-500/50"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500/50"></div>
                </div>
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <label className="block text-[10px] text-gray-500 uppercase tracking-widest">
                  TRANSMISSION_CONTENT:
                </label>
                <div className={cn(
                  "relative border transition-all duration-300",
                  isFocused === "message" 
                    ? "border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]" 
                    : "border-white/20 hover:border-white/40"
                )}>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onFocus={() => setIsFocused("message")}
                    onBlur={() => setIsFocused(null)}
                    placeholder="Enter your transmission here..."
                    rows={5}
                    className="w-full bg-transparent px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none resize-none custom-scrollbar"
                    required
                  />
                  {/* Corner Brackets */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500/50"></div>
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500/50"></div>
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-500/50"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500/50"></div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || submitted}
                  className={cn(
                    "flex-1 group flex items-center justify-center gap-2 px-6 py-3 font-bold uppercase tracking-wider transition-all duration-300 border",
                    submitted 
                      ? "bg-green-500/20 border-green-500 text-green-400"
                      : "bg-cyan-500/10 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                      <span>TRANSMITTING...</span>
                    </>
                  ) : submitted ? (
                    <>
                      <span className="text-green-500">✓</span>
                      <span>TRANSMISSION_SENT</span>
                    </>
                  ) : (
                    <>
                      <span className="text-green-500 font-bold">&gt;</span>
                      <span>SEND_TRANSMISSION</span>
                      <Send size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={handleClear}
                  className="flex items-center gap-2 px-4 py-3 text-gray-500 hover:text-red-400 border border-white/10 hover:border-red-500/50 transition-all duration-300"
                >
                  <Trash2 size={14} />
                  <span className="hidden md:inline uppercase tracking-wider text-xs">CLEAR</span>
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="my-8 border-t border-white/10"></div>

            {/* Social Links */}
            <div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-4">
                DIRECT_CHANNELS:
              </div>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "group flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-gray-400 transition-all duration-300",
                      link.color,
                      "hover:border-current hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                    )}
                  >
                    <link.icon size={16} />
                    <span className="text-xs uppercase tracking-wider">{link.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer Status */}
        <div className="mt-6 flex justify-between text-[10px] text-gray-600 font-mono">
          <span>COORD: 10.78.14.23</span>
          <span>SIGNAL: STABLE ■■■■□</span>
        </div>
      </div>
    </section>
  );
};
