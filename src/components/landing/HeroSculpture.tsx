import sculpture from "@/assets/hero-sculpture.webp";

/**
 * Signature brand sculpture — a rendered piece of glass geometry unique to
 * Rivinity, annotated with the three product primitives the shape stands for.
 * Not a screenshot, not a mockup: a static, brand-owned visual object.
 */
const labels: Array<{
  text: string;
  className: string;
  line: { x1: number; y1: number; x2: number; y2: number };
  dotSide: "left" | "right";
}> = [
  {
    text: "Context",
    className: "left-[-6.5rem] top-[18%] text-right",
    line: { x1: 100, y1: 26, x2: 60, y2: 34 },
    dotSide: "right",
  },
  {
    text: "Memory",
    className: "right-[-4rem] top-[46%] text-left",
    line: { x1: 0, y1: 52, x2: 42, y2: 50 },
    dotSide: "left",
  },
  {
    text: "Reasoning",
    className: "left-[-7.5rem] bottom-[14%] text-right",
    line: { x1: 100, y1: 74, x2: 55, y2: 68 },
    dotSide: "right",
  },
];

const HeroSculpture = ({ className = "" }: { className?: string }) => (
  <div className={className} aria-hidden>
   <div className="relative">
    <img
      src={sculpture}
      alt=""
      width={1200}
      height={1200}
      className="w-full h-auto select-none pointer-events-none drop-shadow-[0_30px_60px_rgba(124,110,246,0.28)]"
    />

    {labels.map(({ text, className: pos, line, dotSide }) => (
      <div
        key={text}
        className={`absolute ${pos} w-[6.25rem]`}
      >
        {/* leader-line SVG spans a fixed viewBox so line coords stay stable */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        >
          <line
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="hsl(var(--foreground) / 0.35)"
            strokeWidth={0.6}
            vectorEffect="non-scaling-stroke"
          />
          <circle
            cx={dotSide === "right" ? line.x1 : line.x1}
            cy={line.y1}
            r={1.2}
            fill="hsl(var(--foreground) / 0.55)"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <span
          className={`relative inline-block text-[10px] font-medium uppercase tracking-[0.16em] text-foreground/60 ${
            dotSide === "right" ? "pr-3" : "pl-3"
          }`}
        >
          {text}
        </span>
      </div>
    ))}
   </div>
  </div>
);

export default HeroSculpture;