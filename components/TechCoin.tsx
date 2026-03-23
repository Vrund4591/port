"use client";

/**
 * Pixel-art circle coin stickers with technology logos.
 * Each coin is a colored circle with a recognizable symbol rendered in pixel blocks.
 */

interface TechCoinProps {
  tech: string;
  className?: string;
}

const TECH_COINS: Record<
  string,
  { bg: string; symbol: React.ReactNode; label: string }
> = {
  react: {
    bg: "#61DAFB",
    label: "React",
    symbol: (
      <>
        {/* Atom center */}
        <rect x="22" y="22" width="4" height="4" fill="#222" />
        {/* Orbit rings */}
        <rect x="14" y="18" width="4" height="4" fill="#222" opacity="0.8" />
        <rect x="30" y="26" width="4" height="4" fill="#222" opacity="0.8" />
        <rect x="18" y="30" width="4" height="4" fill="#222" opacity="0.8" />
        <rect x="26" y="14" width="4" height="4" fill="#222" opacity="0.8" />
        <rect x="14" y="26" width="4" height="4" fill="#222" opacity="0.6" />
        <rect x="30" y="18" width="4" height="4" fill="#222" opacity="0.6" />
      </>
    ),
  },
  typescript: {
    bg: "#3178C6",
    label: "TypeScript",
    symbol: (
      <>
        {/* T */}
        <rect x="12" y="16" width="12" height="3" fill="#fff" />
        <rect x="16" y="16" width="4" height="16" fill="#fff" />
        {/* S */}
        <rect x="26" y="16" width="10" height="3" fill="#fff" />
        <rect x="26" y="16" width="3" height="8" fill="#fff" />
        <rect x="26" y="24" width="10" height="3" fill="#fff" />
        <rect x="33" y="24" width="3" height="8" fill="#fff" />
        <rect x="26" y="29" width="10" height="3" fill="#fff" />
      </>
    ),
  },
  python: {
    bg: "#FFD43B",
    label: "Python",
    symbol: (
      <>
        {/* Blue half */}
        <rect x="14" y="14" width="10" height="4" fill="#306998" />
        <rect x="14" y="14" width="4" height="12" fill="#306998" />
        <rect x="14" y="22" width="14" height="4" fill="#306998" />
        {/* Yellow half */}
        <rect x="24" y="22" width="4" height="12" fill="#306998" />
        <rect x="18" y="30" width="10" height="4" fill="#306998" />
        {/* Eyes */}
        <rect x="18" y="16" width="3" height="3" fill="#fff" />
        <rect x="27" y="28" width="3" height="3" fill="#fff" />
      </>
    ),
  },
  nodejs: {
    bg: "#68A063",
    label: "Node.js",
    symbol: (
      <>
        {/* N */}
        <rect x="14" y="14" width="4" height="20" fill="#fff" />
        <rect x="18" y="18" width="4" height="4" fill="#fff" />
        <rect x="22" y="22" width="4" height="4" fill="#fff" />
        <rect x="26" y="26" width="4" height="4" fill="#fff" />
        <rect x="30" y="14" width="4" height="20" fill="#fff" />
      </>
    ),
  },
  nextjs: {
    bg: "#111",
    label: "Next.js",
    symbol: (
      <>
        {/* N */}
        <rect x="13" y="14" width="4" height="20" fill="#fff" />
        <rect x="17" y="18" width="4" height="4" fill="#fff" />
        <rect x="21" y="22" width="4" height="4" fill="#fff" />
        <rect x="25" y="26" width="4" height="4" fill="#fff" />
        <rect x="29" y="14" width="4" height="20" fill="#fff" />
        {/* Arrow hint */}
        <rect x="33" y="22" width="4" height="4" fill="#fff" opacity="0.5" />
      </>
    ),
  },
  docker: {
    bg: "#2496ED",
    label: "Docker",
    symbol: (
      <>
        {/* Whale body */}
        <rect x="10" y="22" width="28" height="10" fill="#fff" />
        <rect x="14" y="18" width="4" height="4" fill="#fff" opacity="0.8" />
        {/* Containers on top */}
        <rect x="14" y="12" width="5" height="5" fill="#fff" />
        <rect x="21" y="12" width="5" height="5" fill="#fff" />
        <rect x="21" y="6" width="5" height="5" fill="#fff" opacity="0.7" />
        <rect x="28" y="12" width="5" height="5" fill="#fff" />
        {/* Water */}
        <rect x="6" y="28" width="4" height="4" fill="#fff" opacity="0.4" />
        <rect x="34" y="26" width="4" height="4" fill="#fff" opacity="0.4" />
      </>
    ),
  },
  git: {
    bg: "#F05032",
    label: "Git",
    symbol: (
      <>
        {/* Branch lines */}
        <rect x="22" y="10" width="4" height="28" fill="#fff" />
        {/* Left branch */}
        <rect x="14" y="14" width="4" height="4" fill="#fff" />
        <rect x="18" y="18" width="4" height="4" fill="#fff" />
        {/* Right branch */}
        <rect x="30" y="26" width="4" height="4" fill="#fff" />
        <rect x="26" y="22" width="4" height="4" fill="#fff" />
        {/* Dots */}
        <rect x="12" y="12" width="6" height="6" fill="#fff" opacity="0.4" rx="3" />
        <rect x="28" y="24" width="6" height="6" fill="#fff" opacity="0.4" rx="3" />
      </>
    ),
  },
  tailwind: {
    bg: "#06B6D4",
    label: "Tailwind",
    symbol: (
      <>
        {/* Wind swoosh lines */}
        <rect x="10" y="16" width="20" height="3" fill="#fff" />
        <rect x="14" y="20" width="20" height="3" fill="#fff" />
        <rect x="10" y="24" width="20" height="3" fill="#fff" />
        <rect x="14" y="28" width="20" height="3" fill="#fff" />
        {/* Curve accents */}
        <rect x="30" y="14" width="4" height="3" fill="#fff" opacity="0.6" />
        <rect x="10" y="30" width="4" height="3" fill="#fff" opacity="0.6" />
      </>
    ),
  },
  postgresql: {
    bg: "#336791",
    label: "PostgreSQL",
    symbol: (
      <>
        {/* Elephant simplified */}
        <rect x="16" y="10" width="16" height="4" fill="#fff" />
        <rect x="12" y="14" width="24" height="4" fill="#fff" />
        <rect x="12" y="18" width="4" height="12" fill="#fff" />
        <rect x="32" y="18" width="4" height="12" fill="#fff" />
        <rect x="16" y="30" width="16" height="4" fill="#fff" />
        {/* Trunk */}
        <rect x="30" y="30" width="4" height="6" fill="#fff" opacity="0.7" />
        {/* Eye */}
        <rect x="20" y="18" width="4" height="4" fill="#336791" />
      </>
    ),
  },
  gcloud: {
    bg: "#4285F4",
    label: "Google Cloud",
    symbol: (
      <>
        {/* Cloud shape */}
        <rect x="14" y="14" width="16" height="4" fill="#fff" />
        <rect x="10" y="18" width="24" height="4" fill="#fff" />
        <rect x="10" y="22" width="28" height="4" fill="#fff" />
        <rect x="14" y="26" width="20" height="4" fill="#fff" />
        {/* Accent */}
        <rect x="30" y="14" width="4" height="4" fill="#fff" opacity="0.6" />
      </>
    ),
  },
  prisma: {
    bg: "#2D3748",
    label: "Prisma",
    symbol: (
      <>
        {/* Triangle/prism shape */}
        <rect x="22" y="10" width="4" height="4" fill="#5DE4C7" />
        <rect x="18" y="14" width="12" height="4" fill="#5DE4C7" />
        <rect x="14" y="18" width="20" height="4" fill="#5DE4C7" />
        <rect x="14" y="22" width="20" height="4" fill="#5DE4C7" opacity="0.7" />
        <rect x="18" y="26" width="12" height="4" fill="#5DE4C7" opacity="0.5" />
        <rect x="22" y="30" width="4" height="4" fill="#5DE4C7" opacity="0.3" />
        {/* Light side */}
        <rect x="26" y="14" width="4" height="4" fill="#fff" opacity="0.3" />
      </>
    ),
  },
  gsap: {
    bg: "#88CE02",
    label: "GSAP",
    symbol: (
      <>
        {/* GS text */}
        <rect x="10" y="16" width="10" height="3" fill="#111" />
        <rect x="10" y="16" width="3" height="16" fill="#111" />
        <rect x="10" y="29" width="10" height="3" fill="#111" />
        <rect x="17" y="24" width="3" height="8" fill="#111" />
        <rect x="14" y="24" width="6" height="3" fill="#111" />
        {/* S */}
        <rect x="23" y="16" width="10" height="3" fill="#111" />
        <rect x="23" y="16" width="3" height="8" fill="#111" />
        <rect x="23" y="22" width="10" height="3" fill="#111" />
        <rect x="30" y="22" width="3" height="10" fill="#111" />
        <rect x="23" y="29" width="10" height="3" fill="#111" />
      </>
    ),
  },
  fastapi: {
    bg: "#009688",
    label: "FastAPI",
    symbol: (
      <>
        {/* Lightning bolt */}
        <rect x="24" y="10" width="6" height="4" fill="#fff" />
        <rect x="20" y="14" width="10" height="4" fill="#fff" />
        <rect x="16" y="18" width="14" height="4" fill="#fff" />
        <rect x="20" y="22" width="10" height="4" fill="#fff" />
        <rect x="16" y="26" width="10" height="4" fill="#fff" />
        <rect x="18" y="30" width="6" height="4" fill="#fff" />
      </>
    ),
  },
  cloudinary: {
    bg: "#3448C5",
    label: "Cloudinary",
    symbol: (
      <>
        {/* Cloud */}
        <rect x="16" y="16" width="12" height="4" fill="#fff" />
        <rect x="12" y="20" width="20" height="4" fill="#fff" />
        <rect x="10" y="24" width="28" height="4" fill="#fff" />
        <rect x="14" y="28" width="20" height="4" fill="#fff" />
        {/* Arrow up */}
        <rect x="22" y="12" width="4" height="4" fill="#fff" opacity="0.7" />
      </>
    ),
  },
  vertexai: {
    bg: "#EA4335",
    label: "Vertex AI",
    symbol: (
      <>
        {/* Star/AI spark */}
        <rect x="22" y="10" width="4" height="4" fill="#fff" />
        <rect x="18" y="14" width="12" height="4" fill="#fff" />
        <rect x="10" y="18" width="28" height="4" fill="#fff" opacity="0.8" />
        <rect x="14" y="22" width="6" height="4" fill="#fff" opacity="0.6" />
        <rect x="28" y="22" width="6" height="4" fill="#fff" opacity="0.6" />
        <rect x="22" y="26" width="4" height="6" fill="#FBBC04" />
        <rect x="18" y="30" width="12" height="3" fill="#FBBC04" opacity="0.5" />
      </>
    ),
  },
  gemini: {
    bg: "#886FBF",
    label: "Gemini",
    symbol: (
      <>
        {/* G sparkle */}
        <rect x="22" y="8" width="4" height="4" fill="#fff" />
        <rect x="14" y="14" width="4" height="4" fill="#fff" />
        <rect x="30" y="14" width="4" height="4" fill="#fff" />
        <rect x="18" y="18" width="12" height="12" fill="#fff" opacity="0.6" />
        <rect x="22" y="22" width="4" height="4" fill="#fff" />
        <rect x="14" y="30" width="4" height="4" fill="#fff" />
        <rect x="30" y="30" width="4" height="4" fill="#fff" />
        <rect x="22" y="34" width="4" height="4" fill="#fff" />
      </>
    ),
  },
};

