"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import HeroGrid from "./HeroGrid";
import SplitButton from "./SplitButton";
import FloatingSticker from "./FloatingSticker";
import TechCoin from "./TechCoin";
import Image from "next/image";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
      )
        .fromTo(
          subtitleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          ctaRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.4"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
      data-theme-bg="#F8F9FA"
      data-theme-bg-dark="#0F172A"
    >
      {/* Interactive grid background */}
      <HeroGrid />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-[1200px]">
        <h1
          ref={headingRef}
          className="text-[var(--heading)] leading-[0.9] tracking-tight"
          style={{
            fontSize: "clamp(3rem, 12vw, 11rem)",
            fontFamily: "var(--font-display), sans-serif",
          }}
        >
          BUILDING
          <br />
          <span className="text-[var(--foreground)]">THINGS THAT</span>
          <br />
          MATTER
        </h1>

        <p
          ref={subtitleRef}
          className="mt-6 md:mt-8 text-[var(--foreground)] opacity-80 tracking-wider"
          style={{
            fontFamily: "var(--font-body), serif",
            fontSize: "clamp(0.9rem, 2vw, 1.25rem)",
          }}
        >
          Full Stack Developer — Gandhinagar, India
        </p>

        <div ref={ctaRef} className="mt-8 md:mt-12">
          <SplitButton
            frontLabel="Explore My Work"
            backLabel="See Projects"
            href="#projects"
            icon={
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14" />
                <path d="M19 12l-7 7-7-7" />
              </svg>
            }
          />
        </div>
      </div>

      {/* Floating stickers — colorful pixel-art like MoMoney's coin stickers */}
      <FloatingSticker
        className="top-[12%] right-[6%] md:right-[12%]"
        delay={0}
        amplitude={12}
        rotation={8}
      >
        {/* Pink/magenta pixel-art code bracket sticker */}
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          fill="none"
          className="w-16 h-16 md:w-24 md:h-24"
          shapeRendering="crispEdges"
        >
          {/* Background circle shape in pink */}
          <rect x="30" y="0" width="40" height="10" fill="#F580DB" />
          <rect x="20" y="10" width="60" height="10" fill="#F580DB" />
          <rect x="10" y="20" width="80" height="10" fill="#F580DB" />
          <rect x="10" y="30" width="80" height="10" fill="#EC407A" />
          <rect x="0" y="40" width="100" height="10" fill="#EC407A" />
          <rect x="0" y="50" width="100" height="10" fill="#D81B60" />
          <rect x="10" y="60" width="80" height="10" fill="#D81B60" />
          <rect x="10" y="70" width="80" height="10" fill="#AD1457" />
          <rect x="20" y="80" width="60" height="10" fill="#AD1457" />
          <rect x="30" y="90" width="40" height="10" fill="#880E4F" />
          {/* { } symbol in white overlay */}
          <rect x="25" y="30" width="8" height="8" fill="#fff" />
          <rect x="20" y="38" width="8" height="8" fill="#fff" />
          <rect x="25" y="46" width="8" height="8" fill="#fff" />
          <rect x="25" y="54" width="8" height="8" fill="#fff" />
          <rect x="20" y="62" width="8" height="8" fill="#fff" />
          <rect x="25" y="70" width="8" height="8" fill="#fff" />
          {/* right bracket */}
          <rect x="67" y="30" width="8" height="8" fill="#fff" />
          <rect x="72" y="38" width="8" height="8" fill="#fff" />
          <rect x="67" y="46" width="8" height="8" fill="#fff" />
          <rect x="67" y="54" width="8" height="8" fill="#fff" />
          <rect x="72" y="62" width="8" height="8" fill="#fff" />
          <rect x="67" y="70" width="8" height="8" fill="#fff" />
          {/* Shine highlight */}
          <rect x="30" y="10" width="10" height="10" fill="#fff" opacity="0.3" />
          <rect x="40" y="10" width="10" height="10" fill="#fff" opacity="0.15" />
        </svg>
      </FloatingSticker>

      <FloatingSticker
        className="bottom-[18%] left-[5%] md:left-[10%]"
        delay={1.5}
        amplitude={18}
        rotation={-6}
      >
        {/* Green pixel-art terminal/code sticker */}
        <svg
          width="90"
          height="90"
          viewBox="0 0 90 90"
          fill="none"
          className="w-14 h-14 md:w-20 md:h-20"
          shapeRendering="crispEdges"
        >
          {/* Background rounded-square in green */}
          <rect x="10" y="0" width="70" height="10" fill="#66BB6A" />
          <rect x="0" y="10" width="90" height="10" fill="#66BB6A" />
          <rect x="0" y="20" width="90" height="10" fill="#4CAF50" />
          <rect x="0" y="30" width="90" height="10" fill="#4CAF50" />
          <rect x="0" y="40" width="90" height="10" fill="#43A047" />
          <rect x="0" y="50" width="90" height="10" fill="#388E3C" />
          <rect x="0" y="60" width="90" height="10" fill="#2E7D32" />
          <rect x="0" y="70" width="90" height="10" fill="#2E7D32" />
          <rect x="10" y="80" width="70" height="10" fill="#1B5E20" />
          {/* </> symbol in white */}
          <rect x="15" y="30" width="8" height="8" fill="#fff" />
          <rect x="10" y="38" width="8" height="8" fill="#fff" />
          <rect x="15" y="46" width="8" height="8" fill="#fff" />
          <rect x="30" y="25" width="6" height="42" fill="#fff" opacity="0.6" />
          <rect x="45" y="30" width="8" height="8" fill="#fff" />
          <rect x="50" y="38" width="8" height="8" fill="#fff" />
          <rect x="45" y="46" width="8" height="8" fill="#fff" />
          {/* Shine */}
          <rect x="20" y="10" width="10" height="10" fill="#fff" opacity="0.25" />
          <rect x="30" y="10" width="10" height="10" fill="#fff" opacity="0.12" />
        </svg>
      </FloatingSticker>

      {/* Third sticker — pixel-art character logo */}
      <FloatingSticker
        className="top-[55%] right-[3%] md:right-[6%] hidden md:block"
        delay={0.8}
        amplitude={10}
        rotation={5}
      >
        <Image
          src="/logo.png"
          alt="Pixel character"
          width={140}
          height={210}
          className="h-32 md:h-44 w-auto drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
          style={{ imageRendering: "pixelated" }}
        />
      </FloatingSticker>

      {/* Crown overlapping "BUILDING" text — z-20 to sit on top */}
      <FloatingSticker
        className="top-[22%] left-[15%] md:left-[22%] z-20 hidden md:block"
        delay={0.3}
        amplitude={8}
        rotation={-12}
      >
        <TechCoin tech="react" className="w-11 h-11 md:w-14 md:h-14" />
      </FloatingSticker>

      {/* Tech coin near "MATTER" */}
      <FloatingSticker
        className="bottom-[28%] right-[18%] md:right-[25%] z-20 hidden md:block"
        delay={1.0}
        amplitude={10}
        rotation={6}
      >
        <TechCoin tech="typescript" className="w-10 h-10 md:w-12 md:h-12" />
      </FloatingSticker>

      {/* Small tech coin left side */}
      <FloatingSticker
        className="top-[35%] left-[3%] md:left-[7%]"
        delay={2.0}
        amplitude={8}
        rotation={20}
      >
        <TechCoin tech="nodejs" className="w-8 h-8 md:w-10 md:h-10" />
      </FloatingSticker>

      {/* Tech coin bottom center */}
      <FloatingSticker
        className="bottom-[12%] left-[35%] hidden md:block"
        delay={1.7}
        amplitude={12}
        rotation={-15}
      >
        <TechCoin tech="nextjs" className="w-9 h-9 md:w-11 md:h-11" />
      </FloatingSticker>

      {/* Docker coin top-left */}
      <FloatingSticker
        className="top-[15%] left-[2%] md:left-[5%] hidden lg:block"
        delay={2.5}
        amplitude={10}
        rotation={8}
      >
        <TechCoin tech="docker" className="w-8 h-8 md:w-10 md:h-10" />
      </FloatingSticker>
    </section>
  );
}
