"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import FloatingSticker from "./FloatingSticker";
import TechCoin from "./TechCoin";

gsap.registerPlugin(ScrollTrigger);

// Colorful coin-like elements inspired by MoMoney's falling coins
const COINS = [
  { symbol: "</>", bg: "#4CAF50", text: "#fff" },
  { symbol: "{ }", bg: "#FF7C24", text: "#fff" },
  { symbol: "( )", bg: "#FFEC00", text: "#333" },
  { symbol: "#", bg: "#F580DB", text: "#fff" },
  { symbol: "@", bg: "#10B981", text: "#F8F9FA" },
  { symbol: ";", bg: "#64B5F6", text: "#fff" },
  { symbol: "//", bg: "#FF5252", text: "#fff" },
  { symbol: "=>", bg: "#AB47BC", text: "#fff" },
  { symbol: "&&", bg: "#26C6DA", text: "#333" },
  { symbol: "!=", bg: "#FFA726", text: "#fff" },
  { symbol: "++", bg: "#66BB6A", text: "#fff" },
  { symbol: "[ ]", bg: "#EF5350", text: "#fff" },
  { symbol: "**", bg: "#7E57C2", text: "#fff" },
  { symbol: "<<", bg: "#EC407A", text: "#fff" },
];

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

interface PhysicsBody {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  angularVel: number;
  symbol: string;
  size: number;
  bg: string;
  text: string;
}

function PhysicsCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bodiesRef = useRef<PhysicsBody[]>([]);
  const animRef = useRef<number>(0);
  const spawnedRef = useRef(false);
  const boundsRef = useRef({ width: 0, height: 0 });
  const [bodies, setBodies] = useState<PhysicsBody[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateBounds = () => {
      boundsRef.current.width = container.offsetWidth;
      boundsRef.current.height = container.offsetHeight;
    };

    updateBounds();

    const isMobile = window.innerWidth < 768;
    const gravity = 0.55;
    const bounce = 0.4;
    const friction = 0.993;
    const maxBodies = isMobile ? 22 : 45;
    let nextId = 0;

    const spawnBody = (): PhysicsBody => {
      const coin = COINS[Math.floor(Math.random() * COINS.length)];
      const coinSize = isMobile ? 38 + Math.random() * 20 : 65 + Math.random() * 40;
      const width = boundsRef.current.width;
      return {
        id: nextId++,
        x: Math.random() * (width - coinSize) + coinSize / 2,
        y: -80 - Math.random() * 250,
        vx: (Math.random() - 0.5) * (isMobile ? 3.8 : 6),
        vy: Math.random() * 4 + 2,
        angle: Math.random() * Math.PI * 2,
        angularVel: (Math.random() - 0.5) * 0.1,
        symbol: coin.symbol,
        size: coinSize,
        bg: coin.bg,
        text: coin.text,
      };
    };

    const update = () => {
      const b = bodiesRef.current;
      const { width, height } = boundsRef.current;

      for (const body of b) {
        body.vy += gravity;
        body.x += body.vx;
        body.y += body.vy;
        body.angle += body.angularVel;
        body.vx *= friction;
        body.angularVel *= 0.997;

        // Floor collision
        const floorY = height - body.size / 2 - 5;
        if (body.y > floorY) {
          body.y = floorY;
          body.vy *= -bounce;
          body.vx *= 0.92;
          body.angularVel *= 0.7;
          if (Math.abs(body.vy) < 1.5) body.vy = 0;
        }

        // Wall collisions
        if (body.x < body.size / 2) {
          body.x = body.size / 2;
          body.vx *= -bounce;
        }
        if (body.x > width - body.size / 2) {
          body.x = width - body.size / 2;
          body.vx *= -bounce;
        }
      }

      // Coin-to-coin collisions
      for (let i = 0; i < b.length; i++) {
        for (let j = i + 1; j < b.length; j++) {
          const a = b[i];
          const bBody = b[j];
          const dx = bBody.x - a.x;
          const dy = bBody.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = (a.size + bBody.size) / 2;

          if (dist < minDist && dist > 0.01) {
            // Normalize collision axis
            const nx = dx / dist;
            const ny = dy / dist;

            // Separate overlapping bodies
            const overlap = minDist - dist;
            const totalMass = a.size + bBody.size;
            a.x -= nx * overlap * (bBody.size / totalMass);
            a.y -= ny * overlap * (bBody.size / totalMass);
            bBody.x += nx * overlap * (a.size / totalMass);
            bBody.y += ny * overlap * (a.size / totalMass);

            // Relative velocity along collision axis
            const dvx = a.vx - bBody.vx;
            const dvy = a.vy - bBody.vy;
            const dvDotN = dvx * nx + dvy * ny;

            // Only resolve if bodies are moving toward each other
            if (dvDotN > 0) {
              const restitution = 0.35;
              const impulse = dvDotN * (1 + restitution) / 2;

              a.vx -= impulse * nx;
              a.vy -= impulse * ny;
              bBody.vx += impulse * nx;
              bBody.vy += impulse * ny;

              // Transfer angular velocity on impact
              a.angularVel += (Math.random() - 0.5) * 0.04;
              bBody.angularVel -= (Math.random() - 0.5) * 0.04;
            }
          }
        }
      }

      setBodies([...b]);
      animRef.current = requestAnimationFrame(update);
    };

    // Spawn on scroll trigger
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top 95%",
      onEnter: () => {
        if (spawnedRef.current) return;
        spawnedRef.current = true;

        let spawned = 0;
        const spawnInterval = setInterval(() => {
          if (spawned >= maxBodies) {
            clearInterval(spawnInterval);
            return;
          }
          bodiesRef.current.push(spawnBody());
          spawned++;
        }, 90);
      },
    });

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateBounds();
      }, 150);
    };
    window.addEventListener("resize", handleResize);

    animRef.current = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animRef.current);
      trigger.kill();
      window.removeEventListener("resize", handleResize);
      if (resizeTimer) clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden h-[340px] sm:h-[420px] md:h-[600px]"
    >
      {bodies.map((body) => (
        <div
          key={body.id}
          className="absolute flex items-center justify-center rounded-full select-none pointer-events-none"
          style={{
            left: body.x,
            top: body.y,
            width: body.size,
            height: body.size,
            backgroundColor: body.bg,
            color: body.text,
            fontSize: body.size * 0.36,
            fontFamily: "var(--font-display), monospace",
            fontWeight: 700,
            transform: `translate(-50%, -50%) rotate(${body.angle}rad)`,
            willChange: "transform",
            boxShadow: `0 8px 24px rgba(0,0,0,0.12), inset 0 3px 8px rgba(255,255,255,0.4)`,
            letterSpacing: "0.02em",
            lineHeight: 1,
            border: "2px solid rgba(0,0,0,0.08)",
          }}
        >
          {body.symbol}
        </div>
      ))}
    </div>
  );
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-animate",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="relative pt-20 md:pt-32 scroll-mt-24"
      style={{ background: "var(--background-dark)" }}
      data-theme-bg="#EFF1F3"
      data-theme-bg-dark="#0B1120"
    >
      {/* Main footer content */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 pb-16 relative">
        {/* Floating tech coin stickers around CTA */}
        <FloatingSticker
          className="top-[2%] left-[2%] hidden md:block"
          delay={0.4}
          amplitude={12}
          rotation={-8}
        >
          <TechCoin tech="postgresql" className="w-10 h-10 md:w-12 md:h-12" />
        </FloatingSticker>

        <FloatingSticker
          className="top-[5%] right-[3%] hidden md:block"
          delay={1.5}
          amplitude={15}
          rotation={12}
        >
          <TechCoin tech="prisma" className="w-10 h-10 md:w-12 md:h-12" />
        </FloatingSticker>

        {/* GSAP coin overlapping "WORK" text — z-20 */}
        <FloatingSticker
          className="top-[4%] left-[35%] z-20 hidden md:block"
          delay={0.8}
          amplitude={10}
          rotation={18}
        >
          <TechCoin tech="gsap" className="w-9 h-9 md:w-11 md:h-11" />
        </FloatingSticker>

        {/* Cloudinary coin */}
        <FloatingSticker
          className="top-[12%] right-[20%] hidden lg:block"
          delay={2.0}
          amplitude={8}
          rotation={-6}
        >
          <TechCoin tech="cloudinary" className="w-9 h-9 md:w-11 md:h-11" />
        </FloatingSticker>

        {/* FastAPI coin */}
        <FloatingSticker
          className="top-[8%] left-[45%] hidden lg:block"
          delay={1.2}
          amplitude={6}
          rotation={25}
        >
          <TechCoin tech="fastapi" className="w-8 h-8 md:w-10 md:h-10" />
        </FloatingSticker>

        {/* Vertex AI coin near "TOGETHER" — z-20 */}
        <FloatingSticker
          className="top-[10%] right-[8%] z-20 hidden lg:block"
          delay={0.6}
          amplitude={12}
          rotation={-10}
        >
          <TechCoin tech="vertexai" className="w-9 h-9 md:w-11 md:h-11" />
        </FloatingSticker>

        {/* Big CTA heading */}
        <h2
          className="footer-animate text-center mb-16 md:mb-20"
          style={{
            fontSize: "clamp(2.5rem, 7vw, 7rem)",
            fontFamily: "var(--font-display), sans-serif",
            lineHeight: "0.95",
            color: "var(--heading)",
          }}
        >
          LET&apos;S WORK
          <br />
          <span style={{ color: "var(--foreground)" }}>TOGETHER</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Left — Big nav links */}
          <div className="footer-animate">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-[var(--foreground)] hover:text-[var(--heading)] transition-colors duration-300"
                style={{
                  fontFamily: "var(--font-display), sans-serif",
                  fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                  lineHeight: "1.3",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Center — Tagline */}
          <div className="footer-animate flex items-center justify-center">
            <p
              className="text-[var(--foreground)] opacity-50 text-center leading-relaxed"
              style={{
                fontFamily: "var(--font-body), serif",
                fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
              }}
            >
              Code. Build.
              <br />
              Ship. Repeat.
              <br />
              <span className="text-[var(--heading)] opacity-80">
                — Gandhinagar, India
              </span>
            </p>
          </div>

          {/* Right — Contact + Socials */}
          <div className="footer-animate flex flex-col items-start md:items-end gap-4">
            <a
              href="mailto:vrund4591@gmail.com"
              className="text-[var(--heading)] hover:text-[var(--foreground)] transition-colors duration-300"
              style={{
                fontFamily: "var(--font-body), serif",
                fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
              }}
            >
              vrund4591@gmail.com
            </a>

            <div className="flex gap-6 mt-2">
              {/* GitHub */}
              <a
                href="https://github.com/vrund4591"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--foreground)] hover:text-[var(--heading)] transition-colors duration-300"
                aria-label="GitHub"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/vrund4591"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--foreground)] hover:text-[var(--heading)] transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>

              {/* Email */}
              <a
                href="mailto:vrund4591@gmail.com"
                className="text-[var(--foreground)] hover:text-[var(--heading)] transition-colors duration-300"
                aria-label="Email"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 4L12 13 2 4" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Physics falling elements — colorful coins like MoMoney */}
      <PhysicsCanvas />

      {/* Credit line */}
      <div
        className="border-t py-6 flex items-center justify-center gap-3"
        style={{ borderColor: "rgba(16, 185, 129, 0.2)" }}
      >
        <Image
          src="/logo.png"
          alt="Vrund Patel"
          width={24}
          height={36}
          className="h-8 w-auto"
          style={{ imageRendering: "pixelated" }}
        />
        <p
          className="text-[var(--foreground)] opacity-40 text-sm"
          style={{ fontFamily: "var(--font-body), serif" }}
        >
          Built by Vrund Patel
        </p>
      </div>
    </footer>
  );
}
