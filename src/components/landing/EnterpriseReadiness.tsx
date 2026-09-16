import { memo } from "react";
import {
  MessageSquare,
  Search,
  Palette,
  Code2,
  Mic,
  BarChart3,
  Workflow,
  Sparkles,
  Link2,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import orbImage from "@/assets/rivinity-orb.webp";

/**
 * "Everything You Need. One Intelligent Platform." —
 * left-side value pitch + right-side semi-globe with capability pills
 * connected by curved gradient lines. Palette matches the site
 * (peach → pink → purple).
 */

type Capability = {
  label: string;
  icon: LucideIcon;
  tone: "peach" | "pink" | "purple" | "sky";
  /** pill center position, in % of the diagram box */
  x: number;
  y: number;
  /** dot on the sphere edge (in %) */
  dx: number;
  dy: number;
};

// Zig-zag column on the left; each pill's right edge sits at c.x%.
// (dx, dy) is the connector endpoint on the visible left arc of the orb.
const CAPS: Capability[] = [
  { label: "AI Chat",      icon: MessageSquare, tone: "purple", x: 52, y:  8, dx: 62, dy: 12 },
  { label: "AI Search",    icon: Search,        tone: "peach",  x: 42, y: 22, dx: 56, dy: 25 },
  { label: "AI Studio",    icon: Palette,       tone: "purple", x: 34, y: 36, dx: 52, dy: 38 },
  { label: "AI Coder",     icon: Code2,         tone: "sky",    x: 32, y: 50, dx: 50, dy: 50 },
  { label: "AI Voice",     icon: Mic,           tone: "purple", x: 34, y: 64, dx: 52, dy: 62 },
  { label: "AI Analytics", icon: BarChart3,     tone: "pink",   x: 42, y: 78, dx: 56, dy: 75 },
  { label: "AI Workflows", icon: Workflow,      tone: "peach",  x: 52, y: 92, dx: 62, dy: 88 },
];

// Precompute connector paths + per-index delays once at module scope so the
// component re-render (or React.memo hit) never rebuilds these strings.
// Orthogonal L-connector: horizontal segment from pill → elbow → segment to
// the sphere edge dot. Elbow sits ~4pt before the sphere dot so the second
// leg is a short right-angle tail.
const CONNECTORS = CAPS.map((c, i) => {
  const px = c.x + 1;
  const py = c.y;
  const elbowX = c.dx - 4;
  const elbowY = py;
  const d = `M ${px} ${py} L ${elbowX} ${elbowY} L ${elbowX} ${c.dy} L ${c.dx} ${c.dy}`;
  return { ...c, px, py, elbowX, elbowY, d, delay: `-${(i * 0.6).toFixed(2)}s` };
});

// Injected once. Uses CSS `offset-path` (motion path) + opacity, both
// compositor-friendly properties, instead of SVG SMIL <animateMotion>.
// `prefers-reduced-motion` pauses everything.
const GLOBE_CSS = `
@keyframes cg-flow { from { offset-distance: 0%; } to { offset-distance: 100%; } }
@keyframes cg-pulse-op {
  0% { opacity: 0; }
  18% { opacity: 1; }
  85% { opacity: 1; }
  100% { opacity: 0; }
}
.cg-pulse {
  offset-rotate: 0deg;
  transform-box: fill-box;
  will-change: offset-distance, opacity;
  animation: cg-flow 4.6s linear infinite, cg-pulse-op 4.6s linear infinite;
}
@media (prefers-reduced-motion: reduce) {
  .cg-pulse { animation: none; opacity: 0; }
}
`;

const toneStyles: Record<Capability["tone"], { bg: string; ring: string; ic: string }> = {
  peach:  { bg: "hsl(22 100% 96%)",  ring: "hsl(22 90% 88%)",  ic: "hsl(22 95% 55%)"  },
  pink:   { bg: "hsl(340 100% 97%)", ring: "hsl(340 80% 90%)", ic: "hsl(330 85% 60%)" },
  purple: { bg: "hsl(260 100% 97%)", ring: "hsl(260 70% 92%)", ic: "hsl(260 75% 60%)" },
  sky:    { bg: "hsl(215 100% 97%)", ring: "hsl(215 80% 92%)", ic: "hsl(215 85% 55%)" },
};

// Vivid gradient tiles for the pill icons (matches the reference).
const toneGradient: Record<Capability["tone"], string> = {
  peach:  "linear-gradient(135deg, hsl(28 100% 66%), hsl(12 95% 58%))",
  pink:   "linear-gradient(135deg, hsl(340 95% 68%), hsl(315 85% 60%))",
  purple: "linear-gradient(135deg, hsl(262 92% 70%), hsl(278 82% 60%))",
  sky:    "linear-gradient(135deg, hsl(215 95% 68%), hsl(230 85% 60%))",
};

const bullets: { icon: LucideIcon; tone: Capability["tone"]; text: string }[] = [
  { icon: Sparkles,    tone: "purple", text: "Intelligent assistance for every workflow" },
  { icon: Link2,       tone: "purple", text: "Connected knowledge across your workspace" },
  { icon: TrendingUp,  tone: "peach",  text: "Build, create, automate, and scale with AI" },
];

const EnterpriseReadiness = memo(() => (
  <section
    id="enterprise"
    data-testid="enterprise-readiness"
    className="relative mx-auto max-w-7xl px-5 lg:px-8 py-20"
    style={{
      contain: "layout paint",
      contentVisibility: "auto",
      containIntrinsicSize: "1px 900px",
    }}
  >
    <div data-reveal-group className="relative">
      {/* Ambient wash — matches landing palette */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(55% 65% at 92% 50%, hsl(var(--accent-peach) / 0.35), transparent 65%), radial-gradient(45% 55% at 98% 40%, hsl(var(--accent-pink) / 0.22), transparent 70%), radial-gradient(70% 80% at 105% 65%, hsl(var(--accent-purple) / 0.22), transparent 75%)",
        }}
      />

      <div className="relative grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-8 lg:gap-6 xl:gap-10 items-center">
        {/* LEFT: copy */}
        <ScrollReveal>
          <h2
            className="font-semibold tracking-[-0.03em] leading-[1.1] text-[hsl(230_25%_12%)] [text-wrap:balance]"
            style={{
              // Fluid: 28px @ 360px viewport → 44px @ 1440px+, no stepped jumps.
              fontSize: "clamp(28px, 1.55rem + 1.35vw, 44px)",
            }}
          >
            <span className="block">Everything You Need.</span>
            <span className="block">
              One{" "}
              <span className="bg-gradient-to-r from-[hsl(22_95%_55%)] via-[hsl(330_85%_62%)] to-[hsl(265_85%_65%)] bg-clip-text text-transparent">
                Intelligent Platform.
              </span>
            </span>
          </h2>
          <p
            className="mt-4 lg:mt-5 text-[hsl(230_15%_38%)] max-w-[420px] leading-[1.65]"
            style={{ fontSize: "clamp(13px, 0.78rem + 0.15vw, 14.5px)" }}
          >
            Discover a growing ecosystem of AI capabilities—from intelligent
            conversations and coding to automation, research, content creation,
            and advanced analytics—all seamlessly connected through{" "}
            <span className="text-[hsl(260_75%_58%)] font-semibold">Rivinity</span>.
          </p>

          <ul className="mt-7 space-y-2.5 max-w-[440px]">
            {bullets.map(({ icon: Icon, tone, text }) => {
              const t = toneStyles[tone];
              return (
                <li
                  key={text}
                  className="flex items-center gap-3 rounded-2xl px-3.5 py-2.5 hover-lift"
                  style={{
                    background: "hsl(0 0% 100%)",
                    border: "1px solid hsl(230 25% 93%)",
                    boxShadow: "0 4px 14px -8px hsl(230 25% 25% / 0.08)",
                  }}
                >
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: t.bg }}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: t.ic }} strokeWidth={2.25} />
                  </span>
                  <span
                    className="text-[hsl(230_20%_22%)] font-medium leading-snug"
                    style={{ fontSize: "clamp(12.5px, 0.75rem + 0.1vw, 13.5px)" }}
                  >
                    {text}
                  </span>
                </li>
              );
            })}
          </ul>
        </ScrollReveal>

        {/* RIGHT: semi-globe diagram */}
        <ScrollReveal className="relative">
          <CapabilityGlobe />
        </ScrollReveal>
      </div>
    </div>
  </section>
));
EnterpriseReadiness.displayName = "EnterpriseReadiness";

