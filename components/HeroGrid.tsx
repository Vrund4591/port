"use client";

import { useEffect, useRef, useCallback } from "react";

interface GridCell {
  col: number;
  row: number;
  targetOpacity: number;
  opacity: number;
  fadeState: "in" | "hold" | "out";
  timestamp: number;
}

const TRAIL_LENGTH = 6;
const OPACITIES = [0.15, 0.12, 0.1, 0.07, 0.05, 0.03];
const FADE_IN_DURATION = 100; // ms
const HOLD_DELAY = 500; // ms
const FADE_OUT_DURATION = 2000; // ms

export default function HeroGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailRef = useRef<GridCell[]>([]);
  const animFrameRef = useRef<number>(0);
  const cellSizeRef = useRef<number>(0);
  const headingColorRef = useRef({ r: 16, g: 185, b: 129 }); // fallback for #10B981

  const getColumns = useCallback(() => (window.innerWidth < 768 ? 12 : 32), []);

  const parseHexColor = useCallback((hex: string) => {
    hex = hex.trim().replace("#", "");
    return {
      r: parseInt(hex.substring(0, 2), 16) || 16,
      g: parseInt(hex.substring(2, 4), 16) || 185,
      b: parseInt(hex.substring(4, 6), 16) || 129,
    };
  }, []);

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const rect = parent.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + "px";
    canvas.style.height = rect.height + "px";

    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);

    const cols = getColumns();
    cellSizeRef.current = rect.width / cols;

    // Parse heading color
    const computedColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--heading")
      .trim();
    if (computedColor) {
      headingColorRef.current = parseHexColor(computedColor);
    }
  }, [getColumns, parseHexColor]);

  // Re-read heading color when theme changes
  useEffect(() => {
    const onThemeChange = () => {
      requestAnimationFrame(() => {
        const computedColor = getComputedStyle(document.documentElement)
          .getPropertyValue("--heading")
          .trim();
        if (computedColor) {
          headingColorRef.current = parseHexColor(computedColor);
        }
      });
    };
    window.addEventListener("theme-change", onThemeChange);
    return () => window.removeEventListener("theme-change", onThemeChange);
  }, [parseHexColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Skip on touch devices
    if ("ontouchstart" in window && !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    setupCanvas();

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cellSize = cellSizeRef.current;

      if (cellSize === 0) return;

      const col = Math.floor(x / cellSize);
      const row = Math.floor(y / cellSize);

      const trail = trailRef.current;

      // Don't add duplicate of the most recent cell
      if (trail.length > 0 && trail[0].col === col && trail[0].row === row) {
        return;
      }

      // Reassign target opacities for all existing cells
      const newCell: GridCell = {
        col,
        row,
        targetOpacity: OPACITIES[0],
        opacity: 0,
        fadeState: "in",
        timestamp: Date.now(),
      };

      trail.unshift(newCell);

      // Update target opacities for older cells
      for (let i = 1; i < trail.length; i++) {
        if (i < TRAIL_LENGTH) {
          trail[i].targetOpacity = OPACITIES[i];
        }
      }

      // Trim trail
      if (trail.length > TRAIL_LENGTH) {
        trail.length = TRAIL_LENGTH;
      }
    };

    const draw = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();

      ctx.clearRect(0, 0, rect.width, rect.height);

      const now = Date.now();
      const cellSize = cellSizeRef.current;
      const { r, g, b } = headingColorRef.current;

      trailRef.current = trailRef.current.filter((cell) => {
        const age = now - cell.timestamp;

        if (cell.fadeState === "in") {
          const progress = Math.min(1, age / FADE_IN_DURATION);
          cell.opacity = cell.targetOpacity * progress;
          if (progress >= 1) {
            cell.fadeState = "hold";
            cell.timestamp = now;
          }
        } else if (cell.fadeState === "hold") {
          cell.opacity = cell.targetOpacity;
          if (age > HOLD_DELAY) {
            cell.fadeState = "out";
            cell.timestamp = now;
          }
        } else {
          const progress = Math.min(1, age / FADE_OUT_DURATION);
          cell.opacity = cell.targetOpacity * (1 - progress);
          if (progress >= 1) return false;
        }

        if (cell.opacity > 0.001) {
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${cell.opacity})`;
          ctx.fillRect(
            cell.col * cellSize,
            cell.row * cellSize,
            cellSize - 1,
            cellSize - 1
          );
        }

        return true;
      });

      animFrameRef.current = requestAnimationFrame(draw);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    animFrameRef.current = requestAnimationFrame(draw);

    const handleResize = () => {
      setupCanvas();
    };

    let resizeTimeout: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 200);
    };
    window.addEventListener("resize", debouncedResize);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", debouncedResize);
      cancelAnimationFrame(animFrameRef.current);
      clearTimeout(resizeTimeout);
    };
  }, [setupCanvas]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "auto" }}
    />
  );
}