export default function TechCoin({ tech, className = "" }: TechCoinProps) {
  const coin = TECH_COINS[tech];
  if (!coin) return null;

  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      shapeRendering="crispEdges"
      className={className}
      aria-label={coin.label}
    >
      {/* Circle background */}
      <rect x="12" y="0" width="24" height="4" fill={coin.bg} />
      <rect x="8" y="4" width="32" height="4" fill={coin.bg} />
      <rect x="4" y="8" width="40" height="4" fill={coin.bg} />
      <rect x="4" y="12" width="40" height="4" fill={coin.bg} />
      <rect x="0" y="16" width="48" height="4" fill={coin.bg} />
      <rect x="0" y="20" width="48" height="4" fill={coin.bg} />
      <rect x="0" y="24" width="48" height="4" fill={coin.bg} />
      <rect x="0" y="28" width="48" height="4" fill={coin.bg} />
      <rect x="4" y="32" width="40" height="4" fill={coin.bg} />
      <rect x="4" y="36" width="40" height="4" fill={coin.bg} />
      <rect x="8" y="40" width="32" height="4" fill={coin.bg} />
      <rect x="12" y="44" width="24" height="4" fill={coin.bg} />
      {/* Shine highlight */}
      <rect x="12" y="4" width="8" height="4" fill="#fff" opacity="0.2" />
      <rect x="8" y="8" width="8" height="4" fill="#fff" opacity="0.12" />
      {/* Tech symbol */}
      {coin.symbol}
    </svg>
  );
}

export const TECH_LIST = Object.keys(TECH_COINS);