export default EnterpriseReadiness;

const CapabilityGlobe = memo(() => {
  // Diagram uses a normalized 0–100 coordinate system and scales via viewBox.
  return (
    <div
      className="relative w-full"
      style={{ aspectRatio: "1 / 1" }}
      aria-label="Rivinity capabilities connected to one intelligent platform"
      role="img"
    >
      {/* Photoreal cosmic orb — the sphere image already carries its own glow. */}
      <img
        src={orbImage}
        alt=""
        aria-hidden
        loading="lazy"
        width={1280}
        height={1280}
        className="absolute pointer-events-none select-none"
        style={{
          top: "50%",
          right: "-14%",
          width: "88%",
          aspectRatio: "1 / 1",
          transform: "translateY(-50%)",
          filter: "drop-shadow(0 0 60px hsl(20 95% 60% / 0.35))",
        }}
      />

      {/* RIVINITY wordmark — bold white, on the sphere */}
      <div
        aria-hidden
        className="absolute pointer-events-none select-none"
        style={{
          top: "50%",
          right: "6%",
          transform: "translateY(-50%)",
          color: "white",
          fontFamily: "Inter, system-ui, sans-serif",
          fontWeight: 800,
          letterSpacing: "0.06em",
          fontSize: "clamp(20px, 1rem + 2.2vw, 44px)",
          textShadow:
            "0 2px 14px hsl(280 60% 20% / 0.55), 0 0 24px hsl(20 95% 55% / 0.35)",
        }}
      >
        RIVINITY
      </div>

      {/* Connectors — SVG is stretched (preserveAspectRatio=none) so path
          endpoints line up with the %-positioned HTML pills at any size. */}
      <svg
        viewBox="0 0 100 105"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        {CONNECTORS.map((c) => {
          const stroke = toneStyles[c.tone].ic;
          const { px, py, elbowX, elbowY, d } = c;
          return (
            <g key={c.label}>
              <path
                d={d}
                fill="none"
                stroke="hsl(230 15% 70%)"
                strokeOpacity={0.55}
                strokeWidth={0.9}
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* elbow dot — subtle gray */}
              <circle cx={elbowX} cy={elbowY} r={0.55}
                      fill="hsl(230 12% 78%)"
                      vectorEffect="non-scaling-stroke" />
              {/* colored dot on the sphere edge */}
              <circle cx={c.dx} cy={c.dy} r={0.85}
                      fill={stroke}
                      stroke="hsl(0 0% 100%)"
                      strokeWidth={0.35}
                      vectorEffect="non-scaling-stroke" />
              {/* traveling pulse — GPU-composited via CSS offset-path */}
              <circle
                className="cg-pulse"
                cx={0}
                cy={0}
                r={0.55}
                fill={stroke}
                style={{
                  offsetPath: `path('${d}')`,
                  animationDelay: `${c.delay}, ${c.delay}`,
                }}
              />
            </g>
          );
        })}
      </svg>

      <style>{GLOBE_CSS}</style>

      {/* Foreground: HTML pills, absolutely positioned in % so they stay crisp */}
      {CAPS.map((c) => {
        const Icon = c.icon;
        return (
          <div
            key={c.label}
            className="absolute rounded-2xl flex items-center whitespace-nowrap"
            style={{
              left: `${c.x}%`,
              top: `${c.y}%`,
              transform: "translate(-100%, -50%)",
              background: "hsl(0 0% 100%)",
              border: "1px solid hsl(230 25% 94%)",
              boxShadow:
                "0 10px 24px -14px hsl(230 25% 25% / 0.22), 0 2px 6px -2px hsl(230 25% 25% / 0.06)",
              gap: "clamp(8px, 0.4rem + 0.35vw, 12px)",
              paddingLeft: "clamp(6px, 0.32rem + 0.2vw, 9px)",
              paddingRight: "clamp(12px, 0.7rem + 0.45vw, 18px)",
              paddingTop: "clamp(6px, 0.32rem + 0.2vw, 9px)",
              paddingBottom: "clamp(6px, 0.32rem + 0.2vw, 9px)",
            }}
          >
            <span
              className="rounded-xl flex items-center justify-center shrink-0"
              style={{
                background: toneGradient[c.tone],
                width: "clamp(30px, 1.55rem + 0.6vw, 38px)",
                height: "clamp(30px, 1.55rem + 0.6vw, 38px)",
                boxShadow:
                  "inset 0 1px 0 hsl(0 0% 100% / 0.35), 0 4px 10px -4px hsl(280 60% 40% / 0.35)",
              }}
            >
              <Icon
                style={{
                  color: "white",
                  width: "clamp(15px, 0.8rem + 0.3vw, 19px)",
                  height: "clamp(15px, 0.8rem + 0.3vw, 19px)",
                }}
                strokeWidth={2.4}
              />
            </span>
            <span
              className="font-semibold tracking-[-0.01em] text-[hsl(230_20%_18%)]"
              style={{ fontSize: "clamp(12.5px, 0.72rem + 0.2vw, 14.5px)" }}
            >
              {c.label}
            </span>
          </div>
        );
      })}
    </div>
  );
});
CapabilityGlobe.displayName = "CapabilityGlobe";