"use client";

import { useRef } from "react";

interface SplitButtonProps {
  frontLabel: string;
  backLabel: string;
  href?: string;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
}

export default function SplitButton({
  frontLabel,
  backLabel,
  href,
  icon,
  variant = "primary",
  onClick,
}: SplitButtonProps) {
  const btnRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  const isPrimary = variant === "primary";

  const inner = (
    <span className="split-btn-wrap group relative inline-flex items-stretch cursor-pointer select-none">
      {/* Text face */}
      <span
        className={`split-btn-text relative overflow-hidden px-7 py-3.5 ${
          isPrimary
            ? "bg-[var(--accent)] text-[var(--foreground)]"
            : "border-2 border-[var(--accent)] text-[var(--foreground)]"
        } transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:-rotate-[2.5deg]`}
        style={{ perspective: "600px" }}
      >
        {/* Front label */}
        <span
          className="block transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-8 group-hover:opacity-0"
          style={{
            fontFamily: "var(--font-display), sans-serif",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontSize: "0.95rem",
          }}
        >
          {frontLabel}
        </span>
        {/* Back label */}
        <span
          className="absolute inset-0 flex items-center justify-center translate-y-8 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-y-0 group-hover:opacity-100"
          style={{
            fontFamily: "var(--font-display), sans-serif",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontSize: "0.95rem",
          }}
        >
          {backLabel}
        </span>
      </span>

      {/* Dotted divider — like MoMoney's Book Tickets button */}
      {isPrimary && (
        <span className="split-btn-divider flex items-center transition-opacity duration-500 group-hover:opacity-0">
          <span
            className="w-[1px] h-full"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, var(--foreground) 3px, transparent 3px)",
              backgroundSize: "1px 7px",
              backgroundRepeat: "repeat-y",
              opacity: 0.4,
            }}
          />
        </span>
      )}

      {/* Icon face */}
      {isPrimary && (
        <span className="split-btn-icon flex items-center justify-center px-4 py-3.5 bg-[var(--accent)] text-[var(--foreground)] transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:rotate-[2.5deg]">
          {icon || (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          )}
        </span>
      )}
    </span>
  );

  if (href) {
    return (
      <a
        ref={btnRef as React.Ref<HTMLAnchorElement>}
        href={href}
        className="inline-block active:scale-[0.955] transition-transform duration-200"
        onClick={onClick}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      ref={btnRef as React.Ref<HTMLButtonElement>}
      className="inline-block active:scale-[0.955] transition-transform duration-200"
      onClick={onClick}
    >
      {inner}
    </button>
  );
}
