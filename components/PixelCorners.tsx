"use client";

interface PixelCornersProps {
  size?: number;
  color?: string;
  corners?: ("tl" | "tr" | "bl" | "br")[];
  className?: string;
}

export default function PixelCorners({
  size = 6,
  color = "var(--heading)",
  corners = ["tl", "tr", "bl", "br"],
  className = "",
}: PixelCornersProps) {
  const s = size;

  // Each corner is a small cluster of pixel-blocks arranged in an L-shape
  const renderCorner = (corner: string) => {
    const pixels: { x: number; y: number }[] = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
    ];

    const cornerStyle: React.CSSProperties = { position: "absolute" };
    let transform = "";

    switch (corner) {
      case "tl":
        cornerStyle.top = 0;
        cornerStyle.left = 0;
        break;
      case "tr":
        cornerStyle.top = 0;
        cornerStyle.right = 0;
        transform = "scaleX(-1)";
        break;
      case "bl":
        cornerStyle.bottom = 0;
        cornerStyle.left = 0;
        transform = "scaleY(-1)";
        break;
      case "br":
        cornerStyle.bottom = 0;
        cornerStyle.right = 0;
        transform = "scale(-1, -1)";
        break;
    }

    return (
      <svg
        key={corner}
        width={s * 3}
        height={s * 3}
        style={{ ...cornerStyle, transform }}
        shapeRendering="crispEdges"
        aria-hidden="true"
      >
        {pixels.map((p, i) => (
          <rect
            key={i}
            x={p.x * s}
            y={p.y * s}
            width={s}
            height={s}
            fill={color}
          />
        ))}
      </svg>
    );
  };

  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {corners.map(renderCorner)}
    </div>
  );
}
