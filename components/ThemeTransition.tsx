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

function getActiveSection(sections: NodeListOf<Element>) {
  let active: Element | null = null;
  sections.forEach((s) => {
    const rect = s.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.4) {
      active = s;
    }
  });
  return active;
}

function applyBodyBg(section: Element | null, duration: number) {
  const fallback = getComputedStyle(document.documentElement)
    .getPropertyValue("--background")
    .trim();
  const bg = section ? getBg(section) : fallback;
  if (!bg) return;

  gsap.to("body", {
    backgroundColor: bg,
    duration,
    ease: "power2.out",
    overwrite: "auto",
  });
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
            applyBodyBg(section, 0.8);
          },
          onEnterBack: () => {
            applyBodyBg(section, 0.8);
          },
        });
      });
    });

    // Sync body background with the currently visible section on first paint.
    applyBodyBg(getActiveSection(sections), 0);

    // Listen for theme toggle — re-animate current section bg
    const onThemeChange = () => {
      applyBodyBg(getActiveSection(sections), 0.5);
    };
    window.addEventListener("theme-change", onThemeChange);

    return () => {
      ctx.revert();
      window.removeEventListener("theme-change", onThemeChange);
    };
  }, []);

  return null;
}
