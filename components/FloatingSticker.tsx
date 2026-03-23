"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface FloatingStickerProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  amplitude?: number;
  duration?: number;
  rotation?: number;
}

export default function FloatingSticker({
  children,
  className = "",
  delay = 0,
  amplitude = 15,
  duration = 3,
  rotation = 5,
}: FloatingStickerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(ref.current, {
          y: `+=${amplitude}`,
          duration,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay,
        });
        gsap.to(ref.current, {
          rotation,
          duration: duration * 1.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: delay + 0.5,
        });
      });
    }, ref);

    return () => ctx.revert();
  }, [amplitude, delay, duration, rotation]);

  return (
    <div ref={ref} className={`absolute pointer-events-none ${className}`}>
      {children}
    </div>
  );
}
