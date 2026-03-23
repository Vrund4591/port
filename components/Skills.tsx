"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import FloatingSticker from "./FloatingSticker";
import TechCoin from "./TechCoin";

const ROW_1 = [
  "TypeScript",
  "JavaScript",
  "Python",
  "React.js",
  "Next.js",
  "Node.js",
  "Express.js",
  "Tailwind",
];

const ROW_2 = [
  "PostgreSQL",
  "MongoDB",
  "Prisma ORM",
  "Docker",
  "AWS",
  "Google Cloud",
  "Azure",
  "Git",
];

function MarqueeRow({
  skills,
  direction,
  duration,
}: {
  skills: string[];
  direction: "left" | "right";
  duration: number;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    const ctx = gsap.context(() => {
      if (direction === "left") {
        tweenRef.current = gsap.to(row, {
          xPercent: -50,
          duration,
          ease: "none",
          repeat: -1,
        });
      } else {
        gsap.set(row, { xPercent: -50 });
        tweenRef.current = gsap.to(row, {
          xPercent: 0,
          duration,
          ease: "none",
          repeat: -1,
        });
      }
    });

    return () => ctx.revert();
  }, [direction, duration]);

  const handleMouseEnter = () => {
    if (tweenRef.current) gsap.to(tweenRef.current, { timeScale: 0, duration: 0.5 });
  };
  const handleMouseLeave = () => {
    if (tweenRef.current) gsap.to(tweenRef.current, { timeScale: 1, duration: 0.5 });
  };

  // Duplicate skills for seamless loop
  const allSkills = [...skills, ...skills];

  return (
    <div className="overflow-hidden">
      <div
        ref={rowRef}
        className="flex whitespace-nowrap"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {allSkills.map((skill, i) => (
          <span
            key={`${skill}-${i}`}
            className="inline-flex items-center px-4 md:px-8"
          >
            <span
              className="text-[var(--foreground)] hover:text-[var(--heading)] transition-colors duration-300 cursor-default"
              style={{
                fontFamily: "var(--font-display), sans-serif",
                fontSize: "clamp(2rem, 5vw, 4.5rem)",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              {skill}
            </span>
            <span
              className="mx-4 md:mx-8 text-[var(--heading)] opacity-40"
              style={{
                fontFamily: "var(--font-display), sans-serif",
                fontSize: "clamp(1.5rem, 3vw, 3rem)",
              }}
            >
              &bull;
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-20 md:py-32 overflow-hidden"
      data-theme-bg="#F2F4F6"
      data-theme-bg-dark="#0E1629"
    >
      {/* Top divider */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] max-w-[600px] h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.25), transparent)" }}
      />
      <div className="mb-8 md:mb-12 px-6 md:px-10">
        <h2
          className="text-[var(--heading)] text-center"
          style={{
            fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
            fontFamily: "var(--font-display), sans-serif",
            letterSpacing: "0.15em",
          }}
        >
          TOOLS &amp; TECHNOLOGIES
        </h2>
      </div>

      <div className="flex flex-col gap-4 md:gap-6">
        <MarqueeRow skills={ROW_1} direction="left" duration={30} />
        <MarqueeRow skills={ROW_2} direction="right" duration={25} />
      </div>

      {/* Floating tech coin stickers */}
      <FloatingSticker
        className="top-[10%] left-[3%] hidden md:block"
        delay={0.6}
        amplitude={12}
        rotation={-10}
      >
        <TechCoin tech="react" className="w-9 h-9 md:w-12 md:h-12" />
      </FloatingSticker>

      <FloatingSticker
        className="bottom-[8%] right-[4%] hidden md:block"
        delay={1.0}
        amplitude={14}
        rotation={8}
      >
        <TechCoin tech="typescript" className="w-10 h-10 md:w-12 md:h-12" />
      </FloatingSticker>

      <FloatingSticker
        className="top-[15%] right-[5%] hidden lg:block"
        delay={2.0}
        amplitude={10}
        rotation={15}
      >
        <TechCoin tech="python" className="w-9 h-9 md:w-11 md:h-11" />
      </FloatingSticker>

      {/* Node.js coin overlapping marquee — z-20 */}
      <FloatingSticker
        className="top-[42%] left-[20%] z-20 hidden md:block"
        delay={1.4}
        amplitude={10}
        rotation={-12}
      >
        <TechCoin tech="nodejs" className="w-9 h-9 md:w-11 md:h-11" />
      </FloatingSticker>

      {/* Next.js coin overlapping right marquee — z-20 */}
      <FloatingSticker
        className="bottom-[30%] right-[15%] z-20 hidden lg:block"
        delay={0.3}
        amplitude={12}
        rotation={8}
      >
        <TechCoin tech="nextjs" className="w-8 h-8 md:w-10 md:h-10" />
      </FloatingSticker>

      {/* Git coin */}
      <FloatingSticker
        className="bottom-[15%] left-[10%] hidden lg:block"
        delay={1.8}
        amplitude={6}
        rotation={30}
      >
        <TechCoin tech="git" className="w-8 h-8 md:w-10 md:h-10" />
      </FloatingSticker>

      {/* Tailwind coin */}
      <FloatingSticker
        className="top-[60%] right-[8%] hidden md:block"
        delay={2.5}
        amplitude={8}
        rotation={-20}
      >
        <TechCoin tech="tailwind" className="w-8 h-8 md:w-10 md:h-10" />
      </FloatingSticker>
    </section>
  );
}
