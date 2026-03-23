"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function isDark() {
  return document.documentElement.classList.contains("dark");
}

function getBg(section: Element) {
  const attr = isDark() ? "data-theme-bg-dark" : "data-theme-bg";
  return section.getAttribute(attr);
}

export default function ThemeTransition() {
  useEffect(() => {
    const sections = document.querySelectorAll("[data-theme-bg]");
    if (sections.length === 0) return;

    const ctx = gsap.context(() => {
      sections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => {
            const bg = getBg(section);
            if (bg) gsap.to("body", { backgroundColor: bg, duration: 0.8, ease: "power2.out" });
          },
          onEnterBack: () => {
            const bg = getBg(section);
            if (bg) gsap.to("body", { backgroundColor: bg, duration: 0.8, ease: "power2.out" });
          },
        });
      });
    });

    // Listen for theme toggle — re-animate current section bg
    const onThemeChange = () => {
      let active: Element | null = null;
      sections.forEach((s) => {
        const rect = s.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.4) {
          active = s;
        }
      });
      if (active) {
        const bg = getBg(active);
        if (bg) gsap.to("body", { backgroundColor: bg, duration: 0.5, ease: "power2.out" });
      }
    };
    window.addEventListener("theme-change", onThemeChange);

    return () => {
      ctx.revert();
      window.removeEventListener("theme-change", onThemeChange);
    };
  }, []);

  return null;
}
