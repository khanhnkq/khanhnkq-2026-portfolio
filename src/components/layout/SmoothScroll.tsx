"use client";
import { useEffect } from 'react';
import Lenis from 'lenis';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,           // Lower = smoother (0.1 default, 0.05-0.1 recommended)
      duration: 1.2,        // Animation duration for scrollTo
      smoothWheel: true,
      wheelMultiplier: 0.8, // Slightly slower wheel for cinematic feel
      touchMultiplier: 1.5, // More responsive touch
      infinite: false,
    });
    
    // Expose lenis to window for global access (navigation)
    // @ts-expect-error - extending window
    window.lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      // @ts-expect-error - cleaning up window
      window.lenis = undefined;
    };
  }, []);

  return <>{children}</>;
}
