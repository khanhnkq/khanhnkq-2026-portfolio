"use client";

import createGlobe from "cobe";
import { useCallback, useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

interface GlobeProps {
  className?: string;
  config?: any;
}

export function Globe({ className, config }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);
  const r = useRef(0);

  const updatePointerInteraction = (value: any) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: any) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      r.current = delta / 200;
    }
  };

  const onRender = useCallback(
    (state: any) => {
      if (!pointerInteracting.current) {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        r.current -= 0.005;
      }
      state.phi = 0 + r.current;
      state.width = 2 * (canvasRef.current?.offsetWidth || 0); // width * 2 for retina displays
      state.height = 2 * (canvasRef.current?.offsetHeight || 0); // width * 2 for retina displays
    },
    [],
  );

  useEffect(() => {
    let phi = 0;
    let width = 0;
    const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth);
    window.addEventListener("resize", onResize);
    onResize();

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 1,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1, // 1 for dark mode, 0 for light
      diffuse: 1.2,
      mapSamples: 8000,
      mapBrightness: 6,
      baseColor: [0.05, 0.05, 0.08],
      markerColor: [0.2, 0.9, 0.9],
      glowColor: [0.1, 0.9, 0.9],
      markers: [
        // longitude latitude
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.03 },
        { location: [21.0285, 105.8542], size: 0.1 }, // Hanoi, Vietnam marker
      ],
      onRender: onRender,
      ...config,
    });

    setTimeout(() => (canvasRef.current!.style.opacity = "1"));
    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [config, onRender]);

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[1000px]",
        className,
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]",
        )}
        ref={canvasRef}
        onPointerDown={(e) =>
          updatePointerInteraction(
            e.clientX - pointerInteractionMovement.current,
          )
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
}
