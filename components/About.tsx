"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PixelCorners from "./PixelCorners";
import SplitButton from "./SplitButton";
import FloatingSticker from "./FloatingSticker";
import TechCoin from "./TechCoin";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          leftRef.current,
          { x: -60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              end: "top 40%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          rightRef.current?.querySelectorAll(".about-animate") || [],
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "top 35%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 md:py-40 px-6 md:px-10 scroll-mt-24"
      data-theme-bg="#F0F2F4"
      data-theme-bg-dark="#111827"
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left — Typographic heading */}
        <div ref={leftRef}>
          <h2
            className="text-[var(--heading)]"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 6rem)",
              fontFamily: "var(--font-display), sans-serif",
              lineHeight: "0.95",
            }}
          >
            THE{" "}
            <span className="text-[var(--foreground)]">&lt;</span>
            <span className="text-[var(--heading)]">STORY</span>
            <span className="text-[var(--foreground)]">&gt;</span>
            <br />
            BEHIND
            <br />
            THE CODE
          </h2>

          {/* Photo area with pixel corners */}
          <div className="relative mt-10 w-full aspect-[4/3] bg-[var(--background-dark)] rounded overflow-hidden">
            <PixelCorners color="var(--heading)" size={8} />
            {/* Grid pattern overlay */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(var(--heading) 1px, transparent 1px), linear-gradient(90deg, var(--heading) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            {/* Pixel character centered */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Vrund Patel — pixel art"
                width={300}
                height={450}
                className="h-52 md:h-72 w-auto drop-shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
                style={{ imageRendering: "pixelated" }}
              />
            </div>
            {/* Gradient overlay for depth */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, transparent 50%, rgba(209, 250, 229, 0.15) 100%)",
              }}
            />
          </div>
        </div>

        {/* Right — Bio text + CTA */}
        <div ref={rightRef} className="flex flex-col gap-6">
          <p
            className="about-animate text-[var(--foreground)] text-lg leading-relaxed"
            style={{ fontFamily: "var(--font-body), serif" }}
          >
            I&apos;m a final-year Information Technology student at LDRP
            Institute of Technology and Research, Gandhinagar. I love building
            software that solves real-world problems — from AI-powered web tools
            to community platforms and NGO websites.
          </p>

          <p
            className="about-animate text-[var(--foreground)] opacity-80 text-base leading-relaxed"
            style={{ fontFamily: "var(--font-body), serif" }}
          >
            I&apos;ve been freelancing since May 2024, shipping projects that
            handle 60k–100k+ simulated users. Recently interned at{" "}
            <span className="text-[var(--heading)] font-semibold">Tatvasoft</span>{" "}
            as a full-stack developer. When I&apos;m not coding, I&apos;m
            exploring Google Cloud, competing in hackathons, or planning my next
            venture.
          </p>

          <div className="about-animate flex items-center gap-6 mt-4">
            <div className="flex flex-col gap-1">
              <span
                className="text-[var(--heading)]"
                style={{
                  fontFamily: "var(--font-display), sans-serif",
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                }}
              >
                2+
              </span>
              <span
                className="text-[var(--foreground)] opacity-60 text-sm uppercase tracking-wider"
                style={{ fontFamily: "var(--font-body), serif" }}
              >
                Years Freelancing
              </span>
            </div>
            <div className="w-[1px] h-12 bg-[var(--accent)] opacity-40" />
            <div className="flex flex-col gap-1">
              <span
                className="text-[var(--heading)]"
                style={{
                  fontFamily: "var(--font-display), sans-serif",
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                }}
              >
                10+
              </span>
              <span
                className="text-[var(--foreground)] opacity-60 text-sm uppercase tracking-wider"
                style={{ fontFamily: "var(--font-body), serif" }}
              >
                Projects Shipped
              </span>
            </div>
          </div>

          <div className="about-animate mt-6">
            <SplitButton
              frontLabel="Get In Touch"
              backLabel="Let's Talk"
              href="#contact"
            />
          </div>
        </div>
      </div>

      {/* Floating tech coin stickers */}
      <FloatingSticker
        className="top-[8%] right-[4%] md:right-[8%] hidden md:block"
        delay={0.3}
        amplitude={14}
        rotation={10}
      >
        <TechCoin tech="python" className="w-10 h-10 md:w-14 md:h-14" />
      </FloatingSticker>

      <FloatingSticker
        className="bottom-[12%] right-[6%] md:right-[3%] hidden lg:block"
        delay={1.2}
        amplitude={10}
        rotation={-8}
      >
        <TechCoin tech="gcloud" className="w-10 h-10 md:w-12 md:h-12" />
      </FloatingSticker>

      {/* Git coin overlapping near "THE CODE" heading — z-20 */}
      <FloatingSticker
        className="top-[28%] left-[28%] md:left-[18%] z-20 hidden md:block"
        delay={0.8}
        amplitude={8}
        rotation={-6}
      >
        <TechCoin tech="git" className="w-9 h-9 md:w-11 md:h-11" />
      </FloatingSticker>

      {/* Tailwind coin near bottom-left */}
      <FloatingSticker
        className="bottom-[5%] left-[3%] hidden md:block"
        delay={1.6}
        amplitude={12}
        rotation={10}
      >
        <TechCoin tech="tailwind" className="w-9 h-9 md:w-11 md:h-11" />
      </FloatingSticker>

      {/* Prisma coin */}
      <FloatingSticker
        className="top-[50%] right-[12%] hidden lg:block"
        delay={2.2}
        amplitude={6}
        rotation={25}
      >
        <TechCoin tech="prisma" className="w-8 h-8 md:w-10 md:h-10" />
      </FloatingSticker>

      {/* PostgreSQL coin */}
      <FloatingSticker
        className="top-[65%] left-[8%] hidden lg:block"
        delay={0.5}
        amplitude={10}
        rotation={-18}
      >
        <TechCoin tech="postgresql" className="w-8 h-8 md:w-10 md:h-10" />
      </FloatingSticker>
    </section>
  );
}
