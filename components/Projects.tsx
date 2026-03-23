"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PixelCorners from "./PixelCorners";
import FloatingSticker from "./FloatingSticker";
import TechCoin from "./TechCoin";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "WebGenMachine",
    tag: "AI Tool",
    description:
      "A web tool that creates full React projects based on text inputs, optimizing developer workflows and cutting setup time by 50%. Enabled rapid prototyping in 200+ simulated cases.",
    tech: ["React", "Node.js", "Tailwind CSS", "Webcontainer", "Claude Sonnet4"],
    github: "",
    live: "",
  },
  {
    title: "StackIt",
    tag: "Community",
    description:
      "Community Q&A platform inspired by Reddit with threaded discussions, upvotes, and real-time updates. Attracted ~3000+ simulated users in beta, handling 1500 daily interactions.",
    tech: ["React", "Node.js", "PostgreSQL", "Prisma ORM"],
    github: "",
    live: "",
  },
  {
    title: "Vansaarthi",
    tag: "NGO",
    description:
      "NGO website supporting donations via UPI, email alerts, and on-site forms. Integrated secure auth for 100+ potential donors, automating alerts that increased response rates by ~35%.",
    tech: ["React", "Node.js", "Tailwind CSS", "Nodemailer", "Passport"],
    github: "",
    live: "",
  },
  {
    title: "The Noticing Eye",
    tag: "Photography",
    description:
      "Photography blog platform enabling photographers to upload, organize, and publish photo stories with a responsive, mobile-friendly design powered by Prisma ORM and PostgreSQL.",
    tech: ["Node.js", "PostgreSQL", "React", "Prisma ORM"],
    github: "",
    live: "",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const initScroll = useCallback(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    if (typeof window === "undefined") return;

    // Kill existing triggers bound to this section and its children before rebuilding.
    ScrollTrigger.getAll().forEach((st) => {
      const triggerEl = st.trigger as Element | undefined;
      if (triggerEl && (triggerEl === section || section.contains(triggerEl))) {
        st.kill();
      }
    });

    // Only do horizontal scroll on desktop
    if (window.innerWidth < 768) {
      gsap.set(track, { x: 0 });
      return;
    }

    // Force layout calc
    const totalWidth = track.scrollWidth;
    const viewportWidth = window.innerWidth;

    if (totalWidth <= viewportWidth) return;

    // Create the horizontal scroll animation
    const tween = gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        end: () => `+=${track.scrollWidth - window.innerWidth}`,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });

    // Card parallax — each card starts offset and rotated, settles as it scrolls past center
    const cardElements = track.querySelectorAll<HTMLDivElement>(".project-card");
    cardElements.forEach((card) => {
      const dirX = Math.random() > 0.5 ? 1 : -1;
      const dirY = Math.random() > 0.5 ? 1 : -1;
      const xOff = (25 + Math.random() * 20) * dirX;
      const yOff = (8 + Math.random() * 8) * dirY;
      const rotOff = (8 + Math.random() * 12) * dirX;

      gsap.fromTo(
        card,
        { xPercent: xOff, yPercent: yOff, rotation: rotOff },
        {
          xPercent: 0,
          yPercent: 0,
          rotation: 0,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            containerAnimation: tween,
            start: "left 115%",
            end: "left 50%",
            scrub: true,
          },
        }
      );
    });

    // Outro text fade in
    const outroEl = track.querySelector(".projects-outro");
    if (outroEl) {
      gsap.fromTo(
        outroEl,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: outroEl,
            containerAnimation: tween,
            start: "left 90%",
            end: "left 60%",
            scrub: true,
          },
        }
      );
    }
  }, []);

  useEffect(() => {
    // Wait for fonts and layout to settle
    const timer = setTimeout(() => {
      initScroll();
    }, 300);

    // Mobile: vertical fade-in
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(max-width: 767px)", () => {
        const cardElements = track.querySelectorAll<HTMLDivElement>(".project-card");
        cardElements.forEach((card) => {
          gsap.fromTo(
            card,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      });
    }, section);

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        initScroll();
        ScrollTrigger.refresh(true);
      }, 180);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      if (resizeTimer) clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
  }, [initScroll]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative"
      data-theme-bg="#E8EAED"
      data-theme-bg-dark="#0D1321"
    >
      {/* Floating tech coin stickers */}
      <FloatingSticker
        className="top-[8%] left-[3%] hidden md:block z-20"
        delay={0.5}
        amplitude={16}
        rotation={12}
      >
        <TechCoin tech="vertexai" className="w-10 h-10 md:w-12 md:h-12" />
      </FloatingSticker>

      <FloatingSticker
        className="bottom-[10%] right-[2%] hidden md:block z-20"
        delay={1.8}
        amplitude={12}
        rotation={-6}
      >
        <TechCoin tech="gemini" className="w-9 h-9 md:w-12 md:h-12" />
      </FloatingSticker>

      {/* FastAPI coin overlapping "BOUNDARIES" — z-20 */}
      <FloatingSticker
        className="top-[58%] left-[18%] z-20 hidden md:block"
        delay={1.2}
        amplitude={8}
        rotation={-10}
      >
        <TechCoin tech="fastapi" className="w-10 h-10 md:w-12 md:h-12" />
      </FloatingSticker>

      {/* Cloudinary coin */}
      <FloatingSticker
        className="top-[20%] right-[10%] hidden lg:block z-20"
        delay={0.3}
        amplitude={6}
        rotation={20}
      >
        <TechCoin tech="cloudinary" className="w-8 h-8 md:w-10 md:h-10" />
      </FloatingSticker>

      {/* GSAP coin */}
      <FloatingSticker
        className="bottom-[25%] left-[8%] hidden lg:block"
        delay={2.0}
        amplitude={10}
        rotation={-15}
      >
        <TechCoin tech="gsap" className="w-8 h-8 md:w-10 md:h-10" />
      </FloatingSticker>

      {/* Docker coin */}
      <FloatingSticker
        className="top-[75%] right-[5%] hidden md:block"
        delay={1.5}
        amplitude={14}
        rotation={12}
      >
        <TechCoin tech="docker" className="w-9 h-9 md:w-11 md:h-11" />
      </FloatingSticker>

      {/* The horizontal track — flex row with all items inline */}
      <div
        ref={trackRef}
        className="flex flex-col md:flex-row md:flex-nowrap md:items-center md:min-h-screen px-6 py-24 md:py-0 md:px-0 gap-8 md:gap-0"
      >
        {/* Intro text */}
        <div className="projects-intro flex-shrink-0 md:w-[50vw] flex items-center justify-center px-6 md:px-20">
          <div className="text-center md:text-left">
            <h2
              className="text-[var(--heading)]"
              style={{
                fontSize: "clamp(2rem, 5vw, 5rem)",
                fontFamily: "var(--font-display), sans-serif",
                lineHeight: "0.95",
              }}
            >
              PROJECTS
              <br />
              <span className="text-[var(--foreground)]">THAT PUSH</span>
              <br />
              BOUNDARIES
            </h2>
            <p
              className="mt-6 text-[var(--foreground)] max-w-md"
              style={{
                fontFamily: "var(--font-body), serif",
                fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
              }}
            >
              From enterprise SaaS to hackathon experiments — here&apos;s what
              I&apos;ve been building.
            </p>
          </div>
        </div>

        {/* Project cards */}
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="project-card relative flex-shrink-0 md:w-[40vw] lg:w-[35vw] md:mx-8 md:my-[10vh]"
          >
            <div className="relative bg-[var(--accent)] rounded-lg p-8 md:p-10 h-full flex flex-col overflow-hidden"
              style={{ minHeight: "420px" }}
            >
              <PixelCorners color="var(--heading)" size={6} />

              {/* Tag */}
              <span
                className="inline-block self-start px-4 py-1.5 rounded-full text-xs tracking-widest uppercase mb-6"
                style={{
                  background: "var(--background)",
                  color: "var(--heading)",
                  fontFamily: "var(--font-body), serif",
                }}
              >
                {project.tag}
              </span>

              {/* Title */}
              <h3
                className="text-[var(--foreground)]"
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                  fontFamily: "var(--font-display), sans-serif",
                  lineHeight: "1",
                }}
              >
                {project.title}
              </h3>

              {/* Description */}
              <p
                className="mt-4 text-[var(--foreground)] opacity-80 leading-relaxed flex-grow"
                style={{
                  fontFamily: "var(--font-body), serif",
                  fontSize: "clamp(0.85rem, 1.2vw, 1rem)",
                }}
              >
                {project.description}
              </p>

              {/* Tech pills */}
              <div className="flex flex-wrap gap-2 mt-6">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 text-xs rounded-sm tracking-wide"
                    style={{
                      background: "var(--background-dark)",
                      color: "var(--foreground)",
                      fontFamily: "var(--font-body), serif",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Links */}
              {(project.github || project.live) && (
                <div className="flex gap-4 mt-6">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--heading)] text-sm hover:underline"
                      style={{ fontFamily: "var(--font-body), serif" }}
                    >
                      GitHub &rarr;
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--heading)] text-sm hover:underline"
                      style={{ fontFamily: "var(--font-body), serif" }}
                    >
                      Live &rarr;
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Outro text */}
        <div className="projects-outro flex-shrink-0 md:w-[40vw] flex items-center justify-center px-6 md:px-16">
          <div className="text-center">
            <p
              className="text-[var(--heading)]"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 3rem)",
                fontFamily: "var(--font-display), sans-serif",
                lineHeight: "1.1",
              }}
            >
              AND MORE
              <br />
              COMING SOON...
            </p>
            <div className="mt-8">
              <a
                href="https://github.com/vrund4591"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 border-2 border-[var(--heading)] text-[var(--heading)] hover:bg-[var(--heading)] hover:text-[var(--background)] transition-all duration-300 uppercase tracking-wider text-sm"
                style={{ fontFamily: "var(--font-display), sans-serif" }}
              >
                View GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
