"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ParallaxSectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const ParallaxSection = ({ children, className, id, ...props }: ParallaxSectionProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const [offsetTop, setOffsetTop] = useState(0);

  useEffect(() => {
    const updateOffset = () => {
      if (containerRef.current) {
        setOffsetTop(containerRef.current.offsetTop);
      }
    };
    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, []);
  
  const { scrollY } = useScroll();

  // Cinematic scroll animation range
  const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 1000;
  const start = offsetTop;
  const end = offsetTop + viewportHeight * 0.7; // Fade over 70% viewport

  // Raw transforms
  const rawScale = useTransform(scrollY, [start, end], [1, 0.85]);
  const rawOpacity = useTransform(scrollY, [start, end], [1, 0]);
  const rawY = useTransform(scrollY, [start, end], [0, -80]);
  const rawRotateX = useTransform(scrollY, [start, end], [0, 8]); // 3D tilt
  const rawBlur = useTransform(scrollY, [start, end], [0, 12]);
  
  // Smooth spring physics for premium feel
  const springConfig = { stiffness: 100, damping: 30, mass: 0.5 };
  const scale = useSpring(rawScale, springConfig);
  const opacity = useSpring(rawOpacity, springConfig);
  const y = useSpring(rawY, springConfig);
  const rotateX = useSpring(rawRotateX, springConfig);
  const blur = useSpring(rawBlur, springConfig);

  return (
    <section 
      ref={containerRef} 
      id={id}
      className={cn("sticky top-0 h-screen overflow-hidden", className)}
      style={{ perspective: "1200px" }}
      {...props}
    >
      <motion.div 
        style={{ 
          scale, 
          opacity,
          y,
          rotateX,
          filter: blur.get() > 0 ? `blur(${blur.get()}px)` : undefined,
          transformOrigin: "center top",
        }}
        className="w-full h-full relative will-change-transform"
      >
        {children}
      </motion.div>
    </section>
  );
};

