import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import part1 from "@/assets/rivinity-logo-part1.png.asset.json";
import part2 from "@/assets/rivinity-logo-part2.png.asset.json";
import part3 from "@/assets/rivinity-logo-part3.png.asset.json";

/**
 * LogoAssembly — the three registered logo parts (small → medium → large)
 * assemble concentrically with a soft counter-rotation on the outermost
 * ring once they've settled. Deterministic, respects `prefers-reduced-motion`
 * because framer-motion honours it via the `MotionConfig` if present, but
 * we also keep every transition short enough to feel calm rather than showy.
 *
 * Reusable brand primitive — drop into the hero, PlatformExplorer core, or
 * any surface that needs the Rivinity mark to feel alive without being loud.
 */
export interface LogoAssemblyProps {
  /** Rendered square size in px. */
  size?: number;
  /** Play once on mount; if false, loops the assembly every ~6s. */
  once?: boolean;
  /** Extra classes on the outer wrapper. */
  className?: string;
  /** Optional additional delay (seconds) before the outer part fades in. */
  startDelay?: number;
}

const PARTS = [
  // Outer ring: largest, appears first, holds the slow counter-rotation.
  { src: part3.url, scaleFrom: 0.72, delay: 0, rotate: [-6, 6] as [number, number] },
  // Mid ring.
  { src: part2.url, scaleFrom: 0.55, delay: 0.35, rotate: [4, -4] as [number, number] },
  // Inner mark: smallest, lands last with a tiny settle.
  { src: part1.url, scaleFrom: 0.35, delay: 0.7, rotate: [-2, 2] as [number, number] },
];

export default function LogoAssembly({
  size = 160,
  once = false,
  className,
  startDelay = 0,
}: LogoAssemblyProps) {
  return (
    <div
      className={cn("relative inline-block", className)}
      style={{ width: size, height: size }}
      aria-hidden
    >
      {/* Soft ambient halo behind the mark */}
      <div
        className="absolute inset-[6%] rounded-full blur-2xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(253,136,31,0.22), rgba(245,169,208,0.10) 55%, transparent 75%)",
        }}
      />

      {PARTS.map((p, i) => (
        <motion.img
          key={i}
          src={p.src}
          alt=""
          className="absolute inset-0 w-full h-full object-contain select-none"
          draggable={false}
          initial={{ opacity: 0, scale: p.scaleFrom, rotate: p.rotate[0] }}
          animate={
            once
              ? { opacity: 1, scale: 1, rotate: 0 }
              : {
                  opacity: [0, 1, 1, 1, 0],
                  scale: [p.scaleFrom, 1, 1, 1, p.scaleFrom],
                  rotate: [p.rotate[0], 0, 0, p.rotate[1], p.rotate[0]],
                }
          }
          transition={
            once
              ? {
                  duration: 1.1,
                  delay: startDelay + p.delay,
                  ease: [0.22, 1, 0.36, 1],
                }
              : {
                  duration: 6,
                  delay: startDelay + p.delay,
                  times: [0, 0.18, 0.55, 0.82, 1],
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 0.6,
                }
          }
          style={{ filter: "drop-shadow(0 4px 24px rgba(253,136,31,0.18))" }}
        />
      ))}
    </div>
  );
}