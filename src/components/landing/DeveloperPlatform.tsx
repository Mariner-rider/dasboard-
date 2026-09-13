import { Link } from "react-router-dom";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  RefreshCw,
  Sparkles,
  Boxes,
  Layers,
  Zap,
  Bot,
  Wand2,
  MessageSquare,
  Image as ImageIcon,
  Mic,
  Film,
  ShieldCheck,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import rivinityMark from "@/assets/rivinity-mark.png.asset.json";

/**
 * "What sets Rivinity apart" — bento layout inspired by the reference.
 * Kept in the project's light glass aesthetic (no dark theme).
 */

/* ---------- Card 1 · Unified Workspace — isometric tile grid ---------- */
const SpeedVisual = () => {
  // Isometric grid of rounded dark tiles; center tile glows and holds the Rivinity mark.
  // 5x5 grid, center = (2,2). Tiles rendered via CSS transforms for a stable 3D look
  // that stays centered at every breakpoint.
  const size = 78; // tile size in px
  const gap = 12;
  const rows = 5;
  const cols = 9; // wider grid to fill horizontal space after 45° rotation
  const cells = [] as { r: number; c: number }[];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) cells.push({ r, c });
  const cx = Math.floor(rows / 2);
  const cy = Math.floor(cols / 2);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* light brand base — matches the other bento cards */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 65% at 50% 55%, hsl(22 95% 70% / 0.30), transparent 68%), radial-gradient(50% 55% at 25% 20%, hsl(245 85% 75% / 0.28), transparent 72%), radial-gradient(45% 55% at 80% 85%, hsl(330 85% 78% / 0.25), transparent 72%)",
        }}
      />

      {/* isometric stage */}
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          transform:
            "translate(-50%, -50%) rotateX(54deg) rotateZ(-45deg) scale(1.15)",
          transformStyle: "preserve-3d",
          width: `${cols * (size + gap)}px`,
          height: `${rows * (size + gap)}px`,
        }}
      >
        {cells.map(({ r, c }) => {
          const isCenter = r === cx && c === cy;
          const dist = Math.max(Math.abs(r - cx), Math.abs(c - cy));
          const delay = dist * 0.35;
          return (
            <div
              key={`${r}-${c}`}
              className="absolute rounded-[14px]"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${c * (size + gap)}px`,
                top: `${r * (size + gap)}px`,
                background: isCenter
                  ? "linear-gradient(160deg, hsl(0 0% 100% / 0.98), hsl(22 95% 94% / 0.85))"
                  : "linear-gradient(160deg, hsl(0 0% 100% / 0.75), hsl(245 40% 96% / 0.55))",
                boxShadow: isCenter
                  ? "0 18px 40px -8px hsl(22 95% 55% / 0.45), 0 0 32px 6px hsl(22 95% 65% / 0.55), 0 0 60px 18px hsl(330 85% 72% / 0.35), inset 0 1px 0 hsl(0 0% 100% / 0.95)"
                  : "inset 0 1px 0 hsl(0 0% 100% / 0.9), 0 8px 18px hsl(245 40% 40% / 0.10)",
                border: isCenter
                  ? "1px solid hsl(22 95% 75% / 0.7)"
                  : "1px solid hsl(245 30% 80% / 0.45)",
                backdropFilter: "blur(4px)",
                animation: isCenter
                  ? "centerFloat 3.6s ease-in-out infinite"
                  : `tilePulse 4s ease-in-out ${delay}s infinite`,
              }}
            >
              {isCenter && (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    transform: "rotateZ(45deg) rotateX(-54deg)",
                  }}
                >
                  <img
                    src={rivinityMark.url}
                    alt="Rivinity"
                    className="w-[70%] h-[70%] object-contain"
                    style={{
                      filter:
                        "drop-shadow(0 3px 8px hsl(22 95% 45% / 0.45)) drop-shadow(0 0 4px hsl(0 0% 100% / 0.8))",
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* particle sparkles below center */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white/90"
          style={{
            left: `${44 + (i % 3) * 6}%`,
            top: `${62 + (i % 2) * 6}%`,
            boxShadow: "0 0 6px 1px hsl(22 95% 70% / 0.9)",
            animation: `speedDrift ${3 + (i % 3)}s ease-in-out ${i * 0.3}s infinite`,
          }}
        />
      ))}

      <style>{`
        @keyframes speedDrift {
          0%,100% { opacity: 0; transform: translateY(6px); }
          50% { opacity: 1; transform: translateY(-4px); }
        }
        @keyframes tilePulse {
          0%,100% { filter: brightness(0.85); }
          50% { filter: brightness(1.15); }
        }
        @keyframes centerFloat {
          0%,100% { transform: translate3d(0, 0, 0); filter: brightness(1); }
          50% { transform: translate3d(0, -14px, 24px); filter: brightness(1.15); }
        }
      `}</style>
    </div>
  );
};

/* ---------- Card 2 · Deep capabilities — neural circuit ---------- */
/* ---------- Card 2 · Persistent Intelligence — data warp tunnel ---------- */

/** Tunable geometry for the Persistent Intelligence burst.
 *  Every knob is optional — sensible defaults ship, and each maps to a CSS
 *  variable on the wrapper so downstream styles can override without props. */
type BurstProps = {
  inner?: number;      // short interior strands
  outer?: number;      // long strands defining the tip ring
  wisps?: number;      // long wisps that break the silhouette
  dust?: number;       // ambient particles
  web?: number;        // faint outer web threads
  ringRadius?: number; // pinned tip radius (viewBox units, 0..200). Omit to auto-fit.
  autoFit?: boolean;   // scale ringRadius to the container so halo stays inside padding
  padding?: number;    // CSS-px gutter between the halo edge and the card padding
  jitter?: number;     // angular jitter for the tip ring (radians)
  speed?: number;      // <1 faster, >1 slower
  seed?: number;       // deterministic seed — same value → identical burst
};

// Deterministic pseudo-random so SSR/CSR match and the layout never re-shuffles.
const rand = (seed: number) => {
  const s = Math.sin(seed * 9301 + 49297) * 233280;
  return s - Math.floor(s);
};

// Live subscription to prefers-reduced-motion so we can drop counts and skip
// animations on devices that ask for calmer visuals.
const useReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);
  return reduced;
};

const CapabilitiesVisual = memo(function CapabilitiesVisual({
  inner: innerProp,
  outer: outerProp,
  wisps: wispsProp,
  dust: dustProp,
  web: webProp,
  ringRadius,
  autoFit = true,
  padding = 18,
  jitter = 0.045,
  speed = 1,
  seed = 1337,
}: BurstProps) {
  const reducedMotion = useReducedMotion();

  // Cap particle budgets. Reduced motion halves everything; the hard ceilings
  // stop callers from overshooting the SVG and killing FPS on low-end devices.
  const cap = reducedMotion ? 0.5 : 1;
  const INNER = Math.min(320, Math.round((innerProp ?? 220) * cap));
  const OUTER = Math.min(280, Math.round((outerProp ?? 200) * cap));
  const WISP  = Math.min(100, Math.round((wispsProp ?? 60) * cap));
  const DUST  = Math.min(140, Math.round((dustProp ?? 90) * cap));
  const WEB   = Math.min(60,  Math.round((webProp   ?? 30) * cap));

  // Auto-fit: observe the wrapper and derive R so the halo (R * 1.08) plus a
  // small CSS-px gutter never crosses the card's padding, at any breakpoint or
  // DPR. A pinned `ringRadius` prop opts out of the observer entirely.
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [fitR, setFitR] = useState<number>(ringRadius ?? 175);
  useEffect(() => {
    if (!autoFit || ringRadius != null || typeof window === "undefined") return;
    const el = wrapRef.current;
    if (!el) return;
    const HALO = 1.08; // haloR = R * HALO — keep in sync with coreSize/haloR below
    const compute = () => {
      const { width, height } = el.getBoundingClientRect();
      const shortPx = Math.max(1, Math.min(width, height));
      // viewBox is 0 0 400 400 with xMidYMid meet, so 1 CSS px = 400/shortPx vb units.
      const unitsPerPx = 400 / shortPx;
      const padVb = padding * unitsPerPx;
      // Halo must sit inside (200 - padVb); solve for R.
      const next = Math.max(60, Math.min(195, (200 - padVb) / HALO));
      setFitR((prev) => (Math.abs(prev - next) < 0.5 ? prev : next));
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, [autoFit, ringRadius, padding]);
  const R = ringRadius ?? fitR;

  const cx = 200;
  const cy = 200;

  // Seeded pseudo-random. Any change to `seed` reshuffles the whole burst
  // deterministically; the same seed always produces byte-identical geometry
  // across sessions, SSR/CSR, and devices.
  const r = useMemo(() => (n: number) => rand(n + seed * 131), [seed]);

  // Memoize every geometry calculation so re-renders (from parent scroll,
  // hover, etc.) don't recompute hundreds of trig operations.
  const innerStrands = useMemo(
    () =>
      Array.from({ length: INNER }, (_, i) => {
        const a = (i / INNER) * Math.PI * 2 + (r(i) - 0.5) * 0.09;
        const len = R * (0.45 + r(i + 11) * 0.32);
        const curve = (r(i + 23) - 0.5) * 8;
        const startR = 5 + r(i + 5) * 5;
        const sx = cx + Math.cos(a) * startR;
        const sy = cy + Math.sin(a) * startR;
        const tipX = cx + Math.cos(a) * len;
        const tipY = cy + Math.sin(a) * len;
        const mx = cx + Math.cos(a) * (len * 0.55) + Math.cos(a + Math.PI / 2) * curve;
        const my = cy + Math.sin(a) * (len * 0.55) + Math.sin(a + Math.PI / 2) * curve;
        return {
          d: `M${sx.toFixed(1)} ${sy.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${tipX.toFixed(1)} ${tipY.toFixed(1)}`,
          opacity: 0.4 + r(i + 13) * 0.35,
          dur: 2.8 + r(i + 67) * 2.2,
          delay: r(i + 41) * 3,
        };
      }),
    [INNER, R, r],
  );

  const outerStrands = useMemo(
    () =>
      Array.from({ length: OUTER }, (_, i) => {
        const a = (i / OUTER) * Math.PI * 2 + (r(i + 700) - 0.5) * jitter;
        const len = R + (r(i + 711) - 0.5) * 10;
        const curve = (r(i + 723) - 0.5) * 12;
        const startR = 10 + r(i + 705) * 6;
        const sx = cx + Math.cos(a) * startR;
        const sy = cy + Math.sin(a) * startR;
        const tipX = cx + Math.cos(a) * len;
        const tipY = cy + Math.sin(a) * len;
        const mx = cx + Math.cos(a) * (len * 0.55) + Math.cos(a + Math.PI / 2) * curve;
        const my = cy + Math.sin(a) * (len * 0.55) + Math.sin(a + Math.PI / 2) * curve;
        const rTip = r(i + 789);
        return {
          d: `M${sx.toFixed(1)} ${sy.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${tipX.toFixed(1)} ${tipY.toFixed(1)}`,
          tipX,
          tipY,
          opacity: 0.6 + r(i + 713) * 0.35,
          dur: 3.2 + r(i + 767) * 2.4,
          delay: r(i + 741) * 3,
          strokeW: r(i + 703) < 0.18 ? 0.5 : 0.3,
          dotColor:
            rTip < 0.05
              ? "hsl(var(--burst-peach))"
              : rTip < 0.12
                ? "hsl(var(--burst-pink))"
                : "hsl(var(--burst-violet))",
          dotR: rTip < 0.06 ? 1.5 : rTip < 0.45 ? 1.0 : 0.7,
          dotOpacity: 0.85 + r(i + 731) * 0.15,
        };
      }),
    [OUTER, R, jitter, r],
  );

  const wispStrands = useMemo(
    () =>
      Array.from({ length: WISP }, (_, i) => {
        const a = r(i + 900) * Math.PI * 2;
        const len = R * (1.15 + r(i + 911) * 0.25);
        const curve = (r(i + 923) - 0.5) * 20;
        const startR = 8 + r(i + 905) * 6;
        const sx = cx + Math.cos(a) * startR;
        const sy = cy + Math.sin(a) * startR;
        const tipX = cx + Math.cos(a) * len;
        const tipY = cy + Math.sin(a) * len;
        const mx = cx + Math.cos(a) * (len * 0.55) + Math.cos(a + Math.PI / 2) * curve;
        const my = cy + Math.sin(a) * (len * 0.55) + Math.sin(a + Math.PI / 2) * curve;
        return {
          d: `M${sx.toFixed(1)} ${sy.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${tipX.toFixed(1)} ${tipY.toFixed(1)}`,
          opacity: 0.55 + r(i + 913) * 0.35,
          dur: 3.5 + r(i + 967) * 2.4,
          delay: r(i + 941) * 3,
        };
      }),
    [WISP, R, r],
  );

  const dustDots = useMemo(
    () =>
      Array.from({ length: DUST }, (_, i) => {
        const a = r(i + 71) * Math.PI * 2;
        const rad = 30 + r(i + 131) * 180;
        const rr = r(i + 251);
        return {
          x: cx + Math.cos(a) * rad,
          y: cy + Math.sin(a) * rad,
          size: rr < 0.1 ? 1.5 : 0.5 + rr * 0.8,
          color:
            rr < 0.08
              ? "hsl(var(--burst-peach))"
              : rr < 0.16
                ? "hsl(var(--burst-pink))"
                : "hsl(var(--burst-violet))",
          opacity: 0.5 + r(i + 313) * 0.4,
          dur: 2.5 + r(i + 401) * 3,
          delay: r(i + 509) * 3,
        };
      }),
    [DUST, r],
  );

  const webLines = useMemo(
    () =>
      Array.from({ length: WEB }, (_, i) => {
        const a1 = (i / WEB) * Math.PI * 2 + r(i) * 0.6;
        const a2 = a1 + 1.2 + r(i + 91) * 1.6;
        const r1 = R + 20 + r(i + 3) * 30;
        const r2 = R + 30 + r(i + 17) * 50;
        return {
          x1: cx + Math.cos(a1) * r1,
          y1: cy + Math.sin(a1) * r1,
          x2: cx + Math.cos(a2) * r2,
          y2: cy + Math.sin(a2) * r2,
        };
      }),
    [WEB, R, r],
  );

  // Ring/glow sized off R so contrast stays visually identical at every DPR
  // and card width (SVG stroke rescales with viewBox, not with device px).
  const coreSize = Math.max(48, Math.round(R * 0.55));
  const haloR = Math.round(R * 1.08);

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0 overflow-hidden"
      data-burst-reduced={reducedMotion ? "" : undefined}
      style={{
        ["--burst-indigo" as string]: "245 85% 72%",
        ["--burst-violet" as string]: "265 85% 62%",
        ["--burst-peach" as string]: "22 95% 60%",
        ["--burst-pink" as string]: "330 85% 62%",
        ["--burst-hi" as string]: "245 80% 55%",
        ["--burst-speed" as string]: String(speed),
        ["--burst-ring" as string]: `${R}`,
        ["--burst-inner" as string]: `${INNER}`,
        ["--burst-outer" as string]: `${OUTER}`,
        ["--burst-jitter" as string]: `${jitter}`,
        ["--burst-seed" as string]: `${seed}`,
      } as React.CSSProperties}
    >
      {/* light brand wash — matches the surrounding bento cards */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 65% at 50% 55%, hsl(22 95% 70% / 0.30), transparent 68%), radial-gradient(50% 55% at 25% 20%, hsl(245 85% 75% / 0.28), transparent 72%), radial-gradient(45% 55% at 80% 85%, hsl(330 85% 78% / 0.25), transparent 72%)",
        }}
      />

      {/* bright hot core */}
      <div
        className="absolute rounded-full"
        data-burst-core=""
        style={{
          left: "50%",
          top: "50%",
          width: coreSize,
          height: coreSize,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, hsl(0 0% 100% / 0.98), hsl(22 95% 80% / 0.85) 25%, hsl(var(--burst-violet) / 0.45) 55%, transparent 75%)",
          filter: "blur(1px)",
          animation: "burstPulse calc(2.6s * var(--burst-speed, 1)) ease-in-out infinite",
        }}
      />

      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        shapeRendering="geometricPrecision"
      >
        <defs>
          <linearGradient id="burstStrand" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="hsl(22 95% 60%)" stopOpacity="0.95" />
            <stop offset="0.55" stopColor="hsl(var(--burst-violet))" stopOpacity="0.55" />
            <stop offset="1" stopColor="hsl(var(--burst-pink))" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="burstWisp" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="hsl(var(--burst-peach))" stopOpacity="0.8" />
            <stop offset="1" stopColor="hsl(var(--burst-violet))" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="burstHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="hsl(0 0% 100%)" stopOpacity="0.9" />
            <stop offset="0.35" stopColor="hsl(22 95% 75%)" stopOpacity="0.35" />
            <stop offset="1" stopColor="hsl(var(--burst-violet))" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="burstRing" cx="50%" cy="50%" r="50%">
            <stop offset="0.55" stopColor="hsl(var(--burst-peach))" stopOpacity="0" />
            <stop offset="0.78" stopColor="hsl(var(--burst-peach))" stopOpacity="0.18" />
            <stop offset="0.9"  stopColor="hsl(var(--burst-pink))" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* soft halo behind filaments + a faint ring at the tip radius */}
        <circle cx={cx} cy={cy} r={haloR} fill="url(#burstHalo)" />
        <circle cx={cx} cy={cy} r={R + 4} fill="url(#burstRing)" />

        {/* outer faint web — organic threads between distant points */}
        <g stroke="hsl(var(--burst-violet) / 0.32)" strokeWidth="0.4" fill="none">
          {webLines.map((w, i) => (
            <line key={`w-${i}`} x1={w.x1} y1={w.y1} x2={w.x2} y2={w.y2} />
          ))}
        </g>

        {/* inner shell — short strands packing the disc */}
        <g fill="none" stroke="url(#burstStrand)" strokeWidth={0.28} strokeLinecap="round">
          {innerStrands.map((s, i) => (
            <path
              key={`i-${i}`}
              d={s.d}
              opacity={s.opacity}
              style={{
                animation: `burstStrand calc(${s.dur}s * var(--burst-speed, 1)) ease-in-out ${s.delay}s infinite`,
                transformOrigin: `${cx}px ${cy}px`,
              }}
            />
          ))}
        </g>

        {/* outer shell — long strands that define the tip ring */}
        <g fill="none" stroke="url(#burstStrand)" strokeLinecap="round">
          {outerStrands.map((s, i) => (
            <path
              key={`o-${i}`}
              d={s.d}
              strokeWidth={s.strokeW}
              opacity={s.opacity}
              style={{
                animation: `burstStrand calc(${s.dur}s * var(--burst-speed, 1)) ease-in-out ${s.delay}s infinite`,
                transformOrigin: `${cx}px ${cy}px`,
              }}
            />
          ))}
        </g>
        <g>
          {outerStrands.map((s, i) => (
            <circle
              key={`ot-${i}`}
              cx={s.tipX}
              cy={s.tipY}
              r={s.dotR}
              fill={s.dotColor}
              opacity={s.dotOpacity}
              style={{
                filter: `drop-shadow(0 0 3px ${s.dotColor})`,
                animation: `burstTip calc(${s.dur}s * var(--burst-speed, 1)) ease-in-out ${s.delay}s infinite`,
                transformOrigin: `${cx}px ${cy}px`,
              }}
            />
          ))}
        </g>

        {/* stray wisps — long thin strands that break the ring silhouette */}
        <g fill="none" stroke="url(#burstWisp)" strokeWidth={0.35} strokeLinecap="round">
          {wispStrands.map((s, i) => (
            <path
              key={`ws-${i}`}
              d={s.d}
              opacity={s.opacity}
              style={{
                animation: `burstStrand calc(${s.dur}s * var(--burst-speed, 1)) ease-in-out ${s.delay}s infinite`,
                transformOrigin: `${cx}px ${cy}px`,
              }}
            />
          ))}
        </g>

        {/* floating dust */}
        {dustDots.map((p, i) => (
          <circle
            key={`d-${i}`}
            cx={p.x}
            cy={p.y}
            r={p.size}
            fill={p.color}
            opacity={p.opacity}
            style={{
              filter: `drop-shadow(0 0 2px ${p.color})`,
              animation: `burstDust calc(${p.dur}s * var(--burst-speed, 1)) ease-in-out ${p.delay}s infinite`,
              transformOrigin: `${p.x}px ${p.y}px`,
            }}
          />
        ))}
      </svg>

      <style>{`
        @keyframes burstPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.95; }
          50%      { transform: translate(-50%, -50%) scale(1.12); opacity: 1; }
        }
        @keyframes burstStrand {
          0%, 100% { opacity: 0.35; transform: scale(0.96); }
          50%      { opacity: 0.9;  transform: scale(1.04); }
        }
        @keyframes burstTip {
          0%, 100% { opacity: 0.55; transform: scale(0.85); }
          50%      { opacity: 1;    transform: scale(1.2); }
        }
        @keyframes burstDust {
          0%, 100% { opacity: 0.25; transform: scale(0.8); }
          50%      { opacity: 1;    transform: scale(1.3); }
        }
        [data-burst-reduced] [data-burst-core],
        [data-burst-reduced] svg * {
          animation: none !important;
        }
      `}</style>
    </div>
  );
});

/* ---------- Card 3 · Control — tuning sliders ---------- */
const ControlVisual = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(55% 60% at 50% 40%, hsl(200 95% 70% / 0.35), transparent 70%)",
      }}
    />
    <div className="absolute inset-x-0 top-6 bottom-16 flex items-end justify-center gap-6 px-8">
      {[0.55, 0.8, 0.35].map((fill, i) => (
        <div
          key={i}
          className="relative w-3 h-full rounded-full bg-white/25 backdrop-blur-sm border border-white/30"
        >
          <div
            className="absolute bottom-0 left-0 right-0 rounded-full"
            style={{
              height: `${fill * 100}%`,
              background:
                "linear-gradient(180deg, hsl(200 95% 70%), hsl(22 95% 65%))",
              boxShadow: "0 0 14px hsl(22 95% 65% / 0.6)",
            }}
          />
          <div
            className="absolute -left-1.5 w-6 h-6 rounded-full bg-white shadow-lg border border-white/60"
            style={{ bottom: `calc(${fill * 100}% - 12px)` }}
          />
        </div>
      ))}
    </div>
  </div>
);

/* ---------- Card 4 · Privacy — secure hub network ---------- */
const PrivacyVisual = () => {
  // Fixed 400x250 viewBox + "meet" keeps the whole diagram centered at every breakpoint.
  const hub = { x: 200, y: 125 };
  const items = [
    { x: 70, y: 50, d: "M70,50 L70,85 L160,85 L160,125 L178,125" },
    { x: 330, y: 50, d: "M330,50 L330,85 L240,85 L240,125 L222,125" },
    { x: 45, y: 125, d: "M45,125 L178,125" },
    { x: 355, y: 125, d: "M355,125 L222,125" },
    { x: 70, y: 200, d: "M70,200 L70,165 L160,165 L160,125 L178,125" },
    { x: 330, y: 200, d: "M330,200 L330,165 L240,165 L240,125 L222,125" },
  ];

  // Cool blue → warm orange, echoing the reference.
  const blue = "hsl(215 90% 60%)";
  const orange = "hsl(22 95% 60%)";
  const soft = "hsl(0 0% 100%)";

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 65% at 30% 25%, hsl(215 90% 60% / 0.28), transparent 72%), radial-gradient(55% 60% at 75% 85%, hsl(22 95% 60% / 0.32), transparent 72%)",
        }}
      />
      <svg
        viewBox="0 0 400 250"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="privWire" x1="0" x2="1">
            <stop offset="0" stopColor={blue} />
            <stop offset="1" stopColor={orange} />
          </linearGradient>
          <radialGradient id="privHubGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor={orange} stopOpacity="0.55" />
            <stop offset="1" stopColor={orange} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="privHubFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="hsl(0 0% 100%)" />
            <stop offset="1" stopColor="hsl(22 95% 96%)" />
          </linearGradient>
          <linearGradient id="privShield" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={blue} />
            <stop offset="1" stopColor={orange} />
          </linearGradient>
        </defs>

        {/* connector paths + travelling pulses */}
        {items.map((n, i) => (
          <g key={i}>
            <path
              d={n.d}
              fill="none"
              stroke="url(#privWire)"
              strokeWidth="1.4"
              opacity="0.7"
            />
            <circle r="2.6" fill={orange}>
              <animateMotion
                dur={`${2.4 + (i % 3) * 0.6}s`}
                repeatCount="indefinite"
                path={n.d}
                begin={`${i * 0.35}s`}
              />
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                dur={`${2.4 + (i % 3) * 0.6}s`}
                repeatCount="indefinite"
                begin={`${i * 0.35}s`}
              />
            </circle>
          </g>
        ))}

        {/* satellite nodes — light glass tiles */}
        {items.map((n, i) => (
          <g key={`n-${i}`}>
            <rect
              x={n.x - 15}
              y={n.y - 15}
              width="30"
              height="30"
              rx="8"
              fill="hsl(0 0% 100% / 0.85)"
              stroke={blue}
              strokeOpacity="0.35"
              strokeWidth="1"
            />
            <rect
              x={n.x - 6.5}
              y={n.y - 6.5}
              width="13"
              height="13"
              rx="3"
              fill="url(#privWire)"
              opacity="0.9"
            >
              <animate
                attributeName="opacity"
                values="0.5;1;0.5"
                dur={`${2 + (i % 3) * 0.5}s`}
                repeatCount="indefinite"
              />
            </rect>
          </g>
        ))}

        {/* central hub */}
        <circle cx={hub.x} cy={hub.y} r="52" fill="url(#privHubGlow)" />
        <circle
          cx={hub.x}
          cy={hub.y}
          r="30"
          fill="url(#privHubFill)"
          stroke={orange}
          strokeOpacity="0.55"
          strokeWidth="1.2"
        />

        {/* larger, cleaner shield glyph */}
        <g transform={`translate(${hub.x - 14}, ${hub.y - 16})`}>
          <path
            d="M14 0 L28 5 V15 C28 22 22 28 14 32 C6 28 0 22 0 15 V5 Z"
            fill="url(#privShield)"
            opacity="0.95"
          />
          <path
            d="M8 15 L12.5 19.5 L20 11"
            fill="none"
            stroke={soft}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
};

/* ---------- Reusable Bento card shell ---------- */
const BentoCard = ({
  label,
  title,
  body,
  visual,
  className = "",
}: {
  label?: string;
  title: string;
  body: string;
  visual: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`group relative overflow-hidden rounded-3xl glass border border-glass shadow-float min-h-[280px] flex flex-col ${className}`}
  >
    <div className="relative flex-1">{visual}</div>
    <div className="relative p-6 pt-5 border-t border-white/30 backdrop-blur-md bg-background/40">
      {label && (
        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/45 mb-1.5">
          {label}
        </div>
      )}
      <h3 className="text-[18px] font-semibold tracking-tight">{title}</h3>
      <p className="mt-1.5 text-[13px] text-foreground/65 leading-relaxed">{body}</p>
    </div>
  </div>
);

const DeveloperPlatform = () => {
  return (
    <section id="developers" className="mx-auto max-w-7xl px-5 lg:px-8 py-20">
      <ScrollReveal className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="max-w-2xl">
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/50 mb-3">
            Developer Platform
          </div>
          <h2 className="text-[36px] lg:text-[52px] font-semibold tracking-tight leading-[1.02]">
            What sets <span className="gradient-accent-text">Rivinity</span> apart
          </h2>
        </div>
        <p className="text-[13.5px] text-foreground/60 max-w-[240px] md:text-right leading-relaxed">
          Smarter, faster, and more adaptive than traditional AI stacks.
        </p>
      </ScrollReveal>

      {/* Row 1 — two large cards */}
      <div className="grid lg:grid-cols-2 gap-4 mb-4">
        <BentoCard
          title="Unified AI Workspace"
          body="Access chat, search, coding, documents, image generation, voice AI, and workflows from a single intelligent platform."
          visual={<SpeedVisual />}
        />
        <BentoCard
          title="Persistent Intelligence"
          body="Your projects, conversations, and knowledge stay connected, allowing Rivinity to understand context and deliver more relevant assistance over time."
          visual={<CapabilitiesVisual />}
        />
      </div>

      {/* Row 2 — 3 cards */}
      <div className="grid lg:grid-cols-3 gap-4">
        <BentoCard
          title="AI Creation Studio"
          body="Build websites, applications, documents, presentations, workflows, and intelligent agents faster with AI-powered creation tools."
          visual={<ControlVisual />}
        />
        <BentoCard
          title="Enterprise-Grade Privacy"
          body="Designed with secure workspaces, protected data handling, and scalable collaboration for individuals, startups, and enterprises."
          visual={<PrivacyVisual />}
        />

        {/* CTA card */}
        <div className="relative overflow-hidden rounded-3xl glass border border-glass shadow-float min-h-[280px] flex flex-col justify-between p-7">
          <div
            aria-hidden
            className="absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(60% 60% at 20% 10%, hsl(245 85% 72% / 0.28), transparent 70%), radial-gradient(50% 55% at 90% 90%, hsl(22 95% 70% / 0.30), transparent 70%)",
            }}
          />
          <div className="relative">
            <h3 className="text-[26px] font-semibold tracking-tight leading-[1.1]">
              Start Building<br />with Rivinity
            </h3>
            <p className="mt-3 text-[13.5px] text-foreground/65 leading-relaxed">
              Experience a smarter way to work with AI. Create, automate, analyze, and innovate—all from one platform.
            </p>
          </div>
          <div className="relative flex flex-col gap-2.5 mt-6">
            <Link
              to="/app"
              className="inline-flex items-center justify-center gap-2 h-11 rounded-full gradient-accent text-primary-foreground text-[13.5px] font-semibold shadow-float hover:opacity-95 transition-opacity"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/app"
              className="inline-flex items-center justify-center h-11 rounded-full glass border border-glass text-[13.5px] font-medium hover:border-[hsl(var(--glass-border-hover))] transition-colors"
            >
              Explore Platform
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperPlatform;
