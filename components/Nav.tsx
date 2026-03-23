"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import SplitButton from "./SplitButton";
import { useTheme } from "./ThemeProvider";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuTlRef = useRef<gsap.core.Timeline | null>(null);
  const { theme, toggleTheme } = useTheme();

  // Scroll-direction-aware hide/show
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: "top top",
        end: "max",
        onUpdate: (self) => {
          const scrollY = self.scroll();
          setScrolled(scrollY > 50);

          if (scrollY > 80) {
            if (self.direction === 1) {
              gsap.to(nav, {
                y: "-100%",
                duration: 0.5,
                ease: "power2.out",
              });
            } else {
              gsap.to(nav, { y: "0%", duration: 0.5, ease: "power2.out" });
            }
          } else {
            gsap.to(nav, { y: "0%", duration: 0.3 });
          }
        },
      });
    });

    return () => ctx.revert();
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (!menuOpen) {
      menuTlRef.current?.reverse();
      return;
    }

    const tl = gsap.timeline();
    menuTlRef.current = tl;

    tl.fromTo(
      ".mobile-menu-overlay",
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.4, ease: "power2.out" }
    ).fromTo(
      ".mobile-menu-link",
      { y: 30, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.6,
        stagger: 0.06,
        ease: "back.out(1.7)",
      },
      "-=0.2"
    );

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [menuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? theme === "dark" ? "rgba(15, 23, 42, 0.92)" : "rgba(248, 249, 250, 0.92)"
            : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(16, 185, 129, 0.15)"
            : "1px solid transparent",
        }}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 md:px-10 py-4 md:py-5">
          {/* Logo */}
          <a
            href="#hero"
            className="flex items-center gap-2 group"
          >
            <Image
              src="/logo.png"
              alt="Vrund Patel"
              width={40}
              height={60}
              className="h-9 md:h-11 w-auto transition-transform duration-300 group-hover:scale-110"
              style={{ imageRendering: "pixelated" }}
            />
            <span
              className="text-[var(--heading)] text-2xl md:text-3xl tracking-wider"
              style={{
                fontFamily: "var(--font-display), sans-serif",
              }}
            >
              VP
            </span>
          </a>

          {/* Desktop links — pill-shaped like MoMoney */}
          <div className="hidden md:flex items-center gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-5 py-2 rounded-full text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all duration-300 text-sm tracking-widest uppercase"
                style={{
                  fontFamily: "var(--font-body), serif",
                  border: theme === "dark" ? "1.5px solid rgba(226, 232, 240, 0.12)" : "1.5px solid rgba(27, 38, 49, 0.12)",
                }}
              >
                {link.label}
              </a>
            ))}
            <div className="ml-3">
              <SplitButton
                frontLabel="Hire Me"
                backLabel="Let's Talk"
                href="#contact"
              />
            </div>
            {/* Dark mode toggle */}
            <button
              onClick={toggleTheme}
              className="ml-3 p-2.5 rounded-full border transition-all duration-300 hover:scale-110"
              style={{
                borderColor: theme === "dark" ? "rgba(226, 232, 240, 0.12)" : "rgba(27, 38, 49, 0.12)",
                color: "var(--foreground)",
              }}
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile hamburger + theme toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full transition-colors duration-300"
              style={{ color: "var(--foreground)" }}
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
            <button
              className="grid grid-cols-2 gap-[4px] p-2 group"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {[...Array(4)].map((_, i) => (
                <span
                  key={i}
                  className={`block w-[5px] h-[5px] rounded-full bg-[var(--foreground)] transition-all duration-300 group-hover:bg-[var(--heading)] ${
                    menuOpen ? "scale-0" : "scale-100"
                  }`}
                  style={{ transitionDelay: `${i * 30}ms` }}
                />
              ))}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="mobile-menu-overlay fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
          style={{ background: theme === "dark" ? "rgba(15, 23, 42, 0.97)" : "rgba(248, 249, 250, 0.97)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setMenuOpen(false);
          }}
        >
          {/* Close button */}
          <button
            className="absolute top-6 right-6 text-[var(--foreground)] hover:text-[var(--heading)] transition-colors p-2"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M18 6L6 18" />
              <path d="M6 6l12 12" />
            </svg>
          </button>

          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="mobile-menu-link text-[var(--foreground)] hover:text-[var(--heading)] transition-colors"
              style={{
                fontFamily: "var(--font-display), sans-serif",
                fontSize: "clamp(2rem, 8vw, 4rem)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="mobile-menu-link mt-4">
            <SplitButton
              frontLabel="Hire Me"
              backLabel="Let's Talk"
              href="#contact"
            />
          </div>
        </div>
      )}
    </>
  );
}
